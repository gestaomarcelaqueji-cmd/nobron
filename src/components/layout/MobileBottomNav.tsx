"use client";

import {
  Ellipsis,
  House,
  LayoutGrid,
  MessageCircle,
  MousePointerClick,
  X,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import styles from "./MobileBottomNav.module.css";

type MobileNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  isActive: (pathname: string) => boolean;
};

const navItems: MobileNavItem[] = [
  {
    label: "Home",
    href: "/",
    icon: House,
    isActive: (pathname) => pathname === "/",
  },
  {
    label: "Soluções",
    href: "/solucoes",
    icon: LayoutGrid,
    isActive: (pathname) =>
      pathname === "/solucoes" || pathname.startsWith("/solucoes/"),
  },
  {
    label: "Contato",
    href: "/contato",
    icon: MessageCircle,
    isActive: (pathname) =>
      pathname === "/contato" || pathname.startsWith("/contato/"),
  },
  {
    label: "Landing",
    href: "/landing-page",
    icon: MousePointerClick,
    isActive: (pathname) =>
      pathname === "/landing-page" || pathname.startsWith("/landing-page/"),
  },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return null;
  }

  const normalizedPathname =
    pathname !== "/" && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  const isHome = normalizedPathname === "/";
  const usesDarkBackground = normalizedPathname === "/sobre";
  const isMoreActive =
    normalizedPathname === "/sobre" ||
    normalizedPathname === "/prototipo-gratuito" ||
    normalizedPathname === "/politica-de-privacidade" ||
    normalizedPathname === "/politica-de-cookies";

  return (
    <>
      <button
        type="button"
        className={[
          styles.moreBackdrop,
          isMoreOpen ? styles.moreBackdropOpen : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-label="Fechar menu adicional"
        aria-hidden={!isMoreOpen}
        tabIndex={isMoreOpen ? 0 : -1}
        onClick={() => setIsMoreOpen(false)}
      />

      <aside
        id="mobile-more-menu"
        className={[
          styles.moreSheet,
          isMoreOpen ? styles.moreSheetOpen : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-hidden={!isMoreOpen}
        onKeyDown={(event) => {
          if (event.key === "Escape") setIsMoreOpen(false);
        }}
      >
        <div className={styles.moreHeader}>
          <div>
            <span>Mais caminhos</span>
            <h2>Continue explorando.</h2>
          </div>

          <button
            type="button"
            className={styles.moreClose}
            aria-label="Fechar menu adicional"
            tabIndex={isMoreOpen ? 0 : -1}
            onClick={() => setIsMoreOpen(false)}
          >
            <X aria-hidden="true" size={20} />
          </button>
        </div>

        <div className={styles.moreLinks}>
          <Link
            href="/sobre"
            tabIndex={isMoreOpen ? 0 : -1}
            onClick={() => setIsMoreOpen(false)}
          >
            <span>Sobre a noBRon</span>
            <small>Visão, trajetória e responsabilidade humana.</small>
          </Link>

          <Link
            href="/prototipo-gratuito"
            tabIndex={isMoreOpen ? 0 : -1}
            onClick={() => setIsMoreOpen(false)}
          >
            <span>Protótipo gratuito</span>
            <small>Peça uma proposta visual sem compromisso.</small>
          </Link>

          <Link
            href="/politica-de-privacidade"
            tabIndex={isMoreOpen ? 0 : -1}
            onClick={() => setIsMoreOpen(false)}
          >
            <span>Política de Privacidade</span>
            <small>Como a noBRon trata e protege seus dados.</small>
          </Link>

          <Link
            href="/politica-de-cookies"
            tabIndex={isMoreOpen ? 0 : -1}
            onClick={() => setIsMoreOpen(false)}
          >
            <span>Política de Cookies</span>
            <small>Cookies e armazenamentos utilizados pelo site.</small>
          </Link>
        </div>
      </aside>

      <nav
        className={styles.nav}
        data-home={isHome ? "true" : "false"}
        data-tone={usesDarkBackground ? "dark" : "light"}
        aria-label="Navegação principal mobile"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.isActive(normalizedPathname);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                styles.item,
                active ? styles.itemActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-current={active ? "page" : undefined}
              onClick={() => setIsMoreOpen(false)}
            >
              <span className={styles.iconShell}>
                <Icon
                  aria-hidden="true"
                  size={18}
                  strokeWidth={active ? 2.1 : 1.75}
                />
              </span>

              <span className={styles.label}>{item.label}</span>
            </Link>
          );
        })}

        <button
          type="button"
          className={[
            styles.item,
            isMoreActive || isMoreOpen ? styles.itemActive : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-expanded={isMoreOpen}
          aria-controls="mobile-more-menu"
          onClick={() => setIsMoreOpen((current) => !current)}
        >
          <span className={styles.iconShell}>
            <Ellipsis aria-hidden="true" size={19} />
          </span>
          <span className={styles.label}>Mais</span>
        </button>
      </nav>
    </>
  );
}
