"use client";

import Link from "next/link";

import { useState } from "react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import { sitesSystemsPageData } from "@/data/solutions/sitesSystems";

import { TermHelp } from "../ui/TermHelp";

import styles from "./SystemPossibilities.module.css";

export function SystemPossibilities() {
  const reduceMotion =
    Boolean(useReducedMotion());

  const { possibilities } =
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
          styles.intro
        }
      >
        <span>
          {possibilities.eyebrow}
        </span>

        <h2>
          {possibilities.title}
        </h2>
      </div>

      <div
        className={
          styles.layout
        }
      >
        <div
          className={
            styles.activePanel
          }
        >
          {possibilities.items.map(
            (
              item,
              index,
            ) => {
              const isActive =
                activeIndex ===
                index;

              return (
                <motion.div
                  aria-labelledby={`system-possibility-option-${index}`}
                  hidden={
                    !isActive
                  }
                  id={`system-possibility-panel-${index}`}
                  key={
                    item.title
                  }
                  role="region"
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
                        : 0.36,

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
                      styles.activeNumber
                    }
                  >
                    {
                      item.number
                    }
                  </span>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {
                      item.description
                    }

                    {item.relatedPage ? (
                      <>
                        {" "}
                        {
                          item.relatedPage
                            .prefix
                        }{" "}

                        <Link
                          className="contextual-link"
                          href={
                            item.relatedPage
                              .href
                          }
                        >
                          {
                            item.relatedPage
                              .label
                          }
                        </Link>
                        .
                      </>
                    ) : null}
                  </p>

                  {item.term ? (
                    <div
                      className={
                        styles.termRow
                      }
                    >
                      <TermHelp
                        explanation={
                          item.term
                            .explanation
                        }
                        label={
                          item.term
                            .label
                        }
                      />
                    </div>
                  ) : null}
                </motion.div>
              );
            },
          )}

          <div
            aria-hidden="true"
            className={
              styles.signalField
            }
          >
            {Array.from({
              length: 16,
            }).map(
              (
                _,
                index,
              ) => (
                <motion.span
                  animate={{
                    opacity: [
                      0.08,
                      0.52,
                      0.08,
                    ],

                    scaleY: [
                      0.35,
                      1,
                      0.35,
                    ],
                  }}
                  key={index}
                  transition={{
                    duration:
                      reduceMotion
                        ? 0
                        : 2.2 +
                          (index %
                            4) *
                            0.28,

                    delay:
                      index *
                      0.06,

                    repeat:
                      reduceMotion
                        ? 0
                        : Infinity,

                    ease:
                      "easeInOut",
                  }}
                />
              ),
            )}
          </div>
        </div>

        <div
          className={
            styles.list
          }
          role="listbox"
          aria-label="Possibilidades de um sistema"
        >
          {possibilities.items.map(
            (
              item,
              index,
            ) => {
              const isActive =
                activeIndex ===
                index;

              return (
                <button
                  aria-controls={`system-possibility-panel-${index}`}
                  aria-selected={
                    isActive
                  }
                  className={
                    styles.item
                  }
                  data-active={
                    isActive
                  }
                  id={`system-possibility-option-${index}`}
                  key={
                    item.title
                  }
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
                  role="option"
                  type="button"
                >
                  <span>
                    {item.number}
                  </span>

                  <strong>
                    {item.title}
                  </strong>
                </button>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}