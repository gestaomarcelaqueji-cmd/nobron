import { PrototypeRequest } from "@/components/prototype/PrototypeRequest";
import { StructuredData } from "@/components/seo/StructuredData";

import { createPageMetadata } from "@/lib/seo";
import { createBreadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Protótipo Gratuito de Landing Page | noBRon",

  description:
    "Solicite gratuitamente uma proposta visual de Landing Page pensada para o seu negócio e veja como sua presença digital pode ser estruturada antes de contratar.",

  path: "/prototipo-gratuito",

  image: "/brand/og/og-prototipo-gratuito.png",

  imageAlt:
    "noBRon — Protótipo gratuito de Landing Page",
});

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  {
    name: "Início",
    path: "/",
  },
  {
    name: "Protótipo Gratuito",
    path: "/prototipo-gratuito",
  },
]);

export default function FreePrototypePage() {
  return (
    <>
      <StructuredData
        id="nobron-free-prototype-breadcrumb-jsonld"
        data={breadcrumbJsonLd}
      />

      <PrototypeRequest />
    </>
  );
}
