import { CustomSystems } from "../CustomSystems/CustomSystems";
import { DevelopmentDirectory } from "../DevelopmentDirectory/DevelopmentDirectory";
import { DevelopmentProcess } from "../DevelopmentProcess/DevelopmentProcess";
import { HumanTechnology } from "../HumanTechnology/HumanTechnology";
import { LandingPageSpotlight } from "../LandingPageSpotlight/LandingPageSpotlight";
import { ProblemFirst } from "../ProblemFirst/ProblemFirst";
import { ProjectDiagnosis } from "../ProjectDiagnosis/ProjectDiagnosis";
import { RealScenarios } from "../RealScenarios/RealScenarios";
import { SecuritySection } from "../SecuritySection/SecuritySection";
import { SitesSystemsFinalCta } from "../SitesSystemsFinalCta/SitesSystemsFinalCta";
import { SolutionTypes } from "../SolutionTypes/SolutionTypes";
import { SystemPossibilities } from "../SystemPossibilities/SystemPossibilities";
import { TechHero } from "../TechHero/TechHero";
import { TechnicalGlossary } from "../TechnicalGlossary/TechnicalGlossary";
import { TechnologyProgress } from "../TechnologyProgress/TechnologyProgress";

import { SectionRise } from "../../shared/SectionRise/SectionRise";

import styles from "./SitesSystemsPage.module.css";

export function SitesSystemsPage() {
  return (
    <main className={styles.page}>
      <TechHero />

      <SectionRise>
        <ProblemFirst />
      </SectionRise>

      <SectionRise>
        <SolutionTypes />
      </SectionRise>

      <SectionRise>
        <SystemPossibilities />
      </SectionRise>

      <SectionRise>
        <RealScenarios />
      </SectionRise>

      <SectionRise>
        <TechnologyProgress />
      </SectionRise>

      <SectionRise>
        <CustomSystems />
      </SectionRise>

      <SectionRise>
        <DevelopmentProcess />
      </SectionRise>

      <SectionRise>
        <SecuritySection />
      </SectionRise>

      <SectionRise>
        <HumanTechnology />
      </SectionRise>

      <SectionRise>
        <TechnicalGlossary />
      </SectionRise>

      <SectionRise>
        <LandingPageSpotlight />
      </SectionRise>

      <SectionRise>
        <DevelopmentDirectory />
      </SectionRise>

      <SectionRise>
        <ProjectDiagnosis />
      </SectionRise>

      <SectionRise>
        <SitesSystemsFinalCta />
      </SectionRise>
    </main>
  );
}
