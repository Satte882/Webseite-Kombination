import { DueDateTimeline } from "@/components/due-date-timeline";
import { EmailEnvelope } from "@/components/email-envelope";
import { ExtractionScene } from "@/components/extraction-scene";
import { InvoiceDocument } from "@/components/invoice-document";
import { ReminderDocument } from "@/components/reminder-document";
import { SystemInbox } from "@/components/system-inbox";

const steps = [
  { number: "01", title: "Aus Ihrem bestehenden System", text: "Sie erstellen die Rechnung weiterhin wie gewohnt. 0Admin behält anschließend den weiteren Geldfluss im Blick.", visual: <InvoiceDocument compact /> },
  { number: "02", title: "Übergabe an 0Admin", text: "Beim Versand oder über einen festgelegten Eingang wird das Dokument an 0Admin übergeben.", visual: <EmailEnvelope /> },
  { number: "03", title: "Eingang und Zuordnung", text: "0Admin erkennt die Rechnung und verbindet sie mit dem richtigen Kunden und Rechnungsfall.", visual: <SystemInbox /> },
  { number: "04", title: "Erfassung der Rechnungsdaten", text: "Rechnungsnummer, Kunde, Betrag und Zahlungsfrist werden erfasst. Unsichere Angaben werden sichtbar markiert.", visual: <ExtractionScene /> },
  { number: "05", title: "Überwachung der Fälligkeit", text: "Der Status bleibt nachvollziehbar: offen, bald fällig, überfällig oder zu klären.", visual: <DueDateTimeline /> },
  { number: "06", title: "Vorbereitung des nächsten Schritts", text: "Ist eine Rechnung überfällig, wird eine Zahlungserinnerung vorbereitet. Sie prüfen, bearbeiten und geben frei.", visual: <ReminderDocument /> },
] as const;

export function ReducedMotionFallback() {
  return (
    <section className="fallback-story" aria-label="Statische Darstellung des Rechnungsprozesses">
      <div className="shell">
        <div className="section-heading">
          <span className="eyebrow">Der Rechnungsprozess</span>
          <h2>Ein Dokument. Ein nachvollziehbarer Vorgang.</h2>
        </div>
        <div className="fallback-story__invoice"><InvoiceDocument compact /></div>
        <div className="fallback-story__steps">
          {steps.map((step) => (
            <article key={step.number}>
              <div className="fallback-story__copy"><span>{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></div>
              <div className="fallback-story__visual">{step.visual}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
