import { BrandingHero } from "../BrandingHero/BrandingHero";
import { BrandRecognition } from "../BrandRecognition/BrandRecognition";
import { BrandConstructionIntro } from "../BrandConstructionIntro/BrandConstructionIntro";
import { BrandBlueprint } from "../BrandBlueprint/BrandBlueprint";
import { BrandForm } from "../BrandForm/BrandForm";
import { BrandSystem } from "../BrandSystem/BrandSystem";
import { BrandApplications } from "../BrandApplications/BrandApplications";
import { VisualAdaptation } from "../VisualAdaptation/VisualAdaptation";
import { BrandingSignals } from "../BrandingSignals/BrandingSignals";
import { BrandingServices } from "../BrandingServices/BrandingServices";
import { BrandingOutcome } from "../BrandingOutcome/BrandingOutcome";
import { BrandingFinalCta } from "../BrandingFinalCta/BrandingFinalCta";

import { SectionRise } from "@/components/solutions/shared/SectionRise/SectionRise";

import styles from "./BrandingPage.module.css";

export function BrandingPage() {
  return (
    <div className={styles.page}>
      <BrandingHero />

      <SectionRise>
        <BrandRecognition />
      </SectionRise>

      <SectionRise>
        <BrandConstructionIntro />
      </SectionRise>

      <SectionRise>
        <BrandBlueprint />
      </SectionRise>

      <SectionRise>
        <BrandForm />
      </SectionRise>

      <SectionRise>
        <BrandSystem />
      </SectionRise>

      <SectionRise>
        <BrandApplications />
      </SectionRise>

      <SectionRise>
        <VisualAdaptation />
      </SectionRise>

      <SectionRise>
        <BrandingSignals />
      </SectionRise>

      <SectionRise>
        <BrandingServices />
      </SectionRise>

      <SectionRise>
        <BrandingOutcome />
      </SectionRise>

      <SectionRise>
        <BrandingFinalCta />
      </SectionRise>
    </div>
  );
}
