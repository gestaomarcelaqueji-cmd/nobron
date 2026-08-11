import { AlertCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import type { FormEvent } from "react";

import type {
  FormStep,
  RequestData,
  RequestErrors,
  UpdateRequestData,
} from "../prototype.types";
import styles from "../PrototypeRequest.module.css";
import { BusinessStep } from "./BusinessStep";
import { ContactStep } from "./ContactStep";
import { MaterialsStep } from "./MaterialsStep";
import { PrototypeProgress } from "./PrototypeProgress";

type PrototypeFormProps = {
  step: FormStep;
  data: RequestData;
  errors: RequestErrors;
  serviceDraft: string;
  logoFiles: File[];
  photoFiles: File[];
  website: string;
  reducedMotion: boolean;
  onUpdate: UpdateRequestData;
  onServiceDraftChange: (value: string) => void;
  onAddService: () => void;
  onLogoFilesChange: (files: File[]) => void;
  onPhotoFilesChange: (files: File[]) => void;
  onWebsiteChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
};

export function PrototypeForm({
  step,
  data,
  errors,
  serviceDraft,
  logoFiles,
  photoFiles,
  website,
  reducedMotion,
  onUpdate,
  onServiceDraftChange,
  onAddService,
  onLogoFilesChange,
  onPhotoFilesChange,
  onWebsiteChange,
  onNext,
  onBack,
}: PrototypeFormProps) {
  const errorCount = Object.keys(errors).length;

  return (
    <motion.div
      className={styles.formCard}
      layout
      initial={
        reducedMotion
          ? false
          : { opacity: 0, x: 22, scale: 0.992, filter: "blur(5px)" }
      }
      animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
      exit={
        reducedMotion
          ? undefined
          : { opacity: 0, x: -18, scale: 0.992, filter: "blur(4px)" }
      }
      transition={{
        duration: reducedMotion ? 0 : 0.38,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <PrototypeProgress step={step} />

      {errorCount > 0 && (
        <div
          className={styles.formErrorSummary}
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle aria-hidden="true" />
          <div>
            <strong>Não foi possível continuar ainda.</strong>
            <span>
              Revise {errorCount}{" "}
              {errorCount === 1 ? "campo destacado" : "campos destacados"}.
            </span>
          </div>
        </div>
      )}

      <form
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          onNext();
        }}
      >
        <input
          aria-hidden="true"
          autoComplete="off"
          name="website"
          tabIndex={-1}
          type="text"
          value={website}
          onChange={(event) => onWebsiteChange(event.target.value)}
          style={{
            position: "absolute",
            left: "-10000px",
            width: 1,
            height: 1,
            opacity: 0,
          }}
        />
        {step === 1 && (
          <ContactStep
            data={data}
            errors={errors}
            onUpdate={onUpdate}
          />
        )}

        {step === 2 && (
          <BusinessStep
            data={data}
            errors={errors}
            serviceDraft={serviceDraft}
            onServiceDraftChange={onServiceDraftChange}
            onAddService={onAddService}
            onUpdate={onUpdate}
          />
        )}

        {step === 3 && (
          <MaterialsStep
            data={data}
            errors={errors}
            logoFiles={logoFiles}
            photoFiles={photoFiles}
            onLogoFilesChange={onLogoFilesChange}
            onPhotoFilesChange={onPhotoFilesChange}
            onUpdate={onUpdate}
          />
        )}

        <div className={styles.formActions}>
          {step > 1 ? (
            <button
              className={styles.secondaryButton}
              type="button"
              onClick={onBack}
            >
              <ArrowLeft aria-hidden="true" />
              Voltar
            </button>
          ) : (
            <span />
          )}

          <button className={styles.primaryButton} type="submit">
            {step === 3 ? "Revisar meu pedido" : "Continuar"}
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </form>
    </motion.div>
  );
}
