import { CheckCheck, MoreVertical, Paperclip, Send, Smile } from "lucide-react";

export function WhatsAppMockup() {
  return (
    <div className="whatsapp-mockup">
      <div className="whatsapp-mockup__header">
        <div className="whatsapp-avatar">nB</div>
        <div><strong>noBRon Serviços</strong><span>online</span></div>
        <MoreVertical size={18} />
      </div>
      <div className="whatsapp-mockup__body">
        <div className="whatsapp-bubble">Olá! Gostaria de solicitar um atendimento.<small>10:30 <CheckCheck size={13} /></small></div>
      </div>
      <div className="whatsapp-mockup__input"><Smile size={17} /><span>Digite uma mensagem</span><Paperclip size={16} /><Send size={17} /></div>
    </div>
  );
}
