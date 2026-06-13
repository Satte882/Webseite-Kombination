import { invoiceDemo } from "@/data/demo";
import { formatCurrency } from "@/lib/format";

type InvoiceDocumentProps = {
  compact?: boolean;
  status?: "Offen" | "Bald fällig" | "Heute fällig" | "Überfällig";
  className?: string;
};

export function InvoiceDocument({ compact = false, status = "Offen", className = "" }: InvoiceDocumentProps) {
  const statusClass = status.toLowerCase().replace(" ", "-").replace("ä", "a").replace("ü", "u").replace("ö", "o");

  return (
    <article className={`invoice-document ${compact ? "invoice-document--compact" : ""} ${className}`} aria-label={`Beispielrechnung, Status ${status}`}>
      <div className="invoice-document__topline">
        <span className="demo-label">Demo mit Beispieldaten</span>
        <span className={`status-chip status-chip--${statusClass}`}>{status}</span>
      </div>
      <div className="invoice-document__header">
        <div>
          <span className="invoice-document__kicker">RECHNUNG</span>
          <h3>{invoiceDemo.invoiceNumber}</h3>
        </div>
        <div className="invoice-document__brand">M|E</div>
      </div>
      <div className="invoice-document__addresses">
        <address>{invoiceDemo.sender.map((line) => <span key={line}>{line}</span>)}</address>
        <address>{invoiceDemo.recipient.map((line) => <span key={line}>{line}</span>)}</address>
      </div>
      <dl className="invoice-document__meta">
        <div><dt>Rechnungsdatum</dt><dd>{invoiceDemo.invoiceDate}</dd></div>
        <div className="invoice-due-field"><dt>Fällig am</dt><dd>{invoiceDemo.dueDate}</dd></div>
      </dl>
      <div className="invoice-document__table" role="table" aria-label="Rechnungspositionen">
        <div className="invoice-row invoice-row--head" role="row">
          <span role="columnheader">Leistung</span><span role="columnheader">Menge</span><span role="columnheader">Betrag</span>
        </div>
        {invoiceDemo.lines.map((line) => (
          <div className="invoice-row" role="row" key={line.description}>
            <span role="cell">{line.description}</span><span role="cell">{line.quantity}</span><span role="cell">{formatCurrency(line.amount)}</span>
          </div>
        ))}
      </div>
      <dl className="invoice-document__totals">
        <div><dt>Netto</dt><dd>{formatCurrency(invoiceDemo.net)}</dd></div>
        <div><dt>Umsatzsteuer</dt><dd>{formatCurrency(invoiceDemo.vat)}</dd></div>
        <div className="invoice-document__grand-total"><dt>Gesamt</dt><dd>{formatCurrency(invoiceDemo.gross)}</dd></div>
      </dl>
    </article>
  );
}
