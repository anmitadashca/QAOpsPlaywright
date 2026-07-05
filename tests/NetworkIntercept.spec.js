const { test, expect, request } = require('@playwright/test');
const { APIUtils } =require('../utils/APIUtils');
const loginPayload = { userEmail: "abc109@gmail.com", userPassword: "Abcde123@" };
const createOrderPayload= {orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]}
const fakePayloadOrders={data:[], message: "No Orders"};
let response;
test.beforeAll(   async() => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext,loginPayload);
    response = await apiUtils.createOrder(createOrderPayload);
});

test('NetworkIntercept', async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem("token", value);
    }, response.token);
   
    await page.goto("https://rahulshettyacademy.com/client");
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route=>{
            //intercepting the response--API Response-->fake response-->browser-->render data on ui
            const response = await page.request.fetch(route.request());
            route.fulfill({
                response,
                body: JSON.stringify(fakePayloadOrders)
            });
        }
    )
    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator(".mt-4").textContent());

    


})
