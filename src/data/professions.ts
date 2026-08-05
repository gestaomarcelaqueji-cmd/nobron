export type Profession = {
  id: string;
  label: string;
  title: string;
  description: string;
  cta: string;
  services: string[];
  accent: string;
  accentSoft: string;
  visual: "electric" | "fitness" | "photo" | "auto" | "nails";
};

export const professions: Profession[] = [
  {
    id: "eletricista",
    label: "Eletricista",
    title: "Eletricista em Telêmaco Borba",
    description: "Instalações, manutenção e reparos elétricos com segurança e qualidade.",
    cta: "Solicitar atendimento",
    services: ["Instalações elétricas", "Manutenção preventiva", "Reparos e diagnóstico"],
    accent: "#145cff",
    accentSoft: "#eaf0ff",
    visual: "electric",
  },
  {
    id: "personal",
    label: "Personal trainer",
    title: "Treinamento personalizado para sua rotina",
    description: "Acompanhamento próximo para transformar objetivos em uma rotina possível.",
    cta: "Agendar uma conversa",
    services: ["Treino individual", "Avaliação inicial", "Acompanhamento"],
    accent: "#ff7a1a",
    accentSoft: "#fff0e5",
    visual: "fitness",
  },
  {
    id: "fotografo",
    label: "Fotógrafo",
    title: "Fotografia para momentos que merecem ser lembrados",
    description: "Ensaios e eventos registrados com direção, sensibilidade e identidade.",
    cta: "Consultar disponibilidade",
    services: ["Casamentos", "Ensaios", "Aniversários"],
    accent: "#b56f44",
    accentSoft: "#f7eee8",
    visual: "photo",
  },
  {
    id: "autoeletricista",
    label: "Autoeletricista",
    title: "Diagnóstico e manutenção elétrica automotiva",
    description: "Avaliação clara para descobrir a origem do problema antes de trocar peças.",
    cta: "Solicitar diagnóstico",
    services: ["Bateria", "Alternador", "Motor de partida"],
    accent: "#20232b",
    accentSoft: "#edf0f4",
    visual: "auto",
  },
  {
    id: "nail-designer",
    label: "Nail designer",
    title: "Unhas personalizadas com atendimento em Telêmaco Borba",
    description: "Serviços, estilos e horários organizados para facilitar seu agendamento.",
    cta: "Agendar horário",
    services: ["Alongamento", "Banho de gel", "Nail art"],
    accent: "#e65d8e",
    accentSoft: "#fff0f5",
    visual: "nails",
  },
];
