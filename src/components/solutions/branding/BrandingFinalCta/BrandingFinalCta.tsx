import { CategoryFinalCta } from "@/components/solutions/shared/CategoryFinalCta/CategoryFinalCta";
import { brandingPageData } from "@/data/solutions/branding";

export function BrandingFinalCta() {
  const { finalCta } = brandingPageData;

  return (
    <CategoryFinalCta
      cta={finalCta.primaryCta.label}
      description={finalCta.description}
      href={finalCta.primaryCta.href}
      id="branding"
      title={finalCta.title}
    />
  );
}
