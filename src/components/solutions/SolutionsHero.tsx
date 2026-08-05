"use client";

import { motion, useReducedMotion } from "motion/react";

import styles from "./SolutionsHero.module.css";

const sequenceItems = [
  "Direção",
  "Reconhecimento",
  "Presença",
  "Descoberta",
  "Movimento",
  "Continuidade",
];

export function SolutionsHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section}>
      <div className={styles.backgroundGrid} aria-hidden="true" />
      <div className={styles.ambientLight} aria-hidden="true" />
      <div className={styles.verticalLine} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.intro}>
          <motion.div
            className={styles.heading}
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className={styles.eyebrow}>Soluções noBRon</span>

            <h1 className={styles.title}>
              Há muito entre ter uma empresa
              <span>e fazê-la avançar.</span>
            </h1>
          </motion.div>

          <motion.div
            className={styles.introContent}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{
              duration: 0.75,
              delay: 0.14,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className={styles.description}>
              Estratégia, marca, sites, sistemas, presença digital, marketing e
              automação para transformar ideias, negócios e operações em algo
              mais claro, forte e preparado para crescer.
            </p>
          </motion.div>
        </div>

        <motion.div
          className={styles.sequence}
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          transition={{
            duration: 0.8,
            delay: 0.42,
            ease: [0.22, 1, 0.36, 1],
          }}
          aria-label="Etapas das soluções noBRon"
        >
          {sequenceItems.map((item, index) => (
            <div className={styles.sequenceItem} key={item}>
              <span className={styles.sequenceIndex}>
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className={styles.sequenceName}>{item}</span>

              {index < sequenceItems.length - 1 && (
                <span className={styles.sequenceLine} aria-hidden="true" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}