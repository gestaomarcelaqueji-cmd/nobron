import { CategoryFinalCta } from "@/components/solutions/shared/CategoryFinalCta/CategoryFinalCta";
import { sitesSystemsPageData } from "@/data/solutions/sitesSystems";

export function SitesSystemsFinalCta() {
  const { finalCta } = sitesSystemsPageData;

  return (
    <CategoryFinalCta
      cta={finalCta.cta}
      description={finalCta.description}
      href={finalCta.href}
      id="sites-systems"
      title={finalCta.title}
    />
  );
}
