import { StructuredData } from "@/components/seo/StructuredData";

import { CampaignBeforeAd } from "@/components/solutions/marketing-digital/CampaignBeforeAd/CampaignBeforeAd";
import { CampaignScenarios } from "@/components/solutions/marketing-digital/CampaignScenarios/CampaignScenarios";
import { ChannelIntent } from "@/components/solutions/marketing-digital/ChannelIntent/ChannelIntent";
import { CreativeResponsibility } from "@/components/solutions/marketing-digital/CreativeResponsibility/CreativeResponsibility";
import { MarketingDefinition } from "@/components/solutions/marketing-digital/MarketingDefinition/MarketingDefinition";
import { MarketingDigitalFinalCta } from "@/components/solutions/marketing-digital/MarketingDigitalFinalCta/MarketingDigitalFinalCta";
import { MarketingDigitalHero } from "@/components/solutions/marketing-digital/MarketingDigitalHero/MarketingDigitalHero";
import { MarketingProcess } from "@/components/solutions/marketing-digital/MarketingProcess/MarketingProcess";
import { MarketingRoles } from "@/components/solutions/marketing-digital/MarketingRoles/MarketingRoles";
import { MarketingServices } from "@/components/solutions/marketing-digital/MarketingServices/MarketingServices";
import { MeasurementPath } from "@/components/solutions/marketing-digital/MeasurementPath/MeasurementPath";

import { SectionRise } from "@/components/solutions/shared/SectionRise/SectionRise";

import { createPageMetadata } from "@/lib/seo";
import { createBreadcrumbJsonLd } from "@/lib/structured-data";

import desktopStyles from "./page.desktop.module.css";
import mobileStyles from "./page.mobile.module.css";

const styles = {
  page: [
    desktopStyles.page,
    mobileStyles.page,
  ].join(" "),
};

export const metadata = createPageMetadata({
  title: "Marketing Digital para Empresas | noBRon",

  description:
    "Estratégia de marketing digital, campanhas, conteúdo, canais, criativos e mensuração para conectar comunicação, público e objetivos de negócio.",

  path: "/solucoes/marketing-digital",
});

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  {
    name: "Início",
    path: "/",
  },
  {
    name: "Soluções",
    path: "/solucoes",
  },
  {
    name: "Marketing Digital",
    path: "/solucoes/marketing-digital",
  },
]);

export default function MarketingDigitalPage() {
  return (
    <>
      <StructuredData
        id="nobron-marketing-digital-breadcrumb-jsonld"
        data={breadcrumbJsonLd}
      />

      <main className={styles.page}>
        <MarketingDigitalHero />

        <SectionRise>
          <MarketingDefinition />
        </SectionRise>

        <SectionRise>
          <CampaignBeforeAd />
        </SectionRise>

        <SectionRise>
          <MarketingRoles />
        </SectionRise>

        <SectionRise>
          <ChannelIntent />
        </SectionRise>

        <SectionRise>
          <MarketingServices />
        </SectionRise>

        <SectionRise>
          <CreativeResponsibility />
        </SectionRise>

        <SectionRise>
          <MeasurementPath />
        </SectionRise>

        <SectionRise>
          <CampaignScenarios />
        </SectionRise>

        <SectionRise>
          <MarketingProcess />
        </SectionRise>

        <SectionRise>
          <MarketingDigitalFinalCta />
        </SectionRise>
      </main>
    </>
  );
}