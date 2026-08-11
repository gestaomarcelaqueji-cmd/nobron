import { z } from "zod";

import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const patchSchema = z.object({
  status: z.enum(["new", "reviewing", "contacted", "waiting", "completed"]),
});

const idSchema = z.string().uuid();

async function getVerifiedAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: 401 as const };
  if (user.app_metadata?.role !== "admin") return { error: 403 as const };

  const { data: aal, error } =
    await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (error || aal.currentLevel !== "aal2") return { error: 403 as const };

  return { supabase };
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const verified = await getVerifiedAdmin();

  if ("error" in verified) {
    return Response.json(
      { error: verified.error === 401 ? "Não autenticado." : "Acesso negado." },
      { status: verified.error },
    );
  }

  const body = patchSchema.safeParse(await request.json().catch(() => null));
  if (!body.success) {
    return Response.json({ error: "Status inválido." }, { status: 400 });
  }

  const { id } = await context.params;
  if (!idSchema.safeParse(id).success) {
    return Response.json({ error: "ID inválido." }, { status: 400 });
  }

  const { data, error } = await verified.supabase
    .from("form_submissions")
    .update({
      status: body.data.status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) {
    return Response.json(
      { error: "Não foi possível mover o cartão." },
      { status: 500 },
    );
  }

  if (!data) {
    return Response.json({ error: "Registro não encontrado." }, { status: 404 });
  }

  return Response.json({ ok: true });
}
