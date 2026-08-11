import { StructuredData } from "@/components/seo/StructuredData";

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
  title: "Automação e Integrações para Empresas | noBRon",

  description:
    "Automação de processos e integração de ferramentas para reduzir tarefas repetitivas, conectar informações e tornar a operação da empresa mais eficiente.",

  path: "/solucoes/automacao",
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
    name: "Automação e Integrações",
    path: "/solucoes/automacao",
  },
]);

export default function AutomacaoIntegracoesPage() {
  return (
    <>
      <StructuredData
        id="nobron-automation-breadcrumb-jsonld"
        data={breadcrumbJsonLd}
      />

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
    </>
  );
}