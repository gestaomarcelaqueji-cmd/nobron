export type BrandingServiceCategory = {
  id: string;
  number: string;
  title: string;
  summary: string;
  preview: string;
  services: string[];
};

export type VisualEnvironment = {
  id: string;
  label: string;
  description: string;
  accent: string;
  accentSoft: string;
  surface: string;
  ink: string;
  radius: string;
  tracking: string;
};

export const brandingPageData = {
  slug: "branding-design",
  hero: {
    eyebrow: "02 — Branding e Design · Reconhecimento",
    title:
      "Não é só ter um logotipo. É fazer tudo o que sai da empresa parecer parte da mesma marca.",
    description:
      "Do post no Instagram à proposta enviada para um cliente, cada peça precisa conversar com a outra. Aqui entram a criação da identidade, a organização do visual e as artes que a empresa usa no dia a dia.",
    primaryCta: {
      label: "Organizar minha identidade",
      href: "/contato",
    },
    secondaryCta: {
      label: "Ver o que pode ser criado",
      href: "#branding-servicos",
    },
  },

  recognition: {
    eyebrow: "Quando o visual começa a se perder",
    title:
      "Talvez sua empresa já tenha uma logo. O problema pode estar em tudo o que vem depois dela.",
    description:
      "A falta de uma base visual aparece na rotina: cada material toma um rumo, toda arte começa do zero e ninguém sabe direito o que combina com a marca.",
    signals: [
      "O Instagram tem uma aparência e o site tem outra.",
      "As cores e fontes mudam de uma peça para outra.",
      "Toda publicação precisa ser pensada do zero.",
      "A logo funciona em um lugar, mas fica ruim em outros formatos.",
      "A proposta comercial não parece ter relação com as redes sociais.",
      "O visual atual já não acompanha o momento da empresa.",
      "Os materiais passam uma sensação mais improvisada do que o serviço é.",
      "Existe uma logo, mas não existe um sistema para usar no dia a dia.",
    ],
  },

  constructionIntro: {
    eyebrow: "Da peça solta para um sistema visual",
    firstLine: "TER UMA LOGO",
    secondLine: "TER UMA MARCA QUE FUNCIONA",
    description:
      "Uma identidade vai ganhando forma por camadas. Primeiro vem a estrutura. Depois entram tipografia, cor, composição e as regras que mantêm tudo reconhecível em diferentes formatos.",
  },

  blueprint: {
    number: "01",
    label: "Estrutura",
    title: "Antes do visual final, existe uma base.",
    description:
      "Proporção, alinhamento e organização ajudam a marca a funcionar em tamanhos, formatos e situações diferentes.",
    instruction: "Passe o cursor sobre a logo para revelar o preenchimento",
    tags: [
      "Logotipo",
      "Redesign",
      "Símbolo",
      "Monograma",
      "Versões reduzidas",
      "Área de proteção",
    ],
  },

  form: {
    number: "02",
    label: "Forma",
    title: "Cor, tipografia e composição começam a dar personalidade à estrutura.",
    description:
      "Essas escolhas precisam representar o jeito da empresa e continuar funcionando juntas, não importa o material.",
    letters: ["A", "a", "B", "b", "R", "n", "o", "G", "g", "M", "m", "T"],
    colors: [
      { name: "Preto", hex: "#050505" },
      { name: "Branco", hex: "#f7f7f3" },
      { name: "Cobalto", hex: "#275efe" },
      { name: "Ciano", hex: "#24d6e8" },
      { name: "Violeta", hex: "#8b5cf6" },
      { name: "Coral", hex: "#ff6b5f" },
    ],
  },

  system: {
    number: "03",
    label: "Sistema",
    title: "A identidade precisa continuar funcionando depois que a logo fica pronta.",
    description:
      "Criamos uma base que ajuda diferentes materiais a manter a mesma linguagem sem deixar tudo igual.",
    layouts: [
      { id: "post", label: "Post" },
      { id: "proposal", label: "Proposta" },
      { id: "banner", label: "Campanha" },
      { id: "page", label: "Página" },
    ],
    modules: [
      "Logo",
      "Título",
      "Texto",
      "Imagem",
      "Botão",
      "Selo",
      "Ícone",
      "Padrão",
    ],
  },

  applications: {
    number: "04",
    label: "Aplicação",
    title: "É no uso real que a identidade mostra se funciona.",
    description:
      "A mesma base precisa acompanhar uma campanha, uma proposta, uma publicação ou uma página sem perder reconhecimento.",
    items: [
      { name: "Feed", size: "1080 × 1080", type: "social" },
      { name: "Story", size: "1080 × 1920", type: "story" },
      { name: "Anúncio", size: "1200 × 628", type: "ad" },
      { name: "Proposta", size: "A4 digital", type: "document" },
      { name: "Landing page", size: "Responsiva", type: "web" },
      { name: "WhatsApp", size: "Atendimento", type: "chat" },
    ],
  },

  adaptation: {
    title:
      "A mesma marca precisa funcionar em situações diferentes.",
    description:
      "Um post, uma proposta e uma página podem ter ritmos diferentes sem parecer que vieram de empresas diferentes.",
    formats: [
      {
        id: "post",
        label: "Post",
      },
      {
        id: "proposal",
        label: "Proposta",
      },
      {
        id: "landing",
        label: "Landing page",
      },
    ],
    content: {
      eyebrow: "Novo serviço",
      title:
        "Estratégia, design e tecnologia para organizar sua presença digital.",
      description:
        "Uma estrutura conectada para apresentar, atender e vender melhor.",
      cta: "Conhecer solução",
      signature: "Feito no Brasil, online no mundo.",
      socialMeta: "CONTEÚDO / 01",
      services: ["Estratégia", "Design", "Tecnologia"],
      navigation: ["Soluções", "Processo", "Contato"],
      proposalEyebrow: "Projeto digital",
      proposalTitle:
        "Proposta para organizar a presença da empresa.",
      proposalDescription:
        "Uma direção conectando comunicação, estrutura digital e materiais de atendimento.",
      proposalObjective:
        "Criar uma base clara para apresentar os serviços e conduzir o cliente até o contato.",
      proposalSteps: [
        "Entendimento do cenário",
        "Definição da direção",
        "Construção das soluções",
        "Aplicação e acompanhamento",
      ],
    },
    environments: [
      {
        id: "editorial",
        label: "Editorial",
        description: "Mais respiro, contraste tipográfico e composição assimétrica.",
        accent: "#ff6b5f",
        accentSoft: "rgba(255, 107, 95, 0.18)",
        surface: "#f5efe7",
        ink: "#17120f",
        radius: "0px",
        tracking: "-0.04em",
      },
      {
        id: "institutional",
        label: "Institucional",
        description: "Hierarquia clara, alinhamentos firmes e tom mais contido.",
        accent: "#1d4ed8",
        accentSoft: "rgba(29, 78, 216, 0.14)",
        surface: "#eef2f7",
        ink: "#111827",
        radius: "12px",
        tracking: "-0.02em",
      },
      {
        id: "commercial",
        label: "Comercial",
        description: "Chamadas diretas, contraste maior e foco na oferta.",
        accent: "#ff3d00",
        accentSoft: "rgba(255, 61, 0, 0.16)",
        surface: "#fff6e8",
        ink: "#1b120c",
        radius: "22px",
        tracking: "-0.03em",
      },
      {
        id: "technology",
        label: "Tecnológico",
        description: "Grid, dados, linhas e microinterações de precisão.",
        accent: "#24d6e8",
        accentSoft: "rgba(36, 214, 232, 0.16)",
        surface: "#061013",
        ink: "#f3feff",
        radius: "8px",
        tracking: "-0.025em",
      },
      {
        id: "minimal",
        label: "Minimalista",
        description: "Poucos elementos, escala tipográfica e bastante espaço.",
        accent: "#111111",
        accentSoft: "rgba(17, 17, 17, 0.08)",
        surface: "#f8f8f5",
        ink: "#111111",
        radius: "999px",
        tracking: "-0.055em",
      },
      {
        id: "expressive",
        label: "Expressivo",
        description: "Cor, recortes e movimento com mais liberdade visual.",
        accent: "#8b5cf6",
        accentSoft: "rgba(139, 92, 246, 0.18)",
        surface: "#fff2fb",
        ink: "#25102b",
        radius: "32px",
        tracking: "-0.035em",
      },
    ] as VisualEnvironment[],
  },

  services: {
    eyebrow: "O que pode ser criado",
    title: "Uma identidade completa ou só o material que está fazendo falta agora.",
    description:
      "A entrega depende do que já existe e do que a empresa realmente usa. Selecione uma área para ver as possibilidades.",
    categories: [
      {
        id: "identity",
        number: "01",
        title: "Marca e identidade",
        summary: "A base visual que organiza como a empresa aparece.",
        preview: "Identidade visual",
        services: [
          "Criação de logotipo",
          "Redesign de logotipo",
          "Símbolo ou monograma",
          "Versão horizontal e vertical",
          "Versões reduzidas",
          "Aplicação clara e escura",
          "Área de proteção e tamanho mínimo",
          "Paleta de cores",
          "Tipografia principal e de apoio",
          "Elementos gráficos",
          "Padrões e texturas",
          "Ícones personalizados",
          "Direção de imagens e fotografia",
          "Estilo de ilustração",
          "Manual de identidade visual",
          "Guia rápido de uso",
          "Organização de uma identidade existente",
        ],
      },
      {
        id: "social",
        number: "02",
        title: "Redes sociais",
        summary: "Peças recorrentes que mantêm o perfil organizado.",
        preview: "Sistema social",
        services: [
          "Artes para feed",
          "Carrosséis",
          "Stories",
          "Capas para Reels",
          "Capas de destaques",
          "Imagem de perfil",
          "Capa para Facebook e LinkedIn",
          "Miniaturas para YouTube",
          "Templates editáveis",
          "Posts informativos",
          "Posts promocionais",
          "Comunicados",
          "Datas comemorativas",
          "Divulgação de serviços e produtos",
          "Depoimentos e avaliações",
          "Antes e depois",
          "Abertura de agenda",
          "Vagas e oportunidades",
          "Kits visuais para lançamentos",
        ],
      },
      {
        id: "campaigns",
        number: "03",
        title: "Anúncios e campanhas",
        summary: "Uma ideia visual adaptada aos formatos da campanha.",
        preview: "Key visual",
        services: [
          "Criativos para anúncios",
          "Artes para Meta Ads",
          "Artes para Google Display",
          "Banners digitais",
          "Campanhas promocionais",
          "Campanhas sazonais",
          "Campanhas de lançamento",
          "Identidade visual de campanha",
          "Key visual",
          "Variações de formato",
          "Artes para remarketing",
          "Banners para sites",
          "Pop-ups e chamadas promocionais",
          "Imagens para landing pages",
          "Peças para e-mail marketing",
          "Artes para WhatsApp",
        ],
      },
      {
        id: "commercial",
        number: "04",
        title: "Materiais comerciais",
        summary: "Materiais que ajudam a apresentar e vender melhor.",
        preview: "Apresentação",
        services: [
          "Apresentação institucional",
          "Apresentação de serviços",
          "Proposta comercial",
          "Orçamento personalizado",
          "Portfólio",
          "Mídia kit",
          "Catálogo de produtos",
          "Catálogo de serviços",
          "Cardápio digital",
          "Tabela de preços",
          "PDF de apresentação",
          "Material para equipe comercial",
          "Folheto digital",
          "Cartão digital",
          "Assinatura de e-mail",
          "Capa para documentos",
          "Modelo de relatório",
          "Certificados",
          "Fichas e materiais de apoio",
        ],
      },
      {
        id: "whatsapp",
        number: "05",
        title: "Atendimento e WhatsApp",
        summary: "Peças rápidas para organizar a conversa com o cliente.",
        preview: "Fluxo de atendimento",
        services: [
          "Catálogo para WhatsApp",
          "Cards de serviços",
          "Cards de preços",
          "Apresentação rápida da empresa",
          "Mensagens visuais para atendimento",
          "Imagens de boas-vindas",
          "Avisos de horário",
          "Informativos",
          "Passo a passo de contratação",
          "Instruções de pagamento",
          "Confirmações de pedido",
          "Cards para envio de orçamento",
          "Materiais para pós-venda",
        ],
      },
      {
        id: "web",
        number: "06",
        title: "Sites e páginas",
        summary: "Direção visual para manter o digital conectado à marca.",
        preview: "Interface",
        services: [
          "Direção visual para sites",
          "Direção visual para landing pages",
          "Banners",
          "Ícones",
          "Ilustrações",
          "Mockups",
          "Imagens de seção",
          "Elementos gráficos para páginas",
          "Kit visual para interfaces",
          "Padronização entre site e redes sociais",
          "Tratamento visual de seções",
        ],
      },
      {
        id: "events",
        number: "07",
        title: "Eventos e ações",
        summary: "Uma linguagem única aplicada a todos os pontos do evento.",
        preview: "Evento",
        services: [
          "Identidade visual de eventos",
          "Convites digitais",
          "Programação",
          "Credenciais",
          "Certificados",
          "Apresentações",
          "Telas para projeção",
          "Artes para divulgação",
          "Materiais para patrocinadores",
          "Sinalização digital",
          "Peças para inscrições",
          "Kits de lançamento",
          "Campanhas internas",
          "Comunicação para equipes",
        ],
      },
      {
        id: "content",
        number: "08",
        title: "Conteúdo e materiais educativos",
        summary: "Informação organizada para ficar mais fácil de ler e usar.",
        preview: "Conteúdo",
        services: [
          "Infográficos",
          "E-books",
          "Guias",
          "Checklists",
          "Capas de materiais",
          "Diagramação de PDFs",
          "Materiais educativos",
          "Estudos de caso",
          "Relatórios visuais",
          "Apresentações de resultados",
          "Gráficos personalizados",
          "Linha visual para artigos e blog",
          "Templates para conteúdo recorrente",
        ],
      },
    ] as BrandingServiceCategory[],
  },

  outcome: {
    eyebrow: "O que muda na rotina",
    title:
      "A empresa não precisa usar a mesma arte em todo lugar. Precisa ter uma base que mantenha tudo conectado.",
    transformations: [
      { from: "Peças soltas", to: "Uma linguagem visual" },
      { from: "Começar sempre do zero", to: "Trabalhar com uma base definida" },
      { from: "Materiais desconectados", to: "Pontos de contato reconhecíveis" },
      { from: "Uma logo isolada", to: "Uma identidade que funciona" },
    ],
  },

  finalCta: {
    title: "Você não precisa contratar tudo de uma vez.",
    description:
      "Primeiro entendemos o que já existe, onde o visual está se perdendo e quais materiais fazem parte da rotina da empresa. A partir disso, organizamos uma identidade completa ou só o conjunto de peças necessário agora.",
    primaryCta: {
      label: "Organizar a identidade da minha empresa",
      href: "/contato",
    },
    secondaryCta: {
      label: "Preciso de um material específico",
      href: "/contato?assunto=branding-material",
    },
  },
};
