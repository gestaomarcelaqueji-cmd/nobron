"use client";

import type { ReactNode } from "react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import { useMediaQuery } from "@/hooks/useMediaQuery";

import styles from "./SectionRise.module.css";

type SectionRiseProps = {
  children: ReactNode;
};

export function SectionRise({
  children,
}: SectionRiseProps) {
  const reduceMotion =
    Boolean(useReducedMotion());
  const isMobile = useMediaQuery(
    "(max-width: 767px)",
  );

  return (
    <motion.div
      className={styles.layer}
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0.01,
              y: isMobile ? 32 : 64,
              clipPath:
                isMobile
                  ? "inset(4% 0 0 0 round 1rem 1rem 0 0)"
                  : "inset(8% 0 0 0 round 1.2rem 1.2rem 0 0)",
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        clipPath:
          "inset(0% 0 0 0 round 0rem)",
      }}
      viewport={{
        once: true,
        amount: 0.06,
        margin:
          "0px 0px -10% 0px",
      }}
      transition={{
        duration:
          reduceMotion
            ? 0
            : isMobile
              ? 0.42
              : 0.78,
        ease: [
          0.16,
          1,
          0.3,
          1,
        ],
      }}
    >
      {children}
    </motion.div>
  );
}
