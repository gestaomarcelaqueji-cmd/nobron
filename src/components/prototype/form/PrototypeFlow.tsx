"use client";

import Link from "next/link";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";

import { submitFormResponse } from "@/lib/forms/submitFormResponse";
import { createWhatsAppUrl } from "@/lib/whatsapp";

import {
  createInitialData,
  type FormStep,
  type RequestData,
  type RequestErrors,
  type View,
} from "../prototype.types";
import { isValidUrl } from "../prototype.utils";
import { PrototypeHero } from "../PrototypeHero";
import styles from "../PrototypeRequest.module.css";
import { PrototypeForm } from "./PrototypeForm";
import { PrototypeReview } from "./PrototypeReview";
import { PrototypeStatus } from "./PrototypeStatus";

const errorFieldIds: Record<string, string> = {
  responsibleName: "prototype-responsible-name",
  whatsapp: "prototype-whatsapp",
  businessMoment: "prototype-business-moment",
  businessName: "prototype-business-name",
  segment: "prototype-segment",
  city: "prototype-city",
  services: "prototype-services",
  socialLinks: "prototype-social-links",
  driveLink: "prototype-drive-link",
};

function getAttribution() {
  const params = new URLSearchParams(window.location.search);

  return {
    utm_source: params.get("utm_source") || undefined,
    utm_medium: params.get("utm_medium") || undefined,
    utm_campaign: params.get("utm_campaign") || undefined,
    utm_content: params.get("utm_content") || undefined,
    utm_term: params.get("utm_term") || undefined,
  };
}

function buildWhatsappMessage(data: RequestData) {
  return [
    "Olá! Acabei de enviar um pedido de protótipo gratuito pelo site da noBRon.",
    "",
    `Meu nome: ${data.responsibleName}`,
    `Negócio: ${data.businessName}`,
    "",
    "Meu formulário já foi enviado e registrado. Quero continuar a conversa por aqui.",
  ].join("\n");
}

