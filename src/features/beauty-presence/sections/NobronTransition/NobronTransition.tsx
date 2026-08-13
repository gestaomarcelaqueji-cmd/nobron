"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import type { BeautyPageData } from "../../data/beauty.types";
import styles from "./NobronTransition.module.css";

type NobronTransitionProps = { data: BeautyPageData };

export function NobronTransition({ data }: NobronTransitionProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const cta = data.nobronCta;

  if (!cta) return null;

  return (
    <section className={styles.section} id="nobron" aria-labelledby="nobron-title">
      <div className={styles.shell}>
        <motion.div
          className={styles.content}
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.kicker}>{cta.eyebrow}</span>
          <h2 id="nobron-title">{cta.title}</h2>
          <p>{cta.description}</p>

          <div className={styles.brandLine}>
            <strong>noBRon</strong>
            <span>Feito no Brasil. Online no mundo.</span>
          </div>

          <a href={cta.href} target="_blank" rel="noreferrer">
            {cta.label}
            <ArrowUpRight aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
