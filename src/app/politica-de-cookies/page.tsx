import Link from "next/link";

import { StructuredData } from "@/components/seo/StructuredData";

import { createPageMetadata } from "@/lib/seo";
import { createBreadcrumbJsonLd } from "@/lib/structured-data";

import styles from "./page.module.css";

export const metadata = createPageMetadata({
  title: "Política de Cookies | noBRon",

  description:
    "Saiba quais cookies e tecnologias de armazenamento são utilizados atualmente no site da noBRon.",

  path: "/politica-de-cookies",
});

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  {
    name: "Início",
    path: "/",
  },
  {
    name: "Política de Cookies",
    path: "/politica-de-cookies",
  },
]);

const navigation = [
  ["01", "O que são cookies", "cookies"],
  ["02", "O que usamos hoje", "uso-atual"],
  ["03", "Cookie administrativo", "administrativo"],
  ["04", "Visitantes do site", "visitantes"],
  ["05", "Outros armazenamentos", "armazenamento"],
  ["06", "Formulários", "formularios"],
  ["07", "Serviços externos", "terceiros"],
  ["08", "Como controlar cookies", "controle"],
  ["09", "Mudanças futuras", "mudancas"],
] as const;

export default function CookiesPolicyPage() {
  return (
    <>
      <StructuredData
        id="nobron-cookies-policy-breadcrumb-jsonld"
        data={breadcrumbJsonLd}
      />

      <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.hero}>
          <div className={styles.heroTop}>
            <Link className={styles.brand} href="/">
              noBRon
            </Link>

            <span className={styles.documentType}>
              Privacidade e proteção de dados
            </span>
          </div>

          <div className={styles.heroContent}>
            <span className={styles.eyebrow}>
              Política de Cookies
            </span>

            <h1>
              Cookies,
              <br />
              sem mistério.
            </h1>

            <p className={styles.heroDescription}>
              Esta política explica quais cookies e tecnologias de
              armazenamento são utilizados atualmente pela noBRon,
              para que servem e em quais situações podem ser criados.
            </p>

            <div className={styles.heroMeta}>
              <div>
                <span>Responsável</span>
                <strong>Marcela Beatriz da Cruz Queji</strong>
              </div>

              <div>
                <span>Última atualização</span>
                <strong>11 de agosto de 2026</strong>
              </div>
            </div>
          </div>
        </header>

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarInner}>
              <span className={styles.sidebarTitle}>
                Nesta política
              </span>

              <nav aria-label="Navegação da Política de Cookies">
                {navigation.map(([number, label, id]) => (
                  <a
                    className={styles.navItem}
                    href={`#${id}`}
                    key={id}
                  >
                    <span>{number}</span>
                    {label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <article className={styles.content}>
            <section className={styles.introduction}>
              <p>
                A noBRon utiliza uma quantidade limitada de cookies e
                tecnologias relacionadas ao funcionamento do site.
              </p>

              <p>
                Atualmente, <strong>visitantes comuns do site não recebem
                cookies de publicidade, analytics, rastreamento ou
                personalização</strong> implementados pela noBRon.
              </p>

              <p>
                O cookie identificado na aplicação é utilizado para
                autenticação e segurança do{" "}
                <strong>painel administrativo</strong> e somente é criado
                quando um administrador realiza login.
              </p>
            </section>

            <PolicySection
              id="cookies"
              number="01"
              title="O que são cookies"
            >
              <p>
                Cookies são pequenos arquivos ou registros armazenados pelo
                navegador durante a utilização de um site ou aplicação.
              </p>

              <p>
                Eles podem ser utilizados para diferentes finalidades, como
                manter uma sessão autenticada, lembrar preferências, medir
                utilização do site ou viabilizar funcionalidades.
              </p>

              <p>
                Nem todo cookie possui a mesma finalidade. Alguns são
                necessários para que determinada função opere corretamente;
                outros podem ser utilizados para analytics, publicidade ou
                personalização.
              </p>
            </PolicySection>

            <PolicySection
              id="uso-atual"
              number="02"
              title="O que a noBRon utiliza atualmente"
            >
              <p>
                No código atual da noBRon, foi identificado apenas o uso de
                cookies relacionados à autenticação do painel
                administrativo.
              </p>

              <div className={styles.statusBox}>
                <div>
                  <span className={styles.statusMark} />
                  <strong>Site público</strong>
                  <p>
                    Não utiliza cookies próprios de analytics, publicidade,
                    remarketing ou preferências.
                  </p>
                </div>

                <div>
                  <span className={styles.statusMark} />
                  <strong>Painel administrativo</strong>
                  <p>
                    Utiliza cookie necessário para manter a sessão
                    autenticada e o nível de autenticação multifator.
                  </p>
                </div>
              </div>

              <p>
                Por esse motivo, a navegação normal pelas páginas públicas
                da noBRon não depende da aceitação de cookies opcionais.
              </p>
            </PolicySection>

            <PolicySection
              id="administrativo"
              number="03"
              title="Cookie do painel administrativo"
            >
              <p>
                Quando um administrador autorizado entra no painel da
                noBRon, o Supabase utiliza um cookie primário para manter a
                sessão de autenticação.
              </p>

              <div className={styles.cookieTable}>
                <div className={styles.cookieRow}>
                  <span>Nome</span>
                  <strong>
                    sb-kqljjqiyognaqcphlcqo-auth-token
                  </strong>
                </div>

                <div className={styles.cookieRow}>
                  <span>Categoria</span>
                  <strong>Estritamente necessário</strong>
                </div>

                <div className={styles.cookieRow}>
                  <span>Quem recebe</span>
                  <strong>
                    Somente administrador autenticado
                  </strong>
                </div>

                <div className={styles.cookieRow}>
                  <span>Finalidade</span>
                  <strong>
                    Manter a sessão administrativa e o nível de
                    autenticação MFA
                  </strong>
                </div>

                <div className={styles.cookieRow}>
                  <span>Fornecedor</span>
                  <strong>Supabase</strong>
                </div>

                <div className={styles.cookieRow}>
                  <span>Escopo</span>
                  <strong>Domínio da noBRon</strong>
                </div>

                <div className={styles.cookieRow}>
                  <span>Duração</span>
                  <strong>
                    Até 400 dias, logout ou invalidação da sessão
                  </strong>
                </div>
              </div>

              <p>
                Dependendo do tamanho das informações da sessão, esse
                cookie pode ser dividido automaticamente em partes com
                nomes como:
              </p>

              <div className={styles.codeList}>
                <code>
                  sb-kqljjqiyognaqcphlcqo-auth-token.0
                </code>

                <code>
                  sb-kqljjqiyognaqcphlcqo-auth-token.1
                </code>

                <code>
                  sb-kqljjqiyognaqcphlcqo-auth-token.2
                </code>
              </div>

              <p>
                Essas partes pertencem à mesma sessão e possuem a mesma
                finalidade do cookie principal.
              </p>

              <div className={styles.note}>
                <strong>Importante</strong>

                <p>
                  Esse cookie não é criado durante a navegação comum pelo
                  site. Ele existe apenas para usuários autorizados que
                  acessam a área administrativa.
                </p>
              </div>
            </PolicySection>

            <PolicySection
              id="visitantes"
              number="04"
              title="Cookies para visitantes do site"
            >
              <p>
                No momento da última atualização desta política, não foram
                identificados no site público da noBRon:
              </p>

              <ul>
                <li>cookies de Google Analytics;</li>
                <li>cookies do Google Tag Manager;</li>
                <li>Meta Pixel;</li>
                <li>cookies de publicidade ou remarketing;</li>
                <li>cookies de Hotjar;</li>
                <li>cookies de Microsoft Clarity;</li>
                <li>cookies de PostHog;</li>
                <li>cookies de preferências;</li>
                <li>cookies próprios de consentimento;</li>
                <li>
                  cookies criados por vídeos ou conteúdos incorporados de
                  terceiros.
                </li>
              </ul>

              <p>
                Também não existem atualmente ferramentas de CAPTCHA de
                terceiros, como reCAPTCHA, hCaptcha ou Turnstile,
                instaladas nos formulários.
              </p>
            </PolicySection>

            <PolicySection
              id="armazenamento"
              number="05"
              title="Outras formas de armazenamento no navegador"
            >
              <p>
                Além de cookies, aplicações web podem utilizar outras
                tecnologias para persistir informações no dispositivo.
              </p>

              <p>
                No código atual da noBRon não foi identificado uso
                intencional de:
              </p>

              <ul>
                <li>localStorage;</li>
                <li>sessionStorage;</li>
                <li>IndexedDB;</li>
                <li>Cache Storage API;</li>
                <li>service workers para armazenamento persistente.</li>
              </ul>

              <p>
                Portanto, atualmente não utilizamos esses mecanismos para
                criar perfis de navegação, armazenar preferências ou
                acompanhar visitantes entre páginas e sessões.
              </p>
            </PolicySection>

            <PolicySection
              id="formularios"
              number="06"
              title="O que acontece enquanto você preenche um formulário"
            >
              <p>
                Os formulários da noBRon mantêm temporariamente as
                informações preenchidas na memória da própria aplicação
                enquanto a página permanece aberta.
              </p>

              <p>
                Isso permite, por exemplo, avançar entre etapas de um
                formulário sem perder imediatamente as respostas.
              </p>

              <div className={styles.note}>
                <strong>Isso não é armazenamento persistente.</strong>

                <p>
                  Antes do envio, essas informações não são gravadas em
                  localStorage, sessionStorage ou cookie. Se a página for
                  recarregada ou fechada, esse estado temporário pode ser
                  perdido.
                </p>
              </div>

              <h3>Arquivos selecionados</h3>

              <p>
                Arquivos selecionados no formulário de protótipo também
                permanecem temporariamente na memória do navegador.
              </p>

              <p>
                Na implementação atual, somente os nomes dos arquivos
                selecionados são enviados junto ao registro do formulário.
                O conteúdo dos arquivos não é armazenado pela noBRon por
                meio desse seletor.
              </p>
            </PolicySection>

            <PolicySection
              id="terceiros"
              number="07"
              title="Serviços externos"
            >
              <h3>Supabase</h3>

              <p>
                O Supabase é utilizado para banco de dados, autenticação do
                painel administrativo e processamento relacionado aos
                formulários da noBRon.
              </p>

              <p>
                O cookie administrativo descrito nesta política está
                relacionado ao sistema de autenticação desse fornecedor.
              </p>

              <h3>WhatsApp / Meta</h3>

              <p>
                O site não incorpora recursos de rastreamento da Meta nem
                utiliza Meta Pixel atualmente.
              </p>

              <p>
                Uma interação com WhatsApp ocorre somente quando a pessoa
                decide utilizar um link ou botão que direciona para esse
                serviço.
              </p>

              <h3>Google Drive</h3>

              <p>
                Quando um usuário informa um link do Google Drive, a noBRon
                registra o endereço informado. O site não abre nem acessa
                automaticamente a conta Google do usuário.
              </p>

              <h3>Fontes</h3>

              <p>
                As fontes utilizadas através do Next.js são servidas
                localmente pela aplicação, sem necessidade de uma
                requisição do navegador ao Google Fonts durante a
                navegação.
              </p>

              <p>
                Provedores de infraestrutura utilizados pela aplicação
                podem manter registros técnicos próprios conforme seus
                serviços, políticas e configurações.
              </p>
            </PolicySection>

            <PolicySection
              id="controle"
              number="08"
              title="Como controlar cookies no navegador"
            >
              <p>
                Navegadores permitem visualizar, bloquear ou excluir
                cookies através de suas próprias configurações.
              </p>

              <p>
                A exclusão ou bloqueio do cookie administrativo pode
                encerrar a sessão ou impedir o funcionamento correto do
                login no painel da noBRon.
              </p>

              <p>
                Como o site público não utiliza atualmente cookies
                opcionais próprios, não existe uma central de preferências
                de cookies da noBRon neste momento.
              </p>
            </PolicySection>

            <PolicySection
              id="mudancas"
              number="09"
              title="O que acontece se novos cookies forem adicionados"
            >
              <p>
                A noBRon poderá futuramente utilizar novas ferramentas para
                analytics, desempenho, atendimento, segurança, publicidade
                ou outras funcionalidades.
              </p>

              <p>
                Antes de ativar tecnologias que utilizem cookies ou outros
                identificadores para novas finalidades, esta política
                deverá ser revista para refletir o funcionamento real do
                site.
              </p>

              <p>
                Quando uma tecnologia depender de consentimento, serão
                implementados os mecanismos necessários para permitir uma
                escolha adequada antes de sua utilização.
              </p>

              <div className={styles.note}>
                <strong>A política acompanha o código.</strong>

                <p>
                  Não declaramos cookies apenas porque eles são comuns em
                  outros sites. Esta página busca refletir as tecnologias
                  efetivamente utilizadas pela noBRon.
                </p>
              </div>
            </PolicySection>

            <footer className={styles.footer}>
              <div>
                <span>Responsável</span>
                <strong>
                  Marcela Beatriz da Cruz Queji
                </strong>
              </div>

              <div>
                <span>Operação</span>
                <strong>noBRon</strong>
              </div>

              <div>
                <span>Privacidade</span>
                <Link href="/politica-de-privacidade">
                  Política de Privacidade
                </Link>
              </div>

              <div>
                <span>Contato</span>
                <Link href="/contato">
                  nobron.com.br/contato
                </Link>
              </div>
            </footer>
          </article>
        </div>
      </div>
      </main>
    </>
  );
}

type PolicySectionProps = {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
};

function PolicySection({
  id,
  number,
  title,
  children,
}: PolicySectionProps) {
  return (
    <section
      className={styles.section}
      id={id}
    >
      <header className={styles.sectionHeader}>
        <span>{number}</span>
        <h2>{title}</h2>
      </header>

      <div className={styles.sectionContent}>
        {children}
      </div>
    </section>
  );
}
