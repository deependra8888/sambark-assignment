import { test, expect } from "@playwright/test";

test("filters persist after refresh", async ({ page }) => {
  await page.goto("/");

  const checkbox = page
    .locator('input[type="checkbox"]')
    .nth(1);

  await checkbox.click();

  await page.reload();

  await expect(checkbox).toBeChecked();
});