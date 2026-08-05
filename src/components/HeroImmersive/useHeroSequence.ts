"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { HERO_PHASE_DELAYS, HERO_PHASE_ORDER } from "./heroImmersive.data";
import type { HeroPhase } from "./heroImmersive.types";

type UseHeroSequenceOptions = {
  /** Inicia a formação da rede. Normalmente acompanha `sceneReady`. */
  enabled: boolean;
  /** Pula a coreografia, mas preserva toda a navegação acessível. */
  reducedMotion?: boolean | null;
  onPhaseChange?: (phase: HeroPhase) => void;
};

export function useHeroSequence({
  enabled,
  reducedMotion = false,
  onPhaseChange,
}: UseHeroSequenceOptions) {
  const [phase, setPhaseState] = useState<HeroPhase>("intro");

  const setPhase = useCallback(
    (nextPhase: HeroPhase) => {
      setPhaseState((currentPhase) => {
        if (nextPhase === "intro") return nextPhase;

        const currentIndex = HERO_PHASE_ORDER.indexOf(currentPhase);
        const nextIndex = HERO_PHASE_ORDER.indexOf(nextPhase);
        return nextIndex >= currentIndex ? nextPhase : currentPhase;
      });
      onPhaseChange?.(nextPhase);
    },
    [onPhaseChange],
  );

  useEffect(() => {
    const timers: number[] = [];

    if (!enabled) {
      timers.push(window.setTimeout(() => setPhase("intro"), 0));
      return () => timers.forEach((timer) => window.clearTimeout(timer));
    }

    if (reducedMotion) {
      timers.push(window.setTimeout(() => setPhase("interactive"), 0));
      return () => timers.forEach((timer) => window.clearTimeout(timer));
    }

    (
      Object.entries(HERO_PHASE_DELAYS) as Array<
        [Exclude<HeroPhase, "intro" | "route-exit">, number]
      >
    ).forEach(([nextPhase, delay]) => {
      timers.push(window.setTimeout(() => setPhase(nextPhase), delay));
    });

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [enabled, reducedMotion, setPhase]);

  const phaseIndex = HERO_PHASE_ORDER.indexOf(phase);
  const reaches = useCallback(
    (target: HeroPhase) => phaseIndex >= HERO_PHASE_ORDER.indexOf(target),
    [phaseIndex],
  );

  return useMemo(
    () => ({
      phase,
      phaseIndex,
      pointsVisible: reaches("network-points"),
      connectionsVisible: reaches("network-connections"),
      networkReady: reaches("observing"),
      featuredVisible: reaches("portals"),
      portalsVisible: reaches("portals"),
      interactive: phase === "interactive",
      routeExiting: phase === "route-exit",
      skipToInteractive: () => setPhase("interactive"),
      startRouteExit: () => setPhase("route-exit"),
    }),
    [phase, phaseIndex, reaches, setPhase],
  );
}
