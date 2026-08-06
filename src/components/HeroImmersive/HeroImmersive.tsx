"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { HERO_IMMERSIVE } from "./heroImmersive.constants";
import type {
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

export function HeroImmersive() {
  const prefersReducedMotion = useReducedMotion();
  const [showIntro, setShowIntro] = useState(true);
  const [sceneReady, setSceneReady] = useState(false);
  const [activePortalId, setActivePortalId] =
    useState<HeroSolutionId | null>(null);
  const portalOverlayRef = useRef<SolutionMapOverlayHandle>(null);

  const {
    sectionRef,
    cameraProgress,
    sceneScale,
    sceneOpacity,
    whiteWashOpacity,
    endScreenOpacity,
    endScreenActive,
    endMapScale,
    endMapY,
    vignetteOpacity,
    scrollHintOpacity,
    mapOpacity,
    mapInScrollRange,
  } = useHeroZoomTransition();

  useEffect(() => {
    const root = document.documentElement;

    return () => {
      root.classList.remove(
        "hero-immersive-hidden-header",
        "hero-immersive-end-screen",
      );
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    const shouldShowHeader =
      Boolean(prefersReducedMotion) ||
      endScreenActive;

    root.classList.toggle(
      "hero-immersive-hidden-header",
      !shouldShowHeader,
    );

    root.classList.toggle(
      "hero-immersive-end-screen",
      shouldShowHeader,
    );
  }, [
    endScreenActive,
    prefersReducedMotion,
  ]);

  const {
    phase,
    featuredVisible,
    portalsVisible,
    interactive,
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
    if (mapInScrollRange) return;
    portalOverlayRef.current?.clearActive();
  }, [mapInScrollRange]);

  const updatePortalPositions = useCallback(
    (positions: SolutionPortalPositions) => {
      portalOverlayRef.current?.updatePositions(positions);
    },
    [],
  );

  const mapIsInteractive = interactive && mapInScrollRange;

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
              animate={{ opacity: 1, scale: 1 }}
            >
              <SolutionMapOverlay
                ref={portalOverlayRef}
                visible={portalsVisible}
                featuredVisible={featuredVisible}
                interactive={mapIsInteractive}
                activeId={activePortalId}
                onActiveChange={setActivePortalId}
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
            <motion.div
              className={styles.endMapMotion}
              style={
                prefersReducedMotion
                  ? undefined
                  : {
                      scale: endMapScale,
                      y: endMapY,
                    }
              }
            >
              <GlobalNetworkBackground />
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}