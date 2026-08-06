"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";

import { HERO_IMMERSIVE } from "./heroImmersive.constants";
import { HERO_SOLUTIONS } from "./heroImmersive.data";
import type {
  HeroSolution,
  HeroSolutionId,
  SolutionMapOverlayHandle,
  SolutionPortalPositions,
} from "./heroImmersive.types";
import styles from "./HeroImmersive.module.css";
import { GlobalNetworkBackground } from "./GlobalNetworkBackground";
import { SolutionMapOverlay } from "./SolutionMapOverlay";
import { useHeroSequence } from "./useHeroSequence";
import { useHeroZoomTransition } from "./useHeroZoomTransition";

const NeuralScene = dynamic(
  () => import("./NeuralScene").then((module) => module.NeuralScene),
  {
    ssr: false,
    loading: () => <div className={styles.scene} aria-hidden="true" />,
  },
);

function isModifiedNavigation(event: ReactMouseEvent<HTMLAnchorElement>) {
  return (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  );
}

export function HeroImmersive() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const [showIntro, setShowIntro] = useState(true);
  const [sceneReady, setSceneReady] = useState(false);
  const [activePortalId, setActivePortalId] =
    useState<HeroSolutionId | null>(null);
  const [selectedPortalId, setSelectedPortalId] =
    useState<HeroSolutionId | null>(null);
  const [pendingRoute, setPendingRoute] = useState<{
    href: string;
    label: string;
  } | null>(null);
  const portalOverlayRef = useRef<SolutionMapOverlayHandle>(null);
  const navigationTimerRef = useRef<number | null>(null);

  const {
    sectionRef,
    cameraProgress,
    sceneScale,
    sceneOpacity,
    whiteWashOpacity,
    endScreenOpacity,
    vignetteOpacity,
    scrollHintOpacity,
    mapOpacity,
    mapInScrollRange,
  } = useHeroZoomTransition();

  // Add a global class to hide the floating header while the hero is active.
  useEffect(() => {
    const className = "hero-immersive-hidden-header";
    document.documentElement.classList.add(className);

    return () => {
      document.documentElement.classList.remove(className);
    };
  }, []);

  const {
    phase,
    featuredVisible,
    portalsVisible,
    interactive,
    routeExiting,
    skipToInteractive,
    startRouteExit,
  } = useHeroSequence({
    enabled: sceneReady,
    reducedMotion: prefersReducedMotion,
  });

  useEffect(() => {
    const revealScene = () => {
      setSceneReady(true);
      setShowIntro(false);
    };

    const timer = window.setTimeout(
      revealScene,
      prefersReducedMotion || window.scrollY > 0
        ? 0
        : HERO_IMMERSIVE.introHoldMs,
    );

    const revealOnKey = (event: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", "End", " "].includes(event.key)) {
        revealScene();
      }
    };

    window.addEventListener("wheel", revealScene, { passive: true, once: true });
    window.addEventListener("touchmove", revealScene, {
      passive: true,
      once: true,
    });
    window.addEventListener("keydown", revealOnKey);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("wheel", revealScene);
      window.removeEventListener("touchmove", revealScene);
      window.removeEventListener("keydown", revealOnKey);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    return () => {
      if (navigationTimerRef.current !== null) {
        window.clearTimeout(navigationTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!interactive) return;

    HERO_SOLUTIONS.forEach((solution) => router.prefetch(solution.href));
    router.prefetch("/prototipo-gratuito");
  }, [interactive, router]);

  useEffect(() => {
    if (mapInScrollRange) return;

    portalOverlayRef.current?.clearActive();
  }, [mapInScrollRange]);

  const updatePortalPositions = useCallback(
    (positions: SolutionPortalPositions) => {
      portalOverlayRef.current?.updatePositions(positions);
    },
    [],
  );

  const beginNavigation = useCallback(
    (
      href: string,
      label: string,
      event: ReactMouseEvent<HTMLAnchorElement>,
      portalId: HeroSolutionId | null = null,
    ) => {
      if (isModifiedNavigation(event)) return;

      if (href.startsWith("#") || href === "/") {
        event.preventDefault();
        skipToInteractive();
        setActivePortalId(null);
        portalOverlayRef.current?.clearActive();
        window.scrollTo({
          top: sectionRef.current?.offsetTop ?? 0,
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
        return;
      }

      event.preventDefault();
      if (pendingRoute) return;

      router.prefetch(href);
      setPendingRoute({ href, label });
      setSelectedPortalId(portalId);
      setActivePortalId(portalId);
      startRouteExit();

      navigationTimerRef.current = window.setTimeout(
        () => router.push(href),
        prefersReducedMotion ? 80 : 1_050,
      );
    },
    [
      pendingRoute,
      prefersReducedMotion,
      router,
      sectionRef,
      skipToInteractive,
      startRouteExit,
    ],
  );

  const handleSolutionNavigation = useCallback(
    (
      solution: HeroSolution,
      event: ReactMouseEvent<HTMLAnchorElement>,
    ) => {
      beginNavigation(
        solution.href,
        solution.label,
        event,
        solution.id,
      );
    },
    [beginNavigation],
  );

  const mapIsInteractive =
    interactive && mapInScrollRange && !routeExiting && !pendingRoute;

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-label="Apresentação da noBRon"
    >
      <h1 className={styles.visuallyHidden}>
        Feito no Brasil. Online no mundo.
      </h1>

      <div className={styles.sticky}>
        <AnimatePresence>
          {showIntro && (
            <motion.div
              className={styles.intro}
              aria-hidden="true"
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1 }}
              exit={
                prefersReducedMotion
                  ? undefined
                  : {
                      opacity: 0,
                      scale: 1.025,
                      transition: {
                        opacity: {
                          duration: 1.25,
                          ease: [0.22, 1, 0.36, 1],
                        },
                        scale: {
                          duration: 1.35,
                          ease: [0.16, 1, 0.3, 1],
                        },
                      },
                    }
              }
              transition={{
                opacity: {
                  duration: 0.75,
                  ease: [0.22, 1, 0.36, 1],
                },
                scale: { duration: 1.35, ease: [0.16, 1, 0.3, 1] },
              }}
            >
              <div className={styles.introCopy}>
                <div className={styles.lineMask}>
                  <motion.span
                    className={styles.introLine}
                    initial={
                      prefersReducedMotion
                        ? false
                        : { y: "72%", opacity: 0, filter: "blur(14px)" }
                    }
                    animate={
                      prefersReducedMotion
                        ? undefined
                        : { y: "0%", opacity: 1, filter: "blur(0px)" }
                    }
                    exit={
                      prefersReducedMotion
                        ? undefined
                        : {
                            y: "-12%",
                            opacity: 0,
                            filter: "blur(12px)",
                            transition: {
                              duration: 0.95,
                              delay: 0.02,
                              ease: [0.4, 0, 0.2, 1],
                            },
                          }
                    }
                    transition={{
                      duration: 1.35,
                      delay: 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    Feito no Brasil.
                  </motion.span>
                </div>

                <div className={styles.lineMask}>
                  <motion.span
                    className={`${styles.introLine} ${styles.introLineSecond}`}
                    initial={
                      prefersReducedMotion
                        ? false
                        : { y: "72%", opacity: 0, filter: "blur(14px)" }
                    }
                    animate={
                      prefersReducedMotion
                        ? undefined
                        : { y: "0%", opacity: 1, filter: "blur(0px)" }
                    }
                    exit={
                      prefersReducedMotion
                        ? undefined
                        : {
                            y: "-12%",
                            opacity: 0,
                            filter: "blur(12px)",
                            transition: {
                              duration: 1,
                              delay: 0.1,
                              ease: [0.4, 0, 0.2, 1],
                            },
                          }
                    }
                    transition={{
                      duration: 1.4,
                      delay: 0.28,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    Online no mundo.
                  </motion.span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className={styles.sceneReveal}
          initial={false}
          animate={{ opacity: sceneReady ? 1 : 0 }}
          transition={{ duration: 1.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ pointerEvents: sceneReady ? "auto" : "none" }}
          aria-hidden={!sceneReady}
        >
          <motion.div
            className={styles.sceneLayer}
            style={
              prefersReducedMotion
                ? undefined
                : {
                    scale: sceneScale,
                    opacity: sceneOpacity,
                  }
            }
          >
            <div className={styles.sceneScale}>
              {prefersReducedMotion ? (
                <div className={styles.reducedScene} aria-hidden="true" />
              ) : (
                <NeuralScene
                  cameraProgress={cameraProgress}
                  phase={phase}
                  activePortalId={activePortalId}
                  selectedPortalId={selectedPortalId}
                  onPortalPositions={updatePortalPositions}
                />
              )}
            </div>
          </motion.div>

          <motion.div
            className={styles.vignette}
            style={prefersReducedMotion ? undefined : { opacity: vignetteOpacity }}
            aria-hidden="true"
          />

          <motion.div
            className={styles.mapLayer}
            style={prefersReducedMotion ? undefined : { opacity: mapOpacity }}
          >
            <motion.div
              className={styles.mapExitLayer}
              initial={false}
              animate={{
                opacity: routeExiting ? 0 : 1,
                scale: routeExiting ? 1.04 : 1,
              }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <SolutionMapOverlay
                ref={portalOverlayRef}
                visible={portalsVisible}
                featuredVisible={featuredVisible}
                interactive={mapIsInteractive}
                activeId={activePortalId}
                onActiveChange={setActivePortalId}
                onNavigateStart={handleSolutionNavigation}
              />
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.scrollHint}
            style={prefersReducedMotion ? undefined : { opacity: scrollHintOpacity }}
            aria-hidden="true"
          >
            <span className={styles.scrollDot} />
          </motion.div>

          {!prefersReducedMotion && <div className={styles.exitLight} aria-hidden="true" />}

          <motion.div
            className={styles.whiteWash}
            style={prefersReducedMotion ? { opacity: 0 } : { opacity: whiteWashOpacity }}
            aria-hidden="true"
          />

          <motion.div
            className={styles.endScreen}
            style={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: endScreenOpacity }
            }
            aria-hidden="true"
          >
            <GlobalNetworkBackground />
          </motion.div>

          <AnimatePresence>
            {pendingRoute && (
              <motion.div
                className={styles.routeTransition}
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        clipPath: "circle(0% at 50% 50%)",
                      }
                }
                animate={{
                  opacity: 1,
                  clipPath: "circle(145% at 50% 50%)",
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0.06 : 0.95,
                  ease: [0.76, 0, 0.24, 1],
                }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
