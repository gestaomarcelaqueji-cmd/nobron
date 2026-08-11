"use client";

import Link from "next/link";

import {
  Boxes,
  Building2,
  LayoutGrid,
  ShoppingBag,
  UsersRound,
} from "lucide-react";
import { motion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { RollingButton } from "@/components/ui/RollingButton";
import { whatsappMessages } from "@/data/site";
import { createWhatsAppUrl } from "@/lib/whatsapp";

const complexNeeds = [
  {
    label: "Muitos departamentos",
    icon: Building2,
  },
  {
    label: "Centenas de produtos",
    icon: ShoppingBag,
  },
  {
    label: "Várias unidades",
    icon: UsersRound,
  },
  {
    label: "Área do cliente",
    icon: Boxes,
  },
  {
    label: "Sistemas complexos",
    icon: LayoutGrid,
  },
];

export function NotEnoughSection() {
  return (
    <section className="section not-enough-section">
      <Container className="not-enough-layout">
        <div className="not-enough-copy">
          <h2>
            Não sabe se precisa de uma Landing Page ou site? Tudo bem!
          </h2>

          <p>
            Quando o objetivo exige catálogo amplo, estoque, diferentes áreas
            ou funcionalidades complexas, a estrutura correta pode ser um{" "}
            <Link
              className="contextual-link"
              href="/solucoes/sites-sistemas"
            >
              site completo ou sistema personalizado
            </Link>
            .
          </p>

          <RollingButton
            variant="secondary"
            href={createWhatsAppUrl(
              whatsappMessages.evaluate,
            )}
            target="_blank"
            rel="noreferrer"
          >
            Quero avaliar meu serviço
          </RollingButton>
        </div>

        <div
          className="expanding-site"
          aria-label="Uma Landing Page se expandindo para um site maior"
        >
          <motion.div
            className="expanding-site__main"
            initial={{
              x: "-50%",
              y: "-50%",
              scale: 0.94,
            }}
            whileInView={{
              x: "-50%",
              y: "-50%",
              scale: 1,
            }}
            viewport={{ once: true }}
          >
            <div className="mini-browser-bar" />

            <div className="mini-browser-hero" />

            <div className="mini-browser-grid">
              <i />
              <i />
              <i />
            </div>
          </motion.div>

          {complexNeeds.map(
            (
              {
                label,
                icon: Icon,
              },
              index,
            ) => (
              <motion.div
                key={label}
                className={`expanding-node expanding-node--${index + 1}`}
                initial={{
                  opacity: 0,
                  scale: 0.5,
                  x: 0,
                  y: 0,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay:
                    index * 0.1,
                  type: "spring",
                }}
              >
                <Icon aria-hidden="true" />

                <span>
                  {label}
                </span>
              </motion.div>
            ),
          )}
        </div>
      </Container>
    </section>
  );
}