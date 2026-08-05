import { automationIntegrationsPageData } from "@/data/solutions/automationIntegrations";

import styles from "./RealAutomationScenarios.module.css";

export function RealAutomationScenarios() {
  const { scenariosIntro, scenarios } = automationIntegrationsPageData;

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
                <span>Com o processo conectado</span>
                <p>{scenario.connected}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
