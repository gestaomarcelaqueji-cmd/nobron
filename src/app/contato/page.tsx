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
    "Conte o momento da sua empresa e fale com a noBRon sobre estratégia, branding, sites, sistemas, SEO, marketing digital, automação ou Landing Pages.",

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