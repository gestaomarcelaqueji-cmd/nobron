"use client";

import { motion } from "motion/react";

import type { BrandingServiceCategory } from "@/data/solutions/branding";

import styles from "./BrandingServices.module.css";

type ServiceCategoryProps = {
  category: BrandingServiceCategory;
  label: string;
  active: boolean;
  distance: number;
  x: number;
  y: number;
  opacity: number;
  scale: number;
  onSelect: () => void;
};

export function ServiceCategory({
  category,
  label,
  active,
  distance,
  x,
  y,
  opacity,
  scale,
  onSelect,
}: ServiceCategoryProps) {
  return (
    <motion.div
      animate={{
        left: `${x}%`,
        top: `${y}%`,
        opacity,
      }}
      className={styles.categoryPosition}
      style={{
        zIndex: Math.max(1, 20 - distance),
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.button
        aria-label={category.title}
        aria-selected={active}
        animate={{
          scale,
        }}
        className={styles.categoryLabel}
        data-active={active}
        onClick={onSelect}
        onFocus={onSelect}
        onPointerEnter={onSelect}
        role="option"
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        type="button"
      >
        {label}
      </motion.button>
    </motion.div>
  );
}