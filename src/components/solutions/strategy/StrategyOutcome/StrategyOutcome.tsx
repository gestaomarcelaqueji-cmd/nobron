"use client";

import { motion, useReducedMotion } from "motion/react";

import { strategyPageData } from "@/data/solutions/strategy";

import styles from "./StrategyOutcome.module.css";

export function StrategyOutcome() {
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>O que muda</span>
          <h2 className={styles.title}>
            Você não recebe apenas ideias. Recebe critérios para decidir.
          </h2>
          <p className={styles.description}>
            A direção reduz o improviso e cria uma base comum para todas as próximas escolhas.
          </p>
        </header>

        <div className={styles.rows}>
          <div className={styles.rowHeader}>
            <span>Antes</span>
            <span>Depois</span>
          </div>

          {strategyPageData.outcomes.map((outcome, index) => (
            <motion.div
              className={styles.row}
              key={outcome.from}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                duration: 0.5,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className={styles.from}>{outcome.from}</span>
              <span className={styles.arrow} aria-hidden="true">→</span>
              <strong className={styles.to}>{outcome.to}</strong>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
