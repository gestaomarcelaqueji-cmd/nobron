import { StructuredData } from "@/components/seo/StructuredData";

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

import { createPageMetadata } from "@/lib/seo";
import { createBreadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Landing Page por Assinatura em Telêmaco Borba | noBRon",

  description:
    "Landing Page por assinatura em Telêmaco Borba para profissionais e empresas: criação, textos, publicação, hospedagem e manutenção por R$ 200/mês.",

  path: "/landing-page",

  image: "/brand/og/og-landing-page.png",

  imageAlt:
    "noBRon — Landing Page por assinatura para profissionais e empresas",
});

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  {
    name: "Início",
    path: "/",
  },
  {
    name: "Landing Page",
    path: "/landing-page",
  },
]);

export default function LandingPage() {
  return (
    <>
      <StructuredData
        id="nobron-landing-page-breadcrumb-jsonld"
        data={breadcrumbJsonLd}
      />

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
    </>
  );
}
