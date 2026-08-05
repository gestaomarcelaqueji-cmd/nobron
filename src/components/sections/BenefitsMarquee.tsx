import { benefits } from "@/data/benefits";

export function BenefitsMarquee() {
  const repeated = [...benefits, ...benefits];
  return (
    <section className="benefits-marquee" aria-label="Benefícios incluídos">
      <div className="benefits-marquee__track">
        {repeated.map(({ label, icon: Icon }, index) => (
          <div className="benefit-chip" key={`${label}-${index}`} aria-hidden={index >= benefits.length}>
            <Icon />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
