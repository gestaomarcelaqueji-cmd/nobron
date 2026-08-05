"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { WordHighlight } from "@/components/animations/WordHighlight";
import { LandingPageMockup } from "@/components/illustrations/LandingPageMockup";
import { ScatteredInformation } from "@/components/illustrations/ScatteredInformation";
import { Container } from "@/components/ui/Container";
import { RollingButton } from "@/components/ui/RollingButton";
import { professions } from "@/data/professions";
import { whatsappMessages } from "@/data/site";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export function ProblemSolutionSection() {
  return (
    <section className="section problem-section" id="problema">
      <Container>
        <div className="problem-intro">
          <p>Você trabalha bem.</p>
          <h2>Mas suas informações ajudam o cliente a <WordHighlight>escolher você?</WordHighlight></h2>
        </div>

        <div className="comparison-grid">
          <BlurReveal className="comparison-card comparison-card--chaos">
            <div className="comparison-card__heading">
              <span>Hoje</span>
              <h3>Seu cliente precisa procurar as informações.</h3>
            </div>
            <ScatteredInformation />
          </BlurReveal>

          <motion.div
            className="comparison-arrow"
            initial={{ scale: 0, rotate: -30 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 180, damping: 16 }}
          >
            <ArrowRight />
          </motion.div>

          <BlurReveal className="comparison-card comparison-card--solution" delay={0.12}>
            <div className="comparison-card__heading">
              <span>Com a Landing Page</span>
              <h3>Tudo o que ele precisa para escolher você. Em um único lugar.</h3>
            </div>
            <LandingPageMockup profession={professions[0]} compact />
          </BlurReveal>
        </div>

        <div className="inline-cta">
          <div><strong>Suas informações não precisam continuar espalhadas.</strong><span>Organize serviços, fotos, diferenciais e contato em uma apresentação profissional.</span></div>
          <RollingButton href={createWhatsAppUrl(whatsappMessages.organize)} target="_blank" rel="noreferrer">Quero organizar minha presença digital</RollingButton>
        </div>
      </Container>
    </section>
  );
}
