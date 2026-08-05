"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { sitesSystemsPageData } from "@/data/solutions/sitesSystems";

import styles from "./SolutionTypes.module.css";

export function SolutionTypes() {
  const reduceMotion = useReducedMotion();
  const { solutionTypes } = sitesSystemsPageData;
  const [activeIndex, setActiveIndex] = useState(0);
  const active = solutionTypes.items[activeIndex];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span>{solutionTypes.eyebrow}</span>
        <h2>{solutionTypes.title}</h2>
      </div>

      <div className={styles.explorer}>
        <div className={styles.options} role="tablist" aria-label="Tipos de estrutura digital">
          {solutionTypes.items.map((item, index) => (
            <button
              aria-selected={activeIndex === index}
              className={styles.option}
              data-active={activeIndex === index}
              key={item.id}
              onClick={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onPointerEnter={() => setActiveIndex(index)}
              role="tab"
              type="button"
            >
              <span>{item.number}</span>
              <strong>{item.title}</strong>
              {activeIndex === index && (
                <motion.span
                  className={styles.activeRule}
                  layoutId="solution-type-rule"
                  transition={{ duration: reduceMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence initial={false} mode="wait">
          <motion.article
            animate={{ opacity: 1, y: 0 }}
            className={styles.detail}
            exit={{ opacity: 0, y: -16 }}
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            key={active.id}
            transition={{ duration: reduceMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.detailMeta}>
              <span>{active.number}</span>
              <span>Estrutura digital</span>
            </div>

            <h3>{active.title}</h3>
            <p className={styles.definition}>{active.definition}</p>

            <div className={styles.scenario}>
              <span>Cenário de uso</span>
              <p>{active.scenario}</p>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      <p className={styles.closing}>{solutionTypes.closing}</p>
    </section>
  );
}
