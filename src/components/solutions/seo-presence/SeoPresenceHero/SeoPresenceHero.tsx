import { FragmentedCategoryHero } from "@/components/solutions/shared/FragmentedCategoryHero/FragmentedCategoryHero";
import { seoPresencePageData } from "@/data/solutions/seoPresence";

export function SeoPresenceHero() {
  return (
    <FragmentedCategoryHero
      columnCount={10}
      description={seoPresencePageData.hero.description}
      id="seo-presenca-digital"
      textLength={1660}
      title="SEO e Presença Digital"
      titleFontSize={190}
      viewBoxWidth={1800}
    />
  );
}
