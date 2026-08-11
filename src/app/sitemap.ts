import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";

const publicRoutes = [
  "/",
  "/sobre",
  "/solucoes",
  "/solucoes/estrategia-direcao",
  "/solucoes/branding-design",
  "/solucoes/sites-sistemas",
  "/solucoes/seo",
  "/solucoes/marketing-digital",
  "/solucoes/automacao",
  "/landing-page",
  "/prototipo-gratuito",
  "/contato",
  "/politica-de-privacidade",
  "/politica-de-cookies",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
  }));
}