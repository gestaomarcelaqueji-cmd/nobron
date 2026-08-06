"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  type Variants,
} from "motion/react";

import {
  useRef,
  useState,
} from "react";

import {
  aboutPageData,
  type AboutStage,
} from "@/data/about/aboutPage";

import styles from "./AboutMobileStory.module.css";

type MobileStageCopyProps = {
  stage: AboutStage;
  direction: number;
  reduceMotion: boolean;
};

type WordTransitionCustom = {
  index: number;
  direction: number;
};

const wordVariants: Variants = {
  hidden: ({
    index,
    direction,
  }: WordTransitionCustom) => {
    const horizontalDirection =
      index % 2 === 0 ? -1 : 1;

    return {
      opacity: 0,
      x:
        horizontalDirection *
        direction *
        9,
      y: 8,
      filter: "blur(7px)",
    };
  },

  visible: ({
    index,
  }: WordTransitionCustom) => ({
    opacity: 1,
    x: 0,
    y: 0,
    filter: "blur(0px)",

    transition: {
      duration: 0.52,
      delay: index * 0.018,
      ease: [0.16, 1, 0.3, 1],
    },
  }),

  exit: ({
    index,
    direction,
  }: WordTransitionCustom) => {
    const horizontalDirection =
      index % 2 === 0 ? 1 : -1;

    return {
      opacity: 0,
      x:
        horizontalDirection *
        direction *
        12,
      y: -5,
      filter: "blur(8px)",

      transition: {
        duration: 0.28,
        delay: index * 0.006,
        ease: [0.4, 0, 1, 1],
      },
    };
  },
};

const supportingCopyVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
    filter: "blur(5px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",

    transition: {
      duration: 0.48,
      delay: 0.16,
      ease: [0.16, 1, 0.3, 1],
    },
  },

  exit: {
    opacity: 0,
    y: -8,
    filter: "blur(5px)",

    transition: {
      duration: 0.22,
      ease: [0.4, 0, 1, 1],
    },
  },
};

