import { marketingDigitalPageData } from "@/data/solutions/marketingDigital";

import styles from "./MarketingProcess.module.css";

export function MarketingProcess() {
  const { process } = marketingDigitalPageData;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.heading}>
          <span>{process.eyebrow}</span>
          <h2>{process.title}</h2>
          <p>{process.description}</p>
        </header>

        <ol className={styles.steps}>
          {process.steps.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step}</strong>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
