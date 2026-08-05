"use client";

import { motion, useReducedMotion } from "motion/react";

import { sitesSystemsPageData } from "@/data/solutions/sitesSystems";

import styles from "./DevelopmentDirectory.module.css";

export function DevelopmentDirectory() {
  const reduceMotion = useReducedMotion();
  const { directory } = sitesSystemsPageData;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span>{directory.eyebrow}</span>
        <h2>{directory.title}</h2>
      </div>

      <div className={styles.groups}>
        {directory.groups.map((group, groupIndex) => (
          <motion.article
            className={styles.group}
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            key={group.number}
            transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : groupIndex * 0.08 }}
            viewport={{ amount: 0.25, once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className={styles.groupHeader}>
              <span>{group.number}</span>
              <h3>{group.title}</h3>
            </div>

            <ol>
              {group.items.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item}</strong>
                </li>
              ))}
            </ol>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
