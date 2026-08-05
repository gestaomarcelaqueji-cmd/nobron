"use client";

import type {
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
} from "react";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

import styles from "./VisualAdaptation.module.css";

/* =========================================================
   CONFIGURAÇÃO
========================================================= */

const WORD = "IDENTIDADE";

const PARTS = [
  "Logo",
  "Cor",
  "Tipografia",
  "Imagem",
  "Composição",
  "Movimento",
];

const SVG_WIDTH = 1200;
const SVG_HEIGHT = 360;

const TEXT_X = SVG_WIDTH / 2;
const TEXT_Y = 187;
const TEXT_LENGTH = 1075;

const COLUMNS = 12;
const ROWS = 4;

const TILE_WIDTH = SVG_WIDTH / COLUMNS;
const TILE_HEIGHT = 73;
const TILES_START_Y = 34;

type FragmentSpec = {
  id: number;
  column: number;
  row: number;

  x: number;
  y: number;

  width: number;
  height: number;

  centerX: number;
  centerY: number;

  normalizedX: number;
  normalizedY: number;

  offsetX: number;
  offsetY: number;
  offsetRotation: number;
  depth: number;
  delay: number;

  treatment: "fill" | "outline" | "soft";
};

type FragmentPieceProps = {
  fragment: FragmentSpec;

  clipId: string;

  progress: MotionValue<number>;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  hoverAmount: MotionValue<number>;

  reduceMotion: boolean;
};

/* =========================================================
   UTILITÁRIOS
========================================================= */

function clamp(
  value: number,
  minimum: number,
  maximum: number,
) {
  return Math.min(Math.max(value, minimum), maximum);
}

function seededRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;

  return value - Math.floor(value);
}

function remapFragmentProgress(
  progress: number,
  delay: number,
) {
  const availableRange = 1 - delay;

  if (availableRange <= 0) {
    return 1;
  }

  return clamp(
    (progress - delay) / availableRange,
    0,
    1,
  );
}

function createFragments(): FragmentSpec[] {
  const fragments: FragmentSpec[] = [];

  for (let row = 0; row < ROWS; row += 1) {
    for (
      let column = 0;
      column < COLUMNS;
      column += 1
    ) {
      const id = row * COLUMNS + column;

      const x = column * TILE_WIDTH;
      const y = TILES_START_Y + row * TILE_HEIGHT;

      const centerX = x + TILE_WIDTH / 2;
      const centerY = y + TILE_HEIGHT / 2;

      const normalizedX = centerX / SVG_WIDTH;
      const normalizedY = centerY / SVG_HEIGHT;

      const randomA = seededRandom(id + 1);
      const randomB = seededRandom(id + 14);
      const randomC = seededRandom(id + 31);
      const randomD = seededRandom(id + 72);

      const horizontalDirection =
        centerX < SVG_WIDTH / 2 ? -1 : 1;

      const verticalDirection =
        centerY < SVG_HEIGHT / 2 ? -1 : 1;

      const treatmentIndex = id % 7;

      let treatment: FragmentSpec["treatment"] =
        "fill";

      if (treatmentIndex === 0 || treatmentIndex === 4) {
        treatment = "outline";
      } else if (treatmentIndex === 2) {
        treatment = "soft";
      }

      fragments.push({
        id,
        column,
        row,

        x,
        y,

        width: TILE_WIDTH + 1.5,
        height: TILE_HEIGHT + 1.5,

        centerX,
        centerY,

        normalizedX,
        normalizedY,

        offsetX:
          horizontalDirection *
          (80 + randomA * 260),

        offsetY:
          verticalDirection *
          (45 + randomB * 190),

        offsetRotation:
          (randomC - 0.5) * 38,

        depth: 7 + randomD * 22,

        delay:
          clamp(
            randomA * 0.24 +
              Math.abs(normalizedX - 0.5) * 0.1,
            0,
            0.32,
          ),

        treatment,
      });
    }
  }

  return fragments;
}

/* =========================================================
   FRAGMENTO INDIVIDUAL
========================================================= */

