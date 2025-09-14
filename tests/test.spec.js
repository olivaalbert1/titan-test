// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/Home-page';
import { AppsPage } from '../pages/Apps-page';
import { SearchPage } from '../pages/Search-page';

let homePage;
let apps;
let searchPage;

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

    // search the app added in the updated favorite apps array
    let isAppAdded = updatedFavoriteAppsList.find(app => app === appAdded);
    expect(isAppAdded).toBe(appAdded);
  });
});

test.describe('delete apps in the home page favourite apps row', () => {
    // TODO: there are some apps that cannot be deleted, need to handle that case
    // TODO: handle the case when there is no apps to delete

  test('delete an app', async ({ page }) => {
    homePage = new HomePage(page);
    let favoriteAppsList = await homePage.getAppList();

    // Delete the last app in the favorite apps list
    const appToDelete = favoriteAppsList[favoriteAppsList.length - 1];

    await homePage.positioningInAppList(favoriteAppsList, favoriteAppsList.length - 1);

    await homePage.deleteApp();

    // Verify the app has been deleted
    let updatedFavoriteAppsList = await homePage.getAppList();

    expect(updatedFavoriteAppsList.length).toBe(favoriteAppsList.length - 1);
    expect(updatedFavoriteAppsList).not.toContain(appToDelete);
  });
});


test.describe('search page', () => {
  test('open a category by writing', async ({ page }) => {
    searchPage = new SearchPage(page);
    await searchPage.goToSearchPage();

    await searchPage.writeCategory('Horror');

    expect(page.url()).toContain('/search?q=Horror');
  });

  test('open a category by navigating', async ({ page }) => {
    searchPage = new SearchPage(page);
    await searchPage.goToSearchPage();

    let selectedCategory = await searchPage.navigateToRandomCategory();

    // replace spaces with + and & with %26 in the selectedCategory string
    const encodedCategory = selectedCategory.replace(/ /g, '+').replace(/&/g, '%26');

    expect(page.url()).toContain(`/search?q=${encodedCategory}`);
  });
});
