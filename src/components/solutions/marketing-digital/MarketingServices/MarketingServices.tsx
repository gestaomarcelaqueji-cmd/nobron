"use client";

import { useState } from "react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import { marketingDigitalPageData } from "@/data/solutions/marketingDigital";

import styles from "./MarketingServices.module.css";

export function MarketingServices() {
  const reduceMotion =
    Boolean(useReducedMotion());

  const {
    servicesIntro,
    services,
  } = marketingDigitalPageData;

  const [openIndex, setOpenIndex] =
    useState(0);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header
          className={
            styles.heading
          }
        >
          <span>
            {servicesIntro.eyebrow}
          </span>

          <h2>
            {servicesIntro.title}
          </h2>

          <p>
            {servicesIntro.description}
          </p>
        </header>

        <div
          className={
            styles.directory
          }
        >
          {services.map(
            (
              service,
              index,
            ) => {
              const isOpen =
                openIndex === index;

              const panelId =
                `marketing-service-panel-${index}`;

              return (
                <article
                  className={
                    styles.service
                  }
                  data-open={
                    isOpen
                  }
                  key={
                    service.title
                  }
                >
                  <button
                    aria-controls={
                      panelId
                    }
                    aria-expanded={
                      isOpen
                    }
                    className={
                      styles.serviceButton
                    }
                    onClick={() =>
                      setOpenIndex(
                        isOpen
                          ? -1
                          : index,
                      )
                    }
                    type="button"
                  >
                    <span
                      className={
                        styles.number
                      }
                    >
                      {
                        service.number
                      }
                    </span>

                    <span
                      className={
                        styles.serviceTitle
                      }
                    >
                      <strong>
                        {
                          service.title
                        }
                      </strong>

                      <small>
                        {
                          service.summary
                        }
                      </small>
                    </span>

                    <span
                      aria-hidden="true"
                      className={
                        styles.toggle
                      }
                    >
                      {isOpen
                        ? "−"
                        : "+"}
                    </span>
                  </button>

                  {/*
                   * O painel permanece sempre
                   * renderizado no HTML.
                   *
                   * O accordion controla apenas
                   * a apresentação visual.
                   */}
                  <motion.div
                    aria-hidden={
                      !isOpen
                    }
                    animate={{
                      height: isOpen
                        ? "auto"
                        : 0,
                      opacity: isOpen
                        ? 1
                        : 0,
                    }}
                    className={
                      styles.panel
                    }
                    id={panelId}
                    initial={false}
                    style={{
                      overflow:
                        "hidden",
                      pointerEvents:
                        isOpen
                          ? "auto"
                          : "none",
                    }}
                    transition={{
                      duration:
                        reduceMotion
                          ? 0
                          : 0.42,
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
                        styles.panelInner
                      }
                    >
                      <div>
                        <span
                          className={
                            styles.panelLabel
                          }
                        >
                          Na prática
                        </span>

                        <ul>
                          {service.details.map(
                            (
                              detail,
                            ) => (
                              <li
                                key={
                                  detail
                                }
                              >
                                {
                                  detail
                                }
                              </li>
                            ),
                          )}
                        </ul>
                      </div>

                      <div>
                        <span
                          className={
                            styles.panelLabel
                          }
                        >
                          O que resolve
                        </span>

                        <p>
                          {
                            service.resolves
                          }
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </article>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}