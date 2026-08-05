"use client";

import { useEffect, useState } from "react";

import { motion, useReducedMotion } from "motion/react";

import { automationIntegrationsPageData } from "@/data/solutions/automationIntegrations";

import styles from "./ConnectedFlow.module.css";

export function ConnectedFlow() {
  const reduceMotion = Boolean(useReducedMotion());
  const { connectedFlow } = automationIntegrationsPageData;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % connectedFlow.nodes.length);
    }, 1900);

    return () => window.clearInterval(interval);
  }, [connectedFlow.nodes.length, reduceMotion]);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.heading}>
          <span>{connectedFlow.eyebrow}</span>
          <h2>{connectedFlow.title}</h2>
          <p>{connectedFlow.description}</p>
        </header>

        <div className={styles.flow}>
          <button
            className={styles.start}
            onClick={() => setActiveIndex(0)}
            type="button"
          >
            <span>Entrada</span>
            <strong>{connectedFlow.start}</strong>
          </button>

          <div aria-hidden="true" className={styles.connector}>
            <motion.i
              animate={reduceMotion ? undefined : { x: ["-100%", "230%"] }}
              transition={{
                duration: 2,
                ease: "linear",
                repeat: reduceMotion ? 0 : Infinity,
              }}
            />
          </div>

          <div className={styles.nodes}>
            {connectedFlow.nodes.map((node, index) => (
              <button
                aria-pressed={activeIndex === index}
                className={styles.node}
                data-active={activeIndex === index}
                key={node.title}
                onClick={() => setActiveIndex(index)}
                type="button"
              >
                <span>{node.number}</span>
                <strong>{node.title}</strong>
                <p>{node.description}</p>
              </button>
            ))}
          </div>
        </div>

        <p className={styles.exception}>{connectedFlow.exception}</p>
      </div>
    </section>
  );
}
