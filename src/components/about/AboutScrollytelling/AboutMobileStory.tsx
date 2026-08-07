"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

import {
  aboutPageData,
  type AboutStage,
} from "@/data/about/aboutPage";

import styles from "./AboutMobileStory.module.css";

const SCRAMBLE_CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789—";

type StoryStageProps = {
  stage: AboutStage;
  index: number;
  reduceMotion: boolean;
  onActive: (index: number) => void;
};

type ScrambleTextProps = {
  text: string;
  active: boolean;
  reduceMotion: boolean;
  className?: string;
};

type SmokyTitleProps = {
  text: string;
  active: boolean;
  reduceMotion: boolean;
};

export function AboutMobileStory() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const reduceMotion =
    Boolean(useReducedMotion());

  const [activeIndex, setActiveIndex] =
    useState(0);

  const stages = aboutPageData.stages;

  const activeStage =
    stages[activeIndex] ??
    stages[0]!;

  const { scrollYProgress } =
    useScroll({
      target: sectionRef,
      offset: [
        "start start",
        "end end",
      ],
    });

  const progress =
    useSpring(scrollYProgress, {
      stiffness: 110,
      damping: 28,
      mass: 0.45,
    });

  function updateGlowPosition(
    event:
      ReactPointerEvent<HTMLElement>,
  ) {
    const section =
      sectionRef.current;

    if (!section) return;

    const bounds =
      section.getBoundingClientRect();

    const x =
      ((event.clientX -
        bounds.left) /
        bounds.width) *
      100;

    const y =
      ((event.clientY -
        bounds.top) /
        bounds.height) *
      100;

    section.style.setProperty(
      "--about-glow-x",
      `${Math.min(
        100,
        Math.max(0, x),
      )}%`,
    );

    section.style.setProperty(
      "--about-glow-y",
      `${Math.min(
        100,
        Math.max(0, y),
      )}%`,
    );
  }

  function resetGlowPosition() {
    const section =
      sectionRef.current;

    if (!section) return;

    section.style.setProperty(
      "--about-glow-x",
      "62%",
    );

    section.style.setProperty(
      "--about-glow-y",
      "28%",
    );
  }

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-label="Sobre a noBRon"
      onPointerDown={
        updateGlowPosition
      }
      onPointerMove={
        updateGlowPosition
      }
      onPointerLeave={
        resetGlowPosition
      }
    >
      <h1
        className={
          styles.visuallyHidden
        }
      >
        Sobre a noBRon
      </h1>

      <div
        className={styles.ambient}
        aria-hidden="true"
      />

      <header
        className={styles.topBar}
      >
        <div
          className={styles.topBarRow}
        >
          <div
            className={
              styles.topBarCopy
            }
          >
            <span
              className={
                styles.sectionName
              }
            >
              Sobre
            </span>

            <span
              className={
                styles.topBarDivider
              }
              aria-hidden="true"
            >
              —
            </span>

            <ScrambleText
              key={
                activeStage.menuLabel
              }
              text={
                activeStage.menuLabel
              }
              active
              reduceMotion={
                reduceMotion
              }
              className={
                styles.activeLabel
              }
            />
          </div>

          <span
            className={styles.counter}
            aria-live="polite"
          >
            {activeStage.id}

            <i aria-hidden="true">
              /
            </i>

            {String(
              stages.length,
            ).padStart(2, "0")}
          </span>
        </div>

        <div
          className={
            styles.progressTrack
          }
          aria-hidden="true"
        >
          <motion.span
            className={
              styles.progressValue
            }
            style={{
              scaleX: progress,
            }}
          />
        </div>
      </header>

      <div className={styles.story}>
        {stages.map(
          (stage, index) => (
            <StoryStage
              key={stage.id}
              stage={stage}
              index={index}
              reduceMotion={
                reduceMotion
              }
              onActive={
                setActiveIndex
              }
            />
          ),
        )}
      </div>
    </section>
  );
}

