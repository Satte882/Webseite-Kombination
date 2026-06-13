import { flyingFields } from "@/components/flow/flying-fields";
import { extractionFields } from "@/data/demo";

export function FlowDatabase() {
  return (
    <div className="extraction-panel extraction-panel--database" aria-label="Strukturierte Rechnungsdaten">
      <div className="extraction-panel__header">
        <div><span className="eyebrow">Strukturierter Vorgang</span><strong>RE-2026-0042</strong></div>
        <span className="status-chip status-chip--success" data-database-counter>0 automatisch erkannt</span>
      </div>
      <div className="database-rail" aria-hidden="true"><span /><span /><span /></div>
      <div className="extraction-grid">
        {extractionFields.map((field, index) => {
          const key = flyingFields[index]?.key ?? "manualReview";
          const warning = field.confidence === "Unsicher";
          return (
            <div className={`extraction-field ${warning ? "extraction-field--warning" : ""}`} key={field.label} data-db-field={key}>
              <span>{field.label}</span>
              <strong data-db-value>{field.value}</strong>
              <small data-db-state>{warning ? "Prüfung erforderlich" : "Bereit für Erkennung"}</small>
            </div>
          );
        })}
      </div>
    </div>
  );
}