function FragmentPiece({
  fragment,
  clipId,
  progress,
  pointerX,
  pointerY,
  hoverAmount,
  reduceMotion,
}: FragmentPieceProps) {
  const x = useTransform(
    [progress, pointerX, hoverAmount],
    ([latestProgress, latestPointerX, latestHover]) => {
      if (reduceMotion) {
        return 0;
      }

      const assembled = remapFragmentProgress(
        Number(latestProgress),
        fragment.delay,
      );

      const pointerDistance =
        fragment.normalizedX -
        Number(latestPointerX);

      const interactiveDisplacement =
        pointerDistance *
        fragment.depth *
        Number(latestHover) *
        assembled;

      return (
        fragment.offsetX * (1 - assembled) +
        interactiveDisplacement
      );
    },
  );

  const y = useTransform(
    [progress, pointerY, hoverAmount],
    ([latestProgress, latestPointerY, latestHover]) => {
      if (reduceMotion) {
        return 0;
      }

      const assembled = remapFragmentProgress(
        Number(latestProgress),
        fragment.delay,
      );

      const pointerDistance =
        fragment.normalizedY -
        Number(latestPointerY);

      const interactiveDisplacement =
        pointerDistance *
        fragment.depth *
        Number(latestHover) *
        assembled;

      return (
        fragment.offsetY * (1 - assembled) +
        interactiveDisplacement
      );
    },
  );

  const rotate = useTransform(
    [progress, pointerX, hoverAmount],
    ([latestProgress, latestPointerX, latestHover]) => {
      if (reduceMotion) {
        return 0;
      }

      const assembled = remapFragmentProgress(
        Number(latestProgress),
        fragment.delay,
      );

      const pointerInfluence =
        (fragment.normalizedX -
          Number(latestPointerX)) *
        3.5 *
        Number(latestHover);

      return (
        fragment.offsetRotation *
          (1 - assembled) +
        pointerInfluence
      );
    },
  );

  const scale = useTransform(
    progress,
    (latestProgress) => {
      const assembled = remapFragmentProgress(
        latestProgress,
        fragment.delay,
      );

      return 0.88 + assembled * 0.12;
    },
  );

  const opacity = useTransform(
    progress,
    (latestProgress) => {
      const assembled = remapFragmentProgress(
        latestProgress,
        fragment.delay,
      );

      return 0.18 + assembled * 0.82;
    },
  );

  const fragmentClassName = [
    styles.fragmentText,
    fragment.treatment === "outline"
      ? styles.fragmentOutline
      : "",
    fragment.treatment === "soft"
      ? styles.fragmentSoft
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.g
      clipPath={`url(#${clipId})`}
      style={{
        x,
        y,
        rotate,
        scale,
        opacity,
        transformOrigin: `${fragment.centerX}px ${fragment.centerY}px`,
      }}
    >
      <text
        className={fragmentClassName}
        dominantBaseline="middle"
        lengthAdjust="spacingAndGlyphs"
        textAnchor="middle"
        textLength={TEXT_LENGTH}
        x={TEXT_X}
        y={TEXT_Y}
      >
        {WORD}
      </text>
    </motion.g>
  );
}

/* =========================================================
   SEÇÃO
========================================================= */

