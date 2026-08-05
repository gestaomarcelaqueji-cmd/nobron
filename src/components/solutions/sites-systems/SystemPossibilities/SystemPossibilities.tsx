"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { sitesSystemsPageData } from "@/data/solutions/sitesSystems";

import { TermHelp } from "../ui/TermHelp";

import styles from "./SystemPossibilities.module.css";

export function SystemPossibilities() {
  const reduceMotion = useReducedMotion();
  const { possibilities } = sitesSystemsPageData;
  const [activeIndex, setActiveIndex] = useState(0);
  const active = possibilities.items[activeIndex];

  return (
    <section className={styles.section}>
      <div className={styles.intro}>
        <span>{possibilities.eyebrow}</span>
        <h2>{possibilities.title}</h2>
      </div>

      <div className={styles.layout}>
        <div className={styles.activePanel}>
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              key={active.title}
              transition={{ duration: reduceMotion ? 0 : 0.36, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={styles.activeNumber}>{active.number}</span>
              <h3>{active.title}</h3>
              <p>{active.description}</p>
              {active.term && (
                <div className={styles.termRow}>
                  <TermHelp explanation={active.term.explanation} label={active.term.label} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div aria-hidden="true" className={styles.signalField}>
            {Array.from({ length: 16 }).map((_, index) => (
              <motion.span
                animate={{
                  opacity: [0.08, 0.52, 0.08],
                  scaleY: [0.35, 1, 0.35],
                }}
                key={index}
                transition={{
                  duration: reduceMotion ? 0 : 2.2 + (index % 4) * 0.28,
                  delay: index * 0.06,
                  repeat: reduceMotion ? 0 : Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>

        <div className={styles.list} role="listbox" aria-label="Possibilidades de um sistema">
          {possibilities.items.map((item, index) => (
            <button
              aria-selected={activeIndex === index}
              className={styles.item}
              data-active={activeIndex === index}
              key={item.title}
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
      </div>
    </section>
  );
}
