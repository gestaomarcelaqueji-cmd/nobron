"use client";

import { useState } from "react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import { sitesSystemsPageData } from "@/data/solutions/sitesSystems";

import styles from "./SolutionTypes.module.css";

export function SolutionTypes() {
  const reduceMotion =
    Boolean(useReducedMotion());

  const { solutionTypes } =
    sitesSystemsPageData;

  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0);

  return (
    <section
      className={
        styles.section
      }
    >
      <div
        className={
          styles.header
        }
      >
        <span>
          {solutionTypes.eyebrow}
        </span>

        <h2>
          {solutionTypes.title}
        </h2>
      </div>

      <div
        className={
          styles.explorer
        }
      >
        <div
          className={
            styles.options
          }
          role="tablist"
          aria-label="Tipos de estrutura digital"
        >
          {solutionTypes.items.map(
            (
              item,
              index,
            ) => {
              const isActive =
                activeIndex ===
                index;

              return (
                <button
                  aria-controls={`solution-type-panel-${item.id}`}
                  aria-selected={
                    isActive
                  }
                  className={
                    styles.option
                  }
                  data-active={
                    isActive
                  }
                  id={`solution-type-tab-${item.id}`}
                  key={item.id}
                  onClick={() =>
                    setActiveIndex(
                      index,
                    )
                  }
                  onFocus={() =>
                    setActiveIndex(
                      index,
                    )
                  }
                  onPointerEnter={() =>
                    setActiveIndex(
                      index,
                    )
                  }
                  role="tab"
                  type="button"
                >
                  <span>
                    {item.number}
                  </span>

                  <strong>
                    {item.title}
                  </strong>

                  {isActive ? (
                    <motion.span
                      className={
                        styles.activeRule
                      }
                      layoutId="solution-type-rule"
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
                    />
                  ) : null}
                </button>
              );
            },
          )}
        </div>

        {solutionTypes.items.map(
          (
            item,
            index,
          ) => {
            const isActive =
              activeIndex ===
              index;

            return (
              <motion.article
                aria-labelledby={`solution-type-tab-${item.id}`}
                className={
                  styles.detail
                }
                hidden={
                  !isActive
                }
                id={`solution-type-panel-${item.id}`}
                key={item.id}
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
                        y: 18,
                      }
                }
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
                    styles.detailMeta
                  }
                >
                  <span>
                    {item.number}
                  </span>

                  <span>
                    Estrutura digital
                  </span>
                </div>

                <h3>
                  {item.title}
                </h3>

                <p
                  className={
                    styles.definition
                  }
                >
                  {
                    item.definition
                  }
                </p>

                <div
                  className={
                    styles.scenario
                  }
                >
                  <span>
                    Cenário de uso
                  </span>

                  <p>
                    {
                      item.scenario
                    }
                  </p>
                </div>
              </motion.article>
            );
          },
        )}
      </div>

      <p
        className={
          styles.closing
        }
      >
        {solutionTypes.closing}
      </p>
    </section>
  );
}