import type { Metadata } from "next";

export const SITE_NAME = "noBRon";

export const SITE_URL = "https://www.nobron.com.br";

export const SITE_LOCALE = "pt_BR";

export const SITE_LANGUAGE = "pt-BR";

export const DEFAULT_TITLE =
  "noBRon | Estratégia, Design, Sites, SEO e Automação";

export const DEFAULT_DESCRIPTION =
  "Estratégia, branding, sites, sistemas, SEO, marketing digital e automação para empresas que querem fortalecer sua presença, organizar processos e crescer com estrutura.";

export type SitePath = "/" | `/${string}`;

type PageMetadataOptions = {
  title: string;
  description: string;
  path: SitePath;
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
};

export function absoluteUrl(path: SitePath = "/"): string {
  return new URL(path, `${SITE_URL}/`).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const openGraphImages = image
    ? [
        {
          url: image,
          alt: imageAlt ?? title,
        },
      ]
    : undefined;

  const twitterImages = image ? [image] : undefined;

  return {
    title,

    description,

    alternates: {
      canonical: path,
    },

    openGraph: {
      type: "website",
      locale: SITE_LOCALE,
      siteName: SITE_NAME,
      url: path,
      title,
      description,

      ...(openGraphImages
        ? {
            images: openGraphImages,
          }
        : {}),
    },

    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,

      ...(twitterImages
        ? {
            images: twitterImages,
          }
        : {}),
    },

    ...(noIndex
      ? {
          robots: {
            index: false,
            follow: false,

            googleBot: {
              index: false,
              follow: false,
            },
          },
        }
      : {}),
  };
}