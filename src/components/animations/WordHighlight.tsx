"use client";

import { motion } from "motion/react";

export function WordHighlight({ children }: { children: string }) {
  return (
    <motion.span
      className="word-highlight"
      initial={{ backgroundSize: "0% 100%" }}
      whileInView={{ backgroundSize: "100% 100%" }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  );
}
