(() => {
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = Array.from(document.querySelectorAll('.reveal'));
  const cinemaFlow = document.querySelector('.cinema-flow');
  const sceneCopy = document.querySelector('.cinema-left');
  const sceneCurrent = document.getElementById('scene-current');
  const sceneTitle = document.getElementById('scene-title');
  const sceneText = document.getElementById('scene-text');
  const coreLabel = document.getElementById('core-label');
  const machine = document.querySelector('.cinema-right');
  const statusRows = Array.from(document.querySelectorAll('[data-flow-card]'));
  const opsBoard = document.querySelector('[data-ops-board]');
  const opsRows = Array.from(document.querySelectorAll('[data-ops-row]'));
  const opsDetail = document.querySelector('[data-ops-detail-text]');

  const states = [
    ['01', 'Angebot', 34, 'Angebot bleibt sichtbar.', 'Der Geldfluss beginnt nicht erst bei der Rechnung. Offene Angebote brauchen einen klaren nächsten Schritt, bevor sie im Postfach verschwinden.'],
    ['02', 'Rechnung', 44, 'Leistung wird abrechenbar.', 'Erbrachte Arbeit muss schnell in eine Rechnung übergehen. Sonst wartet Liquidität auf Bürozeit statt auf den Kunden.'],
    ['03', 'Mahnung', 18, 'Fälligkeit wird vorbereitet.', 'Mahnen kostet Überwindung. 0Admin bereitet Erinnerung, Mahnung oder Klärung sachlich vor, Sie behalten die Freigabe.'],
    ['04', 'Zahlung', 128, 'Zahlung wird geklärt.', 'Der Fall endet nicht bei der Rechnung. Er endet, wenn bezahlt, offen, teilweise geklärt oder geschlossen eindeutig sichtbar ist.']
  ];

  let activeIndex = -1;
  let activeOpsIndex = 0;
  let opsTimer = null;
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  function showAll() {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  function setState(index) {
    if (index === activeIndex || !states[index]) return;
    activeIndex = index;
    const state = states[index];
    sceneCopy?.classList.add('is-switching');

    window.setTimeout(() => {
      if (sceneCurrent) sceneCurrent.textContent = state[0];
      if (sceneTitle) sceneTitle.textContent = state[3];
      if (sceneText) sceneText.textContent = state[4];
      if (coreLabel) coreLabel.textContent = state[1];
      document.documentElement.style.setProperty('--active-hue', String(state[2]));

      statusRows.forEach((row, rowIndex) => row.classList.toggle('is-active', rowIndex === index));

      if (machine) {
        machine.classList.remove('flow-step-0', 'flow-step-1', 'flow-step-2', 'flow-step-3');
        machine.classList.add('flow-step-' + index);
      }

      window.setTimeout(() => sceneCopy?.classList.remove('is-switching'), 40);
    }, 110);
  }

  function updateSceneProgress() {
    if (!cinemaFlow) return;
    const rect = cinemaFlow.getBoundingClientRect();
    const viewport = window.innerHeight || document.documentElement.clientHeight;
    const scrollable = rect.height - viewport;
    const raw = scrollable > 0 ? (0 - rect.top) / scrollable : 0;
    const progress = clamp(raw, 0, 1);
    const index = clamp(Math.floor(progress * states.length), 0, states.length - 1);
    document.documentElement.style.setProperty('--scene-progress', String(progress));
    setState(index);
  }

  function setOpsState(index) {
    if (!opsRows[index]) return;
    activeOpsIndex = index;
    opsRows.forEach((row, rowIndex) => row.classList.toggle('is-active', rowIndex === index));
    if (opsDetail) opsDetail.textContent = opsRows[index].dataset.opsDetail || '';
  }

  function startOpsTimer() {
    if (!opsRows.length || reduced) return;
    window.clearInterval(opsTimer);
    opsTimer = window.setInterval(() => {
      setOpsState((activeOpsIndex + 1) % opsRows.length);
    }, 2400);
  }

  if (opsRows.length) {
    opsRows.forEach((row, index) => {
      row.addEventListener('mouseenter', () => {
        window.clearInterval(opsTimer);
        setOpsState(index);
      });
      row.addEventListener('focus', () => {
        window.clearInterval(opsTimer);
        setOpsState(index);
      });
    });
    opsBoard?.addEventListener('mouseleave', startOpsTimer);
    setOpsState(0);
    startOpsTimer();
  }

  if (reduced || !('IntersectionObserver' in window)) {
    showAll();
    setState(0);
    updateSceneProgress();
    window.addEventListener('scroll', updateSceneProgress, { passive: true });
    window.addEventListener('resize', updateSceneProgress);
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -6% 0px' });

  const ruptureObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.22, rootMargin: '0px 0px -8% 0px' });

  revealItems.forEach((item) => {
    if (item.classList.contains('rupture-tile')) {
      ruptureObserver.observe(item);
      return;
    }
    revealObserver.observe(item);
  });
  setState(0);
  updateSceneProgress();
  window.addEventListener('scroll', updateSceneProgress, { passive: true });
  window.addEventListener('resize', updateSceneProgress);
})();
