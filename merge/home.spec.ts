import { expect, test } from "@playwright/test";

test("verwendet die Markenassets aus Site 1", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('.s1-brand img')).toHaveAttribute('src', '/images/logo.png');
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', '/favicon.png');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Ihr Betrieb arbeitet');
});

test("enthält den unveränderten persistenten Rechnungs-Flow", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.locator('[data-flow-frame] [data-flow-invoice]')).toHaveCount(1);
  const keys = ["invoiceNumber", "debtor", "invoiceDate", "dueDate", "net", "vat", "gross", "status"];
  for (const key of keys) {
    await expect(page.locator(`[data-invoice-field="${key}"]`)).toHaveCount(1);
    await expect(page.locator(`[data-db-field="${key}"]`)).toHaveCount(1);
    await expect(page.locator(`[data-fly-field="${key}"]`)).toHaveCount(1);
    await expect(page.locator(`[data-flow-line="${key}"]`)).toHaveCount(1);
  }
});

test("ordnet Daten beim Erreichen der Extraktionsszene sichtbar zu", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.waitForSelector('[data-scene="extract"]');
  const targetY = await page.evaluate(() => {
    const scene = document.querySelector<HTMLElement>('[data-scene="extract"]');
    if (!scene) return 0;
    const rect = scene.getBoundingClientRect();
    const top = window.scrollY + rect.top;
    const bottom = window.scrollY + rect.bottom;
    const start = top - window.innerHeight * 0.7;
    const end = bottom - window.innerHeight * 0.28;
    return start + (end - start) * 0.99;
  });
  await page.evaluate((y) => window.scrollTo(0, y), targetY);
  await page.waitForTimeout(700);
  await expect(page.locator('[data-database-counter]')).toHaveText('8 automatisch erkannt · 1 Prüfung erforderlich');
  await expect(page.locator('[data-flow-frame] .extraction-field--warning').getByText('Prüfung erforderlich')).toBeVisible();
});

test("Freigabe bleibt funktional", async ({ page }) => {
  await page.goto("/");
  const approval = page.locator('#kontrolle');
  await expect(approval.getByText('Freigabe erforderlich', { exact: true })).toBeVisible();
  await approval.getByRole('button', { name: 'Freigeben und senden' }).click();
  await expect(approval.getByText('Versendet', { exact: true })).toBeVisible();
  await expect(approval.getByText('Zahlungserinnerung versendet', { exact: true })).toBeVisible();
});

test("entfernt Dashboard und generische Benefits aus Site 2", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText('Aus einzelnen Dokumenten entsteht ein klares Bild.')).toHaveCount(0);
  await expect(page.getByText('Weniger Nachhalten. Mehr Klarheit über den Geldfluss.')).toHaveCount(0);
});

test("zeigt die gewünschte FAQ-Struktur", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText('Muss ich meine Rechnungen direkt in 0Admin erstellen?')).toBeVisible();
  await expect(page.getByText('Ersetzt 0Admin meine Buchhaltungs- oder Handwerkersoftware?')).toBeVisible();
});

test("stellt die Site-1-Unterseiten als statische Seiten bereit", async ({ page }) => {
  await page.goto('/rechner/index.html');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Was kosten offene Posten wirklich?');
  await page.goto('/cockpit/index.html');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Ein offener Zahlungsfall auf einen Blick.');
  await page.goto('/blog/index.html');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Wissen für Chefs');
});

test("hat keinen horizontalen Seitenüberlauf", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});
