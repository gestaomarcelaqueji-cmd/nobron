import type { Metadata } from "next";

import { DiagnosticSection } from "@/components/solutions/DiagnosticSection";

import { ServicesDirectory } from "@/components/solutions/ServicesDirectory";
import { SolutionsFinalCta } from "@/components/solutions/SolutionsFinalCta";
import { SolutionsHero } from "@/components/solutions/SolutionsHero";

import desktopStyles from "./solutions-page.desktop.module.css";
import mobileStyles from "./solutions-page.mobile.module.css";

const styles = {
  page: `${desktopStyles.page} ${mobileStyles.page}`,
};

export const metadata: Metadata = {
  title: "Soluções | noBRon",
  description:
    "Estratégia, branding, sites, SEO, marketing e automação conectados para fortalecer a estrutura digital da sua empresa.",
};

export default function SolutionsPage() {
  return (
    <main className={styles.page}>
      <SolutionsHero />

      <ServicesDirectory />
      <DiagnosticSection />
      <SolutionsFinalCta />
    </main>
  );
}
