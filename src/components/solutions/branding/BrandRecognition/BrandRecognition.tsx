"use client";

import { motion, useReducedMotion } from "motion/react";

import { brandingPageData } from "@/data/solutions/branding";

import styles from "./BrandRecognition.module.css";

export function BrandRecognition() {
  const reduceMotion = useReducedMotion();
  const { recognition } = brandingPageData;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>{recognition.eyebrow}</span>
        <h2>{recognition.title}</h2>
        <p>{recognition.description}</p>
      </div>

      <div className={styles.signalField}>
        {recognition.signals.map((signal, index) => (
          <motion.article
            className={styles.signal}
            key={signal}
            initial={reduceMotion ? false : { opacity: 0, y: 28, rotate: index % 2 ? 1.4 : -1.4 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.62, delay: (index % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{signal}</p>
          </motion.article>
        ))}
      </div>

      <div className={styles.closing}>
        <span className={styles.closingLine} />
        <p>Quando falta uma base, cada nova peça vira uma nova decisão.</p>
      </div>
    </section>
  );
}
