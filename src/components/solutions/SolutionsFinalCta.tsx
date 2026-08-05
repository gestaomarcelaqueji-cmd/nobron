import Link from "next/link";

import styles from "./SolutionsFinalCta.module.css";

export function SolutionsFinalCta() {
  return (
    <section className={styles.section}>
      <div className={styles.copy}>
        <span className={styles.eyebrow}>Entre em contato</span>

    
        <p className={styles.description}>
          Conte o que você quer melhorar, criar ou fazer funcionar melhor.
          Podemos ajudar com estratégia, design, tecnologia e marketing.
        </p>

        <Link href="/contato" className={styles.action}>
          Conversar com a noBRon

          <span className={styles.actionIcon} aria-hidden="true">
            ↗
          </span>
        </Link>
      </div>

      <footer className={styles.footer}>
        <span>Feito no Brasil, online no mundo.</span>

        <Link href="/">Voltar ao início</Link>
      </footer>
    </section>
  );
}