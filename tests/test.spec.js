// @ts-check
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test.describe('add an app to home page favourites apps from apps page', () => {
  test('', async ({ page }) => {

  });
});


test.describe('open a category from the search page', () => {
  test('', async ({ page }) => {

  });
});

test.describe('Verify channels page is available to users', () => {
  test('', async ({ page }) => {

    await expect(page).toHaveTitle(/TITAN OS/);
  });
});

  // test('get started link', async ({ page }) => {
  //   await page.goto('https://playwright.dev/');

  //   // Click the get started link.
  //   await page.getByRole('link', { name: 'Get started' }).click();

  //   // Expects page to have a heading with the name of Installation.
  //   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  // });
