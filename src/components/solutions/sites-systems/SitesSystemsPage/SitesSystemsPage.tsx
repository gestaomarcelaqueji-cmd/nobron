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

import styles from "./SitesSystemsPage.module.css";

export function SitesSystemsPage() {
  return (
    <main className={styles.page}>
      <TechHero />
      <ProblemFirst />
      <SolutionTypes />
      <SystemPossibilities />
      <RealScenarios />
      <TechnologyProgress />
      <CustomSystems />
      <DevelopmentProcess />
      <SecuritySection />
      <HumanTechnology />
      <TechnicalGlossary />
      <LandingPageSpotlight />
      <DevelopmentDirectory />
      <ProjectDiagnosis />
      <SitesSystemsFinalCta />
    </main>
  );
}
