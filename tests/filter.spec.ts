import { test, expect } from "@playwright/test";

test("category filter works", async ({ page }) => {
  await page.goto("http://localhost:5173");

  const checkbox = page
    .locator('input[type="checkbox"]')
    .nth(1);

  await checkbox.click();

  await expect(page.locator(".card").first()).toBeVisible();
});