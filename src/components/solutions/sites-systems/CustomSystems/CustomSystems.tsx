"use client";

import { motion, useReducedMotion } from "motion/react";

import { sitesSystemsPageData } from "@/data/solutions/sitesSystems";

import styles from "./CustomSystems.module.css";

export function CustomSystems() {
  const reduceMotion = useReducedMotion();
  const { custom } = sitesSystemsPageData;

  return (
    <section className={styles.section}>
      <div className={styles.copy}>
        <span>{custom.eyebrow}</span>
        <h2>{custom.title}</h2>
        <p>{custom.description}</p>
        <p>{custom.support}</p>
        <strong>{custom.closing}</strong>
      </div>

      <div className={styles.flow} aria-label="Caminho de evolução de um sistema sob medida">
        <div aria-hidden="true" className={styles.traceLine}>
          <motion.span
            initial={reduceMotion ? false : { scaleY: 0 }}
            transition={{ duration: reduceMotion ? 0 : 1.4, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ amount: 0.3, once: true }}
            whileInView={{ scaleY: 1 }}
          />
        </div>

        {custom.flow.map((item, index) => (
          <motion.div
            className={styles.flowItem}
            initial={reduceMotion ? false : { opacity: 0, x: 24 }}
            key={item}
            transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : index * 0.1 }}
            viewport={{ amount: 0.5, once: true }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{item}</strong>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
