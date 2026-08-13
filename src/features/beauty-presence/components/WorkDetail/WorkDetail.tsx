"use client";

import { ArrowLeft, ArrowRight, CalendarDays, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

import type { BeautyWork } from "../../data/beauty.types";
import { MediaFrame } from "../MediaFrame/MediaFrame";
import styles from "./WorkDetail.module.css";

type WorkDetailProps = {
  work: BeautyWork | null;
  works: BeautyWork[];
  onClose: () => void;
  onNavigate: (work: BeautyWork) => void;
  onBookWork: (work: BeautyWork) => void;
};

export function WorkDetail({ work, works, onClose, onNavigate, onBookWork }: WorkDetailProps) {
  const index = work ? works.findIndex((item) => item.id === work.id) : -1;

  useEffect(() => {
    if (!work) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft" && index > 0) onNavigate(works[index - 1]);
      if (event.key === "ArrowRight" && index >= 0 && index < works.length - 1) onNavigate(works[index + 1]);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [index, onClose, onNavigate, work, works]);

  if (!work) return null;

  const previous = index > 0 ? works[index - 1] : null;
  const next = index >= 0 && index < works.length - 1 ? works[index + 1] : null;

  return (
    <motion.div
      className={styles.backdrop}
      role="presentation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={onClose}
    >
      <motion.article
        className={styles.detail}
        role="dialog"
        aria-modal="true"
        aria-labelledby="work-detail-title"
        onMouseDown={(event) => event.stopPropagation()}
        initial={{ y: 26, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 18, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.topActions}>
          <button type="button" onClick={onClose} aria-label="Fechar trabalho">
            <X aria-hidden="true" />
          </button>
          <span>{String(index + 1).padStart(2, "0")} / {String(works.length).padStart(2, "0")}</span>
        </div>

        <motion.div
          className={styles.mediaShell}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.16}
          onDragEnd={(_, info) => {
            if (info.offset.x < -80 && next) onNavigate(next);
            if (info.offset.x > 80 && previous) onNavigate(previous);
          }}
        >
          <MediaFrame
            className={styles.media}
            src={work.image}
            alt={work.alt}
            label={work.category}
          />
        </motion.div>

        <div className={styles.copy}>
          <span className={styles.category}>{work.category}</span>
          <h2 id="work-detail-title">{work.title}</h2>
          {work.description ? <p>{work.description}</p> : null}

          <button className={styles.book} type="button" onClick={() => onBookWork(work)}>
            <CalendarDays aria-hidden="true" />
            Quero algo assim
            <ArrowRight aria-hidden="true" />
          </button>
        </div>

        <div className={styles.navigation}>
          <button type="button" onClick={() => previous && onNavigate(previous)} disabled={!previous}>
            <ArrowLeft aria-hidden="true" />
            Anterior
          </button>
          <button type="button" onClick={() => next && onNavigate(next)} disabled={!next}>
            Próximo
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </motion.article>
    </motion.div>
  );
}
