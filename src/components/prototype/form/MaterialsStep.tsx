"use client";

import {
  Check,
  FolderOpen,
  ImageIcon,
  Instagram,
  ShieldCheck,
} from "lucide-react";

import { CONSENT_OPTIONS } from "../prototype.constants";
import styles from "../PrototypeRequest.module.css";
import type {
  RequestData,
  RequestErrors,
  UpdateRequestData,
} from "../prototype.types";
import { FieldError, UploadBox } from "./FormControls";

type MaterialsStepProps = {
  data: RequestData;
  errors: RequestErrors;
  logoFiles: File[];
  photoFiles: File[];
  onLogoFilesChange: (files: File[]) => void;
  onPhotoFilesChange: (files: File[]) => void;
  onUpdate: UpdateRequestData;
};

export function MaterialsStep({
  data,
  errors,
  logoFiles,
  photoFiles,
  onLogoFilesChange,
  onPhotoFilesChange,
  onUpdate,
}: MaterialsStepProps) {
  return (
    <div className={styles.stepContent}>
      <div className={styles.stepHeading}>
        <span className={styles.stepIcon}>
          <ImageIcon aria-hidden="true" />
        </span>
        <div>
          <h3>Envie o que já tiver em mãos.</h3>
          <p>
            Logotipo, fotos e links ajudam, mas esta etapa é opcional.
          </p>
        </div>
      </div>

      <div className={styles.uploadGrid}>
        <UploadBox
          title="Adicionar logotipo"
          description="1 arquivo · PNG, JPG, WEBP ou SVG"
          files={logoFiles}
          accept=".png,.jpg,.jpeg,.webp,.svg"
          onChange={(files) => onLogoFilesChange(files.slice(0, 1))}
        />

        <UploadBox
          title="Adicionar fotos"
          description="Até 8 imagens do espaço, serviços, produtos ou equipe"
          files={photoFiles}
          multiple
          accept="image/png,image/jpeg,image/webp"
          onChange={(files) => onPhotoFilesChange(files.slice(0, 8))}
        />
      </div>

      <label className={styles.checkboxCard}>
        <input
          type="checkbox"
          checked={data.useSocialPhotos}
          onChange={(event) =>
            onUpdate("useSocialPhotos", event.target.checked)
          }
        />
        <span>
          <Check aria-hidden="true" />
        </span>
        <Instagram aria-hidden="true" />
        <div>
          <strong>
            Podem utilizar as fotos das redes sociais informadas
          </strong>
          <small>
            Usaremos somente imagens públicas da própria empresa.
          </small>
        </div>
      </label>

      <label className={styles.field}>
        <span>Tem uma pasta no Google Drive?</span>
        <div className={styles.inputWithIcon}>
          <FolderOpen aria-hidden="true" />
          <input
            id="prototype-drive-link"
            inputMode="url"
            placeholder="Cole aqui o link da pasta"
            value={data.driveLink}
            aria-invalid={Boolean(errors.driveLink)}
            aria-describedby={
              errors.driveLink ? "prototype-drive-link-error" : undefined
            }
            onChange={(event) =>
              onUpdate("driveLink", event.target.value)
            }
          />
        </div>
        <small>
          Configure o acesso como “qualquer pessoa com o link”.
        </small>
        <FieldError
          id="prototype-drive-link-error"
          text={errors.driveLink}
        />
      </label>

      <label className={styles.field}>
        <span>Há algo importante que devemos considerar?</span>
        <textarea
          rows={4}
          maxLength={500}
          placeholder="Opcional. Ex.: ainda não inaugurei, atendo somente empresas ou não quero divulgar preços."
          value={data.additionalInfo}
          onChange={(event) =>
            onUpdate("additionalInfo", event.target.value)
          }
        />
        <small>{data.additionalInfo.length}/500 caracteres</small>
      </label>

      <div
        className={styles.consentBlock}
        id="prototype-consents"
        tabIndex={-1}
        data-invalid={Boolean(errors.consents)}
        aria-invalid={Boolean(errors.consents)}
        aria-describedby={
          errors.consents ? "prototype-consents-error" : undefined
        }
      >
        <div className={styles.consentTitle}>
          <ShieldCheck aria-hidden="true" />
          <div>
            <h4>Confirme as autorizações</h4>
            <p>
              Elas valem apenas para preparar e enviar esta demonstração.
            </p>
          </div>
        </div>

        {CONSENT_OPTIONS.map(({ key, text }) => (
          <label className={styles.consentItem} key={key}>
            <input
              type="checkbox"
              checked={data.consents[key]}
              aria-invalid={Boolean(errors.consents)}
              aria-describedby={
                errors.consents ? "prototype-consents-error" : undefined
              }
              aria-required="true"
              onChange={(event) =>
                onUpdate("consents", {
                  ...data.consents,
                  [key]: event.target.checked,
                })
              }
            />
            <span>
              <Check aria-hidden="true" />
            </span>
            <p>{text}</p>
          </label>
        ))}

        <FieldError
          id="prototype-consents-error"
          text={errors.consents}
        />
      </div>
    </div>
  );
}
