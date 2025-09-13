// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/Home-page';
import { AppsPage } from '../pages/Apps-page';

let homePage;
let apps;

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
    homePage = new HomePage(page);

    await expect(page).toHaveTitle(/TITAN OS/);
    let appList = await homePage.getAppList();
    expect(appList.length).toBeGreaterThan(0);
  });
});

test.describe('add an app to home page favourites apps', () => {
  test('from apps page', async ({ page }) => {
    homePage = new HomePage(page);
    // Get the initial list of favorite apps
    let favoriteAppsList = await homePage.getAppList();
    await homePage.goToTab('Apps');

    apps = new AppsPage(page);
    let appAdded = await apps.addRandomApp(favoriteAppsList);

    // Get the updated list of favorite apps and verify the app has been added and no other app
    let updatedFavoriteAppsList = await homePage.getAppList();
    expect(updatedFavoriteAppsList.length).toBe(favoriteAppsList.length + 1);
    expect(updatedFavoriteAppsList).toContain(appAdded);
  });
});

test.describe('delete apps in the home page favourite apps row', () => {
  test('delete an app', async ({ page }) => {
    homePage = new HomePage(page);
    let favoriteAppsList = await homePage.getAppList();

    if (favoriteAppsList.length === 0) {
      // If there are no favorite apps, add one first
      await homePage.goToTab('Apps');
      apps = new AppsPage(page);
      let appAdded = await apps.addRandomApp(favoriteAppsList);
      favoriteAppsList = await homePage.getAppList();
      expect(favoriteAppsList).toContain(appAdded);
    }

    // Now delete the first app in the favorite apps list
    const appToDelete = favoriteAppsList[0];
    await homePage.deleteApp();

    // Verify the app has been deleted
    let updatedFavoriteAppsList = await homePage.getAppList();
    expect(updatedFavoriteAppsList.length).toBe(favoriteAppsList.length - 1);
    expect(updatedFavoriteAppsList).not.toContain(appToDelete);
  });
});


test.describe('search page', () => {
  test('open a category', async ({ page }) => {

  });
});
