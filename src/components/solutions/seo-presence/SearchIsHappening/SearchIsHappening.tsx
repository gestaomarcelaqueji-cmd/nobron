"use client";

import { useEffect, useState } from "react";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { seoPresencePageData } from "@/data/solutions/seoPresence";

import styles from "./SearchIsHappening.module.css";

export function SearchIsHappening() {
  const reduceMotion = Boolean(useReducedMotion());
  const { search } = seoPresencePageData;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % search.queries.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, [reduceMotion, search.queries.length]);

  const activeQuery = search.queries[activeIndex];

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          className={styles.copy}
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          transition={{ duration: reduceMotion ? 0 : 0.75, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ amount: 0.35, once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span>{search.eyebrow}</span>
          <h2>{search.title}</h2>
          <p>{search.description}</p>
        </motion.div>

        <div className={styles.searchExperience}>
          <div className={styles.searchBar}>
            <span aria-hidden="true" className={styles.searchIcon} />
            <AnimatePresence mode="wait">
              <motion.span
                key={activeQuery.query}
                className={styles.query}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: reduceMotion ? 0 : 0.35 }}
              >
                {activeQuery.query}
              </motion.span>
            </AnimatePresence>
          </div>

          <div aria-live="polite" className={styles.result}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeQuery.resultTitle}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className={styles.resultUrl}>empresa.com.br / serviço</span>
                <div className={styles.resultTitle}>
                  {activeQuery.resultTitle}
                </div>
                <strong>{activeQuery.resultMeta}</strong>
                <p>{activeQuery.resultDescription}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className={styles.queryNavigation}>
            {search.queries.map((item, index) => (
              <button
                aria-label={`Mostrar busca: ${item.query}`}
                aria-pressed={activeIndex === index}
                className={styles.queryButton}
                key={item.query}
                onClick={() => setActiveIndex(index)}
                type="button"
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
