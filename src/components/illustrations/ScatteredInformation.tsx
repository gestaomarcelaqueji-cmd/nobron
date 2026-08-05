import { Instagram, MapPin, MessageCircle, Phone, Star } from "lucide-react";

export function ScatteredInformation() {
  return (
    <div className="scatter-scene" aria-label="Informações espalhadas em vários canais">
      <span className="scatter-item scatter-item--instagram"><Instagram /></span>
      <span className="scatter-item scatter-item--phone"><Phone /> (42) 99999-9999</span>
      <span className="scatter-item scatter-item--question">Qual o preço?</span>
      <span className="scatter-item scatter-item--message"><MessageCircle /> Vocês fazem isso?</span>
      <span className="scatter-item scatter-item--map"><MapPin /></span>
      <span className="scatter-item scatter-item--review"><Star /> Bom atendimento...</span>
      <span className="scatter-photo scatter-photo--one"><i /></span>
      <span className="scatter-photo scatter-photo--two"><i /></span>
      <span className="scatter-photo scatter-photo--three"><i /></span>
      <svg className="scatter-paths" viewBox="0 0 500 360" aria-hidden="true">
        <path d="M40 90 C120 5 180 145 245 75 S390 85 455 35" />
        <path d="M50 292 C125 210 170 335 265 260 S390 280 460 195" />
        <path d="M100 185 C160 230 220 120 290 178 S395 155 430 120" />
      </svg>
    </div>
  );
}
