import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

import styles from "./PrototypeRequest.module.css";

export function PrototypeHeader() {
  return (
    <header className={styles.header}>
      <Link
        className={styles.brand}
        href="/"
        aria-label="noBRon — voltar para a página inicial"
      >
        <Image
          className={styles.brandLogo}
          src="/brand/logo-nobron.png"
          alt=""
          width={1920}
          height={1080}
          priority
        />
      </Link>

      <Link className={styles.backLink} href="/">
        Voltar para o site
        <ExternalLink aria-hidden="true" />
      </Link>
    </header>
  );
}
