"use client";

import {
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

import styles from "./FragmentedCategoryHero.module.css";

type Shard = {
  points: string;
  enterX: number;
  enterY: number;
  enterRotate: number;
  enterScale: number;
  hoverX: number;
  hoverY: number;
  hoverRotate: number;
};

type FragmentedCategoryHeroProps = {
  id: string;
  title: string;
  description: string;
  viewBoxWidth?: number;
  viewBoxHeight?: number;
  columnCount?: number;
  textLength?: number;
  titleFontSize?: number;
};

function seededRandom(seed: number) {
  const value =
    Math.sin(seed * 9187.137) *
    43758.5453;

  return value - Math.floor(value);
}

function randomBetween(
  seed: number,
  minimum: number,
  maximum: number,
) {
  return (
    minimum +
    seededRandom(seed) *
      (maximum - minimum)
  );
}

function createBoundaries(
  seed: number,
  variation: number,
  viewBoxWidth: number,
  columnCount: number,
) {
  return Array.from(
    { length: columnCount + 1 },
    (_, index) => {
      if (index === 0) return 0;

      if (index === columnCount) {
        return viewBoxWidth;
      }

      const base =
        (viewBoxWidth / columnCount) *
        index;

      return (
        base +
        randomBetween(
          seed + index * 13,
          -variation,
          variation,
        )
      );
    },
  );
}

function createShards(
  viewBoxWidth: number,
  viewBoxHeight: number,
  columnCount: number,
): Shard[] {
  const top = createBoundaries(
    11,
    28,
    viewBoxWidth,
    columnCount,
  );

  const middle = createBoundaries(
    37,
    52,
    viewBoxWidth,
    columnCount,
  );

  const bottom = createBoundaries(
    73,
    34,
    viewBoxWidth,
    columnCount,
  );

  const middleY = viewBoxHeight * 0.5;
  const shards: Shard[] = [];

  for (
    let column = 0;
    column < columnCount;
    column += 1
  ) {
    const topIndex = shards.length;

    shards.push({
      points: [
        `${top[column]},0`,
        `${top[column + 1]},0`,
        `${middle[column + 1]},${middleY}`,
        `${middle[column]},${middleY}`,
      ].join(" "),

      enterX: randomBetween(
        topIndex * 19 + 1,
        -620,
        620,
      ),

      enterY: randomBetween(
        topIndex * 23 + 2,
        -300,
        300,
      ),

      enterRotate: randomBetween(
        topIndex * 29 + 3,
        -620,
        620,
      ),

      enterScale: randomBetween(
        topIndex * 31 + 4,
        0.15,
        0.5,
      ),

      hoverX: randomBetween(
        topIndex * 41 + 5,
        -9,
        9,
      ),

      hoverY: randomBetween(
        topIndex * 43 + 6,
        -6,
        6,
      ),

      hoverRotate: randomBetween(
        topIndex * 47 + 7,
        -1.4,
        1.4,
      ),
    });

    const bottomIndex = shards.length;

    shards.push({
      points: [
        `${middle[column]},${middleY}`,
        `${middle[column + 1]},${middleY}`,
        `${bottom[column + 1]},${viewBoxHeight}`,
        `${bottom[column]},${viewBoxHeight}`,
      ].join(" "),

      enterX: randomBetween(
        bottomIndex * 19 + 8,
        -620,
        620,
      ),

      enterY: randomBetween(
        bottomIndex * 23 + 9,
        -300,
        300,
      ),

      enterRotate: randomBetween(
        bottomIndex * 29 + 10,
        -620,
        620,
      ),

      enterScale: randomBetween(
        bottomIndex * 31 + 11,
        0.15,
        0.5,
      ),

      hoverX: randomBetween(
        bottomIndex * 41 + 12,
        -9,
        9,
      ),

      hoverY: randomBetween(
        bottomIndex * 43 + 13,
        -6,
        6,
      ),

      hoverRotate: randomBetween(
        bottomIndex * 47 + 14,
        -1.4,
        1.4,
      ),
    });
  }

  return shards;
}

export function FragmentedCategoryHero({
  id,
  title,
  description,
  viewBoxWidth = 1800,
  viewBoxHeight = 320,
  columnCount = 10,
  textLength = 1660,
  titleFontSize = 198,
}: FragmentedCategoryHeroProps) {
  const mobileSceneRef =
    useRef<HTMLElement>(null);

  const reduceMotion =
    Boolean(useReducedMotion());

  const clipId =
    useId().replace(/:/g, "");

  const [isHovered, setIsHovered] =
    useState(false);

  const desktopTitleId =
    `${id}-desktop-title`;

  const mobileTitleId =
    `${id}-mobile-title`;

  const shards = useMemo(
    () =>
      createShards(
        viewBoxWidth,
        viewBoxHeight,
        columnCount,
      ),
    [
      columnCount,
      viewBoxHeight,
      viewBoxWidth,
    ],
  );

  const { scrollYProgress } =
    useScroll({
      target: mobileSceneRef,
      offset: [
        "start start",
        "end end",
      ],
    });

  /*
   * A camada permanece abaixo da tela
   * no começo e sobe com o scroll.
   */
  const panelY = useTransform(
    scrollYProgress,
    [0, 0.12, 0.76, 1],
    [
      "100%",
      "100%",
      "0%",
      "0%",
    ],
  );

  const titleY = useTransform(
    scrollYProgress,
    [0, 0.35, 0.82],
    [0, 0, -42],
  );

  const titleOpacity =
    useTransform(
      scrollYProgress,
      [0, 0.55, 0.9],
      [1, 1, 0.38],
    );

  return (
    <>
      {/* ================================================
          DESKTOP
      ================================================= */}

      <div className={styles.desktopOnly}>
        <section
          aria-labelledby={desktopTitleId}
          className={styles.section}
        >
          <div className={styles.inner}>
            <h1
              className={styles.srOnly}
              id={desktopTitleId}
            >
              {title}
            </h1>

            <div
              aria-hidden="true"
              className={styles.titleStage}
              onPointerEnter={() =>
                setIsHovered(true)
              }
              onPointerLeave={() =>
                setIsHovered(false)
              }
            >
              <svg
                className={styles.titleSvg}
                preserveAspectRatio="xMidYMid meet"
                viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
              >
                <defs>
                  {shards.map(
                    (shard, index) => (
                      <clipPath
                        clipPathUnits="userSpaceOnUse"
                        id={`${clipId}-shard-${index}`}
                        key={`clip-${index}`}
                      >
                        <polygon
                          points={
                            shard.points
                          }
                        />
                      </clipPath>
                    ),
                  )}
                </defs>

                {shards.map(
                  (shard, index) => (
                    <motion.g
                      animate={
                        reduceMotion
                          ? {
                              x: 0,
                              y: 0,
                              rotate: 0,
                              scale: 1,
                              opacity: 1,
                            }
                          : isHovered
                            ? {
                                x:
                                  shard.hoverX,
                                y:
                                  shard.hoverY,
                                rotate:
                                  shard.hoverRotate,
                                scale: 1,
                                opacity: 1,
                              }
                            : {
                                x: 0,
                                y: 0,
                                rotate: 0,
                                scale: 1,
                                opacity: 1,
                              }
                      }
                      className={
                        styles.fragment
                      }
                      clipPath={`url(#${clipId}-shard-${index})`}
                      initial={
                        reduceMotion
                          ? false
                          : {
                              x:
                                shard.enterX,
                              y:
                                shard.enterY,
                              rotate:
                                shard.enterRotate,
                              scale:
                                shard.enterScale,
                              opacity: 0,
                            }
                      }
                      key={`fragment-${index}`}
                      transition={{
                        duration:
                          reduceMotion
                            ? 0
                            : isHovered
                              ? 0.34
                              : 0.95,

                        delay:
                          reduceMotion ||
                          isHovered
                            ? 0
                            : index *
                              0.022,

                        ease: [
                          0.22,
                          1,
                          0.36,
                          1,
                        ],
                      }}
                    >
                      <text
                        className={
                          styles.titleText
                        }
                        fontSize={
                          titleFontSize
                        }
                        lengthAdjust="spacingAndGlyphs"
                        textAnchor="middle"
                        textLength={
                          textLength
                        }
                        x={
                          viewBoxWidth / 2
                        }
                        y={
                          viewBoxHeight *
                          0.68125
                        }
                      >
                        {title}
                      </text>
                    </motion.g>
                  ),
                )}
              </svg>
            </div>
          </div>
        </section>

        <section
          aria-label={`Sobre ${title}`}
          className={
            styles.descriptionSection
          }
        >
          <motion.p
            animate={{
              opacity: 1,
              y: 0,
            }}
            className={styles.description}
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 12,
                  }
            }
            transition={{
              duration:
                reduceMotion
                  ? 0
                  : 0.75,
              delay:
                reduceMotion
                  ? 0
                  : 0.75,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
          >
            {description}
          </motion.p>
        </section>
      </div>

      {/* ================================================
          MOBILE
      ================================================= */}

      <section
        ref={mobileSceneRef}
        aria-labelledby={mobileTitleId}
        className={styles.mobileOnly}
      >
        <div className={styles.mobileSticky}>
          <motion.div
            className={styles.mobileTitleArea}
            style={
              reduceMotion
                ? undefined
                : {
                    y: titleY,
                    opacity:
                      titleOpacity,
                  }
            }
          >
            <span
              className={
                styles.mobileKicker
              }
            >
              Soluções noBRon
            </span>

            <h1
              className={
                styles.mobileTitle
              }
              id={mobileTitleId}
            >
              {title}
            </h1>
          </motion.div>

          <motion.div
            className={styles.mobilePanel}
            style={
              reduceMotion
                ? {
                    y: "0%",
                  }
                : {
                    y: panelY,
                  }
            }
          >
            <p
              className={
                styles.mobileDescription
              }
            >
              {description}
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
