export type SolutionCategoryId =
  | "strategy"
  | "branding"
  | "web"
  | "seo"
  | "marketing"
  | "automation";

export type SolutionCategory = {
  id: SolutionCategoryId;
  order: string;
  eyebrow: string;
  title: string;
  headline: string;
  description: string;
  href: string;
  services: string[];
  visualWord: string;
};

export type EntryPath = {
  id: "start" | "strengthen" | "connect";
  number: string;
  title: string;
  headline: string;
  description: string;
  highlights: string[];
};
