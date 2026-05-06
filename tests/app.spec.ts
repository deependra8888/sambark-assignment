import {
  test,
  expect,
} from "@playwright/test";

test.beforeEach(async ({
  page,
}) => {
  await page.goto(
    "http://localhost:5173",
  );

  await page.evaluate(() => {
    localStorage.clear();
  });
});

test("home page loads correctly", async ({
  page,
}) => {
  await page.goto(
    "http://localhost:5173",
  );

  await expect(
    page.getByRole("heading", {
      name: /products/i,
    }),
  ).toBeVisible();
});

test("products are displayed", async ({
  page,
}) => {
  await page.goto(
    "http://localhost:5173",
  );

  await expect(
    page.locator(".card").first(),
  ).toBeVisible();
});

test("navigate to product detail page", async ({
  page,
}) => {
  await page.goto(
    "http://localhost:5173",
  );

  await page
    .locator(".card")
    .first()
    .click();

  await expect(
    page.getByRole("button", {
      name: /add to cart/i,
    }),
  ).toBeVisible();
});

test("add product to cart", async ({
  page,
}) => {
  await page.goto(
    "http://localhost:5173",
  );

  await page
    .locator(".card")
    .first()
    .click();

  await page
    .getByRole("button", {
      name: /add to cart/i,
    })
    .click();

  await page
    .getByRole("link", {
      name: /cart/i,
    })
    .click();

  await expect(
    page.locator(".card"),
  ).toHaveCount(1);
});

test("remove product from cart", async ({
  page,
}) => {
  await page.goto(
    "http://localhost:5173",
  );

  await page
    .locator(".card")
    .first()
    .click();

  await page
    .getByRole("button", {
      name: /add to cart/i,
    })
    .click();

  await page.goto(
    "http://localhost:5173/cart",
  );

  await page
    .getByRole("button", {
      name: /remove/i,
    })
    .click();

  await expect(
    page.getByText(
      /your cart is empty/i,
    ),
  ).toBeVisible();
});

test("category filter works", async ({
  page,
}) => {
  await page.goto(
    "http://localhost:5173",
  );

  const checkbox =
    page.getByRole("checkbox", {
      name: /electronics/i,
    });

  await checkbox.click();

  await expect(
    checkbox,
  ).toBeChecked();

  await expect(page).toHaveURL(
    /categories=/
  );

  await expect(
    page.locator(".card").first(),
  ).toBeVisible();
});

test("sorting works", async ({
  page,
}) => {
  await page.goto(
    "http://localhost:5173",
  );

  await page.selectOption(
    "select",
    "low",
  );

  await expect(
    page.locator("select"),
  ).toHaveValue("low");

  await expect(page).toHaveURL(
    /sort=low/
  );
});

test("filters persist after navigation", async ({
  page,
}) => {
  await page.goto(
    "http://localhost:5173",
  );

  await page
    .getByRole("checkbox", {
      name: /electronics/i,
    })
    .click();

  await page.selectOption(
    "select",
    "high",
  );

  await page
    .locator(".card")
    .first()
    .click();

  await page
    .getByRole("link", {
      name: /back to home/i,
    })
    .click();

  await expect(
    page.locator("select"),
  ).toHaveValue("high");

  await expect(page).toHaveURL(
    /categories=.*sort=high/
  );
});