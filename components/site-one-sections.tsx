import Link from "next/link";
import Image from "next/image";
import { SiteOneToolsAnimation } from "@/components/site-one-tools-animation";

const navLinks = [
  { href: "/#rupture", label: "Wo Geld liegen bleibt" },
  { href: "/#so-funktionierts", label: "So arbeitet 0Admin" },
  { href: "/rechner/", label: "Geldfluss prüfen" },
  { href: "/cockpit/", label: "Cockpit" },
  { href: "/blog/", label: "Blog" },
] as const;

export function SiteOneHeader() {
  return (
    <header className="s1-header" aria-label="Hauptnavigation">
      <div className="s1-header__inner">
        <Link className="s1-brand" href="/#top" aria-label="DPPFOR Startseite">
          <Image src="/images/logo.png" width={42} height={42} alt="" aria-hidden="true" priority />
          <span>
            <strong>DPPFOR</strong>
            <small>0Admin · Ihr Geldfluss von der Rechnung bis zur Zahlung.</small>
          </span>
        </Link>
        <nav className="s1-nav" aria-label="Seitennavigation">
          {navLinks.map((item) => (
            <Link href={item.href} key={item.href}>{item.label}</Link>
          ))}
          <Link className="s1-nav__contact" href="/#kontakt">Gespräch anfragen</Link>
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
          <p>
            0Admin zeigt, wo aus Leistung noch kein Geld geworden ist:
            <br />
            Bezahlt, offen, fällig oder zu klären.
          </p>
          <div className="s1-actions">
            <Link className="s1-button s1-button--warm" href="/rechner/">Geldfluss prüfen</Link>
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
    <SiteOneToolsAnimation>
      <div className="s1-tools__inner">
        <p className="s1-kicker" data-tools-kicker>Vom Ablauf zum eigenen Betrieb</p>
        <h2 id="tools-title" data-tools-title>
          <span className="s1-tools__title-line">Sehen Sie, wo Geld hängt</span>
          <span className="s1-tools__title-line">und wie 0Admin Fälle sichtbar hält.</span>
        </h2>
        <div className="s1-tools__grid">
          <Link href="/rechner/" data-tools-card>
            <span>Selbstdiagnose</span>
            <strong>Geldfluss-Check</strong>
            <p>Schätzen Sie, wie viel Kapital in offenen Rechnungen gebunden ist und wie viel Zeit das Nachfassen kostet.</p>
            <em>Jetzt prüfen →</em>
          </Link>
          <Link href="/cockpit/" data-tools-card>
            <span>Produktansicht</span>
            <strong>0Admin Beispiel-Cockpit</strong>
            <p>Sehen Sie, wie ein Zahlungsfall von der Rechnung bis „bezahlt oder geklärt“ geführt wird.</p>
            <em>Fall ansehen →</em>
          </Link>
        </div>
      </div>
    </SiteOneToolsAnimation>
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
          <Image src="/images/logo.png" width={44} height={44} alt="" aria-hidden="true" />
          <div><strong>DPPFOR</strong><p>Data, Process, Payments for Operations &amp; Revenue</p></div>
        </div>
        <nav aria-label="Footer-Navigation">
          <Link href="/rechner/">Rechner</Link>
          <Link href="/cockpit/">Cockpit</Link>
          <Link href="/blog/">Blog</Link>
          <Link href="/impressum/">Impressum</Link>
          <Link href="/datenschutz/">Datenschutz</Link>
          <a
            href="https://github.com/DPPFOR/0Admin-public"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Repository DPPFOR/0Admin-public"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58l-.01-2.04c-3.34.73-4.05-1.61-4.05-1.61a3.18 3.18 0 0 0-1.34-1.76c-1.09-.75.08-.74.08-.74a2.53 2.53 0 0 1 1.84 1.24 2.56 2.56 0 0 0 3.49 1 2.57 2.57 0 0 1 .76-1.61c-2.67-.31-5.47-1.33-5.47-5.93a4.65 4.65 0 0 1 1.24-3.23 4.32 4.32 0 0 1 .12-3.18s1.01-.32 3.3 1.23a11.42 11.42 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23a4.32 4.32 0 0 1 .12 3.18 4.64 4.64 0 0 1 1.24 3.23c0 4.61-2.8 5.61-5.48 5.92a2.88 2.88 0 0 1 .82 2.24l-.01 3.32c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
            </svg>
          </a>
        </nav>
      </footer>
    </>
  );
}
