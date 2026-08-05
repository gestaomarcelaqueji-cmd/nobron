import { FragmentedCategoryHero } from "@/components/solutions/shared/FragmentedCategoryHero/FragmentedCategoryHero";
import { sitesSystemsPageData } from "@/data/solutions/sitesSystems";

export function TechHero() {
  return (
    <FragmentedCategoryHero
      columnCount={9}
      description={sitesSystemsPageData.hero.description}
      id="sites-sistemas"
      textLength={1450}
      title="Sites e Sistemas"
      titleFontSize={206}
      viewBoxWidth={1600}
    />
  );
}
