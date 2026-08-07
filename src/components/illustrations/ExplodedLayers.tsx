"use client";

import type { CSSProperties } from "react";
import { motion } from "motion/react";

const layers = [
  "Estratégia",
  "Textos",
  "Design",
  "Desenvolvimento",
  "WhatsApp",
  "Localização",
  "Galeria",
  "Avaliações",
  "SEO",
  "Responsividade",
  "Hospedagem",
  "Manutenção",
];

type Props = {
  activeIndexes: number[];
  revealed: boolean;
  onActiveChange: (index: number | null) => void;
};

export function ExplodedLayers({ activeIndexes, revealed, onActiveChange }: Props) {
  const activeCards = new Set(activeIndexes.map((index) => index % 6));

  return (
    <div
      className={[
        "layers-illustration",
        revealed ? "is-revealed" : "",
        activeIndexes.length > 0 ? "has-active" : "",
      ].filter(Boolean).join(" ")}
    >
      <div className="layers-stack" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((layer) => (
          <motion.div
            className={`layer-card${activeCards.has(layer) ? " is-active-layer" : ""}`}
            initial={{ opacity: 0.28, transform: "translateZ(0px) translateY(18px)" }}
            whileInView={{ opacity: 1, transform: `translateZ(${layer * 34}px) translateY(0px)` }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: 0.62, delay: layer * 0.09, ease: [0.22, 1, 0.36, 1] }}
            key={layer}
          >
            <div className="layer-card__header" />
            <div className="layer-card__hero" />
            <div className="layer-card__blocks"><i /><i /><i /></div>
          </motion.div>
        ))}
      </div>

      <div className="layer-labels">
        {layers.map((layer, index) => {
          const style = {
            "--label-delay": `${420 + index * 55}ms`,
            "--line-delay": `${580 + index * 55}ms`,
          } as CSSProperties;

          return (
            <button
              type="button"
              key={layer}
              className={[
                "layer-label",
                index >= 6 ? "layer-label--right" : "",
                activeIndexes.includes(index) ? "is-active" : "",
              ].filter(Boolean).join(" ")}
              style={style}
              aria-pressed={activeIndexes.includes(index)}
              onMouseEnter={() => onActiveChange(index)}
              onMouseLeave={() => onActiveChange(null)}
              onFocus={() => onActiveChange(index)}
              onBlur={() => onActiveChange(null)}
              onClick={() =>
                onActiveChange(activeIndexes.includes(index) ? null : index)
              }
            >
              <span className="layer-label__text">{layer}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
