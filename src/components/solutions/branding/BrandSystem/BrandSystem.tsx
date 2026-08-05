"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { brandingPageData } from "@/data/solutions/branding";

import styles from "./BrandSystem.module.css";

type LayoutId = "post" | "proposal" | "banner" | "page";

const moduleClasses: Record<LayoutId, string[]> = {
  post: ["logo", "title", "text", "image", "button", "seal", "icon", "pattern"],
  proposal: ["proposalLogo", "proposalTitle", "proposalText", "proposalImage", "proposalButton", "proposalSeal", "proposalIcon", "proposalPattern"],
  banner: ["bannerLogo", "bannerTitle", "bannerText", "bannerImage", "bannerButton", "bannerSeal", "bannerIcon", "bannerPattern"],
  page: ["pageLogo", "pageTitle", "pageText", "pageImage", "pageButton", "pageSeal", "pageIcon", "pagePattern"],
};

export function BrandSystem() {
  const reduceMotion = useReducedMotion();
  const { system } = brandingPageData;
  const [activeLayout, setActiveLayout] = useState<LayoutId>("post");
  const [paused, setPaused] = useState(false);

  const activeIndex = useMemo(
    () => system.layouts.findIndex((layout) => layout.id === activeLayout),
    [activeLayout, system.layouts],
  );

  useEffect(() => {
    if (paused || reduceMotion) return;
    const timer = window.setInterval(() => {
      const next = system.layouts[(activeIndex + 1) % system.layouts.length];
      setActiveLayout(next.id as LayoutId);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [activeIndex, paused, reduceMotion, system.layouts]);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.layerMeta}>
          <span>{system.number}</span>
          <strong>{system.label}</strong>
        </div>
        <div className={styles.heading}>
          <h2>{system.title}</h2>
          <p>{system.description}</p>
        </div>
      </div>

      <div
        className={styles.stage}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
      >
        <div className={styles.stageHeader}>
          <span>SYSTEM COMPOSER</span>
          <div className={styles.layoutTabs}>
            {system.layouts.map((layout) => (
              <button
                className={activeLayout === layout.id ? styles.activeTab : styles.tab}
                key={layout.id}
                type="button"
                onClick={() => setActiveLayout(layout.id as LayoutId)}
              >
                {layout.label}
              </button>
            ))}
          </div>
        </div>

        <div className={`${styles.canvas} ${styles[activeLayout]}`}>
          <div className={styles.grid} aria-hidden="true" />
          {system.modules.map((module, index) => (
            <motion.div
              layout
              className={`${styles.module} ${styles[moduleClasses[activeLayout][index]]}`}
              key={module}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
            >
              {module === "Logo" ? (
                <span className={styles.miniWordmark} aria-label="Logotipo noBRon" />
              ) : module === "Imagem" ? (
                <span className={styles.imageShape} aria-hidden="true" />
              ) : module === "Padrão" ? (
                <span className={styles.patternShape} aria-hidden="true" />
              ) : (
                <span>{module}</span>
              )}
            </motion.div>
          ))}

          <AnimatePresence mode="wait">
            <motion.span
              className={styles.layoutLabel}
              key={activeLayout}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {system.layouts[activeIndex]?.label}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className={styles.moduleLegend}>
          {system.modules.map((module, index) => (
            <span key={module}>
              <i>{String(index + 1).padStart(2, "0")}</i>
              {module}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
