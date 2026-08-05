import { AdsNeedDirection } from "@/components/solutions/seo-presence/AdsNeedDirection/AdsNeedDirection";
import { OrganicPaidBridge } from "@/components/solutions/seo-presence/OrganicPaidBridge/OrganicPaidBridge";
import { PresenceIsPerception } from "@/components/solutions/seo-presence/PresenceIsPerception/PresenceIsPerception";
import { SearchIsHappening } from "@/components/solutions/seo-presence/SearchIsHappening/SearchIsHappening";
import { SearchScenarios } from "@/components/solutions/seo-presence/SearchScenarios/SearchScenarios";
import { SeoPresenceFinalCta } from "@/components/solutions/seo-presence/SeoPresenceFinalCta/SeoPresenceFinalCta";
import { SeoPresenceHero } from "@/components/solutions/seo-presence/SeoPresenceHero/SeoPresenceHero";
import { SeoProcess } from "@/components/solutions/seo-presence/SeoProcess/SeoProcess";
import { SeoServicesExplained } from "@/components/solutions/seo-presence/SeoServicesExplained/SeoServicesExplained";

import styles from "./page.module.css";

export default function SeoPresenceDigitalPage() {
  return (
    <main className={styles.page}>
      <SeoPresenceHero />
      <SearchIsHappening />
      <PresenceIsPerception />
      <SeoServicesExplained />
      <AdsNeedDirection />
      <SearchScenarios />
      <SeoProcess />
      <OrganicPaidBridge />
      <SeoPresenceFinalCta />
    </main>
  );
}
