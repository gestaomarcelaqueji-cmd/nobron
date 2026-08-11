import { Check, MapPin, MessageCircle, ShieldCheck, Star } from "lucide-react";
import type { CSSProperties } from "react";
import type { Profession } from "@/data/professions";
import { ProfessionArtwork } from "./ProfessionArtwork";
import { cn } from "@/lib/cn";

export function LandingPageMockup({ profession, compact = false, className }: { profession: Profession; compact?: boolean; className?: string }) {
  const style = {
    "--mock-accent": profession.accent,
    "--mock-soft": profession.accentSoft,
  } as CSSProperties;

  return (
    <div className={cn("browser-mockup", compact && "browser-mockup--compact", className)} style={style}>
      <div className="browser-mockup__bar">
        <div className="browser-mockup__dots"><i /><i /><i /></div>
        <div className="browser-mockup__url">{profession.id}.nobron.com.br</div>
        <ShieldCheck size={14} />
      </div>
      <div className="mock-page">
        <div className="mock-page__hero">
          <div className="mock-page__copy">
            <div className="mock-page__title">
              {profession.title}
            </div>
            <p>{profession.description}</p>
            <span className="mock-page__cta"><MessageCircle size={15} /> {profession.cta}</span>
          </div>
          <div className="mock-page__visual">
            <ProfessionArtwork visual={profession.visual} accent={profession.accent} />
          </div>
        </div>

        <div className="mock-trust-row">
          <span><Check size={13} /> Atendimento rápido</span>
          <span><ShieldCheck size={13} /> Serviço profissional</span>
          <span><MapPin size={13} /> {profession.id === "fotografo" ? "Atendimento regional" : "Telêmaco Borba"}</span>
        </div>

        <div className="mock-services">
          {profession.services.map((service, index) => (
            <div className="mock-service" key={service}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{service}</strong>
            </div>
          ))}
        </div>

        {!compact ? (
          <div className="mock-page__bottom">
            <div>
              <span className="mock-label">Avaliações de clientes</span>
              <div className="mock-stars"><Star /><Star /><Star /><Star /><Star /></div>
              <p>Atendimento claro, cuidadoso e profissional.</p>
            </div>
            <div className="mock-map">
              <div className="mock-map__roads" />
              <MapPin size={22} />
              <strong>{profession.id === "personal" ? "Atendimento presencial" : "Área atendida"}</strong>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
