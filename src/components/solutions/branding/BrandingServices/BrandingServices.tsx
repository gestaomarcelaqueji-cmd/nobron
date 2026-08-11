"use client";

import Link from "next/link";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type WheelEvent,
} from "react";

import { useReducedMotion } from "motion/react";

import { brandingPageData } from "@/data/solutions/branding";

import { ServiceCategory } from "./ServiceCategory";
import { ServiceList } from "./ServiceList";

import styles from "./BrandingServices.module.css";

const shortCategoryNames: Record<string, string> = {
  identity: "Marca",
  social: "Social",
  campaigns: "Campanha",
  commercial: "Comercial",
  whatsapp: "Contato",
  web: "Digital",
  events: "Evento",
  content: "Conteúdo",
};

type ArcSlot = {
  x: number;
  y: number;
  opacity: number;
  scale: number;
};

const ARC_SLOTS: Record<number, ArcSlot> = {
  [-4]: {
    x: 18,
    y: -3,
    opacity: 0.08,
    scale: 0.74,
  },

  [-3]: {
    x: 26,
    y: 9,
    opacity: 0.18,
    scale: 0.8,
  },

  [-2]: {
    x: 39,
    y: 23,
    opacity: 0.3,
    scale: 0.86,
  },

  [-1]: {
    x: 53,
    y: 39,
    opacity: 0.5,
    scale: 0.94,
  },

  [0]: {
    x: 68,
    y: 54,
    opacity: 1,
    scale: 1.08,
  },

  [1]: {
    x: 63,
    y: 69,
    opacity: 0.5,
    scale: 0.94,
  },

  [2]: {
    x: 51,
    y: 82,
    opacity: 0.3,
    scale: 0.86,
  },

  [3]: {
    x: 33,
    y: 88,
    opacity: 0.18,
    scale: 0.8,
  },
};

function wrapIndex(
  index: number,
  total: number,
) {
  return (
    ((index % total) + total) %
    total
  );
}

function getCircularOffset(
  index: number,
  activeIndex: number,
  total: number,
) {
  let difference =
    index - activeIndex;

  if (
    difference >
    total / 2
  ) {
    difference -= total;
  }

  if (
    difference <=
    -total / 2
  ) {
    difference += total;
  }

  return difference;
}

