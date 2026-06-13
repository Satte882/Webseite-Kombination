(() => {
  const panel = document.querySelector('[data-case-panel]');
  const steps = Array.from(document.querySelectorAll('[data-case-step]'));
  const recommendationLabel = document.querySelector('[data-recommendation-label]');
  const recommendationText = document.querySelector('[data-recommendation-text]');
  const nextAction = document.querySelector('[data-next-action]');
  const caseStatus = document.querySelector('[data-case-status]');
  const caseAge = document.querySelector('[data-case-age]');
  const preview = document.querySelector('[data-message-preview]');
  const previewToggle = document.querySelector('[data-preview-toggle]');
  const approveAction = document.querySelector('[data-approve-action]');
  const caseLists = Array.from(document.querySelectorAll('.case-list'));

  const copy = [
    {
      label: 'Leistung ist erfasst',
      text: 'Die erledigte Arbeit ist dem Zahlungsfall zugeordnet. 0Admin hält fest, woraus die Rechnung entstanden ist.',
      status: 'Leistung erfasst',
      action: 'Bereit'
    },
    {
      label: 'Rechnung ist gestellt',
      text: 'Die Rechnung ist sichtbar im Fall. Der offene Betrag bleibt verbunden mit Kunde, Frist und nächster Aktion.',
      status: 'Rechnung gestellt',
      action: 'Überwachen'
    },
    {
      label: 'Freigabe nötig',
      text: '0Admin bereitet die Zahlungserinnerung vor. Der Mensch prüft Ton und Kontext und gibt die Nachricht frei.',
      status: 'Freigabe nötig',
      action: 'Freigabe'
    },
    {
      label: 'Zahlung noch offen',
      text: 'Der Fall bleibt offen, bis Zahlung oder Klärgrund erfasst ist. So verschwindet kein Betrag im Büroalltag.',
      status: 'Zahlung offen',
      action: 'Klären'
    }
  ];

  function setStep(index) {
    const item = copy[index];
    if (!item) return;
    steps.forEach((step, stepIndex) => {
      step.classList.toggle('active', stepIndex === index);
    });
    if (recommendationLabel) recommendationLabel.textContent = item.label;
    if (recommendationText) recommendationText.textContent = item.text;
    if (caseStatus) caseStatus.textContent = item.status;
    if (nextAction) nextAction.textContent = item.action;
    if (caseAge) caseAge.textContent = index === 3 ? 'Zahlung ausstehend' : '2 Tage überfällig';
  }

  steps.forEach((step) => {
    step.addEventListener('click', () => setStep(Number(step.dataset.caseStep)));
  });

  previewToggle?.addEventListener('click', () => {
    if (!preview) return;
    preview.hidden = !preview.hidden;
    previewToggle.textContent = preview.hidden ? 'Vorschau' : 'Vorschau schließen';
  });

  approveAction?.addEventListener('click', () => {
    panel?.classList.add('is-approved');
    if (approveAction) approveAction.textContent = 'Vorbereitet';
    if (caseStatus) caseStatus.textContent = 'Erinnerung vorbereitet';
    if (nextAction) nextAction.textContent = 'Senden';
    if (recommendationLabel) recommendationLabel.textContent = 'Zur Freigabe vorbereitet';
    if (recommendationText) recommendationText.textContent = 'Die Erinnerung ist vorbereitet. Im echten Betrieb bleibt die Entscheidung bei Ihnen, bevor etwas versendet wird.';
    window.setTimeout(() => {
      if (approveAction) approveAction.textContent = 'Freigeben';
      panel?.classList.remove('is-approved');
    }, 2400);
  });

  caseLists.forEach((card) => {
    card.addEventListener('click', () => {
      caseLists.forEach((item) => item.classList.toggle('is-selected', item === card));
    });
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        card.click();
      }
    });
  });
})();
