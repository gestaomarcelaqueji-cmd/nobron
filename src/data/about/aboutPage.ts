export type AboutCopyGroup = {
  title: string;
  description: string;
};

export type AboutStage = {
  id: string;
  menuLabel: string;
  eyebrow: string;
  title: string;
  paragraphs?: string[];
  intro?: string;
  groups?: AboutCopyGroup[];
  traits?: string[];
  density?: "normal" | "dense";
};

export const aboutPageData = {
  opening: {
    firstLine: "A tecnologia executa.",
    secondLine:
      "O conhecimento de quem conduz define o resultado.",
  },

  stages: [
    {
      id: "01",
      menuLabel: "Trajetória",
      eyebrow: "01 — APRESENTAÇÃO",
      title:
        "Por trás da noBRon, existe uma trajetória entre criação, estratégia e tecnologia.",
      paragraphs: [
        "Diferentes áreas de estudo e experiência se conectam para entender o problema, definir a direção e construir soluções que façam sentido para cada empresa.",
      ],
    },
    {
      id: "02",
      menuLabel: "Origem",
      eyebrow: "02 — ORIGEM",
      title: "A experiência começou na execução.",
      paragraphs: [
        "Foram cinco anos trabalhando com organização e decoração de eventos. Um ambiente em que estética, planejamento, fornecedores, orçamento, prazos e público precisam funcionar juntos — e em que cada decisão interfere no resultado final.",
        "Foi ali que se formou uma maneira de trabalhar baseada em observar o todo, antecipar problemas e assumir responsabilidade pela entrega.",
      ],
    },
    {
      id: "03",
      menuLabel: "Transição",
      eyebrow: "03 — MUDANÇA DE DIREÇÃO",
      title:
        "O ambiente mudou. A forma de trabalhar continuou.",
      paragraphs: [
        "A interrupção do setor de eventos abriu espaço para uma mudança profissional. Design, que antes fazia parte dos interesses pessoais, encontrou o marketing e passou a ocupar o centro dos estudos e do trabalho.",
        "Ao mesmo tempo, empresas precisavam reorganizar sua presença no digital. A transição começou pela comunicação e continuou avançando para estratégia, desenvolvimento e tecnologia.",
      ],
    },
    {
      id: "04",
      menuLabel: "Estudos",
      eyebrow: "04 — ESTUDOS",
      title: "Uma área levou à próxima.",
      intro:
        "O trabalho não foi construído a partir de uma única formação. Cada novo campo surgiu da necessidade de compreender uma parte maior do processo.",
      groups: [
        {
          title: "Marketing e publicidade digital",
          description:
            "Estudos em marketing, marketing digital, vendas, redes sociais, tráfego pago, e-mail marketing e gestão.",
        },
        {
          title: "Criação e identidade",
          description:
            "Experiência prática com marcas, comunicação visual, conteúdo e materiais desenvolvidos para diferentes tipos de negócio.",
        },
        {
          title: "Desenvolvimento de sistemas",
          description:
            "Estudos de lógica, programação, banco de dados, interfaces, funcionamento de sistemas e estruturas digitais.",
        },
        {
          title: "Inteligência artificial",
          description:
            "Estudos voltados ao uso da inteligência artificial em criação, análise, automação e desenvolvimento.",
        },
      ],
      density: "dense",
    },
    {
      id: "05",
      menuLabel: "Experiência",
      eyebrow: "05 — EXPERIÊNCIA",
      title:
        "Aprender negócios diferentes virou parte do trabalho.",
      paragraphs: [
        "A experiência passou por empresas de serviços, saúde, beleza, alimentação, educação, imóveis, varejo, entretenimento e atendimento local.",
        "Cada segmento possui públicos, processos e formas diferentes de gerar confiança.",
        "Essa variedade desenvolveu uma habilidade central: entrar em um cenário novo, compreender como ele funciona e só depois decidir o que precisa ser criado.",
      ],
    },
    {
      id: "06",
      menuLabel: "Perfil",
      eyebrow: "06 — CARACTERÍSTICAS",
      title:
        "Conhecimento técnico sem perder a visão do todo.",
      traits: [
        "Leitura de cenário",
        "Direção",
        "Visão de negócio",
        "Criação",
        "Tecnologia",
        "Aprendizado contínuo",
      ],
    },
    {
      id: "07",
      menuLabel: "Tecnologia",
      eyebrow: "07 — TECNOLOGIA",
      title:
        "Ter acesso à tecnologia não significa saber o que fazer com ela.",
      paragraphs: [
        "Ferramentas podem acelerar pesquisas, testes, criação, desenvolvimento e organização.",
        "Mas o resultado depende de saber o que perguntar, como avaliar a resposta, o que precisa ser corrigido e onde aquela tecnologia realmente deve entrar.",
      ],
    },
    {
      id: "08",
      menuLabel: "noBRon",
      eyebrow: "08 — NOBRON",
      title:
        "A noBRon nasceu da conexão entre tudo isso.",
      paragraphs: [
        "Estratégia organiza a direção. Design transforma essa direção em percepção. Sites e sistemas criam estrutura. SEO facilita a descoberta. Marketing movimenta a mensagem. Automação ajuda o trabalho a continuar.",
        "Cada área participa quando existe um motivo real para ela estar ali.",
      ],
    },
    {
      id: "09",
      menuLabel: "Fechamento",
      eyebrow: "09 — FECHAMENTO",
      title:
        "Cada projeto assume a identidade da empresa. O conhecimento por trás da construção permanece.",
    },
  ] satisfies AboutStage[],
};