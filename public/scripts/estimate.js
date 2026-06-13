(() => {
  const box = document.querySelector('[data-calculator]');
  if (!box) return;
  const read = (name) => Number(box.querySelector(`[name="${name}"]`).value);
  const euro = (value) => `${Math.round(value).toLocaleString('de-DE')} €`;
  const show = (key, value) => { const node = box.querySelector(`[data-metric="${key}"]`); if (node) node.textContent = value; };
  const update = () => {
    const count = read('invoices');
    const average = read('avg');
    const days = read('delay');
    const hours = read('hours');
    const rate = read('rate');
    show('bound', euro(count * average * days / 30));
    show('liquidity', euro(count * average * days / 150));
    show('hours', `${Math.round(hours * 18)} h`);
    show('cost', euro(hours * 52 * rate));
    show('days', `${days} → ${Math.max(0, Math.round(days * .8))} Tage`);
  };
  box.querySelectorAll('input').forEach((field) => field.addEventListener('input', update));
  update();
})();
