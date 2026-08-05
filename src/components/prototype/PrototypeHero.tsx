"use client";

import { motion, useReducedMotion } from "motion/react";

import styles from "./PrototypeRequest.module.css";

export function PrototypeHero() {
  const reducedMotion = useReducedMotion();

  return (
    <section className={styles.hero}>
      <div className={styles.gridBackground} aria-hidden="true" />
      <div className={styles.heroGlow} aria-hidden="true" />

      <motion.div
        className={styles.heroContent}
        initial={
          reducedMotion
            ? false
            : { opacity: 0, y: 18, filter: "blur(8px)" }
        }
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: reducedMotion ? 0 : 0.62 }}
      >
        <h1>Receba uma proposta de Landing Page para o seu negócio.</h1>

        <p>
          Preencha o formulário para receber, pelo WhatsApp, um vídeo mostrando
          como sua página pode ficar. Sem custo e sem compromisso.
        </p>
      </motion.div>
    </section>
  );
}
