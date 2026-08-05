import { siteConfig } from "@/data/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__top">
        <div>
          <Logo />
          <p>{siteConfig.slogan}</p>
        </div>
        <nav aria-label="Navegação do rodapé">
          {siteConfig.navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
      </div>
      <div className="container site-footer__bottom">
        <span>Landing Pages estratégicas para negócios reais.</span>
        <span>Feito no Brasil <span aria-hidden="true">🇧🇷</span></span>
      </div>
    </footer>
  );
}
