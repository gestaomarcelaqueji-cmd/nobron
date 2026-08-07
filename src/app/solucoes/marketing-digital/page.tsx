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

import desktopStyles from "./page.desktop.module.css";
import mobileStyles from "./page.mobile.module.css";

const styles = {
  page: [
    desktopStyles.page,
    mobileStyles.page,
  ].join(" "),
};

export default function MarketingDigitalPage() {
  return (
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
  );
}
