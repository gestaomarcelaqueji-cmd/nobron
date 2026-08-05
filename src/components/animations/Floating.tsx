"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

export function Floating({
  children,
  delay = 0,
  distance = 10,
  duration = 4.5,
  className,
}: {
  children: ReactNode;
  delay?: number;
  distance?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -distance, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
