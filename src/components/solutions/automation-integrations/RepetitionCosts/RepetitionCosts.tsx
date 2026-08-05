"use client";

import { motion, useReducedMotion } from "motion/react";

import { automationIntegrationsPageData } from "@/data/solutions/automationIntegrations";

import styles from "./RepetitionCosts.module.css";

export function RepetitionCosts() {
  const reduceMotion = Boolean(useReducedMotion());
  const { repetition } = automationIntegrationsPageData;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.header
          className={styles.heading}
          initial={reduceMotion ? false : { opacity: 0, y: 26 }}
          transition={{ duration: reduceMotion ? 0 : 0.75, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ amount: 0.35, once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span>{repetition.eyebrow}</span>
          <h2>{repetition.title}</h2>
          <p>{repetition.description}</p>
        </motion.header>

        <div className={styles.repetitions}>
          {repetition.items.map((item, index) => (
            <motion.div
              className={styles.item}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              key={item}
              transition={{
                duration: reduceMotion ? 0 : 0.55,
                delay: reduceMotion ? 0 : index * 0.055,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ amount: 0.5, once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item}</strong>
            </motion.div>
          ))}
        </div>

        <p className={styles.statement}>{repetition.statement}</p>
      </div>
    </section>
  );
}
