"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

import { sitesSystemsPageData, type ProcessStep } from "@/data/solutions/sitesSystems";

import styles from "./DevelopmentProcess.module.css";

function ProcessCard({
  step,
  index,
  activeIndex,
  onActive,
}: {
  step: ProcessStep;
  index: number;
  activeIndex: number;
  onActive: (index: number) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const wasInView = useRef(false);
  const inView = useInView(ref, { amount: 0.55 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (inView && !wasInView.current) {
      onActive(index);
    }

    wasInView.current = inView;
  }, [inView, index, onActive]);

  return (
    <motion.article
      ref={ref}
      animate={{ opacity: activeIndex === index ? 1 : 0.28 }}
      className={styles.step}
      transition={{ duration: reduceMotion ? 0 : 0.3 }}
    >
      <span>{step.number}</span>
      <div>
        <h3>{step.title}</h3>
        <p>{step.description}</p>
        <strong>{step.result}</strong>
      </div>
    </motion.article>
  );
}

export function DevelopmentProcess() {
  const { process } = sitesSystemsPageData;
  const [activeIndex, setActiveIndex] = useState(0);
  const active = process.steps[activeIndex];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span>{process.eyebrow}</span>
        <h2>{process.title}</h2>
      </div>

      <div className={styles.layout}>
        <aside className={styles.stickyIndex}>
          <span>{active.number}</span>
          <strong>{active.title}</strong>
          <div className={styles.progress}>
            <span style={{ transform: `scaleY(${(activeIndex + 1) / process.steps.length})` }} />
          </div>
        </aside>

        <div className={styles.steps}>
          {process.steps.map((step, index) => (
            <ProcessCard
              activeIndex={activeIndex}
              index={index}
              key={step.number}
              onActive={setActiveIndex}
              step={step}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
