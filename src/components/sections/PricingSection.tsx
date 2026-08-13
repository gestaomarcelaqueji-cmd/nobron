"use client";

import { Check, PenTool, Rocket, Settings, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { Container } from "@/components/ui/Container";
import { RollingButton } from "@/components/ui/RollingButton";
import { siteConfig, whatsappMessages } from "@/data/site";
import { createWhatsAppUrl } from "@/lib/whatsapp";

const steps = [
  {
    number: "01",
    title: "Criamos",
    description: "Estratégia, textos, design e desenvolvimento feitos para o seu negócio.",
    items: ["Estrutura", "Textos", "Design", "Desenvolvimento"],
    icon: PenTool,
    side: "left",
  },
  {
    number: "02",
    title: "Publicamos",
    description: "Colocamos sua página no ar, conectada ao WhatsApp e preparada para o Google.",
    items: ["WhatsApp", "Google", "Publicação", "Hospedagem"],
    icon: Rocket,
    side: "right",
  },
  {
    number: "03",
    title: "Mantemos",
    description: "Continuamos cuidando da parte técnica enquanto o serviço estiver ativo.",
    items: ["Manutenção", "Hospedagem ativa", "Alteração mensal"],
    icon: Settings,
    side: "left",
  },
] as const;

export function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 35%"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 0.86], [0, 1]);

  return (
    <section ref={sectionRef} className="pricing-timeline-section" id="preco">
      <Container>
        <motion.div
          className="pricing-timeline-heading"
          initial={reducedMotion ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reducedMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2>Criamos, publicamos e <span>continuamos cuidando.</span></h2>
          <p>Uma Landing Page por assinatura, com criação, publicação, hospedagem e manutenção reunidas no mesmo serviço.</p>
        </motion.div>

        <div className="pricing-timeline">
          <div className="pricing-timeline__track" />
          <motion.div
            className="pricing-timeline__progress"
            style={{ scaleY: reducedMotion ? 1 : lineScale }}
          />

          {steps.map(({ number, title, description, items, icon: Icon, side }, index) => {
            const isLeft = side === "left";

            return (
              <div className={`pricing-timeline__row pricing-timeline__row--${side}`} key={number}>
                <motion.article
                  className="pricing-timeline__content"
                  initial={reducedMotion ? false : {
                    opacity: 0,
                    x: isLeft ? -42 : 42,
                    filter: "blur(8px)",
                  }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.55 }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.65,
                    delay: reducedMotion ? 0 : index * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="pricing-timeline__title">
                    <div><Icon aria-hidden="true" /></div>
                    <span>
                      <small>Etapa {number}</small>
                      <strong>{title}</strong>
                    </span>
                  </div>

                  <p>{description}</p>

                  <div className="pricing-timeline__chips">
                    {items.map((item, itemIndex) => (
                      <motion.span
                        key={item}
                        initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: reducedMotion ? 0 : 0.4,
                          delay: reducedMotion ? 0 : 0.18 + itemIndex * 0.05,
                        }}
                      >
                        <Check aria-hidden="true" />
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </motion.article>

                <motion.div
                  className="pricing-timeline__marker"
                  initial={reducedMotion ? false : { scale: 0.65, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.7 }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.45,
                    delay: reducedMotion ? 0 : 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <span>{number}</span>
                  <i />
                </motion.div>
              </div>
            );
          })}
        </div>

        <motion.div
          className="pricing-timeline-summary"
          initial={reducedMotion ? false : {
            opacity: 0,
            y: 34,
            scale: 0.97,
            filter: "blur(10px)",
          }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: reducedMotion ? 0 : 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="pricing-timeline-summary__price">
            <small>Landing Page por assinatura</small>
            <div>
              <span>R$</span>
              <strong>{siteConfig.price}</strong>
              <i>/mês</i>
            </div>
          </div>

          <div className="pricing-timeline-summary__copy">
            <h3>Sua página pronta e cuidada.</h3>
            <p>Criação, publicação, hospedagem e manutenção incluídas enquanto o serviço estiver ativo.</p>
            <div>
              <span><Check aria-hidden="true" />Sem taxa inicial</span>
              <span><ShieldCheck aria-hidden="true" />Sem fidelidade</span>
              <span><Check aria-hidden="true" />Cancele quando quiser</span>
            </div>
          </div>

          <RollingButton
            href={createWhatsAppUrl(whatsappMessages.hire)}
            target="_blank"
            rel="noreferrer"
            showArrow
          >
            Quero contratar minha Landing Page
          </RollingButton>
        </motion.div>
      </Container>
    </section>
  );
}
