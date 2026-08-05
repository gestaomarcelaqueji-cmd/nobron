"use client";

import { motion, useReducedMotion } from "motion/react";

import { strategyPageData } from "@/data/solutions/strategy";

import styles from "./BusinessSignals.module.css";

export function BusinessSignals() {
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>Pode ser o seu momento</span>
        <h2 className={styles.title}>
          Quando tudo parece importante, fica difícil saber o que realmente
          deve ser feito.
        </h2>
        <p className={styles.description}>
          A necessidade de estratégia costuma aparecer antes mesmo de alguém
          procurar por esse nome. Ela aparece nos sinais do dia a dia.
        </p>
      </div>

      <div className={styles.grid}>
        {strategyPageData.signals.map((signal, index) => (
          <motion.article
            className={styles.card}
            key={signal}
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              duration: 0.5,
              delay: (index % 3) * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className={styles.number}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <p>{signal}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
