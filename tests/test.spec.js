// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/Home-page';

let homePage;


test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  await homePage.goto();
  await homePage.waitForLoadState;
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test.describe('Verify if is available to users', () => {
  test('channels page', async ({ page }) => {

    await expect(page).toHaveTitle(/TITAN OS/);
  });
});

test.describe('add an app to home page favourites apps', () => {
  test('from apps page', async ({ page }) => {

  });
});


test.describe('search page', () => {
  test('open a category', async ({ page }) => {

  });
});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
