import { extractionFields } from "@/data/demo";

export function ExtractionScene() {
  return (
    <div className="extraction-panel" aria-label="Strukturierte Rechnungsdaten">
      <div className="extraction-panel__header">
        <div><span className="eyebrow">Strukturierter Vorgang</span><strong>RE-2026-0042</strong></div>
        <span className="status-chip status-chip--success">8 von 9 sicher</span>
      </div>
      <div className="extraction-grid">
        {extractionFields.map((field) => (
          <div className={`extraction-field ${field.confidence === "Unsicher" ? "extraction-field--warning" : ""}`} key={field.label}>
            <span>{field.label}</span>
            <strong>{field.value}</strong>
            <small>{field.confidence === "Unsicher" ? "Prüfung erforderlich" : "Erkannt"}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
