import { expect, test } from '@playwright/test';

test('zeigt Marke und Produkt', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Ihr Betrieb arbeitet');
  await expect(page.getByText('0Admin · Self-Operating Geldfluss-Office')).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
});

test('enthält den scrollbasierten Rechnungsablauf', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-flow-machine]')).toHaveCount(1);
  await expect(page.locator('[data-invoice-sheet]')).toBeVisible();
  await expect(page.locator('[data-scene]')).toHaveCount(6);
  await expect(page.getByText('Strukturierte Rechnungsdaten')).toBeVisible();
});

test('Freigabe bleibt interaktiv', async ({ page }) => {
  await page.goto('/');
  const field = page.getByLabel('Nachricht prüfen');
  await expect(field).toHaveAttribute('readonly', '');
  await page.getByRole('button', { name: 'Bearbeiten' }).click();
  await expect(field).not.toHaveAttribute('readonly', '');
  await page.getByRole('button', { name: 'Freigeben' }).click();
  await expect(page.getByText('Versendet', { exact: true })).toBeVisible();
});

test('FAQ beantwortet Integrationsfragen', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Muss ich meine Rechnungen direkt in 0Admin erstellen?')).toBeVisible();
  await expect(page.getByText('Ersetzt 0Admin meine Buchhaltungs- oder Handwerkersoftware?')).toBeVisible();
});

test('hat keinen horizontalen Überlauf', async ({ page }) => {
  await page.goto('/');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});
