export function EmailEnvelope({ reminder = false }: { reminder?: boolean }) {
  return (
    <div className={`email-envelope ${reminder ? "email-envelope--reminder" : ""}`} aria-label={reminder ? "Simulierter Versand der Zahlungserinnerung" : "Simulierter Rechnungsversand per E-Mail"}>
      <div className="email-envelope__bar">
        <span className="window-dot" /><span className="window-dot" /><span className="window-dot" />
      </div>
      <dl>
        <div><dt>An</dt><dd>Geschäftskunde</dd></div>
        <div><dt>Betreff</dt><dd>{reminder ? "Freundliche Zahlungserinnerung zu RE-2026-0042" : "Rechnung RE-2026-0042"}</dd></div>
      </dl>
      <p>{reminder ? "Guten Tag, wir möchten freundlich an die noch offene Rechnung erinnern." : "Guten Tag, anbei erhalten Sie unsere Rechnung für die ausgeführten Leistungen."}</p>
      <div className="email-envelope__attachment" data-email-attachment>
        <span aria-hidden="true">↳</span>
        <span className="email-envelope__pdf" data-email-pdf-preview aria-hidden="true">PDF</span>
        <span>{reminder ? "Zahlungserinnerung.pdf" : "Rechnung_RE-2026-0042.pdf"}</span>
      </div>
      <span className="email-envelope__sent">{reminder ? "Versendet · 18.06.2026 · 09:14" : "Versand vorbereitet"}</span>
    </div>
  );
}
