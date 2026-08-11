"use client";

import { useState } from "react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import { strategyPageData } from "@/data/solutions/strategy";

import styles from "./StrategyServices.module.css";

export function StrategyServices() {
  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0);

  const reduceMotion =
    Boolean(useReducedMotion());

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>
          O que colocamos em ordem
        </span>

        <h2 className={styles.title}>
          Estratégia transforma possibilidades em decisões.
        </h2>

        <p className={styles.description}>
          Cada frente responde a uma dúvida diferente. Juntas, elas formam uma
          direção que pode orientar marca, site, comunicação, campanhas e execução.
        </p>
      </div>

      <div className={styles.layout}>
        <div
          className={styles.list}
          role="tablist"
          aria-label="Serviços de estratégia"
        >
          {strategyPageData.services.map(
            (
              service,
              index,
            ) => {
              const isActive =
                activeIndex === index;

              const tabId =
                `strategy-service-tab-${index}`;

              const panelId =
                `strategy-service-panel-${index}`;

              return (
                <button
                  aria-controls={panelId}
                  aria-selected={isActive}
                  className={`${styles.item} ${
                    isActive
                      ? styles.activeItem
                      : ""
                  }`}
                  id={tabId}
                  key={service.number}
                  onClick={() =>
                    setActiveIndex(index)
                  }
                  role="tab"
                  type="button"
                >
                  <span
                    className={
                      styles.itemNumber
                    }
                  >
                    {service.number}
                  </span>

                  <span
                    className={
                      styles.itemCopy
                    }
                  >
                    <strong>
                      {service.title}
                    </strong>

                    <small>
                      {service.summary}
                    </small>
                  </span>

                  <span
                    aria-hidden="true"
                    className={
                      styles.itemArrow
                    }
                  >
                    {isActive
                      ? "→"
                      : "+"}
                  </span>
                </button>
              );
            },
          )}
        </div>

        <div
          className={
            styles.panelWrap
          }
        >
          {strategyPageData.services.map(
            (
              service,
              index,
            ) => {
              const isActive =
                activeIndex === index;

              const tabId =
                `strategy-service-tab-${index}`;

              const panelId =
                `strategy-service-panel-${index}`;

              return (
                <motion.article
                  aria-labelledby={tabId}
                  className={styles.panel}
                  hidden={!isActive}
                  id={panelId}
                  key={service.number}
                  role="tabpanel"
                  initial={false}
                  animate={
                    isActive
                      ? {
                          opacity: 1,
                          y: 0,
                        }
                      : {
                          opacity: 0,
                          y: 16,
                        }
                  }
                  transition={{
                    duration:
                      reduceMotion
                        ? 0
                        : 0.28,

                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                >
                  <div
                    className={
                      styles.panelTopline
                    }
                  >
                    <span>
                      {service.number}
                    </span>

                    <span>
                      Estratégia e direção
                    </span>
                  </div>

                  <h3>
                    {service.title}
                  </h3>

                  <p
                    className={
                      styles.panelDescription
                    }
                  >
                    {service.description}
                  </p>

                  <div
                    className={
                      styles.resolves
                    }
                  >
                    <span>
                      O que isso resolve
                    </span>

                    <p>
                      {service.resolves}
                    </p>
                  </div>

                  <div
                    className={
                      styles.deliverables
                    }
                  >
                    <span>
                      O que organizamos
                    </span>

                    <ul>
                      {service.deliverables.map(
                        (item) => (
                          <li key={item}>
                            {item}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </motion.article>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}