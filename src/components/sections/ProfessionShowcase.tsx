"use client";

import {
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";

import { Container } from "@/components/ui/Container";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type StoryStep = {
  title: ReactNode;
  description?: string;
  layout: "hero" | "statement";
  tone: "problem" | "solution";
  showQuestions?: boolean;
  showCta?: boolean;
};

const storySteps: StoryStep[] = [
  {
    title: (
      <>
        Sabe aquela correria de{" "}
        <span>responder sempre a mesma coisa</span>{" "}
        enquanto ainda precisa trabalhar?
      </>
    ),
    layout: "hero",
    tone: "problem",
  },
  {
    title: (
      <>
        Enquanto você atende, dirige, executa um serviço ou está com outro
        cliente, o{" "}
        <span>WhatsApp continua cheio de perguntas repetidas.</span>
      </>
    ),
    layout: "statement",
    tone: "problem",
    showQuestions: true,
  },
  {
    title: (
      <>
        E os curiosos que perguntam tudo{" "}
        <span>e depois desaparecem?</span>
      </>
    ),
    description:
      "Você para o que está fazendo, procura fotos, envia localização, explica como funciona e, muitas vezes, a conversa termina sem resposta.",
    layout: "hero",
    tone: "problem",
  },
  {
    title: (
      <>
        Com uma Landing Page,{" "}
        <span>boa parte disso</span>{" "}
        <span>já fica resolvida antes.</span>
      </>
    ),
    description:
      "Serviços, fotos, área atendida, funcionamento, dúvidas e formas de contato ficam organizados para a pessoa consultar antes de chamar você.",
    layout: "hero",
    tone: "solution",
  },
  {
    title: (
      <>
        Menos dor de cabeça.{" "}
        <span>Mais tempo, mais pedidos e mais PIX.</span>
      </>
    ),
    description:
      "Os curiosos encontram respostas. Os interessados ganham confiança. E quem chega ao WhatsApp já está muito mais perto de pedir, agendar ou contratar.",
    layout: "hero",
    tone: "solution",
    showCta: true,
  },
];

const repeatedQuestions = [
  "Quanto custa?",
  "Como funciona?",
  "Onde você atende?",
  "Tem horário?",
  "Faz esse serviço?",
  "Tem fotos?",
  "Qual a localização?",
  "Aceita PIX?",
  "Quanto tempo demora?",
  "Tem vaga hoje?",
  "Como faço para contratar?",
  "Atende minha cidade?",
];

/*
 * A primeira pergunta aparece depois desta pausa.
 * Isso permite que a pessoa comece a ler a mensagem principal.
 */
const QUESTIONS_START_DELAY = 0.72;

/*
 * Intervalo entre a entrada de cada pergunta.
 * Aumente para deixar mais lento.
 */
const QUESTION_INTERVAL = 0.28;

const copyVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? 46 : -38,
    scale: 0.985,
    filter: "blur(12px)",
  }),

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  },

  exit: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? -38 : 46,
    scale: 0.985,
    filter: "blur(12px)",
  }),
};

export function ProfessionShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const activeRef = useRef(0);

  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const nextStep = Math.min(
      storySteps.length - 1,
      Math.floor(progress * storySteps.length),
    );

    if (nextStep === activeRef.current) {
      return;
    }

    setDirection(nextStep > activeRef.current ? 1 : -1);

    activeRef.current = nextStep;
    setActive(nextStep);
  });

  const currentStep = storySteps[active];
  const isSolution = currentStep.tone === "solution";

  const copyTransition = {
    duration: reducedMotion ? 0 : isMobile ? 0.46 : 0.62,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    <section
      ref={sectionRef}
      className={`time-saver-section${
        isSolution ? " is-solution" : ""
      }`}
      id="exemplos"
      data-step={active}
    >
      <div className="time-saver-sticky">
        <div
          className="time-saver-background"
          aria-hidden="true"
        >
          <i />
          <i />
        </div>

        <AnimatePresence>
          {currentStep.showQuestions ? (
            <motion.div
              key={`questions-${active}`}
              className="time-saver-questions"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: reducedMotion ? 0 : isMobile ? 0.22 : 0.3,
              }}
              aria-hidden="true"
            >
              {repeatedQuestions.map((question, index) => {
                const questionDelay =
                  (isMobile ? 0.32 : QUESTIONS_START_DELAY) +
                  index * (isMobile ? 0.18 : QUESTION_INTERVAL);

                return (
                  <motion.div
                    className="time-saver-question"
                    key={question}
                    initial={
                      reducedMotion
                        ? false
                        : {
                            opacity: 0,
                            scale: 0.82,
                            y:
                              index % 2 === 0
                                ? 18
                                : -18,
                            filter: "blur(7px)",
                          }
                    }
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      filter: "blur(0px)",
                    }}
                    exit={
                      reducedMotion
                        ? undefined
                        : {
                            opacity: 0,
                            scale: 0.88,
                            y:
                              index % 2 === 0
                                ? -14
                                : 14,
                            filter: "blur(5px)",
                          }
                    }
                    transition={{
                      duration: reducedMotion
                        ? 0
                        : isMobile
                          ? 0.3
                          : 0.42,
                      delay: reducedMotion
                        ? 0
                        : questionDelay,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <span>?</span>

                    {question}
                  </motion.div>
                );
              })}
            </motion.div>
          ) : null}
        </AnimatePresence>

        <Container className="time-saver-content">
          <div
            className="time-saver-copy-window"
            aria-live="polite"
          >
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="wait"
            >
              <motion.div
                key={active}
                className={`time-saver-copy time-saver-copy--${currentStep.layout}`}
                custom={direction}
                variants={copyVariants}
                initial="enter"
                animate="visible"
                exit="exit"
                transition={copyTransition}
              >
                <h2>{currentStep.title}</h2>

                {currentStep.description ? (
                  <motion.p
                    initial={
                      reducedMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 16,
                            filter: "blur(5px)",
                          }
                    }
                    animate={{
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                    }}
                    transition={{
                      ...copyTransition,
                      delay: reducedMotion
                        ? 0
                        : isMobile
                          ? 0.1
                          : 0.14,
                    }}
                  >
                    {currentStep.description}
                  </motion.p>
                ) : null}

                {currentStep.showCta ? (
                  <motion.a
                    href="#preco"
                    className="time-saver-cta"
                    initial={
                      reducedMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 18,
                          }
                    }
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      ...copyTransition,
                      delay: reducedMotion
                        ? 0
                        : isMobile
                          ? 0.18
                          : 0.28,
                    }}
                  >
                    Quero ganhar tempo com minha página

                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </motion.a>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>
        </Container>

        <div
          className="time-saver-step-progress"
          aria-hidden="true"
        >
          {storySteps.map((_, index) => (
            <i
              className={
                index <= active
                  ? "is-active"
                  : ""
              }
              key={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}