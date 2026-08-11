import { MapPin, Mic, Search, Star } from "lucide-react";
import { siteConfig } from "@/data/site";

export function GoogleSearchMockup() {
  return (
    <div className="google-mockup">
      <div className="google-mockup__brand"><span>G</span>oogle</div>
      <div className="google-search-field">
        <Search size={17} />
        <span>eletricista em {siteConfig.city}</span>
        <Mic size={16} />
      </div>
      <div className="google-tabs"><b>Todas</b><span>Maps</span><span>Imagens</span><span>Vídeos</span></div>
      <div className="google-result">
        <span className="google-url">eletricista-tb.nobron.com.br</span>
        <div className="google-result__title">
          Eletricista em {siteConfig.city} | Instalações e manutenção
        </div>
        <p>Serviços elétricos com atendimento profissional, informações claras e contato direto pelo WhatsApp.</p>
        <div className="google-result__chips"><span>Instalações</span><span>Manutenção</span><span>Reparos</span></div>
        <div className="google-result__meta"><Star size={14} /> 4,9 <MapPin size={14} /> {siteConfig.city}</div>
      </div>
    </div>
  );
}
