const statusRows = [
  ["Offen", "18", "24.860 €"],
  ["Bald fällig", "7", "9.420 €"],
  ["Überfällig", "4", "6.180 €"],
  ["Prüfung nötig", "2", "3.970 €"],
] as const;

export function FinanceDashboard() {
  return (
    <section className="dashboard" aria-label="Exemplarische Finanzübersicht">
      <div className="dashboard__topbar">
        <div><span className="eyebrow">Exemplarische Übersicht</span><h3>Geldfluss</h3></div>
        <span className="status-chip status-chip--neutral">Stand 18.06.2026</span>
      </div>
      <div className="dashboard__metrics">
        <article><span>Offene Forderungen</span><strong>40.460 €</strong><small>29 Vorgänge</small></article>
        <article className="metric-attention"><span>Überfällig</span><strong>6.180 €</strong><small>4 Vorgänge</small></article>
        <article><span>Zahlungseingänge</span><strong>28.940 €</strong><small>letzte 30 Tage</small></article>
        <article><span>Ausgehende Zahlungen</span><strong>17.520 €</strong><small>letzte 30 Tage</small></article>
      </div>
      <div className="dashboard__body">
        <div className="cashflow-card">
          <div className="cashflow-card__header"><strong>Erwarteter Cashflow</strong><span>nächste 30 Tage</span></div>
          <div className="cashflow-chart" aria-label="Vereinfachter Verlauf des erwarteten Cashflows">
            {[44, 58, 52, 71, 64, 82, 76, 92].map((height, index) => <span key={index} style={{ height: `${height}%` }} />)}
          </div>
          <div className="cashflow-card__axis"><span>Heute</span><span>+30 Tage</span></div>
        </div>
        <div className="status-table" role="table" aria-label="Rechnungen nach Status">
          <div className="status-table__head" role="row"><span>Status</span><span>Anzahl</span><span>Betrag</span></div>
          {statusRows.map(([status, count, value]) => (
            <div className="status-table__row" role="row" key={status}>
              <span role="cell"><i className={`status-dot status-dot--${status.toLowerCase().replace(" ", "-").replace("ä", "a").replace("ü", "u").replace("ö", "o")}`} />{status}</span>
              <span role="cell">{count}</span><strong role="cell">{value}</strong>
            </div>
          ))}
        </div>
      </div>
      <div className="dashboard__activity">
        <strong>Letzte Aktivität</strong>
        <span>RE-2026-0042 · Zahlungserinnerung freigegeben und dokumentiert</span>
        <span className="status-chip status-chip--success">Erledigt</span>
      </div>
    </section>
  );
}
