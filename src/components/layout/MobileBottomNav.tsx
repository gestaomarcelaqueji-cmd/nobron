"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  House,
  LayoutGrid,
  MessageCircle,
  MousePointerClick,
  type LucideIcon,
} from "lucide-react";

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
      pathname === "/solucoes" ||
      pathname.startsWith("/solucoes/"),
  },
  {
    label: "Contato",
    href: "/contato",
    icon: MessageCircle,
    isActive: (pathname) =>
      pathname === "/contato" ||
      pathname.startsWith("/contato/"),
  },
  {
    label: "Oportunidade",
    href: "/landing-page",
    icon: MousePointerClick,
    isActive: (pathname) =>
      pathname === "/landing-page" ||
      pathname.startsWith("/landing-page/"),
  },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  const normalizedPathname =
    pathname !== "/" && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  return (
    <nav
      className={styles.nav}
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
          >
            <span className={styles.iconShell}>
              <Icon
                aria-hidden="true"
                size={21}
                strokeWidth={1.8}
              />
            </span>

            <span className={styles.label}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}