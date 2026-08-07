"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function MotionProvider({ children }: { children: ReactNode }) {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <MotionConfig
      reducedMotion="user"
      transition={{
        duration: isMobile ? 0.36 : 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionConfig>
  );
}
