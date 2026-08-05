"use client";

import { Camera, CircleHelp, Globe2, Instagram, MessageCircle, Search, Share2, Star } from "lucide-react";
import { motion } from "motion/react";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { WhatsAppMockup } from "@/components/illustrations/WhatsAppMockup";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  { title: "Encontrou", description: "Google, Instagram ou indicação", icon: Search },
  { title: "Entendeu", description: "Uma apresentação clara e organizada", icon: Globe2 },
  { title: "Confiou", description: "Fotos, avaliações e diferenciais", icon: Star },
  { title: "Tirou dúvidas", description: "Serviços, área atendida e processo", icon: CircleHelp },
  { title: "Entrou em contato", description: "Um botão direto para o WhatsApp", icon: MessageCircle },
];

export function WhatsAppJourney() {
  return (
    <section className="section journey-section" id="como-funciona">
      <Container>
        <SectionHeading
          title="Encontrou. Entendeu. Confiou. Entrou em contato."
          description="A página não substitui seu atendimento. Ela prepara o cliente para a conversa."
          align="center"
        />

        <div className="journey-channel-row" aria-hidden="true">
          <span><Search /></span><span><Instagram /></span><span><Share2 /></span><i />
          <span><Camera /></span><span><Star /></span><i />
          <span><MessageCircle /></span>
        </div>

        <div className="journey-layout">
          <div className="journey-steps">
            <motion.div
              className="journey-progress"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
            {steps.map(({ title, description, icon: Icon }, index) => (
              <BlurReveal className="journey-step" delay={index * 0.08} key={title}>
                <div className="journey-step__index">{index + 1}</div>
                <div className="journey-step__icon"><Icon /></div>
                <div><h3>{title}</h3><p>{description}</p></div>
              </BlurReveal>
            ))}
          </div>
          <BlurReveal className="journey-chat" delay={0.18}>
            <div className="journey-chat__label">O cliente chega mais preparado</div>
            <WhatsAppMockup />
          </BlurReveal>
        </div>
      </Container>
    </section>
  );
}
