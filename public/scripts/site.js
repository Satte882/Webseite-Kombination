(() => {
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

  const reveals = [...document.querySelectorAll('.reveal')];
  if (reduced || !('IntersectionObserver' in window)) {
    reveals.forEach((item) => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach((item) => revealObserver.observe(item));
  }

  const machine = document.querySelector('[data-flow-machine]');
  const scenes = [...document.querySelectorAll('[data-scene]')];
  const stageLabel = document.querySelector('[data-stage-label]');
  const progress = document.querySelector('[data-machine-progress]');
  const labels = [
    'Bestehende Rechnungssoftware',
    'E-Mail an 0Admin',
    '0Admin Eingang',
    'Daten werden zugeordnet',
    'Fälligkeit wird aktiv',
    'Freigabe vor Versand'
  ];

  const setFlowStep = (index) => {
    if (!machine || index < 0 || index >= scenes.length) return;
    machine.dataset.step = String(index);
    scenes.forEach((scene, sceneIndex) => scene.classList.toggle('is-active', sceneIndex === index));
    if (stageLabel) stageLabel.textContent = labels[index] || labels[0];
    if (progress) progress.style.transform = `scaleX(${(index + 1) / scenes.length})`;
  };

  if (scenes.length && machine) {
    setFlowStep(0);
    if (!reduced && 'IntersectionObserver' in window && window.innerWidth > 900) {
      const sceneObserver = new IntersectionObserver((entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setFlowStep(Number(visible.target.dataset.scene || 0));
      }, { threshold: [0.35, 0.55, 0.72], rootMargin: '-18% 0px -26% 0px' });
      scenes.forEach((scene) => sceneObserver.observe(scene));
    }
  }

  const approval = document.querySelector('[data-approval-demo]');
  const textarea = approval?.querySelector('#reminder-message');
  const editButton = approval?.querySelector('[data-edit-reminder]');
  const sendButton = approval?.querySelector('[data-send-reminder]');
  const status = approval?.querySelector('[data-approval-status]');
  const activityList = approval?.querySelector('[data-activity-list]');
  let sent = false;

  editButton?.addEventListener('click', () => {
    if (!(textarea instanceof HTMLTextAreaElement) || sent) return;
    textarea.readOnly = false;
    textarea.focus();
    editButton.textContent = 'Bearbeitung aktiv';
    if (!activityList?.querySelector('[data-edit-entry]')) {
      const item = document.createElement('li');
      item.dataset.editEntry = 'true';
      item.className = 'active';
      item.innerHTML = '<strong>Nachricht wird bearbeitet</strong><small>Änderungen bleiben vor dem Versand sichtbar</small>';
      activityList?.append(item);
    }
  });

  sendButton?.addEventListener('click', () => {
    if (!(textarea instanceof HTMLTextAreaElement) || textarea.value.trim().length < 20 || sent) return;
    sent = true;
    textarea.readOnly = true;
    if (status) {
      status.textContent = 'Versendet';
      status.classList.remove('status-chip--warning');
      status.classList.add('status-chip--success');
    }
    sendButton.textContent = 'Freigegeben und versendet';
    sendButton.disabled = true;
    if (editButton instanceof HTMLButtonElement) editButton.disabled = true;
    activityList?.querySelectorAll('li').forEach((item) => item.classList.remove('active'));
    const item = document.createElement('li');
    item.className = 'done';
    item.innerHTML = '<strong>Zahlungserinnerung versendet</strong><small>Freigabe und Versand dokumentiert</small>';
    activityList?.append(item);
  });

  const layer = document.querySelector('[data-dialog-layer]');
  const dialogs = [...document.querySelectorAll('[data-dialog]')];
  let lastFocus = null;

  const closeDialog = () => {
    dialogs.forEach((dialog) => { dialog.hidden = true; });
    if (layer) layer.hidden = true;
    document.documentElement.classList.remove('dialog-open');
    if (lastFocus instanceof HTMLElement) lastFocus.focus();
  };

  document.querySelectorAll('[data-dialog-open]').forEach((opener) => {
    opener.addEventListener('click', () => {
      const name = opener.getAttribute('data-dialog-open');
      const dialog = dialogs.find((item) => item.getAttribute('data-dialog') === name);
      if (!dialog || !layer) return;
      lastFocus = opener;
      dialogs.forEach((item) => { item.hidden = item !== dialog; });
      layer.hidden = false;
      document.documentElement.classList.add('dialog-open');
      window.setTimeout(() => dialog.querySelector('input, textarea, button, a')?.focus(), 0);
    });
  });
  document.querySelectorAll('[data-dialog-close]').forEach((closer) => closer.addEventListener('click', closeDialog));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && layer && !layer.hidden) closeDialog(); });

  const contactForm = document.querySelector('[data-contact-form]');
  contactForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!(contactForm instanceof HTMLFormElement)) return;
    const submit = contactForm.querySelector('button[type="submit"]');
    const formStatus = contactForm.querySelector('[data-form-status]');
    const originalText = submit?.textContent || 'Senden';
    if (submit instanceof HTMLButtonElement) { submit.disabled = true; submit.textContent = 'Senden…'; }
    if (formStatus) { formStatus.textContent = ''; formStatus.className = 'form-status'; }
    try {
      const response = await fetch('https://formspree.io/f/xwprlgpo', {
        method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(contactForm)
      });
      if (!response.ok) throw new Error(`Senden fehlgeschlagen (${response.status}).`);
      contactForm.reset();
      if (formStatus) { formStatus.textContent = 'Danke. Ihre Nachricht wurde gesendet.'; formStatus.classList.add('is-success'); }
    } catch (error) {
      if (formStatus) { formStatus.textContent = error instanceof Error ? error.message : 'Senden fehlgeschlagen.'; formStatus.classList.add('is-error'); }
    } finally {
      if (submit instanceof HTMLButtonElement) { submit.disabled = false; submit.textContent = originalText; }
    }
  });
})();
