import { test, expect } from "@playwright/test";

test.describe("smoke testing", () => {
  test("demo test 1", async ({ page }) => {
    await page.goto("https://www.playwright.dev");
    await expect(page).toHaveTitle(/Playwright/);
  });
  test("demo test 2", async ({ page }) => {
    await page.goto("https://www.playwright.dev");
    await expect(page).toHaveTitle(/Playwright/);
  });
});
test.describe("sanity testing", () => {
  test("demo test 3", async ({ page }) => {
    await page.goto("https://www.playwright.dev");
    await expect(page).toHaveTitle(/Playwright/);
    await page.close();
  });
  test("demo test 4", async ({ page }) => {
    await page.goto("https://www.playwright.dev");
    await expect(page).toHaveTitle(/Playwright/);
    await page.close();
  });
  test("demo test 5", async ({ page }) => {
    await page.goto("https://www.playwright.dev");
    await expect(page).toHaveTitle(/Play/);
    await page.close();
  });
});
