import {
  ArrowRight,
  CheckCircle2,
  LoaderCircle,
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
      >
        <LoaderCircle className={styles.loader} aria-hidden="true" />

        <h2>Estamos enviando suas informações.</h2>

        <p>
          Só um instante enquanto registramos o seu pedido de protótipo.
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
        Solicitação enviada
      </span>

      <h2>Recebemos seu pedido de protótipo.</h2>

      <p>
        Agora vamos analisar as informações enviadas, pesquisar o seu negócio
        e definir uma proposta visual para a sua Landing Page.
      </p>

      <div className={styles.whatsappConfirmation}>
        <MessageCircle aria-hidden="true" />

        <span>
          O retorno e o envio do vídeo serão feitos por este WhatsApp:
          <strong>{props.whatsapp}</strong>
        </span>
      </div>

      <p className={styles.statusNote}>
        Caso alguma informação precise ser confirmada, entraremos em contato
        antes de iniciar o protótipo.
      </p>

      <div className={styles.successActions}>
        <Link className={sharedStyles.primaryButton} href="/">
          Voltar para o site
          <ArrowRight aria-hidden="true" />
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
