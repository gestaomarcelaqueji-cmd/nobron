"use client";

import Link from "next/link";

import { motion, useReducedMotion } from "motion/react";

import styles from "./CategoryFinalCta.module.css";

type CategoryFinalCtaProps = {
  id: string;
  title: string;
  description: string;
  cta: string;
  href: string;
};

export function CategoryFinalCta({
  id,
  title,
  description,
  cta,
  href,
}: CategoryFinalCtaProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const titleId = `${id}-final-title`;

  return (
    <section aria-labelledby={titleId} className={styles.section}>
      <motion.div
        className={styles.inner}
        initial={reduceMotion ? false : { opacity: 0, y: 38 }}
        transition={{
          duration: reduceMotion ? 0 : 0.85,
          ease: [0.22, 1, 0.36, 1],
        }}
        viewport={{ amount: 0.25, once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <div className={styles.copy}>
          <h2 id={titleId}>{title}</h2>
          <p>{description}</p>
        </div>

        <Link className={styles.action} href={href}>
          <span className={styles.actionText}>{cta}</span>
          <span className={styles.actionSide}>Começar</span>
        </Link>
      </motion.div>
    </section>
  );
}
