import { CategoryFinalCta } from "@/components/solutions/shared/CategoryFinalCta/CategoryFinalCta";
import { automationIntegrationsPageData } from "@/data/solutions/automationIntegrations";

export function AutomationFinalCta() {
  const { finalCta } = automationIntegrationsPageData;

  return (
    <CategoryFinalCta
      cta={finalCta.cta}
      description={finalCta.description}
      href={finalCta.href}
      id="automation-integrations"
      title={finalCta.title}
    />
  );
}
