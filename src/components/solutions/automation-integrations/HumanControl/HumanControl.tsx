import { automationIntegrationsPageData } from "@/data/solutions/automationIntegrations";

import styles from "./HumanControl.module.css";

export function HumanControl() {
  const { humanControl } = automationIntegrationsPageData;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.heading}>
          <span>{humanControl.eyebrow}</span>
          <h2>{humanControl.title}</h2>
          <p>{humanControl.description}</p>
        </header>

        <div className={styles.comparison}>
          <div className={styles.side}>
            <span>Automação</span>
            <strong>O que pode seguir uma regra</strong>
            <ul>
              {humanControl.automatic.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div aria-hidden="true" className={styles.center}>
            <span>Regra</span>
            <i />
            <span>Exceção</span>
          </div>

          <div className={styles.side}>
            <span>Decisão humana</span>
            <strong>O que precisa de contexto</strong>
            <ul>
              {humanControl.human.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <p className={styles.statement}>{humanControl.statement}</p>
      </div>
    </section>
  );
}
