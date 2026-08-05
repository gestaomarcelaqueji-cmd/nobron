"use client";

import { useState } from "react";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { marketingDigitalPageData } from "@/data/solutions/marketingDigital";

import styles from "./ChannelIntent.module.css";

export function ChannelIntent() {
  const reduceMotion = Boolean(useReducedMotion());
  const { channels } = marketingDigitalPageData;
  const [activeId, setActiveId] = useState(channels.tabs[0].id);
  const activeTab = channels.tabs.find((tab) => tab.id === activeId) ?? channels.tabs[0];

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.heading}>
          <span>{channels.eyebrow}</span>
          <h2>{channels.title}</h2>
          <p>{channels.description}</p>
        </header>

        <div className={styles.channelSwitcher}>
          <div className={styles.tabs} role="tablist" aria-label="Comparar canais">
            {channels.tabs.map((tab) => (
              <button
                aria-selected={activeId === tab.id}
                className={styles.tab}
                id={`channel-tab-${tab.id}`}
                key={tab.id}
                onClick={() => setActiveId(tab.id)}
                role="tab"
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div
            aria-labelledby={`channel-tab-${activeTab.id}`}
            className={styles.panel}
            role="tabpanel"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -16 }}
                transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className={styles.channelLabel}>{activeTab.label}</span>
                <h3>{activeTab.title}</h3>
                <p>{activeTab.description}</p>

                <ul>
                  {activeTab.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
