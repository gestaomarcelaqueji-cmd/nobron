"use client";

import { motion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { RollingButton } from "@/components/ui/RollingButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/data/process";

export function CreationProcess() {
  return (
    <section className="section process-section">
      <Container>
        <SectionHeading
          title="Um bom resultado inicia com etapas bem definidas."
          align="center"
        />

        <div className="process-grid">
          <motion.div
            className="process-line"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{
              once: true,
              amount: 0.4,
            }}
            transition={{
              duration: 1.2,
            }}
          />

          {processSteps.map(
            (
              {
                title,
                description,
                icon: Icon,
              },
              index,
            ) => (
              <motion.article
                className="process-card"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.08,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                key={title}
              >
                <span className="process-card__number">
                  {index + 1}
                </span>

                <div className="process-card__icon">
                  <Icon aria-hidden="true" />
                </div>

                <h3>{title}</h3>

                <p>{description}</p>
              </motion.article>
            ),
          )}
        </div>

        <motion.div
          className="process-prototype"
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.98,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.45,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="process-prototype__copy">
            <h3>
              Ainda não consegue imaginar como sua página ficaria?
            </h3>

            <p>
              Conte um pouco sobre seu negócio. Vamos criar uma demonstração
              personalizada e enviar um vídeo pelo WhatsApp mostrando como sua
              Landing Page pode ficar.
            </p>
          </div>

          <div className="process-prototype__action">
            <RollingButton
              href="/prototipo-gratuito"
              showArrow
            >
              Quero receber meu protótipo gratuito
            </RollingButton>

            <small>
              Sem custo e sem compromisso. Você pode responder “ainda não sei”
              no que ainda não estiver definido.
            </small>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}