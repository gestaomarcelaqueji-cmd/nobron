import { requireAdminAal2 } from "@/lib/admin/requireAdmin";

import AdminKanban, { type Submission } from "./AdminKanban";
import { AdminSignOutButton } from "./AdminSignOutButton";
import styles from "./admin.module.css";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const { supabase, user } = await requireAdminAal2();
  const { data, error } = await supabase
    .from("form_submissions")
    .select(
      "id,source_key,source_label,source_path,contact_name,contact_whatsapp,contact_email,business_name,status,priority,answers,attribution,created_at,updated_at",
    )
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) {
    throw new Error("Não foi possível carregar os formulários.");
  }

  const submissions = (data || []) as Submission[];

  return (
    <main className={styles.adminPage}>
      <header className={styles.adminHeader}>
        <div className={styles.adminBrand}>
          <div className={styles.brand}>
            no<strong>BR</strong>on
          </div>
          <span>Admin</span>
        </div>
        <div className={styles.adminAccount}>
          <div className={styles.adminIdentity}>
            <small>Acesso protegido por 2FA</small>
            <strong>{user.email}</strong>
          </div>
          <AdminSignOutButton />
        </div>
      </header>

      <section className={styles.adminIntro}>
        <div>
          <span className={styles.kicker}>Formulários</span>
          <h1>Entradas do site</h1>
          <p>
            Todos os formulários da noBRon chegam aqui e seguem o mesmo fluxo.
          </p>
        </div>
        <div className={styles.totalBox} aria-label={`${submissions.length} registros`}>
          <strong>{submissions.length}</strong>
          <span>registros</span>
        </div>
      </section>

      <AdminKanban initialSubmissions={submissions} />
    </main>
  );
}
