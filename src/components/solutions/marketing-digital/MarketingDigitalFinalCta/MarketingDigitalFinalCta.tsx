import { CategoryFinalCta } from "@/components/solutions/shared/CategoryFinalCta/CategoryFinalCta";
import { marketingDigitalPageData } from "@/data/solutions/marketingDigital";

export function MarketingDigitalFinalCta() {
  const { finalCta } = marketingDigitalPageData;

  return (
    <CategoryFinalCta
      cta={finalCta.cta}
      description={finalCta.description}
      href={finalCta.href}
      id="marketing-digital"
      title={finalCta.title}
    />
  );
}
