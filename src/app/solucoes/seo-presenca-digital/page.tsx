import { AdsNeedDirection } from "@/components/solutions/seo-presence/AdsNeedDirection/AdsNeedDirection";
import { OrganicPaidBridge } from "@/components/solutions/seo-presence/OrganicPaidBridge/OrganicPaidBridge";
import { PresenceIsPerception } from "@/components/solutions/seo-presence/PresenceIsPerception/PresenceIsPerception";
import { SearchIsHappening } from "@/components/solutions/seo-presence/SearchIsHappening/SearchIsHappening";
import { SearchScenarios } from "@/components/solutions/seo-presence/SearchScenarios/SearchScenarios";
import { SeoPresenceFinalCta } from "@/components/solutions/seo-presence/SeoPresenceFinalCta/SeoPresenceFinalCta";
import { SeoPresenceHero } from "@/components/solutions/seo-presence/SeoPresenceHero/SeoPresenceHero";
import { SeoProcess } from "@/components/solutions/seo-presence/SeoProcess/SeoProcess";
import { SeoServicesExplained } from "@/components/solutions/seo-presence/SeoServicesExplained/SeoServicesExplained";

import { SectionRise } from "@/components/solutions/shared/SectionRise/SectionRise";

import desktopStyles from "./page.desktop.module.css";
import mobileStyles from "./page.mobile.module.css";

const styles = {
  page: [
    desktopStyles.page,
    mobileStyles.page,
  ].join(" "),
};

export default function SeoPresenceDigitalPage() {
  return (
    <main className={styles.page}>
      <SeoPresenceHero />

      <SectionRise>
        <SearchIsHappening />
      </SectionRise>

      <SectionRise>
        <PresenceIsPerception />
      </SectionRise>

      <SectionRise>
        <SeoServicesExplained />
      </SectionRise>

      <SectionRise>
        <AdsNeedDirection />
      </SectionRise>

      <SectionRise>
        <SearchScenarios />
      </SectionRise>

      <SectionRise>
        <SeoProcess />
      </SectionRise>

      <SectionRise>
        <OrganicPaidBridge />
      </SectionRise>

      <SectionRise>
        <SeoPresenceFinalCta />
      </SectionRise>
    </main>
  );
}
