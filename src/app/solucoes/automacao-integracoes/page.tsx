import { AutomationConcepts } from "@/components/solutions/automation-integrations/AutomationConcepts/AutomationConcepts";
import { AutomationFinalCta } from "@/components/solutions/automation-integrations/AutomationFinalCta/AutomationFinalCta";
import { AutomationHero } from "@/components/solutions/automation-integrations/AutomationHero/AutomationHero";
import { AutomationProcess } from "@/components/solutions/automation-integrations/AutomationProcess/AutomationProcess";
import { AutomationServices } from "@/components/solutions/automation-integrations/AutomationServices/AutomationServices";
import { ConnectedFlow } from "@/components/solutions/automation-integrations/ConnectedFlow/ConnectedFlow";
import { HumanControl } from "@/components/solutions/automation-integrations/HumanControl/HumanControl";
import { ProcessBeforeAutomation } from "@/components/solutions/automation-integrations/ProcessBeforeAutomation/ProcessBeforeAutomation";
import { RepetitionCosts } from "@/components/solutions/automation-integrations/RepetitionCosts/RepetitionCosts";
import { RealAutomationScenarios } from "@/components/solutions/automation-integrations/RealAutomationScenarios/RealAutomationScenarios";

import styles from "./page.module.css";

export default function AutomacaoIntegracoesPage() {
  return (
    <main className={styles.page}>
      <AutomationHero />
      <RepetitionCosts />
      <ProcessBeforeAutomation />
      <AutomationConcepts />
      <AutomationServices />
      <ConnectedFlow />
      <RealAutomationScenarios />
      <HumanControl />
      <AutomationProcess />
      <AutomationFinalCta />
    </main>
  );
}
