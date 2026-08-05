import { FragmentedCategoryHero } from "@/components/solutions/shared/FragmentedCategoryHero/FragmentedCategoryHero";
import { strategyPageData } from "@/data/solutions/strategy";

export function StrategyHero() {
  return (
    <FragmentedCategoryHero
      columnCount={10}
      description={strategyPageData.hero.description}
      id="estrategia-direcao"
      textLength={1660}
      title="Estratégia e Direção"
      titleFontSize={194}
      viewBoxWidth={1800}
    />
  );
}
