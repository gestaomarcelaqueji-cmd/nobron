import { whatsappMessages } from "@/data/site";
import { createWhatsAppUrl } from "@/lib/whatsapp";

import type { BeautyPageData } from "./beauty.types";

export const naraValeData: BeautyPageData = {
  mode: "case",
  showDemoBadge: true,
  brand: {
    name: "Nara Vale",
    specialty: "Nail Designer",
    city: "Telêmaco Borba",
    region: "PR",
  },
  theme: {
    background: "#F4F0EA",
    foreground: "#111111",
    accent: "#6A1F2B",
    secondary: "#D2C3B2",
    surface: "#FBF8F3",
    line: "rgba(17,17,17,0.14)",
  },
  contact: {},
  hero: {
    eyebrow: "Nail Designer · Telêmaco Borba",
    title: "Nara Vale",
    description:
      "Alongamento em gel, banho de gel, esmaltação e nail art com atendimento com hora marcada.",
    serviceHighlights: ["Alongamento", "Gel", "Nail Art"],
    image: "/cases/beauty/nara-vale/hero.png",
  },
  services: [
    {
      id: "alongamento",
      name: "Alongamento em gel",
      shortName: "Alongamento",
      description:
        "Estrutura e comprimento personalizados conforme o resultado desejado.",
      image: "/cases/beauty/nara-vale/service-alongamento.webp",
    },
    {
      id: "banho-de-gel",
      name: "Banho de gel",
      shortName: "Banho de gel",
      description:
        "Reforço sobre a unha natural com acabamento uniforme e proporção equilibrada.",
      image: "/cases/beauty/nara-vale/service-banho-gel.webp",
    },
    {
      id: "esmaltacao",
      name: "Esmaltação em gel",
      shortName: "Esmaltação",
      description:
        "Cor e acabamento uniforme para quem procura praticidade no dia a dia.",
      image: "/cases/beauty/nara-vale/service-esmaltacao.webp",
    },
    {
      id: "nail-art",
      name: "Nail Art",
      shortName: "Nail Art",
      description:
        "Composições desenvolvidas a partir de referências, estilo e preferências da cliente.",
      image: "/cases/beauty/nara-vale/service-nail-art.webp",
    },
    {
      id: "manutencao",
      name: "Manutenção",
      shortName: "Manutenção",
      description:
        "Renovação do trabalho existente para acompanhar o crescimento e preservar o acabamento.",
      image: "/cases/beauty/nara-vale/service-manutencao.webp",
    },
  ],
  works: [
    {
      id: "work-01",
      serviceId: "alongamento",
      category: "Alongamento",
      title: "Alongamento natural",
      description: "Formato almond · acabamento natural",
      image: "/cases/beauty/nara-vale/work-01-alongamento.webp",
      alt: "Unhas alongadas em tom nude com acabamento brilhante",
      featured: true,
    },
    {
      id: "work-02",
      serviceId: "nail-art",
      category: "Nail Art",
      title: "Nail art editorial",
      description: "Composição gráfica · detalhes finos",
      image: "/cases/beauty/nara-vale/work-02-nail-art.webp",
      alt: "Unhas vinho com detalhe artístico dourado",
      featured: true,
    },
    {
      id: "work-03",
      serviceId: "banho-de-gel",
      category: "Gel",
      title: "Banho de gel",
      description: "Estrutura leve · brilho uniforme",
      image: "/cases/beauty/nara-vale/work-03-banho-gel.webp",
      alt: "Unhas nude com banho de gel e acabamento uniforme",
      featured: true,
    },
    {
      id: "work-04",
      serviceId: "esmaltacao",
      category: "Esmaltação",
      title: "Esmaltação vinho",
      description: "Cor profunda · acabamento uniforme",
      image: "/cases/beauty/nara-vale/work-04-esmaltacao-vinho.webp",
      alt: "Unhas longas esmaltadas em vinho com acabamento brilhante",
      featured: true,
    },
    {
      id: "work-05",
      serviceId: "alongamento",
      category: "Alongamento",
      title: "Francesinha fina",
      description: "Estrutura delicada · ponta marfim",
      image: "/cases/beauty/nara-vale/work-05-francesinha.webp",
      alt: "Alongamento com francesinha branca fina",
    },
    {
      id: "work-06",
      serviceId: "nail-art",
      category: "Nail Art",
      title: "Traço minimalista",
      description: "Base neutra · desenho linear",
      image: "/cases/beauty/nara-vale/work-06-delicado.webp",
      alt: "Unhas nude com detalhe delicado de pedrarias",
    },
  ],
  beforeAfter: [
    {
      id: "before-after-demo",
      title: "Antes e depois",
      serviceId: "alongamento",
      demonstrationOnly: true,
    },
  ],
  professional: {
    title: "Eu sou Nara Vale.",
    image: "/cases/beauty/nara-vale/hero.png",
    description:
      "Meu trabalho parte de forma, acabamento e atenção aos detalhes. Cada procedimento é alinhado conforme a referência e o resultado procurado.",
    facts: ["Nail Designer", "Telêmaco Borba", "Atendimento com hora marcada"],
  },
  reviews: [],
  location: {
    city: "Telêmaco Borba",
    region: "PR",
    description: "Atendimento com horário marcado.",
  },
  faq: [
    {
      id: "agendamento",
      question: "Como funciona o agendamento?",
      answer:
        "No projeto real, o botão de agendamento pode levar ao WhatsApp ou à ferramenta de agenda já utilizada pela profissional.",
    },
    {
      id: "referencia",
      question: "Posso enviar uma referência antes do horário?",
      answer:
        "Sim. A presença pode orientar a cliente a enviar referências e informações importantes antes do atendimento.",
    },
    {
      id: "procedimento",
      question: "Como escolho o procedimento?",
      answer:
        "Os serviços são apresentados com descrição clara e trabalhos relacionados para facilitar a escolha.",
    },
    {
      id: "localizacao",
      question: "Onde acontece o atendimento?",
      answer:
        "No site real entram endereço, mapa ou área de atendimento conforme a operação da profissional.",
    },
  ],
  finalCta: {
    title: "Já escolheu o seu?",
    description: "Em um projeto real, daqui a cliente segue direto para o agendamento.",
  },
  nobronCta: {
    eyebrow: "Projeto demonstrativo noBRon",
    title: "Agora imagine essa experiência com a sua marca.",
    description:
      "Seus serviços, seus trabalhos, seu contato e uma estrutura própria para apresentar o seu negócio.",
    href: createWhatsAppUrl(whatsappMessages.beautyCase),
    label: "Quero uma versão para meu negócio",
  },
};
