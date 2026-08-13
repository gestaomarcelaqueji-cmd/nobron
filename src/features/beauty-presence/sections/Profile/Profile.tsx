"use client";

import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  Clock3,
  HelpCircle,
  Instagram,
  MapPin,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import { MediaFrame } from "../../components/MediaFrame/MediaFrame";
import type { BeautyPageData } from "../../data/beauty.types";
import { PROFILE_EASE } from "./Profile.motion";
import styles from "./Profile.module.css";

type ProfileProps = {
  data: BeautyPageData;
  onBook: () => void;
};

type SheetId = "atendimento" | "localizacao" | "informacoes" | null;

function ProfileSheet({
  id,
  data,
  onClose,
  onBook,
}: {
  id: Exclude<SheetId, null>;
  data: BeautyPageData;
  onClose: () => void;
  onBook: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const title =
    id === "atendimento"
      ? "Atendimento"
      : id === "localizacao"
        ? "Localização"
        : "Informações";

  return createPortal(
    <motion.div
      className={styles.sheetBackdrop}
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
        aria-labelledby="profile-sheet-title"
        onMouseDown={(event) => event.stopPropagation()}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 360, damping: 38 }}
      >
        <span className={styles.sheetHandle} aria-hidden="true" />
        <button className={styles.sheetClose} type="button" onClick={onClose} aria-label="Fechar">
          <X aria-hidden="true" />
        </button>
        <span className={styles.sheetKicker}>NARA VALE</span>
        <h3 id="profile-sheet-title">{title}</h3>

        {id === "atendimento" ? (
          <div className={styles.sheetContent}>
            <p>{data.location.description}</p>
            {data.location.hours?.length ? (
              <div className={styles.hours}>
                {data.location.hours.map((item) => (
                  <div key={`${item.label}-${item.value}`}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            ) : null}
            <button className={styles.sheetPrimary} type="button" onClick={onBook}>
              <CalendarDays aria-hidden="true" />
              Agendar horário
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
        ) : null}

        {id === "localizacao" ? (
          <div className={styles.sheetContent}>
            <div className={styles.locationHeadline}>
              <MapPin aria-hidden="true" />
              <div>
                <strong>{data.location.city}{data.location.region ? ` — ${data.location.region}` : ""}</strong>
                <span>{data.location.description}</span>
              </div>
            </div>
            {data.location.address ? <p>{data.location.address}</p> : null}
            {data.location.directionsUrl ? (
              <a className={styles.sheetPrimary} href={data.location.directionsUrl} target="_blank" rel="noreferrer">
                Como chegar
                <ArrowUpRight aria-hidden="true" />
              </a>
            ) : null}
          </div>
        ) : null}

        {id === "informacoes" ? (
          <div className={styles.faqList}>
            {data.faq.map((item) => (
              <details key={item.id}>
                <summary>
                  {item.question}
                  <ChevronRight aria-hidden="true" />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        ) : null}
      </motion.section>
    </motion.div>,
    document.body,
  );
}

export function Profile({ data, onBook }: ProfileProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const [sheet, setSheet] = useState<SheetId>(null);
  const [reviewIndex, setReviewIndex] = useState(0);

  const instagramUrl = useMemo(() => {
    if (!data.contact.instagram) return null;
    if (data.contact.instagram.startsWith("http")) return data.contact.instagram;
    return `https://instagram.com/${data.contact.instagram.replace(/^@/, "")}`;
  }, [data.contact.instagram]);

  const review = data.reviews[reviewIndex];

  return (
    <section className={styles.section} id="perfil" aria-labelledby="profile-title">
      <div className={styles.shell}>
        <header className={styles.heading}>
          <span>PROFISSIONAL</span>
          <h2 id="profile-title">{data.professional.title}</h2>
        </header>

        <motion.div
          className={styles.portraitShell}
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.56, ease: PROFILE_EASE }}
        >
          <MediaFrame
            className={styles.portrait}
            src={data.professional.image}
            alt={`Retrato de ${data.brand.name}`}
            label="Profissional"
          />
          <span className={styles.portraitTag}>NV</span>
        </motion.div>

        <div className={styles.bio}>
          <span>{data.brand.specialty}</span>
          <h3>{data.brand.name}</h3>
          <p>{data.professional.description}</p>
        </div>

        <div className={styles.utilityPanel}>
          <button type="button" onClick={() => setSheet("atendimento")}>
            <span className={styles.utilityIcon}><Clock3 aria-hidden="true" /></span>
            <span className={styles.utilityCopy}>
              <strong>Atendimento</strong>
              <small>{data.location.description}</small>
            </span>
            <ChevronRight aria-hidden="true" />
          </button>

          <button type="button" onClick={() => setSheet("localizacao")}>
            <span className={styles.utilityIcon}><MapPin aria-hidden="true" /></span>
            <span className={styles.utilityCopy}>
              <strong>Localização</strong>
              <small>{data.location.city}{data.location.region ? ` — ${data.location.region}` : ""}</small>
            </span>
            <ChevronRight aria-hidden="true" />
          </button>

          {instagramUrl ? (
            <a href={instagramUrl} target="_blank" rel="noreferrer">
              <span className={styles.utilityIcon}><Instagram aria-hidden="true" /></span>
              <span className={styles.utilityCopy}>
                <strong>Instagram</strong>
                <small>Abrir perfil profissional</small>
              </span>
              <ArrowUpRight aria-hidden="true" />
            </a>
          ) : null}

          <button type="button" onClick={() => setSheet("informacoes")}>
            <span className={styles.utilityIcon}><HelpCircle aria-hidden="true" /></span>
            <span className={styles.utilityCopy}>
              <strong>Informações</strong>
              <small>Dúvidas e orientações</small>
            </span>
            <ChevronRight aria-hidden="true" />
          </button>
        </div>

        {review ? (
          <div className={styles.reviews}>
            <span>AVALIAÇÕES</span>
            <blockquote>“{review.text}”</blockquote>
            <div className={styles.reviewFooter}>
              <div>
                <strong>{review.author}</strong>
                <small>{review.rating ? `${"★".repeat(Math.max(0, Math.min(5, review.rating)))}` : review.source ?? "Avaliação"}</small>
              </div>
              <div className={styles.reviewControls}>
                <button type="button" onClick={() => setReviewIndex((current) => Math.max(0, current - 1))} disabled={reviewIndex === 0}>←</button>
                <span>{String(reviewIndex + 1).padStart(2, "0")} / {String(data.reviews.length).padStart(2, "0")}</span>
                <button type="button" onClick={() => setReviewIndex((current) => Math.min(data.reviews.length - 1, current + 1))} disabled={reviewIndex === data.reviews.length - 1}>→</button>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <AnimatePresence>
        {sheet ? (
          <ProfileSheet id={sheet} data={data} onClose={() => setSheet(null)} onBook={onBook} />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
