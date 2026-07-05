const {test}=require('@playwright/test');
const {expect}=require('@playwright/test');

test('test assignment client page product page',async ({page})=>{
     await page.goto("https://rahulshettyacademy.com/client");
    const email=page.locator("#userEmail");
    const password=page.locator("#userPassword");
    const signInBtn=page.locator("#login");
    const cardTitles=page.locator(".card-body b");
    const products=page.locator(".card-body");
    const productName= "ZARA COAT 3";
    const emailValue="abc109@gmail.com";
    await page.getByPlaceholder("email@example.com").fill(emailValue);
    await page.getByPlaceholder("enter your passsword").fill("Abcde123@");
    await page.getByRole("button", { name: "login" }).click();
    await page.waitForLoadState('networkidle');
    await cardTitles.first().waitFor();
    await page.locator(".card-body").filter({hasText: "ZARA COAT 3"}).
    getByRole("button",{name: "Add to Cart"}).click();
    await page.getByRole("listitem").getByRole("button", { name: "Cart" }).click();
    await page.locator("div li").first().waitFor();
    expect(await page.getByText("ZARA COAT 3").isVisible()).toBeTruthy();
    await page.getByRole("button", { name: "Checkout" }).click();
    await page.locator('input.input.txt').nth(1).fill("123");
    await page.locator('input.input.txt').nth(2).fill("Neha");

    await page.getByPlaceholder('Select Country').pressSequentially("Ind",{delay:2000});
    await page.getByRole("button", { name: "India" }).nth(1).click();
    await expect(page.locator(".user__name label")).toHaveText(emailValue);
    await page.getByText("PLACE ORDER").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    //expect(await page.locator(".hero-primary").textContent()).toContain("Thankyou for the order.");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
    await page.locator("button[routerlink*='myorders']").click();
    const orderTable = await page.locator("tbody");
    await orderTable.waitFor();
    const orderCount = await orderTable.locator("tr").count();
    for (let i = 0; i < orderCount; i++) {
        const id = await orderTable.locator("tr").nth(i).locator("th").textContent();
        console.log(id);
        if (orderId.includes(id)) {
            console.log("order found");
            await orderTable.locator("tr").nth(i).locator("button").first().click();
            break;
        }
    }
    const orderDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderDetails)).toBeTruthy();


    
})
