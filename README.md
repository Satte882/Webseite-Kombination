# DPPFOR / 0Admin – kombinierte Website

Diese Website verbindet zwei unveränderte Quell-Repositories:

- **Site 1 – Stamm:** `Satte882/DPPFOR-Astro-Site`
- **Site 2 – Spender:** `Satte882/DPP_Blatt_Flow`

## Kombinationslogik

Site 1 liefert Markenassets, Navigation, Hero, Problemführung, Geldfluss-Check, Cockpit, Blog, Conversion und rechtliche Unterseiten.

Site 2 liefert unverändert den React-/GSAP-Rechnungs-Scroll-Flow, die Datenzuordnung, den Reduced-Motion-Fallback, die Freigabe-Interaktion und die FAQ-Darstellung.

Nicht übernommen wurden das Finanzdashboard und die generischen Benefits aus Site 2.

## Lokale Nutzung

```bash
npm install
npm run lint
npm run build
npm run dev
```

## Browser-Verifikation

```bash
npm run test:install
npm test
```

Die Website bleibt bis zum Launch `noindex`, `nofollow` und `noarchive`.
