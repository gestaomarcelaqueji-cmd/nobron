"use client";

import {
  Check,
  FolderOpen,
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
          <FolderOpen aria-hidden="true" />
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
          onChange={(files) =>
            onLogoFilesChange(files.slice(0, 1))
          }
        />

        <UploadBox
          title="Adicionar fotos"
          description="Até 8 imagens do espaço, serviços, produtos ou equipe"
          files={photoFiles}
          multiple
          accept="image/png,image/jpeg,image/webp"
          onChange={(files) =>
            onPhotoFilesChange(files.slice(0, 8))
          }
        />
      </div>

      <label className={styles.checkboxCard}>
        <input
          type="checkbox"
          checked={data.useSocialPhotos}
          onChange={(event) =>
            onUpdate(
              "useSocialPhotos",
              event.target.checked,
            )
          }
        />

        <span>
          <Check aria-hidden="true" />
        </span>

        <Instagram aria-hidden="true" />

        <div>
          <strong>
            Autorizar o uso de fotos públicas das redes sociais
          </strong>

          <small>
            Opcional. Se marcado, poderemos utilizar imagens públicas
            da própria empresa nas redes sociais que você informou para
            preparar este protótipo.
          </small>
        </div>
      </label>

      <label className={styles.field}>
        <span>Tem uma pasta no Google Drive?</span>

        <div className={styles.inputWithIcon}>
          <FolderOpen aria-hidden="true" />

          <input
            id="prototype-drive-link"
            type="url"
            inputMode="url"
            autoComplete="url"
            placeholder="Cole aqui o link da pasta"
            value={data.driveLink}
            aria-invalid={Boolean(errors.driveLink)}
            aria-describedby={
              errors.driveLink
                ? "prototype-drive-link-error"
                : "prototype-drive-link-help"
            }
            onChange={(event) =>
              onUpdate(
                "driveLink",
                event.target.value,
              )
            }
          />
        </div>

        <small id="prototype-drive-link-help">
          Compartilhe somente os materiais necessários para este pedido e
          utilize a menor permissão que ainda permita nosso acesso.
        </small>

        <FieldError
          id="prototype-drive-link-error"
          text={errors.driveLink}
        />
      </label>

      <label className={styles.field}>
        <span>
          Há algo importante que devemos considerar?
        </span>

        <textarea
          rows={4}
          maxLength={500}
          placeholder="Opcional. Ex.: ainda não inaugurei, atendo somente empresas ou não quero divulgar preços."
          value={data.additionalInfo}
          onChange={(event) =>
            onUpdate(
              "additionalInfo",
              event.target.value,
            )
          }
        />

        <small>
          {data.additionalInfo.length}/500 caracteres
        </small>
      </label>

      <div
        className={styles.consentBlock}
        id="prototype-consents"
      >
        <div className={styles.consentTitle}>
          <ShieldCheck aria-hidden="true" />

          <div>
            <h4>Autorizações opcionais</h4>

            <p>
              Você pode enviar seu pedido normalmente sem marcar estas
              opções.
            </p>
          </div>
        </div>

        {CONSENT_OPTIONS.map(({ key, text }) => (
          <label
            className={styles.consentItem}
            key={key}
          >
            <input
              type="checkbox"
              checked={data.consents[key]}
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
      </div>
    </div>
  );
}