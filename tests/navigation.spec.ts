import { test, expect } from "@playwright/test";

test("user can navigate back to home", async ({ page }) => {
  await page.goto("/");

  await page.locator(".card").first().click();

  await page.getByText("← Back To Home").click();

  await expect(
    page.getByText("Products"),
  ).toBeVisible();
});