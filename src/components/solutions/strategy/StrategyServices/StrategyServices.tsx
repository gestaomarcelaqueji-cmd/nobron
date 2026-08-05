"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { strategyPageData } from "@/data/solutions/strategy";

import styles from "./StrategyServices.module.css";

export function StrategyServices() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const activeService = strategyPageData.services[activeIndex];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>O que colocamos em ordem</span>
        <h2 className={styles.title}>Estratégia transforma possibilidades em decisões.</h2>
        <p className={styles.description}>
          Cada frente responde a uma dúvida diferente. Juntas, elas formam uma
          direção que pode orientar marca, site, comunicação, campanhas e execução.
        </p>
      </div>

      <div className={styles.layout}>
        <div className={styles.list} role="tablist" aria-label="Serviços de estratégia">
          {strategyPageData.services.map((service, index) => {
            const isActive = activeIndex === index;

            return (
              <button
                className={`${styles.item} ${isActive ? styles.activeItem : ""}`}
                key={service.number}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="strategy-service-panel"
                onClick={() => setActiveIndex(index)}
              >
                <span className={styles.itemNumber}>{service.number}</span>
                <span className={styles.itemCopy}>
                  <strong>{service.title}</strong>
                  <small>{service.summary}</small>
                </span>
                <span className={styles.itemArrow} aria-hidden="true">
                  {isActive ? "→" : "+"}
                </span>
              </button>
            );
          })}
        </div>

        <div className={styles.panelWrap}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              className={styles.panel}
              id="strategy-service-panel"
              key={activeService.number}
              role="tabpanel"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.panelTopline}>
                <span>{activeService.number}</span>
                <span>Estratégia e direção</span>
              </div>

              <h3>{activeService.title}</h3>
              <p className={styles.panelDescription}>{activeService.description}</p>

              <div className={styles.resolves}>
                <span>O que isso resolve</span>
                <p>{activeService.resolves}</p>
              </div>

              <div className={styles.deliverables}>
                <span>O que organizamos</span>
                <ul>
                  {activeService.deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
