import Link from "next/link";

import { seoPresencePageData } from "@/data/solutions/seoPresence";

import styles from "./OrganicPaidBridge.module.css";

export function OrganicPaidBridge() {
  const { bridge } = seoPresencePageData;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>{bridge.eyebrow}</span>

        <div aria-hidden="true" className={styles.diagram}>
          <div>
            <span>SEO</span>
            <i />
          </div>

          <strong>Presença preparada</strong>

          <div>
            <i />
            <span>Anúncio</span>
          </div>
        </div>

        <h2>{bridge.title}</h2>
        <p>{bridge.description}</p>

        <Link className={styles.link} href={bridge.href}>
          <span>{bridge.cta}</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
