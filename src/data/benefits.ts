import {
  Brush,
  FileText,
  Gauge,
  Globe2,
  MessageCircle,
  ShieldCheck,
  Smartphone,
  Wrench,
} from "lucide-react";

export const benefits = [
  { label: "Página personalizada", icon: Brush },
  { label: "Textos profissionais", icon: FileText },
  { label: "Contato pelo WhatsApp", icon: MessageCircle },
  { label: "Preparada para celular", icon: Smartphone },
  { label: "Estrutura para o Google", icon: Globe2 },
  { label: "Hospedagem incluída", icon: Gauge },
  { label: "Manutenção incluída", icon: Wrench },
  { label: "Sem fidelidade", icon: ShieldCheck },
] as const;
