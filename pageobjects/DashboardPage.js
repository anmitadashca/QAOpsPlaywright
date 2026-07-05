const { expect } = require('@playwright/test');
class DashboardPage {
    constructor(page) {
        this.page = page;
        this.cardTitles = page.locator(".card-body b");
        this.products = page.locator(".card-body");
        this.cartButton = page.locator("[routerlink*='cart']");
    }
    async searchProductAddCart(productName) {
         await this.cardTitles.first().waitFor()
        await expect(this.cardTitles.first()).toBeVisible();
        const allTitles = await this.cardTitles.allTextContents();
        console.log(allTitles);
        console.log(await this.cardTitles.first().textContent());
        const count = await this.products.count();
        for (let i = 0; i < count; i++) {
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                await this.products.nth(i).locator("button").last().click();
                break;
            }
        }
    }
    async gotoCart() {
        await this.cartButton.click();
    }
}
module.exports = { DashboardPage };