"use client";

import { useRef, useState } from "react";
import {
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

export function useHeroZoomTransition() {
  const sectionRef = useRef<HTMLElement>(null);
  const mapRangeRef = useRef(true);
  const [mapInScrollRange, setMapInScrollRange] = useState(true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.45,
  });

  const cameraProgress = useTransform(
    smoothProgress,
    [0, 0.12, 0.72, 0.84],
    [0, 0, 0.9, 1],
  );
  const sceneScale = useTransform(
    smoothProgress,
    [0, 0.58, 0.78, 0.88],
    [1, 1.01, 1.06, 1.1],
  );
  const sceneOpacity = useTransform(
    smoothProgress,
    [0, 0.8, 0.9],
    [1, 1, 0],
  );
  const whiteWashOpacity = useTransform(
    smoothProgress,
    [0, 0.82, 0.91, 0.96],
    [0, 0, 0.92, 1],
  );
  const endScreenOpacity = useTransform(
    smoothProgress,
    [0, 0.86, 0.93, 1],
    [0, 0, 1, 1],
  );
  const endScreenPointerEvents = useTransform(endScreenOpacity, (value) =>
    value > 0.01 ? "auto" : "none",
  );
  const endLogoOpacity = useTransform(
    smoothProgress,
    [0, 0.89, 0.95, 1],
    [0, 0, 1, 1],
  );
  const endLogoScale = useTransform(
    smoothProgress,
    [0.89, 0.95, 1],
    [0.9, 1, 1],
  );
  const endLogoY = useTransform(
    smoothProgress,
    [0.89, 0.95, 1],
    [36, 0, 0],
  );
  const vignetteOpacity = useTransform(smoothProgress, [0, 0.76, 1], [0.32, 0.12, 0]);
  const brandOpacity = useTransform(smoothProgress, [0, 0.3, 0.52], [1, 1, 0]);
  const scrollHintOpacity = useTransform(smoothProgress, [0, 0.13, 0.28], [1, 1, 0]);
  const mapOpacity = useTransform(smoothProgress, [0, 0.08, 0.22], [1, 1, 0]);
  const navOpacity = useTransform(smoothProgress, [0, 0.22, 0.42], [1, 1, 0]);

  useMotionValueEvent(smoothProgress, "change", (value) => {
    if (!sectionRef.current) return;
    sectionRef.current.style.setProperty("--hero-progress", value.toFixed(4));

    const nextMapInScrollRange = value < 0.2;
    if (mapRangeRef.current !== nextMapInScrollRange) {
      mapRangeRef.current = nextMapInScrollRange;
      setMapInScrollRange(nextMapInScrollRange);
    }
  });

  return {
    sectionRef,
    cameraProgress,
    sceneScale,
    sceneOpacity,
    whiteWashOpacity,
    endScreenOpacity,
    endScreenPointerEvents,
    endLogoOpacity,
    endLogoScale,
    endLogoY,
    vignetteOpacity,
    brandOpacity,
    scrollHintOpacity,
    mapOpacity,
    navOpacity,
    mapInScrollRange,
  };
}
