import { automationIntegrationsPageData } from "@/data/solutions/automationIntegrations";

import styles from "./AutomationProcess.module.css";

export function AutomationProcess() {
  const { process } = automationIntegrationsPageData;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.heading}>
          <span>{process.eyebrow}</span>
          <h2>{process.title}</h2>
          <p>{process.description}</p>
        </header>

        <ol className={styles.steps}>
          {process.steps.map((step) => (
            <li key={step.title}>
              <span>{step.number}</span>
              <strong>{step.title}</strong>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
