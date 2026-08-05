import { CategoryFinalCta } from "@/components/solutions/shared/CategoryFinalCta/CategoryFinalCta";
import { strategyPageData } from "@/data/solutions/strategy";

export function StrategyFinalCta() {
  const { finalCta } = strategyPageData;

  return (
    <CategoryFinalCta
      cta={finalCta.primaryCta.label}
      description={finalCta.description}
      href={finalCta.primaryCta.href}
      id="strategy"
      title={finalCta.title}
    />
  );
}
