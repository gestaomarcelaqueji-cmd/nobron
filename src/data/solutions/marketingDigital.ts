export type MarketingRole = {
  number: string;
  title: string;
  responsibility: string;
  examples: string[];
};

export type MarketingService = {
  number: string;
  title: string;
  summary: string;
  details: string[];
  resolves: string;
};

export type MarketingScenario = {
  number: string;
  title: string;
  today: string;
  withDirection: string;
};

export const marketingDigitalPageData = {
  hero: {
    title: "Marketing Digital",
    description:
      "Planejamos objetivos, ofertas, públicos, mensagens, criativos, anúncios, páginas, rastreamento e acompanhamento para transformar divulgação em campanhas com direção.",
  },

  definition: {
    eyebrow: "Antes de falar em anúncio",
    title: "Marketing não é postar, anunciar e vender ao mesmo tempo.",
    description:
      "Marketing organiza como a empresa chega ao mercado: o que oferece, para quem, com qual mensagem, em qual canal, por qual caminho e como o resultado será entendido.",
    support:
      "Quando estratégia, design, conteúdo, mídia e comercial recebem o mesmo nome, fica difícil saber onde a campanha está funcionando e onde o processo está quebrando.",
    words: [
      "Objetivo",
      "Oferta",
      "Público",
      "Mensagem",
      "Canal",
      "Página",
      "Atendimento",
      "Medição",
    ],
  },

  campaign: {
    eyebrow: "Campanha antes da mídia",
    title: "O anúncio é uma etapa. Não o começo.",
    description:
      "Antes de colocar orçamento em uma plataforma, organizamos o caminho inteiro. Isso reduz improviso, melhora a leitura dos resultados e evita pagar para levar pessoas até uma mensagem confusa.",
    relatedPage: {
      prefix:
        "Quando o destino precisa apresentar uma oferta específica e conduzir a pessoa até uma ação, uma",
      label: "Landing Page",
      suffix:
        "pode fazer parte da estrutura da campanha.",
      href: "/landing-page",
    },
    steps: [
      {
        number: "01",
        title: "Objetivo",
        description:
          "Definir o que precisa acontecer: gerar procura, apresentar uma oferta, receber contatos, vender ou recuperar interesse.",
      },
      {
        number: "02",
        title: "Oferta",
        description:
          "Deixar claro o que está sendo apresentado, para quem, em quais condições e por que aquilo merece atenção.",
      },
      {
        number: "03",
        title: "Público",
        description:
          "Entender quem pode se beneficiar, o que essa pessoa já sabe e em qual momento da decisão ela está.",
      },
      {
        number: "04",
        title: "Mensagem",
        description:
          "Organizar o argumento principal, as informações de apoio e a ação esperada.",
      },
      {
        number: "05",
        title: "Criativo",
        description:
          "Transformar a direção em texto, imagem, vídeo ou peça capaz de interromper, explicar e conduzir.",
      },
      {
        number: "06",
        title: "Destino",
        description:
          "Preparar a página, formulário, conversa ou ambiente que recebe a pessoa depois do clique.",
      },
      {
        number: "07",
        title: "Medição",
        description:
          "Configurar o que será acompanhado para diferenciar alcance, interesse, oportunidade e resultado.",
      },
      {
        number: "08",
        title: "Continuidade",
        description:
          "Organizar o que acontece depois do contato para que o investimento não termine em uma mensagem esquecida.",
      },
    ],
  },

  roles: {
    eyebrow: "Funções diferentes",
    title: "Tudo trabalha junto. Nem tudo é a mesma função.",
    description:
      "Uma campanha depende de competências diferentes. Separar responsabilidades não cria distância: cria clareza para que cada parte seja bem executada.",
    support:
      "Na noBRon, estratégia, direção de campanha, design, páginas, rastreamento e operação de mídia podem ser organizados na mesma estrutura. O trabalho também pode se conectar ao comercial, aos criadores e à equipe que a empresa já possui.",
    items: [
      {
        number: "01",
        title: "Marketing",
        responsibility:
          "Organiza objetivo, oferta, público, posicionamento, mensagem, canais, campanha e leitura de resultado.",
        examples: [
          "Planejamento",
          "Direção da campanha",
          "Definição de público",
          "Estratégia de canais",
          "Acompanhamento",
        ],
      },
      {
        number: "02",
        title: "Design",
        responsibility:
          "Transforma a direção em uma linguagem visual coerente, legível e capaz de chamar atenção sem perder a identidade da empresa.",
        examples: [
          "Peças para anúncios",
          "Variações visuais",
          "Landing pages",
          "Direção de arte",
          "Adaptações de formato",
        ],
      },
      {
        number: "03",
        title: "Criação de conteúdo",
        responsibility:
          "Produz o material que alimenta a comunicação: roteiro, gravação, fotografia, edição, texto e publicação, conforme o formato.",
        examples: [
          "Roteiros",
          "Captação",
          "Edição",
          "Conteúdo recorrente",
          "Material de campanha",
        ],
      },
      {
        number: "04",
        title: "Comercial",
        responsibility:
          "Recebe oportunidades, entende a necessidade, apresenta condições, acompanha a decisão e conduz a negociação.",
        examples: [
          "Contato",
          "Qualificação",
          "Proposta",
          "Negociação",
          "Fechamento",
        ],
      },
    ] satisfies MarketingRole[],
  },

  channels: {
    eyebrow: "Canais com comportamentos diferentes",
    title: "A mesma campanha não funciona igual em todos os lugares.",
    description:
      "O canal precisa combinar com a intenção da pessoa, o tipo de oferta e o momento em que a empresa quer aparecer.",
    tabs: [
      {
        id: "google",
        label: "Google Ads",
        title: "A pessoa já está procurando.",
        description:
          "Campanhas de busca aparecem quando alguém escreve uma necessidade, um serviço, um produto ou uma localização. A mensagem precisa corresponder à procura e levar para uma página preparada para continuar aquela conversa.",
        points: [
          "Demanda já existente",
          "Palavras e intenção de busca",
          "Página diretamente relacionada",
          "Localização e horário podem importar",
          "Leitura de termos e conversões",
        ],
        relatedPage: {
          prefix:
            "Para estruturar também a presença orgânica nas buscas, conheça",
          label: "SEO e Presença Digital",
          href: "/solucoes/seo",
        },
      },
      {
        id: "social",
        label: "Meta Ads",
        title: "A campanha precisa conquistar atenção.",
        description:
          "Nas redes sociais, a pessoa geralmente não abriu o aplicativo para procurar a empresa. O criativo, a mensagem e a repetição precisam gerar reconhecimento ou interesse sem depender de uma busca ativa.",
        points: [
          "Descoberta e interrupção",
          "Força do criativo",
          "Públicos e sinais de interesse",
          "Frequência e variações",
          "Testes de mensagem e formato",
        ],
        relatedPage: null,
      },
    ],
  },

  servicesIntro: {
    eyebrow: "O que pode ser feito",
    title: "Da direção da campanha ao que acontece depois do clique.",
    description:
      "O escopo pode começar por uma campanha específica ou organizar uma estrutura contínua. Cada serviço existe para resolver uma parte do caminho.",
  },

  services: [
    {
      number: "01",
      title: "Diagnóstico e definição de objetivo",
      summary:
        "Analisamos o momento da empresa, o que já foi tentado e qual resultado a campanha precisa buscar.",
      details: [
        "Objetivo principal e resultados intermediários",
        "Histórico de campanhas",
        "Oferta atual",
        "Canais já utilizados",
        "Capacidade de atendimento e continuidade",
      ],
      resolves:
        "Evita iniciar uma campanha apenas porque a empresa acredita que precisa anunciar, sem definir o que deve acontecer depois.",
    },
    {
      number: "02",
      title: "Organização da oferta e do público",
      summary:
        "Estruturamos o que será apresentado, para quem e em qual momento da decisão.",
      details: [
        "Produto, serviço ou condição principal",
        "Benefício e argumento central",
        "Públicos prioritários",
        "Regiões atendidas",
        "Restrições, preço e disponibilidade",
      ],
      resolves:
        "Reduz campanhas amplas demais, mensagens genéricas e contatos de pessoas que não combinam com a oferta.",
    },
    {
      number: "03",
      title: "Planejamento de campanha",
      summary:
        "Definimos canais, etapas, orçamento, duração, peças, páginas e indicadores antes da publicação.",
      details: [
        "Arquitetura da campanha",
        "Distribuição de orçamento",
        "Cronograma",
        "Pontos de entrada e saída",
        "Critérios para pausar, manter ou ampliar",
      ],
      resolves:
        "Substitui impulsionamentos isolados por uma estrutura que pode ser acompanhada e melhorada.",
    },
    {
      number: "04",
      title: "Mensagem e copy",
      summary:
        "Organizamos o que precisa ser dito em cada anúncio, página e etapa da campanha.",
      details: [
        "Argumento principal",
        "Títulos e textos de anúncio",
        "Chamadas para ação",
        "Variações de mensagem",
        "Coerência entre anúncio e página",
      ],
      resolves:
        "Evita peças visualmente bonitas que não explicam a oferta ou não orientam a próxima ação.",
    },
    {
      number: "05",
      title: "Direção criativa e design",
      summary:
        "Transformamos a estratégia em peças visuais adequadas ao canal, à identidade e ao objetivo.",
      details: [
        "Conceito visual",
        "Peças estáticas",
        "Carrosséis e variações",
        "Capas e formatos de vídeo",
        "Adaptação para diferentes posicionamentos",
      ],
      resolves:
        "Evita tratar o criativo como um arquivo improvisado criado apenas para preencher o espaço do anúncio.",
    },
    {
      number: "06",
      title: "Landing pages para campanhas",
      summary:
        "Criamos páginas específicas para continuar a mensagem do anúncio e conduzir a pessoa até a ação.",
      details: [
        "Estrutura da oferta",
        "Argumentos e provas",
        "Formulários",
        "Contato e rastreamento",
        "Versões para testes",
      ],
      resolves:
        "Evita enviar todo o tráfego para uma página inicial genérica ou para um perfil que não explica o que foi anunciado.",
    },
    {
      number: "07",
      title: "Google Ads",
      summary:
        "Planejamos e operamos campanhas relacionadas às buscas, aos serviços e às regiões que fazem sentido para a empresa.",
      details: [
        "Campanhas de pesquisa",
        "Grupos e anúncios",
        "Termos de busca",
        "Palavras negativas",
        "Localização, horário e orçamento",
      ],
      resolves:
        "Ajuda a empresa a aparecer para demandas já existentes sem pagar continuamente por pesquisas irrelevantes.",
    },
    {
      number: "08",
      title: "Meta Ads",
      summary:
        "Planejamos campanhas no Instagram e Facebook para descoberta, consideração, contato ou recuperação de interesse.",
      details: [
        "Estrutura de públicos",
        "Posicionamentos",
        "Campanhas de tráfego, leads ou conversão",
        "Variações de criativo",
        "Controle de frequência e desempenho",
      ],
      resolves:
        "Substitui o impulsionamento sem direção por campanhas que consideram público, mensagem, criativo e objetivo.",
    },
    {
      number: "09",
      title: "Rastreamento, UTMs e conversões",
      summary:
        "Configuramos formas de identificar de onde as pessoas vieram e quais ações realizaram.",
      details: [
        "UTMs",
        "Eventos e conversões",
        "Formulários e cliques",
        "Integração com ferramentas de análise",
        "Organização de nomenclaturas",
      ],
      resolves:
        "Evita depender apenas do painel da plataforma ou descobrir contatos sem saber qual campanha os gerou.",
    },
    {
      number: "10",
      title: "Remarketing",
      summary:
        "Criamos caminhos para voltar a falar com quem demonstrou interesse, mas ainda não realizou a ação esperada.",
      details: [
        "Visitantes do site",
        "Interações com conteúdo",
        "Pessoas que iniciaram um processo",
        "Mensagens específicas por estágio",
        "Controle de frequência e exclusões",
      ],
      resolves:
        "Ajuda a manter continuidade sem repetir a mesma mensagem indefinidamente para todo mundo.",
    },
    {
      number: "11",
      title: "Testes e otimização",
      summary:
        "Comparamos mensagens, públicos, peças, páginas e configurações para entender o que merece continuidade.",
      details: [
        "Variações de anúncio",
        "Testes de criativo",
        "Ajuste de público",
        "Redistribuição de orçamento",
        "Leitura de custo e qualidade",
      ],
      resolves:
        "Evita decidir apenas por gosto pessoal ou alterar várias coisas ao mesmo tempo sem saber o que provocou a mudança.",
    },
    {
      number: "12",
      title: "Acompanhamento e próximos passos",
      summary:
        "Organizamos resultados, problemas e decisões em uma leitura compreensível para a empresa.",
      details: [
        "Indicadores principais",
        "Qualidade dos contatos",
        "Pontos de perda",
        "Mudanças realizadas",
        "Recomendações para o próximo ciclo",
      ],
      resolves:
        "Transforma relatório em decisão e impede que a campanha continue apenas porque está ativa.",
    },
  ] satisfies MarketingService[],

  creative: {
    eyebrow: "Sobre os criativos",
    title: "A plataforma entrega o anúncio. O criativo precisa merecer atenção.",
    description:
      "Definir público e orçamento não substitui o trabalho de mensagem, direção de arte e design. O anúncio precisa ser reconhecido como parte da empresa, entendido com rapidez e adaptado ao comportamento de cada canal.",
    support:
      "A estratégia define o que precisa ser comunicado. O design resolve como isso será apresentado visualmente. Quando o projeto inclui as duas frentes, elas são construídas juntas — sem tratar uma como detalhe da outra.",
    sequence: [
      "Estratégia",
      "Conceito",
      "Copy",
      "Direção de arte",
      "Design",
      "Variações",
      "Teste",
    ],
  },

  measurement: {
    eyebrow: "Resultado não é uma métrica isolada",
    title: "Curtida, clique, lead e venda não significam a mesma coisa.",
    description:
      "Cada número mostra uma parte do caminho. Uma campanha pode alcançar muitas pessoas e gerar poucos contatos. Pode gerar contatos e encontrar um atendimento lento. Pode levar oportunidades boas até uma oferta que ainda não está clara.",
    support:
      "Marketing influencia o caminho inteiro, mas não controla sozinho preço, disponibilidade, reputação, atendimento, negociação ou entrega. Por isso, a leitura precisa considerar onde a oportunidade está sendo perdida.",
    stages: [
      {
        number: "01",
        title: "Exposição",
        description: "A mensagem foi exibida para alguém.",
      },
      {
        number: "02",
        title: "Atenção",
        description: "A pessoa parou, assistiu, leu ou interagiu.",
      },
      {
        number: "03",
        title: "Clique",
        description: "Houve interesse suficiente para continuar.",
      },
      {
        number: "04",
        title: "Contato",
        description: "A pessoa enviou uma informação ou iniciou uma conversa.",
      },
      {
        number: "05",
        title: "Oportunidade",
        description: "A necessidade combina com o que a empresa oferece.",
      },
      {
        number: "06",
        title: "Venda",
        description: "A proposta foi compreendida, aceita e concluída.",
      },
    ],
  },

  scenariosIntro: {
    eyebrow: "Na prática",
    title: "O que muda quando a campanha recebe direção?",
  },

  scenarios: [
    {
      number: "01",
      title: "Impulsionamento sem objetivo",
      today:
        "A empresa escolhe uma publicação, define um valor e espera que mais visualizações produzam vendas.",
      withDirection:
        "A campanha começa por um objetivo, uma oferta, um público e uma ação que pode ser acompanhada.",
    },
    {
      number: "02",
      title: "Clique sem continuidade",
      today:
        "O anúncio chama atenção, mas leva para uma página genérica ou para um perfil que não explica o serviço.",
      withDirection:
        "A mensagem continua depois do clique e conduz a pessoa para uma página, formulário ou conversa coerente.",
    },
    {
      number: "03",
      title: "Muitos contatos, pouca qualidade",
      today:
        "A campanha gera volume, mas atrai pessoas fora da região, do perfil ou das condições da oferta.",
      withDirection:
        "Público, mensagem, informações e filtros ajudam a aproximar a campanha de oportunidades mais adequadas.",
    },
    {
      number: "04",
      title: "Contato sem resposta",
      today:
        "A campanha funciona, mas as mensagens demoram, não recebem continuidade ou se perdem no atendimento.",
      withDirection:
        "O processo comercial sabe de onde o contato veio, o que foi prometido e qual deve ser o próximo passo.",
    },
    {
      number: "05",
      title: "O mesmo criativo por tempo demais",
      today:
        "A mesma peça continua ativa até perder atenção, enquanto o custo aumenta e o desempenho cai.",
      withDirection:
        "Variações são planejadas, comparadas e renovadas conforme o comportamento da campanha.",
    },
    {
      number: "06",
      title: "Relatório cheio, decisão vazia",
      today:
        "A empresa recebe alcance, impressões e cliques, mas continua sem saber o que fazer depois.",
      withDirection:
        "Os dados são ligados ao objetivo, à qualidade das oportunidades e às decisões do próximo ciclo.",
    },
  ] satisfies MarketingScenario[],

  process: {
    eyebrow: "Como o trabalho acontece",
    title: "Campanhas são construídas, acompanhadas e ajustadas.",
    description:
      "O primeiro lançamento não é tratado como resposta definitiva. Ele coloca uma estratégia em contato com o mercado e gera informações para as próximas decisões.",
    steps: [
      "Entender o objetivo",
      "Organizar oferta e público",
      "Escolher canais e caminho",
      "Planejar campanha",
      "Criar mensagens e peças",
      "Preparar página e rastreamento",
      "Publicar com controle",
      "Acompanhar qualidade",
      "Otimizar e decidir",
    ],
  },

  finalCta: {
    eyebrow: "Marketing Digital",
    title: "Vamos dar direção ao próximo investimento.",
    description:
      "Conte o que pretende divulgar e como a empresa recebe oportunidades hoje. A partir disso, organizamos o primeiro caminho possível.",
    cta: "Conversar sobre marketing",
    href: "/contato",
  },
};
