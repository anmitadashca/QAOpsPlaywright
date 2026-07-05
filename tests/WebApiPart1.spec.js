const { test, expect, request } = require('@playwright/test');
const { APIUtils } =require('../utils/APIUtils');
const loginPayload = { userEmail: "abc109@gmail.com", userPassword: "Abcde123@" };
const createOrderPayload= {orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]}
let response;
test.beforeAll(   async() => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext,loginPayload);
    response = await apiUtils.createOrder(createOrderPayload);
});

test('@API place order with token passed in cookie', async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem("token", value);
    }, response.token);
    const cardTitles = page.locator(".card-body b");
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";
    const emailValue = "abc109@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*='myorders']").click();
    const orderTable = await page.locator("tbody");
    await orderTable.waitFor();
    const orderCount = await orderTable.locator("tr").count();
    for (let i = 0; i < orderCount; i++) {
        const id = await orderTable.locator("tr").nth(i).locator("th").textContent();
        console.log(id);
        if (response.orderid.includes(id)) {
            console.log("order found");
            await orderTable.locator("tr").nth(i).locator("button").first().click();
            break;
        }
    }
    const orderDetails = await page.locator(".col-text").textContent();
    await page.pause();
    expect(response.orderid.includes(orderDetails)).toBeTruthy();


})
