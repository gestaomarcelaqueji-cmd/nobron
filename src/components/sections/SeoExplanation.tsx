"use client";

import Link from "next/link";

import {
  Building2,
  Check,
  MapPin,
  ScanSearch,
  Search,
  ShieldCheck,
  Star,
  Wrench,
} from "lucide-react";
import { motion } from "motion/react";

import { BlurReveal } from "@/components/animations/BlurReveal";
import { Container } from "@/components/ui/Container";
import { RollingButton } from "@/components/ui/RollingButton";
import { whatsappMessages } from "@/data/site";
import { createWhatsAppUrl } from "@/lib/whatsapp";

const concepts = [
  {
    title: "Quem você é",
    description:
      "Nome, atividade, experiência e as principais informações sobre sua empresa.",
    icon: Building2,
  },
  {
    title: "O que você oferece",
    description:
      "Seus serviços, os problemas que resolve e como o cliente pode contratar.",
    icon: Wrench,
  },
  {
    title: "Onde você atende",
    description:
      "Cidade, bairros, endereço ou toda a região atendida pelo seu negócio.",
    icon: MapPin,
  },
];

const searchTerms = [
  "serviço que você oferece",
  "em Telêmaco Borba",
  "atendimento profissional",
];

export function SeoExplanation() {
  return (
    <section className="seo-section" id="seo">
      <Container>
        <div className="seo-heading">
          <h2>
            Quando alguém procura pelo que você faz, o Google precisa entender
            sua empresa.
          </h2>

          <p>
            É aí que entra o{" "}
            <Link
              className="contextual-link"
              href="/solucoes/seo"
            >
              SEO e Presença Digital
            </Link>
            . Organizamos sua página para deixar claro quem você é, o que
            oferece e onde atende. Isso cria uma base mais preparada para sua
            empresa aparecer nas buscas certas.
          </p>
        </div>

        <div className="seo-layout">
          <div className="seo-concepts">
            <div className="seo-concepts__intro">
              <span>O que organizamos na página</span>

              <strong>
                Informações que ajudam pessoas e mecanismos de busca a entender
                seu negócio.
              </strong>
            </div>

            <div className="seo-concepts__list">
              {concepts.map(({ title, description, icon: Icon }, index) => (
                <BlurReveal
                  className="seo-concept"
                  delay={index * 0.1}
                  key={title}
                >
                  <div className="seo-concept__number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="seo-concept__icon">
                    <Icon aria-hidden="true" />
                  </div>

                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </BlurReveal>
              ))}

              <motion.div
                className="seo-connector"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </div>
          </div>

          <BlurReveal className="seo-search" delay={0.18}>
            <div className="seo-search__header">
              <div>
                <span>
                  <Search aria-hidden="true" />
                  Exemplo demonstrativo
                </span>

                <strong>Veja como o Google pode entender sua empresa</strong>
              </div>

              <div className="seo-search__status">
                <i />
                Informações organizadas
              </div>
            </div>

            <div className="google-mockup">
              <div className="google-mockup__topbar">
                <div className="google-mockup__brand" aria-label="Google">
                  <span>G</span>
                  <i>o</i>
                  <b>o</b>
                  <span>g</span>
                  <i>l</i>
                  <b>e</b>
                </div>

                <div className="google-search-field">
                  <Search aria-hidden="true" />

                  <span>serviço que você oferece em Telêmaco Borba</span>

                  <span className="google-search-field__button" aria-hidden="true">
                    <Search aria-hidden="true" />
                  </span>
                </div>

                <div className="google-tabs" aria-hidden="true">
                  <b>Todas</b>
                  <span>Imagens</span>
                  <span>Maps</span>
                  <span>Vídeos</span>
                  <span>Notícias</span>
                </div>
              </div>

              <div className="google-result">
                <div className="google-result__identity">
                  <div className="google-result__logo">S</div>

                  <div>
                    <strong>Sua empresa</strong>
                    <span>https://www.suaempresa.com.br</span>
                  </div>
                </div>

                <div className="google-result__title">
                  Serviço profissional em Telêmaco Borba | Sua empresa
                </div>

                <p>
                  Conheça nossos serviços, veja como funciona o atendimento,
                  confira a região atendida e fale diretamente pelo WhatsApp.
                </p>

                <div className="google-result__chips">
                  {searchTerms.map((term) => (
                    <span key={term}>
                      <Check aria-hidden="true" />
                      {term}
                    </span>
                  ))}
                </div>

                <div className="google-result__meta">
                  <div>
                    <Star aria-hidden="true" />
                    <strong>Informações claras</strong>
                  </div>

                  <span>Serviços</span>
                  <span>Localização</span>
                  <span>Contato</span>
                </div>
              </div>

              <div className="google-understanding">
                <div className="google-understanding__icon">
                  <ScanSearch aria-hidden="true" />
                </div>

                <div>
                  <span>O Google encontra sinais importantes</span>
                  <strong>
                    Empresa + serviço oferecido + região de atendimento
                  </strong>
                </div>
              </div>
            </div>
          </BlurReveal>
        </div>

        <div className="seo-note">
          <div className="seo-note__icon">
            <ShieldCheck aria-hidden="true" />
          </div>

          <p>
            <strong>Importante:</strong> uma Landing Page não garante a primeira
            posição no Google. Ela organiza as informações da sua empresa e cria
            uma base profissional e tecnicamente preparada para disputar essas
            buscas.
          </p>

          <RollingButton
            href={createWhatsAppUrl(whatsappMessages.seo)}
            target="_blank"
            rel="noreferrer"
            variant="secondary"
          >
            Quero ajudar o Google a encontrar minha empresa
          </RollingButton>
        </div>
      </Container>
    </section>
  );
}
