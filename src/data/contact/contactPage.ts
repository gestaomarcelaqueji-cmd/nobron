import { siteConfig } from "@/data/site";

export type ContactPathId =
  | "starting"
  | "existing"
  | "defined"
  | "team"
  | "open";

export type ContactField = {
  id: string;
  label: string;
  type: "text" | "textarea" | "select" | "multiselect";
  placeholder?: string;
  required?: boolean;
  wide?: boolean;
  options?: string[];
};

export type ContactPath = {
  id: ContactPathId;
  number: string;
  title: string;
  summary: string;
  formTitle: string;
  formDescription: string;
  fields: ContactField[];
};

export const contactPageData = {
  hero: {
    title: "Contato",
    description:
      "Escolha o caminho que mais se aproxima do momento da sua empresa. As perguntas mudam para que você não precise preencher informações que não fazem sentido para o seu caso.",
  },

  experience: {
    eyebrow: "Por onde começamos",
    title: "Qual situação mais se aproxima da sua?",
    description:
      "Você não precisa descobrir sozinho qual serviço contratar. Escolha o cenário mais próximo e conte apenas o que já sabe.",
  },

  commonFields: [
    {
      id: "name",
      label: "Seu nome",
      type: "text",
      placeholder: "Como podemos chamar você?",
      required: true,
    },
    {
      id: "company",
      label: "Empresa ou projeto",
      type: "text",
      placeholder: "Opcional",
    },
    {
      id: "contactPreference",
      label: "Como prefere continuar?",
      type: "select",
      required: true,
      options: ["WhatsApp", "E-mail"],
    },
    {
      id: "contact",
      label: "Seu WhatsApp ou e-mail",
      type: "text",
      placeholder: "Digite o contato escolhido",
      required: true,
    },
  ] satisfies ContactField[],

  paths: [
    {
      id: "starting",
      number: "01",
      title: "Estou começando do zero",
      summary:
        "Tenho uma ideia, estou abrindo uma empresa ou ainda preciso organizar o que deve ser criado primeiro.",
      formTitle: "Vamos entender em que ponto a ideia está.",
      formDescription:
        "Não é necessário ter nome, identidade ou plano pronto. Conte o que pretende oferecer e o que já existe hoje.",
      fields: [
        {
          id: "idea",
          label: "O que você pretende criar?",
          type: "textarea",
          placeholder:
            "Explique brevemente a ideia, o produto, o serviço ou a empresa que está começando.",
          required: true,
          wide: true,
        },
        {
          id: "stage",
          label: "Em que ponto está agora?",
          type: "select",
          required: true,
          options: [
            "Tenho somente a ideia",
            "Já defini o que vou oferecer",
            "A empresa já possui nome",
            "Já comecei a atender ou vender",
          ],
        },
        {
          id: "existing",
          label: "O que já existe?",
          type: "multiselect",
          wide: true,
          options: [
            "Nome",
            "Logotipo ou identidade",
            "Redes sociais",
            "Clientes",
            "Site",
            "Nada ainda",
          ],
        },
        {
          id: "timeline",
          label: "Quando gostaria de começar?",
          type: "select",
          options: [
            "O quanto antes",
            "Nas próximas semanas",
            "Nos próximos meses",
            "Ainda estou pesquisando",
          ],
        },
      ],
    },
    {
      id: "existing",
      number: "02",
      title: "Minha empresa já existe",
      summary:
        "A empresa já atende ou vende, mas a comunicação, os canais ou os processos não funcionam juntos.",
      formTitle: "Vamos localizar o ponto que está travando.",
      formDescription:
        "Explique o que acontece hoje e onde você sente que a estrutura deixou de acompanhar a empresa.",
      fields: [
        {
          id: "currentSituation",
          label: "O que está dando trabalho hoje?",
          type: "textarea",
          placeholder:
            "Conte o que se repete, se perde, atrasa, confunde clientes ou depende demais de improviso.",
          required: true,
          wide: true,
        },
        {
          id: "desiredChange",
          label: "O que você gostaria que funcionasse melhor?",
          type: "textarea",
          placeholder:
            "Explique o resultado que gostaria de alcançar, mesmo sem saber qual solução seria necessária.",
          required: true,
          wide: true,
        },
        {
          id: "areas",
          label: "Quais áreas parecem relacionadas?",
          type: "multiselect",
          wide: true,
          options: [
            "Marca e comunicação",
            "Site ou página",
            "Google e presença digital",
            "Campanhas e anúncios",
            "Atendimento",
            "Organização interna",
            "Automação",
            "Não sei identificar",
          ],
        },
        {
          id: "currentLinks",
          label: "Site ou rede social",
          type: "text",
          placeholder: "Cole um link, se existir",
        },
      ],
    },
    {
      id: "defined",
      number: "03",
      title: "Já sei o que preciso criar",
      summary:
        "Estou procurando um serviço específico e quero explicar o projeto, o prazo e o que já existe.",
      formTitle: "Vamos direto ao projeto.",
      formDescription:
        "Selecione a área e descreva o que precisa ser criado. As informações servem apenas para preparar a conversa.",
      fields: [
        {
          id: "service",
          label: "Qual serviço você procura?",
          type: "select",
          required: true,
          options: [
            "Estratégia e direção",
            "Branding e design",
            "Sites e sistemas",
            "SEO e presença digital",
            "Marketing digital",
            "Automação e integrações",
            "Mais de uma área",
          ],
        },
        {
          id: "project",
          label: "O que precisa ser criado?",
          type: "textarea",
          placeholder:
            "Descreva o projeto, a função que precisa cumprir e qualquer decisão que já tenha sido tomada.",
          required: true,
          wide: true,
        },
        {
          id: "materials",
          label: "O que já existe?",
          type: "multiselect",
          wide: true,
          options: [
            "Identidade visual",
            "Textos",
            "Fotos ou vídeos",
            "Site ou sistema anterior",
            "Documentação",
            "Nada ainda",
          ],
        },
        {
          id: "deadline",
          label: "Existe prazo?",
          type: "select",
          options: [
            "Sim, existe uma data definida",
            "Tenho uma previsão",
            "Não existe urgência",
            "Preciso entender o prazo possível",
          ],
        },
      ],
    },
    {
      id: "team",
      number: "04",
      title: "Represento uma empresa ou equipe",
      summary:
        "O projeto envolve diferentes responsáveis, aprovações, processos internos ou uma estrutura mais ampla.",
      formTitle: "Vamos preparar uma conversa com o contexto certo.",
      formDescription:
        "Conte quem participa, o que precisa ser resolvido e como a empresa prefere conduzir o próximo passo.",
      fields: [
        {
          id: "role",
          label: "Qual é a sua participação?",
          type: "text",
          placeholder: "Cargo, área ou relação com o projeto",
          required: true,
        },
        {
          id: "context",
          label: "Qual é o contexto do projeto?",
          type: "textarea",
          placeholder:
            "Explique a necessidade, as áreas envolvidas, o que já foi decidido e o resultado esperado.",
          required: true,
          wide: true,
        },
        {
          id: "decision",
          label: "Quem participa da decisão?",
          type: "select",
          options: [
            "Eu decido diretamente",
            "Existe outra pessoa responsável",
            "Participam várias áreas",
            "Ainda será definido",
          ],
        },
        {
          id: "documentation",
          label: "Já existe documentação ou escopo?",
          type: "select",
          options: ["Sim", "Existe material parcial", "Não"],
        },
        {
          id: "nextStep",
          label: "Como prefere continuar?",
          type: "select",
          options: [
            "Reunião online",
            "Conversa inicial por WhatsApp",
            "Troca de informações por e-mail",
          ],
        },
      ],
    },
    {
      id: "open",
      number: "05",
      title: "Quero apenas explicar o cenário",
      summary:
        "Não sei em qual opção meu caso entra. Quero contar o que está acontecendo e entender por onde começar.",
      formTitle: "Pode começar pelo problema.",
      formDescription:
        "Não tente dar um nome técnico à situação. Conte o que acontece hoje e o que gostaria que fosse diferente.",
      fields: [
        {
          id: "scenario",
          label: "O que está acontecendo?",
          type: "textarea",
          placeholder:
            "Conte o cenário do seu jeito: o que existe, o que está dando trabalho e o que motivou a conversa.",
          required: true,
          wide: true,
        },
        {
          id: "outcome",
          label: "O que você gostaria que mudasse?",
          type: "textarea",
          placeholder:
            "Pode ser uma melhoria simples, uma ideia ainda aberta ou um resultado que deseja alcançar.",
          wide: true,
        },
        {
          id: "bestTime",
          label: "Qual é o melhor momento para conversar?",
          type: "select",
          options: [
            "Manhã",
            "Tarde",
            "Noite",
            "Posso responder quando possível",
          ],
        },
      ],
    },
  ] satisfies ContactPath[],

  nextSteps: {
    eyebrow: "Depois do envio",
    title: "O próximo passo continua simples.",
    steps: [
      {
        number: "01",
        title: "Recebemos o contexto",
        description:
          "A mensagem chega organizada conforme o caminho escolhido.",
      },
      {
        number: "02",
        title: "Analisamos o cenário",
        description:
          "Observamos a necessidade antes de indicar serviço ou formato.",
      },
      {
        number: "03",
        title: "Retornamos pelo contato escolhido",
        description:
          "A conversa continua por WhatsApp ou e-mail.",
      },
      {
        number: "04",
        title: "Definimos o próximo passo",
        description:
          "Pode ser uma pergunta, uma reunião, um diagnóstico ou uma proposta.",
      },
    ],
  },

  direct: {
    eyebrow: "Contato direto",
    title: "Prefere conversar sem preencher?",
    description:
      "A noBRon atua a partir de Telêmaco Borba, Paraná, com atendimento digital para profissionais e empresas. Você também pode iniciar uma conversa direta, sem precisar preparar um briefing antes.",
    whatsappLabel: "Conversar pelo WhatsApp",
    emailLabel: "Enviar um e-mail",

    whatsappNumber: siteConfig.whatsapp,
    email: "nobron@gmail.com",
  },
};
