export type SeoPresenceService = {
  number: string;
  title: string;
  summary: string;
  details: string[];
  resolves: string;
};

export type SeoPresenceScenario = {
  number: string;
  title: string;
  today: string;
  organized: string;
};

export const seoPresencePageData = {
  hero: {
    title: "SEO e Presença Digital",
    description:
      "Organizamos a estrutura do site, as páginas, os conteúdos, a presença local, o Perfil da Empresa no Google, a indexação e o acompanhamento das buscas para que a empresa seja encontrada e compreendida com clareza.",
  },

  search: {
    eyebrow: "A busca já está acontecendo",
    title: "Nem sempre procuram pelo nome da empresa.",
    description:
      "As pessoas procuram pelo serviço, pela necessidade, pela cidade ou por uma resposta. A presença digital precisa deixar claro o que a empresa oferece antes mesmo do primeiro contato.",
    queries: [
      {
        query: "personal trainer em Telêmaco Borba",
        resultTitle: "Treinamento personalizado em Telêmaco Borba",
        resultMeta: "Serviço local · Atendimento individual",
        resultDescription:
          "Informações sobre acompanhamento, horários, localização e formas de contato.",
      },
      {
        query: "empresa de energia solar perto de mim",
        resultTitle: "Energia solar para residências e empresas",
        resultMeta: "Atendimento regional · Solicite uma avaliação",
        resultDescription:
          "Serviços, cidades atendidas, etapas do projeto e próximo passo para orçamento.",
      },
      {
        query: "clínica veterinária aberta agora",
        resultTitle: "Clínica veterinária · Horários e atendimento",
        resultMeta: "Aberto agora · Como chegar · Ligar",
        resultDescription:
          "Endereço, serviços, horário atualizado e acesso rápido ao atendimento.",
      },
      {
        query: "site para pequena empresa",
        resultTitle: "Sites para apresentar serviços e receber contatos",
        resultMeta: "Criação de sites · Estrutura digital",
        resultDescription:
          "Tipos de projeto, funcionamento, valores e caminho para começar.",
      },
    ],
  },

  perception: {
    eyebrow: "Presença também é percepção",
    title: "O resultado da busca já está apresentando a empresa.",
    description:
      "Antes de entrar no site ou enviar uma mensagem, a pessoa pode encontrar nome, descrição, localização, avaliações, fotos, horário e formas de contato. Essas informações precisam contar a mesma história.",
    support:
      "SEO não é transformar toda frase em palavra-chave. A busca define o que precisa estar claro. A identidade da empresa define como isso será apresentado.",
    signals: [
      "Nome",
      "Serviço",
      "Cidade",
      "Avaliações",
      "Horário",
      "Contato",
      "Páginas",
      "Confiança",
    ],
  },

  servicesIntro: {
    eyebrow: "O que organizamos",
    title: "Cada parte ajuda o Google e as pessoas a entenderem melhor a empresa.",
    description:
      "O trabalho não começa tentando repetir palavras ou ocupar qualquer busca. Primeiro organizamos o negócio, os serviços, as páginas e as informações que precisam ser encontradas.",
  },

  services: [
    {
      number: "01",
      title: "Diagnóstico de presença",
      summary:
        "Analisamos o que já aparece quando alguém procura pela empresa, pelos serviços e pela região atendida.",
      details: [
        "Páginas que já aparecem nas buscas",
        "Informações desatualizadas ou diferentes entre canais",
        "Problemas técnicos e páginas ausentes",
        "Buscas que já levam pessoas ao site",
        "Concorrentes presentes em pesquisas importantes",
      ],
      resolves:
        "Evita começar por uma lista genérica de palavras-chave sem entender o que já existe e onde estão os vazios.",
    },
    {
      number: "02",
      title: "Mapeamento de buscas e intenção",
      summary:
        "Identificamos como as pessoas procuram e em qual momento cada pesquisa acontece.",
      details: [
        "Termos ligados a cada serviço",
        "Buscas informativas, locais e comerciais",
        "Dúvidas que aparecem antes da contratação",
        "Regiões que precisam ser consideradas",
        "Página mais adequada para cada procura",
      ],
      resolves:
        "Impede que uma única página tente responder a todos os serviços, cidades e momentos da decisão ao mesmo tempo.",
    },
    {
      number: "03",
      title: "Arquitetura de conteúdo",
      summary:
        "Definimos como serviços, dúvidas, regiões e conteúdos serão distribuídos pelo site.",
      details: [
        "Páginas principais e complementares",
        "Organização de serviços e categorias",
        "Relação entre páginas",
        "Navegação compreensível",
        "Prevenção de conteúdos repetidos",
      ],
      resolves:
        "Ajuda o buscador a entender a estrutura e leva a pessoa diretamente ao conteúdo que procura.",
    },
    {
      number: "04",
      title: "Páginas otimizadas",
      summary:
        "Preparamos cada página para responder a uma necessidade específica sem perder a personalidade da empresa.",
      details: [
        "Título e descrição do serviço",
        "Localização quando for relevante",
        "Dúvidas, diferenciais e exemplos",
        "Próximo passo e chamada para contato",
        "Título e descrição exibidos no resultado de busca",
      ],
      resolves:
        "Evita páginas genéricas que falam muito sobre a empresa, mas pouco sobre aquilo que a pessoa pesquisou.",
    },
    {
      number: "05",
      title: "SEO técnico",
      summary:
        "Revisamos a estrutura que permite aos buscadores acessar, interpretar e organizar as páginas.",
      details: [
        "Velocidade e funcionamento no celular",
        "Links quebrados e redirecionamentos",
        "Endereços, títulos e cabeçalhos",
        "Páginas duplicadas",
        "Mapa do site e configurações de rastreamento",
      ],
      resolves:
        "Reduz barreiras técnicas que podem dificultar a leitura, a indexação e o uso do site.",
    },
    {
      number: "06",
      title: "SEO local",
      summary:
        "Organizamos a presença de empresas que atendem uma cidade, uma região ou um endereço físico.",
      details: [
        "Regiões realmente atendidas",
        "Páginas locais quando fizer sentido",
        "Consistência de nome, telefone e endereço",
        "Relação entre busca, mapa, site e contato",
        "Sinais locais presentes no site",
      ],
      resolves:
        "Ajuda a empresa a ser compreendida dentro do território em que realmente atua, sem criar páginas artificiais para cada cidade.",
    },
    {
      number: "07",
      title: "Perfil da Empresa no Google",
      summary:
        "Organizamos o perfil que pode aparecer na busca e no mapa antes mesmo do site.",
      details: [
        "Categorias, descrição e serviços",
        "Endereço ou área atendida",
        "Horário, telefone e site",
        "Fotos, perguntas e avaliações",
        "Links de contato ou agendamento",
      ],
      resolves:
        "Evita perfil abandonado, telefone antigo, horário incorreto, categoria genérica e informações que não representam mais a empresa.",
    },
    {
      number: "08",
      title: "Indexação",
      summary:
        "Verificamos se as páginas importantes foram encontradas e incluídas corretamente na busca.",
      details: [
        "Páginas importantes que ficaram de fora",
        "Versões duplicadas ou desnecessárias",
        "Bloqueios de rastreamento",
        "Mapa do site",
        "Erros informados pelo Google",
      ],
      resolves:
        "Evita manter páginas importantes invisíveis ou permitir que versões erradas apareçam no lugar delas.",
    },
    {
      number: "09",
      title: "Dados estruturados",
      summary:
        "Adicionamos informações ao código para explicar melhor o papel de cada conteúdo dentro da página.",
      details: [
        "Empresa e endereço",
        "Serviços e produtos",
        "Artigos e perguntas",
        "Eventos e avaliações",
        "Relações entre informações",
      ],
      resolves:
        "Reduz ambiguidades e melhora a interpretação do conteúdo. A configuração organiza a informação, mas não promete um formato especial no resultado.",
    },
    {
      number: "10",
      title: "Acompanhamento de presença",
      summary:
        "Acompanhamos como as páginas aparecem, quais buscas geram visitas e onde surgem novos problemas.",
      details: [
        "Pesquisas que exibem a empresa",
        "Páginas que recebem visitas",
        "Cliques e aparições",
        "Erros de indexação",
        "Oportunidades de atualização e novos conteúdos",
      ],
      resolves:
        "Evita trabalhar no escuro e permite melhorar a presença com base no que realmente acontece.",
    },
  ] satisfies SeoPresenceService[],

  ads: {
    eyebrow: "Antes de anunciar",
    title:
      "O anúncio acelera a chegada. A estrutura precisa estar pronta para receber.",
    description:
      "Pagar para aparecer em uma busca não organiza a oferta, não explica o serviço e não prepara o próximo passo. Sem direção, o anúncio pode gerar cliques sem gerar conversas, pedidos ou vendas.",
    statement:
      "Enviar tráfego pago para uma presença incompleta é pagar para apresentar a empresa sem preparar a apresentação.",
    steps: [
      {
        number: "01",
        title: "Oferta clara",
        description: "O que está sendo oferecido, para quem e em qual região.",
      },
      {
        number: "02",
        title: "Página coerente",
        description:
          "A pessoa precisa chegar a uma página relacionada ao que pesquisou.",
      },
      {
        number: "03",
        title: "Próximo passo visível",
        description:
          "Contato, orçamento, agendamento ou compra precisam estar claros.",
      },
      {
        number: "04",
        title: "Medição e continuidade",
        description:
          "É necessário entender o que aconteceu depois do clique.",
      },
    ],
  },

  scenariosIntro: {
    eyebrow: "Na prática",
    title: "O que muda quando a presença deixa de ser improvisada?",
  },

  scenarios: [
    {
      number: "01",
      title: "A empresa só aparece pelo próprio nome",
      today:
        "Quem já conhece a empresa consegue encontrá-la. Quem procura apenas pelo serviço não chega até ela.",
      organized:
        "Serviços, páginas e localização são estruturados para responder também às buscas de quem ainda não conhece a marca.",
    },
    {
      number: "02",
      title: "O Google mostra informações diferentes",
      today:
        "O site apresenta um telefone, o mapa mostra outro e as redes sociais mantêm horários antigos.",
      organized:
        "As principais informações são revisadas para que a empresa seja apresentada de maneira consistente.",
    },
    {
      number: "03",
      title: "Existe um site, mas nenhuma página específica",
      today:
        "Todos os serviços estão resumidos em poucos parágrafos dentro da página inicial.",
      organized:
        "Cada serviço importante recebe o espaço necessário para ser explicado e encontrado.",
    },
    {
      number: "04",
      title: "O anúncio recebe cliques, mas não gera contato",
      today:
        "A campanha envia todo mundo para uma página genérica, sem relação clara com aquilo que foi pesquisado.",
      organized:
        "A busca, o anúncio e a página de destino passam a fazer parte do mesmo caminho.",
    },
    {
      number: "05",
      title: "O perfil aparece, mas não transmite confiança",
      today:
        "Há poucas informações, imagens antigas, avaliações sem resposta e serviços ausentes.",
      organized:
        "O perfil passa a representar melhor a empresa antes mesmo de a pessoa acessar o site.",
    },
  ] satisfies SeoPresenceScenario[],

  process: {
    eyebrow: "Como o projeto acontece",
    title: "A presença é organizada antes de ser acompanhada.",
    description:
      "Não começamos tentando colocar a empresa em primeiro lugar para qualquer palavra. Primeiro definimos em quais buscas ela realmente precisa fazer sentido.",
    steps: [
      "Entender o negócio",
      "Mapear serviços e regiões",
      "Analisar como as pessoas procuram",
      "Organizar páginas e informações",
      "Corrigir a estrutura técnica",
      "Publicar e conectar os canais",
      "Acompanhar o que acontece",
      "Melhorar com base nos dados",
    ],
  },

  bridge: {
    eyebrow: "Orgânico e patrocinado",
    title: "A busca orgânica e o anúncio não precisam competir.",
    description:
      "SEO organiza a base. A campanha pode acelerar a exposição. Os dois funcionam melhor quando existe oferta clara, página adequada, contato acessível e medição configurada.",
    cta: "Entender como funcionam as campanhas",
    href: "/solucoes/marketing-digital",
  },

  finalCta: {
    eyebrow: "SEO e Presença Digital",
    title: "Vamos organizar o que as pessoas encontram.",
    description:
      "Mostre o que existe hoje. A partir disso, definimos o que precisa ser corrigido, criado ou acompanhado.",
    cta: "Conversar sobre presença digital",
    href: "/contato",
  },
};
