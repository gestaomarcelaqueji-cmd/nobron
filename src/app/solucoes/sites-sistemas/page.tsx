import { StructuredData } from "@/components/seo/StructuredData";
import { SitesSystemsPage } from "@/components/solutions/sites-systems/SitesSystemsPage/SitesSystemsPage";

import { createPageMetadata } from "@/lib/seo";
import { createBreadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Sites e Sistemas para Empresas | noBRon",

  description:
    "Sites, landing pages e sistemas sob medida para apresentar serviços, organizar processos, melhorar o atendimento e apoiar a operação digital da empresa.",

  path: "/solucoes/sites-sistemas",
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
    name: "Sites e Sistemas",
    path: "/solucoes/sites-sistemas",
  },
]);

export default function SitesSystemsRoute() {
  return (
    <>
      <StructuredData
        id="nobron-sites-systems-breadcrumb-jsonld"
        data={breadcrumbJsonLd}
      />

      <SitesSystemsPage />
    </>
  );
}