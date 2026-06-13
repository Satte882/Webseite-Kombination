const states = ["Offen", "Bald fällig", "Heute fällig", "Überfällig"] as const;

export function DueDateTimeline() {
  return (
    <div className="due-timeline" aria-label="Zeitlicher Status der Rechnung">
      <div className="due-timeline__line" aria-hidden="true"><span /></div>
      <ol>
        {states.map((state, index) => (
          <li key={state} className={index === states.length - 1 ? "is-current" : "is-complete"}>
            <span className="due-timeline__dot" aria-hidden="true">{index < 3 ? "✓" : "!"}</span>
            <strong>{state}</strong>
            <small>{["03.06.", "14.06.", "17.06.", "18.06."][index]}</small>
          </li>
        ))}
      </ol>
    </div>
  );
}
