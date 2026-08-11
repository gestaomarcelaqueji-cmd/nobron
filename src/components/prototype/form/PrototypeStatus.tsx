import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  RotateCcw,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

import sharedStyles from "../PrototypeRequest.module.css";
import styles from "./PrototypeStatus.module.css";

type PrototypeStatusProps =
  | {
      view: "submitting";
      reducedMotion: boolean;
    }
  | {
      view: "success";
      reducedMotion: boolean;
      whatsapp: string;
      whatsappUrl?: string;
      onReset: () => void;
    };

export function PrototypeStatus(props: PrototypeStatusProps) {
  if (props.view === "submitting") {
    return (
      <motion.div
        className={styles.statusCard}
        initial={
          props.reducedMotion
            ? false
            : {
                opacity: 0,
                y: 16,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        aria-live="polite"
      >
        <h2>Estamos registrando suas informações.</h2>

        <p>
          Só um instante enquanto enviamos seu pedido com segurança para a
          noBRon.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={styles.statusCard}
      initial={
        props.reducedMotion
          ? false
          : {
              opacity: 0,
              y: 20,
            }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: props.reducedMotion ? 0 : 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      aria-live="polite"
    >
      <motion.div
        className={styles.successIcon}
        initial={
          props.reducedMotion
            ? false
            : {
                opacity: 0,
                scale: 0.7,
              }
        }
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: props.reducedMotion ? 0 : 0.4,
          delay: props.reducedMotion ? 0 : 0.12,
        }}
      >
        <CheckCircle2 aria-hidden="true" />
      </motion.div>

      <span className={styles.statusEyebrow}>
        Solicitação recebida
      </span>

      <h2>Recebemos seu pedido de protótipo.</h2>

      <p>
        As informações preenchidas no formulário já foram enviadas para a
        noBRon e seu pedido está registrado.
      </p>

      <div className={styles.whatsappConfirmation}>
        <MessageCircle aria-hidden="true" />

        <span>
          Você <strong>não precisa enviar uma mensagem no WhatsApp</strong>{" "}
          para concluir a solicitação. O retorno e o envio do vídeo serão feitos
          pelo número informado:
          <strong>{props.whatsapp}</strong>
        </span>
      </div>

      <p className={styles.statusNote}>
        Se quiser, você também pode iniciar a conversa pelo WhatsApp agora.
        Essa etapa é opcional.
      </p>

      <div className={styles.successActions}>
        {props.whatsappUrl ? (
          <a
            className={sharedStyles.primaryButton}
            href={props.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Continuar no WhatsApp
            <ArrowRight aria-hidden="true" />
          </a>
        ) : null}

        <Link className={sharedStyles.textButton} href="/">
          Voltar para o site
        </Link>

        <button
          className={sharedStyles.textButton}
          type="button"
          onClick={props.onReset}
        >
          <RotateCcw aria-hidden="true" />
          Enviar outro pedido
        </button>
      </div>
    </motion.div>
  );
}