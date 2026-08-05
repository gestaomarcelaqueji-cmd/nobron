import { FragmentedCategoryHero } from "@/components/solutions/shared/FragmentedCategoryHero/FragmentedCategoryHero";
import { marketingDigitalPageData } from "@/data/solutions/marketingDigital";

export function MarketingDigitalHero() {
  return (
    <FragmentedCategoryHero
      columnCount={9}
      description={marketingDigitalPageData.hero.description}
      id="marketing-digital"
      textLength={1450}
      title="Marketing Digital"
      titleFontSize={206}
      viewBoxWidth={1600}
    />
  );
}
