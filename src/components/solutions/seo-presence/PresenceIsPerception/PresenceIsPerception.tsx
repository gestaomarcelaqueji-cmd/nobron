import { seoPresencePageData } from "@/data/solutions/seoPresence";

import styles from "./PresenceIsPerception.module.css";

export function PresenceIsPerception() {
  const { perception } = seoPresencePageData;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <span>{perception.eyebrow}</span>
          <h2>{perception.title}</h2>
          <p>{perception.description}</p>
        </div>

        <div aria-hidden="true" className={styles.signalLine}>
          {perception.signals.map((signal, index) => (
            <div className={styles.signal} key={signal}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{signal}</strong>
            </div>
          ))}
        </div>

        <p className={styles.support}>{perception.support}</p>
      </div>
    </section>
  );
}
