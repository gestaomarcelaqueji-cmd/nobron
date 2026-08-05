"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  useCallback,
  useEffect,
  useId,
  useState,
  type MouseEvent,
} from "react";

import { HERO_NAV_ITEMS } from "./heroImmersive.data";
import styles from "./ImmersiveNav.module.css";

export type ImmersiveNavNavigateHandler = (
  href: string,
  event: MouseEvent<HTMLAnchorElement>,
) => void;

type ImmersiveNavProps = {
  visible: boolean;
  logoSrc?: string;
  onNavigateStart?: ImmersiveNavNavigateHandler;
  className?: string;
};

export function ImmersiveNav({
  visible,
  logoSrc = "/brand/logo-nobron.png",
  onNavigateStart,
  className,
}: ImmersiveNavProps) {
  const reducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const handleLinkClick = useCallback(
    (href: string, event: MouseEvent<HTMLAnchorElement>) => {
      setOpen(false);
      onNavigateStart?.(href, event);
    },
    [onNavigateStart],
  );

  return (
    <motion.header
      className={`${styles.header}${className ? ` ${className}` : ""}`}
      data-visible={visible ? "true" : "false"}
      aria-hidden={!visible}
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : -10,
      }}
      transition={{
        duration: reducedMotion ? 0 : 0.65,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        href="/"
        className={styles.brandLink}
        aria-label="noBRon — página inicial"
        tabIndex={visible ? 0 : -1}
        onClick={(event) => handleLinkClick("/", event)}
      >
        <Image
          className={styles.logo}
          src={logoSrc}
          width={160}
          height={40}
          sizes="(max-width: 700px) 112px, 144px"
          alt="noBRon"
          priority
        />
      </Link>

      <nav className={styles.desktopNav} aria-label="Navegação principal">
        {HERO_NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            tabIndex={visible ? 0 : -1}
            onClick={(event) => handleLinkClick(item.href, event)}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        className={styles.menuButton}
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-controls={menuId}
        aria-expanded={open}
        tabIndex={visible ? 0 : -1}
        onClick={() => setOpen((current) => !current)}
      >
        <span />
        <span />
      </button>

      <AnimatePresence>
        {open && visible && (
          <motion.nav
            id={menuId}
            className={styles.mobileNav}
            aria-label="Navegação principal"
            initial={
              reducedMotion ? false : { opacity: 0, y: -8, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reducedMotion ? undefined : { opacity: 0, y: -6, scale: 0.98 }
            }
            transition={{ duration: reducedMotion ? 0 : 0.28 }}
          >
            {HERO_NAV_ITEMS.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(event) => handleLinkClick(item.href, event)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item.label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
