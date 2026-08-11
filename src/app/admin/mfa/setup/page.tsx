"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useRef, useState } from "react";

import { createClient } from "@/lib/supabase/client";

import styles from "../../admin.module.css";

type Enrollment = {
  factorId: string;
  qrCode: string;
  secret: string;
};

function normalizeQrCodeSource(value: string) {
  const trimmed = value.trim();

  if (!trimmed.startsWith("data:")) {
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(trimmed)}`;
  }

  const separatorIndex = trimmed.indexOf(",");
  if (separatorIndex < 0) return trimmed;

  const metadata = trimmed.slice(0, separatorIndex);
  if (metadata.includes(";base64")) return trimmed;

  const rawPayload = trimmed.slice(separatorIndex + 1);
  let svgPayload = rawPayload;

  try {
    svgPayload = decodeURIComponent(rawPayload);
  } catch {
    // O Supabase também pode devolver o SVG cru depois da vírgula.
  }

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgPayload.trim())}`;
}

export default function AdminMfaSetupPage() {
  const router = useRouter();
  const started = useRef(false);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    void (async () => {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user || user.app_metadata?.role !== "admin") {
          router.replace("/admin/login");
          return;
        }

        const { data: factors } = await supabase.auth.mfa.listFactors();
        const verified = factors?.totp?.find(
          (item) => item.status === "verified",
        );

        if (verified) {
          router.replace("/admin/mfa");
          return;
        }

        for (const factor of factors?.all || []) {
          if (
            factor.factor_type === "totp" &&
            factor.status === "unverified"
          ) {
            await supabase.auth.mfa.unenroll({ factorId: factor.id });
          }
        }

        const { data, error: enrollError } = await supabase.auth.mfa.enroll({
          factorType: "totp",
          friendlyName: "noBRon Admin",
        });

        if (enrollError) {
          setError("Não foi possível iniciar o 2FA.");
          return;
        }

        setEnrollment({
          factorId: data.id,
          qrCode: normalizeQrCodeSource(data.totp.qr_code),
          secret: data.totp.secret,
        });
      } catch {
        setError("Não foi possível configurar a autenticação em dois fatores.");
      }
    })();
  }, [router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enrollment) return;

    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { error: verifyError } =
        await supabase.auth.mfa.challengeAndVerify({
          factorId: enrollment.factorId,
          code: code.trim(),
        });

      if (verifyError) {
        setError("Código inválido. Confira o aplicativo autenticador.");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Não foi possível ativar o 2FA agora.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.authPage}>
      <section className={styles.authCard} aria-labelledby="mfa-setup-title">
        <div className={styles.brand}>
          no<strong>BR</strong>on
        </div>
        <span className={styles.kicker}>Proteção obrigatória</span>
        <h1 id="mfa-setup-title">Ative o 2FA</h1>
        <p>
          Escaneie o QR Code no seu aplicativo autenticador e confirme o código.
        </p>

        {enrollment ? (
          <>
            <div className={styles.qrWrap}>
              <Image
                src={enrollment.qrCode}
                alt="QR Code para configurar autenticação em dois fatores"
                width={190}
                height={190}
                unoptimized
              />
            </div>
            <details className={styles.secretDetails}>
              <summary>Não consigo escanear o QR Code</summary>
              <code>{enrollment.secret}</code>
            </details>
          </>
        ) : null}

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <label>
            <span>Código de confirmação</span>
            <input
              autoComplete="one-time-code"
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              value={code}
              onChange={(event) =>
                setCode(event.target.value.replace(/\D/g, ""))
              }
              required
            />
          </label>

          {error ? (
            <div className={styles.errorBox} role="alert">
              {error}
            </div>
          ) : null}

          <button type="submit" disabled={loading || !enrollment}>
            {loading ? "Ativando..." : "Ativar e entrar"}
          </button>
        </form>
      </section>
    </main>
  );
}
