import { formatCurrency } from "@/lib/format";
import { invoiceDemo } from "@/data/demo";

export function ReminderDocument() {
  return (
    <article className="reminder-document" aria-label="Vorbereitete Zahlungserinnerung">
      <div className="reminder-document__top">
        <span className="eyebrow">Zahlungserinnerung</span>
        <span className="status-chip status-chip--warning">Entwurf · wartet auf Freigabe</span>
      </div>
      <h3>Freundliche Erinnerung zu {invoiceDemo.invoiceNumber}</h3>
      <p>Guten Tag, bei unserer Prüfung ist uns aufgefallen, dass die folgende Rechnung noch offen ist.</p>
      <dl>
        <div><dt>Offener Betrag</dt><dd>{formatCurrency(invoiceDemo.gross)}</dd></div>
        <div><dt>Ursprünglich fällig</dt><dd>{invoiceDemo.dueDate}</dd></div>
        <div><dt>Mahnstufe</dt><dd>Freundliche Erinnerung</dd></div>
      </dl>
      <p>Bitte prüfen Sie den Vorgang. Falls die Zahlung bereits erfolgt ist, betrachten Sie diese Nachricht als gegenstandslos.</p>
    </article>
  );
}
