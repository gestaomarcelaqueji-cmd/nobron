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

import { seoPresencePageData } from "@/data/solutions/seoPresence";

import styles from "./AdsNeedDirection.module.css";

export function AdsNeedDirection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = Boolean(useReducedMotion());
  const { ads } = seoPresencePageData;
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.42,
  });

  const lineScale = useTransform(smoothProgress, [0.12, 0.88], [0, 1]);
  const contentY = useTransform(smoothProgress, [0, 1], [50, -30]);

  useMotionValueEvent(smoothProgress, "change", (value) => {
    if (reduceMotion) return;

    const nextStep = Math.min(
      ads.steps.length - 1,
      Math.max(0, Math.floor(value * ads.steps.length)),
    );

    setActiveStep(nextStep);
  });

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.sticky}>
        <motion.div
          className={styles.inner}
          style={reduceMotion ? undefined : { y: contentY }}
        >
          <header className={styles.heading}>
            <span>{ads.eyebrow}</span>
            <h2>{ads.title}</h2>
            <p>{ads.description}</p>
          </header>

          <div className={styles.route}>
            <div aria-hidden="true" className={styles.baseLine} />

            <motion.div
              aria-hidden="true"
              className={styles.activeLine}
              style={reduceMotion ? { scaleX: 1 } : { scaleX: lineScale }}
            />

            <ol>
              {ads.steps.map((step, index) => (
                <li data-active={reduceMotion || index <= activeStep} key={step.title}>
                  <span>{step.number}</span>
                  <strong>{step.title}</strong>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </div>

          <p className={styles.statement}>{ads.statement}</p>
        </motion.div>
      </div>
    </section>
  );
}
