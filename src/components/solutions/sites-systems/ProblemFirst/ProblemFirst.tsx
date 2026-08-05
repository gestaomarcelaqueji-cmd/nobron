"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

import { sitesSystemsPageData } from "@/data/solutions/sitesSystems";

import styles from "./ProblemFirst.module.css";

function ProblemWord({ word, index }: { word: string; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { amount: 0.65 });
  const reduceMotion = useReducedMotion();

  return (
    <motion.li
      ref={ref}
      animate={{
        opacity: inView ? 1 : 0.16,
        x: inView && !reduceMotion ? 12 : 0,
      }}
      transition={{ duration: reduceMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
    >
      <span>{String(index + 1).padStart(2, "0")}</span>
      <strong>{word}</strong>
    </motion.li>
  );
}

export function ProblemFirst() {
  const { problem } = sitesSystemsPageData;

  return (
    <section className={styles.section}>
      <div className={styles.stickyCopy}>
        <span>{problem.eyebrow}</span>
        <h2>{problem.title}</h2>
        <p>{problem.description}</p>
        <strong>{problem.closing}</strong>
      </div>

      <ol className={styles.wordStream} aria-label="Pontos da rotina que podem ser organizados">
        {problem.words.map((word, index) => (
          <ProblemWord index={index} key={word} word={word} />
        ))}
      </ol>
    </section>
  );
}