export function PrototypeFlow() {
  const reducedMotion = Boolean(useReducedMotion());
  const formRef = useRef<HTMLElement>(null);

  const [data, setData] = useState<RequestData>(() => createInitialData());
  const [step, setStep] = useState<FormStep>(1);
  const [view, setView] = useState<View>("form");
  const [errors, setErrors] = useState<RequestErrors>({});
  const [serviceDraft, setServiceDraft] = useState("");
  const [logoFiles, setLogoFiles] = useState<File[]>([]);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [website, setWebsite] = useState("");
  const [submitError, setSubmitError] = useState("");

  function update<K extends keyof RequestData>(
    field: K,
    value: RequestData[K],
  ) {
    setData((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => {
      if (!current[field]) return current;

      const next = { ...current };
      delete next[field];

      return next;
    });
  }

  function scrollToForm() {
    formRef.current?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }

  function scrollAfterTransition() {
    window.setTimeout(scrollToForm, 40);
  }

  function addService() {
    const value = serviceDraft.trim().replace(/,$/, "");

    if (!value) return;

    const alreadyExists = data.services.some(
      (item) => item.toLowerCase() === value.toLowerCase(),
    );

    if (!alreadyExists) {
      update("services", [...data.services, value]);
    }

    setServiceDraft("");
  }

  function focusFirstError(next: RequestErrors) {
    const firstError = Object.keys(next)[0];
    const targetId = errorFieldIds[firstError];

    if (!targetId) return;

    window.setTimeout(() => {
      const target = document.getElementById(targetId);

      if (!target) return;

      target.focus({
        preventScroll: true,
      });

      target.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "center",
      });
    }, 0);
  }

  function validate(
    currentStep: FormStep,
    currentData = data,
  ) {
    const next: RequestErrors = {};

    if (currentStep === 1) {
      if (!currentData.responsibleName.trim()) {
        next.responsibleName =
          "Digite seu nome para continuar.";
      }

      if (
        currentData.whatsapp.replace(/\D/g, "").length < 10
      ) {
        next.whatsapp =
          "Digite um WhatsApp válido com DDD.";
      }

      if (!currentData.businessMoment) {
        next.businessMoment =
          "Escolha uma opção sobre o momento atual do negócio.";
      }
    }

    if (currentStep === 2) {
      if (!currentData.businessName.trim()) {
        next.businessName =
          "Informe o nome da empresa ou profissional.";
      }

      if (!currentData.segment.trim()) {
        next.segment =
          "Informe o ramo de atuação.";
      }

      if (!currentData.city.trim()) {
        next.city =
          "Informe a cidade ou região.";
      }

      if (!currentData.services.length) {
        next.services =
          "Informe pelo menos um serviço.";
      }

      if (
        currentData.socialLinks.some(
          (link) =>
            link.trim() &&
            !isValidUrl(link),
        )
      ) {
        next.socialLinks =
          "Revise os links informados.";
      }
    }

    if (currentStep === 3) {
      if (
        currentData.driveLink.trim() &&
        !isValidUrl(currentData.driveLink)
      ) {
        next.driveLink =
          "Informe um link válido.";
      }
    }

    setErrors(next);

    const isValid =
      Object.keys(next).length === 0;

    if (!isValid) {
      focusFirstError(next);
    }

    return isValid;
  }

  function goNext() {
    let currentData = data;

    if (step === 2) {
      const pendingService = serviceDraft
        .trim()
        .replace(/,$/, "");

      if (pendingService) {
        const alreadyExists =
          data.services.some(
            (item) =>
              item.toLowerCase() ===
              pendingService.toLowerCase(),
          );

        if (!alreadyExists) {
          currentData = {
            ...data,
            services: [
              ...data.services,
              pendingService,
            ],
          };

          setData(currentData);
        }

        setServiceDraft("");
      }
    }

    if (!validate(step, currentData)) {
      return;
    }

    if (step < 3) {
      setStep(
        step === 1 ? 2 : 3,
      );

      scrollAfterTransition();
      return;
    }

    setView("review");
    scrollAfterTransition();
  }

  function goBack() {
    if (step === 1) return;

    setStep(
      step === 3 ? 2 : 1,
    );

    setErrors({});
    scrollAfterTransition();
  }

  async function submitRequest() {
    setView("submitting");
    setSubmitError("");

    try {
      await submitFormResponse({
        sourceKey: "prototype_free",
        sourceLabel: "Protótipo gratuito",
        sourcePath: window.location.pathname,

        // v2 = consentimentos separados e opcionais
        formVersion: "prototype-v2",

        contact: {
          name: data.responsibleName,
          whatsapp: data.whatsapp,
          businessName: data.businessName,
        },

        answers: {
          Responsável: data.responsibleName,
          WhatsApp: data.whatsapp,

          "Momento do negócio":
            data.businessMoment === "active"
              ? "Negócio em funcionamento"
              : "Estruturando o negócio",

          "Empresa ou profissional":
            data.businessName,

          "Ramo de atuação":
            data.segment,

          "Cidade ou região":
            data.city,

          Serviços:
            data.services,

          "Redes sociais ou site":
            data.socialLinks.filter(Boolean),

          "Link do Drive":
            data.driveLink || null,

          "Autorizou uso de fotos públicas das redes":
            data.useSocialPhotos,

          "Autorizou pesquisa pública do negócio":
            data.consents.publicResearch,

          "Informações adicionais":
            data.additionalInfo || null,

          "Logotipo selecionado":
            logoFiles.map(
              (file) => file.name,
            ),

          "Fotos selecionadas":
            photoFiles.map(
              (file) => file.name,
            ),
        },

        attribution: getAttribution(),

        website,
      });
    } catch {
      setSubmitError(
        "Não foi possível registrar sua solicitação agora. Tente novamente em alguns instantes.",
      );

      setView("review");
      scrollAfterTransition();

      return;
    }

    setView("success");
    scrollAfterTransition();
  }

  function editRequest() {
    setView("form");
    setStep(3);
    scrollAfterTransition();
  }

  function reset() {
    setData(createInitialData());
    setStep(1);
    setView("form");
    setErrors({});
    setLogoFiles([]);
    setPhotoFiles([]);
    setServiceDraft("");
    setWebsite("");
    setSubmitError("");

    scrollAfterTransition();
  }

  const whatsappUrl = createWhatsAppUrl(
    buildWhatsappMessage(data),
  );

  return (
    <>
      {view === "form" &&
        step === 1 && (
          <PrototypeHero />
        )}

      <section
        className={styles.formSection}
        ref={formRef}
      >
        {view === "form" && (
          <>
            <motion.div
              className={styles.formIntro}
              initial={
                reducedMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 18,
                    }
              }
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.7,
              }}
              transition={{
                duration: reducedMotion
                  ? 0
                  : 0.5,
              }}
            >
              <span>Como funciona</span>

              <h2>
                Como funciona o protótipo gratuito de Landing Page.
              </h2>

              <p>
                Antes de decidir pela contratação, você pode mostrar como seu
                negócio funciona e receber uma primeira proposta visual para a
                página. As informações do formulário ajudam a entender o que
                você oferece, como se apresenta hoje e quais materiais já
                existem.
              </p>
            </motion.div>

            <div className={styles.prototypeGuide}>
              <article>
                <span className={styles.prototypeGuideNumber}>
                  01
                </span>

                <h3>Você apresenta o negócio</h3>

                <p>
                  Informe o ramo de atuação, cidade ou região, serviços,
                  redes sociais e outras informações que ajudam a compreender
                  o que precisa ser apresentado.
                </p>
              </article>

              <article>
                <span className={styles.prototypeGuideNumber}>
                  02
                </span>

                <h3>Organizamos uma direção para a página</h3>

                <p>
                  A partir dessas informações, pensamos uma estrutura inicial
                  para apresentar o negócio, organizar a oferta e conduzir a
                  pessoa até o contato.
                </p>
              </article>

              <article>
                <span className={styles.prototypeGuideNumber}>
                  03
                </span>

                <h3>Você recebe a proposta pelo WhatsApp</h3>

                <p>
                  A proposta é apresentada em vídeo no WhatsApp informado no
                  formulário, para que você consiga visualizar como a Landing
                  Page pode ficar.
                </p>
              </article>

              <p className={styles.prototypeGuideFooter}>
                A solicitação é gratuita e sem compromisso. Se depois fizer
                sentido transformar a proposta em uma página publicada,
                conheça também o serviço de{" "}
                <Link
                  className="contextual-link"
                  href="/landing-page"
                >
                  Landing Page
                </Link>
                .
              </p>
            </div>
          </>
        )}

        <div
          className={
            styles.formContainer
          }
        >
          <AnimatePresence mode="wait">
            {view === "form" && (
              <PrototypeForm
                key={`step-${step}`}
                step={step}
                data={data}
                errors={errors}
                serviceDraft={
                  serviceDraft
                }
                logoFiles={
                  logoFiles
                }
                photoFiles={
                  photoFiles
                }
                website={website}
                reducedMotion={
                  reducedMotion
                }
                onUpdate={update}
                onServiceDraftChange={
                  setServiceDraft
                }
                onAddService={
                  addService
                }
                onLogoFilesChange={
                  setLogoFiles
                }
                onPhotoFilesChange={
                  setPhotoFiles
                }
                onWebsiteChange={
                  setWebsite
                }
                onNext={goNext}
                onBack={goBack}
              />
            )}

            {view === "review" && (
              <PrototypeReview
                key="review"
                data={data}
                logoFiles={
                  logoFiles
                }
                photoFiles={
                  photoFiles
                }
                reducedMotion={
                  reducedMotion
                }
                submitError={
                  submitError
                }
                onEdit={
                  editRequest
                }
                onSubmit={
                  submitRequest
                }
              />
            )}

            {view ===
              "submitting" && (
              <PrototypeStatus
                key="submitting"
                view="submitting"
                reducedMotion={
                  reducedMotion
                }
              />
            )}

            {view === "success" && (
              <PrototypeStatus
                key="success"
                view="success"
                reducedMotion={
                  reducedMotion
                }
                whatsapp={
                  data.whatsapp
                }
                whatsappUrl={
                  whatsappUrl
                }
                onReset={reset}
              />
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
