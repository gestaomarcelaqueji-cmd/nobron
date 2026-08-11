import { HeroImmersive } from "@/components/HeroImmersive";
import { StructuredData } from "@/components/seo/StructuredData";

import { createPageMetadata } from "@/lib/seo";
import { createHomeJsonLd } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "noBRon | Estratégia, Design, Sites, SEO e Automação",

  description:
    "Estratégia, branding, sites, sistemas, SEO, marketing digital e automação para empresas que querem fortalecer sua presença, organizar processos e crescer com estrutura.",

  path: "/",
});

const homeJsonLd = createHomeJsonLd();

export default function Home() {
  return (
    <>
      <StructuredData
        id="nobron-home-jsonld"
        data={homeJsonLd}
      />

      <main>
        <HeroImmersive />
      </main>
    </>
  );
}