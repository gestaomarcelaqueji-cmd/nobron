"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/data/faqs";

export function FaqSection() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section faq-section" id="duvidas">
      <Container className="faq-layout">
        <SectionHeading title="As principais dúvidas antes de começar." description="Informações claras para você entender exatamente o que está contratando." />
        <div className="faq-list">
          {faqs.map((faq, index) => {
            const active = open === index;
            const buttonId = `faq-button-${index}`;
            const answerId = `faq-answer-${index}`;

            return (
              <article className={`faq-item ${active ? "is-open" : ""}`} key={faq.question}>
                <button
                  id={buttonId}
                  type="button"
                  onClick={() => setOpen(active ? -1 : index)}
                  aria-controls={answerId}
                  aria-expanded={active}
                >
                  <span>{faq.question}</span>{active ? <Minus /> : <Plus />}
                </button>
                <div
                  id={answerId}
                  className="faq-answer"
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!active}
                >
                  <p>{faq.answer}</p>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
