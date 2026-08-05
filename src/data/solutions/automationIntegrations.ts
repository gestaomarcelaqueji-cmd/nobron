export type AutomationConcept = {
  id: "automation" | "integration" | "system" | "ai";
  number: string;
  title: string;
  description: string;
  example: string;
  doesNotMean: string;
};

export type AutomationService = {
  number: string;
  title: string;
  summary: string;
  details: string[];
  resolves: string;
};

export type AutomationScenario = {
  number: string;
  title: string;
  today: string;
  connected: string;
};

export const automationIntegrationsPageData = {
  hero: {
    title: "Automação e Integrações",
    description:
      "Conectamos sistemas, formulários, atendimentos, cadastros, documentos e ferramentas para reduzir tarefas repetidas, organizar processos e manter as informações circulando sem depender de trabalho manual.",
  },

  repetition: {
    eyebrow: "O trabalho que se repete",
    title: "A empresa não deveria depender de copiar, colar e lembrar.",
    description:
      "Quando uma informação precisa ser digitada em vários lugares, uma etapa depende de alguém avisar a próxima pessoa ou o cliente só recebe resposta quando alguém percebe a mensagem, o processo está exigindo atenção onde poderia existir estrutura.",
    items: [
      "Copiar dados do formulário para a planilha",
      "Cadastrar novamente o mesmo cliente",
      "Avisar manualmente que uma etapa terminou",
      "Procurar arquivos em conversas antigas",
      "Atualizar várias ferramentas separadamente",
      "Lembrar prazos e retornos",
      "Gerar documentos com as mesmas informações",
      "Responder perguntas repetidas",
    ],
    statement:
      "Automação não elimina a responsabilidade. Ela elimina a necessidade de repetir manualmente aquilo que já pode seguir uma regra.",
  },

  beforeAutomation: {
    eyebrow: "Antes da ferramenta",
    title: "Automatizar um processo ruim só faz o problema acontecer mais rápido.",
    description:
      "Primeiro entendemos o que acontece hoje, onde começam os erros, quais decisões realmente precisam de uma pessoa e quais etapas podem seguir regras claras.",
    stages: [
      {
        number: "01",
        title: "O que inicia o processo",
        description:
          "Um formulário, uma compra, uma mensagem, uma mudança de etapa ou uma data.",
      },
      {
        number: "02",
        title: "Quais informações são necessárias",
        description:
          "Dados do cliente, serviço, prazo, arquivos, responsáveis e condições.",
      },
      {
        number: "03",
        title: "O que pode acontecer sozinho",
        description:
          "Cadastrar, avisar, gerar, organizar, atualizar, encaminhar ou registrar.",
      },
      {
        number: "04",
        title: "Onde uma pessoa precisa decidir",
        description:
          "Aprovações, exceções, análises, negociações e situações fora do padrão.",
      },
    ],
  },

  concepts: {
    eyebrow: "Não é tudo a mesma coisa",
    title: "Automação, integração, sistema e inteligência artificial têm papéis diferentes.",
    description:
      "Os projetos podem usar uma ou várias dessas estruturas. A escolha depende do problema, não da tecnologia mais comentada no momento.",
    items: [
      {
        id: "automation",
        number: "01",
        title: "Automação",
        description:
          "Faz uma ação acontecer quando uma condição definida é atendida.",
        example:
          "Quando um formulário é enviado, cadastrar o contato, criar uma solicitação e avisar o responsável.",
        doesNotMean:
          "Não significa que a ferramenta decide tudo sozinha.",
      },
      {
        id: "integration",
        number: "02",
        title: "Integração",
        description:
          "Permite que ferramentas diferentes troquem informações entre si.",
        example:
          "O site envia os dados para o CRM e recebe de volta a etapa atual do atendimento.",
        doesNotMean:
          "Não significa apenas colocar dois links na mesma tela.",
      },
      {
        id: "system",
        number: "03",
        title: "Sistema",
        description:
          "Organiza informações, usuários, regras, etapas e ações em uma estrutura própria.",
        example:
          "Uma área do cliente com solicitações, documentos, histórico e acompanhamento.",
        doesNotMean:
          "Não precisa começar como uma plataforma enorme.",
      },
      {
        id: "ai",
        number: "04",
        title: "Inteligência artificial",
        description:
          "Pode interpretar, classificar, resumir ou gerar conteúdo quando uma regra simples não é suficiente.",
        example:
          "Classificar uma solicitação pelo assunto e sugerir para qual equipe ela deve seguir.",
        doesNotMean:
          "Não precisa estar em todo projeto e não substitui validação humana em decisões importantes.",
      },
    ] satisfies AutomationConcept[],
  },

  servicesIntro: {
    eyebrow: "O que pode ser conectado",
    title: "A automação acompanha o caminho que a informação precisa percorrer.",
    description:
      "O projeto pode começar por uma única tarefa repetitiva ou conectar diferentes partes da operação. A estrutura cresce conforme o uso mostra novas necessidades.",
  },

  services: [
    {
      number: "01",
      title: "Automação de formulários",
      summary:
        "Transformamos uma resposta recebida em ações organizadas dentro da operação.",
      details: [
        "Cadastro automático do contato",
        "Criação de solicitação ou oportunidade",
        "Separação por serviço, cidade ou prioridade",
        "Envio de confirmação",
        "Aviso para o responsável",
      ],
      resolves:
        "Evita que as informações fiquem paradas em uma caixa de entrada ou precisem ser copiadas manualmente.",
    },
    {
      number: "02",
      title: "CRM e organização do funil",
      summary:
        "Estruturamos contatos, oportunidades, etapas e próximos passos do relacionamento comercial.",
      details: [
        "Entrada automática de contatos",
        "Distribuição por responsável",
        "Mudança de etapas",
        "Lembretes de retorno",
        "Histórico de interações",
      ],
      resolves:
        "Reduz contatos esquecidos e permite entender o que está parado, avançando ou aguardando uma decisão.",
    },
    {
      number: "03",
      title: "Automação de atendimento",
      summary:
        "Organizamos respostas, encaminhamentos e registros sem fingir que toda conversa pode ser resolvida por um robô.",
      details: [
        "Identificação do assunto",
        "Respostas iniciais",
        "Coleta guiada de informações",
        "Encaminhamento para a pessoa certa",
        "Registro do atendimento",
      ],
      resolves:
        "Diminui perguntas repetidas e melhora a chegada da solicitação antes do atendimento humano.",
    },
    {
      number: "04",
      title: "Notificações e lembretes",
      summary:
        "Criamos avisos ligados a prazos, mudanças de etapa e ações pendentes.",
      details: [
        "Lembretes internos",
        "Atualizações para clientes",
        "Avisos de vencimento",
        "Cobranças de informações pendentes",
        "Alertas de situações fora do fluxo",
      ],
      resolves:
        "Evita que o processo dependa apenas da memória de quem está acompanhando.",
    },
    {
      number: "05",
      title: "Geração de documentos",
      summary:
        "Usamos informações já cadastradas para montar documentos sem redigitar os mesmos dados.",
      details: [
        "Propostas",
        "Contratos",
        "Declarações",
        "Relatórios",
        "Comprovantes e fichas",
      ],
      resolves:
        "Reduz tempo de produção, erros de digitação e divergências entre documentos.",
    },
    {
      number: "06",
      title: "Atualização de etapas",
      summary:
        "Fazemos o processo avançar quando determinadas ações são concluídas.",
      details: [
        "Mudança automática de status",
        "Liberação da próxima tarefa",
        "Solicitação de aprovação",
        "Atualização da área do cliente",
        "Registro de data e responsável",
      ],
      resolves:
        "Evita processos parados porque ninguém avisou que a etapa anterior terminou.",
    },
    {
      number: "07",
      title: "Integração entre ferramentas",
      summary:
        "Conectamos sistemas que hoje mantêm versões separadas da mesma informação.",
      details: [
        "Site e CRM",
        "Sistema e e-mail",
        "Formulário e planilha",
        "Plataforma de pagamento e cadastro",
        "Ferramentas internas e serviços externos",
      ],
      resolves:
        "Reduz duplicidade, retrabalho e diferenças entre informações armazenadas em lugares distintos.",
    },
    {
      number: "08",
      title: "Relatórios e painéis",
      summary:
        "Organizamos dados de diferentes fontes para acompanhar processos e resultados.",
      details: [
        "Volume de solicitações",
        "Tempo em cada etapa",
        "Origem dos contatos",
        "Pendências",
        "Indicadores definidos para a rotina",
      ],
      resolves:
        "Permite acompanhar o que acontece sem montar relatórios manualmente toda vez.",
    },
    {
      number: "09",
      title: "Permissões e condições",
      summary:
        "Definimos quem pode acessar, alterar, aprovar ou executar cada ação.",
      details: [
        "Acesso por função",
        "Condições para avançar",
        "Aprovações obrigatórias",
        "Bloqueio de ações indevidas",
        "Tratamento de dados sensíveis",
      ],
      resolves:
        "Evita que uma automação execute ações importantes sem a autorização ou a informação necessária.",
    },
    {
      number: "10",
      title: "Registro e histórico",
      summary:
        "Mantemos um histórico das ações importantes realizadas pela estrutura.",
      details: [
        "Quando a ação aconteceu",
        "Qual usuário participou",
        "Qual informação foi alterada",
        "Qual etapa foi concluída",
        "Qual erro ou exceção ocorreu",
      ],
      resolves:
        "Facilita a conferência, a investigação de problemas e o acompanhamento do processo.",
    },
    {
      number: "11",
      title: "Inteligência artificial aplicada",
      summary:
        "Usamos IA quando o processo precisa interpretar conteúdo em vez de apenas seguir uma condição simples.",
      details: [
        "Classificação de solicitações",
        "Extração de informações",
        "Resumos",
        "Sugestões de resposta",
        "Organização inicial de conteúdo",
      ],
      resolves:
        "Ajuda em tarefas que envolvem linguagem e variação, mantendo revisão humana onde houver risco ou decisão importante.",
    },
    {
      number: "12",
      title: "Workflows sob medida",
      summary:
        "Criamos fluxos completos para rotinas que não cabem em uma automação isolada.",
      details: [
        "Gatilhos e condições",
        "Etapas automáticas e humanas",
        "Integrações",
        "Tratamento de erros",
        "Acompanhamento e evolução",
      ],
      resolves:
        "Conecta diferentes ações em um processo contínuo, documentado e preparado para crescer.",
    },
  ] satisfies AutomationService[],

  connectedFlow: {
    eyebrow: "Uma informação, vários próximos passos",
    title: "O processo continua depois que a pessoa envia.",
    description:
      "A automação pode receber a informação, verificar condições, atualizar ferramentas, avisar responsáveis e manter o cliente informado. Cada ação acontece porque existe uma regra definida.",
    start: "Formulário enviado",
    nodes: [
      {
        number: "01",
        title: "Validar",
        description: "Verificar se os dados necessários foram preenchidos.",
      },
      {
        number: "02",
        title: "Cadastrar",
        description: "Criar ou atualizar o contato na ferramenta correta.",
      },
      {
        number: "03",
        title: "Organizar",
        description: "Definir serviço, prioridade, origem e responsável.",
      },
      {
        number: "04",
        title: "Avisar",
        description: "Confirmar o recebimento e comunicar a equipe.",
      },
      {
        number: "05",
        title: "Acompanhar",
        description: "Registrar prazo, etapa e próximos passos.",
      },
    ],
    exception:
      "Se algo estiver incompleto ou fora do padrão, o fluxo pode parar e pedir uma decisão humana.",
  },

  scenariosIntro: {
    eyebrow: "Na prática",
    title: "O que muda quando as ferramentas começam a trabalhar juntas?",
  },

  scenarios: [
    {
      number: "01",
      title: "O mesmo cliente é cadastrado várias vezes",
      today:
        "Os dados chegam pelo formulário, são copiados para uma planilha e depois digitados novamente no sistema.",
      connected:
        "A informação entra uma vez, é validada e segue para as ferramentas que realmente precisam dela.",
    },
    {
      number: "02",
      title: "A equipe não sabe que uma nova solicitação chegou",
      today:
        "Alguém precisa abrir a caixa de entrada, perceber a mensagem e avisar manualmente o responsável.",
      connected:
        "A solicitação é identificada, registrada e encaminhada conforme serviço, região ou prioridade.",
    },
    {
      number: "03",
      title: "O cliente pergunta toda vez sobre o andamento",
      today:
        "Cada atualização depende de alguém procurar a informação e responder individualmente.",
      connected:
        "Mudanças importantes podem atualizar a área do cliente ou disparar uma comunicação planejada.",
    },
    {
      number: "04",
      title: "Documentos são montados copiando dados",
      today:
        "Nome, serviço, valor e prazo são digitados novamente em cada proposta ou contrato.",
      connected:
        "O documento usa as informações já aprovadas e fica disponível para revisão antes do envio.",
    },
    {
      number: "05",
      title: "O processo quebra quando aparece uma exceção",
      today:
        "A automação continua mesmo com dados errados ou simplesmente para sem explicar o motivo.",
      connected:
        "Situações fora da regra são registradas e encaminhadas para uma pessoa decidir como continuar.",
    },
  ] satisfies AutomationScenario[],

  humanControl: {
    eyebrow: "Automático não significa sem controle",
    title: "As pessoas continuam responsáveis pelo que exige decisão.",
    description:
      "Um processo confiável precisa saber quando seguir sozinho, quando pedir aprovação e quando parar. A automação cuida da repetição. A supervisão humana cuida das exceções, prioridades e consequências.",
    automatic: [
      "Cadastrar informações válidas",
      "Enviar confirmações previstas",
      "Atualizar etapas",
      "Gerar documentos para revisão",
      "Criar lembretes",
      "Registrar o que aconteceu",
    ],
    human: [
      "Aprovar valores e condições",
      "Resolver dados conflitantes",
      "Negociar",
      "Analisar situações sensíveis",
      "Decidir diante de exceções",
      "Autorizar ações de maior impacto",
    ],
    statement:
      "Não existe automação séria sem tratamento de erro, registro e um caminho claro para intervenção humana.",
  },

  process: {
    eyebrow: "Como o projeto acontece",
    title: "Começamos pelo processo. Depois conectamos a tecnologia.",
    description:
      "A primeira versão resolve o ponto mais importante sem tentar automatizar toda a empresa de uma vez.",
    steps: [
      {
        number: "01",
        title: "Mapear a rotina",
        description:
          "Identificamos entradas, pessoas, ferramentas, decisões, repetições e erros frequentes.",
      },
      {
        number: "02",
        title: "Definir as regras",
        description:
          "Organizamos condições, etapas, dados obrigatórios e situações que exigem aprovação.",
      },
      {
        number: "03",
        title: "Escolher o primeiro fluxo",
        description:
          "Priorizamos o ponto que gera mais retrabalho, perda de informação ou demora.",
      },
      {
        number: "04",
        title: "Construir e conectar",
        description:
          "Criamos as automações, integrações, registros e telas necessárias.",
      },
      {
        number: "05",
        title: "Testar exceções",
        description:
          "Verificamos dados ausentes, falhas externas, duplicidades e ações fora da ordem.",
      },
      {
        number: "06",
        title: "Acompanhar o uso",
        description:
          "Observamos o fluxo real, corrigimos pontos frágeis e identificamos novas oportunidades.",
      },
      {
        number: "07",
        title: "Evoluir por partes",
        description:
          "Novas automações entram conforme a estrutura se torna estável e útil para a equipe.",
      },
    ],
  },

  finalCta: {
    eyebrow: "Automação e Integrações",
    title: "Vamos começar pelo trabalho que mais se repete.",
    description:
      "Conte como a rotina funciona hoje. A partir disso, identificamos o primeiro fluxo que pode ser organizado.",
    cta: "Conversar sobre a rotina",
    href: "/contato",
  },
};
