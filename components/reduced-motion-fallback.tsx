import { DueDateTimeline } from "@/components/due-date-timeline";
import { EmailEnvelope } from "@/components/email-envelope";
import { ExtractionScene } from "@/components/extraction-scene";
import { InvoiceDocument } from "@/components/invoice-document";
import { ReminderDocument } from "@/components/reminder-document";
import { SystemInbox } from "@/components/system-inbox";

const steps = [
  { number: "01", title: "Wie gewohnt versenden", text: "Die Rechnung wird als Anhang an den Geschäftskunden verschickt.", visual: <EmailEnvelope /> },
  { number: "02", title: "Automatisch zuordnen", text: "0Admin erkennt den Dokumenttyp und legt einen Vorgang an.", visual: <SystemInbox /> },
  { number: "03", title: "Daten strukturiert bereitstellen", text: "Relevante Felder werden extrahiert; Unsicherheiten bleiben sichtbar.", visual: <ExtractionScene /> },
  { number: "04", title: "Fälligkeit überwachen", text: "Der Status verändert sich nachvollziehbar von offen bis überfällig.", visual: <DueDateTimeline /> },
  { number: "05", title: "Nächsten Schritt vorbereiten", text: "Eine sachliche Zahlungserinnerung entsteht als prüfbarer Entwurf.", visual: <ReminderDocument /> },
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
