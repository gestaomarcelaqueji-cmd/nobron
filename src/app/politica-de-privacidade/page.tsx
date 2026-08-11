import Link from "next/link";

import { StructuredData } from "@/components/seo/StructuredData";

import { createPageMetadata } from "@/lib/seo";
import { createBreadcrumbJsonLd } from "@/lib/structured-data";

import styles from "./page.module.css";

export const metadata = createPageMetadata({
  title: "Política de Privacidade | noBRon",

  description:
    "Entenda como a noBRon coleta, utiliza, protege e trata dados pessoais em seu site, formulários e atendimentos.",

  path: "/politica-de-privacidade",
});

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  {
    name: "Início",
    path: "/",
  },
  {
    name: "Política de Privacidade",
    path: "/politica-de-privacidade",
  },
]);

const navigation = [
  ["01", "Quem é responsável", "responsavel"],
  ["02", "Dados que coletamos", "dados"],
  ["03", "Como utilizamos", "finalidades"],
  ["04", "Bases legais", "bases-legais"],
  ["05", "Protótipo gratuito", "prototipo"],
  ["06", "WhatsApp", "whatsapp"],
  ["07", "Compartilhamento", "compartilhamento"],
  ["08", "Armazenamento", "armazenamento"],
  ["09", "Retenção", "retencao"],
  ["10", "Segurança", "seguranca"],
  ["11", "Seus direitos", "direitos"],
  ["12", "Cookies", "cookies"],
  ["13", "Atualizações", "atualizacoes"],
] as const;

