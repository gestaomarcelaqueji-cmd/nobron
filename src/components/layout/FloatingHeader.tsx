"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useId,
  useState,
} from "react";

import styles from "./FloatingHeader.module.css";

type MenuItem = {
  label: string;
  description: string;
  href: string;
};

const menuItems: MenuItem[] = [
  {
    label: "Início",
    description:
      "Conheça a noBRon e explore nossas áreas de atuação.",
    href: "/",
  },
  {
    label: "Sobre",
    description:
      "Conheça a visão, a trajetória e a responsabilidade humana por trás da noBRon.",
    href: "/sobre",
  },
  {
    label: "Soluções",
    description:
      "Entenda a estrutura da sua presença digital e os caminhos de atuação da noBRon.",
    href: "/solucoes",
  },
  {
    label: "Landing Page",
    description:
      "Estratégia, conteúdo e tecnologia em uma página pensada para converter.",
    href: "/landing-page",
  },
  {
    label: "Contato",
    description:
      "Conte o momento da sua empresa e escolha a melhor forma de iniciar a conversa.",
    href: "/contato",
  },
  {
    label: "Protótipo gratuito",
    description:
      "Envie os dados do seu negócio e receba uma proposta visual sem compromisso.",
    href: "/prototipo-gratuito",
  },
];

export function FloatingHeader() {
  const pathname = usePathname();
  const menuId = useId();
  const isHiddenRoute = pathname === "/sobre";

  const [isOpen, setIsOpen] =
    useState(false);
  const [isHeaderVisible, setIsHeaderVisible] =
    useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  function toggleMenu() {
    setIsOpen((current) => !current);
  }

  useEffect(() => {
    if (isHiddenRoute) return;

    const desktopPointer = window.matchMedia(
      "(min-width: 721px) and (hover: hover)",
    );

    function handlePointerMove(event: PointerEvent) {
      if (!desktopPointer.matches) return;

      setIsHeaderVisible(isOpen || event.clientY <= 96);
    }

    function handlePointerLeave() {
      if (desktopPointer.matches && !isOpen) {
        setIsHeaderVisible(false);
      }
    }

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.documentElement.addEventListener(
      "mouseleave",
      handlePointerLeave,
    );

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener(
        "mouseleave",
        handlePointerLeave,
      );
    };
  }, [isHiddenRoute, isOpen]);

  useEffect(() => {
    if (isHiddenRoute || !isOpen) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (event.key === "Escape") {
        closeMenu();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [isHiddenRoute, isOpen]);

  if (isHiddenRoute) {
    return null;
  }

  return (
    <>
      <header
        className={[
          styles.header,
          isHeaderVisible || isOpen
            ? styles.headerVisible
            : "",
          isOpen ? styles.headerOpen : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onFocusCapture={() => setIsHeaderVisible(true)}
      >
        <Link
          href="/"
          className={styles.brand}
          aria-label="Ir para a página inicial da noBRon"
          onClick={closeMenu}
        >
          <Image
            src="/brand/logo-nobron.png"
            alt="noBRon"
            width={100}
            height={20}
            priority
            className={styles.logoImage}
          />
        </Link>

        <button
          type="button"
          className={[
            styles.menuButton,
            isOpen
              ? styles.menuButtonOpen
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-label={
            isOpen
              ? "Fechar navegação"
              : "Abrir navegação"
          }
          aria-expanded={isOpen}
          aria-controls={menuId}
          onClick={toggleMenu}
        >
          <span
            className={styles.visuallyHidden}
          >
            {isOpen
              ? "Fechar navegação"
              : "Abrir navegação"}
          </span>

          <span
            className={styles.menuIcon}
            aria-hidden="true"
          >
            <span />
            <span />
          </span>
        </button>
      </header>

      <div
        className={[
          styles.overlay,
          isOpen ? styles.overlayOpen : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-hidden={!isOpen}
        onMouseDown={(event) => {
          if (
            event.target ===
            event.currentTarget
          ) {
            closeMenu();
          }
        }}
      >
        <nav
          id={menuId}
          className={[
            styles.menuPanel,
            isOpen
              ? styles.menuPanelOpen
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-label="Navegação principal"
        >
          <div className={styles.menuIntro}>
            <span
              className={styles.menuKicker}
            >
              noBRon
            </span>

            <h2 className={styles.menuTitle}>
              Escolha um caminho.
            </h2>

           
          </div>

          <div className={styles.menuLinks}>
            {menuItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    styles.menuLink,
                    isActive
                      ? styles.menuLinkActive
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={closeMenu}
                >
                  <span
                    className={
                      styles.menuLinkCopy
                    }
                  >
                    <span
                      className={
                        styles.menuLinkTitle
                      }
                    >
                      {item.label}

                      {isActive && (
                        <span
                          className={
                            styles.activeDot
                          }
                          aria-label="Página atual"
                        />
                      )}
                    </span>

                    <span
                      className={
                        styles.menuLinkDescription
                      }
                    >
                      {item.description}
                    </span>
                  </span>

                  <span
                    className={
                      styles.menuLinkArrow
                    }
                    aria-hidden="true"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      focusable="false"
                    >
                      <path
                        d="M5 15 15 5"
                        fill="none"
                      />

                      <path
                        d="M8 5h7v7"
                        fill="none"
                      />
                    </svg>
                  </span>
                </Link>
              );
            })}
          </div>

          <footer
            className={styles.menuFooter}
          >
            <p
              className={
                styles.menuSignature
              }
            >
              Feito no Brasil,
              <br />
              online no mundo.
            </p>

            <span
              className={styles.menuMeta}
            >
              Paraná · Brasil
            </span>
          </footer>
        </nav>
      </div>
    </>
  );
}
