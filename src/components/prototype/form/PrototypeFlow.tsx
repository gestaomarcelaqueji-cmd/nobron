"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";

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
  consents: "prototype-consents",
};

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

  function update<K extends keyof RequestData>(
    field: K,
    value: RequestData[K],
  ) {
    setData((current) => ({ ...current, [field]: value }));

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

      target.focus({ preventScroll: true });
      target.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "center",
      });
    }, 0);
  }

  function validate(currentStep: FormStep, currentData = data) {
    const next: RequestErrors = {};

    if (currentStep === 1) {
      if (!currentData.responsibleName.trim()) {
        next.responsibleName = "Digite seu nome para continuar.";
      }

      if (currentData.whatsapp.replace(/\D/g, "").length < 10) {
        next.whatsapp = "Digite um WhatsApp válido com DDD.";
      }

      if (!currentData.businessMoment) {
        next.businessMoment =
          "Escolha uma opção sobre o momento atual do negócio.";
      }
    }

    if (currentStep === 2) {
      if (!currentData.businessName.trim()) {
        next.businessName = "Informe o nome da empresa ou profissional.";
      }

      if (!currentData.segment.trim()) {
        next.segment = "Informe o ramo de atuação.";
      }

      if (!currentData.city.trim()) {
        next.city = "Informe a cidade ou região.";
      }

      if (!currentData.services.length) {
        next.services = "Informe pelo menos um serviço.";
      }

      if (
        currentData.socialLinks.some(
          (link) => link.trim() && !isValidUrl(link),
        )
      ) {
        next.socialLinks = "Revise os links informados.";
      }
    }

    if (currentStep === 3) {
      if (
        currentData.driveLink.trim() &&
        !isValidUrl(currentData.driveLink)
      ) {
        next.driveLink = "Informe um link válido.";
      }

      if (!Object.values(currentData.consents).every(Boolean)) {
        next.consents = "Confirme as quatro autorizações para continuar.";
      }
    }

    setErrors(next);
    const isValid = Object.keys(next).length === 0;

    if (!isValid) {
      focusFirstError(next);
    }

    return isValid;
  }

  function goNext() {
    let currentData = data;

    if (step === 2) {
      const pendingService = serviceDraft.trim().replace(/,$/, "");

      if (pendingService) {
        const alreadyExists = data.services.some(
          (item) => item.toLowerCase() === pendingService.toLowerCase(),
        );

        if (!alreadyExists) {
          currentData = {
            ...data,
            services: [...data.services, pendingService],
          };
          setData(currentData);
        }

        setServiceDraft("");
      }
    }

    if (!validate(step, currentData)) return;

    if (step < 3) {
      setStep(step === 1 ? 2 : 3);
      scrollAfterTransition();
      return;
    }

    setView("review");
    scrollAfterTransition();
  }

  function goBack() {
    if (step === 1) return;

    setStep(step === 3 ? 2 : 1);
    setErrors({});
    scrollAfterTransition();
  }

  async function submitRequest() {
    setView("submitting");

    /*
      PONTO DE INTEGRAÇÃO:
      Envie `data`, `logoFiles` e `photoFiles` para sua rota de API,
      Supabase, n8n, Make ou outro serviço.
    */

    await new Promise((resolve) => window.setTimeout(resolve, 1200));
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
    scrollAfterTransition();
  }

  return (
    <>
      {view === "form" && step === 1 && <PrototypeHero />}

      <section className={styles.formSection} ref={formRef}>
        <motion.div
          className={styles.formIntro}
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: reducedMotion ? 0 : 0.5 }}
        />

        <div className={styles.formContainer}>
          <AnimatePresence mode="wait">
            {view === "form" && (
              <PrototypeForm
                key={`step-${step}`}
                step={step}
                data={data}
                errors={errors}
                serviceDraft={serviceDraft}
                logoFiles={logoFiles}
                photoFiles={photoFiles}
                reducedMotion={reducedMotion}
                onUpdate={update}
                onServiceDraftChange={setServiceDraft}
                onAddService={addService}
                onLogoFilesChange={setLogoFiles}
                onPhotoFilesChange={setPhotoFiles}
                onNext={goNext}
                onBack={goBack}
              />
            )}

            {view === "review" && (
              <PrototypeReview
                key="review"
                data={data}
                logoFiles={logoFiles}
                photoFiles={photoFiles}
                reducedMotion={reducedMotion}
                onEdit={editRequest}
                onSubmit={submitRequest}
              />
            )}

            {view === "submitting" && (
              <PrototypeStatus
                key="submitting"
                view="submitting"
                reducedMotion={reducedMotion}
              />
            )}

            {view === "success" && (
              <PrototypeStatus
                key="success"
                view="success"
                reducedMotion={reducedMotion}
                whatsapp={data.whatsapp}
                onReset={reset}
              />
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
