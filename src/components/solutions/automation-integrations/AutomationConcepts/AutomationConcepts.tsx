"use client";

import Link from "next/link";

import { useState } from "react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import { automationIntegrationsPageData } from "@/data/solutions/automationIntegrations";

import styles from "./AutomationConcepts.module.css";

export function AutomationConcepts() {
  const reduceMotion =
    Boolean(useReducedMotion());

  const { concepts } =
    automationIntegrationsPageData;

  const [
    activeId,
    setActiveId,
  ] = useState(
    concepts.items[0].id,
  );

  return (
    <section
      className={
        styles.section
      }
    >
      <div
        className={
          styles.inner
        }
      >
        <header
          className={
            styles.heading
          }
        >
          <span>
            {concepts.eyebrow}
          </span>

          <h2>
            {concepts.title}
          </h2>

          <p>
            {concepts.description}
          </p>
        </header>

        <div
          className={
            styles.explainer
          }
        >
          <div
            className={
              styles.tabs
            }
            role="tablist"
            aria-label="Conceitos"
          >
            {concepts.items.map(
              (item) => {
                const isActive =
                  activeId ===
                  item.id;

                return (
                  <button
                    aria-controls={`automation-concept-panel-${item.id}`}
                    aria-selected={
                      isActive
                    }
                    className={
                      styles.tab
                    }
                    id={`automation-concept-tab-${item.id}`}
                    key={
                      item.id
                    }
                    onClick={() =>
                      setActiveId(
                        item.id,
                      )
                    }
                    role="tab"
                    type="button"
                  >
                    <span>
                      {
                        item.number
                      }
                    </span>

                    <strong>
                      {
                        item.title
                      }
                    </strong>
                  </button>
                );
              },
            )}
          </div>

          <div
            className={
              styles.panel
            }
          >
            {concepts.items.map(
              (item) => {
                const isActive =
                  activeId ===
                  item.id;

                return (
                  <motion.div
                    aria-labelledby={`automation-concept-tab-${item.id}`}
                    hidden={
                      !isActive
                    }
                    id={`automation-concept-panel-${item.id}`}
                    key={
                      item.id
                    }
                    role="tabpanel"
                    initial={
                      false
                    }
                    animate={
                      isActive
                        ? {
                            opacity:
                              1,
                            y: 0,
                          }
                        : {
                            opacity:
                              0,
                            y: 18,
                          }
                    }
                    transition={{
                      duration:
                        reduceMotion
                          ? 0
                          : 0.4,

                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                  >
                    <span
                      className={
                        styles.panelNumber
                      }
                    >
                      {
                        item.number
                      }
                    </span>

                    <h3>
                      {
                        item.title
                      }
                    </h3>

                    <p
                      className={
                        styles.description
                      }
                    >
                      {
                        item.description
                      }

                      {item.id ===
                      "system" ? (
                        <>
                          {" "}
                          Quando o projeto
                          precisa dessa
                          estrutura própria,
                          veja também{" "}

                          <Link
                            className="contextual-link"
                            href="/solucoes/sites-sistemas"
                          >
                            Sites e Sistemas
                          </Link>
                          .
                        </>
                      ) : null}
                    </p>

                    <div
                      className={
                        styles.example
                      }
                    >
                      <span>
                        Exemplo
                      </span>

                      <p>
                        {
                          item.example
                        }
                      </p>
                    </div>

                    <div
                      className={
                        styles.notMeaning
                      }
                    >
                      <span>
                        Não significa
                      </span>

                      <p>
                        {
                          item.doesNotMean
                        }
                      </p>
                    </div>
                  </motion.div>
                );
              },
            )}
          </div>
        </div>
      </div>
    </section>
  );
}