import type { Metadata } from "next";

export const SITE_NAME = "noBRon";

export const SITE_URL = "https://www.nobron.com.br";

export const SITE_LOCALE = "pt_BR";

export const SITE_LANGUAGE = "pt-BR";

export const BRAND_SLOGAN =
  "Feito no Brasil. Online no mundo.";

export const LOCAL_CITY = "Telêmaco Borba";

export const LOCAL_STATE = "Paraná";

export const LOCAL_COUNTRY = "Brasil";

export const DEFAULT_TITLE =
  "noBRon | Sites, SEO e Marketing Digital em Telêmaco Borba";

export const DEFAULT_DESCRIPTION =
  "Landing pages, sites institucionais, SEO e marketing digital para profissionais e empresas. noBRon, desenvolvida a partir de Telêmaco Borba, Paraná.";

export const DEFAULT_SOCIAL_IMAGE =
  "/brand/og/og-global.png";

export const DEFAULT_SOCIAL_IMAGE_ALT =
  "noBRon — Tecnologia e soluções digitais";

export const SOCIAL_IMAGE_WIDTH = 1200;

export const SOCIAL_IMAGE_HEIGHT = 630;

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

function absoluteAssetUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

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
  const socialImage = absoluteAssetUrl(
    image ?? DEFAULT_SOCIAL_IMAGE,
  );

  const socialImageAlt =
    imageAlt ?? DEFAULT_SOCIAL_IMAGE_ALT;

  return {
    title,

    description,

    alternates: {
      canonical: absoluteUrl(path),
    },

    openGraph: {
      type: "website",
      locale: SITE_LOCALE,
      siteName: SITE_NAME,
      url: absoluteUrl(path),
      title,
      description,

      images: [
        {
          url: socialImage,
          width: SOCIAL_IMAGE_WIDTH,
          height: SOCIAL_IMAGE_HEIGHT,
          alt: socialImageAlt,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
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
