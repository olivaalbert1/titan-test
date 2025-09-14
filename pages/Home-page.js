const { expect } = require('@playwright/test');

exports.HomePage = class HomePage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getList = page.locator('[id="favourite-apps"]');
    this.getMenu = page.locator('[role="menubar"]');
    this.pageTestId = page.getByTestId('page')
    this.waitForLoadState = page.waitForLoadState('load')
  }

  async goto() {
    await this.page.goto('/', { waitUntil: 'networkidle' });
  }

  async getAppList() {
    const appList = await this.getList.allInnerTexts()
    return appList[0].split(/\n/)
  }

  async goToTab(tabName) {
    const menuItems = await this.getMenu.allInnerTexts()
    const menuItemsArray = menuItems[0].split(/\n/)

    await this.pageTestId.press('ArrowUp')
    await this.pageTestId.press('ArrowUp')

    for (let i = 0; i < menuItemsArray.length; i++) {
      if (menuItemsArray[i] === tabName) {
        await this.pageTestId.press('Enter')
        await this.waitForLoadState
        break
      } else {
        await this.pageTestId.press('ArrowRight')
      }
    }

    await Promise.all([
      this.page.waitForSelector('text=Featured Apps', { timeout: 4000 }),
      this.page.waitForResponse(response => 
        response.url().includes('/events') &&
        response.status() === 202 &&
        response.request().postData().includes('"event_type":"ad"')),
    ])

  }

  async positioningInAppList(favoriteAppsList, appPosition) {
    for (let i = 0; i < favoriteAppsList.length; i++) {
      if (i === appPosition) {
        await expect(this.page.getByTestId(favoriteAppsList[i]).first()).toHaveAttribute('data-focused', 'focused')
        break
      } else {
        await expect(this.page.getByTestId(favoriteAppsList[i]).first()).toHaveAttribute('data-focused', 'focused')
        await this.pageTestId.press('ArrowRight')
        await expect(this.page.getByTestId(favoriteAppsList[i + 1]).first()).toHaveAttribute('data-focused', 'focused')
      }
    }
  }

  async deleteApp() {
    await this.page.waitForSelector('text=Press and hold', { timeout: 4000 })
    await this.page.keyboard.down('Enter')
    await this.page.waitForSelector('text=to finish', { timeout: 4000 })
    await this.page.keyboard.up('Enter')
    await this.pageTestId.press('ArrowDown');
    await this.page.waitForSelector('text=to remove', { timeout: 4000 })
    await Promise.all([
      this.page.waitForResponse(response => response.url().includes('/v1/me/apps?market=gb&device=tv&locale=en&firmware=unset&app_id') && response.status() === 204),
      this.page.getByRole('heading', { name: 'Press OK to remove' }).isHidden(),
      this.pageTestId.press('Enter')
    ])
    await this.page.waitForResponse(response => response.url().includes('/internet_check/') && response.status() === 200)
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');
  }

  async goToSearchPage() {
    await this.pageTestId.press('ArrowUp')
    await this.pageTestId.press('ArrowUp')
    await this.pageTestId.press('ArrowLeft')
    await this.pageTestId.press('Enter')
    await this.waitForLoadState
    await this.page.waitForSelector('[id="focusable-movie-1"]')
  }

  async navigateToCategory(catNum, categoryToBeSelected) {
    const row = Math.trunc(catNum / 6)
    const col = catNum % 6

    for (let i = 0; i <= row; i++) {
      await this.page.getByTestId(categoryToBeSelected).press('ArrowDown')
    }
    for (let j = 0; j < col; j++) {
      await this.page.getByTestId(categoryToBeSelected).press('ArrowRight')
    }
    await this.page.getByTestId(categoryToBeSelected).press('Enter');
    await this.waitForLoadState
  }
};