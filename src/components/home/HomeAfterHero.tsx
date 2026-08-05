import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import styles from "./HomeAfterHero.module.css";

export function HomeAfterHero() {
  return (
    <section
      className={styles.section}
      aria-labelledby="home-after-hero-title"
    >
      <div className={styles.backgroundGlow} aria-hidden="true" />

      <div className={styles.content}>
        <Image
          className={styles.logo}
          src="/public/brand/logo-nobron.png"
          alt="noBRon"
          width={520}
          height={180}
          priority
        />

        <h2 id="home-after-hero-title" className={styles.slogan}>
          <span>Feito no Brasil.</span>
          <span>online no mundo</span>
        </h2>

        <div className={styles.actions}>
          <Link className={styles.primaryAction} href="/solucoes">
            Ver soluções
            <ArrowRight aria-hidden="true" size={16} strokeWidth={1.7} />
          </Link>

          <Link className={styles.secondaryAction} href="/contato">
            Contato
          </Link>
        </div>
      </div>
    </section>
  );
}