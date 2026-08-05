import { brandingPageData } from "@/data/solutions/branding";

import styles from "./BrandingSignals.module.css";

export function BrandingSignals() {
  const { recognition } = brandingPageData;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.stickyCopy}>
          <span>Antes de escolher uma entrega</span>
          <h2>Onde o visual está se perdendo?</h2>
          <p>
            Nem todo negócio precisa refazer tudo. Às vezes falta uma identidade completa;
            em outros casos, o problema está só nos materiais usados todos os dias.
          </p>
        </div>

        <div className={styles.list}>
          {recognition.signals.map((signal, index) => (
            <article className={styles.item} key={signal}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{signal}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
