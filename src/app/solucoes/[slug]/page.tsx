import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { HERO_SOLUTIONS } from "@/components/HeroImmersive/heroImmersive.data";
import type {
  HeroSolution,
  HeroSolutionId,
} from "@/components/HeroImmersive/heroImmersive.types";
import { BrandingPage } from "@/components/solutions/branding/BrandingPage/BrandingPage";
import { StrategyPage } from "@/components/solutions/strategy/StrategyPage/StrategyPage";
import { brandingPageData } from "@/data/solutions/branding";
import { strategyPageData } from "@/data/solutions/strategy";

import styles from "./page.module.css";

type SolutionPageProps = {
  params: Promise<{ slug: string }>;
};

const solutionDetails: Record<
  Exclude<HeroSolutionId, "landing-page">,
  readonly string[]
> = {
  strategy: [
    "Clareza sobre a direção e o posicionamento da empresa",
    "Estrutura de oferta e comunicação alinhada ao objetivo",
    "Planejamento mais consistente para ação e execução",
  ],
  branding: [
    "Identidade visual com direção clara e consistente",
    "Materiais e pontos de contato alinhados à percepção da marca",
    "Uma base reconhecível para o negócio crescer com coesão",
  ],
  "sites-systems": [
    "Estrutura adequada ao objetivo e ao momento do negócio",
    "Conteúdo organizado para uma navegação simples",
    "Experiência responsiva para diferentes tamanhos de tela",
  ],
  seo: [
    "Presença digital organizada para ser encontrada e compreendida",
    "Estratégia de conteúdo e contexto alinhada ao público",
    "Mais clareza para quem busca, pesquisa e escolhe",
  ],
  "marketing-digital": [
    "Leitura do cenário antes de escolher canais e campanhas",
    "Caminhos claros entre divulgação, interesse e contato",
    "Decisões orientadas pelos objetivos do negócio",
  ],
  automation: [
    "Mapeamento dos fluxos que hoje geram atrito",
    "Integrações e ferramentas adequadas à operação",
    "Automação de tarefas repetitivas sem perder o controle",
  ],
};

function getSolution(slug: string): HeroSolution | undefined {
  return HERO_SOLUTIONS.find(
    (solution) =>
      !solution.featured &&
      solution.href === `/solucoes/${slug}`,
  );
}

export function generateStaticParams() {
  return [
    { slug: strategyPageData.slug },
    { slug: brandingPageData.slug },
    ...HERO_SOLUTIONS.filter((solution) => !solution.featured).map(
      (solution) => ({
        slug: solution.href.replace("/solucoes/", ""),
      }),
    ),
  ];
}

export async function generateMetadata({
  params,
}: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params;

  if (slug === strategyPageData.slug) {
    return {
      title: "Estratégia e Direção | noBRon",
      description:
        "Diagnóstico, posicionamento, organização da oferta, planejamento de comunicação, campanhas e plano de ação para empresas.",
    };
  }

  if (slug === brandingPageData.slug) {
    return {
      title: "Branding e Design | noBRon",
      description:
        "Identidade visual, direção de marca e materiais consistentes para todos os pontos de contato da empresa.",
    };
  }

  const solution = getSolution(slug);

  if (!solution) {
    return {};
  }

  return {
    title: `${solution.label} | noBRon`,
    description: solution.description,
  };
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { slug } = await params;

  if (slug === strategyPageData.slug) {
    return (
      <main>
        <StrategyPage />
      </main>
    );
  }

  if (slug === brandingPageData.slug) {
    return (
      <main>
        <BrandingPage />
      </main>
    );
  }

  const solution = getSolution(slug);

  if (!solution || solution.id === "landing-page") {
    notFound();
  }

  const details = solutionDetails[solution.id];

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Link className={styles.backLink} href="/">
          <ArrowLeft aria-hidden="true" />
          Voltar ao mapa de soluções
        </Link>

        <div className={styles.heroGrid}>
          <div>
            <p className={styles.index}>
              {String(solution.order).padStart(2, "0")} /{" "}
              {String(HERO_SOLUTIONS.length - 1).padStart(2, "0")}
            </p>
            <h1>{solution.label}</h1>
          </div>
          <p className={styles.description}>{solution.description}</p>
        </div>
      </section>

      <section className={styles.details} aria-labelledby="solution-details-title">
        <div className={styles.detailsIntro}>
          <p>Um projeto começa pelo que precisa mudar.</p>
          <h2 id="solution-details-title">
            O que podemos organizar juntos
          </h2>
        </div>

        <ol className={styles.detailList}>
          {details.map((detail, index) => (
            <li key={detail}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.cta} aria-labelledby="solution-cta-title">
        <p>Seu projeto não precisa caber em uma fórmula pronta.</p>
        <h2 id="solution-cta-title">
          Conte o que sua empresa precisa construir agora.
        </h2>
        <Link href="/prototipo-gratuito">
          Começar pelo protótipo gratuito
          <ArrowRight aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}
