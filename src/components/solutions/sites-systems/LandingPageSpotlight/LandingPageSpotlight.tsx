"use client";

import Link from "next/link";
import { useRef } from "react";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import { sitesSystemsPageData } from "@/data/solutions/sitesSystems";

import styles from "./LandingPageSpotlight.module.css";

export function LandingPageSpotlight() {
  const sectionRef = useRef<HTMLElement>(null);

  const reduceMotion = Boolean(useReducedMotion());
  const { landingPage } = sitesSystemsPageData;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 105,
    damping: 28,
    mass: 0.42,
  });

  /*
   * O card começa abaixo da tela e sobe durante o scroll.
   */
  const cardY = useTransform(
    smoothProgress,
    [0, 0.7, 1],
    ["76%", "0%", "0%"],
  );

  const cardScale = useTransform(
    smoothProgress,
    [0, 0.7],
    [0.97, 1],
  );

  /*
   * A palavra também entra durante o início do movimento,
   * mas continua inteira dentro da largura da tela.
   */
  const backgroundWordY = useTransform(
    smoothProgress,
    [0, 0.42, 1],
    ["24%", "0%", "-8%"],
  );

  const backgroundWordOpacity = useTransform(
    smoothProgress,
    [0, 0.25, 0.72, 1],
    [0.28, 1, 0.62, 0.28],
  );

  const backgroundWordScale = useTransform(
    smoothProgress,
    [0, 0.42],
    [0.96, 1],
  );

  /*
   * Conteúdo interno aparece enquanto o card sobe.
   */
  const contentY = useTransform(
    smoothProgress,
    [0.12, 0.58],
    [52, 0],
  );

  const contentOpacity = useTransform(
    smoothProgress,
    [0.12, 0.48],
    [0, 1],
  );

  const priceY = useTransform(
    smoothProgress,
    [0.3, 0.63],
    [28, 0],
  );

  const priceOpacity = useTransform(
    smoothProgress,
    [0.26, 0.56],
    [0, 1],
  );

  const buttonY = useTransform(
    smoothProgress,
    [0.42, 0.7],
    [20, 0],
  );

  const buttonOpacity = useTransform(
    smoothProgress,
    [0.4, 0.66],
    [0, 1],
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="landing-page-spotlight-title"
      className={styles.section}
      id="landing-page-destaque"
    >
      <div className={styles.sticky}>
        <div
          aria-hidden="true"
          className={styles.backgroundTitleWrapper}
        >
          <motion.div
            className={styles.backgroundTitle}
            style={
              reduceMotion
                ? undefined
                : {
                    opacity: backgroundWordOpacity,
                    scale: backgroundWordScale,
                    y: backgroundWordY,
                  }
            }
          >
            OPORTUNIDADE
          </motion.div>
        </div>

        <motion.article
          className={styles.card}
          style={
            reduceMotion
              ? undefined
              : {
                  scale: cardScale,
                  y: cardY,
                }
          }
        >
          <motion.div
            className={styles.cardContent}
            style={
              reduceMotion
                ? undefined
                : {
                    opacity: contentOpacity,
                    y: contentY,
                  }
            }
          >
            <header className={styles.cardHeader}>
              <span className={styles.eyebrow}>
                Serviço em destaque
              </span>

              <span
                aria-hidden="true"
                className={styles.headerLine}
              />
            </header>

            <h2 id="landing-page-spotlight-title">
              Uma página criada para
              <span>apresentar e converter.</span>
            </h2>

            <motion.div
              className={styles.offer}
              style={
                reduceMotion
                  ? undefined
                  : {
                      opacity: priceOpacity,
                      y: priceY,
                    }
              }
            >
              <div className={styles.price}>
                <span>{landingPage.price}</span>

                <strong>
                  {landingPage.cadence}
                </strong>
              </div>

              <div
                aria-hidden="true"
                className={styles.offerDivider}
              />

              <p className={styles.condition}>
                Página ativa, com atualização e
                cancelamento mensal.
              </p>
            </motion.div>

            <motion.div
              className={styles.linkWrapper}
              style={
                reduceMotion
                  ? undefined
                  : {
                      opacity: buttonOpacity,
                      y: buttonY,
                    }
              }
            >
              <Link
                className={styles.link}
                href={landingPage.href}
              >
                <span className={styles.linkText}>
                  Saiba mais
                </span>

                <span
                  aria-hidden="true"
                  className={styles.linkArrow}
                >
                  →
                </span>
              </Link>
            </motion.div>
          </motion.div>

          <div
            aria-hidden="true"
            className={styles.cardFooter}
          >
            <span>Apresentar</span>
            <span>Explicar</span>
            <span>Converter</span>
          </div>
        </motion.article>
      </div>
    </section>
  );
}