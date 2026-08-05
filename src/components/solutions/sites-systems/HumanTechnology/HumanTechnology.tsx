"use client";

import { motion, useReducedMotion } from "motion/react";

import { sitesSystemsPageData } from "@/data/solutions/sitesSystems";

import { ScrambleText } from "../ui/ScrambleText";

import styles from "./HumanTechnology.module.css";

export function HumanTechnology() {
  const reduceMotion = useReducedMotion();
  const { human } = sitesSystemsPageData;

  return (
    <section className={styles.section}>
      <div className={styles.art} aria-hidden="true">
        <ScrambleText className={styles.artWord} delay={100} text="HUMANO / SISTEMA" />
        <div className={styles.artGrid} />
        <motion.div
          className={styles.artTrace}
          initial={reduceMotion ? false : { scaleX: 0 }}
          transition={{ duration: reduceMotion ? 0 : 1.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ amount: 0.4, once: true }}
          whileInView={{ scaleX: 1 }}
        />
      </div>

      <div className={styles.copy}>
        <span>{human.eyebrow}</span>
        <h2>{human.title}</h2>

        <div className={styles.paragraphs}>
          {human.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <strong>{human.closing}</strong>
      </div>
    </section>
  );
}
