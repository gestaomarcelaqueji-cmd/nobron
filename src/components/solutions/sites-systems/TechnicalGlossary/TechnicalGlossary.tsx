"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { sitesSystemsPageData } from "@/data/solutions/sitesSystems";

import styles from "./TechnicalGlossary.module.css";

export function TechnicalGlossary() {
  const reduceMotion = useReducedMotion();
  const { glossary } = sitesSystemsPageData;
  const [activeIndex, setActiveIndex] = useState(0);
  const active = glossary.items[activeIndex];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span>{glossary.eyebrow}</span>
        <h2>{glossary.title}</h2>
        <p>{glossary.description}</p>
      </div>

      <div className={styles.glossary}>
        <div className={styles.terms} role="listbox" aria-label="Termos técnicos explicados">
          {glossary.items.map((item, index) => (
            <button
              aria-selected={activeIndex === index}
              className={styles.term}
              data-active={activeIndex === index}
              key={item.term}
              onClick={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onPointerEnter={() => setActiveIndex(index)}
              role="option"
              type="button"
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.term}</strong>
              <i aria-hidden="true">?</i>
            </button>
          ))}
        </div>

        <div className={styles.explanation}>
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              key={active.term}
              transition={{ duration: reduceMotion ? 0 : 0.34 }}
            >
              <span>TERMO EXPLICADO</span>
              <h3>{active.term}</h3>
              <p>{active.explanation}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
