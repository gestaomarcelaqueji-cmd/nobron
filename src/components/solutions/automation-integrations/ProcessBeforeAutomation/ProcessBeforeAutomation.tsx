"use client";

import Link from "next/link";

import { useRef, useState } from "react";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import { automationIntegrationsPageData } from "@/data/solutions/automationIntegrations";

import styles from "./ProcessBeforeAutomation.module.css";

export function ProcessBeforeAutomation() {
  const sectionRef = useRef<HTMLElement>(null);

  const reduceMotion =
    Boolean(useReducedMotion());

  const { beforeAutomation } =
    automationIntegrationsPageData;

  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0);

  const { scrollYProgress } =
    useScroll({
      target: sectionRef,
      offset: [
        "start 0.85",
        "end 0.15",
      ],
    });

  const smoothProgress =
    useSpring(
      scrollYProgress,
      {
        stiffness: 110,
        damping: 28,
        mass: 0.42,
      },
    );

  const lineScale =
    useTransform(
      smoothProgress,
      [0.08, 0.92],
      [0, 1],
    );

  const copyY =
    useTransform(
      smoothProgress,
      [0, 1],
      [20, -10],
    );

  useMotionValueEvent(
    smoothProgress,
    "change",
    (value) => {
      if (reduceMotion) {
        return;
      }

      const nextIndex =
        Math.min(
          beforeAutomation
            .stages.length - 1,

          Math.max(
            0,

            Math.floor(
              value *
                beforeAutomation
                  .stages.length,
            ),
          ),
        );

      setActiveIndex(
        nextIndex,
      );
    },
  );

  return (
    <section
      ref={sectionRef}
      className={
        styles.section
      }
    >
      <div
        className={
          styles.sticky
        }
      >
        <motion.div
          className={
            styles.inner
          }
          style={
            reduceMotion
              ? undefined
              : {
                  y: copyY,
                }
          }
        >
          <header
            className={
              styles.heading
            }
          >
            <span>
              {
                beforeAutomation
                  .eyebrow
              }
            </span>

            <h2>
              {
                beforeAutomation
                  .title
              }
            </h2>

            <p>
              {
                beforeAutomation
                  .description
              }{" "}

              Quando o problema ainda
              precisa ser organizado
              antes de definir a
              tecnologia, esse trabalho
              também pode começar por{" "}

              <Link
                className="contextual-link"
                href="/solucoes/estrategia-direcao"
              >
                Estratégia e Direção
              </Link>
              .
            </p>
          </header>

          <div
            className={
              styles.stages
            }
          >
            <div
              aria-hidden="true"
              className={
                styles.baseLine
              }
            />

            <motion.div
              aria-hidden="true"
              className={
                styles.activeLine
              }
              style={
                reduceMotion
                  ? {
                      scaleX: 1,
                    }
                  : {
                      scaleX:
                        lineScale,
                    }
              }
            />

            <ol>
              {beforeAutomation
                .stages
                .map(
                  (
                    stage,
                    index,
                  ) => (
                    <li
                      data-active={
                        reduceMotion ||
                        index <=
                          activeIndex
                      }
                      key={
                        stage.title
                      }
                    >
                      <span>
                        {
                          stage.number
                        }
                      </span>

                      <strong>
                        {
                          stage.title
                        }
                      </strong>

                      <p>
                        {
                          stage.description
                        }
                      </p>
                    </li>
                  ),
                )}
            </ol>
          </div>
        </motion.div>
      </div>
    </section>
  );
}