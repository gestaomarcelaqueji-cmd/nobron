import type { Metadata } from "next";

import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { BenefitsMarquee } from "@/components/sections/BenefitsMarquee";
import { CreationProcess } from "@/components/sections/CreationProcess";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { HeroSection } from "@/components/sections/HeroSection";
import { IncludedLayers } from "@/components/sections/IncludedLayers";
import { NotEnoughSection } from "@/components/sections/NotEnoughSection";
import { PersonalizationSection } from "@/components/sections/PersonalizationSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { ProfessionShowcase } from "@/components/sections/ProfessionShowcase";
import { SeoExplanation } from "@/components/sections/SeoExplanation";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { WhatsAppJourney } from "@/components/sections/WhatsAppJourney";

export const metadata: Metadata = {
  title: "noBRon | Landing Pages estratégicas",
  description:
    "Landing Pages personalizadas para apresentar serviços, transmitir confiança e transformar visitas em contatos pelo WhatsApp.",
};

export default function LandingPage() {
  return (
    <>
      <main>
        {/* 3. Problema real: perda de tempo */}
        <ProfessionShowcase />

        {/* 2. Benefícios rápidos */}
        <BenefitsMarquee />

        {/* 1. Promessa principal */}
        <HeroSection />

        {/* 4. Resultado: cliente chega mais preparado */}
        <WhatsAppJourney />

        {/* 5. Entendimento e personalização */}
        <PersonalizationSection />

        {/* 6. Prova real da qualidade */}
        <TestimonialsSection />

        {/* 7. Como entendemos, criamos e entregamos */}
        <CreationProcess />

        {/* 8. Benefício complementar para o Google */}
        <SeoExplanation />

        {/* 9. Honestidade sobre quando a solução não serve */}
        <NotEnoughSection />

        {/* 10. Tudo o que está incluído */}
        <IncludedLayers />

        {/* 11. Entrega completa e valor */}
        <PricingSection />

        {/* 12. Objeções finais */}
        <FaqSection />

        {/* 13. Fechamento */}
        <FinalCta />
      </main>

      <WhatsAppButton />
    </>
  );
}
