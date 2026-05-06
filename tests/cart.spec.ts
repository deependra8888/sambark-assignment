import { test, expect } from "@playwright/test";

test("user can add product to cart", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await page.locator(".card").first().click();

  await page.getByText("Add To Cart").click();

  await page.getByText(/Cart \(/).click();

  await expect(page.locator(".card").first()).toBeVisible();
});