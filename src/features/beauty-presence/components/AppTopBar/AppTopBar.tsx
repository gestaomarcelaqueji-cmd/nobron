"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";

import type { BeautyPageData } from "../../data/beauty.types";
import styles from "./AppTopBar.module.css";

type AppTopBarProps = {
  data: BeautyPageData;
  hidden?: boolean;
  onOpenDemo?: () => void;
};

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
}

export function AppTopBar({ data, hidden = false, onOpenDemo }: AppTopBarProps) {
  const [compact, setCompact] = useState(false);
  const initials = useMemo(() => getInitials(data.brand.name), [data.brand.name]);

  useEffect(() => {
    const update = () => setCompact(window.scrollY > 34);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <motion.header
      className={`${styles.topBar} ${compact ? styles.compact : ""} ${
        hidden ? styles.hidden : ""
      }`}
      initial={false}
      animate={{ y: hidden ? -18 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      <a
        className={styles.identity}
        href="#inicio"
        aria-label={`Ir ao início de ${data.brand.name}`}
      >
        <span className={styles.monogram} aria-hidden="true">
          {initials}
        </span>

        <span className={styles.brandCopy}>
          <strong>{data.brand.name}</strong>
          <small>{data.brand.specialty}</small>
        </span>
      </a>

      {data.showDemoBadge ? (
        <button className={styles.demo} type="button" onClick={onOpenDemo}>
          <i aria-hidden="true" />
          DEMO
        </button>
      ) : null}
    </motion.header>
  );
}
