"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";

import { sitesSystemsPageData } from "@/data/solutions/sitesSystems";

import styles from "./TechnologyProgress.module.css";

export function TechnologyProgress() {
  const reduceMotion = useReducedMotion();
  const { progress } = sitesSystemsPageData;
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(
      progress.words.length - 1,
      Math.max(0, Math.floor(value * progress.words.length)),
    );
    setActiveIndex(next);
  });

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.sticky}>
        <div className={styles.copy}>
          <span>{progress.eyebrow}</span>
          <h2>{progress.title}</h2>
        </div>

        <ol className={styles.words}>
          {progress.words.map((word, index) => (
            <motion.li
              animate={{
                opacity: index === activeIndex ? 1 : 0.11,
                x: index === activeIndex && !reduceMotion ? 14 : 0,
              }}
              data-active={index === activeIndex}
              key={word}
              transition={{ duration: reduceMotion ? 0 : 0.32 }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{word}</strong>
            </motion.li>
          ))}
        </ol>

        <div className={styles.explanation}>
          <p>{progress.description}</p>
          <strong>{progress.closing}</strong>
        </div>
      </div>
    </section>
  );
}
