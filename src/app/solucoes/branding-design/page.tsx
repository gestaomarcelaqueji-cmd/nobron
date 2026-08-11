import { BrandingPage } from "@/components/solutions/branding/BrandingPage/BrandingPage";
import { StructuredData } from "@/components/seo/StructuredData";

import { createPageMetadata } from "@/lib/seo";
import { createBreadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Branding e Design para Empresas | noBRon",

  description:
    "Branding, identidade visual, direção criativa e design para construir uma marca clara, reconhecível e coerente com o posicionamento da empresa.",

  path: "/solucoes/branding-design",
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
  {
    name: "Branding e Design",
    path: "/solucoes/branding-design",
  },
]);

export default function BrandingRoute() {
  return (
    <>
      <StructuredData
        id="nobron-branding-breadcrumb-jsonld"
        data={breadcrumbJsonLd}
      />

      <BrandingPage />
    </>
  );
}