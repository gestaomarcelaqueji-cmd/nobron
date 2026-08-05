"use client";

import { motion, useReducedMotion } from "motion/react";

import { strategyPageData } from "@/data/solutions/strategy";

import styles from "./DirectionProblem.module.css";

export function DirectionProblem() {
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>Quando falta direção</span>
          <h2 className={styles.title}>
            Talvez não esteja faltando esforço. Esteja faltando direção.
          </h2>
          <p className={styles.description}>
            Criar mais uma peça, abrir mais um canal ou mudar novamente a marca
            pode até gerar movimento. Mas, sem uma decisão central, cada ação
            tenta resolver um problema diferente.
          </p>

          <div className={styles.statement}>
            <span>O ponto não é fazer tudo.</span>
            <strong>É saber o que precisa acontecer agora.</strong>
          </div>
        </div>

        <div className={styles.decisions}>
          <div className={styles.decisionHeader}>
            <span>Decisões comuns</span>
            <span>Antes de executar</span>
          </div>

          {strategyPageData.decisions.map((decision, index) => (
            <motion.article
              className={styles.decision}
              key={decision.title}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.55 }}
              transition={{
                duration: 0.5,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className={styles.number}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{decision.title}</h3>
              <p>{decision.question}</p>
              <span className={styles.marker} aria-hidden="true">
                ?
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
