"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const scenarios = {
  conservative: { optimizedDelay: 12, timeReduction: 0.35, label: "Konservativ" },
  realistic: { optimizedDelay: 7, timeReduction: 0.5, label: "Realistisch" },
  optimistic: { optimizedDelay: 3, timeReduction: 0.65, label: "Optimistisch" },
} as const;

type Scenario = keyof typeof scenarios;

const currency = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const number = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 1 });

export function RoiCalculator() {
  const [scenario, setScenario] = useState<Scenario>("realistic");
  const [values, setValues] = useState({
    invoices: 45,
    avg: 2500,
    delay: 28,
    hours: 6,
    rate: 65,
  });

  const result = useMemo(() => {
    const config = scenarios[scenario];
    const monthlyRevenue = values.invoices * values.avg;
    const dailyRevenue = monthlyRevenue / 30;
    const optimizedDelay = Math.min(values.delay, config.optimizedDelay);
    const daysSaved = Math.max(0, values.delay - optimizedDelay);
    const yearlySavedHours = values.hours * 52 * config.timeReduction;
    const yearlyCostSavings = yearlySavedHours * values.rate;
    const boundCapital = dailyRevenue * values.delay;
    const liquidityGain = dailyRevenue * daysSaved;
    const currentPaymentDays = 14 + values.delay;
    const optimizedPaymentDays = 14 + optimizedDelay;

    return {
      config,
      daysSaved,
      yearlySavedHours,
      yearlyCostSavings,
      boundCapital,
      liquidityGain,
      paymentDays: `${currentPaymentDays} -> ${optimizedPaymentDays}`,
    };
  }, [scenario, values]);

  function setValue(name: keyof typeof values, value: string) {
    setValues((current) => ({ ...current, [name]: Number(value) }));
  }

  return (
    <section className="calculator-grid" aria-label="0Admin ROI-Rechner">
      <form className="calc-panel" aria-label="Eingaben für den 0Admin Rechner">
        <RangeField label="Rechnungen pro Monat" min={1} max={500} step={1} value={values.invoices} suffix=" Rechnungen" onChange={(value) => setValue("invoices", value)} />
        <RangeField label="Durchschnittlicher Rechnungsbetrag" min={100} max={50000} step={100} value={values.avg} display={currency.format(values.avg)} onChange={(value) => setValue("avg", value)} />
        <RangeField label="Durchschnittlicher Zahlungsverzug" min={0} max={180} step={1} value={values.delay} suffix=" Tage" onChange={(value) => setValue("delay", value)} />
        <RangeField label="Zeitaufwand offene Posten & Mahnungen pro Woche" min={0} max={40} step={0.5} value={values.hours} display={`${number.format(values.hours)} Stunden`} onChange={(value) => setValue("hours", value)} />
        <RangeField label="Interner Stundensatz" min={20} max={200} step={1} value={values.rate} display={`${currency.format(values.rate)}/h`} onChange={(value) => setValue("rate", value)} />
      </form>

      <aside className="calc-results" aria-label="Berechnete Ergebnisse">
        <div className="scenario-tabs" role="tablist" aria-label="Szenario wählen">
          {(Object.keys(scenarios) as Scenario[]).map((key) => (
            <button
              className={scenario === key ? "is-active" : ""}
              key={key}
              type="button"
              onClick={() => setScenario(key)}
            >
              {scenarios[key].label}
            </button>
          ))}
        </div>
        <Metric className="hero-metric" label="Liquiditätsgewinn" value={currency.format(result.liquidityGain)} note="durch schnelleren Zahlungseingang" />
        <div className="metric-row">
          <Metric label="Gebundenes Kapital" value={currency.format(result.boundCapital)} />
          <Metric label="Zeitersparnis/Jahr" value={`${number.format(result.yearlySavedHours)} h`} />
        </div>
        <div className="metric-row">
          <Metric label="Kosteneinsparung/Jahr" value={currency.format(result.yearlyCostSavings)} />
          <Metric label="Zahlungseingang" value={result.paymentDays} />
        </div>
        <div className="insight-box">
          <span>Einordnung</span>
          <p>
            {result.daysSaved > 0
              ? `Im Szenario ${result.config.label} werden ${result.daysSaved} Tage Zahlungsverzug reduziert. Das kann rund ${currency.format(result.liquidityGain)} Liquidität früher verfügbar machen.`
              : "Der Zahlungsverzug ist bereits niedrig. Der Hebel liegt dann stärker in sauberer Fallklärung und weniger Nachfassaufwand."}
          </p>
        </div>
        <Link className="primary-cta" href="/#kontakt">Zahlen für meinen Betrieb besprechen</Link>
      </aside>
    </section>
  );
}

function RangeField(props: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  suffix?: string;
  display?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label>
      <span>{props.label}</span>
      <input
        type="range"
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        onChange={(event) => props.onChange(event.currentTarget.value)}
      />
      <strong>{props.display ?? `${props.value}${props.suffix ?? ""}`}</strong>
    </label>
  );
}

function Metric({ label, value, note, className = "" }: { label: string; value: string; note?: string; className?: string }) {
  return (
    <div className={`metric-card ${className}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      {note ? <small>{note}</small> : null}
    </div>
  );
}
