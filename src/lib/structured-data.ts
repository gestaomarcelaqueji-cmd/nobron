import {
  absoluteUrl,
  BRAND_SLOGAN,
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  LOCAL_CITY,
  LOCAL_COUNTRY,
  LOCAL_STATE,
  SITE_LANGUAGE,
  SITE_NAME,
  SITE_URL,
  type SitePath,
} from "@/lib/seo";

export type BreadcrumbItem = {
  name: string;
  path: SitePath;
};

export type JsonLd = Record<string, unknown>;

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const HOME_PAGE_ID = `${SITE_URL}/#webpage`;
const TELEMACO_BORBA_ID = `${SITE_URL}/#telemaco-borba`;

export function createTelemacoBorbaJsonLd(): JsonLd {
  return {
    "@type": "City",
    "@id": TELEMACO_BORBA_ID,

    name: LOCAL_CITY,

    containedInPlace: {
      "@type": "State",
      name: LOCAL_STATE,

      containedInPlace: {
        "@type": "Country",
        name: LOCAL_COUNTRY,
      },
    },
  };
}

export function createOrganizationJsonLd(): JsonLd {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,

    name: SITE_NAME,

    url: SITE_URL,

    description: DEFAULT_DESCRIPTION,

    slogan: BRAND_SLOGAN,

    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/brand/logo-nobron.png"),
    },

    location: {
      "@id": TELEMACO_BORBA_ID,
    },

    areaServed: [
      {
        "@id": TELEMACO_BORBA_ID,
      },
      {
        "@type": "Country",
        name: LOCAL_COUNTRY,
      },
    ],

    knowsAbout: [
      "Landing pages",
      "Sites institucionais",
      "SEO",
      "Presença digital",
      "Marketing digital",
      "Branding e design",
      "Sites e sistemas",
      "Automação e integrações",
    ],
  };
}

export function createWebsiteJsonLd(): JsonLd {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,

    url: SITE_URL,

    name: SITE_NAME,

    description: DEFAULT_DESCRIPTION,

    inLanguage: SITE_LANGUAGE,

    about: {
      "@id": ORGANIZATION_ID,
    },

    publisher: {
      "@id": ORGANIZATION_ID,
    },
  };
}

export function createHomePageJsonLd(): JsonLd {
  return {
    "@type": "WebPage",
    "@id": HOME_PAGE_ID,

    url: SITE_URL,

    name: DEFAULT_TITLE,

    description: DEFAULT_DESCRIPTION,

    inLanguage: SITE_LANGUAGE,

    isPartOf: {
      "@id": WEBSITE_ID,
    },

    about: {
      "@id": ORGANIZATION_ID,
    },
  };
}

export function createHomeJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",

    "@graph": [
      createOrganizationJsonLd(),
      createWebsiteJsonLd(),
      createHomePageJsonLd(),
      createTelemacoBorbaJsonLd(),
    ],
  };
}

export function createBreadcrumbJsonLd(
  items: BreadcrumbItem[],
): JsonLd {
  return {
    "@context": "https://schema.org",

    "@type": "BreadcrumbList",

    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",

      position: index + 1,

      name: item.name,

      item: absoluteUrl(item.path),
    })),
  };
}
