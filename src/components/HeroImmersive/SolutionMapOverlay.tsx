"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type PointerEvent,
} from "react";

import {
  HERO_AMBIENT_WORDS,
  HERO_SOLUTIONS,
  HERO_SOLUTIONS_BY_ID,
} from "./heroImmersive.data";
import styles from "./SolutionMapOverlay.module.css";
import type {
  HeroSolution,
  HeroSolutionId,
  HeroSolutionNavigateHandler,
  SolutionMapOverlayHandle,
  SolutionPortalPositions,
} from "./heroImmersive.types";

type SolutionMapOverlayProps = {
  /** Mostra os portais secundários. */
  visible: boolean;
  /** Permite revelar Landing Page antes dos demais portais. */
  featuredVisible: boolean;
  /** Só libera mouse, toque e teclado depois da formação da rede. */
  interactive: boolean;
  activeId?: HeroSolutionId | null;
  onActiveChange?: (id: HeroSolutionId | null) => void;
  onNavigateStart?: HeroSolutionNavigateHandler;
  className?: string;
};

type PortalPositionStyle = CSSProperties & {
  "--portal-desktop-x": string;
  "--portal-desktop-y": string;
  "--portal-mobile-x": string;
  "--portal-mobile-y": string;
};

function isModifiedNavigation(event: MouseEvent<HTMLAnchorElement>) {
  return (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  );
}

export const SolutionMapOverlay = forwardRef<
  SolutionMapOverlayHandle,
  SolutionMapOverlayProps
