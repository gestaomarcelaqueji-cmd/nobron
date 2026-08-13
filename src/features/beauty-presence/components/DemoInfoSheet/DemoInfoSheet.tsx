"use client";

import { ArrowUpRight, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

import type { BeautyPageData } from "../../data/beauty.types";
import styles from "./DemoInfoSheet.module.css";

type DemoInfoSheetProps = {
  open: boolean;
  data: BeautyPageData;
  onClose: () => void;
};

export function DemoInfoSheet({ open, data, onClose }: DemoInfoSheetProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <motion.div
      className={styles.backdrop}
      role="presentation"
      onMouseDown={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.section
        className={styles.sheet}
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-info-title"
        onMouseDown={(event) => event.stopPropagation()}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: "spring", stiffness: 360, damping: 36 }}
      >
        <span className={styles.handle} aria-hidden="true" />
        <button className={styles.close} type="button" onClick={onClose} aria-label="Fechar">
          <X aria-hidden="true" />
        </button>
        <span className={styles.kicker}>DEMO noBRon</span>
        <h2 id="demo-info-title">Uma experiência criada para demonstrar o produto.</h2>
        <p>
          Nara Vale é uma identidade fictícia. Serviços, endereço, avaliações e resultados nunca devem ser interpretados como dados de um negócio real.
        </p>
        <a href={data.nobronCta?.href ?? "/contato?origem=case-beleza"}>
          Conhecer a noBRon
          <ArrowUpRight aria-hidden="true" />
        </a>
      </motion.section>
    </motion.div>
  );
}
