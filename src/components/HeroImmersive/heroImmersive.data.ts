import { siteConfig } from "@/data/site";

import type {
  HeroAmbientWord,
  HeroPhase,
  HeroSolution,
  HeroSolutionId,
} from "./heroImmersive.types";

export const HERO_PHASE_ORDER: readonly HeroPhase[] = [
  "intro",
  "network-points",
  "network-connections",
  "observing",
  "portals",
  "interactive",
  "route-exit",
] as const;

export const HERO_PHASE_DELAYS = {
  "network-points": 0,
  "network-connections": 680,
  observing: 1_480,
  portals: 2_350,
  interactive: 4_450,
} as const satisfies Partial<Record<HeroPhase, number>>;

export const HERO_SOLUTIONS = [
  {
    id: "landing-page",
    label: "Landing Page",
    shortLabel: "Landing Page",
    description: `Uma página estratégica, publicada e mantida pela noBRon a partir de R$ ${siteConfig.price} por mês.`,
    href: "/landing-page",
    ambientLabel: "conversão",
    featured: true,
    order: 0,
    nodeIndex: 0,
    fallback: {
      desktop: { x: 52, y: 42 },
      mobile: { x: 50, y: 32 },
    },
  },
  {
    id: "strategy",
    label: "Estratégia e Direção",
    shortLabel: "Estratégia",
    description:
      "Organizamos objetivos, posicionamento, oferta e comunicação antes de definir o que precisa ser criado.",
    href: "/solucoes/estrategia",
    ambientLabel: "direção",
    featured: false,
    order: 1,
    nodeIndex: 5,
    fallback: {
      desktop: { x: 20, y: 27 },
      mobile: { x: 18, y: 24 },
    },
  },
  {
    id: "branding",
    label: "Branding e Design",
    shortLabel: "Branding",
    description:
      "Construímos identidades e materiais visuais capazes de representar e diferenciar a empresa.",
    href: "/solucoes/branding",
    ambientLabel: "design",
    featured: false,
    order: 2,
    nodeIndex: 11,
    fallback: {
      desktop: { x: 80, y: 27 },
      mobile: { x: 82, y: 24 },
    },
  },
  {
    id: "sites-systems",
    label: "Sites e Sistemas",
    shortLabel: "Sites",
    description:
      "Criamos páginas, sites e sistemas para apresentar, organizar, atender e diminuir tarefas repetidas.",
    href: "/solucoes/sites-sistemas",
    ambientLabel: "estrutura",
    featured: false,
    order: 3,
    nodeIndex: 17,
    fallback: {
      desktop: { x: 17, y: 62 },
      mobile: { x: 17, y: 52 },
    },
  },
  {
    id: "seo",
    label: "SEO e Presença Digital",
    shortLabel: "SEO",
    description:
      "Organizamos a presença para que buscadores e pessoas entendam o que a empresa oferece e onde atua.",
    href: "/solucoes/seo",
    ambientLabel: "descoberta",
    featured: false,
    order: 4,
    nodeIndex: 23,
    fallback: {
      desktop: { x: 83, y: 62 },
      mobile: { x: 83, y: 52 },
    },
  },
  {
    id: "marketing-digital",
    label: "Marketing Digital",
    shortLabel: "Marketing",
    description:
      "Planejamos campanhas, conteúdo e aquisição para movimentar a comunicação com direção e objetivo.",
    href: "/solucoes/marketing-digital",
    ambientLabel: "movimento",
    featured: false,
    order: 5,
    nodeIndex: 29,
    fallback: {
      desktop: { x: 34, y: 77 },
      mobile: { x: 32, y: 67 },
    },
  },
  {
    id: "automation",
    label: "Automação e Integrações",
    shortLabel: "Automação",
    description:
      "Conectamos ferramentas, dados e processos para reduzir repetição e dar continuidade à operação.",
    href: "/solucoes/automacao",
    ambientLabel: "continuidade",
    featured: false,
    order: 6,
    nodeIndex: 37,
    fallback: {
      desktop: { x: 67, y: 77 },
      mobile: { x: 68, y: 67 },
    },
  },
] as const satisfies readonly HeroSolution[];

export const HERO_SOLUTIONS_BY_ID = Object.fromEntries(
  HERO_SOLUTIONS.map((solution) => [solution.id, solution]),
) as Record<HeroSolutionId, (typeof HERO_SOLUTIONS)[number]>;

export const HERO_AMBIENT_WORDS = [
  { label: "estratégia", x: 35, y: 22 },
  { label: "design", x: 68, y: 20 },
  { label: "marketing", x: 67, y: 77 },
  { label: "automação", x: 31, y: 79 },
] as const satisfies readonly HeroAmbientWord[];

export const HERO_NAV_ITEMS = [
  {
    label: "Estratégia",
    href: "/solucoes/estrategia",
  },
  {
    label: "Branding",
    href: "/solucoes/branding",
  },
  {
    label: "Sites e Sistemas",
    href: "/solucoes/sites-sistemas",
  },
  {
    label: "SEO",
    href: "/solucoes/seo",
  },
  {
    label: "Marketing Digital",
    href: "/solucoes/marketing-digital",
  },
  {
    label: "Automação",
    href: "/solucoes/automacao",
  },
  {
    label: "Landing Page",
    href: "/landing-page",
  },
] as const;
