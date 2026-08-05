"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import styles from "./AboutPageHeader.module.css";

const menuItems = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Soluções", href: "/solucoes" },
  { label: "Contato", href: "/contato" },
  { label: "Protótipo gratuito", href: "/prototipo-gratuito" },
] as const;

export function AboutPageHeader() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const desktopQuery = window.matchMedia(
      "(min-width: 1024px) and (hover: hover)",
    );

    if (!desktopQuery.matches) {
      setIsVisible(true);
      return;
    }

    function handlePointerMove(event: PointerEvent) {
      setIsVisible(event.clientY <= 96);
    }

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <>
      <Link
        aria-label="Voltar para a página inicial"
        className={styles.backButton}
        href="/"
      >
        <ArrowLeft size={18} />
      </Link>

      <header
        className={`${styles.header} ${isVisible ? styles.visible : ""}`}
      >
        <nav
          aria-label="Navegação principal"
          className={styles.nav}
        >
          {menuItems.map((item) => (
            <Link
              key={item.href}
              className={styles.navLink}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}
