import { faqItems } from "@/data/demo";

export function FAQSection() {
  return (
    <section className="section faq" id="faq">
      <div className="shell faq__layout">
        <div className="section-heading section-heading--sticky">
          <span className="eyebrow">Fragen zum Ablauf</span>
          <h2>So fügt sich 0Admin in Ihren Betrieb ein.</h2>
          <p>Antworten zu bestehender Rechnungssoftware, Datenübernahme, Freigaben und menschlicher Kontrolle.</p>
        </div>
        <div className="faq__items">
          {faqItems.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
