import { FragmentedCategoryHero } from "@/components/solutions/shared/FragmentedCategoryHero/FragmentedCategoryHero";
import { brandingPageData } from "@/data/solutions/branding";

export function BrandingHero() {
  return (
    <FragmentedCategoryHero
      columnCount={10}
      description={brandingPageData.hero.description}
      id="branding-design"
      textLength={1660}
      title="Branding e Design"
      titleFontSize={202}
      viewBoxWidth={1800}
    />
  );
}