export default function PrivacyPolicyPage() {
  return (
    <>
      <StructuredData
        id="nobron-privacy-policy-breadcrumb-jsonld"
        data={breadcrumbJsonLd}
      />

      <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.hero}>
          <div className={styles.heroTop}>
            <Link className={styles.backLink} href="/">
              noBRon
            </Link>

            <span className={styles.documentType}>
              Privacidade e proteção de dados
            </span>
          </div>

          <div className={styles.heroContent}>
            <span className={styles.eyebrow}>
              Política de Privacidade
            </span>

            <h1>
              Seus dados tratados
              <br />
              com clareza.
            </h1>

            <p className={styles.heroDescription}>
              Esta política explica quais dados pessoais podem ser tratados
              pela noBRon, para que são utilizados, com quem podem ser
              compartilhados e quais direitos você possui sobre essas
              informações.
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

        <div className={styles.policyLayout}>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarInner}>
              <span className={styles.sidebarTitle}>
                Nesta política
              </span>

              <nav aria-label="Navegação da Política de Privacidade">
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
                A noBRon respeita a privacidade das pessoas que acessam o
                site, preenchem formulários, solicitam informações,
                solicitam um protótipo ou utilizam nossos canais de
                atendimento.
              </p>

              <p>
                Esta Política de Privacidade se aplica ao site{" "}
                <strong>nobron.com.br</strong>, aos formulários disponíveis
                nele e às interações diretamente relacionadas aos serviços
                prestados pela noBRon.
              </p>

              <p>
                O tratamento de dados pessoais é realizado de acordo com a
                Lei nº 13.709/2018, a Lei Geral de Proteção de Dados
                Pessoais — LGPD.
              </p>
            </section>

            <PolicySection
              id="responsavel"
              number="01"
              title="Quem é responsável pelo tratamento"
            >
              <p>
                Para fins da LGPD, a operação da noBRon é realizada por{" "}
                <strong>Marcela Beatriz da Cruz Queji</strong>, pessoa
                física responsável pelas decisões relacionadas ao
                tratamento dos dados pessoais realizados no contexto da
                marca noBRon.
              </p>

              <p>
                Ao longo desta política utilizamos o nome{" "}
                <strong>noBRon</strong> para nos referirmos a essa
                operação.
              </p>

              <p>
                Solicitações relacionadas à privacidade ou ao exercício de
                direitos sobre dados pessoais podem ser realizadas por meio
                da nossa página de contato.
              </p>

              <Link
                className={styles.inlineAction}
                href="/contato"
              >
                Falar sobre meus dados →
              </Link>
            </PolicySection>

            <PolicySection
              id="dados"
              number="02"
              title="Quais dados podemos tratar"
            >
              <p>
                Os dados tratados dependem de como você utiliza o site e
                das informações que decide fornecer.
              </p>

              <h3>Dados fornecidos diretamente por você</h3>

              <ul>
                <li>nome;</li>
                <li>número de WhatsApp;</li>
                <li>endereço de e-mail, quando informado;</li>
                <li>nome da empresa ou nome profissional;</li>
                <li>ramo de atuação;</li>
                <li>cidade ou região de atuação;</li>
                <li>serviços oferecidos ou de interesse;</li>
                <li>momento atual do negócio;</li>
                <li>links de site ou redes sociais;</li>
                <li>
                  links de materiais compartilhados por Google Drive ou
                  serviço semelhante;
                </li>
                <li>
                  informações adicionais preenchidas voluntariamente;
                </li>
                <li>
                  respostas específicas relacionadas ao serviço
                  solicitado;
                </li>
                <li>
                  escolhas e autorizações opcionais apresentadas nos
                  formulários.
                </li>
              </ul>

              <div className={styles.note}>
                <strong>Evite enviar dados desnecessários.</strong>

                <p>
                  Não solicitamos que você informe dados pessoais sensíveis
                  que não sejam necessários para o atendimento. Evite
                  escrever em campos abertos documentos pessoais,
                  informações de saúde, dados financeiros ou dados de
                  terceiros que não sejam necessários para sua solicitação.
                </p>
              </div>

              <h3>Materiais e arquivos</h3>

              <p>
                Alguns formulários podem permitir a seleção ou o
                compartilhamento de logotipos, fotografias e outros
                materiais relacionados ao negócio.
              </p>

              <p>
                Na estrutura atual do formulário de protótipo, a seleção
                local de um arquivo não significa que seu conteúdo tenha
                sido armazenado pela noBRon. O sistema pode registrar
                informações como o nome do arquivo selecionado.
              </p>

              <p>
                Materiais compartilhados por meio de links externos, como
                Google Drive, poderão ser acessados somente quando
                necessários para atender à solicitação realizada.
              </p>

              <h3>Dados técnicos</h3>

              <p>
                Também podem ser tratados dados técnicos necessários para
                funcionamento, segurança e prevenção de abuso, incluindo:
              </p>

              <ul>
                <li>página ou formulário de origem;</li>
                <li>data e horário do envio;</li>
                <li>versão do formulário utilizado;</li>
                <li>
                  parâmetros de campanha presentes na URL, como UTM source,
                  medium, campaign, content e term;
                </li>
                <li>
                  informações técnicas utilizadas para impedir spam,
                  fraude ou excesso de solicitações.
                </li>
              </ul>

              <p>
                Os mecanismos de segurança dos formulários podem utilizar
                identificadores técnicos derivados do endereço IP para
                limitar abuso e envios automatizados.
              </p>
            </PolicySection>

            <PolicySection
              id="finalidades"
              number="03"
              title="Para que utilizamos os dados"
            >
              <p>
                Os dados pessoais podem ser utilizados para:
              </p>

              <ul>
                <li>
                  receber e analisar solicitações realizadas pelo site;
                </li>
                <li>
                  entender o negócio, serviço ou necessidade apresentada;
                </li>
                <li>
                  preparar protótipos, propostas, diagnósticos ou respostas
                  solicitadas;
                </li>
                <li>
                  entrar em contato sobre a solicitação realizada;
                </li>
                <li>
                  enviar apresentações relacionadas ao atendimento;
                </li>
                <li>
                  organizar solicitações no painel administrativo da
                  noBRon;
                </li>
                <li>acompanhar o andamento dos atendimentos;</li>
                <li>
                  proteger o site contra spam, fraude, abuso e automações
                  indevidas;
                </li>
                <li>
                  cumprir obrigações legais ou regulatórias;
                </li>
                <li>
                  preservar informações necessárias ao exercício regular
                  de direitos;
                </li>
                <li>
                  responder solicitações relacionadas à proteção de dados.
                </li>
              </ul>

              <p>
                Não utilizaremos os dados de forma incompatível com as
                finalidades informadas nesta política ou no momento em que
                eles forem coletados.
              </p>
            </PolicySection>

            <PolicySection
              id="bases-legais"
              number="04"
              title="Bases legais utilizadas"
            >
              <p>
                O tratamento de dados pessoais pode ocorrer com fundamento
                nas hipóteses previstas pela LGPD, de acordo com a
                finalidade de cada operação.
              </p>

              <p>
                Quando uma pessoa envia voluntariamente uma solicitação de
                contato, protótipo, proposta ou outro serviço, os dados
                necessários podem ser tratados para atender ao pedido
                realizado e para procedimentos relacionados a uma possível
                contratação.
              </p>

              <p>
                Também poderão ser utilizados outros fundamentos previstos
                em lei, quando aplicáveis, como cumprimento de obrigação
                legal ou regulatória, exercício regular de direitos e
                legítimo interesse.
              </p>

              <p>
                Quando determinada atividade depender de{" "}
                <strong>consentimento</strong>, a autorização será
                apresentada separadamente e relacionada à finalidade
                específica.
              </p>
            </PolicySection>

            <PolicySection
              id="prototipo"
              number="05"
              title="Pedido de protótipo gratuito"
            >
              <p>
                O formulário de protótipo gratuito coleta informações
                necessárias para entender o negócio e preparar a
                demonstração solicitada.
              </p>

              <h3>Pesquisa pública complementar</h3>

              <p>
                Você pode autorizar a noBRon a consultar informações
                públicas sobre o seu negócio em mecanismos de busca e redes
                sociais para complementar a criação do protótipo.
              </p>

              <p>
                Essa autorização é <strong>opcional</strong>. Se ela não
                for concedida, o pedido poderá ser enviado normalmente e
                utilizaremos as informações fornecidas diretamente por
                você.
              </p>

              <h3>Fotos públicas das redes sociais</h3>

              <p>
                Você também pode autorizar separadamente o uso, para
                preparação do protótipo solicitado, de imagens públicas do
                próprio negócio disponíveis nas redes sociais informadas.
              </p>

              <p>
                Essa autorização também é opcional e não impede o envio do
                formulário caso não seja concedida.
              </p>

              <h3>Formato da demonstração</h3>

              <p>
                Nesta etapa, o protótipo gratuito é apresentado em vídeo.
                A solicitação não representa publicação automática da
                página, entrega de código ou contratação de qualquer
                serviço.
              </p>
            </PolicySection>

            <PolicySection
              id="whatsapp"
              number="06"
              title="Contato pelo WhatsApp"
            >
              <p>
                Quando você informa um número de WhatsApp para receber
                retorno sobre uma solicitação, esse número pode ser
                utilizado para assuntos diretamente relacionados ao pedido
                realizado.
              </p>

              <p>
                Isso pode incluir esclarecimentos, acompanhamento,
                confirmação de informações e envio de apresentações
                relacionadas ao atendimento.
              </p>

              <p>
                Após determinados formulários, o site poderá oferecer a
                opção de continuar a conversa pelo WhatsApp.
              </p>

              <div className={styles.note}>
                <strong>Essa etapa é opcional.</strong>

                <p>
                  Quando a tela informa que a solicitação foi recebida, os
                  dados já foram registrados pela noBRon. Você não precisa
                  enviar outra mensagem pelo WhatsApp para concluir o
                  pedido.
                </p>
              </div>

              <p>
                O fornecimento do número para atendimento de uma
                solicitação não representa autorização automática para
                envio de publicidade ou mensagens promocionais
                desvinculadas daquele atendimento.
              </p>
            </PolicySection>

            <PolicySection
              id="compartilhamento"
              number="07"
              title="Com quem os dados podem ser compartilhados"
            >
              <p>
                A noBRon <strong>não vende dados pessoais</strong>.
              </p>

              <p>
                Alguns fornecedores tecnológicos podem tratar informações
                estritamente para permitir o funcionamento do site e dos
                serviços.
              </p>

              <div className={styles.providers}>
                <div>
                  <span>Supabase</span>
                  <p>
                    Infraestrutura utilizada para banco de dados,
                    autenticação e funcionamento do sistema
                    administrativo.
                  </p>
                </div>

                <div>
                  <span>Vercel</span>
                  <p>
                    Infraestrutura utilizada para hospedagem e execução da
                    aplicação web.
                  </p>
                </div>

                <div>
                  <span>WhatsApp / Meta</span>
                  <p>
                    Utilizado quando você decide iniciar ou continuar uma
                    comunicação pelo WhatsApp.
                  </p>
                </div>

                <div>
                  <span>Google Drive</span>
                  <p>
                    Pode ser utilizado quando você decide compartilhar
                    materiais por meio de um link hospedado nesse serviço.
                  </p>
                </div>
              </div>

              <p>
                Também poderão ocorrer compartilhamentos quando necessários
                para cumprimento de obrigação legal, determinação de
                autoridade competente ou exercício regular de direitos.
              </p>

              <h3>Transferência internacional</h3>

              <p>
                Alguns fornecedores tecnológicos podem utilizar
                infraestrutura, empresas relacionadas ou prestadores
                localizados fora do Brasil.
              </p>

              <p>
                Quando houver transferência internacional de dados
                pessoais, deverão ser observadas as regras aplicáveis da
                LGPD e da regulamentação da Autoridade Nacional de Proteção
                de Dados.
              </p>
            </PolicySection>

            <PolicySection
              id="armazenamento"
              number="08"
              title="Onde os dados são armazenados"
            >
              <p>
                As informações enviadas pelos formulários podem ser
                registradas na infraestrutura de banco de dados utilizada
                pela noBRon e disponibilizadas no painel administrativo.
              </p>

              <p>
                O painel administrativo possui acesso restrito e não é
                destinado ao acesso público.
              </p>

              <p>
                Informações também podem existir temporariamente em
                sistemas técnicos necessários para hospedagem, segurança,
                comunicação e funcionamento do serviço.
              </p>
            </PolicySection>

            <PolicySection
              id="retencao"
              number="09"
              title="Por quanto tempo mantemos os dados"
            >
              <p>
                Os dados pessoais são mantidos pelo período necessário para
                cumprir as finalidades para as quais foram coletados ou
                enquanto existir fundamento legítimo para sua conservação.
              </p>

              <p>
                O período poderá variar de acordo com o tipo de relação
                mantida com a noBRon, o andamento da solicitação,
                obrigações legais e necessidade de exercício regular de
                direitos.
              </p>

              <p>
                Quando não houver mais finalidade ou fundamento para
                conservação, os dados poderão ser eliminados ou
                anonimizados, conforme aplicável.
              </p>

              <p>
                Registros técnicos destinados exclusivamente à segurança e
                prevenção de abuso devem permanecer apenas pelo período
                compatível com essa finalidade.
              </p>
            </PolicySection>

            <PolicySection
              id="seguranca"
              number="10"
              title="Como protegemos seus dados"
            >
              <p>
                A noBRon adota medidas técnicas e administrativas para
                reduzir riscos de acesso não autorizado, perda, alteração,
                divulgação indevida ou tratamento inadequado de dados
                pessoais.
              </p>

              <p>Essas medidas podem incluir:</p>

              <ul>
                <li>acesso administrativo autenticado;</li>
                <li>autenticação multifator;</li>
                <li>
                  regras de autorização e restrição de acesso ao banco de
                  dados;
                </li>
                <li>
                  separação entre credenciais públicas e credenciais
                  restritas ao servidor;
                </li>
                <li>validação das informações enviadas;</li>
                <li>proteção contra requisições abusivas;</li>
                <li>limitação de frequência de envios;</li>
                <li>mecanismos contra spam automatizado.</li>
              </ul>

              <p>
                Nenhum sistema conectado à internet pode garantir risco
                zero. Caso seja identificado um incidente envolvendo dados
                pessoais, serão adotadas as medidas cabíveis conforme a
                legislação aplicável.
              </p>
            </PolicySection>

            <PolicySection
              id="direitos"
              number="11"
              title="Seus direitos sobre os dados"
            >
              <p>
                A LGPD garante direitos relacionados ao tratamento de dados
                pessoais.
              </p>

              <p>Conforme aplicável ao caso, você poderá solicitar:</p>

              <ul>
                <li>confirmação da existência de tratamento;</li>
                <li>acesso aos seus dados pessoais;</li>
                <li>
                  correção de informações incompletas, inexatas ou
                  desatualizadas;
                </li>
                <li>
                  anonimização, bloqueio ou eliminação de dados
                  desnecessários ou tratados em desconformidade;
                </li>
                <li>
                  informações sobre compartilhamento de dados;
                </li>
                <li>
                  revogação de consentimentos concedidos;
                </li>
                <li>
                  eliminação de dados tratados com consentimento, quando
                  aplicável;
                </li>
                <li>demais direitos previstos na legislação.</li>
              </ul>

              <h3>Como exercer seus direitos</h3>

              <p>
                Para realizar uma solicitação relacionada aos seus dados,
                utilize a página de contato da noBRon e informe que o
                assunto é relacionado à privacidade ou proteção de dados.
              </p>

              <Link
                className={styles.contactAction}
                href="/contato"
              >
                <span>
                  <small>Canal de privacidade</small>
                  Solicitar acesso, correção ou exclusão
                </span>

                <strong>→</strong>
              </Link>

              <p className={styles.smallPrint}>
                Poderemos solicitar informações adicionais quando forem
                necessárias para confirmar a identidade de quem realizou o
                pedido e evitar que dados pessoais sejam entregues,
                alterados ou excluídos por terceiros não autorizados.
              </p>
            </PolicySection>

            <PolicySection
              id="cookies"
              number="12"
              title="Cookies e tecnologias semelhantes"
            >
              <p>
                O site pode utilizar recursos técnicos necessários ao seu
                funcionamento, segurança e manutenção da sessão.
              </p>

              <p>
                Informações detalhadas sobre cookies, armazenamento local,
                ferramentas de análise e outras tecnologias utilizadas
                serão apresentadas na Política de Cookies da noBRon.
              </p>

              <p>
                Se forem implementadas ferramentas de publicidade,
                remarketing, análise comportamental ou outras tecnologias
                que exijam mecanismos adicionais de transparência ou
                escolha, o site e seus documentos de privacidade serão
                atualizados.
              </p>

              <Link
                className={styles.inlineAction}
                href="/politica-de-cookies"
              >
                Política de Cookies →
              </Link>
            </PolicySection>

            <PolicySection
              id="atualizacoes"
              number="13"
              title="Alterações nesta política"
            >
              <p>
                Esta Política de Privacidade poderá ser atualizada quando
                houver mudanças nos formulários, serviços, fornecedores,
                tecnologias utilizadas, operações de tratamento ou
                requisitos legais.
              </p>

              <p>
                A versão publicada nesta página será considerada a versão
                vigente e sempre apresentará a data da última atualização.
              </p>

              <p>
                Quando uma alteração modificar de forma relevante o
                tratamento de dados pessoais, poderão ser adotadas medidas
                adicionais de comunicação quando necessário.
              </p>
            </PolicySection>

            <footer className={styles.policyFooter}>
              <div>
                <span>Controladora</span>
                <strong>
                  Marcela Beatriz da Cruz Queji
                </strong>
              </div>

              <div>
                <span>Operação</span>
                <strong>noBRon</strong>
              </div>

              <div>
                <span>Canal de privacidade</span>
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
