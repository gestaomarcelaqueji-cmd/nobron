import { SITE_NAME, SITE_URL } from "@/lib/seo";
import type { JsonLd } from "@/lib/structured-data";

const caseUrl = `${SITE_URL}/cases/presenca-local-beleza`;

export const beautyCaseStructuredData: JsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${caseUrl}#webpage`,
      url: caseUrl,
      name: "Presença digital para profissionais de beleza | Case noBRon",
      description:
        "Projeto demonstrativo da noBRon para apresentar uma solução de presença digital para profissionais de beleza.",
      isPartOf: {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
      },
      about: {
        "@type": "Service",
        name: "Presença digital para profissionais de beleza",
        provider: {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: SITE_NAME,
          url: `${SITE_URL}/`,
        },
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${caseUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Início",
          item: `${SITE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Presença Local — Beleza",
          item: caseUrl,
        },
      ],
    },
  ],
};
