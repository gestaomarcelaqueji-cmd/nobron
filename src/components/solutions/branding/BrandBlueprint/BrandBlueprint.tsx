"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { brandingPageData } from "@/data/solutions/branding";

import styles from "./BrandBlueprint.module.css";

type Reveal = { x: number; y: number; active: boolean };

export function BrandBlueprint() {
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const { blueprint } = brandingPageData;
  const [reveal, setReveal] = useState<Reveal>({ x: 50, y: 50, active: false });

  function updateReveal(event: React.PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    setReveal({
      x: ((event.clientX - bounds.left) / bounds.width) * 100,
      y: ((event.clientY - bounds.top) / bounds.height) * 100,
      active: true,
    });
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.copy}>
          <div className={styles.layerMeta}>
            <span>{blueprint.number}</span>
            <strong>{blueprint.label}</strong>
          </div>
          <h2>{blueprint.title}</h2>
          <p>{blueprint.description}</p>

          <div className={styles.tags}>
            {blueprint.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </div>

        <div
          ref={stageRef}
          className={styles.stage}
          onPointerMove={updateReveal}
          onPointerEnter={updateReveal}
          onPointerLeave={() => setReveal((current) => ({ ...current, active: false }))}
          style={{
            "--reveal-x": `${reveal.x}%`,
            "--reveal-y": `${reveal.y}%`,
            "--reveal-size": reveal.active ? "190px" : "0px",
          } as React.CSSProperties}
        >
          <div className={styles.microHeader}>
            <span>NB / BRAND CONSTRUCTION</span>
            <span>VECTOR MODE</span>
          </div>

          <div className={styles.grid} />
          <div className={styles.majorAxisX} />
          <div className={styles.majorAxisY} />
          <div className={styles.safeArea} />

          <motion.div
            className={styles.wordmarkOutline}
            initial={reduceMotion ? false : { clipPath: "inset(0 100% 0 0)" }}
            whileInView={reduceMotion ? undefined : { clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className={styles.wordmarkGhost} />
          <div className={styles.wordmarkReveal} />

          <svg className={styles.controls} viewBox="0 0 1000 360" aria-hidden="true">
            <motion.path
              d="M 95 178 C 220 45, 360 45, 490 178 S 760 310, 905 178"
              initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
              whileInView={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 1.15, delay: 0.25 }}
            />
            <line x1="95" y1="178" x2="220" y2="45" />
            <line x1="905" y1="178" x2="760" y2="310" />
            <circle cx="95" cy="178" r="6" />
            <circle cx="220" cy="45" r="5" />
            <circle cx="760" cy="310" r="5" />
            <circle cx="905" cy="178" r="6" />
          </svg>

          <div className={styles.measureTop}><span>8.42x</span></div>
          <div className={styles.measureSide}><span>2.01x</span></div>

          <div className={styles.cursorLabel} style={{ left: `${reveal.x}%`, top: `${reveal.y}%` }}>
            PREVIEW
          </div>

          <span className={styles.instruction}>{blueprint.instruction}</span>
        </div>
      </div>
    </section>
  );
}
