# DPPFOR / 0Admin – kombinierte Website

Eigenständige, statisch exportierte Astro-Website für DPPFOR und das Produkt 0Admin.

## Herkunft der Konzeption

- **Stamm:** `Satte882/DPPFOR-Astro-Site`
- **Spender:** `Satte882/DPP_Blatt_Flow`
- Die beiden Quell-Repositories werden nicht verändert.
- Der Rechnungs-Scroll-Flow, die Datenzuordnung, die menschliche Freigabe und die FAQ-Logik wurden in dieser eigenständigen Codebasis zusammengeführt.
- Dashboard und generische Benefits aus dem Spender wurden bewusst nicht übernommen.

## Lokal starten

```bash
npm install
npm run check
npm run build
npm run dev
```

## Verifikation

```bash
npm run test:install
npm run test
```

Die Website bleibt bis zum Launch site-wide `noindex`, `nofollow` und `noarchive`.
