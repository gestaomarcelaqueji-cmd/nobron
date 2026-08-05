"use client";

import { motion, useReducedMotion } from "motion/react";

import { strategyPageData } from "@/data/solutions/strategy";

import styles from "./StrategicDiagnosis.module.css";

export function StrategicDiagnosis() {
  const reduceMotion = useReducedMotion();
  const { diagnosis } = strategyPageData;

  return (
    <section className={styles.section} id="diagnostico">
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>{diagnosis.eyebrow}</span>
          <h2 className={styles.title}>{diagnosis.title}</h2>
          <p className={styles.description}>{diagnosis.description}</p>
        </header>

        <div className={styles.steps}>
          {diagnosis.steps.map((step, index) => (
            <motion.article
              className={styles.step}
              key={step.number}
              initial={reduceMotion ? false : { opacity: 0, x: -28 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{
                duration: 0.56,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className={styles.stepNumber}>{step.number}</div>
              <div className={styles.stepCopy}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              <span className={styles.stepDot} aria-hidden="true" />
            </motion.article>
          ))}
        </div>

        <div className={styles.conclusion}>
          <span>O diagnóstico muda a indicação.</span>
          <p>{diagnosis.conclusion}</p>
        </div>
      </div>
    </section>
  );
}
