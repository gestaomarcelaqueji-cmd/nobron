"use client";

import Link from "next/link";

import { useRef, useState } from "react";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

import {
  aboutPageData,
  type AboutStage,
} from "@/data/about/aboutPage";

import { AbstractIntelligence } from "./AbstractIntelligence";
import { StageMenu } from "./StageMenu";

import styles from "./AboutScrollytelling.module.css";

type SceneStage = AboutStage["id"];

const STAGE_LIMITS = [
  { until: 0.09, id: "01" },
  { until: 0.18, id: "02" },
  { until: 0.27, id: "03" },
  { until: 0.36, id: "04" },
  { until: 0.45, id: "05" },
  { until: 0.54, id: "06" },
  { until: 0.63, id: "07" },
  { until: 0.72, id: "08" },
  { until: 1.01, id: "09" },
] as const;

function resolveStage(progress: number): SceneStage {
  return (
    STAGE_LIMITS.find((item) => progress < item.until)?.id ??
    "09"
  );
}

export function AboutScrollytelling() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = Boolean(useReducedMotion());

  const [activeStageId, setActiveStageId] =
    useState<SceneStage>("01");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progress = scrollYProgress;

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const nextStage = resolveStage(value);

    setActiveStageId((current) =>
      current === nextStage ? current : nextStage,
    );
  });

  const sceneScale = useTransform(
    progress,
    [0, 1],
    [1, 1],
  );

  const sceneX = useTransform(
    progress,
    [0, 1],
    ["0%", "0%"],
  );

  const sceneY = useTransform(
    progress,
    [0, 1],
    ["4%", "4%"],
  );

  /*
   * A forma é a única presença visível no começo.
   * Depois ela perde força sem desaparecer por completo.
   */
  const formOpacity = useTransform(
    progress,
    [0, 1],
    [0.22, 0.22],
  );

  const formScale = useTransform(
    progress,
    [0, 1],
    [1, 1],
  );

  const formX = useTransform(
    progress,
    [0, 1],
    ["0%", "0%"],
  );

  /*
   * A imagem já é PNG RGBA.
   * Não existe background-image nem bloco por trás dela.
   */
  const silhouetteOpacity = useTransform(
    progress,
    [0, 1],
    [1, 1],
  );

  const silhouetteScale = useTransform(
    progress,
    [0, 1],
    [0.74, 0.74],
  );

  const silhouetteX = useTransform(
    progress,
    [0, 1],
    ["-3%", "-3%"],
  );

  const haloOpacity = useTransform(
    progress,
    [0, 1],
    [0.78, 0.78],
  );

  const leftShadeOpacity = useTransform(
    progress,
    [0, 1],
    [0.72, 0.72],
  );

  const scrollHintOpacity = useTransform(
    progress,
    [0, 0.025, 0.1],
    [0, 1, 0],
  );

  const activeStage =
    aboutPageData.stages.find(
      (stage) => stage.id === activeStageId,
    ) ?? aboutPageData.stages[0]!;

  return (
    <section
      ref={sectionRef}
      aria-label="Sobre a noBRon"
      className={styles.section}
    >
      <div className={styles.sticky}>
        <div
          aria-hidden="true"
          className={styles.background}
        >
          <span className={styles.grid} />

          <motion.span
            className={styles.halo}
            style={
              reduceMotion
                ? { opacity: 0.78 }
                : { opacity: haloOpacity }
            }
          />
        </div>

        <motion.div
          aria-hidden="true"
          className={styles.scene}
          style={
            reduceMotion
              ? undefined
              : {
                  scale: sceneScale,
                  x: sceneX,
                  y: sceneY,
                }
          }
        >
          <motion.div
            className={styles.formLayer}
            style={
              reduceMotion
                ? { opacity: 0.22 }
                : {
                    opacity: formOpacity,
                    scale: formScale,
                    x: formX,
                  }
            }
          >
            <AbstractIntelligence
              reducedMotion={reduceMotion}
            />
          </motion.div>

          <motion.div
            className={styles.silhouetteLayer}
            style={
              reduceMotion
                ? { opacity: 1 }
                : {
                    opacity: silhouetteOpacity,
                    scale: silhouetteScale,
                    x: silhouetteX,
                  }
            }
          >
            <img
              alt=""
              aria-hidden="true"
              className={styles.silhouetteImage}
              decoding="async"
              src="/about/silhouette-profile.png"
            />
          </motion.div>
        </motion.div>

        <motion.div
          aria-hidden="true"
          className={styles.leftShade}
          style={
            reduceMotion
              ? undefined
              : { opacity: leftShadeOpacity }
          }
        />

        <div className={styles.copySlot}>
          <StageCopy
            key={activeStage.id}
            reduceMotion={reduceMotion}
            stage={activeStage}
          />
        </div>

        <StageMenu
          activeStageId={activeStageId}
          stages={aboutPageData.stages}
        />

        <motion.div
          aria-hidden="true"
          className={styles.scrollHint}
          style={
            reduceMotion
              ? undefined
              : { opacity: scrollHintOpacity }
          }
        >
          <i />
          <span>SCROLL</span>
        </motion.div>

      </div>
    </section>
  );
}

type StageCopyProps = {
  stage: AboutStage;
  reduceMotion: boolean;
};

function StageCopy({
  stage,
  reduceMotion,
}: StageCopyProps) {
  return (
    <motion.article
      animate={{
        opacity: 1,
        filter: "blur(0px)",
      }}
      className={styles.copyStage}
      data-dense={stage.density === "dense"}
      initial={false}
      transition={{
        duration: reduceMotion ? 0 : 0.16,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <span className={styles.eyebrow}>
        {stage.eyebrow}
      </span>

      {stage.id === "01" ? (
        <h1>{stage.title}</h1>
      ) : (
        <h2>{stage.title}</h2>
      )}

      {stage.intro ? (
        <p className={styles.introParagraph}>
          {stage.intro}
        </p>
      ) : null}

      {stage.paragraphs ? (
        <div className={styles.paragraphs}>
          {stage.paragraphs.map((paragraph) => (
            <p key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}

      {stage.relatedPage ? (
        <p className={styles.relatedPage}>
          {stage.relatedPage.prefix}

          <Link
            className="contextual-link"
            href={stage.relatedPage.href}
          >
            {stage.relatedPage.label}
          </Link>

          {stage.relatedPage.suffix}
        </p>
      ) : null}

      {stage.groups ? (
        <div className={styles.studyGroups}>
          {stage.groups.map((group) => (
            <div
              className={styles.studyGroup}
              key={group.title}
            >
              <strong>{group.title}</strong>
              <p>{group.description}</p>
            </div>
          ))}
        </div>
      ) : null}

      {stage.traits ? (
        <div className={styles.traits}>
          {stage.traits.map((trait) => (
            <span key={trait}>{trait}</span>
          ))}
        </div>
      ) : null}
    </motion.article>
  );
}
