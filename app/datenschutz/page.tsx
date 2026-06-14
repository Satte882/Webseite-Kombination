import type { Metadata } from "next";
import { LegalPage } from "@/components/subpage-layout";

export const metadata: Metadata = {
  title: "Datenschutz - DPPFOR",
  description: "Datenschutzhinweise der DPPFOR Landingpage.",
};

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutz">
      <section className="legal-card">
        <h2>Datenschutzhinweise</h2>
        <p>Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten erhoben werden, erfolgt dies stets auf freiwilliger Basis.</p>
      </section>
      <section className="legal-card">
        <h2>Kontaktformular</h2>
        <dl className="legal-list">
          <div>
            <dt>Zweck</dt>
            <dd>Wenn Sie das Kontaktformular nutzen, werden die von Ihnen eingegebenen Daten zur Bearbeitung Ihrer Anfrage übermittelt.</dd>
          </div>
          <div>
            <dt>Dienstleister</dt>
            <dd>Die Übermittlung erfolgt über den Formular-Dienst Formspree.</dd>
          </div>
        </dl>
      </section>
      <section className="legal-card">
        <h2>Hosting</h2>
        <dl className="legal-list">
          <div>
            <dt>Domain</dt>
            <dd>Die Domain wird über Strato GmbH verwaltet.</dd>
          </div>
          <div>
            <dt>Website-Hosting</dt>
            <dd>Das Website-Hosting erfolgt über Hetzner Cloud.</dd>
          </div>
        </dl>
      </section>
      <section className="legal-card">
        <h2>Verantwortlicher</h2>
        <address>
          <strong>Satinder Sandhoo</strong>
          <span>c/o DPPFOR</span>
          <span>Knorrstraße 83</span>
          <span>80807 München</span>
          <span>Deutschland</span>
        </address>
      </section>
    </LegalPage>
  );
}
