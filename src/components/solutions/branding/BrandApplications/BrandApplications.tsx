"use client";

import { useState } from "react";
import { motion } from "motion/react";

import { brandingPageData } from "@/data/solutions/branding";

import styles from "./BrandApplications.module.css";

export function BrandApplications() {
  const { applications } = brandingPageData;
  const [active, setActive] = useState(0);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.layerMeta}>
          <span>{applications.number}</span>
          <strong>{applications.label}</strong>
        </div>
        <div className={styles.heading}>
          <h2>{applications.title}</h2>
          <p>{applications.description}</p>
        </div>
      </div>

      <div className={styles.gallery}>
        <div className={styles.applicationNav}>
          {applications.items.map((item, index) => (
            <button
              className={active === index ? styles.activeNavItem : styles.navItem}
              key={item.name}
              type="button"
              onPointerEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.name}</strong>
              <small>{item.size}</small>
            </button>
          ))}
        </div>

        <div className={styles.previewStage}>
          <div className={styles.stageGrid} />
          <motion.div
            className={`${styles.preview} ${styles[applications.items[active].type]}`}
            key={applications.items[active].name}
            initial={{ opacity: 0, scale: 0.94, rotate: -1.5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.previewTop}>
              <span className={styles.previewLogo} />
              <span>02 / BRANDING</span>
            </div>
            <div className={styles.previewContent}>
              <span className={styles.previewEyebrow}>Uma base visual</span>
              <strong>{applications.items[active].name}</strong>
              <p>O formato muda. A linguagem continua conectada.</p>
              <span className={styles.previewAction}>Ver detalhes </span>
            </div>
            <div className={styles.previewArtwork}>
              <span />
              <span />
              <span />
            </div>
          </motion.div>

          <div className={styles.previewMeta}>
            <span>{applications.items[active].size}</span>
            <strong>{applications.items[active].name}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
