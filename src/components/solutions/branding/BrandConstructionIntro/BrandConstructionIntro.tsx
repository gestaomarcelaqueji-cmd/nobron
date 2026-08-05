"use client";

import type {
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
} from "react";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

import { brandingPageData } from "@/data/solutions/branding";

import styles from "./BrandConstructionIntro.module.css";

const REST_POINT = {
  x: 50,
  y: 52,
};

const START_X = 1;
const END_X = 99;
const BASELINE_Y = 52;

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

function createCurve(x: number, y: number) {
  const leftControlX = START_X + (x - START_X) * 0.5;
  const rightControlX = x + (END_X - x) * 0.5;

  const line = [
    `M ${START_X} ${BASELINE_Y}`,
    `Q ${leftControlX} ${y}, ${x} ${y}`,
    `Q ${rightControlX} ${y}, ${END_X} ${BASELINE_Y}`,
  ].join(" ");

  const fill = [
    line,
    `L ${END_X} 100`,
    `L ${START_X} 100`,
    "Z",
  ].join(" ");

  return {
    line,
    fill,
  };
}

export function BrandConstructionIntro() {
  const reduceMotion = useReducedMotion();
  const { constructionIntro } = brandingPageData;

  const rawId = useId();
  const componentId = rawId.replaceAll(":", "");

  const clipPathId = `branding-curve-reveal-${componentId}`;
  const curveGradientId = `branding-curve-gradient-${componentId}`;
  const curveGlowId = `branding-curve-glow-${componentId}`;
  const instructionId = `branding-curve-instruction-${componentId}`;

  const stageRef = useRef<HTMLDivElement>(null);
  const boundsRef = useRef<DOMRectReadOnly | null>(null);
  const draggingRef = useRef(false);
  const focusedRef = useRef(false);

  const coordinateXRef = useRef<HTMLSpanElement>(null);
  const coordinateYRef = useRef<HTMLSpanElement>(null);

  const [isActive, setIsActive] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  /*
   * Os valores-alvo recebem a posição real do cursor.
   * As molas cuidam da suavização sem causar renderizações do React.
   */
  const targetX = useMotionValue(REST_POINT.x);
  const targetY = useMotionValue(REST_POINT.y);

  const springX = useSpring(targetX, {
    stiffness: 230,
    damping: 30,
    mass: 0.45,
  });

  const springY = useSpring(targetY, {
    stiffness: 230,
    damping: 30,
    mass: 0.45,
  });

  /*
   * Com redução de movimento ativada, a curva responde diretamente.
   */
  const visualX = reduceMotion ? targetX : springX;
  const visualY = reduceMotion ? targetY : springY;

  const leftControlX = useTransform(
    visualX,
    (value) => START_X + (value - START_X) * 0.5,
  );

  const rightControlX = useTransform(
    visualX,
    (value) => value + (END_X - value) * 0.5,
  );

  const curveLine = useTransform(
    [visualX, visualY],
    ([latestX, latestY]) =>
      createCurve(Number(latestX), Number(latestY)).line,
  );

  const curveFill = useTransform(
    [visualX, visualY],
    ([latestX, latestY]) =>
      createCurve(Number(latestX), Number(latestY)).fill,
  );

  /*
   * textLength impede que frases longas ultrapassem o viewBox.
   */
  const firstTextLength = clamp(
    constructionIntro.firstLine.length * 4.2,
    48,
    68,
  );

  const secondTextLength = clamp(
    constructionIntro.secondLine.length * 3.5,
    70,
    90,
  );

  const refreshBounds = useCallback(() => {
    if (!stageRef.current) {
      return;
    }

    boundsRef.current = stageRef.current.getBoundingClientRect();
  }, []);

  useEffect(() => {
    refreshBounds();

    const element = stageRef.current;

    if (!element) {
      return;
    }

    const observer = new ResizeObserver(refreshBounds);

    observer.observe(element);

    window.addEventListener("resize", refreshBounds);
    window.addEventListener("scroll", refreshBounds, {
      passive: true,
    });

    return () => {
      observer.disconnect();

      window.removeEventListener("resize", refreshBounds);
      window.removeEventListener("scroll", refreshBounds);
    };
  }, [refreshBounds]);

  /*
   * Atualiza os números diretamente no DOM.
   * Isso evita setState durante o movimento.
   */
  useMotionValueEvent(visualX, "change", (latest) => {
    if (coordinateXRef.current) {
      coordinateXRef.current.textContent = `X ${latest.toFixed(1)}`;
    }
  });

  useMotionValueEvent(visualY, "change", (latest) => {
    if (coordinateYRef.current) {
      coordinateYRef.current.textContent = `Y ${latest.toFixed(1)}`;
    }
  });

  const updatePointFromClient = useCallback(
    (clientX: number, clientY: number) => {
      const bounds =
        boundsRef.current ??
        stageRef.current?.getBoundingClientRect();

      if (!bounds || bounds.width === 0 || bounds.height === 0) {
        return;
      }

      const normalizedX =
        ((clientX - bounds.left) / bounds.width) * 100;

      const normalizedY =
        ((clientY - bounds.top) / bounds.height) * 100;

      /*
       * As margens impedem que o ponto central encoste nas bordas.
       */
      targetX.set(clamp(normalizedX, 6, 94));
      targetY.set(clamp(normalizedY, 18, 82));
    },
    [targetX, targetY],
  );

  const resetPoint = useCallback(() => {
    targetX.set(REST_POINT.x);
    targetY.set(REST_POINT.y);
  }, [targetX, targetY]);

  function handlePointerEnter(
    event: ReactPointerEvent<HTMLDivElement>,
  ) {
    refreshBounds();

    if (event.pointerType !== "touch") {
      setIsActive(true);
      updatePointFromClient(event.clientX, event.clientY);
    }
  }

  function handlePointerMove(
    event: ReactPointerEvent<HTMLDivElement>,
  ) {
    /*
     * Mouse responde ao hover.
     * Caneta responde durante o arraste.
     * No touch, usamos o toque pontual para não bloquear o scroll.
     */
    const shouldRespond =
      event.pointerType === "mouse" ||
      draggingRef.current;

    if (!shouldRespond) {
      return;
    }

    updatePointFromClient(event.clientX, event.clientY);
  }

  function handlePointerDown(
    event: ReactPointerEvent<HTMLDivElement>,
  ) {
    refreshBounds();
    updatePointFromClient(event.clientX, event.clientY);
    setIsActive(true);

    /*
     * Touch apenas posiciona a curva no local tocado.
     * Mouse e caneta podem arrastar.
     */
    if (event.pointerType === "touch") {
      return;
    }

    draggingRef.current = true;
    setIsDragging(true);

    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function finishDragging(
    event: ReactPointerEvent<HTMLDivElement>,
  ) {
    draggingRef.current = false;
    setIsDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function handlePointerLeave(
    event: ReactPointerEvent<HTMLDivElement>,
  ) {
    if (
      event.pointerType === "mouse" &&
      !draggingRef.current &&
      !focusedRef.current
    ) {
      setIsActive(false);
      resetPoint();
    }
  }

  function handleFocus() {
    focusedRef.current = true;
    setIsActive(true);
  }

  function handleBlur() {
    focusedRef.current = false;
    setIsActive(false);
    resetPoint();
  }

  function handleKeyDown(
    event: ReactKeyboardEvent<HTMLDivElement>,
  ) {
    const step = event.shiftKey ? 8 : 4;

    let nextX = targetX.get();
    let nextY = targetY.get();
    let handled = true;

    switch (event.key) {
      case "ArrowLeft":
        nextX -= step;
        break;

      case "ArrowRight":
        nextX += step;
        break;

      case "ArrowUp":
        nextY -= step;
        break;

      case "ArrowDown":
        nextY += step;
        break;

      case "Home":
        nextX = REST_POINT.x;
        nextY = REST_POINT.y;
        break;

      default:
        handled = false;
    }

    if (!handled) {
      return;
    }

    event.preventDefault();

    setIsActive(true);

    targetX.set(clamp(nextX, 6, 94));
    targetY.set(clamp(nextY, 18, 82));
  }

  return (
    <section className={styles.section}>
      <motion.div
        className={styles.header}
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                y: 24,
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
          amount: 0.45,
        }}
        transition={{
          duration: 0.75,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <span>{constructionIntro.eyebrow}</span>

        <p>{constructionIntro.description}</p>
      </motion.div>

      <motion.div
        ref={stageRef}
        aria-describedby={instructionId}
        aria-keyshortcuts="ArrowUp ArrowDown ArrowLeft ArrowRight Home"
        aria-label={`${constructionIntro.firstLine}. ${constructionIntro.secondLine}. Área interativa para transformar a mensagem.`}
        className={styles.stage}
        data-active={isActive}
        data-dragging={isDragging}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        onLostPointerCapture={() => {
          draggingRef.current = false;
          setIsDragging(false);
        }}
        onPointerCancel={finishDragging}
        onPointerDown={handlePointerDown}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDragging}
        role="group"
        tabIndex={0}
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                y: 34,
                scale: 0.985,
              }
        }
        whileInView={
          reduceMotion
            ? undefined
            : {
                opacity: 1,
                y: 0,
                scale: 1,
              }
        }
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.85,
          delay: 0.08,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div
          aria-hidden="true"
          className={styles.grid}
        />

        <div
          aria-hidden="true"
          className={styles.stageStatus}
        >
          <span className={styles.statusPoint} />
          <span>CURVE / LIVE</span>
        </div>

        <svg
          aria-hidden="true"
          className={styles.statement}
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 100 100"
        >
          <defs>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id={curveGradientId}
              x1="1"
              x2="99"
              y1="0"
              y2="0"
            >
              <stop
                offset="0%"
                stopColor="#24d6e8"
              />

              <stop
                offset="48%"
                stopColor="#8b5cf6"
              />

              <stop
                offset="100%"
                stopColor="#ff6b5f"
              />
            </linearGradient>

            <filter
              height="180%"
              id={curveGlowId}
              width="180%"
              x="-40%"
              y="-40%"
            >
              <feGaussianBlur
                result="blur"
                stdDeviation="0.6"
              />

              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <clipPath id={clipPathId}>
              <motion.path d={curveFill} />
            </clipPath>
          </defs>

          <text
            className={styles.firstText}
            dominantBaseline="middle"
            lengthAdjust="spacing"
            textAnchor="middle"
            textLength={firstTextLength}
            x="50"
            y="50"
          >
            {constructionIntro.firstLine}
          </text>

          <text
            className={styles.secondText}
            clipPath={`url(#${clipPathId})`}
            dominantBaseline="middle"
            fill={`url(#${curveGradientId})`}
            lengthAdjust="spacing"
            textAnchor="middle"
            textLength={secondTextLength}
            x="50"
            y="50"
          >
            {constructionIntro.secondLine}
          </text>

          {/* Eixos ligados diretamente ao ponto controlado */}
          <motion.line
            className={styles.axisLine}
            x1={visualX}
            x2={visualX}
            y1="4"
            y2="96"
          />

          <motion.line
            className={styles.axisLine}
            x1="4"
            x2="96"
            y1={visualY}
            y2={visualY}
          />

          {/* Alças reais da curva */}
          <motion.line
            className={styles.controlLine}
            x1={START_X}
            x2={leftControlX}
            y1={BASELINE_Y}
            y2={visualY}
          />

          <motion.line
            className={styles.tangentLine}
            x1={leftControlX}
            x2={rightControlX}
            y1={visualY}
            y2={visualY}
          />

          <motion.line
            className={styles.controlLine}
            x1={rightControlX}
            x2={END_X}
            y1={visualY}
            y2={BASELINE_Y}
          />

          <motion.circle
            animate={{
              opacity: isActive ? 0.32 : 0.12,
              r: isActive ? 9 : 6,
            }}
            className={styles.cursorGlow}
            cx={visualX}
            cy={visualY}
            transition={{
              duration: 0.3,
            }}
          />

          <motion.path
            className={styles.curve}
            d={curveLine}
            filter={`url(#${curveGlowId})`}
            initial={
              reduceMotion
                ? false
                : {
                    pathLength: 0,
                    opacity: 0,
                  }
            }
            stroke={`url(#${curveGradientId})`}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{
              once: true,
              amount: 0.5,
            }}
            whileInView={
              reduceMotion
                ? undefined
                : {
                    pathLength: 1,
                    opacity: 1,
                  }
            }
          />

          <circle
            className={styles.anchor}
            cx={START_X}
            cy={BASELINE_Y}
            r="1.05"
          />

          <circle
            className={styles.anchor}
            cx={END_X}
            cy={BASELINE_Y}
            r="1.05"
          />

          <motion.circle
            className={styles.handle}
            cx={leftControlX}
            cy={visualY}
            r="0.82"
          />

          <motion.circle
            className={styles.handle}
            cx={rightControlX}
            cy={visualY}
            r="0.82"
          />

          <motion.circle
            animate={{
              r: isActive ? 1.5 : 1.15,
            }}
            className={styles.focusPoint}
            cx={visualX}
            cy={visualY}
            transition={{
              duration: 0.25,
            }}
          />
        </svg>

        <div
          aria-hidden="true"
          className={styles.coordinates}
        >
          <span ref={coordinateXRef}>X 50.0</span>
          <span ref={coordinateYRef}>Y 52.0</span>
        </div>

        <div
          aria-hidden="true"
          className={styles.legend}
        >
          <span>Q / QUADRATIC BÉZIER</span>
          <span>INPUT / POINTER</span>
        </div>

        <span
          className={styles.instruction}
          id={instructionId}
        >
          

          <span className={styles.touchInstruction}>
            Toque em diferentes pontos para transformar a mensagem
          </span>
        </span>

        <span className={styles.screenReaderOnly}>
          Use as setas do teclado para mover a curva. Pressione Home
          para retornar ao centro.
        </span>
      </motion.div>
    </section>
  );
}
