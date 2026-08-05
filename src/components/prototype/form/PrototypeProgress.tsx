import { motion } from "motion/react";

import { REQUEST_STEPS } from "../prototype.constants";
import type { FormStep } from "../prototype.types";
import styles from "../PrototypeRequest.module.css";

type PrototypeProgressProps = {
  step: FormStep;
};

export function PrototypeProgress({ step }: PrototypeProgressProps) {
  return (
    <div className={styles.progress}>
      <div className={styles.progressHeader}>
        <div>
          <span>Etapa {step} de 3</span>
          <strong>{REQUEST_STEPS[step - 1]}</strong>
        </div>
      </div>

      <div className={styles.progressTrack}>
        <motion.div
          className={styles.progressFill}
          animate={{ width: `${(step / 3) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className={styles.progressLabels}>
        {REQUEST_STEPS.map((label, index) => (
          <span
            className={step >= index + 1 ? styles.progressLabelActive : ""}
            key={label}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
