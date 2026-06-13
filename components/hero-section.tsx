import { InvoiceDocument } from "@/components/invoice-document";

export function HeroSection() {
  return (
    <section className="hero" id="top">
      <div className="hero__grid shell">
        <div className="hero__copy">
          <span className="eyebrow">0Admin von DPPFOR</span>
          <h1>Ihre Rechnung ist fertig. Jetzt beginnt die Arbeit, die niemand sieht.</h1>
          <p>0Admin begleitet Rechnungen vom Versand bis zum Zahlungseingang – mit Automatisierung und menschlicher Kontrolle.</p>
          <div className="hero__actions">
            <a className="button" href="#so-funktionierts">Ablauf ansehen</a>
            <a className="button button--secondary" href="#demo">Demo ansehen</a>
          </div>
          <div className="hero__proof">
            <span>Exemplarischer Produktablauf</span>
            <span>Keine echten Kundendaten</span>
            <span>Keine Datenübertragung</span>
          </div>
        </div>
        <div className="hero__visual" aria-label="Beispielrechnung als zentrales Gestaltungselement">
          <div className="hero__halo" aria-hidden="true" />
          <InvoiceDocument className="hero__invoice" />
          <div className="hero__signal hero__signal--top"><span>01</span>Rechnung erstellt</div>
          <div className="hero__signal hero__signal--bottom"><span>→</span>Nächster Schritt sichtbar</div>
        </div>
      </div>
      <a className="scroll-cue" href="#so-funktionierts"><span>Scrollen</span><i aria-hidden="true" /></a>
    </section>
  );
}
