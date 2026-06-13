(() => {
  const panel = document.querySelector('[data-case-panel]');
  if (!panel) return;
  const steps = [...panel.querySelectorAll('[data-case-step]')];
  const status = document.querySelector('[data-case-status]');
  const nextAction = document.querySelector('[data-next-action]');
  const label = panel.querySelector('[data-recommendation-label]');
  const text = panel.querySelector('[data-recommendation-text]');
  const preview = panel.querySelector('[data-message-preview]');
  const approve = panel.querySelector('[data-approve-action]');
  const previewToggle = panel.querySelector('[data-preview-toggle]');
  const states = [
    ['Leistung erfasst', 'Rechnung erstellen', 'Die Leistung ist abgeschlossen und dem richtigen Kunden zugeordnet.'],
    ['Rechnung gestellt', 'Fälligkeit beobachten', 'Die Rechnung ist versendet. 0Admin hält Betrag und Fälligkeit sichtbar.'],
    ['Freigabe nötig', 'Freigabe', 'Zahlungserinnerung prüfen und nach Freigabe senden. Der Fall bleibt offen, bis Zahlung oder Klärgrund erfasst ist.'],
    ['Zahlung offen', 'Zahlung prüfen', 'Nach dem Versand bleibt der Fall aktiv, bis Zahlung oder Klärung eindeutig dokumentiert ist.']
  ];
  const setStep = (index) => {
    steps.forEach((step, stepIndex) => { step.classList.toggle('active', stepIndex === index); step.classList.toggle('done', stepIndex < index); });
    if (status) status.textContent = states[index][0];
    if (nextAction) nextAction.textContent = states[index][1];
    if (label) label.textContent = index === 2 ? 'Vorgeschlagene nächste Aktion' : 'Aktueller Vorgang';
    if (text) text.textContent = states[index][2];
  };
  steps.forEach((step, index) => step.addEventListener('click', () => setStep(index)));
  previewToggle?.addEventListener('click', () => { if (preview) preview.hidden = !preview.hidden; });
  approve?.addEventListener('click', () => {
    if (status) { status.textContent = 'Versendet'; status.classList.remove('status-chip--warning'); status.classList.add('status-chip--success'); }
    if (nextAction) nextAction.textContent = 'Zahlung beobachten';
    if (text) text.textContent = 'Die Zahlungserinnerung wurde freigegeben und dokumentiert. Der Fall bleibt bis Zahlung oder Klärung offen.';
    approve.textContent = 'Versendet'; approve.disabled = true;
  });
  setStep(2);
})();
