export type SolutionType = {
  id: "site" | "landing" | "system";
  number: string;
  title: string;
  definition: string;
  scenario: string;
};

export type SystemPossibility = {
  number: string;
  title: string;
  description: string;

  term?: {
    label: string;
    explanation: string;
  };

  relatedPage?: {
    prefix: string;
    label: string;
    href: string;
  };
};

export type RealScenario = {
  number: string;
  title: string;
  before: string;
  after: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
  result: string;
};

export type SecurityItem = {
  number: string;
  title: string;
  description: string;
  term?: {
    label: string;
    explanation: string;
  };
};

export type GlossaryItem = {
  term: string;
  explanation: string;
};

export const sitesSystemsPageData = {
  hero: {
    eyebrow: "03 — Sites e Sistemas",
    title: "Tecnologia para apresentar a empresa. E para fazer ela funcionar melhor.",
    description:
      "Criamos sites, páginas e sistemas pensados para o que a empresa realmente precisa fazer: apresentar serviços, receber pedidos, organizar informações, atender clientes, acompanhar processos ou diminuir tarefas repetidas.",
    support:
      "Você não precisa chegar sabendo se precisa de um site, de um sistema ou de uma integração. Primeiro entendemos o problema. Depois definimos o que faz sentido construir.",
    primaryCta: "Conversar sobre o projeto",
    primaryHref: "/contato",
    landingCta: "Ver Landing Page de R$ 200",
    landingHref: "/landing-page",
    fieldNodes: [
      { label: "Pessoas", detail: "Quem usa, quem atende e quem decide." },
      { label: "Pedidos", detail: "O que chega, o que falta e o que precisa avançar." },
      { label: "Dados", detail: "O que precisa ser guardado, consultado e protegido." },
      { label: "Processos", detail: "As etapas que hoje dependem de memória ou improviso." },
      { label: "Atendimento", detail: "Como a conversa começa e como continua." },
      { label: "Resultado", detail: "O que precisa ficar mais simples no final." },
    ],
  },

  problem: {
    eyebrow: "O problema vem primeiro",
    title: "Nem toda empresa precisa de um sistema enorme. Mas toda solução precisa resolver alguma coisa.",
    description:
      "Às vezes, o que está faltando é uma página clara para apresentar um serviço. Em outros casos, o problema está nos pedidos desorganizados, nas informações espalhadas, nas mensagens repetidas ou na dificuldade de acompanhar o que já foi feito.",
    closing:
      "A tecnologia entra para organizar esse caminho. Não para adicionar mais uma ferramenta que ninguém sabe usar.",
    words: [
      "mensagens",
      "planilhas",
      "pedidos",
      "cadastros",
      "documentos",
      "etapas",
      "acessos",
      "acompanhamento",
    ],
  },

  solutionTypes: {
    eyebrow: "Site, página ou sistema?",
    title: "Três estruturas diferentes. Cada uma resolve um tipo de necessidade.",
    items: [
      {
        id: "site",
        number: "01",
        title: "Site",
        definition:
          "Um site apresenta a empresa. Ele organiza serviços, diferenciais, localização, formas de contato, trabalhos realizados e respostas para dúvidas comuns.",
        scenario:
          "Quando muitas pessoas chegam ao WhatsApp sem entender o que a empresa faz, o site prepara essa conversa antes do atendimento começar.",
      },
      {
        id: "landing",
        number: "02",
        title: "Landing page",
        definition:
          "Uma landing page é uma página criada para um objetivo específico: apresentar um serviço, divulgar uma oferta, receber contatos ou conduzir a pessoa até uma ação.",
        scenario:
          "Em vez de repetir a mesma explicação em várias mensagens, a empresa envia uma página que organiza problema, solução, funcionamento, preço e forma de contratar.",
      },
      {
        id: "system",
        number: "03",
        title: "Sistema",
        definition:
          "Um sistema não serve apenas para mostrar informações. Ele permite cadastrar, consultar, atualizar, organizar e acompanhar alguma coisa.",
        scenario:
          "Quando clientes, pedidos, documentos e etapas estão espalhados em planilhas e conversas, o sistema reúne tudo em um ambiente próprio.",
      },
    ] satisfies SolutionType[],
    closing:
      "O site fala com o público. O sistema ajuda a empresa a operar. Em muitos projetos, os dois trabalham juntos.",
  },

  possibilities: {
    eyebrow: "O que um sistema pode fazer",
    title: "Um sistema começa quando a rotina deixa de caber em mensagens, anotações e planilhas.",
    items: [
      {
        number: "01",
        title: "Organizar cadastros",
        description:
          "Clientes, produtos, serviços, animais, documentos, membros, fornecedores ou qualquer outro tipo de informação que hoje esteja espalhada.",
      },
      {
        number: "02",
        title: "Acompanhar etapas",
        description:
          "Saber o que acabou de chegar, o que está em andamento, o que depende de aprovação e o que já foi concluído.",
      },
      {
        number: "03",
        title: "Criar uma área para o cliente",
        description:
          "Permitir que o cliente entre, consulte informações, envie materiais, acompanhe o serviço contratado ou encontre documentos importantes.",
        term: {
          label: "Área restrita",
          explanation:
            "Parte do site ou sistema que só aparece depois que a pessoa entra com seu acesso.",
        },
      },
      {
        number: "04",
        title: "Receber solicitações",
        description:
          "Trocar mensagens soltas por um processo mais organizado, com os dados necessários desde o início.",
      },
      {
        number: "05",
        title: "Gerar documentos e relatórios",
        description:
          "Reunir informações cadastradas e transformar em propostas, comprovantes, históricos, relatórios ou arquivos para download.",
      },
      {
        number: "06",
        title: "Controlar permissões",
        description:
          "Fazer com que cada pessoa veja apenas as informações e funções relacionadas ao seu trabalho.",
        term: {
          label: "Permissão de acesso",
          explanation:
            "Regra que define o que cada pessoa pode visualizar, criar, editar ou excluir.",
        },
      },
      {
        number: "07",
        title: "Conectar ferramentas",

        description:
          "Fazer duas ferramentas trocarem informações sem que alguém precise copiar e colar os mesmos dados várias vezes.",

        term: {
          label: "Integração",

          explanation:
            "Conexão que permite que duas ferramentas troquem informações automaticamente.",
        },

        relatedPage: {
          prefix:
            "Quando a rotina envolve conectar serviços e automatizar a troca de informações, esse trabalho também entra em",

          label:
            "Automação e Integrações",

          href:
            "/solucoes/automacao",
        },
      },
      {
        number: "08",
        title: "Criar um painel de gestão",
        description:
          "Mostrar em um único lugar novos pedidos, etapas atrasadas, atendimentos, resultados ou outras informações importantes.",
        term: {
          label: "Painel administrativo",
          explanation:
            "Área reservada onde a empresa cadastra, edita e acompanha as informações do site ou sistema.",
        },
      },
    ] satisfies SystemPossibility[],
  },

  scenarios: {
    eyebrow: "Na prática",
    title: "O que muda quando a ferramenta é criada para a rotina da empresa?",
    items: [
      {
        number: "01",
        title: "Solicitação desorganizada",
        before:
          "O cliente envia nome, serviço, cidade, prazo e arquivos em mensagens separadas. Depois alguém precisa localizar tudo e organizar manualmente.",
        after:
          "A solicitação chega por um caminho guiado, já identificada e com as informações necessárias para começar.",
      },
      {
        number: "02",
        title: "Acompanhamento por mensagem",
        before:
          "A pessoa precisa perguntar constantemente em que etapa está o serviço contratado.",
        after:
          "Ela acessa uma área própria e acompanha andamento, materiais enviados, próximos passos e o que ainda depende dela.",
      },
      {
        number: "03",
        title: "Planilhas paralelas",
        before:
          "Cada pessoa atualiza de uma maneira e ninguém sabe qual arquivo é o mais recente.",
        after:
          "As informações ficam centralizadas, com regras claras sobre quem pode visualizar ou alterar cada parte.",
      },
      {
        number: "04",
        title: "O mesmo dado em vários lugares",
        before:
          "Uma informação é digitada no formulário, copiada para uma planilha, enviada por mensagem e cadastrada novamente em outra ferramenta.",
        after:
          "As ferramentas podem trocar essas informações automaticamente, reduzindo repetição e erros de digitação.",
      },
    ] satisfies RealScenario[],
  },

  progress: {
    eyebrow: "A tecnologia avançou",
    title:
      "Hoje, uma ferramenta pode fazer muito mais pela rotina da empresa.",
    words: [
      "organizar processos",
      "automatizar etapas",
      "gerar documentos",
      "conectar serviços",
      "adaptar acessos",
      "interpretar informações",
      "reduzir repetição",
      "registrar o que aconteceu",
    ],
    description:
      "Isso não significa colocar inteligência artificial em tudo ou criar uma plataforma cheia de funções que ninguém vai usar. Significa que já não precisamos aceitar processos ruins apenas porque sempre foram feitos assim.",
    closing:
      "Tecnologia avançada não é a que parece mais complicada. É a que resolve mais sem complicar a vida de quem usa.",
  },

  custom: {
    eyebrow: "Sistemas sob medida",
    title: "O sistema se adapta à empresa. Não o contrário.",
    description:
      "Ferramentas prontas funcionam quando a rotina da empresa cabe dentro delas. O problema começa quando surgem desvios, planilhas paralelas e tarefas manuais para compensar o que a ferramenta não faz.",
    support:
      "Um sistema sob medida é pensado a partir do processo real. Ele pode começar pequeno, resolvendo o ponto mais urgente, e ganhar novas funções conforme a empresa utiliza e entende melhor suas necessidades.",
    closing:
      "Sob medida não significa começar com uma plataforma gigante. Significa construir apenas o que precisa existir — da forma certa.",
    flow: [
      "Rotina atual",
      "Ponto de atrito",
      "Primeira solução",
      "Uso real",
      "Evolução",
    ],
  },

  process: {
    eyebrow: "Como o projeto acontece",
    title: "Etapas claras antes, durante e depois do desenvolvimento.",
    steps: [
      {
        number: "01",
        title: "Entender o problema",
        description:
          "Conversamos sobre o que acontece hoje: quem participa, onde as informações chegam, o que se repete, onde acontecem erros e o que o cliente precisa acompanhar.",
        result: "Uma visão clara do problema antes de pensar na ferramenta.",
      },
      {
        number: "02",
        title: "Organizar o caminho",
        description:
          "Transformamos a rotina em etapas compreensíveis. Definimos o que entra, o que acontece depois, quem pode realizar cada ação e qual deve ser o resultado.",
        result: "Um fluxo organizado, sem depender de termos técnicos.",
      },
      {
        number: "03",
        title: "Criar o protótipo",
        description:
          "Antes de desenvolver tudo, mostramos como as telas, informações e ações devem funcionar. É o momento de testar a lógica e corrigir decisões sem reconstruir o projeto depois.",
        result: "Uma versão visual do funcionamento para aprovação.",
      },
      {
        number: "04",
        title: "Desenvolver a estrutura",
        description:
          "Com o fluxo aprovado, construímos telas, cadastros, acessos e funções por partes, permitindo testar o funcionamento ao longo do processo.",
        result: "Uma ferramenta funcional, construída de forma organizada.",
      },
      {
        number: "05",
        title: "Testar situações reais",
        description:
          "Não testamos apenas se um botão funciona. Também verificamos informações erradas, dados ausentes, acessos indevidos e etapas realizadas fora da ordem.",
        result: "Menos surpresas depois que o sistema começar a ser usado.",
      },
      {
        number: "06",
        title: "Preparar o uso",
        description:
          "Organizamos acessos, orientações e configurações para que quem vai utilizar entenda o sistema sem depender do desenvolvimento para cada ação básica.",
        result: "Uma entrega pronta para entrar na rotina.",
      },
      {
        number: "07",
        title: "Acompanhar e evoluir",
        description:
          "O uso real mostra oportunidades que não aparecem no planejamento. Uma função pode precisar de ajuste, uma etapa pode ser simplificada e um novo processo pode ser incorporado.",
        result: "Uma tecnologia que pode evoluir junto com a empresa.",
      },
    ] satisfies ProcessStep[],
  },

  security: {
    eyebrow: "Segurança desde a estrutura",
    title: "Um sistema não precisa apenas funcionar. Precisa saber o que proteger.",
    description:
      "Quando uma ferramenta recebe informações de clientes, documentos, acessos ou dados internos, segurança não pode ser um detalhe colocado depois. Ela participa das decisões desde o começo.",
    items: [
      {
        number: "01",
        title: "Cada pessoa acessa apenas o necessário",
        description:
          "Um cliente não deve enxergar informações de outro cliente. Um funcionário não precisa ter acesso a todas as configurações.",
        term: {
          label: "Permissão",
          explanation:
            "Regra que limita o que cada pessoa pode ver ou fazer dentro do sistema.",
        },
      },
      {
        number: "02",
        title: "Senhas não ficam disponíveis para leitura",
        description:
          "O sistema não deve guardar senhas como um texto comum que alguém possa abrir e consultar.",
        term: {
          label: "Proteção de senha",
          explanation:
            "A senha passa por uma transformação que impede que ela fique armazenada em formato legível.",
        },
      },
      {
        number: "03",
        title: "Dados desnecessários não são coletados",
        description:
          "Quanto menos informação sensível for armazenada sem necessidade, menor é a exposição.",
      },
      {
        number: "04",
        title: "Formulários não aceitam qualquer coisa",
        description:
          "As informações enviadas são verificadas antes de entrar no sistema, reduzindo erros e usos indevidos.",
        term: {
          label: "Validação",
          explanation:
            "Verificação que confirma se o dado recebido está no formato e dentro das regras esperadas.",
        },
      },
      {
        number: "05",
        title: "Ações importantes podem ser registradas",
        description:
          "Alterações, acessos e operações relevantes podem deixar um histórico para facilitar a identificação de problemas.",
      },
      {
        number: "06",
        title: "A estrutura continua atualizada",
        description:
          "Um sistema não termina no dia da publicação. Partes da estrutura precisam ser acompanhadas e atualizadas.",
      },
      {
        number: "07",
        title: "Backups fazem parte do planejamento",
        description:
          "Informações importantes não devem depender de uma única cópia.",
        term: {
          label: "Backup",
          explanation:
            "Cópia de segurança usada para recuperar informações caso algo seja perdido ou danificado.",
        },
      },
    ] satisfies SecurityItem[],
    truth:
      "Não existe sistema sério que prometa risco zero. Segurança significa reduzir riscos, limitar acessos, evitar erros previsíveis, manter a estrutura atualizada e estar preparada para identificar e responder quando algo foge do esperado.",
  },

  human: {
    eyebrow: "Por trás da tecnologia",
    title: "Não é uma ferramenta montada por alguém que aprendeu apenas a fazer telas bonitas.",
    paragraphs: [
      "Por trás de cada projeto existe uma profissional que estudou desenvolvimento, funcionamento de sistemas e segurança.",
      "Isso muda a forma como o projeto é pensado. A preocupação não está apenas em como a tela aparece, mas em como as informações circulam, o que cada pessoa pode fazer, onde um erro pode acontecer e como a estrutura pode continuar funcionando depois da entrega.",
      "Design, tecnologia e segurança precisam trabalhar juntos para que o sistema seja fácil de usar sem ser frágil por dentro.",
    ],
    closing:
      "A interface é o que a pessoa vê. A responsabilidade está também no que ela não vê.",
  },

  glossary: {
    eyebrow: "Sem tradução simultânea de tecnês",
    title: "Quando um termo técnico for necessário, ele vem com explicação.",
    description:
      "A conversa sobre o projeto precisa continuar compreensível. Por isso, os termos aparecem apenas quando ajudam a decidir alguma coisa.",
    items: [
      {
        term: "Painel administrativo",
        explanation:
          "Área reservada onde a empresa cadastra, edita e acompanha informações do site ou sistema.",
      },
      {
        term: "Integração",
        explanation:
          "Conexão que permite que duas ferramentas troquem informações automaticamente.",
      },
      {
        term: "Banco de dados",
        explanation:
          "Local organizado onde o sistema guarda as informações necessárias para funcionar.",
      },
      {
        term: "Autenticação",
        explanation:
          "Processo usado para confirmar quem está tentando entrar no sistema.",
      },
      {
        term: "Permissão de acesso",
        explanation:
          "Regra que define o que cada pessoa pode visualizar, criar, editar ou excluir.",
      },
      {
        term: "API",
        explanation:
          "Uma forma organizada de uma ferramenta conversar com outra.",
      },
    ] satisfies GlossaryItem[],
  },

  landingPage: {
    eyebrow: "Serviço com página própria",
    title: "Uma página focada em apresentar e converter.",
    price: "R$ 200",
    cadence: "por mês",
    description:
      "Para quem precisa apresentar um serviço, organizar uma oferta ou parar de repetir as mesmas explicações no WhatsApp, a landing page tem uma condição própria.",
    support:
      "Criamos uma página focada em um objetivo, com textos, estrutura, identidade e pontos de contato organizados para conduzir a pessoa até a ação.",
    condition:
      "A página permanece ativa por R$ 200 ao mês e pode ser cancelada em qualquer mês.",
    cta: "Conhecer a Landing Page de R$ 200",
    href: "/landing-page",
  },

  directory: {
    eyebrow: "O que pode ser desenvolvido",
    title: "Da presença digital à operação interna.",
    groups: [
      {
        number: "01",
        title: "Presença e apresentação",
        items: [
          "Landing pages",
          "Sites institucionais",
          "Catálogos digitais",
          "Portfólios",
          "Páginas para campanhas",
          "Blogs e áreas de conteúdo",
          "Lojas virtuais",
        ],
      },
      {
        number: "02",
        title: "Atendimento e relacionamento",
        items: [
          "Formulários guiados",
          "Solicitação de orçamento",
          "Agendamento",
          "Área do cliente",
          "Acompanhamento de serviços",
          "Envio e consulta de documentos",
          "Central de dúvidas",
          "Chat próprio",
        ],
      },
      {
        number: "03",
        title: "Organização interna",
        items: [
          "Cadastro de clientes",
          "Cadastro de produtos ou serviços",
          "Controle de solicitações",
          "Gestão de etapas",
          "Painéis administrativos",
          "Relatórios",
          "Histórico de alterações",
          "Controle de usuários e acessos",
        ],
      },
      {
        number: "04",
        title: "Projetos específicos",
        items: [
          "Sistemas sob medida",
          "Portais",
          "Áreas restritas",
          "Plataformas de cadastro",
          "Sistemas de consulta",
          "Ferramentas para equipes",
          "Integração entre sistemas",
          "Automação de processos",
        ],
      },
    ],
  },

  diagnosis: {
    eyebrow: "Talvez você não precise chegar com a solução pronta",
    title: "Você pode chegar apenas com o problema.",
    statements: [
      "Recebo tudo pelo WhatsApp e me perco.",
      "Uso várias planilhas e nunca sei qual está atualizada.",
      "O cliente precisa perguntar toda vez em que etapa está.",
      "Tenho uma ideia de plataforma, mas não sei como transformar em projeto.",
      "Quero vender ou atender online, mas não sei qual estrutura é necessária.",
      "Já tenho um sistema, mas algumas partes ainda dependem de trabalho manual.",
    ],
    closing:
      "A partir disso, organizamos o cenário, identificamos o que realmente precisa ser criado e definimos um primeiro passo possível.",
  },

  finalCta: {
    eyebrow: "Sites e Sistemas",
    title: "O problema não precisa chegar com nome técnico.",
    description:
      "Conte o que acontece hoje, o que está dando trabalho e o que você gostaria que funcionasse melhor. A tecnologia entra depois que o problema estiver claro.",
    cta: "Conversar sobre o projeto",
    href: "/contato",
  },
};
