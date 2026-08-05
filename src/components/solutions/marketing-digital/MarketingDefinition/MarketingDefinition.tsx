"use client";

import { motion, useReducedMotion } from "motion/react";

import { marketingDigitalPageData } from "@/data/solutions/marketingDigital";

import styles from "./MarketingDefinition.module.css";

export function MarketingDefinition() {
  const reduceMotion = Boolean(useReducedMotion());
  const { definition } = marketingDigitalPageData;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.header
          className={styles.heading}
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ amount: 0.35, once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span>{definition.eyebrow}</span>
          <h2>{definition.title}</h2>
          <p>{definition.description}</p>
        </motion.header>

        <div className={styles.words}>
          {definition.words.map((word, index) => (
            <motion.div
              className={styles.word}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              key={word}
              transition={{
                duration: reduceMotion ? 0 : 0.62,
                delay: reduceMotion ? 0 : index * 0.055,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ amount: 0.4, once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{word}</strong>
            </motion.div>
          ))}
        </div>

        <p className={styles.support}>{definition.support}</p>
      </div>
    </section>
  );
}
