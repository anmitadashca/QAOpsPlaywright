const { When, Then, Given, setDefaultTimeout } = require('@cucumber/cucumber');
const { POManager } = require('../../pageobjects/POManager');
const { chromium, expect } = require('@playwright/test');
const playwright = require('@playwright/test');
setDefaultTimeout(60000);

Given('a login to the ecommerce site with username {string} and password {string}', async function (username, password) {

    await this.poManager.getLoginPage().goto("https://rahulshettyacademy.com/client");
    await this.poManager.getLoginPage().login(username, password);
});

When('I add {string} to the cart',  async function (productName) {
    await this.poManager.getDashboardPage().searchProductAddCart(productName);
    await this.poManager.getDashboardPage().gotoCart();
   
});

Then('Verify {string} is displayed in the cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
   await this.poManager.getMycartPage().validateProductInCart(productName);
});

When('enter valid details and place the order', async function () {
    // Write code here that turns the phrase above into concrete actions
   await this.poManager.getCheckoutPage().fillDetailsInCheckout("abc109@gmail.com");
    await this.poManager.getCheckoutPage().searchCountryAndSelect("Ind", " India", "abc109@gmail.com");
    this.orderId = await this.poManager.getOrderconfirmationPage().getConfirmationMsg();

});

Then('Verify the order is presented in the orderHistory', async function () {
    // Write code here that turns the phrase above into concrete actions
    await this.poManager.getOrderconfirmationPage().goToOrderHistory();
    await this.poManager.getOrderHistoryPage().validateOrderHistory(this.orderId);
    await this.poManager.getOrderSummaryPage().validateOrderSummary(this.orderId);
    
});
Given('a login to the ecommerce2 site with username {string} and password {string}', async function (username, password) {
    const userName=this.page.locator("#username");
    const signInBtn=this.page.locator("#signInBtn");
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    //css
    await userName.fill(username);
    await this.page.locator("[type='password']").fill(password);
    await signInBtn.click();
    //webdriver wait
    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText("Incorrect");
});

Then('verify error message is displayed', async function () {
    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText("Incorrect");
});