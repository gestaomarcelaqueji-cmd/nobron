"use client";

import { useRef, useState } from "react";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import { marketingDigitalPageData } from "@/data/solutions/marketingDigital";

import styles from "./CampaignBeforeAd.module.css";

export function CampaignBeforeAd() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = Boolean(useReducedMotion());
  const { campaign } = marketingDigitalPageData;
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.15"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 105,
    damping: 28,
    mass: 0.42,
  });

  const trackScale = useTransform(smoothProgress, [0.08, 0.92], [0, 1]);

  useMotionValueEvent(smoothProgress, "change", (value) => {
    if (reduceMotion) return;

    const nextIndex = Math.min(
      campaign.steps.length - 1,
      Math.max(0, Math.floor(value * campaign.steps.length)),
    );

    setActiveIndex(nextIndex);
  });

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.sticky}>
        <div className={styles.inner}>
          <header className={styles.heading}>
            <span>{campaign.eyebrow}</span>
            <h2>{campaign.title}</h2>
            <p>{campaign.description}</p>
          </header>

          <div className={styles.timeline}>
            <div aria-hidden="true" className={styles.baseTrack} />
            <motion.div
              aria-hidden="true"
              className={styles.activeTrack}
              style={reduceMotion ? { scaleX: 1 } : { scaleX: trackScale }}
            />

            <ol>
              {campaign.steps.map((step, index) => (
                <li data-active={reduceMotion || index <= activeIndex} key={step.title}>
                  <span>{step.number}</span>
                  <strong>{step.title}</strong>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
