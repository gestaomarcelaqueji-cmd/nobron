import { createHmac } from "node:crypto";

import { z } from "zod";

import { createSecretClient } from "@/lib/supabase/secret";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const submissionSchema = z.object({
  sourceKey: z.string().trim().regex(/^[a-z0-9][a-z0-9_-]{1,63}$/),
  sourceLabel: z.string().trim().min(2).max(120),
  sourcePath: z.string().trim().max(240).optional(),
  formVersion: z.string().trim().max(60).optional(),
  contact: z
    .object({
      name: z.string().trim().max(160).optional(),
      whatsapp: z.string().trim().max(40).optional(),
      email: z.string().trim().email().max(254).optional().or(z.literal("")),
      businessName: z.string().trim().max(180).optional(),
    })
    .optional(),
  answers: z.record(z.string(), z.unknown()),
  attribution: z.record(z.string(), z.string().max(500).optional()).optional(),
  website: z.string().max(300).optional(),
});

function getAllowedOrigins() {
  return (
    process.env.FORM_ALLOWED_ORIGINS ||
    "https://www.nobron.com.br,https://nobron.com.br"
  )
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function hashIp(ip: string) {
  const salt = process.env.FORM_RATE_LIMIT_SALT;
  if (!salt || salt.length < 32) {
    throw new Error("FORM_RATE_LIMIT_SALT must contain at least 32 characters.");
  }

  return createHmac("sha256", salt).update(ip).digest("hex");
}

export async function POST(request: Request) {
  try {
    const origin = request.headers.get("origin");

    if (
      process.env.NODE_ENV === "production" &&
      (!origin || !getAllowedOrigins().includes(origin))
    ) {
      return Response.json({ error: "Origem não permitida." }, { status: 403 });
    }

    const rawBody = await request.text();
    if (rawBody.length > 100_000) {
      return Response.json({ error: "Envio muito grande." }, { status: 413 });
    }

    let json: unknown;
    try {
      json = JSON.parse(rawBody);
    } catch {
      return Response.json(
        { error: "Dados do formulário inválidos." },
        { status: 400 },
      );
    }

    const parsed = submissionSchema.safeParse(json);
    if (!parsed.success) {
      return Response.json(
        { error: "Dados do formulário inválidos." },
        { status: 400 },
      );
    }

    const data = parsed.data;

    // Honeypot: responde como sucesso sem armazenar e sem orientar o robô.
    if (data.website?.trim()) {
      return Response.json({ ok: true }, { status: 202 });
    }

    const supabase = createSecretClient();
    const ipHash = hashIp(getClientIp(request));
    const windowStart = new Date(Date.now() - 15 * 60 * 1000).toISOString();

    const { count, error: countError } = await supabase
      .from("form_submission_rate_limits")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", windowStart);

    if (countError) throw countError;

    if ((count ?? 0) >= 6) {
      return Response.json(
        { error: "Muitas tentativas. Tente novamente mais tarde." },
        { status: 429 },
      );
    }

    const { error: limiterError } = await supabase
      .from("form_submission_rate_limits")
      .insert({ ip_hash: ipHash });

    if (limiterError) throw limiterError;

    const { data: inserted, error } = await supabase
      .from("form_submissions")
      .insert({
        source_key: data.sourceKey,
        source_label: data.sourceLabel,
        source_path: data.sourcePath || null,
        form_version: data.formVersion || null,
        contact_name: data.contact?.name || null,
        contact_whatsapp: data.contact?.whatsapp || null,
        contact_email: data.contact?.email || null,
        business_name: data.contact?.businessName || null,
        answers: data.answers,
        attribution: data.attribution || {},
      })
      .select("id")
      .single();

    if (error) throw error;

    // Limpeza oportunista evita a necessidade de cron nesta primeira fase.
    await supabase
      .from("form_submission_rate_limits")
      .delete()
      .lt(
        "created_at",
        new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      );

    return Response.json({ ok: true, id: inserted.id }, { status: 201 });
  } catch (error) {
    console.error("[forms/submit]", error);
    return Response.json(
      { error: "Não foi possível registrar o formulário." },
      { status: 500 },
    );
  }
}