export function VisualAdaptation() {
  const reduceMotion = useReducedMotion();

  const rawId = useId();
  const componentId = rawId.replaceAll(":", "");

  const stageRef = useRef<HTMLDivElement>(null);

  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    startProgress: number;
    moved: boolean;
  } | null>(null);

  const [isDragging, setIsDragging] =
    useState(false);

  const fragments = useMemo(
    () => createFragments(),
    [],
  );

  const isInView = useInView(stageRef, {
    once: true,
    amount: 0.34,
  });

  /*
   * targetProgress recebe o valor desejado.
   * progress suaviza o movimento.
   */
  const targetProgress = useMotionValue(
    reduceMotion ? 1 : 0.04,
  );

  const progress = useSpring(targetProgress, {
    stiffness: 110,
    damping: 24,
    mass: 0.74,
  });

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const hoverAmount = useMotionValue(0);

  const smoothPointerX = useSpring(pointerX, {
    stiffness: 150,
    damping: 26,
    mass: 0.5,
  });

  const smoothPointerY = useSpring(pointerY, {
    stiffness: 150,
    damping: 26,
    mass: 0.5,
  });

  const completeWordOpacity = useTransform(
    progress,
    [0.88, 0.98, 1],
    [0, 0.16, 0.92],
  );

  const completeWordScale = useTransform(
    progress,
    [0.88, 1],
    [0.992, 1],
  );

  const statementOpacity = useTransform(
    progress,
    [0.68, 0.92],
    [0, 1],
  );

  const statementY = useTransform(
    progress,
    [0.68, 0.92],
    [22, 0],
  );

  const partsOpacity = useTransform(
    progress,
    [0.52, 0.84],
    [0, 1],
  );

  const progressScale = useTransform(
    progress,
    [0, 1],
    [0, 1],
  );

  const progressPosition = useTransform(
    progress,
    (latest) => `${latest * 100}%`,
  );

  const outlineX = useTransform(
    smoothPointerX,
    [0, 1],
    [-12, 12],
  );

  const outlineY = useTransform(
    smoothPointerY,
    [0, 1],
    [-7, 7],
  );

  /* =======================================================
     ANIMAÇÃO AUTOMÁTICA DE ENTRADA
  ======================================================= */

  useEffect(() => {
    if (!isInView) {
      return;
    }

    if (reduceMotion) {
      targetProgress.set(1);
      return;
    }

    const controls = animate(
      targetProgress,
      1,
      {
        duration: 2.25,
        delay: 0.15,
        ease: [0.16, 1, 0.3, 1],
      },
    );

    return () => {
      controls.stop();
    };
  }, [
    isInView,
    reduceMotion,
    targetProgress,
  ]);

  /* =======================================================
     FUNÇÕES
  ======================================================= */

  function updatePointerPosition(
    clientX: number,
    clientY: number,
  ) {
    const stage = stageRef.current;

    if (!stage) {
      return;
    }

    const bounds =
      stage.getBoundingClientRect();

    if (
      bounds.width === 0 ||
      bounds.height === 0
    ) {
      return;
    }

    pointerX.set(
      clamp(
        (clientX - bounds.left) /
          bounds.width,
        0,
        1,
      ),
    );

    pointerY.set(
      clamp(
        (clientY - bounds.top) /
          bounds.height,
        0,
        1,
      ),
    );
  }

  function moveToProgress(
    nextProgress: number,
  ) {
    animate(
      targetProgress,
      clamp(nextProgress, 0, 1),
      {
        duration: reduceMotion ? 0 : 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    );
  }

  function toggleAssembly() {
    const nextValue =
      targetProgress.get() >= 0.5
        ? 0.06
        : 1;

    moveToProgress(nextValue);
  }

  function handlePointerEnter(
    event: ReactPointerEvent<HTMLDivElement>,
  ) {
    updatePointerPosition(
      event.clientX,
      event.clientY,
    );

    animate(hoverAmount, 1, {
      duration: reduceMotion ? 0 : 0.35,
      ease: [0.22, 1, 0.36, 1],
    });
  }

  function handlePointerMove(
    event: ReactPointerEvent<HTMLDivElement>,
  ) {
    updatePointerPosition(
      event.clientX,
      event.clientY,
    );

    const drag = dragRef.current;

    if (
      !drag ||
      drag.pointerId !== event.pointerId
    ) {
      return;
    }

    const stage = stageRef.current;

    if (!stage) {
      return;
    }

    const bounds =
      stage.getBoundingClientRect();

    const deltaX =
      event.clientX - drag.startX;

    const deltaY =
      event.clientY - drag.startY;

    if (
      Math.abs(deltaX) > 5 ||
      Math.abs(deltaY) > 5
    ) {
      drag.moved = true;
    }

    const dragRange =
      Math.max(bounds.width * 0.56, 240);

    const nextProgress =
      drag.startProgress +
      deltaX / dragRange;

    targetProgress.set(
      clamp(nextProgress, 0, 1),
    );
  }

  function handlePointerDown(
    event: ReactPointerEvent<HTMLDivElement>,
  ) {
    updatePointerPosition(
      event.clientX,
      event.clientY,
    );

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startProgress: targetProgress.get(),
      moved: false,
    };

    setIsDragging(true);

    event.currentTarget.setPointerCapture(
      event.pointerId,
    );
  }

  function finishPointerInteraction(
    event: ReactPointerEvent<HTMLDivElement>,
  ) {
    const drag = dragRef.current;

    if (
      !drag ||
      drag.pointerId !== event.pointerId
    ) {
      return;
    }

    const wasMoved = drag.moved;

    dragRef.current = null;
    setIsDragging(false);

    if (
      event.currentTarget.hasPointerCapture(
        event.pointerId,
      )
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId,
      );
    }

    if (!wasMoved) {
      toggleAssembly();
      return;
    }

    const finalProgress =
      targetProgress.get() >= 0.5
        ? 1
        : 0.06;

    moveToProgress(finalProgress);
  }

  function cancelPointerInteraction(
    event: ReactPointerEvent<HTMLDivElement>,
  ) {
    dragRef.current = null;
    setIsDragging(false);

    if (
      event.currentTarget.hasPointerCapture(
        event.pointerId,
      )
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId,
      );
    }

    moveToProgress(
      targetProgress.get() >= 0.5
        ? 1
        : 0.06,
    );
  }

  function handlePointerLeave() {
    if (dragRef.current) {
      return;
    }

    animate(hoverAmount, 0, {
      duration: reduceMotion ? 0 : 0.45,
      ease: [0.22, 1, 0.36, 1],
    });

    pointerX.set(0.5);
    pointerY.set(0.5);
  }

  function handleKeyDown(
    event: ReactKeyboardEvent<HTMLDivElement>,
  ) {
    let nextProgress =
      targetProgress.get();

    let handled = true;

    switch (event.key) {
      case "ArrowLeft":
      case "ArrowDown":
        nextProgress -= event.shiftKey
          ? 0.2
          : 0.1;
        break;

      case "ArrowRight":
      case "ArrowUp":
        nextProgress += event.shiftKey
          ? 0.2
          : 0.1;
        break;

      case "Home":
        nextProgress = 0.06;
        break;

      case "End":
        nextProgress = 1;
        break;

      case "Enter":
      case " ":
        toggleAssembly();
        event.preventDefault();
        return;

      default:
        handled = false;
    }

    if (!handled) {
      return;
    }

    event.preventDefault();

    moveToProgress(nextProgress);
  }

  /* =======================================================
     RENDER
  ======================================================= */

  const wordMaskId = `identity-word-mask-${componentId}`;
  const colorGradientId = `identity-color-${componentId}`;
  const glowId = `identity-glow-${componentId}`;

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>

        <span>02 / Branding e Design</span>
      </div>

      <motion.div
        ref={stageRef}
        aria-label="Identidade sendo formada por diferentes partes. Arraste horizontalmente ou pressione Enter para montar e desmontar."
        className={styles.stage}
        data-dragging={isDragging}
        onKeyDown={handleKeyDown}
        onPointerCancel={
          cancelPointerInteraction
        }
        onPointerDown={handlePointerDown}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerMove={handlePointerMove}
        onPointerUp={finishPointerInteraction}
        role="group"
        tabIndex={0}
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                y: 30,
              }
        }
        whileInView={
          reduceMotion
            ? undefined
            : {
                opacity: 1,
                y: 0,
              }
        }
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div
          aria-hidden="true"
          className={styles.technicalGrid}
        />

        <div className={styles.stageMeta}>
          <span>
            FRAGMENT
            <span aria-hidden="true"> → </span>
            SYSTEM
          </span>

          <span>ASSEMBLY / LIVE</span>
        </div>

        <div className={styles.wordStage}>
          <svg
            aria-hidden="true"
            className={styles.wordSvg}
            preserveAspectRatio="xMidYMid meet"
            viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          >
            <defs>
              {fragments.map((fragment) => {
                const clipId = `identity-fragment-${componentId}-${fragment.id}`;

                return (
                  <clipPath
                    id={clipId}
                    key={clipId}
                  >
                    <rect
                      height={fragment.height}
                      width={fragment.width}
                      x={fragment.x}
                      y={fragment.y}
                    />
                  </clipPath>
                );
              })}

              <mask id={wordMaskId}>
                <rect
                  fill="#000000"
                  height={SVG_HEIGHT}
                  width={SVG_WIDTH}
                />

                <text
                  className={styles.maskText}
                  dominantBaseline="middle"
                  fill="#ffffff"
                  lengthAdjust="spacingAndGlyphs"
                  textAnchor="middle"
                  textLength={TEXT_LENGTH}
                  x={TEXT_X}
                  y={TEXT_Y}
                >
                  {WORD}
                </text>
              </mask>

              <linearGradient
                gradientUnits="userSpaceOnUse"
                id={colorGradientId}
                x1="0"
                x2="440"
                y1="0"
                y2="0"
              >
                <stop
                  offset="0%"
                  stopColor="#275efe"
                  stopOpacity="0"
                />

                <stop
                  offset="22%"
                  stopColor="#275efe"
                />

                <stop
                  offset="46%"
                  stopColor="#24d6e8"
                />

                <stop
                  offset="69%"
                  stopColor="#8b5cf6"
                />

                <stop
                  offset="88%"
                  stopColor="#ff6b5f"
                />

                <stop
                  offset="100%"
                  stopColor="#ff6b5f"
                  stopOpacity="0"
                />
              </linearGradient>

              <filter
                height="180%"
                id={glowId}
                width="180%"
                x="-40%"
                y="-40%"
              >
                <feGaussianBlur
                  result="blur"
                  stdDeviation="6"
                />

                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Profundidade em contorno */}
            <motion.g
              className={styles.outlineGroup}
              style={{
                x: outlineX,
                y: outlineY,
              }}
            >
              <text
                className={`${styles.depthWord} ${styles.depthWordA}`}
                dominantBaseline="middle"
                lengthAdjust="spacingAndGlyphs"
                textAnchor="middle"
                textLength={TEXT_LENGTH}
                x={TEXT_X}
                y={TEXT_Y - 76}
              >
                {WORD}
              </text>

              <text
                className={`${styles.depthWord} ${styles.depthWordB}`}
                dominantBaseline="middle"
                lengthAdjust="spacingAndGlyphs"
                textAnchor="middle"
                textLength={TEXT_LENGTH}
                x={TEXT_X}
                y={TEXT_Y - 35}
              >
                {WORD}
              </text>

              <text
                className={`${styles.depthWord} ${styles.depthWordC}`}
                dominantBaseline="middle"
                lengthAdjust="spacingAndGlyphs"
                textAnchor="middle"
                textLength={TEXT_LENGTH}
                x={TEXT_X}
                y={TEXT_Y + 47}
              >
                {WORD}
              </text>

              <text
                className={`${styles.depthWord} ${styles.depthWordD}`}
                dominantBaseline="middle"
                lengthAdjust="spacingAndGlyphs"
                textAnchor="middle"
                textLength={TEXT_LENGTH}
                x={TEXT_X}
                y={TEXT_Y + 87}
              >
                {WORD}
              </text>
            </motion.g>

            {/* Fragmentos */}
            {fragments.map((fragment) => {
              const clipId = `identity-fragment-${componentId}-${fragment.id}`;

              return (
                <FragmentPiece
                  clipId={clipId}
                  fragment={fragment}
                  hoverAmount={hoverAmount}
                  key={fragment.id}
                  pointerX={smoothPointerX}
                  pointerY={smoothPointerY}
                  progress={progress}
                  reduceMotion={Boolean(
                    reduceMotion,
                  )}
                />
              );
            })}

            {/* Palavra sólida para unir pequenas emendas */}
            <motion.text
              className={styles.completeWord}
              dominantBaseline="middle"
              lengthAdjust="spacingAndGlyphs"
              style={{
                opacity: completeWordOpacity,
                scale: completeWordScale,
                transformOrigin: `${TEXT_X}px ${TEXT_Y}px`,
              }}
              textAnchor="middle"
              textLength={TEXT_LENGTH}
              x={TEXT_X}
              y={TEXT_Y}
            >
              {WORD}
            </motion.text>

            {/* Faixa artística de cor */}
            <g mask={`url(#${wordMaskId})`}>
              <motion.rect
                animate={
                  isInView && !reduceMotion
                    ? {
                        x: [
                          -500,
                          1320,
                          1320,
                        ],
                        opacity: [
                          0,
                          0.95,
                          0,
                        ],
                      }
                    : {
                        x: -500,
                        opacity: 0,
                      }
                }
                fill={`url(#${colorGradientId})`}
                filter={`url(#${glowId})`}
                height={SVG_HEIGHT}
                initial={{
                  x: -500,
                  opacity: 0,
                }}
                transition={{
                  duration: 2.3,
                  delay: 2.15,
                  ease: [0.22, 1, 0.36, 1],
                  repeat: reduceMotion
                    ? 0
                    : Infinity,
                  repeatDelay: 4.2,
                }}
                width="440"
                y="0"
              />
            </g>
          </svg>
        </div>

        <motion.div
          className={styles.statement}
          style={{
            opacity: statementOpacity,
            y: statementY,
          }}
        >
          <span>Não é uma peça.</span>

          <strong>
            É o sistema que conecta todas elas.
          </strong>
        </motion.div>

        <motion.div
          className={styles.parts}
          style={{
            opacity: partsOpacity,
          }}
        >
          {PARTS.map((part, index) => (
            <motion.span
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 10,
                    }
              }
              key={part}
              transition={{
                duration: 0.45,
                delay:
                  1.45 + index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{
                once: true,
              }}
              whileInView={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      y: 0,
                    }
              }
            >
              <span>
                {String(index + 1).padStart(
                  2,
                  "0",
                )}
              </span>

              <strong>{part}</strong>
            </motion.span>
          ))}
        </motion.div>

        <div
          aria-hidden="true"
          className={styles.assemblyControl}
        >
          <span>Fragmento</span>

          <div className={styles.controlTrack}>
            <motion.span
              className={styles.controlProgress}
              style={{
                scaleX: progressScale,
              }}
            />

            <motion.span
              className={styles.controlHandle}
              style={{
                left: progressPosition,
              }}
            />
          </div>

          <span>Sistema</span>
        </div>

        <span className={styles.instruction}>
          Arraste horizontalmente ou toque para
          montar e desmontar
        </span>
      </motion.div>
    </section>
  );
}
