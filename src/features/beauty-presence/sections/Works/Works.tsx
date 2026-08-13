"use client";

import { Check, ChevronDown, MoveHorizontal } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import { MediaFrame } from "../../components/MediaFrame/MediaFrame";
import type { BeautyBeforeAfter, BeautyPageData, BeautyWork } from "../../data/beauty.types";
import { WORKS_EASE, WORKS_SPRING } from "./Works.motion";
import styles from "./Works.module.css";

type WorksProps = {
  data: BeautyPageData;
  preferredServiceId?: string;
  onOpenWork: (work: BeautyWork) => void;
};

type FilterValue = "all" | string;

function BeforeAfterCard({ item }: { item: BeautyBeforeAfter }) {
  const [position, setPosition] = useState(50);

  if (!item.beforeImage || !item.afterImage) return null;

  return (
    <article className={styles.beforeAfterCard}>
      <div className={styles.beforeAfterStage}>
        <MediaFrame
          className={styles.afterMedia}
          src={item.afterImage}
          alt={item.afterAlt ?? `${item.title} depois`}
          label="Depois"
        />
        <div className={styles.beforeClip} style={{ width: `${position}%` }}>
          <MediaFrame
            className={styles.beforeMedia}
            src={item.beforeImage}
            alt={item.beforeAlt ?? `${item.title} antes`}
            label="Antes"
          />
        </div>
        <div className={styles.divider} style={{ left: `${position}%` }}>
          <span><MoveHorizontal aria-hidden="true" /></span>
        </div>
        <input
          className={styles.range}
          type="range"
          min="8"
          max="92"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label={`Comparar ${item.title}`}
        />
        <span className={styles.beforeLabel}>ANTES</span>
        <span className={styles.afterLabel}>DEPOIS</span>
      </div>
      <div className={styles.beforeAfterCopy}>
        <span>ANTES / DEPOIS</span>
        <strong>{item.title}</strong>
      </div>
    </article>
  );
}

export function Works({ data, preferredServiceId, onOpenWork }: WorksProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const [filter, setFilter] = useState<FilterValue>(preferredServiceId ?? "all");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    window.addEventListener("mousedown", close);
    return () => window.removeEventListener("mousedown", close);
  }, [menuOpen]);

  const filteredWorks = useMemo(
    () => (filter === "all" ? data.works : data.works.filter((work) => work.serviceId === filter)),
    [data.works, filter],
  );

  const filterOptions = useMemo(
    () => [
      { id: "all", label: "Todos" },
      ...data.services
        .filter((service) => data.works.some((work) => work.serviceId === service.id))
        .map((service) => ({ id: service.id, label: service.shortName ?? service.name })),
    ],
    [data.services, data.works],
  );

  const activeLabel = filterOptions.find((option) => option.id === filter)?.label ?? "Todos";
  const realBeforeAfter = data.beforeAfter.filter(
    (item) => item.beforeImage && item.afterImage && (filter === "all" || item.serviceId === filter),
  );

  return (
    <section className={styles.section} id="trabalhos" aria-labelledby="works-title">
      <div className={styles.shell}>
        <header className={styles.heading}>
          <span>TRABALHOS</span>
          <h2 id="works-title">Feitos para serem vistos de perto.</h2>
          <p>{filteredWorks.length} trabalhos nesta seleção.</p>
        </header>

        <div className={styles.filterArea} ref={menuRef}>
          <button
            className={styles.filterButton}
            type="button"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span>{activeLabel.toUpperCase()}</span>
            <ChevronDown aria-hidden="true" />
          </button>

          <AnimatePresence>
            {menuOpen ? (
              <motion.div
                className={styles.filterMenu}
                initial={reduceMotion ? false : { opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.2, ease: WORKS_EASE }}
              >
                {filterOptions.map((option) => {
                  const active = option.id === filter;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        setFilter(option.id);
                        setMenuOpen(false);
                      }}
                    >
                      <span>{option.label}</span>
                      {active ? <Check aria-hidden="true" /> : null}
                    </button>
                  );
                })}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <motion.div className={styles.gallery} layout transition={WORKS_SPRING}>
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredWorks.map((work, index) => {
              const pattern = (index % 6) + 1;
              return (
                <motion.button
                  layout
                  key={work.id}
                  className={`${styles.work} ${styles[`work${pattern}`]}`}
                  type="button"
                  onClick={() => onOpenWork(work)}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.36, ease: WORKS_EASE }}
                >
                  <motion.div className={styles.workMediaShell}>
                    <MediaFrame
                      className={styles.workMedia}
                      src={work.image}
                      alt={work.alt}
                      label={work.category}
                    />
                    <span className={styles.workIndex}>{String(index + 1).padStart(2, "0")}</span>
                  </motion.div>
                  <span className={styles.workCaption}>
                    <strong>{work.category}</strong>
                    <small>{work.title}</small>
                  </span>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {realBeforeAfter.length ? (
          <div className={styles.beforeAfterList}>
            {realBeforeAfter.map((item) => <BeforeAfterCard key={item.id} item={item} />)}
          </div>
        ) : null}
      </div>
    </section>
  );
}
