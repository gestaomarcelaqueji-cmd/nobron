"use client";

import { useState } from "react";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { automationIntegrationsPageData } from "@/data/solutions/automationIntegrations";

import styles from "./AutomationConcepts.module.css";

export function AutomationConcepts() {
  const reduceMotion = Boolean(useReducedMotion());
  const { concepts } = automationIntegrationsPageData;
  const [activeId, setActiveId] = useState(concepts.items[0].id);

  const activeItem =
    concepts.items.find((item) => item.id === activeId) ?? concepts.items[0];

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.heading}>
          <span>{concepts.eyebrow}</span>
          <h2>{concepts.title}</h2>
          <p>{concepts.description}</p>
        </header>

        <div className={styles.explainer}>
          <div className={styles.tabs} role="tablist" aria-label="Conceitos">
            {concepts.items.map((item) => (
              <button
                aria-selected={activeId === item.id}
                className={styles.tab}
                key={item.id}
                onClick={() => setActiveId(item.id)}
                role="tab"
                type="button"
              >
                <span>{item.number}</span>
                <strong>{item.title}</strong>
              </button>
            ))}
          </div>

          <div className={styles.panel}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className={styles.panelNumber}>{activeItem.number}</span>
                <h3>{activeItem.title}</h3>
                <p className={styles.description}>{activeItem.description}</p>

                <div className={styles.example}>
                  <span>Exemplo</span>
                  <p>{activeItem.example}</p>
                </div>

                <div className={styles.notMeaning}>
                  <span>Não significa</span>
                  <p>{activeItem.doesNotMean}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