export function BrandingServices() {
  const reduceMotion =
    Boolean(useReducedMotion());

  const wheelLockedRef =
    useRef(false);

  const { services } =
    brandingPageData;

  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0);

  const [
    isPaused,
    setIsPaused,
  ] = useState(false);

  const totalCategories =
    services.categories.length;

  const activeCategoryId =
    services.categories[
      activeIndex
    ]?.id ??
    services.categories[0]
      ?.id ??
    "";

  const positionedCategories =
    useMemo(() => {
      return services.categories.map(
        (
          category,
          index,
        ) => {
          const offset =
            getCircularOffset(
              index,
              activeIndex,
              totalCategories,
            );

          const slot =
            ARC_SLOTS[
              offset
            ] ??
            ARC_SLOTS[3];

          return {
            category,
            index,
            distance:
              Math.abs(offset),
            ...slot,
          };
        },
      );
    }, [
      activeIndex,
      services.categories,
      totalCategories,
    ]);

  useEffect(() => {
    if (
      reduceMotion ||
      isPaused ||
      totalCategories <= 1
    ) {
      return;
    }

    const interval =
      window.setInterval(
        () => {
          setActiveIndex(
            (current) =>
              wrapIndex(
                current + 1,
                totalCategories,
              ),
          );
        },
        4200,
      );

    return () => {
      window.clearInterval(
        interval,
      );
    };
  }, [
    isPaused,
    reduceMotion,
    totalCategories,
  ]);

  function selectCategory(
    index: number,
  ) {
    setActiveIndex(
      wrapIndex(
        index,
        totalCategories,
      ),
    );
  }

  function handleWheel(
    event: WheelEvent<HTMLDivElement>,
  ) {
    if (
      wheelLockedRef.current ||
      Math.abs(
        event.deltaY,
      ) < 8
    ) {
      return;
    }

    event.preventDefault();

    wheelLockedRef.current =
      true;

    setIsPaused(true);

    if (
      event.deltaY > 0
    ) {
      selectCategory(
        activeIndex + 1,
      );
    } else {
      selectCategory(
        activeIndex - 1,
      );
    }

    window.setTimeout(
      () => {
        wheelLockedRef.current =
          false;
      },
      520,
    );
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLDivElement>,
  ) {
    if (
      event.key ===
        "ArrowDown" ||
      event.key ===
        "ArrowRight"
    ) {
      event.preventDefault();

      selectCategory(
        activeIndex + 1,
      );
    }

    if (
      event.key ===
        "ArrowUp" ||
      event.key ===
        "ArrowLeft"
    ) {
      event.preventDefault();

      selectCategory(
        activeIndex - 1,
      );
    }

    if (
      event.key === "Home"
    ) {
      event.preventDefault();

      selectCategory(0);
    }

    if (
      event.key === "End"
    ) {
      event.preventDefault();

      selectCategory(
        totalCategories - 1,
      );
    }
  }

  return (
    <section
      className={
        styles.section
      }
      id="branding-servicos"
    >
      <div
        className={
          styles.header
        }
      >
        <span>
          {services.eyebrow}
        </span>

        <h2>
          {services.title}
        </h2>

        <p>
          {services.description}
        </p>
      </div>

      <div
        className={
          styles.experience
        }
        onFocusCapture={() =>
          setIsPaused(true)
        }
        onMouseEnter={() =>
          setIsPaused(true)
        }
        onMouseLeave={() =>
          setIsPaused(false)
        }
      >
        <div
          className={
            styles.categorySide
          }
        >
          <div
            aria-label="Categorias de Branding e Design"
            className={
              styles.categoryArc
            }
            onKeyDown={
              handleKeyDown
            }
            onWheel={
              handleWheel
            }
            role="listbox"
            tabIndex={0}
          >
            {positionedCategories.map(
              ({
                category,
                index,
                distance,
                x,
                y,
                opacity,
                scale,
              }) => (
                <ServiceCategory
                  active={
                    index ===
                    activeIndex
                  }
                  category={
                    category
                  }
                  distance={
                    distance
                  }
                  key={
                    category.id
                  }
                  label={
                    shortCategoryNames[
                      category.id
                    ] ??
                    category.title
                  }
                  onSelect={() => {
                    setIsPaused(
                      true,
                    );

                    selectCategory(
                      index,
                    );
                  }}
                  opacity={
                    opacity
                  }
                  scale={
                    scale
                  }
                  x={x}
                  y={y}
                />
              ),
            )}
          </div>

          <div
            className={
              styles.categoryProgress
            }
          >
            <span>
              {String(
                activeIndex + 1,
              ).padStart(
                2,
                "0",
              )}
            </span>

            <div>
              {services.categories.map(
                (
                  category,
                  index,
                ) => (
                  <span
                    className={
                      index ===
                      activeIndex
                        ? styles.activeProgress
                        : undefined
                    }
                    key={
                      category.id
                    }
                  />
                ),
              )}
            </div>

            <span>
              {String(
                totalCategories,
              ).padStart(
                2,
                "0",
              )}
            </span>
          </div>
        </div>

        <ServiceList
          activeCategoryId={
            activeCategoryId
          }
          categories={
            services.categories
          }
        />
      </div>

      <p
        className={
          styles.webNote
        }
      >
        Nos itens de sites e páginas,
        esta categoria cobre a direção
        visual. O desenvolvimento entra
        em{" "}
        <Link
          className="contextual-link"
          href="/solucoes/sites-sistemas"
        >
          Sites e Sistemas
        </Link>
        .
      </p>
    </section>
  );
}