>(function SolutionMapOverlay(
  {
    visible,
    featuredVisible,
    interactive,
    activeId,
    onActiveChange,
    onNavigateStart,
    className,
  },
  forwardedRef,
) {
  const reducedMotion = useReducedMotion();
  const [internalActiveId, setInternalActiveId] =
    useState<HeroSolutionId | null>(null);
  const positionNodesRef = useRef(
    new Map<HeroSolutionId, HTMLLIElement>(),
  );
  const lastPointerTypeRef = useRef<string>("mouse");
  const touchArmedIdRef = useRef<HeroSolutionId | null>(null);

  const resolvedActiveId =
    activeId === undefined ? internalActiveId : activeId;
  const activeSolution = resolvedActiveId
    ? HERO_SOLUTIONS_BY_ID[resolvedActiveId]
    : null;

  const updateActive = useCallback(
    (nextId: HeroSolutionId | null) => {
      if (activeId === undefined) {
        setInternalActiveId(nextId);
      }
      onActiveChange?.(nextId);
    },
    [activeId, onActiveChange],
  );

  const resetPositions = useCallback(() => {
    positionNodesRef.current.forEach((node) => {
      node.style.removeProperty("--portal-projected-x");
      node.style.removeProperty("--portal-projected-y");
      node.style.removeProperty("--portal-projected-scale");
      delete node.dataset.projected;
      delete node.dataset.projectedVisible;
    });
  }, []);

  const clearActive = useCallback(() => {
    touchArmedIdRef.current = null;
    updateActive(null);
  }, [updateActive]);

  useImperativeHandle(
    forwardedRef,
    () => ({
      updatePositions: (positions: SolutionPortalPositions) => {
        for (const [id, position] of Object.entries(positions) as Array<
          [HeroSolutionId, SolutionPortalPositions[HeroSolutionId]]
        >) {
          const node = positionNodesRef.current.get(id);
          if (
            !node ||
            !position ||
            !Number.isFinite(position.x) ||
            !Number.isFinite(position.y)
          ) {
            continue;
          }

          node.dataset.projected = "true";
          node.dataset.projectedVisible =
            position.visible === false ? "false" : "true";
          node.style.setProperty(
            "--portal-projected-x",
            `${position.x.toFixed(2)}px`,
          );
          node.style.setProperty(
            "--portal-projected-y",
            `${position.y.toFixed(2)}px`,
          );
          node.style.setProperty(
            "--portal-projected-scale",
            Math.min(1.18, Math.max(0.78, position.scale ?? 1)).toFixed(3),
          );
        }
      },
      resetPositions,
      clearActive,
    }),
    [clearActive, resetPositions],
  );

  const handlePointerDown = useCallback(
    (
      solution: HeroSolution,
      event: PointerEvent<HTMLAnchorElement>,
    ) => {
      lastPointerTypeRef.current = event.pointerType;

      if (event.pointerType === "touch" || event.pointerType === "pen") {
        updateActive(solution.id);
      }
    },
    [updateActive],
  );

  const handlePortalClick = useCallback(
    (
      solution: HeroSolution,
      event: MouseEvent<HTMLAnchorElement>,
    ) => {
      if (!interactive) {
        event.preventDefault();
        return;
      }

      const usesTapConfirmation =
        lastPointerTypeRef.current === "touch" ||
        lastPointerTypeRef.current === "pen";

      if (
        usesTapConfirmation &&
        touchArmedIdRef.current !== solution.id &&
        !isModifiedNavigation(event)
      ) {
        event.preventDefault();
        touchArmedIdRef.current = solution.id;
        updateActive(solution.id);
        return;
      }

      onNavigateStart?.(solution, event);
    },
    [interactive, onNavigateStart, updateActive],
  );

  const handlePanelNavigate = useCallback(
    (
      solution: HeroSolution,
      event: MouseEvent<HTMLAnchorElement>,
    ) => {
      onNavigateStart?.(solution, event);
    },
    [onNavigateStart],
  );

  const showAmbientWords = visible && interactive;

  return (
    <div
      id="mapa-de-solucoes"
      className={`${styles.overlay}${className ? ` ${className}` : ""}`}
      data-has-active={resolvedActiveId ? "true" : "false"}
      data-interactive={interactive ? "true" : "false"}
      role="region"
      aria-label="Mapa de soluções da noBRon"
    >
      <div className={styles.instructions}>
        <p>
          Explore a rede. Passe pelo mapa ou use Tab para conhecer cada solução.
        </p>
      </div>

      <div className={styles.ambientLayer} aria-hidden="true">
        {HERO_AMBIENT_WORDS.map((word, index) => (
          <motion.span
            key={word.label}
            className={styles.ambientWord}
            style={{ left: `${word.x}%`, top: `${word.y}%` }}
            initial={false}
            animate={{
              opacity: showAmbientWords ? 0.34 : 0,
            }}
            transition={{
              duration: reducedMotion ? 0 : 0.8,
              delay: reducedMotion ? 0 : index * 0.1,
            }}
          >
            {word.label}
          </motion.span>
        ))}
      </div>

      <ul className={styles.portalList}>
        {HERO_SOLUTIONS.map((solution) => {
          const itemVisible = solution.featured
            ? featuredVisible
            : visible;
          const isActive = resolvedActiveId === solution.id;
          const fallbackStyle: PortalPositionStyle = {
            "--portal-desktop-x": `${solution.fallback.desktop.x}%`,
            "--portal-desktop-y": `${solution.fallback.desktop.y}%`,
            "--portal-mobile-x": `${solution.fallback.mobile.x}%`,
            "--portal-mobile-y": `${solution.fallback.mobile.y}%`,
          };

          return (
            <li
              key={solution.id}
              ref={(node) => {
                if (node) {
                  positionNodesRef.current.set(solution.id, node);
                } else {
                  positionNodesRef.current.delete(solution.id);
                }
              }}
              className={styles.positioner}
              style={fallbackStyle}
              data-active={isActive ? "true" : "false"}
              data-featured={solution.featured ? "true" : "false"}
              data-label-side={
                solution.fallback.desktop.x > 60 ? "left" : "right"
              }
            >
              <motion.div
                className={styles.portalMotion}
                initial={false}
                animate={{
                  opacity: itemVisible ? 1 : 0,
                  scale: itemVisible ? 1 : 0.72,
                  y: itemVisible ? 0 : 8,
                }}
                transition={{
                  duration: reducedMotion ? 0 : 0.65,
                  delay:
                    reducedMotion || !itemVisible
                      ? 0
                      : solution.featured
                        ? 0
                        : 0.38 + solution.order * 0.16,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={solution.href}
                  className={styles.portal}
                  aria-label={`${solution.label}. ${solution.description}`}
                  tabIndex={itemVisible && interactive ? 0 : -1}
                  onPointerDown={(event) =>
                    handlePointerDown(solution, event)
                  }
                  onPointerEnter={(event) => {
                    if (
                      event.pointerType === "mouse" &&
                      interactive &&
                      itemVisible
                    ) {
                      updateActive(solution.id);
                    }
                  }}
                  onPointerLeave={(event) => {
                    if (
                      event.pointerType === "mouse" &&
                      document.activeElement !== event.currentTarget
                    ) {
                      updateActive(null);
                    }
                  }}
                  onFocus={() => updateActive(solution.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      event.preventDefault();
                      clearActive();
                      event.currentTarget.blur();
                    }
                  }}
                  onClick={(event) => handlePortalClick(solution, event)}
                >
                  <span className={styles.node} aria-hidden="true">
                    <span />
                  </span>
                  <span className={styles.portalCopy}>
                   
                    <strong>{solution.label}</strong>
                    <span className={styles.description}>
                      {solution.description}
                    </span>
                    <span className={styles.exploreLabel}>
                      Ver mais <i aria-hidden="true"></i>
                    </span>
                  </span>
                </Link>
              </motion.div>
            </li>
          );
        })}
      </ul>

      <AnimatePresence>
        {activeSolution && visible && interactive && (
          <motion.aside
            key={activeSolution.id}
            className={styles.mobilePanel}
            aria-live="polite"
            initial={
              reducedMotion ? false : { opacity: 0, y: 24, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reducedMotion ? undefined : { opacity: 0, y: 18, scale: 0.98 }
            }
            transition={{ duration: reducedMotion ? 0 : 0.35 }}
          >
            <span className={styles.panelIndex}>
              {String(activeSolution.order + 1).padStart(2, "0")}
            </span>
            <div className={styles.panelCopy}>
              <strong>{activeSolution.label}</strong>
              <p>{activeSolution.description}</p>
            </div>
            <Link
              href={activeSolution.href}
              className={styles.panelLink}
              onClick={(event) =>
                handlePanelNavigate(activeSolution, event)
              }
            >
              Conhecer solução <span aria-hidden="true">↗</span>
            </Link>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
});
