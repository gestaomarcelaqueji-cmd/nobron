import type { Metadata } from "next";

import { ContactPage } from "@/components/contact/ContactPage/ContactPage";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contato | noBRon",
  description:
    "Conte o momento da sua empresa e escolha o caminho mais adequado para iniciar uma conversa com a noBRon.",
};

export default function ContactRoute() {
  return (
    <main className={styles.page}>
      <ContactPage />
    </main>
  );
}
