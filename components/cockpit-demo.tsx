"use client";

import { useState } from "react";

const steps = [
  {
    small: "erledigt",
    label: "Leistung",
    recommendation: "Leistung ist erfasst",
    text: "Die erledigte Arbeit ist dem Zahlungsfall zugeordnet. 0Admin hält fest, woraus die Rechnung entstanden ist.",
    status: "Leistung erfasst",
    action: "Bereit",
  },
  {
    small: "gestellt",
    label: "Rechnung",
    recommendation: "Rechnung ist gestellt",
    text: "Die Rechnung ist sichtbar im Fall. Der offene Betrag bleibt verbunden mit Kunde, Frist und nächster Aktion.",
    status: "Rechnung gestellt",
    action: "Überwachen",
  },
  {
    small: "jetzt",
    label: "Erinnerung",
    recommendation: "Freigabe nötig",
    text: "0Admin bereitet die Zahlungserinnerung vor. Der Mensch prüft Ton und Kontext und gibt die Nachricht frei.",
    status: "Freigabe nötig",
    action: "Freigabe",
  },
  {
    small: "offen",
    label: "Zahlung",
    recommendation: "Zahlung noch offen",
    text: "Der Fall bleibt offen, bis Zahlung oder Klärgrund erfasst ist. So verschwindet kein Betrag im Büroalltag.",
    status: "Zahlung offen",
    action: "Klären",
  },
] as const;

export function CockpitDemo() {
  const [stepIndex, setStepIndex] = useState(2);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [approved, setApproved] = useState(false);
  const [selectedList, setSelectedList] = useState("paid");
  const step = steps[stepIndex];

  function approve() {
    setApproved(true);
    window.setTimeout(() => setApproved(false), 2400);
  }

  return (
    <section className="cockpit-frame" aria-label="0Admin Beispiel-Cockpit">
      <aside className="cockpit-sidebar" aria-label="Cockpit Navigation">
        <div className="cockpit-logo"><span>0</span><strong>0Admin</strong></div>
        <nav>
          <a className="is-active" href="#geldfluss">Geldfluss</a>
          <a href="#faelle">Fälle</a>
          <a href="#rechnungen">Rechnungen</a>
          <a href="#ausnahmen">Ausnahmen</a>
        </nav>
      </aside>

      <section className="cockpit-main">
        <div className="cockpit-header">
          <div><span>Aktiver Zahlungsfall</span><h2>Rechnung 4821 · Müller SHK GmbH</h2></div>
          <strong className="status-pill warn">{approved ? "Erinnerung vorbereitet" : step.status}</strong>
        </div>

        <div className="cockpit-metrics">
          <article><span>Offene Posten</span><strong>7.420 €</strong><small>2 Tage überfällig</small></article>
          <article><span>Heute geklärt</span><strong>3 Fälle</strong><small>bezahlt oder geklärt</small></article>
          <article><span>Nächste Aktion</span><strong>{approved ? "Senden" : step.action}</strong><small>Erinnerung vorbereitet</small></article>
        </div>

        <article className={`case-panel ${approved ? "is-approved" : ""}`}>
          <div className="case-top">
            <div><span>Zahlungsfall</span><h3>Leistung → Rechnung → Erinnerung → Zahlung</h3></div>
            <strong>{stepIndex === 3 ? "Zahlung ausstehend" : "2 Tage überfällig"}</strong>
          </div>
          <div className="case-steps" aria-label="Fallfortschritt">
            {steps.map((item, index) => (
              <button
                className={`${index < 2 ? "done" : ""} ${index === stepIndex ? "active" : ""}`}
                key={item.label}
                type="button"
                onClick={() => setStepIndex(index)}
              >
                <small>{item.small}</small>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          <div className="recommendation">
            <div className="recommendation-copy">
              <span>{approved ? "Zur Freigabe vorbereitet" : step.recommendation}</span>
              <p>{approved ? "Die Erinnerung ist vorbereitet. Im echten Betrieb bleibt die Entscheidung bei Ihnen, bevor etwas versendet wird." : step.text}</p>
            </div>
            <div className="recommendation-actions">
              <button className="secondary-action" type="button" onClick={() => setPreviewOpen((open) => !open)}>
                {previewOpen ? "Vorschau schließen" : "Vorschau"}
              </button>
              <button type="button" onClick={approve}>{approved ? "Vorbereitet" : "Freigeben"}</button>
            </div>
            {previewOpen ? (
              <div className="message-preview">
                <strong>Vorschau Zahlungserinnerung</strong>
                <p>Hallo Müller SHK GmbH, zur Rechnung 4821 ist noch ein Betrag offen. Bitte prüfen Sie die Zahlung oder geben Sie uns kurz Rückmeldung, falls es Klärungsbedarf gibt.</p>
              </div>
            ) : null}
          </div>
        </article>

        <div className="case-columns">
          {[
            ["paid", "Bezahlt", "1.280 €", "2 Vorgänge geschlossen"],
            ["reminder", "Erinnerung", "2.730 €", "3 Vorgänge nachfassen"],
            ["escalation", "Klärfall", "1.620 €", "2 Vorgänge prüfen"],
          ].map(([key, label, amount, text]) => (
            <button
              className={`case-list ${key} ${selectedList === key ? "is-selected" : ""}`}
              key={key}
              type="button"
              onClick={() => setSelectedList(key)}
            >
              <span>{label}</span>
              <strong>{amount}</strong>
              <p>{text}</p>
            </button>
          ))}
        </div>
      </section>
    </section>
  );
}
