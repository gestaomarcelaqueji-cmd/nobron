export function createBeautyWhatsappUrl(phone: string, message: string) {
  const cleanPhone = phone.replace(/\D/g, "");
  if (!cleanPhone) return null;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
