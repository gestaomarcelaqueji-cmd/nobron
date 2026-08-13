"use client";

import { Check, Globe2, MessageCircle, Palette, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { Floating } from "@/components/animations/Floating";
import { MaskReveal } from "@/components/animations/MaskReveal";
import { LandingPageMockup } from "@/components/illustrations/LandingPageMockup";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { RollingButton } from "@/components/ui/RollingButton";
import { professions } from "@/data/professions";
import { siteConfig, whatsappMessages } from "@/data/site";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export function HeroSection() {
  return (
    <section className="hero-section" id="inicio">
      <div className="hero-orb hero-orb--one" />
      <div className="hero-orb hero-orb--two" />
      <Container className="hero-grid">
        <div className="hero-copy">
          <Badge>Landing Page por assinatura para profissionais, empreendedores e empresas</Badge>
          <h1 className="hero-title">
  <MaskReveal eager>
    Landing Page por assinatura
  </MaskReveal>

  <MaskReveal eager delay={0.08}>
    para transformar visitas
  </MaskReveal>

  <MaskReveal eager delay={0.16}>
    em <span className="hero-title-highlight">oportunidades.</span>
  </MaskReveal>
</h1>
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
          >
            Criamos Landing Pages personalizadas para apresentar serviços, organizar informações, transmitir confiança e transformar visitas em contatos pelo WhatsApp.
          </motion.p>

          <motion.div className="hero-price" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
            <strong>R$ {siteConfig.price}</strong><span>por mês</span>
          </motion.div>

          <motion.ul className="hero-checks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}>
            <li><Check /> Criação, publicação, hospedagem e manutenção incluídas.</li>
            <li><Check /> Sem fidelidade. Cancele quando quiser.</li>
          </motion.ul>

          <motion.div className="hero-actions" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}>
            <RollingButton href={createWhatsAppUrl(whatsappMessages.hero)} target="_blank" rel="noreferrer" showArrow>
              Quero minha Landing Page
            </RollingButton>
          
          </motion.div>
          <p className="hero-microcopy">Atendimento digital a partir de Telêmaco Borba, Paraná. Você não precisa entender de site, SEO ou programação. A noBRon organiza tudo para você.</p>
        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.55 }}
        >
          <div className="hero-device-glow" />
          <LandingPageMockup profession={professions[0]} />

          <Floating className="floating-card floating-card--google" delay={0.2}>
            <Globe2 /><div><strong>Encontrado</strong><span>no Google</span></div>
          </Floating>
          <Floating className="floating-card floating-card--whatsapp" delay={0.8} duration={5.2}>
            <MessageCircle /><div><strong>Contato</strong><span>pelo WhatsApp</span></div>
          </Floating>
          <Floating className="floating-card floating-card--colors" delay={0.5} duration={5.8}>
            <Palette /><div><strong>Com as cores</strong><span>da sua empresa</span></div>
          </Floating>
          <Floating className="floating-card floating-card--shield" delay={1.1} duration={4.8}>
            <ShieldCheck /><div><strong>Sem</strong><span>fidelidade</span></div>
          </Floating>
          <Floating className="floating-price" delay={0.3} duration={6}>
            <strong>R$ {siteConfig.price}</strong><span>por mês</span>
          </Floating>
        </motion.div>
      </Container>
    </section>
  );
}
