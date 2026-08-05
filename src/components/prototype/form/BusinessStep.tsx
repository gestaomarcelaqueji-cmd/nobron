"use client";

import { Building2, Link2, Plus, X } from "lucide-react";
import { KeyboardEvent } from "react";

import styles from "../PrototypeRequest.module.css";
import type {
  RequestData,
  RequestErrors,
  UpdateRequestData,
} from "../prototype.types";
import { FieldError } from "./FormControls";

type BusinessStepProps = {
  data: RequestData;
  errors: RequestErrors;
  serviceDraft: string;
  onServiceDraftChange: (value: string) => void;
  onAddService: () => void;
  onUpdate: UpdateRequestData;
};

export function BusinessStep({
  data,
  errors,
  serviceDraft,
  onServiceDraftChange,
  onAddService,
  onUpdate,
}: BusinessStepProps) {
  return (
    <div className={styles.stepContent}>
      <div className={styles.stepHeading}>
        <span className={styles.stepIcon}>
          <Building2 aria-hidden="true" />
        </span>
        <div>
          <h3>Conte sobre o seu negócio.</h3>
          <p>
            Essas informações nos ajudam a entender o mercado e criar uma
            proposta coerente com o seu público.
          </p>
        </div>
      </div>

      <div className={styles.fieldsGrid}>
        <label className={styles.field}>
          <span>Nome da empresa ou profissional</span>
          <input
            id="prototype-business-name"
            placeholder="Ex.: Espaço Bella ou João Eletricista"
            value={data.businessName}
            aria-invalid={Boolean(errors.businessName)}
            aria-describedby={
              errors.businessName ? "prototype-business-name-error" : undefined
            }
            aria-required="true"
            onChange={(event) =>
              onUpdate("businessName", event.target.value)
            }
          />
          <small>
            Ainda não definiu? Use seu nome e o ramo de atuação.
          </small>
          <FieldError
            id="prototype-business-name-error"
            text={errors.businessName}
          />
        </label>

        <label className={styles.field}>
          <span>Ramo de atuação</span>
          <input
            id="prototype-segment"
            placeholder="Ex.: Beleza, elétrica, alimentação"
            value={data.segment}
            aria-invalid={Boolean(errors.segment)}
            aria-describedby={
              errors.segment ? "prototype-segment-error" : undefined
            }
            aria-required="true"
            onChange={(event) => onUpdate("segment", event.target.value)}
          />
          <FieldError id="prototype-segment-error" text={errors.segment} />
        </label>

        <label className={styles.field}>
          <span>Cidade ou região de atuação</span>
          <input
            id="prototype-city"
            placeholder="Ex.: Telêmaco Borba e região"
            value={data.city}
            aria-invalid={Boolean(errors.city)}
            aria-describedby={
              errors.city ? "prototype-city-error" : undefined
            }
            aria-required="true"
            onChange={(event) => onUpdate("city", event.target.value)}
          />
          <FieldError id="prototype-city-error" text={errors.city} />
        </label>

        <div className={styles.field}>
          <span>Quais serviços você oferece?</span>

          <div className={styles.serviceInput}>
            <input
              id="prototype-services"
              placeholder="Digite um serviço"
              value={serviceDraft}
              aria-invalid={Boolean(errors.services)}
              aria-describedby={
                errors.services ? "prototype-services-error" : undefined
              }
              aria-required="true"
              onChange={(event) =>
                onServiceDraftChange(event.target.value)
              }
              onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
                if (event.key === "Enter" || event.key === ",") {
                  event.preventDefault();
                  onAddService();
                }
              }}
            />

            <button type="button" onClick={onAddService}>
              <Plus aria-hidden="true" />
              Adicionar
            </button>
          </div>

          {data.services.length > 0 && (
            <div className={styles.tags}>
              {data.services.map((service, index) => (
                <span key={`${service}-${index}`}>
                  {service}
                  <button
                    type="button"
                    onClick={() =>
                      onUpdate(
                        "services",
                        data.services.filter(
                          (_, itemIndex) => itemIndex !== index,
                        ),
                      )
                    }
                    aria-label={`Remover ${service}`}
                  >
                    <X aria-hidden="true" />
                  </button>
                </span>
              ))}
            </div>
          )}

          <FieldError
            id="prototype-services-error"
            text={errors.services}
          />
        </div>
      </div>

      <div
        className={styles.socialBlock}
        id="prototype-social-links"
        tabIndex={-1}
        data-invalid={Boolean(errors.socialLinks)}
        aria-invalid={Boolean(errors.socialLinks)}
        aria-describedby={
          errors.socialLinks ? "prototype-social-links-error" : undefined
        }
      >
        <div className={styles.socialHeading}>
          <div>
            <span>Redes sociais ou site da empresa</span>
            <p>
              Compartilhe onde podemos conhecer melhor o seu trabalho. Este
              campo é opcional.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              onUpdate("socialLinks", [...data.socialLinks, ""])
            }
          >
            <Plus aria-hidden="true" />
            Outro link
          </button>
        </div>

        <div className={styles.socialList}>
          {data.socialLinks.map((link, index) => (
            <div className={styles.socialRow} key={index}>
              <Link2 aria-hidden="true" />
              <input
                inputMode="url"
                placeholder="instagram.com/suaempresa"
                value={link}
                aria-invalid={Boolean(errors.socialLinks)}
                aria-describedby={
                  errors.socialLinks
                    ? "prototype-social-links-error"
                    : undefined
                }
                onChange={(event) =>
                  onUpdate(
                    "socialLinks",
                    data.socialLinks.map((item, itemIndex) =>
                      itemIndex === index ? event.target.value : item,
                    ),
                  )
                }
              />

              {data.socialLinks.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    onUpdate(
                      "socialLinks",
                      data.socialLinks.filter(
                        (_, itemIndex) => itemIndex !== index,
                      ),
                    )
                  }
                  aria-label="Remover link"
                >
                  <X aria-hidden="true" />
                </button>
              )}
            </div>
          ))}
        </div>

        <FieldError
          id="prototype-social-links-error"
          text={errors.socialLinks}
        />
      </div>
    </div>
  );
}
