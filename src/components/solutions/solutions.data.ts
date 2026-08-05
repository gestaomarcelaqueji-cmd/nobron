import type {
  EntryPath,
  SolutionCategory,
} from "./solutions.types";

export const solutionCategories: SolutionCategory[] = [
  {
    id: "strategy",
    order: "01",
    eyebrow: "Direção",
    title: "Estratégia",
    headline:
      "Antes de aparecer, a empresa precisa saber para onde está indo.",
    description:
      "Entendemos o negócio, o público, a oferta e o objetivo para evitar que marca, site e marketing sejam construídos apenas por gosto ou tentativa.",
    href: "/solucoes/estrategia-direcao",
    visualWord: "RUMO",
    services: [
      "Diagnóstico do negócio",
      "Definição de objetivos",
      "Posicionamento",
      "Público e percepção",
      "Organização da oferta",
      "Planejamento de comunicação",
      "Estrutura de campanhas",
      "Plano de ação",
    ],
  },
  {
    id: "branding",
    order: "02",
    eyebrow: "Reconhecimento",
    title: "Branding e Design",
    headline:
      "Quando a direção está clara, a empresa precisa ser reconhecida.",
    description:
      "A identidade transforma estratégia em percepção. Cores, tipografia, linguagem e elementos visuais passam a comunicar quem é a empresa antes mesmo da conversa.",
    href: "/solucoes/branding-design",
    visualWord: "FORMA",
    services: [
      "Identidade visual",
      "Criação ou redesign de logotipo",
      "Cores e tipografia",
      "Direção visual",
      "Sistema de marca",
      "Materiais digitais",
      "Design para campanhas",
      "Templates e aplicações",
    ],
  },
  {
    id: "web",
    order: "03",
    eyebrow: "Estrutura própria",
    title: "Sites e Sistemas",
    headline:
      "A marca precisa de um lugar próprio para explicar, provar e converter.",
    description:
      "Criamos ambientes digitais que organizam informações, apresentam serviços, respondem dúvidas e conduzem a pessoa até a próxima ação.",
    href: "/solucoes/sites-sistemas",
    visualWord: "BASE",
    services: [
      "Sites institucionais",
      "Landing Pages",
      "Páginas de serviços",
      "Portfólios",
      "Catálogos digitais",
      "Sistemas personalizados",
      "Painéis administrativos",
      "Áreas de acompanhamento",
    ],
  },
  {
    id: "seo",
    order: "04",
    eyebrow: "Descoberta",
    title: "SEO e Presença Digital",
    headline:
      "Ter uma boa estrutura não basta se ninguém consegue encontrá-la.",
    description:
      "Organizamos a presença para que buscadores e pessoas entendam o que a empresa oferece, onde atua e por que aquela página merece aparecer.",
    href: "/solucoes/seo",
    visualWord: "ENCONTRO",
    services: [
      "SEO técnico",
      "Arquitetura de conteúdo",
      "Páginas otimizadas",
      "SEO local",
      "Google Business Profile",
      "Indexação",
      "Dados estruturados",
      "Acompanhamento de presença",
    ],
  },
  {
    id: "marketing",
    order: "05",
    eyebrow: "Movimento",
    title: "Marketing Digital",
    headline:
      "Com a base preparada, a comunicação começa a gerar movimento.",
    description:
      "Conectamos o que a empresa oferece às pessoas certas por meio de mensagem, canal, campanha e caminhos claros de conversão.",
    href: "/solucoes/marketing-digital",
    visualWord: "ALCANCE",
    services: [
      "Planejamento de marketing",
      "Estratégia de conteúdo",
      "Campanhas digitais",
      "Direção de comunicação",
      "Materiais para anúncios",
      "Criativos",
      "Ações de captação",
      "Acompanhamento de resultados",
    ],
  },
  {
    id: "automation",
    order: "06",
    eyebrow: "Continuidade",
    title: "Automação e Integrações",
    headline:
      "O crescimento não pode transformar tudo em mais trabalho manual.",
    description:
      "Conectamos ferramentas, informações e etapas para reduzir repetição, organizar contatos e preservar o tempo humano para o que exige decisão.",
    href: "/solucoes/automacao",
    visualWord: "FLUXO",
    services: [
      "Formulários inteligentes",
      "Integração com WhatsApp",
      "Organização de contatos",
      "Fluxos de atendimento",
      "Acompanhamento de leads",
      "Integração entre sistemas",
      "Painéis internos",
      "Processos personalizados",
    ],
  },
];

export const entryPaths: EntryPath[] = [
  {
    id: "start",
    number: "01",
    title: "Começar",
    headline:
      "Construir uma base coerente desde o início.",
    description:
      "Para negócios novos ou empresas que cresceram sem uma estrutura clara e agora precisam organizar direção, identidade e presença.",
    highlights: [
      "Definir o caminho",
      "Criar reconhecimento",
      "Preparar a estrutura digital",
    ],
  },
  {
    id: "strengthen",
    number: "02",
    title: "Fortalecer",
    headline:
      "Melhorar uma parte que já existe, mas não entrega o esperado.",
    description:
      "Entramos em um ponto específico sem obrigar a empresa a reconstruir tudo. O foco é identificar o gargalo e melhorar o que realmente interfere no resultado.",
    highlights: [
      "Revisar o que já existe",
      "Corrigir o ponto fraco",
      "Preservar o que funciona",
    ],
  },
  {
    id: "connect",
    number: "03",
    title: "Conectar",
    headline:
      "Fazer as partes trabalharem como uma única estrutura.",
    description:
      "Para empresas que já possuem marca, site, canais e ferramentas, mas percebem que cada parte funciona isoladamente e exige esforço demais.",
    highlights: [
      "Unificar comunicação",
      "Criar continuidade",
      "Reduzir trabalho desconectado",
    ],
  },
];
