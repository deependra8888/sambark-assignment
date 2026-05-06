import { test, expect } from "@playwright/test";

test("user can remove product from cart", async ({ page }) => {
  await page.goto("/");

  await page.locator(".card").first().click();

  await page.getByText("Add To Cart").click();

  await page.getByText(/Cart \(/).click();

  await page.getByText("Remove").click();

  await expect(
    page.getByText("Your cart is empty"),
  ).toBeVisible();
});