function StoryStage({
  stage,
  index,
  reduceMotion,
  onActive,
}: StoryStageProps) {
  const stageRef =
    useRef<HTMLElement>(null);

  const isInView =
    useInView(stageRef, {
      amount:
        stage.density === "dense"
          ? 0.16
          : 0.36,
    });

  useEffect(() => {
    if (isInView) {
      onActive(index);
    }
  }, [
    index,
    isInView,
    onActive,
  ]);

  return (
    <article
      ref={stageRef}
      className={styles.stage}
      data-stage={stage.id}
      data-density={
        stage.density ?? "normal"
      }
      aria-labelledby={`about-mobile-title-${stage.id}`}
    >
      <span
        className={
          styles.stageNumber
        }
        aria-hidden="true"
      >
        {stage.id}
      </span>

      <div
        className={
          styles.stageContent
        }
      >
        <ScrambleText
          text={stage.eyebrow}
          active={isInView}
          reduceMotion={
            reduceMotion
          }
          className={
            styles.eyebrow
          }
        />

        <h2
          id={`about-mobile-title-${stage.id}`}
          className={styles.title}
          aria-label={stage.title}
        >
          <SmokyTitle
            text={stage.title}
            active={isInView}
            reduceMotion={
              reduceMotion
            }
          />
        </h2>

        {stage.intro ? (
          <motion.p
            className={
              styles.introParagraph
            }
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 18,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.4,
            }}
            transition={{
              duration:
                reduceMotion
                  ? 0
                  : 0.6,
              delay:
                reduceMotion
                  ? 0
                  : 0.16,
              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}
          >
            {stage.intro}
          </motion.p>
        ) : null}

        {stage.paragraphs ? (
          <motion.div
            className={
              styles.paragraphs
            }
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 22,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.22,
            }}
            transition={{
              duration:
                reduceMotion
                  ? 0
                  : 0.65,
              delay:
                reduceMotion
                  ? 0
                  : 0.18,
              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}
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
          <div
            className={
              styles.studyGroups
            }
          >
            {stage.groups.map(
              (
                group,
                groupIndex,
              ) => (
                <motion.article
                  key={group.title}
                  className={
                    styles.studyGroup
                  }
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 20,
                        }
                  }
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.42,
                  }}
                  transition={{
                    duration:
                      reduceMotion
                        ? 0
                        : 0.55,
                    delay:
                      reduceMotion
                        ? 0
                        : groupIndex *
                          0.06,
                    ease: [
                      0.16,
                      1,
                      0.3,
                      1,
                    ],
                  }}
                >
                  <span
                    className={
                      styles.groupIndex
                    }
                    aria-hidden="true"
                  >
                    {String(
                      groupIndex + 1,
                    ).padStart(
                      2,
                      "0",
                    )}
                  </span>

                  <div
                    className={
                      styles.groupCopy
                    }
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
                </motion.article>
              ),
            )}
          </div>
        ) : null}

        {stage.traits ? (
          <div
            className={styles.traits}
          >
            {stage.traits.map(
              (
                trait,
                traitIndex,
              ) => (
                <motion.div
                  key={trait}
                  className={
                    styles.trait
                  }
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 16,
                        }
                  }
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.5,
                  }}
                  transition={{
                    duration:
                      reduceMotion
                        ? 0
                        : 0.48,
                    delay:
                      reduceMotion
                        ? 0
                        : traitIndex *
                          0.045,
                    ease: [
                      0.16,
                      1,
                      0.3,
                      1,
                    ],
                  }}
                >
                  <span
                    className={
                      styles.traitIndex
                    }
                    aria-hidden="true"
                  >
                    {String(
                      traitIndex + 1,
                    ).padStart(
                      2,
                      "0",
                    )}
                  </span>

                  <span>
                    {trait}
                  </span>
                </motion.div>
              ),
            )}
          </div>
        ) : null}
      </div>
    </article>
  );
}

function SmokyTitle({
  text,
  active,
  reduceMotion,
}: SmokyTitleProps) {
  const [hasEntered, setHasEntered] =
    useState(reduceMotion);

  useEffect(() => {
    if (active) {
      setHasEntered(true);
    }
  }, [active]);

  const words =
    text.split(/\s+/);

  return (
    <>
      {words.map(
        (word, index) => {
          const horizontalOffset =
            index % 3 === 0
              ? -9
              : index % 3 === 1
                ? 7
                : -3;

          return (
            <motion.span
              key={`${word}-${index}`}
              className={styles.word}
              aria-hidden="true"
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x:
                        horizontalOffset,
                      y: 17,
                      rotate:
                        index % 2 === 0
                          ? -1.1
                          : 1,
                      filter:
                        "blur(11px)",
                    }
              }
              animate={
                hasEntered ||
                reduceMotion
                  ? {
                      opacity: 1,
                      x: 0,
                      y: 0,
                      rotate: 0,
                      filter:
                        "blur(0px)",
                    }
                  : undefined
              }
              transition={{
                duration:
                  reduceMotion
                    ? 0
                    : 0.72,
                delay:
                  reduceMotion
                    ? 0
                    : Math.min(
                        index *
                          0.042,
                        0.28,
                      ),
                ease: [
                  0.16,
                  1,
                  0.3,
                  1,
                ],
              }}
            >
              {word}

              {index <
              words.length - 1
                ? "\u00A0"
                : ""}
            </motion.span>
          );
        },
      )}
    </>
  );
}

function ScrambleText({
  text,
  active,
  reduceMotion,
  className,
}: ScrambleTextProps) {
  const [output, setOutput] =
    useState(text);

  useEffect(() => {
    if (
      reduceMotion ||
      !active
    ) {
      setOutput(text);
      return;
    }

    let animationFrame = 0;

    const startTime =
      performance.now();

    const duration = 480;

    function animate(
      currentTime: number,
    ) {
      const elapsed =
        currentTime - startTime;

      const progress =
        Math.min(
          elapsed / duration,
          1,
        );

      const revealedCharacters =
        Math.floor(
          progress *
            text.length,
        );

      const nextOutput =
        text
          .split("")
          .map(
            (
              character,
              index,
            ) => {
              if (
                character === " "
              ) {
                return " ";
              }

              if (
                index <
                revealedCharacters
              ) {
                return character;
              }

              const randomIndex =
                Math.floor(
                  Math.random() *
                    SCRAMBLE_CHARACTERS.length,
                );

              return (
                SCRAMBLE_CHARACTERS[
                  randomIndex
                ] ?? character
              );
            },
          )
          .join("");

      setOutput(nextOutput);

      if (progress < 1) {
        animationFrame =
          window.requestAnimationFrame(
            animate,
          );
      } else {
        setOutput(text);
      }
    }

    animationFrame =
      window.requestAnimationFrame(
        animate,
      );

    return () => {
      window.cancelAnimationFrame(
        animationFrame,
      );
    };
  }, [
    active,
    reduceMotion,
    text,
  ]);

  return (
    <span
      className={className}
      aria-label={text}
    >
      <span aria-hidden="true">
        {output}
      </span>
    </span>
  );
}