import { AboutMobileStory } from "@/components/about/AboutScrollytelling/AboutMobileStory";
import { AboutScrollytelling } from "@/components/about/AboutScrollytelling/AboutScrollytelling";
import { StructuredData } from "@/components/seo/StructuredData";

import { createPageMetadata } from "@/lib/seo";
import { createBreadcrumbJsonLd } from "@/lib/structured-data";

import desktopStyles from "./page.desktop.module.css";
import mobileStyles from "./page.mobile.module.css";

const styles = {
  page: [
    desktopStyles.page,
    mobileStyles.page,
  ].join(" "),
};

export const metadata = createPageMetadata({
  title: "Sobre a noBRon | Estratégia, Criação e Tecnologia",

  description:
    "Conheça a noBRon, sua trajetória, visão e a presença humana por trás dos projetos de estratégia, design, marketing, sites, sistemas e tecnologia.",

  path: "/sobre",
});

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  {
    name: "Início",
    path: "/",
  },
  {
    name: "Sobre a noBRon",
    path: "/sobre",
  },
]);

export default function SobrePage() {
  return (
    <>
      <StructuredData
        id="nobron-about-breadcrumb-jsonld"
        data={breadcrumbJsonLd}
      />

      <main className={styles.page}>
        <AboutScrollytelling />

        <AboutMobileStory />
      </main>
    </>
  );
}