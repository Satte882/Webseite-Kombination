const benefits = [
  { number: "01", title: "Fälligkeiten im Blick", text: "Offene, bald fällige und überfällige Vorgänge werden unterscheidbar statt in Listen versteckt." },
  { number: "02", title: "Nächster Schritt vorbereitet", text: "Aus Rechnungsdaten entsteht ein prüfbarer Entwurf, ohne dass Verantwortung an eine Blackbox abgegeben wird." },
  { number: "03", title: "Kontrolle bleibt sichtbar", text: "Freigaben, Änderungen und Versandstatus sind als nachvollziehbare Ereignisse dokumentiert." },
] as const;

export function BenefitsSection() {
  return (
    <section className="section benefits" id="vorteile">
      <div className="shell">
        <div className="section-heading">
          <span className="eyebrow">Was bleibt am Ende?</span>
          <h2>Weniger Nachhalten. Mehr Klarheit über den Geldfluss.</h2>
        </div>
        <div className="benefit-grid">
          {benefits.map((benefit) => (
            <article key={benefit.number}>
              <span>{benefit.number}</span><h3>{benefit.title}</h3><p>{benefit.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
