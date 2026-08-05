"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";

import { solutionCategories } from "./solutions.data";
import styles from "./StructureStory.module.css";

const iconPaths = {
  strategy: "M5 15 15 5M8 5h7v7M5 5h1M5 9h4M5 13h2",
  branding: "M5 15c2-5 4-8 10-10M5 15h10M8 12l4-4M7 6h2M12 13h3",
  web: "M4 5h12v10H4zM4 8h12M7 6.5h.1M9 6.5h.1",
  seo: "M9 4a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm4 9 3 3",
  marketing: "M4 13V9l8-4v12l-8-4Zm8-5h2a2 2 0 0 1 0 4h-2M6 14l1 3",
  automation: "M6 5h8v4H6zM6 11h8v4H6zM3 7h3M14 13h3M4 4 2 7l2 3M16 10l2 3-2 3",
};

export function StructureStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const nextIndex = Math.min(
      solutionCategories.length - 1,
      Math.floor(progress * solutionCategories.length),
    );

    setActiveIndex(nextIndex);
  });

  const activeCategory = solutionCategories[activeIndex];

  function scrollToCategory(index: number) {
    if (!sectionRef.current) {
      return;
    }

    const sectionTop =
      sectionRef.current.getBoundingClientRect().top + window.scrollY;
    const scrollableHeight =
      sectionRef.current.offsetHeight - window.innerHeight;
    const progress =
      index / Math.max(1, solutionCategories.length - 1);

    window.scrollTo({
      top: sectionTop + scrollableHeight * progress,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  return (
    <section id="estrutura" ref={sectionRef} className={styles.section}>
      <div className={styles.sticky}>
        <div className={styles.topbar}>
          <span>A estrutura de uma boa empresa</span>
          <span>
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(solutionCategories.length).padStart(2, "0")}
          </span>
        </div>

        <div className={styles.layout}>
          <div className={styles.copy}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 24,
                        filter: "blur(8px)",
                      }
                }
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                      }
                }
                exit={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 0,
                        y: -18,
                        filter: "blur(8px)",
                      }
                }
                transition={{
                  duration: 0.48,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className={styles.eyebrow}>
                  {activeCategory.order} · {activeCategory.eyebrow}
                </span>

                <h2 className={styles.title}>{activeCategory.headline}</h2>

                <p className={styles.description}>
                  {activeCategory.description}
                </p>

                <div className={styles.servicesPreview}>
                  {activeCategory.services.slice(0, 4).map((service) => (
                    <span key={service}>{service}</span>
                  ))}
                </div>

                <Link href={activeCategory.href} className={styles.link}>
                  Conhecer {activeCategory.title}
                  <span aria-hidden="true">↗</span>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className={styles.visual}>
            <div className={styles.visualGrid} />

            <div className={styles.core}>
              <span className={styles.coreLabel}>EMPRESA</span>
              <strong>{activeCategory.visualWord}</strong>
            </div>

            <div className={styles.layers}>
              {solutionCategories.map((category, index) => {
                const isActive = index === activeIndex;
                const isBuilt = index <= activeIndex;

                return (
                  <div
                    key={category.id}
                    className={[
                      styles.layer,
                      isBuilt ? styles.layerBuilt : "",
                      isActive ? styles.layerActive : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    style={
                      {
                        "--layer-index": index,
                      } as CSSProperties
                    }
                  >
                    <span className={styles.layerOrder}>{category.order}</span>

                    <span className={styles.layerIcon}>
                      <svg viewBox="0 0 20 20" aria-hidden="true">
                        <path d={iconPaths[category.id]} />
                      </svg>
                    </span>

                    <span className={styles.layerTitle}>{category.title}</span>

                    <span className={styles.layerState}>
                      {isActive ? "agora" : isBuilt ? "conectado" : "próximo"}
                    </span>
                  </div>
                );
              })}
            </div>

            <svg
              className={styles.connectionWeb}
              viewBox="0 0 640 640"
              aria-hidden="true"
            >
              {solutionCategories.map((category, index) => {
                const angle =
                  (Math.PI * 2 * index) / solutionCategories.length -
                  Math.PI / 2;
                const radius = 220;
                const x = 320 + Math.cos(angle) * radius;
                const y = 320 + Math.sin(angle) * radius;

                return (
                  <line
                    key={category.id}
                    x1="320"
                    y1="320"
                    x2={x}
                    y2={y}
                    className={index <= activeIndex ? styles.lineBuilt : ""}
                  />
                );
              })}
            </svg>
          </div>
        </div>

        <div className={styles.progress}>
          {solutionCategories.map((category, index) => (
            <button
              key={category.id}
              type="button"
              className={[
                styles.progressItem,
                index === activeIndex ? styles.progressItemActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => scrollToCategory(index)}
              aria-label={`Ir para ${category.title}`}
            >
              <span>{category.order}</span>
              <span>{category.title}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
