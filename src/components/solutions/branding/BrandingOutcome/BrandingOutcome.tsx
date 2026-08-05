"use client";

import { motion, useReducedMotion } from "motion/react";

import { brandingPageData } from "@/data/solutions/branding";

import styles from "./BrandingOutcome.module.css";

export function BrandingOutcome() {
  const reduceMotion = useReducedMotion();
  const { outcome } = brandingPageData;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span>{outcome.eyebrow}</span>
        <h2>{outcome.title}</h2>
      </div>

      <div className={styles.rows}>
        {outcome.transformations.map((item, index) => (
          <motion.article
            className={styles.row}
            key={item.from}
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{item.from}</p>
            <i aria-hidden="true">→</i>
            <strong>{item.to}</strong>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
