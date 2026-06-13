"use client";

import { useState } from "react";
import { ActivityTimeline } from "@/components/activity-timeline";
import { ReminderDocument } from "@/components/reminder-document";

export function HumanApprovalPanel() {
  const [sent, setSent] = useState(false);
  const [edited, setEdited] = useState(false);
  const [message, setMessage] = useState(
    "Guten Tag, wir möchten freundlich an die noch offene Rechnung RE-2026-0042 erinnern."
  );

  const handleEdit = () => {
    setEdited(true);
    requestAnimationFrame(() => document.getElementById("reminder-message")?.focus());
  };

  return (
    <div className="approval-demo" id="kontrolle">
      <div className="approval-demo__main">
        <div className="approval-demo__header">
          <div><span className="eyebrow">Human in the Loop</span><h3>Automatisierung bereitet vor. Sie entscheiden.</h3></div>
          <span className={`status-chip ${sent ? "status-chip--success" : "status-chip--warning"}`} aria-live="polite">
            {sent ? "Versendet" : "Freigabe erforderlich"}
          </span>
        </div>
        <ReminderDocument />
        <label className="approval-demo__editor" htmlFor="reminder-message">
          <span>Nachricht prüfen</span>
          <textarea
            id="reminder-message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            readOnly={!edited || sent}
            aria-describedby="approval-note"
          />
        </label>
        <p id="approval-note" className="approval-demo__note">Diese Interaktion läuft ausschließlich im Browser. Es werden keine Daten übertragen.</p>
        <div className="approval-demo__actions">
          <button className="button button--secondary" type="button" onClick={handleEdit} disabled={sent}>
            Bearbeiten
          </button>
          <button className="button" type="button" onClick={() => setSent(true)} disabled={sent || message.trim().length < 20}>
            {sent ? "Freigegeben und versendet" : "Freigeben und senden"}
          </button>
        </div>
      </div>
      <aside className="approval-demo__history">
        <span className="eyebrow">Nachvollziehbarer Verlauf</span>
        <h3>Aktivitätshistorie</h3>
        <ActivityTimeline sent={sent} edited={edited} />
      </aside>
    </div>
  );
}
