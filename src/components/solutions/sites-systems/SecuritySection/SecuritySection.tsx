"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { sitesSystemsPageData } from "@/data/solutions/sitesSystems";

import { TermHelp } from "../ui/TermHelp";

import styles from "./SecuritySection.module.css";

export function SecuritySection() {
  const reduceMotion = useReducedMotion();
  const { security } = sitesSystemsPageData;
  const [activeIndex, setActiveIndex] = useState(0);
  const active = security.items[activeIndex];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span>{security.eyebrow}</span>
        <h2>{security.title}</h2>
        <p>{security.description}</p>
      </div>

      <div className={styles.securityMap}>
        <div className={styles.layers} role="listbox" aria-label="Cuidados de segurança">
          {security.items.map((item, index) => (
            <button
              aria-selected={activeIndex === index}
              className={styles.layer}
              data-active={activeIndex === index}
              key={item.number}
              onClick={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onPointerEnter={() => setActiveIndex(index)}
              role="option"
              type="button"
            >
              <span>{item.number}</span>
              <strong>{item.title}</strong>
            </button>
          ))}
        </div>

        <div className={styles.detailPanel}>
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className={styles.detailCopy}
              exit={{ opacity: 0, y: -12 }}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              key={active.title}
              transition={{ duration: reduceMotion ? 0 : 0.34 }}
            >
              <span>{active.number} / SEGURANÇA</span>
              <h3>{active.title}</h3>
              <p>{active.description}</p>

              {active.term && (
                <div className={styles.termRow}>
                  <TermHelp explanation={active.term.explanation} label={active.term.label} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <p className={styles.truth}>{security.truth}</p>
    </section>
  );
}
