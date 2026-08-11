"use client";

import {
  AlertCircle,
  ArrowLeft,
  Send,
  ShieldCheck,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

import type { RequestData } from "../prototype.types";
import styles from "../PrototypeRequest.module.css";

type PrototypeReviewProps = {
  data: RequestData;
  logoFiles: File[];
  photoFiles: File[];
  reducedMotion: boolean;
  submitError: string;
  onEdit: () => void;
  onSubmit: () => void;
};

export function PrototypeReview({
  data,
  logoFiles,
  photoFiles,
  reducedMotion,
  submitError,
  onEdit,
  onSubmit,
}: PrototypeReviewProps) {
  const selectedMaterials = [
    logoFiles.length ? "logotipo selecionado" : "",
    photoFiles.length
      ? `${photoFiles.length} foto(s) selecionada(s)`
      : "",
    data.driveLink ? "pasta do Drive informada" : "",
  ]
    .filter(Boolean)
    .join(", ");

  const reviewItems = [
    ["Responsável", data.responsibleName],
    ["WhatsApp", data.whatsapp],
    [
      "Momento",
      data.businessMoment === "active"
        ? "Empresa em funcionamento"
        : "Começando agora",
    ],
    ["Empresa", data.businessName],
    ["Ramo", data.segment],
    ["Cidade ou região", data.city],
    ["Serviços", data.services.join(", ")],
    [
      "Links informados",
      data.socialLinks.filter(Boolean).join(", ") ||
        "Nenhum link informado",
    ],
    [
      "Materiais",
      selectedMaterials || "Nenhum material selecionado",
    ],
    [
      "Fotos públicas das redes",
      data.useSocialPhotos
        ? "Uso autorizado para este protótipo"
        : "Uso não autorizado",
    ],
    [
      "Pesquisa pública complementar",
      data.consents.publicResearch
        ? "Autorizada"
        : "Não autorizada",
    ],
  ];

  return (
    <motion.div
      className={styles.reviewCard}
      initial={
        reducedMotion
          ? false
          : {
              opacity: 0,
              y: 18,
            }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
    >
      <div className={styles.stepHeading}>
        <div>
          <h3>Revise seu pedido antes de enviar.</h3>

          <p>
            Confira as informações que serão usadas para analisar sua
            solicitação e preparar a proposta visual.
          </p>
        </div>
      </div>

      <div className={styles.reviewList}>
        {reviewItems.map(([label, value]) => (
          <div
            className={styles.reviewRow}
            key={label}
          >
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}

        {data.additionalInfo ? (
          <div className={styles.reviewRow}>
            <span>Informação adicional</span>
            <strong>{data.additionalInfo}</strong>
          </div>
        ) : null}
      </div>

      <div className={styles.reviewNotice}>
        <ShieldCheck aria-hidden="true" />

        <div>
          <p>
            <strong>Sobre o protótipo</strong>
          </p>

          <p>
            A solicitação é gratuita e não cria compromisso de
            contratação. Nesta etapa, você receberá uma apresentação em
            vídeo. A página não será publicada e o código não será
            entregue.
          </p>
        </div>
      </div>

      <div className={styles.reviewNotice}>
        <ShieldCheck aria-hidden="true" />

        <div>
          <p>
            <strong>Como usaremos seus dados</strong>
          </p>

          <p>
            Ao enviar, seus dados, links e materiais informados serão
            utilizados pela noBRon para analisar esta solicitação,
            preparar o protótipo e entrar em contato sobre este
            atendimento.
          </p>

          <p>
            As autorizações opcionais marcadas acima serão respeitadas de
            acordo com a sua escolha. Saiba mais na{" "}
            <Link href="/politica-de-privacidade">
              Política de Privacidade
            </Link>
            .
          </p>
        </div>
      </div>

      {submitError ? (
        <div
          className={styles.formErrorSummary}
          role="alert"
        >
          <AlertCircle aria-hidden="true" />

          <div>
            <strong>Não foi possível enviar.</strong>
            <span>{submitError}</span>
          </div>
        </div>
      ) : null}

      <div className={styles.reviewActions}>
        <button
          className={styles.secondaryButton}
          type="button"
          onClick={onEdit}
        >
          <ArrowLeft aria-hidden="true" />
          Voltar e editar
        </button>

        <button
          className={styles.primaryButton}
          type="button"
          onClick={onSubmit}
        >
          Solicitar protótipo gratuito
          <Send aria-hidden="true" />
        </button>
      </div>
    </motion.div>
  );
}