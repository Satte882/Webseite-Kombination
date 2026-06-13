import { expect, test } from "@playwright/test";

test("zeigt Site-1-Marke und 0Admin-Produktkern", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Ihr Betrieb arbeitet");
  await expect(page.locator(".s1-brand img")).toHaveAttribute("src", "/images/logo.png");
  await expect(page.getByText("0Admin von DPPFOR", { exact: true })).toHaveCount(1);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});

test("enthält eine persistente Rechnung und acht animierte Datenwege", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("[data-flow-frame] [data-flow-invoice]")).toHaveCount(1);
  const keys = ["invoiceNumber", "debtor", "invoiceDate", "dueDate", "net", "vat", "gross", "status"];
  for (const key of keys) {
    await expect(page.locator(`[data-invoice-field="${key}"]`)).toHaveCount(1);
    await expect(page.locator(`[data-db-field="${key}"]`)).toHaveCount(1);
    await expect(page.locator(`[data-fly-field="${key}"]`)).toHaveCount(1);
    await expect(page.locator(`[data-flow-line="${key}"]`)).toHaveCount(1);
  }
});

test("zeigt die korrigierte Produktlogik im Scroll-Flow", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.getByText("Ihre Rechnung ist fertig. Ab jetzt übernimmt 0Admin.")).toBeVisible();
  await expect(page.getByText("Rechnung ausstellen")).toHaveCount(0);
  await expect(page.locator("[data-source-label]")).toHaveText("Bestehende Rechnungssoftware");
});

test("versteckt Flugchips vor der Extraktion", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.waitForSelector("[data-flow-frame]");
  await page.waitForTimeout(300);
  const visibleFlyers = await page.locator("[data-fly-field]").evaluateAll((items) => items.filter((item) => {
    const style = window.getComputedStyle(item);
    const rect = item.getBoundingClientRect();
    return style.visibility !== "hidden" && Number(style.opacity) > 0.01 && rect.width > 0 && rect.height > 0;
  }).length);
  expect(visibleFlyers).toBe(0);
});

test("ordnet erkannte und prüfbedürftige Felder beim Scrollen korrekt zu", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.waitForSelector("[data-scene='extract']");
  const targetY = await page.evaluate(() => {
    const scene = document.querySelector<HTMLElement>("[data-scene='extract']");
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
  await expect(page.locator("[data-database-counter]")).toHaveText("8 automatisch erkannt · 1 Prüfung erforderlich");
  await expect(page.locator("[data-flow-frame] .extraction-field--warning").getByText("Prüfung erforderlich")).toBeVisible();
});

test("versendet die Zahlungserinnerung erst nach Freigabe", async ({ page }) => {
  await page.goto("/");
  const approval = page.locator("#kontrolle");
  await expect(approval.getByText("Freigabe erforderlich", { exact: true })).toBeVisible();
  await expect(approval.getByText("Versand gesperrt", { exact: true })).toBeVisible();
  await approval.getByRole("button", { name: "Freigeben und senden" }).click();
  await expect(approval.getByText("Versendet", { exact: true })).toBeVisible();
  await expect(approval.getByText("Zahlungserinnerung versendet", { exact: true })).toBeVisible();
});

test("Bearbeiten aktiviert das Nachrichtenfeld", async ({ page }) => {
  await page.goto("/");
  const textarea = page.getByLabel("Nachricht prüfen");
  await expect(textarea).toHaveAttribute("readonly", "");
  await page.getByRole("button", { name: "Bearbeiten" }).click();
  await expect(textarea).not.toHaveAttribute("readonly", "");
  await expect(textarea).toBeFocused();
});

test("entfernt Dashboard und generische Benefits aus Site 2", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Aus einzelnen Dokumenten entsteht ein klares Bild.")).toHaveCount(0);
  await expect(page.getByText("Weniger Nachhalten. Mehr Klarheit über den Geldfluss.")).toHaveCount(0);
});

test("zeigt die gewünschte FAQ-Struktur", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Muss ich meine Rechnungen direkt in 0Admin erstellen?")).toBeVisible();
  await expect(page.getByText("Ersetzt 0Admin meine Buchhaltungs- oder Handwerkersoftware?")).toBeVisible();
});

test("hat keinen horizontalen Seitenüberlauf", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});
