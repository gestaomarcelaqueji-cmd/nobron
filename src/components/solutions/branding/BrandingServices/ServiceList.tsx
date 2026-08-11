"use client";

import Link from "next/link";

import {
  useEffect,
  useRef,
} from "react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import type { BrandingServiceCategory } from "@/data/solutions/branding";

import styles from "./BrandingServices.module.css";

type ServiceListProps = {
  categories: BrandingServiceCategory[];
  activeCategoryId: string;
};

type CategoryCopy = {
  statement: string;
  description: string;
  relatedPage?: {
    prefix: string;
    label: string;
    href: string;
  };
};

const categoryCopies: Record<string, CategoryCopy> = {
  identity: {
    statement:
      "Uma base visual para tudo continuar parecendo parte da mesma empresa.",
    description:
      "Da criação da logo às regras de uso, organizamos cores, tipografias, formas e elementos que podem acompanhar a empresa em diferentes materiais.",
  },

  social: {
    statement:
      "O assunto muda. A identidade continua presente.",
    description:
      "Posts, stories, capas, carrosséis e templates que permitem variar o conteúdo sem deixar o perfil com uma aparência diferente a cada publicação.",
  },

  campaigns: {
    statement:
      "Uma ideia visual forte o bastante para circular em muitos formatos.",
    description:
      "A campanha ganha uma linguagem própria, mas continua conectada à marca. A partir dela, criamos os desdobramentos para anúncios e divulgação.",
    relatedPage: {
      prefix:
        "Quando o projeto também envolve estratégia, mídia, canais e acompanhamento, entra o trabalho de",
      label: "Marketing Digital",
      href: "/solucoes/marketing-digital",
    },
  },

  commercial: {
    statement:
      "Apresentar melhor também ajuda o cliente a entender melhor.",
    description:
      "Propostas, apresentações, catálogos e portfólios que organizam a informação e deixam mais claro o que a empresa oferece.",
  },

  whatsapp: {
    statement:
      "Até uma conversa rápida pode manter cuidado e consistência.",
    description:
      "Materiais para explicar serviços, apresentar preços, orientar pagamentos e apoiar o atendimento sem uma sequência de artes improvisadas.",
  },

  web: {
    statement:
      "A identidade precisa continuar funcionando quando entra na interface.",
    description:
      "A direção visual de sites e páginas organiza tipografia, imagens e componentes para que o ambiente digital continue conectado à marca.",
  },

  events: {
    statement:
      "Vários materiais. Uma mesma atmosfera.",
    description:
      "Convites, divulgação, programação, credenciais, apresentações e telas passam a funcionar como partes da mesma experiência.",
  },

  content: {
    statement:
      "Informação extensa também pode ter ritmo, pausa e clareza.",
    description:
      "E-books, guias, relatórios e infográficos são organizados para facilitar a leitura sem diminuir a profundidade do conteúdo.",
  },
};

const fallbackCopy: CategoryCopy = {
  statement:
    "Diferentes materiais começam a trabalhar como partes da mesma identidade.",
  description:
    "Organizamos a linguagem visual para que cada aplicação tenha sua função sem perder conexão com o restante da marca.",
};

export function ServiceList({
  categories,
  activeCategoryId,
}: ServiceListProps) {
  const reduceMotion =
    Boolean(useReducedMotion());

  const viewportRefs = useRef<
    Record<string, HTMLDivElement | null>
  >({});

  useEffect(() => {
    viewportRefs.current[
      activeCategoryId
    ]?.scrollTo({
      top: 0,
      behavior: reduceMotion
        ? "auto"
        : "smooth",
    });
  }, [
    activeCategoryId,
    reduceMotion,
  ]);

  return (
    <div className={styles.contentSide}>
      {categories.map((category) => {
        const isActive =
          category.id === activeCategoryId;

        const copy =
          categoryCopies[category.id] ??
          fallbackCopy;

        return (
          <motion.article
            aria-hidden={!isActive}
            aria-live={
              isActive
                ? "polite"
                : undefined
            }
            className={
              styles.categoryContent
            }
            hidden={!isActive}
            key={category.id}
            initial={false}
            animate={
              isActive
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: 16,
                  }
            }
            transition={{
              duration:
                reduceMotion
                  ? 0
                  : 0.5,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
          >
            <div
              className={
                styles.categoryMeta
              }
            >
              <span>
                {category.number}
              </span>
            </div>

            <h3>
              {category.title}
            </h3>

            <p
              className={
                styles.categoryStatement
              }
            >
              {copy.statement}
            </p>

            <p
              className={
                styles.categoryDescription
              }
            >
              {copy.description}

              {copy.relatedPage ? (
                <>
                  {" "}
                  {
                    copy.relatedPage
                      .prefix
                  }{" "}
                  <Link
                    className="contextual-link"
                    href={
                      copy.relatedPage
                        .href
                    }
                  >
                    {
                      copy.relatedPage
                        .label
                    }
                  </Link>
                  .
                </>
              ) : null}
            </p>

            <motion.div
              aria-hidden="true"
              className={
                styles.transitionLine
              }
              initial={false}
              animate={{
                scaleX:
                  isActive ? 1 : 0,
              }}
              transition={{
                duration:
                  reduceMotion
                    ? 0
                    : 0.8,
                delay:
                  reduceMotion
                    ? 0
                    : 0.12,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
            />

            <div
              className={
                styles.servicesHeader
              }
            >
              <span>
                Opções desta categoria
              </span>

              <span>
                {String(
                  category.services
                    .length,
                ).padStart(
                  2,
                  "0",
                )}
              </span>
            </div>

            <div
              ref={(element) => {
                viewportRefs.current[
                  category.id
                ] = element;
              }}
              className={
                styles.servicesViewport
              }
            >
              <motion.ol
                className={
                  styles.servicesList
                }
                initial={false}
                animate={
                  isActive
                    ? "visible"
                    : "hidden"
                }
                variants={{
                  hidden: {},

                  visible: {
                    transition: {
                      staggerChildren:
                        reduceMotion
                          ? 0
                          : 0.045,

                      delayChildren:
                        reduceMotion
                          ? 0
                          : 0.14,
                    },
                  },
                }}
              >
                {category.services.map(
                  (
                    service,
                    index,
                  ) => (
                    <motion.li
                      key={service}
                      variants={{
                        hidden: {
                          opacity: 0,
                          y: 12,
                        },

                        visible: {
                          opacity: 1,
                          y: 0,

                          transition: {
                            duration:
                              reduceMotion
                                ? 0
                                : 0.36,

                            ease: [
                              0.22,
                              1,
                              0.36,
                              1,
                            ],
                          },
                        },
                      }}
                    >
                      <span>
                        {String(
                          index + 1,
                        ).padStart(
                          2,
                          "0",
                        )}
                      </span>

                      <strong>
                        {service}
                      </strong>
                    </motion.li>
                  ),
                )}
              </motion.ol>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}