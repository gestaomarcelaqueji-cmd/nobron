"use client";

import { useState } from "react";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { marketingDigitalPageData } from "@/data/solutions/marketingDigital";

import styles from "./MarketingRoles.module.css";

export function MarketingRoles() {
  const reduceMotion = Boolean(useReducedMotion());
  const { roles } = marketingDigitalPageData;
  const [activeIndex, setActiveIndex] = useState(0);
  const activeRole = roles.items[activeIndex];

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.heading}>
          <span>{roles.eyebrow}</span>
          <h2>{roles.title}</h2>
          <p>{roles.description}</p>
        </header>

        <div className={styles.experience}>
          <div className={styles.roleNavigation}>
            {roles.items.map((role, index) => (
              <button
                aria-pressed={activeIndex === index}
                className={styles.roleButton}
                key={role.title}
                onClick={() => setActiveIndex(index)}
                type="button"
              >
                <span>{role.number}</span>
                <strong>{role.title}</strong>
              </button>
            ))}
          </div>

          <div aria-live="polite" className={styles.roleContent}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRole.title}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className={styles.roleNumber}>{activeRole.number}</span>
                <h3>{activeRole.title}</h3>
                <p>{activeRole.responsibility}</p>

                <div className={styles.examples}>
                  {activeRole.examples.map((example) => (
                    <span key={example}>{example}</span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <p className={styles.support}>{roles.support}</p>
      </div>
    </section>
  );
}
