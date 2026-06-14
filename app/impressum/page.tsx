import type { Metadata } from "next";
import { LegalPage } from "@/components/subpage-layout";

export const metadata: Metadata = {
  title: "Impressum - DPPFOR",
  description: "Impressum der DPPFOR Landingpage.",
};

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <section className="legal-card">
        <h2>Verantwortlich gemäß § 5 TMG</h2>
        <address>
          <strong>Satinder Sandhoo</strong>
          <span>c/o DPPFOR</span>
          <span>Knorrstraße 83</span>
          <span>80807 München</span>
          <span>Deutschland</span>
        </address>
      </section>
      <section className="legal-card">
        <h2>Kontakt</h2>
        <dl className="legal-list">
          <div>
            <dt>Kontaktformular</dt>
            <dd>Bitte nutzen Sie unser Kontaktformular auf der Startseite.</dd>
          </div>
          <div>
            <dt>Telefon</dt>
            <dd>+49 89 0800 4 19 49</dd>
          </div>
        </dl>
      </section>
      <section className="legal-card">
        <h2>Domains</h2>
        <ul className="legal-tags">
          <li>dppfor.eu</li>
          <li>0admin.dppfor.eu</li>
        </ul>
      </section>
      <section className="legal-card">
        <h2>Hosting</h2>
        <dl className="legal-list">
          <div>
            <dt>Domain</dt>
            <dd>Strato GmbH</dd>
          </div>
          <div>
            <dt>Website-Hosting</dt>
            <dd>Hetzner Cloud</dd>
          </div>
        </dl>
      </section>
      <section className="legal-card">
        <h2>Haftungsausschluss</h2>
        <p>Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir keine Gewähr übernehmen.</p>
      </section>
    </LegalPage>
  );
}
