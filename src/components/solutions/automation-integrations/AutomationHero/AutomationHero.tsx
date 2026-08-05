import { FragmentedCategoryHero } from "@/components/solutions/shared/FragmentedCategoryHero/FragmentedCategoryHero";
import { automationIntegrationsPageData } from "@/data/solutions/automationIntegrations";

export function AutomationHero() {
  return (
    <FragmentedCategoryHero
      columnCount={11}
      description={automationIntegrationsPageData.hero.description}
      id="automacao-integracoes"
      textLength={1760}
      title="Automação e Integrações"
      titleFontSize={188}
      viewBoxWidth={1900}
    />
  );
}
