export type InvoiceStatus = "Offen" | "Bald fällig" | "Heute fällig" | "Überfällig";

export type InvoiceLine = {
  description: string;
  quantity: string;
  amount: number;
};

export type InvoiceDemo = {
  sender: string[];
  recipient: string[];
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  status: InvoiceStatus;
  lines: InvoiceLine[];
  net: number;
  vat: number;
  gross: number;
};

export const invoiceDemo: InvoiceDemo = {
  sender: [
    "Mustermann Elektrotechnik GmbH",
    "Max Mustermann",
    "Werkstraße 12",
    "12345 Musterstadt",
  ],
  recipient: ["Beispielbau GmbH", "Baustraße 8", "54321 Beispielstadt"],
  invoiceNumber: "RE-2026-0042",
  invoiceDate: "03.06.2026",
  dueDate: "17.06.2026",
  status: "Offen",
  lines: [
    { description: "Installation Unterverteilung", quantity: "12 Std.", amount: 1680 },
    { description: "Material und Sicherungskomponenten", quantity: "1 Pos.", amount: 1150 },
    { description: "Anfahrtspauschale", quantity: "1 Pos.", amount: 100 },
  ],
  net: 2930,
  vat: 556.7,
  gross: 3486.7,
};

export const extractionFields = [
  { label: "Rechnungsnummer", value: "RE-2026-0042", confidence: "Sicher" },
  { label: "Debitor", value: "Beispielbau GmbH", confidence: "Sicher" },
  { label: "Rechnungsdatum", value: "03.06.2026", confidence: "Sicher" },
  { label: "Fällig am", value: "17.06.2026", confidence: "Sicher" },
  { label: "Nettobetrag", value: "2.930,00 €", confidence: "Sicher" },
  { label: "Umsatzsteuer", value: "556,70 €", confidence: "Sicher" },
  { label: "Bruttobetrag", value: "3.486,70 €", confidence: "Sicher" },
  { label: "Zahlungsstatus", value: "Offen", confidence: "Sicher" },
  { label: "Bankverbindung", value: "Manuelle Prüfung", confidence: "Unsicher" },
] as const;

export const faqItems = [
  {
    question: "Muss ich meine Rechnungen direkt in 0Admin erstellen?",
    answer:
      "Nein. Der dargestellte Ablauf zeigt ausdrücklich, dass eine Rechnung wie gewohnt erstellt und versendet werden kann. Welche Eingangskanäle zum Produktstart verbindlich unterstützt werden, wird vor dem Go-live festgelegt.",
  },
  {
    question: "Wie gelangen Rechnungen in das System?",
    answer:
      "Die Website zeigt exemplarisch einen E-Mail-basierten Eingang. Weitere Wege wie Upload oder Schnittstellen sind mögliche Produktbausteine, aber auf dieser Konzeptseite nicht als produktiv verfügbar zugesagt.",
  },
  {
    question: "Werden Mahnungen automatisch verschickt?",
    answer:
      "Nein. Im gezeigten Kontrollmodell wird eine Mahnung vorbereitet, aber erst nach einer bewussten menschlichen Freigabe als versendet markiert.",
  },
  {
    question: "Kann ich eine Mahnung vor dem Versand bearbeiten?",
    answer:
      "Ja, die Demo enthält einen klaren Bearbeitungsschritt. Die konkrete Bearbeitungstiefe im Produkt ist Gegenstand der Produktvalidierung.",
  },
  {
    question: "Was passiert bei fehlerhaft erkannten Rechnungsdaten?",
    answer:
      "Unsichere Felder werden nicht still übernommen. Sie werden als prüfbedürftig markiert und müssen vor dem nächsten relevanten Schritt bestätigt werden.",
  },
  {
    question: "Ist die dargestellte Rechnung echt?",
    answer:
      "Nein. Alle Namen, Adressen, Beträge und Vorgänge sind frei erfundene Beispieldaten. Die Seite überträgt keine Rechnungsdaten an einen Server.",
  },
  {
    question: "Für welche Handwerksbetriebe eignet sich 0Admin?",
    answer:
      "Der Fokus liegt auf kleinen und mittleren deutschen Handwerksbetrieben, insbesondere Betrieben mit wiederkehrenden Rechnungs-, Fälligkeits- und Nachverfolgungsaufgaben.",
  },
  {
    question: "Ersetzt 0Admin meine Buchhaltungssoftware?",
    answer:
      "Nein. 0Admin ist als operatives Geldfluss-Office positioniert, nicht als vollständiger Ersatz für Finanzbuchhaltung, Steuerberatung oder ein ERP-System.",
  },
  {
    question: "Welche Rolle spielt DPPFOR?",
    answer:
      "DPPFOR ist die Dachmarke. 0Admin ist das konkrete Produkt für den operativen Rechnungs- und Geldflussprozess im Handwerk.",
  },
  {
    question: "Welche Schritte bleiben unter menschlicher Kontrolle?",
    answer:
      "Prüfbedürftige Daten, inhaltliche Änderungen und der Versand einer Mahnung bleiben sichtbar und entscheidbar. Automatisierung soll vorbereiten, nicht Verantwortung verschleiern.",
  },
] as const;
