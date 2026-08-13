import type { BeautyPageData, BeautyService, BeautyWork } from "../data/beauty.types";

export function buildWorkWhatsappMessage(data: BeautyPageData, work: BeautyWork) {
  return `Olá! Vi no site de ${data.brand.name} o trabalho “${work.title}” e gostaria de saber mais sobre agendamento.`;
}

export function buildServiceWhatsappMessage(
  data: BeautyPageData,
  service: BeautyService,
) {
  return `Olá! Vim pelo site de ${data.brand.name} e gostaria de saber mais sobre ${service.name}.`;
}

export function buildGeneralWhatsappMessage(data: BeautyPageData) {
  return `Olá! Vim pelo site de ${data.brand.name} e gostaria de saber mais sobre agendamento.`;
}
