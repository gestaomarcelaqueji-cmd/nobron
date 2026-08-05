import type { RequestData } from "./prototype.types";

export const REQUEST_STEPS = [
  "Seu contato",
  "Sobre o negócio",
  "Materiais",
] as const;

export const CONSENT_OPTIONS = [
  {
    key: "materials",
    text: "Autorizo a noBRon a usar os dados, links e arquivos enviados para preparar esta demonstração.",
  },
  {
    key: "publicResearch",
    text: "Autorizo a consulta às informações públicas do negócio no Google e nas redes sociais informadas.",
  },
  {
    key: "videoOnly",
    text: "Estou ciente de que receberei uma apresentação em vídeo, sem publicação da página nem entrega do código nesta etapa.",
  },
  {
    key: "whatsapp",
    text: "Autorizo o contato pelo WhatsApp sobre esta solicitação.",
  },
] as const satisfies ReadonlyArray<{
  key: keyof RequestData["consents"];
  text: string;
}>;
