export function SystemInbox() {
  return (
    <div className="system-inbox" aria-label="0Admin Eingangskanal">
      <div className="system-inbox__header"><strong>0Admin Eingang</strong><span className="status-chip status-chip--processing">Wird verarbeitet</span></div>
      <div className="system-inbox__dropzone">
        <span className="system-inbox__icon" aria-hidden="true">↓</span>
        <strong>Rechnung erkannt</strong>
        <span>PDF · 128 KB · Eingang 09:02</span>
      </div>
      <div className="system-inbox__progress"><span /></div>
      <p>Dokumenttyp und Kerndaten werden dem Vorgang zugeordnet.</p>
    </div>
  );
}
