import type { Metadata } from "next";
import { PrototypeRequest } from "@/components/prototype/PrototypeRequest";

export const metadata: Metadata = {
  title: "Protótipo gratuito | noBRon",
  description:
    "Solicite gratuitamente uma proposta visual de Landing Page pensada para o seu negócio.",
};

export default function FreePrototypePage() {
  return <PrototypeRequest />;
}
