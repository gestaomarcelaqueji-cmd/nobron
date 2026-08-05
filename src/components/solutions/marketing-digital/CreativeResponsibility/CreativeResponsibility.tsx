"use client";

import { useRef } from "react";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

import { marketingDigitalPageData } from "@/data/solutions/marketingDigital";

import styles from "./CreativeResponsibility.module.css";

export function CreativeResponsibility() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = Boolean(useReducedMotion());
  const { creative } = marketingDigitalPageData;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const trackX = useTransform(scrollYProgress, [0, 1], ["4%", "-24%"]);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div aria-hidden="true" className={styles.backgroundTrack}>
        <motion.div style={reduceMotion ? undefined : { x: trackX }}>
          CRIATIVO CRIATIVO CRIATIVO
        </motion.div>
      </div>

      <div className={styles.inner}>
        <header className={styles.heading}>
          <span>{creative.eyebrow}</span>
          <h2>{creative.title}</h2>
          <p>{creative.description}</p>
        </header>

        <div className={styles.sequence}>
          {creative.sequence.map((item, index) => (
            <div className={styles.sequenceItem} key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item}</strong>
            </div>
          ))}
        </div>

        <p className={styles.support}>{creative.support}</p>
      </div>
    </section>
  );
}
