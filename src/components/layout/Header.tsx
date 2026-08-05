"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig, whatsappMessages } from "@/data/site";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { Logo } from "./Logo";
import { RollingButton } from "@/components/ui/RollingButton";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a href="#inicio" className="site-header__logo" aria-label="Voltar ao início"><Logo /></a>
        <nav
          id="primary-navigation"
          className={`site-nav ${open ? "site-nav--open" : ""}`}
          aria-label="Navegação principal"
        >
          {siteConfig.navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>
          ))}
          <RollingButton
            className="site-nav__cta"
            href={createWhatsAppUrl(whatsappMessages.hero)}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
          >
            Quero minha Landing Page
          </RollingButton>
        </nav>
        <button
          className="menu-button"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-controls="primary-navigation"
          aria-expanded={open}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
