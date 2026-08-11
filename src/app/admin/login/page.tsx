"use client";

import { type FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

import styles from "../admin.module.css";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <AdminLoginContent />
    </Suspense>
  );
}

function AdminLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const reason = searchParams.get("error");
  const queryError =
    reason === "forbidden"
      ? "Esta conta não possui acesso administrativo."
      : reason === "session"
        ? "A sessão expirou. Entre novamente."
        : "";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { data, error: authError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (authError || !data.user) {
        setError("E-mail ou senha inválidos.");
        return;
      }

      if (data.user.app_metadata?.role !== "admin") {
        await supabase.auth.signOut();
        setError("Esta conta não possui acesso administrativo.");
        return;
      }

      const { data: factors } = await supabase.auth.mfa.listFactors();
      const verifiedFactor = factors?.totp?.find(
        (factor) => factor.status === "verified",
      );

      router.replace(verifiedFactor ? "/admin/mfa" : "/admin/mfa/setup");
      router.refresh();
    } catch {
      setError(
        "O painel ainda não foi configurado. Verifique as variáveis do Supabase.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.authPage}>
      <section className={styles.authCard} aria-labelledby="admin-login-title">
        <div className={styles.brand}>
          no<strong>BR</strong>on
        </div>
        <span className={styles.kicker}>Acesso administrativo</span>
        <h1 id="admin-login-title">Painel noBRon</h1>
        <p>
          Área restrita. O acesso exige senha e autenticação em dois fatores.
        </p>

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <label>
            <span>E-mail</span>
            <input
              autoComplete="username"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label>
            <span>Senha</span>
            <input
              autoComplete="current-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          {error || queryError ? (
            <div className={styles.errorBox} role="alert">
              {error || queryError}
            </div>
          ) : null}

          <button type="submit" disabled={loading}>
            {loading ? "Verificando..." : "Entrar"}
          </button>
        </form>
      </section>
    </main>
  );
}
