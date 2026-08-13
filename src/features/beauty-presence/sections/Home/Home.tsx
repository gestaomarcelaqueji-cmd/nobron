"use client";

import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { MediaFrame } from "../../components/MediaFrame/MediaFrame";
import type { BeautyPageData, BeautyWork } from "../../data/beauty.types";
import { HOME_EASE, HOME_REVEAL, HOME_VISIBLE } from "./Home.motion";
import styles from "./Home.module.css";

type HomeProps = {
  data: BeautyPageData;
  onBook: () => void;
  onOpenWork: (work: BeautyWork) => void;
};

export function Home({ data, onBook, onOpenWork }: HomeProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = Boolean(useReducedMotion());
  const featured = data.works.filter((work) => work.featured).slice(0, 3);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 0.6], [0, reduceMotion ? 0 : 18]);
  const imageScale = useTransform(scrollYProgress, [0, 0.6], [1, reduceMotion ? 1 : 1.025]);
  const panelY = useTransform(scrollYProgress, [0, 0.5], [0, reduceMotion ? 0 : -12]);

  const nameParts = data.brand.name.split(/\s+/).filter(Boolean);

  return (
    <section ref={sectionRef} className={styles.home} id="inicio" aria-labelledby="home-title">
      <div className={styles.heroShell}>
        <motion.div className={styles.heroMediaShell} style={{ y: imageY, scale: imageScale }}>
          <MediaFrame
            className={styles.heroMedia}
            src={data.hero.image}
            alt={`Imagem de destaque de ${data.brand.name}`}
            label="Imagem principal"
            priority
          />
          <div className={styles.heroShade} aria-hidden="true" />

          <motion.div
            className={styles.heroName}
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: HOME_EASE }}
          >
            <h1 id="home-title">
              {nameParts.map((part) => (
                <span key={part}>{part}</span>
              ))}
            </h1>
          </motion.div>

        </motion.div>

        <motion.div
          className={styles.signaturePanel}
          style={{ y: panelY }}
          initial={reduceMotion ? false : HOME_REVEAL}
          animate={reduceMotion ? undefined : HOME_VISIBLE}
          transition={{ delay: 0.12, duration: 0.72, ease: HOME_EASE }}
        >
          <span className={styles.panelKicker}>NARA VALE · NAIL DESIGN</span>
          <h2>Detalhes que mudam o resultado.</h2>
          <p>{data.hero.description}</p>

          <div className={styles.panelFooter}>
            <a href="#trabalhos">
              Ver trabalhos
              <ArrowRight aria-hidden="true" />
            </a>

            <span>
              <MapPin aria-hidden="true" />
              {data.brand.city}
            </span>
          </div>

          <span className={styles.actionPocket} aria-hidden="true" />
          <button className={styles.bookOrb} type="button" onClick={onBook} aria-label="Agendar horário">
            <CalendarDays aria-hidden="true" />
          </button>
        </motion.div>
      </div>

      {featured.length ? (
        <div className={styles.preview}>
          <header className={styles.previewHeader}>
            <div>
              <span>TRABALHOS</span>
              <h2>Uma pequena seleção.</h2>
            </div>
            <a href="#trabalhos">Ver todos</a>
          </header>

          <div className={styles.previewComposition}>
            {featured.map((work, index) => (
              <motion.button
                key={work.id}
                className={`${styles.previewWork} ${styles[`previewWork${index + 1}`]}`}
                type="button"
                onClick={() => onOpenWork(work)}
                initial={false}
              >
                <MediaFrame
                  className={styles.previewMedia}
                  src={work.image}
                  alt={work.alt}
                  label={work.category}
                />
                <span className={styles.previewLabel}>
                  {String(index + 1).padStart(2, "0")} · {work.category}
                </span>
              </motion.button>
            ))}
          </div>

          <a className={styles.previewCta} href="#trabalhos">
            Ver todos os trabalhos
            <ArrowRight aria-hidden="true" />
          </a>
        </div>
      ) : null}
    </section>
  );
}
