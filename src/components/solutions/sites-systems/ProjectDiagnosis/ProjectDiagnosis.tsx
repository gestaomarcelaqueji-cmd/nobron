"use client";

import { motion, useReducedMotion } from "motion/react";

import { sitesSystemsPageData } from "@/data/solutions/sitesSystems";

import styles from "./ProjectDiagnosis.module.css";

export function ProjectDiagnosis() {
  const reduceMotion = useReducedMotion();
  const { diagnosis } = sitesSystemsPageData;

  return (
    <section className={styles.section}>
      <div className={styles.copy}>
        <span>{diagnosis.eyebrow}</span>
        <h2>{diagnosis.title}</h2>
        <p>{diagnosis.closing}</p>
      </div>

      <div className={styles.statements}>
        {diagnosis.statements.map((statement, index) => (
          <motion.blockquote
            initial={reduceMotion ? false : { opacity: 0.12, x: index % 2 === 0 ? -30 : 30 }}
            key={statement}
            transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : index * 0.06 }}
            viewport={{ amount: 0.55, once: true }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>“{statement}”</p>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}
