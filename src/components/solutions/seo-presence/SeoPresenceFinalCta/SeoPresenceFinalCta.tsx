import { CategoryFinalCta } from "@/components/solutions/shared/CategoryFinalCta/CategoryFinalCta";
import { seoPresencePageData } from "@/data/solutions/seoPresence";

export function SeoPresenceFinalCta() {
  const { finalCta } = seoPresencePageData;

  return (
    <CategoryFinalCta
      cta={finalCta.cta}
      description={finalCta.description}
      href={finalCta.href}
      id="seo-presence"
      title={finalCta.title}
    />
  );
}
