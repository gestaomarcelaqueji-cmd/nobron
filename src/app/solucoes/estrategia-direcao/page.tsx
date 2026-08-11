import { StructuredData } from "@/components/seo/StructuredData";
import { StrategyPage } from "@/components/solutions/strategy/StrategyPage/StrategyPage";

import { createPageMetadata } from "@/lib/seo";
import { createBreadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Estratégia e Direção para Empresas | noBRon",

  description:
    "Diagnóstico do negócio, objetivos, posicionamento, público, oferta, comunicação e plano de ação para transformar possibilidades em prioridades e decisões claras.",

  path: "/solucoes/estrategia-direcao",
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
    name: "Estratégia e Direção",
    path: "/solucoes/estrategia-direcao",
  },
]);

export default function StrategyRoute() {
  return (
    <>
      <StructuredData
        id="nobron-strategy-breadcrumb-jsonld"
        data={breadcrumbJsonLd}
      />

      <StrategyPage />
    </>
  );
}