"use client";

import { useState } from "react";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { automationIntegrationsPageData } from "@/data/solutions/automationIntegrations";

import styles from "./AutomationServices.module.css";

export function AutomationServices() {
  const reduceMotion = Boolean(useReducedMotion());
  const { servicesIntro, services } = automationIntegrationsPageData;
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.heading}>
          <span>{servicesIntro.eyebrow}</span>
          <h2>{servicesIntro.title}</h2>
          <p>{servicesIntro.description}</p>
        </header>

        <div className={styles.directory}>
          {services.map((service, index) => {
            const isOpen = openIndex === index;
            const panelId = `automation-service-panel-${index}`;

            return (
              <article className={styles.service} data-open={isOpen} key={service.title}>
                <button
                  aria-controls={panelId}
                  aria-expanded={isOpen}
                  className={styles.serviceButton}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  type="button"
                >
                  <span className={styles.number}>{service.number}</span>

                  <span className={styles.serviceTitle}>
                    <strong>{service.title}</strong>
                    <small>{service.summary}</small>
                  </span>

                  <span aria-hidden="true" className={styles.toggle}>
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      animate={{ height: "auto", opacity: 1 }}
                      className={styles.panel}
                      exit={{ height: 0, opacity: 0 }}
                      id={panelId}
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className={styles.panelInner}>
                        <div>
                          <span className={styles.panelLabel}>Na prática</span>
                          <ul>
                            {service.details.map((detail) => (
                              <li key={detail}>{detail}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <span className={styles.panelLabel}>O que resolve</span>
                          <p>{service.resolves}</p>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
