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
  sender: ["Mustermann SHK GmbH", "Max Mustermann", "Werkstraße 12", "12345 Musterstadt"],
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
    question: "Ist die dargestellte Rechnung echt?",
    answer: "Nein. Alle Namen, Adressen, Beträge und Vorgänge sind frei erfundene Beispieldaten. Die Darstellung überträgt keine Rechnungsdaten an einen Server.",
  },
  {
    question: "Für welche Handwerksbetriebe eignet sich 0Admin?",
    answer: "Der Fokus liegt auf deutschen Handwerksbetrieben, insbesondere SHK-Betrieben mit etwa 5 bis 30 Mitarbeitenden und wiederkehrenden Rechnungs-, Fälligkeits- und Nachverfolgungsaufgaben.",
  },
  {
    question: "Ersetzt 0Admin meine Buchhaltungs- oder Handwerkersoftware?",
    answer: "Nein. 0Admin ist das operative Geldfluss-Office zwischen erbrachter Leistung und geklärter Zahlung. Finanzbuchhaltung, Steuerberatung und bestehende Fachsoftware bleiben bestehen.",
  },
  {
    question: "Welche Rolle spielt DPPFOR?",
    answer: "DPPFOR ist die Dachmarke. 0Admin ist das konkrete Produkt für den operativen Geldfluss im Handwerk.",
  },
  {
    question: "Welche Entscheidungen bleiben beim Menschen?",
    answer: "Prüfbedürftige Daten, inhaltliche Änderungen, Ausnahmen und sensible Versandentscheidungen bleiben sichtbar und entscheidbar. Automatisierung bereitet vor; Verantwortung wird nicht in einer Blackbox versteckt.",
  },
] as const;
