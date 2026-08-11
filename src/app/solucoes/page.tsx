import { DiagnosticSection } from "@/components/solutions/DiagnosticSection";
import { ServicesDirectory } from "@/components/solutions/ServicesDirectory";
import { SolutionsFinalCta } from "@/components/solutions/SolutionsFinalCta";
import { SolutionsHero } from "@/components/solutions/SolutionsHero";
import { StructuredData } from "@/components/seo/StructuredData";

import { createPageMetadata } from "@/lib/seo";
import { createBreadcrumbJsonLd } from "@/lib/structured-data";

import desktopStyles from "./solutions-page.desktop.module.css";
import mobileStyles from "./solutions-page.mobile.module.css";

const styles = {
  page: `${desktopStyles.page} ${mobileStyles.page}`,
};

export const metadata = createPageMetadata({
  title: "Soluções Digitais para Empresas | noBRon",

  description:
    "Estratégia, branding, sites, sistemas, SEO, marketing digital e automação conectados para fortalecer a estrutura digital da sua empresa.",

  path: "/solucoes",
});

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  {
    name: "Início",
    path: "/",
  },
  {
    name: "Soluções",
    path: "/solucoes",
  },
]);

export default function SolutionsPage() {
  return (
    <>
      <StructuredData
        id="nobron-solutions-breadcrumb-jsonld"
        data={breadcrumbJsonLd}
      />

      <main className={styles.page}>
        <SolutionsHero />
        <ServicesDirectory />
        <DiagnosticSection />
        <SolutionsFinalCta />
      </main>
    </>
  );
}