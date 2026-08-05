import Link from "next/link";

import { strategyPageData } from "@/data/solutions/strategy";

import styles from "./ExecutionConnection.module.css";

export function ExecutionConnection() {
  const { execution } = strategyPageData;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>{execution.eyebrow}</span>
          <h2 className={styles.title}>{execution.title}</h2>
          <p className={styles.description}>{execution.description}</p>
        </header>

        <div className={styles.grid}>
          {execution.areas.map((area, index) => (
            <Link className={styles.card} href={area.href} key={area.title}>
              <div className={styles.cardTopline}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span aria-hidden="true">↗</span>
              </div>
              <div>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
