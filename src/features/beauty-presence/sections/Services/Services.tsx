"use client";

import { ArrowRight, CalendarDays } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";

import { MediaFrame } from "../../components/MediaFrame/MediaFrame";
import type { BeautyPageData } from "../../data/beauty.types";
import { SERVICE_EASE, SERVICE_SPRING } from "./Services.motion";
import styles from "./Services.module.css";

type ServicesProps = {
  data: BeautyPageData;
  onExploreWorks: (serviceId: string) => void;
  onBookService: (serviceId: string) => void;
};

export function Services({ data, onExploreWorks, onBookService }: ServicesProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const [activeId, setActiveId] = useState(data.services[0]?.id ?? "");

  const activeOriginalIndex = Math.max(0, data.services.findIndex((service) => service.id === activeId));

  const orderedServices = useMemo(() => {
    const activeIndex = data.services.findIndex((service) => service.id === activeId);
    if (activeIndex <= 0) return data.services;
    return [
      data.services[activeIndex],
      ...data.services.slice(activeIndex + 1),
      ...data.services.slice(0, activeIndex),
    ];
  }, [activeId, data.services]);

  if (!data.services.length) return null;

  return (
    <section className={styles.section} id="servicos" aria-labelledby="services-title">
      <div className={styles.shell}>
        <header className={styles.heading}>
          <div>
            <span className={styles.kicker}>SERVIÇOS</span>
            <h2 id="services-title">Escolha o que combina com você.</h2>
          </div>
          <span className={styles.count}>{String(activeOriginalIndex + 1).padStart(2, "0")} / {String(data.services.length).padStart(2, "0")}</span>
        </header>

        <div className={styles.deck} aria-label="Lista de serviços">
          {orderedServices.map((service, index) => {
            const isActive = service.id === activeId;
            const originalIndex = data.services.findIndex((item) => item.id === service.id);

            return (
              <motion.article
                layout
                key={service.id}
                className={`${styles.card} ${isActive ? styles.active : styles.inactive}`}
                style={{ zIndex: data.services.length - index }}
                transition={reduceMotion ? { duration: 0 } : SERVICE_SPRING}
              >
                {isActive ? (
                  <div className={styles.activeCard}>
                    <div className={styles.activeTopline}>
                      <span>{String(originalIndex + 1).padStart(2, "0")}</span>
                      <span>{String(originalIndex + 1).padStart(2, "0")} / {String(data.services.length).padStart(2, "0")}</span>
                    </div>

                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={service.id}
                        className={styles.activeContent}
                        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: SERVICE_EASE }}
                      >
                        <h3>{service.name}</h3>

                        <div className={styles.mediaShell}>
                          <MediaFrame
                            className={styles.media}
                            src={service.image}
                            alt={`Imagem representativa de ${service.name}`}
                            label={service.shortName ?? service.name}
                          />
                          <div className={styles.mediaShade} aria-hidden="true" />
                          <span className={styles.mediaLabel}>{service.shortName ?? service.name}</span>
                        </div>

                        <p>{service.description}</p>

                        <div className={styles.meta}>
                          {service.showPrice && service.price ? <span>{service.price}</span> : null}
                          {service.duration ? <span>{service.duration}</span> : null}
                        </div>

                        <div className={styles.actions}>
                          <button type="button" onClick={() => onExploreWorks(service.id)}>
                            Trabalhos relacionados
                            <ArrowRight aria-hidden="true" />
                          </button>
                          <button
                            className={styles.book}
                            type="button"
                            onClick={() => onBookService(service.id)}
                            aria-label={`Agendar ${service.name}`}
                          >
                            <CalendarDays aria-hidden="true" />
                          </button>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                ) : (
                  <button className={styles.tab} type="button" onClick={() => setActiveId(service.id)}>
                    <span>{String(originalIndex + 1).padStart(2, "0")}</span>
                    <strong>{service.shortName ?? service.name}</strong>
                    <ArrowRight aria-hidden="true" />
                  </button>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
