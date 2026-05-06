import { test, expect } from "@playwright/test";

test("product detail page opens", async ({ page }) => {
  await page.goto("/");

  await page.locator(".card").first().click();

  await expect(
    page.getByText("Add To Cart"),
  ).toBeVisible();
});