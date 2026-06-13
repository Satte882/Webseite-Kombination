(() => {
  const endpoint = 'https://formspree.io/f/xwprlgpo';
  const timeoutMs = 12000;
  const layer = document.querySelector('[data-dialog-layer]');
  const dialogs = Array.from(document.querySelectorAll('[data-dialog]'));
  const openers = Array.from(document.querySelectorAll('[data-dialog-open]'));
  const closers = Array.from(document.querySelectorAll('[data-dialog-close]'));
  const contactForm = document.querySelector('[data-contact-form]');
  let lastFocus = null;

  function setStatus(form, message, type) {
    const status = form?.querySelector('[data-form-status]');
    if (!status) return;
    status.textContent = message || '';
    status.classList.toggle('is-error', type === 'error');
    status.classList.toggle('is-success', type === 'success');
  }

  function closeDialog() {
    dialogs.forEach((dialog) => {
      dialog.hidden = true;
    });
    if (layer) layer.hidden = true;
    document.documentElement.classList.remove('dialog-open');
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  function openDialog(name, trigger) {
    const dialog = dialogs.find((item) => item.dataset.dialog === name);
    if (!dialog || !layer) return;
    lastFocus = trigger || document.activeElement;
    dialogs.forEach((item) => {
      item.hidden = item !== dialog;
    });
    layer.hidden = false;
    document.documentElement.classList.add('dialog-open');
    window.setTimeout(() => {
      const focusTarget = dialog.querySelector('input, textarea, button, a');
      focusTarget?.focus();
    }, 0);
  }

  openers.forEach((opener) => {
    opener.addEventListener('click', () => openDialog(opener.dataset.dialogOpen, opener));
  });

  closers.forEach((closer) => {
    closer.addEventListener('click', closeDialog);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && layer && !layer.hidden) closeDialog();
  });

  contactForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const submit = form.querySelector('button[type="submit"]');
    const originalLabel = submit?.textContent || 'Senden';
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

    setStatus(form, '', '');
    if (submit) {
      submit.disabled = true;
      submit.textContent = 'Senden...';
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
        signal: controller.signal
      });

      if (!response.ok) {
        const raw = await response.text().catch(() => '');
        let apiMessage = '';
        try {
          const parsed = raw ? JSON.parse(raw) : {};
          apiMessage = parsed.errors?.[0]?.message || parsed.error || '';
        } catch {}
        throw new Error(apiMessage ? `Senden fehlgeschlagen (${response.status}): ${apiMessage}` : `Senden fehlgeschlagen (${response.status}).`);
      }

      form.reset();
      setStatus(form, 'Danke! Ihre Nachricht wurde gesendet.', 'success');
    } catch (error) {
      try {
        await fetch(endpoint, {
          method: 'POST',
          mode: 'no-cors',
          body: new FormData(form)
        });
        form.reset();
        setStatus(form, 'Danke! Ihre Nachricht wurde gesendet.', 'success');
      } catch {
        const offline = typeof navigator !== 'undefined' && navigator.onLine === false;
        setStatus(form, offline ? 'Keine Internetverbindung. Bitte prüfen Sie Ihre Verbindung.' : (error?.message || 'Senden fehlgeschlagen. Bitte versuchen Sie es später erneut.'), 'error');
      }
    } finally {
      window.clearTimeout(timeoutId);
      if (submit) {
        submit.disabled = false;
        submit.textContent = originalLabel;
      }
    }
  });
})();
