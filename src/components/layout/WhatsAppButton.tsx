import { MessageCircle } from "lucide-react";
import { whatsappMessages } from "@/data/site";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppButton() {
  return (
    <a
      className="whatsapp-fixed"
      href={createWhatsAppUrl(whatsappMessages.hero)}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar com a noBRon pelo WhatsApp"
    >
      <MessageCircle />
      <span>Quero minha Landing Page</span>
    </a>
  );
}
