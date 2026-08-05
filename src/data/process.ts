import { Eye, FileText, MessagesSquare, Rocket, Target, PanelsTopLeft } from "lucide-react";

export const processSteps = [
  {
    title: "Conhecemos seu serviço",
    description: "Você responde perguntas simples e envia o que já possui.",
    icon: MessagesSquare,
  },
  {
    title: "Organizamos a estratégia",
    description: "Definimos o que precisa aparecer e em qual ordem.",
    icon: Target,
  },
  {
    title: "Criamos os textos",
    description: "Suas informações viram uma comunicação clara e profissional.",
    icon: FileText,
  },
  {
    title: "Desenvolvemos o visual",
    description: "Aplicamos cores, imagens, identidade e movimento.",
    icon: PanelsTopLeft,
  },
  {
    title: "Você revisa",
    description: "Você confere informações e solicita os ajustes previstos.",
    icon: Eye,
  },
  {
    title: "Publicamos",
    description: "Depois da aprovação, sua página é colocada no ar.",
    icon: Rocket,
  },
] as const;
