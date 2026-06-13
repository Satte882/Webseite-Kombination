export function SiteOneHeader() {
  return (
    <header className="s1-header" aria-label="Hauptnavigation">
      <div className="s1-header__inner">
        <a className="s1-brand" href="#top" aria-label="DPPFOR Startseite">
          <img src="/images/logo.png" alt="" aria-hidden="true" />
          <span>
            <strong>DPPFOR</strong>
            <small>0Admin · Self-Operating Geldfluss-Office</small>
          </span>
        </a>
        <nav className="s1-nav" aria-label="Seitennavigation">
          <a href="#rupture">Wo Geld liegen bleibt</a>
          <a href="#so-funktionierts">So arbeitet 0Admin</a>
          <a href="/rechner/">Geldfluss prüfen</a>
          <a href="/cockpit/">Cockpit</a>
          <a href="/blog/">Blog</a>
          <a className="s1-nav__contact" href="#kontakt">Gespräch anfragen</a>
        </nav>
      </div>
    </header>
  );
}

export function SiteOneHeroProblem() {
  return (
    <>
      <section id="top" className="s1-hero" aria-labelledby="hero-title">
        <div className="s1-hero__grid" aria-hidden="true" />
        <div className="s1-hero__glow s1-hero__glow--a" aria-hidden="true" />
        <div className="s1-hero__glow s1-hero__glow--b" aria-hidden="true" />
        <p className="s1-kicker">Die Arbeit ist nicht das Problem</p>
        <h1 id="hero-title">
          <span>Ihr Betrieb arbeitet.</span>
          <span>Aber wird auch</span>
          <span>alles bezahlt?</span>
        </h1>
        <div className="s1-hero__bottom">
          <p>0Admin zeigt, wo aus Leistung noch kein Geld geworden ist: bezahlt, offen, fällig oder zu klären.</p>
          <div className="s1-actions">
            <a className="s1-button s1-button--warm" href="/rechner/">Geldfluss prüfen</a>
            <a className="s1-button s1-button--ghost" href="#so-funktionierts">Ablauf ansehen</a>
          </div>
        </div>
        <a className="s1-scroll-cue" href="#rupture"><span /><small>scroll</small></a>
      </section>

      <section id="rupture" className="s1-problem" aria-labelledby="rupture-title">
        <div className="s1-problem__copy">
          <p className="s1-kicker">Der eigentliche Verlust</p>
          <h2 id="rupture-title">Die Arbeit ist erledigt. Das Geld ist noch nicht da.</h2>
          <p>Zwischen Baustelle, Rechnung, Fälligkeit und Zahlung entstehen kleine Unterbrechungen. Zusammen binden sie Liquidität und Aufmerksamkeit.</p>
        </div>
        <div className="s1-problem__wall" aria-label="Reibungspunkte">
          <article><span>01</span><strong>Angebot liegt offen</strong><p>Der Preis ist draußen. Der nächste Schritt wird nicht konsequent nachgefasst.</p></article>
          <article><span>02</span><strong>Rechnung geht spät raus</strong><p>Die Leistung ist erbracht. Die Abrechnung wartet auf Bürozeit.</p></article>
          <article><span>03</span><strong>Nachfassen bleibt am Chef</strong><p>Die Fälligkeit ist klar. Trotzdem hängt der nächste Schritt an Zeit und Erinnerung.</p></article>
          <article><span>04</span><strong>Offene Posten bleiben unklar</strong><p>Bezahlt, offen oder zu klären: Der Status fehlt genau dann, wenn er gebraucht wird.</p></article>
        </div>
      </section>
    </>
  );
}

export function SiteOneTools() {
  return (
    <section className="s1-tools" aria-labelledby="tools-title">
      <div className="s1-tools__inner">
        <p className="s1-kicker">Vom Ablauf zum eigenen Betrieb</p>
        <h2 id="tools-title">Sehen Sie, wo Geld hängt und wie 0Admin Fälle sichtbar hält.</h2>
        <div className="s1-tools__grid">
          <a href="/rechner/">
            <span>Selbstdiagnose</span>
            <strong>Geldfluss-Check</strong>
            <p>Schätzen Sie, wie viel Kapital in offenen Rechnungen gebunden ist und wie viel Zeit das Nachfassen kostet.</p>
            <em>Jetzt prüfen →</em>
          </a>
          <a href="/cockpit/">
            <span>Produktansicht</span>
            <strong>Beispiel-Cockpit</strong>
            <p>Sehen Sie, wie ein Zahlungsfall von der Rechnung bis „bezahlt oder geklärt“ geführt wird.</p>
            <em>Fall ansehen →</em>
          </a>
        </div>
      </div>
    </section>
  );
}

export function SiteOneClosingFooter() {
  return (
    <>
      <section id="kontakt" className="s1-contact" aria-labelledby="contact-title">
        <div>
          <p className="s1-kicker">Nächster Schritt</p>
          <h2 id="contact-title">Wo hängt Ihr Geld gerade?</h2>
          <p>Prüfen Sie, welche offenen Posten Ihren Betrieb heute bremsen und welche Fälle zuerst geklärt werden müssen.</p>
        </div>
        <form action="https://formspree.io/f/xwprlgpo" method="POST">
          <label>Name<input type="text" name="name" autoComplete="name" required /></label>
          <label>E-Mail<input type="email" name="email" autoComplete="email" required /></label>
          <label>Nachricht<textarea name="message" rows={5} defaultValue="Ich möchte ein Gespräch zu 0Admin anfragen." required /></label>
          <input type="hidden" name="_subject" value="Gesprächsanfrage zu 0Admin" />
          <button type="submit">Gespräch anfragen</button>
        </form>
      </section>
      <footer className="s1-footer">
        <div className="s1-footer__brand">
          <img src="/images/logo.png" alt="" aria-hidden="true" />
          <div><strong>DPPFOR</strong><p>Data, Process, Payments for Operations &amp; Revenue</p></div>
        </div>
        <nav aria-label="Footer-Navigation">
          <a href="/rechner/">Rechner</a>
          <a href="/cockpit/">Cockpit</a>
          <a href="/blog/">Blog</a>
          <a href="https://dppfor.eu" aria-label="DPPFOR Startseite">DPPFOR</a>
        </nav>
      </footer>
    </>
  );
}
