(() => {
  const root = document.querySelector('[data-calculator]');
  if (!root) return;

  const inputs = {
    invoices: root.querySelector('input[name="invoices"]'),
    avg: root.querySelector('input[name="avg"]'),
    delay: root.querySelector('input[name="delay"]'),
    hours: root.querySelector('input[name="hours"]'),
    rate: root.querySelector('input[name="rate"]'),
  };

  const scenarios = {
    conservative: { optimizedDelay: 12, timeReduction: 0.35, label: 'Konservativ' },
    realistic: { optimizedDelay: 7, timeReduction: 0.5, label: 'Realistisch' },
    optimistic: { optimizedDelay: 3, timeReduction: 0.65, label: 'Optimistisch' },
  };

  let scenario = 'realistic';
  const currency = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
  const number = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 1 });

  function value(name) { return Number(inputs[name]?.value || 0); }
  function setText(selector, text) { const el = root.querySelector(selector); if (el) el.textContent = text; }

  function update() {
    const config = scenarios[scenario];
    const invoices = value('invoices');
    const avg = value('avg');
    const delay = value('delay');
    const hours = value('hours');
    const rate = value('rate');
    const monthlyRevenue = invoices * avg;
    const dailyRevenue = monthlyRevenue / 30;
    const optimizedDelay = Math.min(delay, config.optimizedDelay);
    const daysSaved = Math.max(0, delay - optimizedDelay);
    const yearlySavedHours = hours * 52 * config.timeReduction;
    const yearlyCostSavings = yearlySavedHours * rate;
    const boundCapital = dailyRevenue * delay;
    const liquidityGain = dailyRevenue * daysSaved;
    const currentPaymentDays = 14 + delay;
    const optimizedPaymentDays = 14 + optimizedDelay;

    setText('[data-value="invoices"]', invoices + ' Rechnungen');
    setText('[data-value="avg"]', currency.format(avg));
    setText('[data-value="delay"]', delay + ' Tage');
    setText('[data-value="hours"]', number.format(hours) + ' Stunden');
    setText('[data-value="rate"]', currency.format(rate) + '/h');
    setText('[data-metric="liquidity"]', currency.format(liquidityGain));
    setText('[data-metric="bound"]', currency.format(boundCapital));
    setText('[data-metric="hours"]', number.format(yearlySavedHours) + ' h');
    setText('[data-metric="cost"]', currency.format(yearlyCostSavings));
    setText('[data-metric="days"]', currentPaymentDays + ' → ' + optimizedPaymentDays);

    const insight = daysSaved > 0
      ? `Im Szenario ${config.label} werden ${daysSaved} Tage Zahlungsverzug reduziert. Das kann rund ${currency.format(liquidityGain)} Liquidität früher verfügbar machen.`
      : 'Der Zahlungsverzug ist bereits niedrig. Der Hebel liegt dann stärker in sauberer Fallklärung und weniger Nachfassaufwand.';
    setText('[data-metric="insight"]', insight);

    const mail = root.querySelector('[data-mailto]');
    if (mail) {
      const body = [
        'Hallo Satinder,',
        '',
        'ich habe den 0Admin-Rechner genutzt und möchte die Ergebnisse besprechen.',
        '',
        `Szenario: ${config.label}`,
        `Rechnungen pro Monat: ${invoices}`,
        `Durchschnittlicher Rechnungsbetrag: ${currency.format(avg)}`,
        `Zahlungsverzug: ${delay} Tage`,
        `Zeitaufwand pro Woche: ${number.format(hours)} Stunden`,
        `Geschätzter Liquiditätsgewinn: ${currency.format(liquidityGain)}`,
        `Geschätzte Kosteneinsparung/Jahr: ${currency.format(yearlyCostSavings)}`,
      ].join('\n');
      mail.href = 'mailto:satinder.sandhoo@dppfor.eu?subject=0Admin%20ROI-Rechner&body=' + encodeURIComponent(body);
    }
  }

  Object.values(inputs).forEach((input) => input?.addEventListener('input', update));
  root.querySelectorAll('[data-scenario]').forEach((button) => {
    button.addEventListener('click', () => {
      scenario = button.dataset.scenario || 'realistic';
      root.querySelectorAll('[data-scenario]').forEach((item) => item.classList.toggle('is-active', item === button));
      update();
    });
  });

  update();
})();
