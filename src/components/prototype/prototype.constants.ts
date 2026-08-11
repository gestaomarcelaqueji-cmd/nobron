import type { RequestData } from "./prototype.types";

export const REQUEST_STEPS = [
  "Seu contato",
  "Sobre o negócio",
  "Materiais",
] as const;

export const CONSENT_OPTIONS = [
  {
    key: "publicResearch",
    text: "Autorizo a noBRon a consultar informações públicas do meu negócio no Google e nas redes sociais para complementar a criação deste protótipo.",
  },
] as const satisfies ReadonlyArray<{
  key: keyof RequestData["consents"];
  text: string;
}>;