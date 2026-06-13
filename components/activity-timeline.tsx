type Activity = {
  title: string;
  detail: string;
  state: "done" | "current" | "pending";
};

export function ActivityTimeline({ sent = false, edited = false }: { sent?: boolean; edited?: boolean }) {
  const activities: Activity[] = [
    { title: "Rechnung erkannt", detail: "18.06.2026 · 09:02", state: "done" },
    { title: "Zahlungserinnerung erstellt", detail: "18.06.2026 · 09:08", state: "done" },
    ...(edited ? [{ title: "Entwurf zur Bearbeitung geöffnet", detail: "Lokal in dieser Demo", state: "done" as const }] : []),
    {
      title: sent ? "Von Nutzer freigegeben" : "Freigabe ausstehend",
      detail: sent ? "18.06.2026 · 09:13" : "Menschliche Entscheidung erforderlich",
      state: sent ? "done" : "current",
    },
    {
      title: sent ? "Zahlungserinnerung versendet" : "Versand gesperrt",
      detail: sent ? "18.06.2026 · 09:14" : "Wird erst nach Freigabe aktiviert",
      state: sent ? "current" : "pending",
    },
  ];

  return (
    <ol className="activity-timeline" aria-label="Aktivitätshistorie">
      {activities.map((activity) => (
        <li key={`${activity.title}-${activity.detail}`} className={`activity-timeline__item is-${activity.state}`}>
          <span className="activity-timeline__marker" aria-hidden="true" />
          <div><strong>{activity.title}</strong><span>{activity.detail}</span></div>
        </li>
      ))}
    </ol>
  );
}
