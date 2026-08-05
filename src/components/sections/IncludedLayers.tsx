"use client";

import { Check } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { ExplodedLayers } from "@/components/illustrations/ExplodedLayers";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const included = [
  { label: "Análise inicial", layerIndexes: [0] },
  { label: "Estrutura estratégica", layerIndexes: [0] },
  { label: "Criação dos textos", layerIndexes: [1] },
  { label: "Design personalizado", layerIndexes: [2] },
  { label: "Desenvolvimento responsivo", layerIndexes: [3, 9] },
  { label: "Integração com WhatsApp", layerIndexes: [4] },
  { label: "Localização ou área atendida", layerIndexes: [5] },
  { label: "Serviços e portfólio", layerIndexes: [6] },
  { label: "Provas de confiança", layerIndexes: [7] },
  { label: "Configuração básica para o Google", layerIndexes: [8] },
  { label: "Publicação e hospedagem", layerIndexes: [10] },
  { label: "Manutenção técnica", layerIndexes: [11] },
];

export function IncludedLayers() {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [activeLabel, setActiveLabel] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const activeIndexes = activeLabel !== null
    ? [activeLabel]
    : activeItem !== null
      ? included[activeItem].layerIndexes
      : [];

  return (
    <section className="section included-section" id="recursos">
      <Container>
        <SectionHeading
          title="Não é apenas uma página. É tudo o que ela precisa para permanecer profissional, publicada e funcionando."
          description="As diferentes áreas trabalham juntas. Estratégia, escrita, design e desenvolvimento não são entregas soltas."
          align="center"
        />

        <div className="included-layout">
          <div
            className={`included-list${activeIndexes.length > 0 ? " has-active" : ""}`}
            onMouseLeave={() => setActiveItem(null)}
          >
            {included.map((item, index) => {
              const isActive = activeItem === index
                || (activeLabel !== null && item.layerIndexes.includes(activeLabel));

              return (
                <motion.button
                  type="button"
                  className={isActive ? "is-active" : ""}
                  aria-pressed={isActive}
                  initial={{ opacity: 0.35, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.35, delay: index * 0.055 }}
                  onMouseEnter={() => {
                    setActiveLabel(null);
                    setActiveItem(index);
                  }}
                  onFocus={() => {
                    setActiveLabel(null);
                    setActiveItem(index);
                  }}
                  onBlur={() => setActiveItem(null)}
                  onClick={() => {
                    setActiveLabel(null);
                    setActiveItem(index);
                  }}
                  key={item.label}
                >
                  <Check aria-hidden="true" />
                  <span>{item.label}</span>
                </motion.button>
              );
            })}
          </div>

          <motion.div
            className="included-visual"
            initial={{ opacity: 0.5 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.55 }}
            onViewportEnter={() => setRevealed(true)}
          >
            <ExplodedLayers
              activeIndexes={activeIndexes}
              revealed={revealed}
              onActiveChange={(index) => {
                setActiveLabel(index);
                if (index !== null) setActiveItem(null);
              }}
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
