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

import { SectionRise } from "@/components/solutions/shared/SectionRise/SectionRise";

import desktopStyles from "./page.desktop.module.css";
import mobileStyles from "./page.mobile.module.css";

const styles = {
  page: [
    desktopStyles.page,
    mobileStyles.page,
  ].join(" "),
};

export default function AutomacaoIntegracoesPage() {
  return (
    <main className={styles.page}>
      <AutomationHero />

      <SectionRise>
        <RepetitionCosts />
      </SectionRise>

      <SectionRise>
        <ProcessBeforeAutomation />
      </SectionRise>

      <SectionRise>
        <AutomationConcepts />
      </SectionRise>

      <SectionRise>
        <AutomationServices />
      </SectionRise>

      <SectionRise>
        <ConnectedFlow />
      </SectionRise>

      <SectionRise>
        <RealAutomationScenarios />
      </SectionRise>

      <SectionRise>
        <HumanControl />
      </SectionRise>

      <SectionRise>
        <AutomationProcess />
      </SectionRise>

      <SectionRise>
        <AutomationFinalCta />
      </SectionRise>
    </main>
  );
}
