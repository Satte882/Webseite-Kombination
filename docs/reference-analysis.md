# Referenzanalyse und Übertragung auf 0Admin

## Annahmen

1. Die Referenzanalyse basiert auf der öffentlich abrufbaren Website und ihrer sichtbaren Inhaltsstruktur; interne Design- oder Implementierungsdateien lagen nicht vor.
2. 0Admin ist das Produkt, DPPFOR die Dachmarke. Die konsistente Produktbezeichnung lautet „0Admin von DPPFOR“.
3. Sämtliche dargestellten Funktionszustände sind ein exemplarischer Produktablauf und keine Zusage bereits produktiver Integrationen.
4. Die Seite bleibt bis zum bestätigten Launch site-wide `noindex`.
5. Die CTA verweist vorerst auf die Dachmarke, weil kein verbindlicher Buchungs- oder Kontaktendpunkt vorgegeben wurde.

## Referenzanalyse

| Beobachtung | Wirkung | Übertragbar auf 0Admin? | Geplante Umsetzung |
|---|---|---|---|
| Ein einzelnes Produktobjekt bleibt über lange Abschnitte der visuelle Anker. | Hohe Wiedererkennbarkeit; der Nutzer versteht, worauf sich jeder Text bezieht. | Ja. | Ein realistisches HTML-Rechnungsblatt bleibt in der Desktop-Story im Sticky-Stage sichtbar. |
| Scroll-Fortschritt fungiert als Zeitachse für Produktzustände. | Komplexe Eigenschaften werden nacheinander statt gleichzeitig erklärt. | Ja. | Native vertikale Scrollstrecke mit sechs fachlich klaren Zustandswechseln. |
| Große typografische Aussagen wechseln mit detaillierten Produktansichten. | Emotionaler Einstieg und technische Erklärung stören sich nicht gegenseitig. | Ja, aber sprachlich nüchterner. | Kurze Nutzen-Headlines neben präzisen Status- und Prozessdarstellungen. |
| Produktteile beziehungsweise Ansichten werden visuell zerlegt und neu zusammengesetzt. | Mechanik und Wertversprechen werden anschaulich. | Teilweise. | Rechnungsdaten lösen sich als strukturierte Felder aus dem Dokument; keine dekorative Explosionsanimation. |
| Bild- und Produktdarstellung dominiert gegenüber Navigation und Nebeninhalten. | Fokus bleibt auf dem Kernprodukt. | Ja. | Minimalistische Navigation; Rechnung und Geldfluss-Prozess dominieren den ersten und mittleren Seitenbereich. |
| Wahrscheinliche Kombination aus sticky/pinned Bereichen, Bildzuständen und scrollgebundenen Übergängen. | Hochwertige, kontrollierte Dramaturgie. | Ja, ohne schwere Bildsequenzen. | GSAP ScrollTrigger steuert nur `transform` und `opacity`; HTML/CSS/SVG bleiben die Basis. |
| Auf kleinen Displays muss die räumliche Inszenierung stark reduziert werden. | Verhindert unlesbare Miniaturdarstellungen und Scroll-Jacking. | Ja. | Mobile und Reduced Motion erhalten eine vollständig lineare, statische Prozessdarstellung. |
| Lange Bildsequenzen, Videos oder 3D würden Ladezeit, Wartbarkeit und Barrierefreiheit belasten. | Visuelle Wirkung kann zulasten der Nutzbarkeit gehen. | Nein. | Keine Videos, Canvas-Sequenzen oder Three.js; nur lokale Schriften und DOM-basierte Komponenten. |
| Die Referenz setzt stark auf Produktfaszination. | Funktioniert für ein physisches Designprodukt, reicht für B2B-Vertrauen aber nicht aus. | Nur als Ausgangspunkt. | Jeder visuelle Wechsel wird mit Status, fachlichem Zweck und menschlicher Verantwortung verbunden. |
| Starke Scroll-Inszenierung kann bei Motion-Sensitivität oder Tastaturnutzung problematisch sein. | Risiko von Orientierungslosigkeit und unzugänglicher Information. | Nur mit Fallback. | `prefers-reduced-motion` deaktiviert die animierte Story und zeigt alle Schritte statisch. |

## Kreativkonzept

Die Kernidee lautet: „Ein Blatt bleibt, sein betrieblicher Zustand verändert sich.“ Die Rechnung ist kein Symbolbild, sondern ein lesbares Objekt mit erfundenen, konsistenten Beispieldaten. Vom Versand bis zur Übersicht wird nicht die Rechnung dekorativ bewegt, sondern ihr fachlicher Status weitergeführt.

DPPFOR erscheint in Navigation, Footer und Marken-Lockup als Dachmarke. Im Nutzen- und Prozesskontext steht 0Admin im Mittelpunkt. Die visuelle Sprache kombiniert warmes Papierweiß, tiefes Grün-Anthrazit, Kupfer als Akzent und Rot ausschließlich für überfällige beziehungsweise fehlerhafte Zustände.

## Technische Architektur

| Bereich | Entscheidung |
|---|---|
| Framework | Next.js 16.2.9, App Router, statischer Export |
| UI | React 19.2.7, TypeScript Strict Mode, Tailwind CSS 4.3.1 plus komponentenspezifisches CSS |
| Animation | GSAP 3.15.0 und ScrollTrigger, gekapselt in `gsap.context()` und `gsap.matchMedia()` |
| Schriften | Lokal gebündelte Manrope- und IBM-Plex-Mono-Dateien über Fontsource |
| Tests | Playwright 1.60.0 für Desktop und Mobile |
| Daten | Typisierte, rein lokale Beispieldaten in `data/demo.ts` |
| Datenschutz | Kein Backend, kein Tracking, keine Formularübertragung, keine echten Rechnungsdaten |
| SEO vor Launch | Metadata vorhanden, aber `noindex`, `nofollow`, `noarchive` und blockierende `robots.txt` |
| Cleanup | GSAP-Kontext und MatchMedia-Instanzen werden beim Unmount vollständig zurückgesetzt |
