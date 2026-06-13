export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  author: string;
  tags: string[];
  category: 'Problem & Lösung' | 'Finanzen & Liquidität' | 'Technologie & Zukunft';
  readTime: string;
  content: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'buerokratie-im-handwerk-wo-geld-wirklich-verloren-geht',
    title: 'Bürokratie im Handwerk: Wo Geld wirklich verloren geht',
    description: 'Papierkram kostet nicht nur Zeit. Er verzögert Rechnungen, verdeckt offene Posten und zieht den Chef aus dem Betrieb.',
    author: 'DPPFOR Redaktion', tags: ['Effizienz','Büroorganisation','Geldfluss'], category: 'Problem & Lösung', readTime: '8 min',
    content: `<p><strong>Warum Sie das lesen sollten:</strong> Wenn der Betrieb ausgelastet ist, aber trotzdem Druck auf dem Konto entsteht, liegt das Problem oft zwischen Leistung, Rechnung, Zahlung und Nachfassen.</p><h2>Das Problem ist verlorene Kontrolle</h2><p>Eine Leistung wurde erbracht, aber die Rechnung geht später raus. Eine Rechnung wurde gestellt, aber Fälligkeit und nächste Aktion bleiben unsichtbar. Bürokratie wird genau dort zum Geldflussproblem.</p><h2>Der Chef wird zum teuersten Sachbearbeiter</h2><p>Wenn kritische Informationen im Kopf des Inhabers liegen, funktioniert der Prozess nach Erinnerung und Tagesform. Ein guter Ablauf muss stattdessen zeigen, was heute relevant ist.</p><h2>Vom Dokument zum Geldfall</h2><p>Eine Rechnung ist nicht nur eine PDF-Datei, sondern ein Vorgang mit Status, Fälligkeit, nächster Aktion und Verantwortlichkeit. Der Vorgang endet erst mit bezahlt, geklärt oder bewusst gestoppt.</p>`
  },
  {
    slug: 'offene-rechnungen-liquiditaet-handwerk',
    title: 'Offene Rechnungen: Warum Umsatz noch keine Liquidität ist',
    description: 'Erbrachte Leistung finanziert den Betrieb erst, wenn die Zahlung tatsächlich eingegangen ist.',
    author: 'DPPFOR Redaktion', tags: ['Liquidität','Offene Posten'], category: 'Finanzen & Liquidität', readTime: '7 min',
    content: `<p><strong>Warum Sie das lesen sollten:</strong> Ein voller Auftragsbestand schützt nicht vor Liquiditätsdruck, wenn Rechnungen spät gestellt oder zu spät bezahlt werden.</p><h2>Umsatz ist kein Kontostand</h2><p>Material, Löhne und Fahrzeuge werden bezahlt, bevor der Kunde zahlt. Jeder zusätzliche Tag verlängert die Vorfinanzierung.</p><h2>Fälligkeiten müssen täglich sichtbar sein</h2><p>Entscheidend ist nicht eine lange Liste, sondern die Trennung zwischen offen, bald fällig, überfällig und zu klären.</p><h2>Der erste Hebel</h2><p>Rechnungen schnell versenden, Fälligkeiten überwachen und jedem Vorgang einen klaren nächsten Schritt geben.</p>`
  },
  {
    slug: 'mahnwesen-ohne-kundenbeziehung-zu-beschaedigen',
    title: 'Zahlungserinnerungen ohne beschädigte Kundenbeziehung',
    description: 'Konsequentes Nachfassen muss weder aggressiv noch unangenehm sein.',
    author: 'DPPFOR Redaktion', tags: ['Kundenbeziehung','Fälligkeit'], category: 'Problem & Lösung', readTime: '6 min',
    content: `<p><strong>Warum Sie das lesen sollten:</strong> Viele Betriebe warten zu lange, weil sie die Kundenbeziehung schützen wollen. Das macht den Vorgang selten besser.</p><h2>Sachlichkeit statt Bauchgefühl</h2><p>Eine klare, freundliche Erinnerung verweist auf Rechnung, Betrag und Fälligkeit. Sie unterstellt nichts und eröffnet einen Klärungsweg.</p><h2>Ausnahmen getrennt behandeln</h2><p>Reklamation, Teilzahlung oder fehlende Unterlage gehören nicht in denselben Ablauf wie ein normaler Zahlungsverzug.</p><h2>Kontrolle bleibt sichtbar</h2><p>Vorbereitete Texte und Freigaben entlasten, ohne Verantwortung zu verschleiern.</p>`
  },
  {
    slug: 'rechnung-bis-zahlung-durchgaengiger-prozess',
    title: 'Von der Rechnung bis zur Zahlung: Warum der Prozess durchgängig sein muss',
    description: 'Zwischen Dokument, Fälligkeit, Erinnerung und Zahlung entstehen die meisten Informationsbrüche.',
    author: 'DPPFOR Redaktion', tags: ['Prozess','Automatisierung'], category: 'Technologie & Zukunft', readTime: '8 min',
    content: `<p><strong>Warum Sie das lesen sollten:</strong> Ein digitales Dokument allein löst keinen Geldflussprozess.</p><h2>Dateien sind keine Zustände</h2><p>Eine PDF zeigt nicht automatisch, ob sie zugestellt, fällig, bezahlt oder strittig ist. Dafür braucht der Vorgang einen nachvollziehbaren Status.</p><h2>Der nächste Schritt muss aus dem Zustand entstehen</h2><p>Aus Rechnung und Fälligkeit folgt entweder Warten, Erinnern, Prüfen oder Klären.</p><h2>Das Ziel ist geschlossen</h2><p>Der Prozess endet nicht beim Versand, sondern bei Zahlung oder eindeutiger Klärung.</p>`
  },
  {
    slug: 'ki-im-handwerk-was-wirklich-hilft',
    title: 'KI im Handwerk: Was wirklich hilft und was nur zusätzliche Arbeit erzeugt',
    description: 'Nicht jede Automatisierung entlastet. Entscheidend sind klare Zustände und überprüfbare Ergebnisse.',
    author: 'DPPFOR Redaktion', tags: ['KI','Automatisierung','Handwerk'], category: 'Technologie & Zukunft', readTime: '7 min',
    content: `<p><strong>Warum Sie das lesen sollten:</strong> KI ist nur dann nützlich, wenn sie einen konkreten betrieblichen Engpass reduziert.</p><h2>Ergebnis vor Technologie</h2><p>Der Betrieb braucht keine KI-Oberfläche, sondern weniger Nachlaufen und klare Entscheidungen.</p><h2>Unsicherheit muss sichtbar bleiben</h2><p>Automatisch erkannte Daten dürfen nicht still als Wahrheit behandelt werden. Unsichere Angaben benötigen Prüfung.</p><h2>Menschen bearbeiten Ausnahmen</h2><p>Routine kann vorbereitet werden. Verantwortung und sensible Entscheidungen bleiben nachvollziehbar.</p>`
  },
  {
    slug: 'fachkraeftemangel-schlechte-organisation-kostet-mitarbeiter',
    title: 'Fachkräftemangel: Warum schlechte Organisation gute Leute müde macht',
    description: 'Chaos, Rückfragen und unnötige Nacharbeit belasten Fachkräfte und Führung.',
    author: 'DPPFOR Redaktion', tags: ['Organisation','SHK','Mitarbeiter'], category: 'Problem & Lösung', readTime: '7 min',
    content: `<p><strong>Warum Sie das lesen sollten:</strong> Gute Fachkräfte wollen Probleme lösen und nicht Informationen suchen.</p><h2>Organisation ist Wertschätzung</h2><p>Klare Informationen und Zustände verhindern Rückfragen, Doppelarbeit und unnötige Unterbrechungen.</p><h2>Der Chef darf kein Informationsknoten sein</h2><p>Wenn jeder offene Vorgang über den Inhaber läuft, wird der Betrieb langsam und abhängig.</p><h2>Stabiler Geldfluss schafft Ruhe</h2><p>Weniger Nacharbeit und verlässlichere Zahlungseingänge reduzieren Druck im gesamten Betrieb.</p>`
  }
];
