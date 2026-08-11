"use client";

import Link from "next/link";
import {
  type FormEvent,
  useMemo,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import {
  contactPageData,
  type ContactField,
  type ContactPathId,
} from "@/data/contact/contactPage";
import { FragmentedCategoryHero } from "@/components/solutions/shared/FragmentedCategoryHero/FragmentedCategoryHero";
import { submitFormResponse } from "@/lib/forms/submitFormResponse";

import styles from "./ContactPage.module.css";

type FormValue = string | string[];
type FormValues = Record<string, FormValue>;
type FormErrors = Record<string, string>;

function hasValue(value: FormValue | undefined) {
  if (Array.isArray(value)) return value.length > 0;
  return Boolean(value?.trim());
}

function formatValue(value: FormValue | undefined) {
  if (Array.isArray(value)) return value.join(", ");
  return value?.trim() || "Não informado";
}

function buildMessage(
  pathTitle: string,
  fields: ContactField[],
  values: FormValues,
) {
  const lines = [
    "Olá! Vim pela página de contato da noBRon.",
    "",
    `Caminho escolhido: ${pathTitle}`,
    "",
  ];

  fields.forEach((field) => {
    const value = values[field.id];
    if (!hasValue(value)) return;
    lines.push(`${field.label}: ${formatValue(value)}`);
  });

  return lines.join("\n");
}

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

export function ContactPage() {
  const reduceMotion = Boolean(useReducedMotion());
  const {
    hero,
    experience,
    commonFields,
    paths,
    nextSteps,
    direct,
  } = contactPageData;

  const [activePathId, setActivePathId] =
    useState<ContactPathId | null>(null);
  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activePath = useMemo(
    () => paths.find((path) => path.id === activePathId) ?? null,
    [activePathId, paths],
  );

  const activeFields = useMemo(
    () => activePath ? [...commonFields, ...activePath.fields] : [],
    [activePath, commonFields],
  );

  function choosePath(pathId: ContactPathId) {
    setActivePathId((current) => current === pathId ? null : pathId);
    setValues({});
    setErrors({});
    setSubmitError("");
  }

  function updateField(fieldId: string, value: FormValue) {
    setValues((current) => ({ ...current, [fieldId]: value }));
    setErrors((current) => {
      if (!current[fieldId]) return current;
      const next = { ...current };
      delete next[fieldId];
      return next;
    });
  }

  function toggleOption(fieldId: string, option: string) {
    const currentValue = values[fieldId];
    const selected = Array.isArray(currentValue) ? currentValue : [];
    updateField(
      fieldId,
      selected.includes(option)
        ? selected.filter((item) => item !== option)
        : [...selected, option],
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!activePath || isSubmitting) return;

    const website = String(
      new FormData(event.currentTarget).get("website") || "",
    );

    setSubmitError("");
    const nextErrors: FormErrors = {};

    activeFields.forEach((field) => {
      if (field.required && !hasValue(values[field.id])) {
        nextErrors[field.id] = "Preencha este campo para continuar.";
      }
    });

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = Object.keys(nextErrors)[0];
      window.requestAnimationFrame(() => {
        document
          .getElementById(`contact-field-${firstInvalid}`)
          ?.focus();
      });
      return;
    }

    const preference =
      typeof values.contactPreference === "string"
        ? values.contactPreference
        : "WhatsApp";
    const message = buildMessage(activePath.title, activeFields, values);
    const whatsappUrl =
      `https://wa.me/${direct.whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Abre a aba ainda dentro do gesto do usuário para evitar bloqueio de popup
    // enquanto o registro seguro é enviado ao servidor.
    const whatsappWindow =
      preference === "E-mail" ? null : window.open("about:blank", "_blank");
    if (whatsappWindow) whatsappWindow.opener = null;

    const answers = Object.fromEntries(
      activeFields
        .filter((field) => hasValue(values[field.id]))
        .map((field) => [field.label, values[field.id]]),
    );

    setIsSubmitting(true);

    try {
      const contactValue =
        typeof values.contact === "string" ? values.contact.trim() : "";

      await submitFormResponse({
        sourceKey: "contact",
        sourceLabel: `Contato — ${activePath.title}`,
        sourcePath: window.location.pathname,
        formVersion: "contact-v1",
        contact: {
          name: typeof values.name === "string" ? values.name.trim() : undefined,
          whatsapp: preference === "WhatsApp" ? contactValue : undefined,
          email: preference === "E-mail" ? contactValue : undefined,
          businessName:
            typeof values.company === "string"
              ? values.company.trim()
              : undefined,
        },
        answers: {
          "Caminho escolhido": activePath.title,
          ...answers,
        },
        attribution: getAttribution(),
        website,
      });
    } catch {
      whatsappWindow?.close();
      setSubmitError(
        "Não foi possível registrar suas respostas agora. Tente novamente em alguns instantes.",
      );
      setIsSubmitting(false);
      return;
    }

    if (preference === "E-mail") {
      const subject = encodeURIComponent(
        `Contato noBRon — ${activePath.title}`,
      );
      const body = encodeURIComponent(message);
      window.location.href =
        `mailto:${direct.email}?subject=${subject}&body=${body}`;
      setIsSubmitting(false);
      return;
    }

    if (whatsappWindow) {
      whatsappWindow.location.href = whatsappUrl;
    } else {
      window.location.href = whatsappUrl;
    }
    setIsSubmitting(false);
  }

  return (
    <>
      <FragmentedCategoryHero
        columnCount={8}
        description={hero.description}
        id="contato"
        textLength={1150}
        title={hero.title}
        titleFontSize={238}
        viewBoxWidth={1600}
      />

      <section className={styles.experience}>
        <div className={styles.inner}>
          <header className={styles.heading}>
            <span>{experience.eyebrow}</span>
            <h2>{experience.title}</h2>
            <p>{experience.description}</p>
          </header>

          <div className={styles.paths}>
            {paths.map((path) => {
              const isActive = activePathId === path.id;

              return (
                <motion.article
                  className={styles.path}
                  data-active={isActive}
                  key={path.id}
                  layout={!reduceMotion}
                  transition={{
                    layout: {
                      duration: reduceMotion ? 0 : 0.48,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }}
                >
                  <button
                    aria-expanded={isActive}
                    className={styles.pathButton}
                    onClick={() => choosePath(path.id)}
                    type="button"
                  >
                    <span className={styles.pathNumber}>
                      {path.number}
                    </span>

                    <span className={styles.pathCopy}>
                      <strong>{path.title}</strong>
                      <small>{path.summary}</small>
                    </span>

                    <span
                      aria-hidden="true"
                      className={styles.pathAction}
                    >
                      {isActive ? "Fechar" : "Escolher"}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive ? (
                      <motion.div
                        animate={{ height: "auto", opacity: 1 }}
                        className={styles.formReveal}
                        exit={{ height: 0, opacity: 0 }}
                        initial={
                          reduceMotion
                            ? false
                            : { height: 0, opacity: 0 }
                        }
                        transition={{
                          duration: reduceMotion ? 0 : 0.5,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <form
                          className={styles.form}
                          onSubmit={handleSubmit}
                        >
                          <input
                            aria-hidden="true"
                            autoComplete="off"
                            name="website"
                            tabIndex={-1}
                            type="text"
                            style={{
                              position: "absolute",
                              left: "-10000px",
                              width: 1,
                              height: 1,
                              opacity: 0,
                            }}
                          />
                          <div className={styles.formIntro}>
                            <span>Caminho {path.number}</span>
                            <h3>{path.formTitle}</h3>
                            <p>{path.formDescription}</p>
                          </div>

                          <div className={styles.fields}>
                            {activeFields.map((field) => (
                              <FieldControl
                                error={errors[field.id]}
                                field={field}
                                key={field.id}
                                onChange={updateField}
                                onToggle={toggleOption}
                                value={values[field.id]}
                              />
                            ))}
                          </div>

                          <div className={styles.formFooter}>
                            {submitError ? (
                              <p className={styles.error} role="alert">
                                {submitError}
                              </p>
                            ) : null}
                            {"reassurance" in experience &&
                            typeof experience.reassurance === "string" ? (
                              <p>{experience.reassurance}</p>
                            ) : null}

                            <button
                              className={styles.submit}
                              disabled={isSubmitting}
                              type="submit"
                            >
                              <span>
                                {isSubmitting
                                  ? "Registrando..."
                                  : values.contactPreference === "E-mail"
                                  ? "Preparar e-mail"
                                  : "Continuar no WhatsApp"}
                              </span>
                              <span aria-hidden="true">→</span>
                            </button>
                          </div>
                        </form>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.nextSteps}>
        <div className={styles.inner}>
          <header className={styles.heading}>
            <span>{nextSteps.eyebrow}</span>
            <h2>{nextSteps.title}</h2>
          </header>

          <ol className={styles.steps}>
            {nextSteps.steps.map((step) => (
              <li key={step.title}>
                <span>{step.number}</span>
                <strong>{step.title}</strong>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.direct}>
        <div className={styles.directInner}>
          <span className={styles.eyebrow}>{direct.eyebrow}</span>
          <h2>{direct.title}</h2>
          <p>{direct.description}</p>

          <div className={styles.directActions}>
            <Link
              className={styles.directAction}
              href={`https://wa.me/${direct.whatsappNumber}`}
              rel="noreferrer"
              target="_blank"
            >
              <span>{direct.whatsappLabel}</span>
              <span aria-hidden="true">WhatsApp</span>
            </Link>

            <Link
              className={styles.directAction}
              href={`mailto:${direct.email}`}
            >
              <span>{direct.emailLabel}</span>
              <span aria-hidden="true">{direct.email}</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

type FieldControlProps = {
  field: ContactField;
  value?: FormValue;
  error?: string;
  onChange: (fieldId: string, value: FormValue) => void;
  onToggle: (fieldId: string, option: string) => void;
};

function FieldControl({
  field,
  value,
  error,
  onChange,
  onToggle,
}: FieldControlProps) {
  const stringValue = typeof value === "string" ? value : "";
  const selectedValues = Array.isArray(value) ? value : [];

  return (
    <div className={styles.field} data-wide={field.wide}>
      <label htmlFor={`contact-field-${field.id}`}>
        {field.label}
        {field.required ? <span aria-hidden="true">*</span> : null}
      </label>

      {field.type === "textarea" ? (
        <textarea
          aria-invalid={Boolean(error)}
          id={`contact-field-${field.id}`}
          onChange={(event) => onChange(field.id, event.target.value)}
          placeholder={field.placeholder}
          rows={5}
          value={stringValue}
        />
      ) : null}

      {field.type === "select" ? (
        <select
          aria-invalid={Boolean(error)}
          id={`contact-field-${field.id}`}
          onChange={(event) => onChange(field.id, event.target.value)}
          value={stringValue}
        >
          <option value="">Selecione uma opção</option>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : null}

      {field.type === "multiselect" ? (
        <div
          aria-label={field.label}
          className={styles.options}
          id={`contact-field-${field.id}`}
          role="group"
          tabIndex={-1}
        >
          {field.options?.map((option) => {
            const isSelected = selectedValues.includes(option);

            return (
              <button
                aria-pressed={isSelected}
                className={styles.option}
                key={option}
                onClick={() => onToggle(field.id, option)}
                type="button"
              >
                {option}
              </button>
            );
          })}
        </div>
      ) : null}

      {field.type === "text" ? (
        <input
          aria-invalid={Boolean(error)}
          id={`contact-field-${field.id}`}
          onChange={(event) => onChange(field.id, event.target.value)}
          placeholder={field.placeholder}
          type="text"
          value={stringValue}
        />
      ) : null}

      {error ? <small className={styles.error}>{error}</small> : null}
    </div>
  );
}
