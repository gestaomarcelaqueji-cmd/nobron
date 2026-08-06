import type { Metadata } from "next";

import { BrandingPage } from "@/components/solutions/branding/BrandingPage/BrandingPage";

export const metadata: Metadata = {
  title: "Branding e Design | noBRon",
  description:
    "Construímos identidades e materiais visuais capazes de representar e diferenciar a empresa.",
};

export default function BrandingRoute() {
  return <BrandingPage />;
}
