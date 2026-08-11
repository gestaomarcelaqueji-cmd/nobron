import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

const noIndexHeader = [
  {
    key: "X-Robots-Tag",
    value: "noindex, nofollow",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: "/pagesolucoes",
        destination: "/solucoes",
        permanent: true,
      },
      {
        source: "/solucoes/estrategia",
        destination: "/solucoes/estrategia-direcao",
        permanent: true,
      },
      {
        source: "/solucoes/desenvolvimento-web",
        destination: "/solucoes/sites-sistemas",
        permanent: true,
      },
      {
        source: "/solucoes/seo-presenca-digital",
        destination: "/solucoes/seo",
        permanent: true,
      },
      {
        source: "/solucoes/automacao-integracoes",
        destination: "/solucoes/automacao",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/admin",
        headers: noIndexHeader,
      },
      {
        source: "/admin/:path*",
        headers: noIndexHeader,
      },
      {
        source: "/api",
        headers: noIndexHeader,
      },
      {
        source: "/api/:path*",
        headers: noIndexHeader,
      },
    ];
  },

  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;