const { expect } = require('@playwright/test');

exports.AppsPage = class AppsPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.pageTestId = page.getByTestId('page')
        this.waitForLoadState = page.waitForLoadState('load')
    }

    async favoriteAppsList() {
        await this.pageTestId.press('ArrowDown')
        await this.pageTestId.press('ArrowDown')
        const favoriteAppsList = await this.page.locator('[data-testid="list-item-app_list-0"]').allInnerTexts();
        const arrayFavoriteAppList = favoriteAppsList[0].split(/\n/)
        arrayFavoriteAppList.shift()
        return arrayFavoriteAppList
    }

    async addRandomApp(favoriteAppsList) {
        const arrayAppList = await this.favoriteAppsList();

        // Select a random app index from the favorite apps list
        let randomAppIndex = Math.floor(Math.random() * arrayAppList.length);
        
        // console.log('Random app selected: ' + arrayAppList[randomAppIndex]);
        
        // Check if the random app selected is not in the favorite apps list or is PlayWorks, MEGOGO or Stingray
        let regex = /PlayWorks|MEGOGO|Stingray/;
        if (favoriteAppsList.includes(arrayAppList[randomAppIndex]) || regex.test(arrayAppList[randomAppIndex])) {
            // If the random app selected is in the favorite apps list, select another random app index
            let newRandomAppIndex;
            do {
                // Select a new random app index from the favorite apps list while the new random app index is in the favorite apps list or is PlayWorks, MEGOGO or Stingray
                newRandomAppIndex = Math.floor(Math.random() * arrayAppList.length);
            } while (favoriteAppsList.includes(arrayAppList[newRandomAppIndex]) || regex.test(arrayAppList[newRandomAppIndex]));
            randomAppIndex = newRandomAppIndex;
        }
        
        // Positioning in the app list to the selected app

        for (var i = 0; i < randomAppIndex; ++i) {
            await expect(this.page.getByTestId(arrayAppList[i]).first()).toHaveAttribute('data-focused', 'focused')
            await this.pageTestId.press('ArrowRight')
            await expect(this.page.getByTestId(arrayAppList[i + 1]).first()).toHaveAttribute('data-focused', 'focused')
        }

        await this.pageTestId.press('Enter');

        await this.page.waitForSelector('text=Add to Favourites', { timeout: 4000 });

        await expect(this.page.locator('[id="app-fav-button"]')).toHaveAttribute('data-focused', 'true')
        await this.page.locator('[id="app-fav-button"]').press('Enter');
        
        await this.page.waitForResponse(response => response.url().includes('v1/me/apps/update_positions?market=gb&device=tv&locale=en&firmware=unset') && response.status() === 200)

        await this.page.getByRole('heading', { name: 'Press OK to finish' }).waitFor();

        await this.pageTestId.press('Enter');

        await this.page.getByRole('heading', { name: 'Press OK to finish' }).waitFor({ state: 'hidden' });

        return arrayAppList[randomAppIndex];
    }

};