import type { Metadata } from "next";

import { SitesSystemsPage } from "@/components/solutions/sites-systems/SitesSystemsPage/SitesSystemsPage";

export const metadata: Metadata = {
  title: "Sites e Sistemas | noBRon",
  description:
    "Sites, landing pages e sistemas sob medida para apresentar, organizar, atender e acompanhar processos com clareza e segurança.",
};

export default function SitesSystemsRoute() {
  return <SitesSystemsPage />;
}
