"use client";

import { ArrowUpRight, CalendarDays, ChevronDown, Clock3, Instagram, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo } from "react";

import { MediaFrame } from "../MediaFrame/MediaFrame";
import type {
  BeautyPageData,
  BeautyService,
  BeautyWork,
} from "../../data/beauty.types";
import styles from "./BookingSheet.module.css";

type BookingSheetProps = {
  open: boolean;
  data: BeautyPageData;
  serviceId?: string;
  work?: BeautyWork | null;
  onServiceChange: (serviceId?: string) => void;
  onClose: () => void;
  onContinue: (service?: BeautyService, work?: BeautyWork | null) => void;
};

export function BookingSheet({
  open,
  data,
  serviceId,
  work,
  onServiceChange,
  onClose,
  onContinue,
}: BookingSheetProps) {
  const selectedService = useMemo(
    () => data.services.find((service) => service.id === serviceId),
    [data.services, serviceId],
  );

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const hours = data.location.hours ?? [];
  const instagramUrl = data.contact.instagram
    ? data.contact.instagram.startsWith("http")
      ? data.contact.instagram
      : `https://instagram.com/${data.contact.instagram.replace(/^@/, "")}`
    : null;

  return (
    <motion.div
      className={styles.backdrop}
      role="presentation"
      onMouseDown={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.section
        className={styles.sheet}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        onMouseDown={(event) => event.stopPropagation()}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 360, damping: 38, mass: 0.9 }}
      >
        <span className={styles.handle} aria-hidden="true" />
        <button className={styles.close} type="button" onClick={onClose} aria-label="Fechar agendamento">
          <X aria-hidden="true" />
        </button>

        <span className={styles.kicker}>AGENDAMENTO</span>
        <h2 id="booking-title">Agendar seu horário.</h2>
        <p className={styles.intro}>
          Escolha o serviço e siga pelo canal de atendimento da profissional.
        </p>

        {work ? (
          <div className={styles.reference}>
            <MediaFrame
              className={styles.referenceMedia}
              src={work.image}
              alt={work.alt}
              label={work.category}
            />
            <div>
              <span>Sua referência</span>
              <strong>{work.title}</strong>
              <small>{work.category}</small>
            </div>
          </div>
        ) : null}

        <label className={styles.selectField}>
          <span>Serviço</span>
          <span className={styles.selectWrap}>
            <select
              value={serviceId ?? ""}
              onChange={(event) => onServiceChange(event.target.value || undefined)}
            >
              <option value="">Quero escolher com a profissional</option>
              {data.services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
            <ChevronDown aria-hidden="true" />
          </span>
        </label>

        {data.mode === "case" ? (
          <div className={styles.demoNotice}>
            <strong>Esta é uma demonstração.</strong>
            <p>
              Em um projeto real, esta ação segue para o WhatsApp ou agenda da profissional. Nara Vale não é um negócio real.
            </p>
            <a href={data.nobronCta?.href ?? "/contato?origem=case-beleza"}>
              Quero esta experiência no meu negócio
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        ) : (
          <button
            className={styles.primary}
            type="button"
            onClick={() => onContinue(selectedService, work)}
          >
            <CalendarDays aria-hidden="true" />
            Continuar para agendamento
            <ArrowUpRight aria-hidden="true" />
          </button>
        )}

        <div className={styles.utilities}>
          {hours.length ? (
            <div className={styles.utility}>
              <Clock3 aria-hidden="true" />
              <div>
                <span>Horários</span>
                <strong>{hours[0]?.value}</strong>
              </div>
            </div>
          ) : null}

          {instagramUrl ? (
            <a className={styles.utility} href={instagramUrl} target="_blank" rel="noreferrer">
              <Instagram aria-hidden="true" />
              <div>
                <span>Instagram</span>
                <strong>Abrir perfil</strong>
              </div>
            </a>
          ) : null}
        </div>
      </motion.section>
    </motion.div>
  );
}
