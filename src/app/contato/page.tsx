import { ContactPage } from "@/components/contact/ContactPage/ContactPage";
import { StructuredData } from "@/components/seo/StructuredData";

import { createPageMetadata } from "@/lib/seo";
import { createBreadcrumbJsonLd } from "@/lib/structured-data";

import desktopStyles from "./page.desktop.module.css";
import mobileStyles from "./page.mobile.module.css";

const styles = {
  page: `${desktopStyles.page} ${mobileStyles.page}`,
};

export const metadata = createPageMetadata({
  title: "Contato | noBRon",

  description:
    "Fale com a noBRon, que atua a partir de Telêmaco Borba, Paraná, sobre Landing Pages, sites, SEO, marketing digital, estratégia, design, sistemas e automação.",

  path: "/contato",
});

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  {
    name: "Início",
    path: "/",
  },
  {
    name: "Contato",
    path: "/contato",
  },
]);

export default function ContactRoute() {
  return (
    <>
      <StructuredData
        id="nobron-contact-breadcrumb-jsonld"
        data={breadcrumbJsonLd}
      />

      <main className={styles.page}>
        <ContactPage />
      </main>
    </>
  );
}
