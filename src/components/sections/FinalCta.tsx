"use client";

import { motion } from "motion/react";
import { LandingPageMockup } from "@/components/illustrations/LandingPageMockup";
import { Container } from "@/components/ui/Container";
import { RollingButton } from "@/components/ui/RollingButton";
import { professions } from "@/data/professions";
import { siteConfig, whatsappMessages } from "@/data/site";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export function FinalCta() {
  return (
    <section className="final-cta-section">
      <Container className="final-cta-layout">
        <div className="final-cta-copy">
          <h2>Seu trabalho merece mais do que informações espalhadas.</h2>
          <p>Quando alguém procurar pelo seu serviço, sua empresa estará pronta para ser escolhida?</p>
          <div className="final-cta-price"><strong>R$ {siteConfig.price}</strong><span>por mês</span></div>
          <div className="final-cta-actions">
            <RollingButton variant="light" href={createWhatsAppUrl(whatsappMessages.hire)} target="_blank" rel="noreferrer">Quero minha Landing Page</RollingButton>
            <RollingButton variant="secondary" href={createWhatsAppUrl(whatsappMessages.hero)} target="_blank" rel="noreferrer">Falar com a noBRon</RollingButton>
          </div>
        </div>
        <motion.div className="final-cta-visual" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.5 }}>
          <LandingPageMockup profession={professions[0]} compact />
        </motion.div>
      </Container>
    </section>
  );
}
