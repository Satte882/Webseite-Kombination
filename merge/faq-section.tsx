const faqItems = [
  {
    question: "Muss ich meine Rechnungen direkt in 0Admin erstellen?",
    answer: "Nein. Sie erstellen Ihre Rechnungen weiterhin in Ihrer bestehenden Software. 0Admin übernimmt den nachfolgenden Geldfluss: Rechnung erfassen, Fälligkeit überwachen, nächsten Schritt vorbereiten und den Vorgang bis zur Zahlung oder Klärung sichtbar halten.",
  },
  {
    question: "Wie gelangen Rechnungen in das System?",
    answer: "Der dargestellte Ablauf zeigt den Eingang über eine dafür vorgesehene E-Mail-Adresse. Weitere Eingangskanäle können ergänzt werden. Entscheidend ist: Ihre bestehende Rechnungssoftware bleibt bestehen.",
  },
  {
    question: "Werden Zahlungserinnerungen automatisch verschickt?",
    answer: "0Admin kann Vorgänge vorbereiten und nach festgelegten Regeln bearbeiten. Prüfbedürftige Fälle bleiben sichtbar. Im dargestellten Kontrollmodell erfolgt der Versand erst nach einer bewussten Freigabe.",
  },
  {
    question: "Kann ich eine Nachricht vor dem Versand bearbeiten?",
    answer: "Ja. Der vorbereitete Text bleibt prüf- und bearbeitbar. Änderungen, Freigabe und Versandstatus werden im Vorgang nachvollziehbar dokumentiert.",
  },
  {
    question: "Was passiert bei unsicher erkannten Rechnungsdaten?",
    answer: "Unsichere Felder werden nicht still übernommen. 0Admin markiert sie als prüfbedürftig und stoppt den relevanten Folgeschritt, bis die Angabe bestätigt oder korrigiert wurde.",
  },
  {
    question: "Ersetzt 0Admin meine Buchhaltungs- oder Handwerkersoftware?",
    answer: "Nein. 0Admin ist das operative Geldfluss-Office zwischen erbrachter Leistung und geklärter Zahlung. Finanzbuchhaltung, Steuerberatung und bestehende Fachsoftware bleiben bestehen.",
  },
  {
    question: "Für welche Betriebe ist 0Admin gedacht?",
    answer: "Der Fokus liegt auf deutschen Handwerksbetrieben, insbesondere SHK-Betrieben mit etwa 5 bis 30 Mitarbeitenden und wiederkehrenden Rechnungs-, Fälligkeits- und Nachverfolgungsaufgaben.",
  },
  {
    question: "Welche Entscheidungen bleiben beim Menschen?",
    answer: "Prüfbedürftige Daten, inhaltliche Änderungen, Ausnahmen und sensible Versandentscheidungen bleiben sichtbar und entscheidbar. Automatisierung bereitet vor; Verantwortung wird nicht in einer Blackbox versteckt.",
  },
] as const;

export function FAQSection() {
  return (
    <section className="section faq" id="faq">
      <div className="shell faq__layout">
        <div className="section-heading section-heading--sticky">
          <span className="eyebrow">Fragen zum Ablauf</span>
          <h2>So fügt sich 0Admin in Ihren Betrieb ein.</h2>
          <p>Antworten zu bestehender Rechnungssoftware, Datenübernahme, Freigaben und menschlicher Kontrolle.</p>
        </div>
        <div className="faq__items">
          {faqItems.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
