"use client";

import { type FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

import styles from "../admin.module.css";

export default function AdminMfaPage() {
  const router = useRouter();
  const [factorId, setFactorId] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void (async () => {
      try {
        const supabase = createClient();
        const { data: factors } = await supabase.auth.mfa.listFactors();
        const factor = factors?.totp?.find(
          (item) => item.status === "verified",
        );

        if (!factor) {
          router.replace("/admin/mfa/setup");
          return;
        }

        setFactorId(factor.id);
      } catch {
        setError("Não foi possível carregar a autenticação em dois fatores.");
      }
    })();
  }, [router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!factorId) return;

    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { error: verifyError } =
        await supabase.auth.mfa.challengeAndVerify({
          factorId,
          code: code.trim(),
        });

      if (verifyError) {
        setError("Código inválido ou expirado.");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Não foi possível confirmar o código agora.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.authPage}>
      <section className={styles.authCard} aria-labelledby="mfa-title">
        <div className={styles.brand}>
          no<strong>BR</strong>on
        </div>
        <span className={styles.kicker}>Segunda etapa</span>
        <h1 id="mfa-title">Confirme o código</h1>
        <p>Digite o código de 6 dígitos do seu aplicativo autenticador.</p>

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <label>
            <span>Código</span>
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

          <button type="submit" disabled={loading || !factorId}>
            {loading ? "Verificando..." : "Confirmar acesso"}
          </button>
        </form>
      </section>
    </main>
  );
}