export function AboutMobileStory() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const previousIndexRef =
    useRef(0);

  const reduceMotion =
    Boolean(useReducedMotion());

  const [activeIndex, setActiveIndex] =
    useState(0);

  const [direction, setDirection] =
    useState(1);

  const [hasStarted, setHasStarted] =
    useState(false);

  const stages =
    aboutPageData.stages;

  const { scrollYProgress } =
    useScroll({
      target: sectionRef,
      offset: [
        "start start",
        "end end",
      ],
    });

  useMotionValueEvent(
    scrollYProgress,
    "change",
    (value) => {
      const maximumIndex =
        stages.length - 1;

      const nextIndex = Math.min(
        maximumIndex,
        Math.floor(
          value * stages.length,
        ),
      );

      if (value > 0.012) {
        setHasStarted(true);
      }

      if (
        nextIndex ===
        previousIndexRef.current
      ) {
        return;
      }

      setDirection(
        nextIndex >
          previousIndexRef.current
          ? 1
          : -1,
      );

      previousIndexRef.current =
        nextIndex;

      setActiveIndex(nextIndex);
    },
  );

  const activeStage =
    stages[activeIndex] ??
    stages[0];

  const progress =
    ((activeIndex + 1) /
      stages.length) *
    100;

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-label="Sobre a noBRon"
    >
      <div className={styles.sticky}>
        <header
          className={styles.topBar}
        >
          <span
            className={styles.sectionName}
          >
            Sobre
          </span>

          <span
            className={styles.counter}
            aria-live="polite"
          >
            {activeStage.id}
            <i>/</i>
            {String(
              stages.length,
            ).padStart(2, "0")}
          </span>
        </header>

        <div
          className={styles.copySlot}
        >
          <AnimatePresence
            initial={false}
            mode="wait"
            custom={direction}
          >
            <MobileStageCopy
              key={activeStage.id}
              stage={activeStage}
              direction={direction}
              reduceMotion={reduceMotion}
            />
          </AnimatePresence>
        </div>

        <div
          className={styles.progressArea}
          aria-hidden="true"
        >
          <div
            className={styles.progressTrack}
          >
            <motion.span
              className={
                styles.progressValue
              }
              animate={{
                width: `${progress}%`,
              }}
              transition={{
                duration: reduceMotion
                  ? 0
                  : 0.42,
                ease: [
                  0.16,
                  1,
                  0.3,
                  1,
                ],
              }}
            />
          </div>

          <div
            className={styles.progressMeta}
          >
            <span>
              {
                activeStage.menuLabel
              }
            </span>

            <span>
              {activeIndex + 1} de{" "}
              {stages.length}
            </span>
          </div>
        </div>

        <AnimatePresence>
          {!hasStarted &&
            !reduceMotion && (
              <motion.div
                className={
                  styles.scrollHint
                }
                initial={{
                  opacity: 0,
                  y: 6,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 6,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.65,
                }}
                aria-hidden="true"
              >
                <span>
                  Role para continuar
                </span>

                <i />
              </motion.div>
            )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function MobileStageCopy({
  stage,
  direction,
  reduceMotion,
}: MobileStageCopyProps) {
  return (
    <motion.article
      className={styles.copyStage}
      data-dense={
        stage.density === "dense"
      }
      data-stage={stage.id}
      initial={
        reduceMotion
          ? false
          : "hidden"
      }
      animate="visible"
      exit={
        reduceMotion
          ? undefined
          : "exit"
      }
      aria-labelledby={`about-mobile-title-${stage.id}`}
    >
      <motion.span
        className={styles.eyebrow}
        variants={
          reduceMotion
            ? undefined
            : supportingCopyVariants
        }
      >
        {stage.eyebrow}
      </motion.span>

      <h1
        id={`about-mobile-title-${stage.id}`}
        className={styles.title}
      >
        <AnimatedWords
          text={stage.title}
          direction={direction}
          reduceMotion={
            reduceMotion
          }
        />
      </h1>

      {stage.intro ? (
        <motion.p
          className={
            styles.introParagraph
          }
          variants={
            reduceMotion
              ? undefined
              : supportingCopyVariants
          }
        >
          {stage.intro}
        </motion.p>
      ) : null}

      {stage.paragraphs ? (
        <motion.div
          className={styles.paragraphs}
          variants={
            reduceMotion
              ? undefined
              : supportingCopyVariants
          }
        >
          {stage.paragraphs.map(
            (paragraph) => (
              <p key={paragraph}>
                {paragraph}
              </p>
            ),
          )}
        </motion.div>
      ) : null}

      {stage.groups ? (
        <motion.div
          className={styles.studyGroups}
          variants={
            reduceMotion
              ? undefined
              : supportingCopyVariants
          }
        >
          {stage.groups.map(
            (group) => (
              <div
                className={
                  styles.studyGroup
                }
                key={group.title}
              >
                <strong>
                  {group.title}
                </strong>

                <p>
                  {
                    group.description
                  }
                </p>
              </div>
            ),
          )}
        </motion.div>
      ) : null}

      {stage.traits ? (
        <motion.div
          className={styles.traits}
          variants={
            reduceMotion
              ? undefined
              : supportingCopyVariants
          }
        >
          {stage.traits.map(
            (trait) => (
              <span key={trait}>
                {trait}
              </span>
            ),
          )}
        </motion.div>
      ) : null}
    </motion.article>
  );
}

type AnimatedWordsProps = {
  text: string;
  direction: number;
  reduceMotion: boolean;
};

function AnimatedWords({
  text,
  direction,
  reduceMotion,
}: AnimatedWordsProps) {
  const words =
    text.split(/\s+/);

  if (reduceMotion) {
    return <>{text}</>;
  }

  return (
    <>
      {words.map(
        (word, index) => (
          <motion.span
            key={`${word}-${index}`}
            className={styles.word}
            custom={{
              index,
              direction,
            }}
            variants={wordVariants}
          >
            {word}
            {index <
            words.length - 1
              ? "\u00A0"
              : ""}
          </motion.span>
        ),
      )}
    </>
  );
}