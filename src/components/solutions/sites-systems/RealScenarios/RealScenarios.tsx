"use client";

import { motion, useReducedMotion } from "motion/react";

import { sitesSystemsPageData } from "@/data/solutions/sitesSystems";

import styles from "./RealScenarios.module.css";

export function RealScenarios() {
  const reduceMotion = useReducedMotion();
  const { scenarios } = sitesSystemsPageData;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span>{scenarios.eyebrow}</span>
        <h2>{scenarios.title}</h2>
      </div>

      <div className={styles.scenarios}>
        {scenarios.items.map((item, index) => (
          <motion.article
            className={styles.scenario}
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            key={item.title}
            transition={{ duration: reduceMotion ? 0 : 0.52, delay: reduceMotion ? 0 : index * 0.08 }}
            viewport={{ amount: 0.3, once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className={styles.scenarioTitle}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
            </div>

            <div className={styles.flow}>
              <div>
                <span>Hoje</span>
                <p>{item.before}</p>
              </div>

              <div aria-hidden="true" className={styles.trace}>
                <motion.span
                  initial={reduceMotion ? false : { scaleX: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.18 }}
                  viewport={{ amount: 0.5, once: true }}
                  whileInView={{ scaleX: 1 }}
                />
              </div>

              <div>
                <span>Com uma estrutura digital</span>
                <p>{item.after}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
