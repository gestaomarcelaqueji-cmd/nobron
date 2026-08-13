"use client";

import {
  CalendarDays,
  House,
  Images,
  Layers2,
  UserRound,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

import styles from "./BottomNavigation.module.css";

type BottomNavigationProps = {
  onBook: () => void;
  hidden?: boolean;
};

type NavId = "inicio" | "servicos" | "trabalhos" | "perfil";

const navigation = [
  { id: "inicio" as const, label: "Início", icon: House },
  { id: "servicos" as const, label: "Serviços", icon: Layers2 },
  { id: "trabalhos" as const, label: "Trabalhos", icon: Images },
  { id: "perfil" as const, label: "Perfil", icon: UserRound },
] as const;

export function BottomNavigation({ onBook, hidden = false }: BottomNavigationProps) {
  const [active, setActive] = useState<NavId>("inicio");

  useEffect(() => {
    const elements = navigation
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActive(visible.target.id as NavId);
      },
      {
        rootMargin: "-27% 0px -58% 0px",
        threshold: [0, 0.12, 0.28, 0.5],
      },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  function goTo(id: NavId) {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <motion.nav
      className={styles.nav}
      aria-label="Navegação principal da experiência"
      initial={false}
      animate={{ y: hidden ? 28 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: hidden ? "none" : "auto" }}
    >
      {navigation.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.id;

        return (
          <button
            key={item.id}
            className={styles.item}
            type="button"
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
            onClick={() => goTo(item.id)}
          >
            {isActive ? (
              <motion.span
                className={styles.activePill}
                layoutId="beauty-active-nav"
                transition={{ type: "spring", stiffness: 420, damping: 38, mass: 0.8 }}
              />
            ) : null}

            <span className={styles.itemContent}>
              <Icon aria-hidden="true" />
            </span>
          </button>
        );
      })}

      <button
        className={`${styles.item} ${styles.book}`}
        type="button"
        aria-label="Agendar"
        onClick={onBook}
      >
        <span className={styles.itemContent}>
          <CalendarDays aria-hidden="true" />
        </span>
      </button>
    </motion.nav>
  );
}
