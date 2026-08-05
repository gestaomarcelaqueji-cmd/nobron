"use client";

import { motion, useReducedMotion } from "motion/react";

import styles from "./DisconnectedStructure.module.css";

const fragments = [
  { label: "Marca", issue: "não representa mais", className: styles.brand },
  { label: "Site", issue: "não explica direito", className: styles.site },
  {
    label: "Marketing",
    issue: "gera movimento sem direção",
    className: styles.marketing,
  },
  {
    label: "Atendimento",
    issue: "depende de repetição",
    className: styles.service,
  },
  {
    label: "Busca",
    issue: "a empresa não aparece",
    className: styles.search,
  },
];

export function DisconnectedStructure() {
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section}>
      <div className={styles.copy}>
        <span className={styles.eyebrow}>Antes de indicar uma entrega</span>

        <h2 className={styles.title}>
          O problema nem sempre está onde parece.
        </h2>

        <div className={styles.body}>
          <p>
            Você pode chegar pensando que precisa de um site e descobrir que a
            oferta ainda não está clara.
          </p>

          <p>
            Pode investir em marketing e perceber que não existe uma estrutura
            preparada para receber as pessoas. Ou ter uma boa empresa sem
            conseguir transmitir isso online.
          </p>
        </div>

        <p className={styles.emphasis}>
          Por isso, antes de indicar uma peça, olhamos para o conjunto.
        </p>
      </div>

      <div className={styles.visual} aria-hidden="true">
        <div className={styles.visualGrid} />

        {fragments.map((fragment, index) => (
          <motion.div
            key={fragment.label}
            className={`${styles.fragment} ${fragment.className}`}
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    scale: 0.88,
                    x: index % 2 === 0 ? -24 : 24,
                  }
            }
            whileInView={
              reduceMotion
                ? undefined
                : { opacity: 1, scale: 1, x: 0 }
            }
            viewport={{ once: true, amount: 0.45 }}
            transition={{
              duration: 0.65,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className={styles.fragmentLabel}>{fragment.label}</span>
            <span className={styles.fragmentIssue}>{fragment.issue}</span>
          </motion.div>
        ))}

        <motion.div
          className={styles.warning}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.65,
            delay: 0.38,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span>!</span>
          <p>Peças boas também falham quando trabalham sozinhas.</p>
        </motion.div>

        <svg className={styles.looseLines} viewBox="0 0 700 620">
          <path d="M165 135 C245 190 250 225 315 280" />
          <path d="M515 125 C455 180 445 235 390 280" />
          <path d="M115 390 C205 350 240 325 315 300" />
          <path d="M570 410 C485 360 445 330 395 303" />
          <path d="M350 515 C350 435 350 385 350 330" />
        </svg>
      </div>
    </section>
  );
}
