import Link from "next/link";

import styles from "./GlobalFooter.module.css";

type FooterLink = {
  label: string;
  href: string;
};

const solutionLinks: FooterLink[] = [
  {
    label: "Estratégia e Direção",
    href: "/solucoes/estrategia-direcao",
  },
  {
    label: "Branding e Design",
    href: "/solucoes/branding-design",
  },
  {
    label: "Sites e Sistemas",
    href: "/solucoes/sites-sistemas",
  },
  {
    label: "SEO e Presença Digital",
    href: "/solucoes/seo",
  },
  {
    label: "Marketing Digital",
    href: "/solucoes/marketing-digital",
  },
  {
    label: "Automação e Integrações",
    href: "/solucoes/automacao",
  },
];

const productLinks: FooterLink[] = [
  {
    label: "Landing Page",
    href: "/landing-page",
  },
  {
    label: "Protótipo gratuito",
    href: "/prototipo-gratuito",
  },
];

const institutionalLinks: FooterLink[] = [
  {
    label: "Início",
    href: "/",
  },
  {
    label: "Soluções",
    href: "/solucoes",
  },
  {
    label: "Sobre",
    href: "/sobre",
  },
  {
    label: "Contato",
    href: "/contato",
  },
];

export function GlobalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link
              aria-label="noBRon — página inicial"
              className={styles.brandName}
              href="/"
            >
              noBRon
            </Link>

            <p>
              Feito no Brasil,
              <br />
              online no mundo.
            </p>
          </div>

          <FooterColumn
            links={institutionalLinks}
            title="Navegação"
          />

          <FooterColumn
            links={solutionLinks}
            title="Soluções"
          />

          <FooterColumn
            links={productLinks}
            title="Produtos"
          />
        </div>

        <div className={styles.bottom}>
          <p>
            © {currentYear} noBRon.
          </p>

          <Link className={styles.contactLink} href="/contato">
            Contato
          </Link>
        </div>
      </div>
    </footer>
  );
}

type FooterColumnProps = {
  title: string;
  links: FooterLink[];
};

function FooterColumn({
  title,
  links,
}: FooterColumnProps) {
  return (
    <nav
      aria-label={title}
      className={styles.column}
    >
      <span className={styles.columnTitle}>
        {title}
      </span>

      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>
              <span>{link.label}</span>

              <span
                aria-hidden="true"
                className={styles.linkArrow}
              >
                ↗
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
