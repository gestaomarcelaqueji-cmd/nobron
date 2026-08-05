"use client";

import { useRef, useState } from "react";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import { marketingDigitalPageData } from "@/data/solutions/marketingDigital";

import styles from "./MeasurementPath.module.css";

export function MeasurementPath() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = Boolean(useReducedMotion());
  const { measurement } = marketingDigitalPageData;
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.15"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 105,
    damping: 28,
    mass: 0.42,
  });

  const fillScale = useTransform(smoothProgress, [0.1, 0.9], [0, 1]);

  useMotionValueEvent(smoothProgress, "change", (value) => {
    if (reduceMotion) return;

    const nextIndex = Math.min(
      measurement.stages.length - 1,
      Math.max(0, Math.floor(value * measurement.stages.length)),
    );

    setActiveIndex(nextIndex);
  });

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.sticky}>
        <div className={styles.inner}>
          <header className={styles.heading}>
            <span>{measurement.eyebrow}</span>
            <h2>{measurement.title}</h2>
            <p>{measurement.description}</p>
          </header>

          <div className={styles.path}>
            <div aria-hidden="true" className={styles.pathBase} />
            <motion.div
              aria-hidden="true"
              className={styles.pathFill}
              style={reduceMotion ? { scaleX: 1 } : { scaleX: fillScale }}
            />

            <ol>
              {measurement.stages.map((stage, index) => (
                <li data-active={reduceMotion || index <= activeIndex} key={stage.title}>
                  <span>{stage.number}</span>
                  <strong>{stage.title}</strong>
                  <p>{stage.description}</p>
                </li>
              ))}
            </ol>
          </div>

          <p className={styles.support}>{measurement.support}</p>
        </div>
      </div>
    </section>
  );
}
