import {
  absoluteUrl,
  DEFAULT_DESCRIPTION,
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

export function createOrganizationJsonLd(): JsonLd {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,

    name: SITE_NAME,

    url: SITE_URL,

    description: DEFAULT_DESCRIPTION,

    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/brand/logo-nobron.png"),
    },
  };
}

export function createWebsiteJsonLd(): JsonLd {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,

    url: SITE_URL,

    name: SITE_NAME,

    inLanguage: SITE_LANGUAGE,

    publisher: {
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