import { seoPresencePageData } from "@/data/solutions/seoPresence";

import styles from "./SearchScenarios.module.css";

export function SearchScenarios() {
  const { scenariosIntro, scenarios } = seoPresencePageData;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.heading}>
          <span>{scenariosIntro.eyebrow}</span>
          <h2>{scenariosIntro.title}</h2>
        </header>

        <div className={styles.scenarios}>
          {scenarios.map((scenario) => (
            <article className={styles.scenario} key={scenario.title}>
              <div className={styles.scenarioTitle}>
                <span>{scenario.number}</span>
                <h3>{scenario.title}</h3>
              </div>

              <div className={styles.state}>
                <span>Hoje</span>
                <p>{scenario.today}</p>
              </div>

              <div className={styles.state}>
                <span>Com uma presença organizada</span>
                <p>{scenario.organized}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
