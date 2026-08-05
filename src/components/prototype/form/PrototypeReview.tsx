import { ArrowLeft, Send, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

import type { RequestData } from "../prototype.types";
import styles from "../PrototypeRequest.module.css";

type PrototypeReviewProps = {
  data: RequestData;
  logoFiles: File[];
  photoFiles: File[];
  reducedMotion: boolean;
  onEdit: () => void;
  onSubmit: () => void;
};

export function PrototypeReview({
  data,
  logoFiles,
  photoFiles,
  reducedMotion,
  onEdit,
  onSubmit,
}: PrototypeReviewProps) {
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
      data.socialLinks.filter(Boolean).join(", ") || "Nenhum link informado",
    ],
    [
      "Materiais",
      [
        logoFiles.length ? "logotipo" : "",
        photoFiles.length ? `${photoFiles.length} foto(s)` : "",
        data.driveLink ? "pasta do Drive" : "",
        data.useSocialPhotos ? "fotos das redes" : "",
      ]
        .filter(Boolean)
        .join(", ") || "Nenhum material enviado",
    ],
  ];

  return (
    <motion.div
      className={styles.reviewCard}
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2>Revise seu pedido antes de enviar.</h2>
      <p className={styles.reviewDescription}>
        Confira os dados que usaremos para pesquisar o negócio e preparar a
        proposta visual.
      </p>

      <div className={styles.reviewList}>
        {reviewItems.map(([label, value]) => (
          <div className={styles.reviewRow} key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}

        {data.additionalInfo && (
          <div className={styles.reviewRow}>
            <span>Informação adicional</span>
            <strong>{data.additionalInfo}</strong>
          </div>
        )}
      </div>

      <div className={styles.reviewNotice}>
        <ShieldCheck aria-hidden="true" />
        <p>
          A solicitação é gratuita e não cria compromisso de contratação. A
          noBRon avalia a disponibilidade e confirma os próximos passos pelo
          WhatsApp.
        </p>
      </div>

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
