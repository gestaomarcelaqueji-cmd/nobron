"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { entryPaths } from "./solutions.data";
import styles from "./EntryPaths.module.css";

export function EntryPaths() {
  const [activeId, setActiveId] =
    useState<(typeof entryPaths)[number]["id"]>("connect");
  const reduceMotion = useReducedMotion();

  const activePath =
    entryPaths.find((path) => path.id === activeId) ?? entryPaths[0];

  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <span className={styles.eyebrow}>Não existe um pacote obrigatório</span>

        <h2 className={styles.title}>Você não precisa começar por tudo.</h2>

        <p className={styles.description}>
          Algumas empresas precisam construir a base. Outras precisam melhorar
          uma parte específica. Há também quem já possua boas peças, mas precise
          fazer tudo trabalhar junto.
        </p>
      </div>

      <div className={styles.selector}>
        <div className={styles.tabs} role="tablist" aria-label="Formas de começar">
          {entryPaths.map((path) => (
            <button
              key={path.id}
              type="button"
              role="tab"
              aria-selected={activeId === path.id}
              className={[
                styles.tab,
                activeId === path.id ? styles.tabActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setActiveId(path.id)}
            >
              <span>{path.number}</span>
              <strong>{path.title}</strong>
            </button>
          ))}
        </div>

        <div className={styles.panel}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activePath.id}
              className={styles.panelContent}
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 18,
                      filter: "blur(7px)",
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
                      y: -14,
                      filter: "blur(7px)",
                    }
              }
              transition={{
                duration: 0.38,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className={styles.panelLabel}>{activePath.title}</span>

              <h3>{activePath.headline}</h3>

              <p>{activePath.description}</p>

              <div className={styles.highlights}>
                {activePath.highlights.map((highlight, index) => (
                  <span key={highlight}>
                    <small>{String(index + 1).padStart(2, "0")}</small>
                    {highlight}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className={styles.diagram} aria-hidden="true">
            <div className={styles.diagramCore}>
              <span>NEGÓCIO</span>
            </div>

            <div
              className={`${styles.diagramRing} ${
                activeId === "start" ? styles.ringStart : ""
              }`}
            />
            <div
              className={`${styles.diagramRing} ${
                activeId === "strengthen" ? styles.ringStrengthen : ""
              }`}
            />
            <div
              className={`${styles.diagramRing} ${
                activeId === "connect" ? styles.ringConnect : ""
              }`}
            />

            <span className={`${styles.diagramNode} ${styles.nodeA}`}>Direção</span>
            <span className={`${styles.diagramNode} ${styles.nodeB}`}>Marca</span>
            <span className={`${styles.diagramNode} ${styles.nodeC}`}>Presença</span>
            <span className={`${styles.diagramNode} ${styles.nodeD}`}>Fluxo</span>
          </div>
        </div>
      </div>
    </section>
  );
}
