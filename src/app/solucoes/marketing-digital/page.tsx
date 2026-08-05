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

import styles from "./page.module.css";

export default function MarketingDigitalPage() {
  return (
    <main className={styles.page}>
      <MarketingDigitalHero />
      <MarketingDefinition />
      <CampaignBeforeAd />
      <MarketingRoles />
      <ChannelIntent />
      <MarketingServices />
      <CreativeResponsibility />
      <MeasurementPath />
      <CampaignScenarios />
      <MarketingProcess />
      <MarketingDigitalFinalCta />
    </main>
  );
}
