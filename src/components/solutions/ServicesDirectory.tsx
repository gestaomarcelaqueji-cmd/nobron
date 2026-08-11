"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
} from "motion/react";
import { useState } from "react";

import { solutionCategories } from "./solutions.data";
import styles from "./ServicesDirectory.module.css";

export function ServicesDirectory() {
  const [openId, setOpenId] =
    useState<string>("strategy");

  const reduceMotion =
    Boolean(useReducedMotion());

  return (
    <section
      id="servicos"
      className={styles.section}
    >
      <div className={styles.heading}>
        <span className={styles.eyebrow}>
          Serviços por área
        </span>

        <h2 className={styles.title}>
          Entenda o que cada solução pode resolver.
        </h2>

        <p className={styles.description}>
          Abra uma categoria para conhecer os problemas que ela resolve, os
          serviços disponíveis e como essa área pode participar do
          desenvolvimento da sua empresa.
        </p>
      </div>

      <div className={styles.directory}>
        {solutionCategories.map(
          (category) => {
            const isOpen =
              openId === category.id;

            return (
              <article
                key={category.id}
                className={[
                  styles.item,
                  isOpen
                    ? styles.itemOpen
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <button
                  type="button"
                  className={
                    styles.itemButton
                  }
                  aria-expanded={isOpen}
                  aria-controls={`category-${category.id}`}
                  onClick={() =>
                    setOpenId(
                      (current) =>
                        current ===
                        category.id
                          ? ""
                          : category.id,
                    )
                  }
                >
                  <span
                    className={
                      styles.itemOrder
                    }
                  >
                    {category.order}
                  </span>

                  <span
                    className={
                      styles.itemHeading
                    }
                  >
                    <strong>
                      {category.title}
                    </strong>

                    <small>
                      {category.eyebrow}
                    </small>
                  </span>

                  <span
                    className={
                      styles.itemToggle
                    }
                    aria-hidden="true"
                  >
                    <span />
                    <span />
                  </span>
                </button>

                {/*
                 * O conteúdo permanece SEMPRE
                 * no HTML.
                 *
                 * O estado do accordion controla
                 * somente a apresentação visual.
                 */}
                <motion.div
                  id={`category-${category.id}`}
                  className={
                    styles.itemBody
                  }
                  aria-hidden={!isOpen}
                  initial={false}
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          height: isOpen
                            ? "auto"
                            : 0,
                          opacity: isOpen
                            ? 1
                            : 0,
                        }
                  }
                  style={
                    reduceMotion
                      ? {
                          height: isOpen
                            ? "auto"
                            : 0,
                          opacity: isOpen
                            ? 1
                            : 0,
                          overflow:
                            "hidden",
                          pointerEvents:
                            isOpen
                              ? "auto"
                              : "none",
                        }
                      : {
                          overflow:
                            "hidden",
                          pointerEvents:
                            isOpen
                              ? "auto"
                              : "none",
                        }
                  }
                  transition={{
                    duration: reduceMotion
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
                      styles.itemBodyInner
                    }
                  >
                    <p>
                      {
                        category.description
                      }
                    </p>

                    <div
                      className={
                        styles.services
                      }
                    >
                      {category.services.map(
                        (service) => (
                          <span
                            key={service}
                          >
                            {service}
                          </span>
                        ),
                      )}
                    </div>

                    <Link
                      href={category.href}
                      className={
                        styles.itemLink
                      }
                      tabIndex={
                        isOpen
                          ? undefined
                          : -1
                      }
                    >
                      Conhecer esta solução
                      <span
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </motion.div>
              </article>
            );
          },
        )}
      </div>
    </section>
  );
}