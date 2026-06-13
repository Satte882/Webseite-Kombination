import { invoiceDemo } from "@/data/demo";
import { formatCurrency } from "@/lib/format";

export function FlowInvoiceDocument() {
  return (
    <article className="invoice-document invoice-document--flow" aria-label="Beispielrechnung, Status Offen" data-flow-document="invoice">
      <div className="invoice-document__topline">
        <span className="demo-label" data-invoice-enter="label">Demo mit Beispieldaten</span>
        <span className="status-chip status-chip--offen" data-invoice-enter="status" data-invoice-field="status" data-invoice-status>Offen</span>
      </div>
      <div className="invoice-document__header">
        <div>
          <span className="invoice-document__kicker" data-invoice-enter="kicker">RECHNUNG</span>
          <h3 data-invoice-enter="invoice-number" data-invoice-field="invoiceNumber">{invoiceDemo.invoiceNumber}</h3>
        </div>
        <div className="invoice-document__brand" data-invoice-enter="brand">M|E</div>
      </div>
      <div className="invoice-document__addresses">
        <address data-invoice-enter="sender">{invoiceDemo.sender.map((line) => <span key={line}>{line}</span>)}</address>
        <address data-invoice-enter="recipient">{invoiceDemo.recipient.map((line, index) => <span key={line} data-invoice-field={index === 0 ? "debtor" : undefined}>{line}</span>)}</address>
      </div>
      <dl className="invoice-document__meta">
        <div data-invoice-enter="invoice-date"><dt>Rechnungsdatum</dt><dd data-invoice-field="invoiceDate">{invoiceDemo.invoiceDate}</dd></div>
        <div className="invoice-due-field" data-invoice-enter="due-date" data-invoice-due><dt>Fällig am</dt><dd data-invoice-field="dueDate">{invoiceDemo.dueDate}</dd></div>
      </dl>
      <div className="invoice-document__table" role="table" aria-label="Rechnungspositionen" data-invoice-enter="table">
        <div className="invoice-row invoice-row--head" role="row"><span role="columnheader">Leistung</span><span role="columnheader">Menge</span><span role="columnheader">Betrag</span></div>
        {invoiceDemo.lines.map((line, index) => <div className="invoice-row" role="row" key={line.description} data-invoice-enter="line" data-line-index={index}><span role="cell">{line.description}</span><span role="cell">{line.quantity}</span><span role="cell">{formatCurrency(line.amount)}</span></div>)}
      </div>
      <dl className="invoice-document__totals">
        <div data-invoice-enter="net"><dt>Netto</dt><dd data-invoice-field="net">{formatCurrency(invoiceDemo.net)}</dd></div>
        <div data-invoice-enter="vat"><dt>Umsatzsteuer</dt><dd data-invoice-field="vat">{formatCurrency(invoiceDemo.vat)}</dd></div>
        <div className="invoice-document__grand-total" data-invoice-enter="gross"><dt>Gesamt</dt><dd data-invoice-field="gross">{formatCurrency(invoiceDemo.gross)}</dd></div>
      </dl>
    </article>
  );
}
