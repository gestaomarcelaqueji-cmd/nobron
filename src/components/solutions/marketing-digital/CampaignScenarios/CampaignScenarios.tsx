import { marketingDigitalPageData } from "@/data/solutions/marketingDigital";

import styles from "./CampaignScenarios.module.css";

export function CampaignScenarios() {
  const { scenariosIntro, scenarios } = marketingDigitalPageData;

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
                <span>Sem direção</span>
                <p>{scenario.today}</p>
              </div>

              <div className={styles.state}>
                <span>Com uma campanha organizada</span>
                <p>{scenario.withDirection}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
