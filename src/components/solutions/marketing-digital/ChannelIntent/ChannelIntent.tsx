"use client";

import Link from "next/link";

import { useState } from "react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import { marketingDigitalPageData } from "@/data/solutions/marketingDigital";

import styles from "./ChannelIntent.module.css";

export function ChannelIntent() {
  const reduceMotion =
    Boolean(useReducedMotion());

  const { channels } =
    marketingDigitalPageData;

  const [activeId, setActiveId] =
    useState(
      channels.tabs[0].id,
    );

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header
          className={
            styles.heading
          }
        >
          <span>
            {channels.eyebrow}
          </span>

          <h2>
            {channels.title}
          </h2>

          <p>
            {channels.description}
          </p>
        </header>

        <div
          className={
            styles.channelSwitcher
          }
        >
          <div
            className={styles.tabs}
            role="tablist"
            aria-label="Comparar canais"
          >
            {channels.tabs.map(
              (tab) => {
                const isActive =
                  activeId ===
                  tab.id;

                return (
                  <button
                    aria-controls={`channel-panel-${tab.id}`}
                    aria-selected={
                      isActive
                    }
                    className={
                      styles.tab
                    }
                    id={`channel-tab-${tab.id}`}
                    key={tab.id}
                    onClick={() =>
                      setActiveId(
                        tab.id,
                      )
                    }
                    role="tab"
                    type="button"
                  >
                    {tab.label}
                  </button>
                );
              },
            )}
          </div>

          <div
            className={
              styles.panel
            }
          >
            {channels.tabs.map(
              (tab) => {
                const isActive =
                  activeId ===
                  tab.id;

                return (
                  <motion.div
                    aria-labelledby={`channel-tab-${tab.id}`}
                    id={`channel-panel-${tab.id}`}
                    key={tab.id}
                    role="tabpanel"
                    hidden={
                      !isActive
                    }
                    initial={
                      reduceMotion
                        ? false
                        : {
                            opacity:
                              0,
                            y: 24,
                          }
                    }
                    animate={
                      isActive
                        ? {
                            opacity:
                              1,
                            y: 0,
                          }
                        : undefined
                    }
                    transition={{
                      duration:
                        reduceMotion
                          ? 0
                          : 0.5,
                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                  >
                    <span
                      className={
                        styles.channelLabel
                      }
                    >
                      {tab.label}
                    </span>

                    <h3>
                      {tab.title}
                    </h3>

                    <p>
                      {
                        tab.description
                      }
                    </p>

                    <ul>
                      {tab.points.map(
                        (point) => (
                          <li
                            key={
                              point
                            }
                          >
                            {point}
                          </li>
                        ),
                      )}
                    </ul>

                    {tab.relatedPage ? (
                      <p>
                        {
                          tab.relatedPage
                            .prefix
                        }{" "}

                        <Link
                          className="contextual-link"
                          href={
                            tab.relatedPage
                              .href
                          }
                        >
                          {
                            tab.relatedPage
                              .label
                          }
                        </Link>
                        .
                      </p>
                    ) : null}
                  </motion.div>
                );
              },
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
