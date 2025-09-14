const { expect } = require('@playwright/test');

exports.SearchPage = class SearchPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.pageTestId = page.getByTestId('page')
        this.waitForLoadState = page.waitForLoadState('load')
        this.searchTextbox = page.getByRole('textbox', { name: 'Search Movies, Shows, Apps' })
        this.getList = page.locator('[id="search-genres"]');
    }

    async goToSearchPage() {
        await this.pageTestId.press('ArrowUp')
        await this.pageTestId.press('ArrowUp')
        await this.pageTestId.press('ArrowLeft')
        await Promise.all([
            this.pageTestId.press('Enter'),
            this.page.waitForSelector('text=Press OK to start typing', { timeout: 4000 }),
        ]);
    }

    async writeCategory(category) {
        await Promise.all([
            this.searchTextbox.fill(category),
            this.page.waitForResponse(response => response.url().includes('contents') && response.status() === 200)
        ]);
    }

    async getCategoryList() {
        const catList = await this.getList.allInnerTexts()
        catList[0].split(/\n/)
        // remove the positions '' strings
        return catList[0].split(/\n/).filter(cat => cat.trim() !== '');
    }

    async navigateToRandomCategory() {
        const categoryList = await this.getCategoryList();

        const randomIndex = Math.floor(Math.random() * categoryList.length);
        const categoryToBeSelected = categoryList[randomIndex];

        const row = Math.trunc(randomIndex / 6)
        const col = randomIndex % 6

        for (let i = 0; i <= row; i++) {
            await this.page.keyboard.press('ArrowDown');
        }
        for (let j = 0; j < col; j++) {
            await this.page.keyboard.press('ArrowRight');
        }
        await Promise.all([
            this.page.keyboard.press('Enter'),
            this.page.waitForResponse(response => response.url().includes('contents') && response.status() === 200)
        ]);        
        
        return categoryToBeSelected;
    }
};