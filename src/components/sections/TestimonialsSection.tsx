"use client";

import {
  BadgeCheck,
  CircleDollarSign,
  HeartHandshake,
  Palette,
  Quote,
  Star,
  UsersRound,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";

type Testimonial = {
  quote: string;
  name: string;
  category: string;
  icon: typeof BadgeCheck;
  featured?: boolean;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Você é INCRÍVEL, Maravilhosa, atenciosa, perfeita mesmo, o slogan que fez ficou a minha cara, obrigada por ser essa profissional ❤️",
    name: "Isabelly Soares",
    category: "Personalização",
    icon: Palette,
    featured: true,
  },
  {
    quote:
      "O trabalho dela é incrível!!! Super atenciosa e competente!!",
    name: "Ana Santos",
    category: "Atendimento",
    icon: HeartHandshake,
  },
  {
    quote:
      "Muito competente, está em um nível alto e cobra um valor justo.",
    name: "Tiago Fantin",
    category: "Competência e valor",
    icon: CircleDollarSign,
  },
  {
    quote:
      "Amei o trabalho. Me ajudou a engajar no Instagram, me deu uma direção de conteúdo, de organização nos feeds, e sempre muito prestativa, disposta a me ajudar. Gratidão.",
    name: "Mariane Ribeiro",
    category: "Direção e organização",
    icon: UsersRound,
  },
  {
    quote:
      "Não teria melhor escolha. Serviço excelente e muito completo. Sempre fazendo da melhor forma e ouvindo a opinião de nós clientes também.",
    name: "Daniele Lucio",
    category: "Escuta e entrega",
    icon: BadgeCheck,
  },
  {
    quote:
      "Trabalho muito ótimo, super recomendo.",
    name: "Fernando Ubaldo",
    category: "Recomendação",
    icon: Star,
  },
];

export function TestimonialsSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="testimonials-section" id="feedbacks">
      <Container>
        <motion.div
          className="testimonials-heading"
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  y: 26,
                  filter: "blur(10px)",
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{
            duration: reducedMotion ? 0 : 0.68,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <h2>
            O cuidado aparece no processo.{" "}
            <span>A qualidade aparece na entrega.</span>
          </h2>

          <p>
            Cada projeto começa entendendo o que o cliente realmente precisa.
            Estes são alguns retornos públicos de quem já acompanhou esse
            trabalho.
          </p>
        </motion.div>

        <div className="testimonials-grid">
          {testimonials.map(
            ({ quote, name, category, icon: Icon, featured }, index) => (
              <motion.article
                className={`testimonial-card ${
                  featured ? "testimonial-card--featured" : ""
                }`}
                key={name}
                initial={
                  reducedMotion
                    ? false
                    : {
                        opacity: 0,
                        y: featured ? 34 : 26,
                        x:
                          index === 1
                            ? 20
                            : index === 2
                              ? -16
                              : index % 2 === 0
                                ? -12
                                : 12,
                        rotate:
                          index === 1
                            ? 1.8
                            : index === 2
                              ? -1.5
                              : index % 2 === 0
                                ? -1
                                : 1,
                        filter: "blur(8px)",
                      }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                  x: 0,
                  rotate: 0,
                  filter: "blur(0px)",
                }}
                whileHover={
                  reducedMotion
                    ? undefined
                    : {
                        y: -5,
                        rotate: 0,
                      }
                }
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: reducedMotion ? 0 : 0.62,
                  delay: reducedMotion ? 0 : index * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="testimonial-card__top">
                  <span className="testimonial-card__category">
                    <Icon aria-hidden="true" />
                    {category}
                  </span>

                  <Quote
                    className="testimonial-card__quote-icon"
                    aria-hidden="true"
                  />
                </div>

                <blockquote>“{quote}”</blockquote>

                <footer>
                  <div className="testimonial-card__avatar">
                    {name
                      .split(" ")
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((part) => part[0])
                      .join("")
                      .toUpperCase()}
                  </div>

                  <div>
                    <strong>{name}</strong>
                    <span>Cliente noBRon</span>
                  </div>
                </footer>
              </motion.article>
            ),
          )}
        </div>

        <motion.div
          className="testimonials-closing"
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  y: 20,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            duration: reducedMotion ? 0 : 0.6,
            delay: reducedMotion ? 0 : 0.12,
          }}
        >
          <p>
            Não queremos apenas que você goste do visual. Queremos que você se
            reconheça no que foi entregue.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
