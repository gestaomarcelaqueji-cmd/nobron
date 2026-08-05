"use client";

import {
  Building2,
  CheckCircle2,
  PanelsTopLeft,
  UserRound,
} from "lucide-react";

import styles from "../PrototypeRequest.module.css";
import type {
  RequestData,
  RequestErrors,
  UpdateRequestData,
} from "../prototype.types";
import { formatWhatsapp } from "../prototype.utils";
import { FieldError } from "./FormControls";

type ContactStepProps = {
  data: RequestData;
  errors: RequestErrors;
  onUpdate: UpdateRequestData;
};

export function ContactStep({
  data,
  errors,
  onUpdate,
}: ContactStepProps) {
  return (
    <div className={styles.stepContent}>
      <div className={styles.stepHeading}>
        <span className={styles.stepIcon}>
          <UserRound aria-hidden="true" />
        </span>
        <div>
          <h3>Quem receberá a apresentação?</h3>
          <p>
            Informe seus dados de contato e o momento atual do negócio.
          </p>
        </div>
      </div>

      <div className={styles.fieldsGrid}>
        <label className={styles.field}>
          <span>Seu nome</span>
          <input
            id="prototype-responsible-name"
            autoComplete="name"
            placeholder="Como podemos chamar você?"
            value={data.responsibleName}
            aria-invalid={Boolean(errors.responsibleName)}
            aria-describedby={
              errors.responsibleName
                ? "prototype-responsible-name-error"
                : undefined
            }
            aria-required="true"
            onChange={(event) =>
              onUpdate("responsibleName", event.target.value)
            }
          />
          <FieldError
            id="prototype-responsible-name-error"
            text={errors.responsibleName}
          />
        </label>

        <label className={styles.field}>
          <span>WhatsApp</span>
          <input
            id="prototype-whatsapp"
            autoComplete="tel"
            inputMode="tel"
            placeholder="(42) 99999-9999"
            value={data.whatsapp}
            aria-invalid={Boolean(errors.whatsapp)}
            aria-describedby={
              errors.whatsapp ? "prototype-whatsapp-error" : undefined
            }
            aria-required="true"
            onChange={(event) =>
              onUpdate("whatsapp", formatWhatsapp(event.target.value))
            }
          />
          <small>
            Enviaremos a apresentação e falaremos sobre o pedido por este
            número.
          </small>
          <FieldError
            id="prototype-whatsapp-error"
            text={errors.whatsapp}
          />
        </label>
      </div>

      <fieldset
        className={styles.choiceFieldset}
        id="prototype-business-moment"
        tabIndex={-1}
        aria-invalid={Boolean(errors.businessMoment)}
        aria-describedby={
          errors.businessMoment
            ? "prototype-business-moment-error"
            : undefined
        }
        aria-required="true"
      >
        <legend>Em que momento está o seu negócio?</legend>

        <div className={styles.momentGrid}>
          <button
            className={`${styles.choiceCard} ${
              data.businessMoment === "active"
                ? styles.choiceCardActive
                : ""
            }`}
            type="button"
            onClick={() => onUpdate("businessMoment", "active")}
          >
            <Building2 aria-hidden="true" />
            <span>
              <strong>O negócio já está em funcionamento</strong>
              <small>
                Já atendo clientes e tenho os principais serviços definidos.
              </small>
            </span>
            <CheckCircle2 aria-hidden="true" />
          </button>

          <button
            className={`${styles.choiceCard} ${
              data.businessMoment === "starting"
                ? styles.choiceCardActive
                : ""
            }`}
            type="button"
            onClick={() => onUpdate("businessMoment", "starting")}
          >
            <PanelsTopLeft aria-hidden="true" />
            <span>
              <strong>Estou estruturando o negócio</strong>
              <small>
                Ainda estou definindo serviços, materiais ou presença online.
              </small>
            </span>
            <CheckCircle2 aria-hidden="true" />
          </button>
        </div>

        <FieldError
          id="prototype-business-moment-error"
          text={errors.businessMoment}
        />
      </fieldset>
    </div>
  );
}
