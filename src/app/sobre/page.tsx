import type { Metadata } from "next";

import { AboutPageHeader } from "@/components/about/AboutScrollytelling/AboutPageHeader";
import { AboutScrollytelling } from "@/components/about/AboutScrollytelling/AboutScrollytelling";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Sobre | noBRon",
  description:
    "Conheça a trajetória, os estudos e a presença humana por trás da estratégia, da criação e da tecnologia da noBRon.",
};

export default function SobrePage() {
  return (
    <main className={styles.page}>
      <AboutPageHeader />
      <AboutScrollytelling />
    </main>
  );
}
