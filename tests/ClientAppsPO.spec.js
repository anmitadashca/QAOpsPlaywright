const { test } = require('@playwright/test');
const {customtest} = require('../utils/test-base');
const { expect } = require('@playwright/test');
const { log } = require('node:console');
const { POManager } = require('../pageobjects/POManager');
//JSON-->String-->js object
const dataset = JSON.parse(JSON.stringify(require('../utils/placeorderTestData.json')));


for (const data of dataset) {
test(`test assignment client page product page ${data.productName}`, { tag: '@Web' }, async ({ page }) => {
    const poManager = new POManager(page);
    await poManager.getLoginPage().goto("https://rahulshettyacademy.com/client");
    await poManager.getLoginPage().login(data.username, data.password);
    await poManager.getDashboardPage().searchProductAddCart(data.productName);
    await poManager.getDashboardPage().gotoCart();
    await poManager.getMycartPage().validateProductInCart(data.productName);
    await poManager.getCheckoutPage().fillDetailsInCheckout(data.username);
    await poManager.getCheckoutPage().searchCountryAndSelect("Ind", " India", data.username);
    const orderId = await poManager.getOrderconfirmationPage().getConfirmationMsg();
    await poManager.getOrderconfirmationPage().goToOrderHistory();
    await poManager.getOrderHistoryPage().validateOrderHistory(orderId);
    await poManager.getOrderSummaryPage().validateOrderSummary(orderId);

});
}
customtest('test assignment client page product page', async ({ page, testDataForOrder }) => {
    const poManager = new POManager(page);
    await poManager.getLoginPage().goto("https://rahulshettyacademy.com/client");
    await poManager.getLoginPage().login(testDataForOrder.username, testDataForOrder.password);
    await poManager.getDashboardPage().searchProductAddCart(testDataForOrder.productName);
    await poManager.getDashboardPage().gotoCart();
    await poManager.getMycartPage().validateProductInCart(testDataForOrder.productName);
});