const { test, expect, request } = require('@playwright/test');


test('Securitytest request interception', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client");
    const email = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const signInBtn = page.locator("#login");
    const emailValue = "abc109@gmail.com";
    const cardTitles = page.locator(".card-body b");
    await email.fill(emailValue);
    await password.fill("Abcde123@");
    await signInBtn.click();
    await page.waitForLoadState('networkidle');
    await cardTitles.first().waitFor();

    await page.locator("button[routerlink*='myorders']").click();
    const orderTable = await page.locator("tbody");
    await orderTable.waitFor();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }));
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
})