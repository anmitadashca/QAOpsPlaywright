const { expect } = require('@playwright/test');
class OrderconfirmationPage {
    constructor(page) {
        this.page = page;
        this.confirmationMsg = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
        this.orderHistoryBtn = page.locator("button[routerlink*='myorders']");
    }
    async getConfirmationMsg() {
        await expect(this.confirmationMsg).toHaveText(" Thankyou for the order. ");
        const orderId = await this.orderId.textContent();
        console.log(orderId);
        return orderId;

    }
    async goToOrderHistory() {
        await this.orderHistoryBtn.click();
    }
}
module.exports = { OrderconfirmationPage };