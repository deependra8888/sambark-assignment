import { test, expect } from "@playwright/test";

test("sorting works", async ({ page }) => {
  await page.goto("/");

  await page.selectOption("select", "low");

  await expect(page.locator(".card").first()).toBeVisible();
});