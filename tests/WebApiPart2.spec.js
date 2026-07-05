//login Ui-->.json
let webContext;

const { test, expect, request } = require('@playwright/test');
test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
     await page.goto("https://rahulshettyacademy.com/client");
     await page.locator("#userEmail").fill("abc109@gmail.com");
     await page.locator("#userPassword").fill("Abcde123@");
     await page.locator("#login").click();
     await page.waitForLoadState('networkidle');
     await context.storageState({path:"state.json"});
     webContext = await browser.newContext({storageState:"state.json"});
})



test('@API test assignment client page product page',async ()=>{

    const page=await webContext.newPage();

    const cardTitles=page.locator(".card-body b");
    const products=page.locator(".card-body");
    const productName= "ZARA COAT 3";
    const emailValue="abc109@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    await cardTitles.first().waitFor();
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
    console.log(await cardTitles.first().textContent());
    const count=await products.count();
    for(let i=0;i<count;i++){
       if(await products.nth(i).locator("b").textContent() === productName){
           await products.nth(i).locator("button").last().click();
           break;
       }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    expect(await page.locator("h3:has-text('ZARA COAT 3')").isVisible()).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator('input.input.txt').nth(1).fill("123");
    await page.locator('input.input.txt').nth(2).fill("Neha");
    await page.locator("[placeholder*='Select Country']").pressSequentially("Ind",{delay:100});
    const countryResults =page.locator(".ta-results");
    await countryResults.waitFor();
    const optionCount=await countryResults.locator("button").count();
    for(let i=0;i<optionCount;i++){
        const text=await countryResults.locator("button").nth(i).textContent();
        if( text === " India"){
            console.log(text);
            await countryResults.locator("button").nth(i).click();
            break;
        }
    }
        await expect(page.locator(".user__name label")).toHaveText(emailValue);
        await page.locator(".action__submit").click();
        await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
        //expect(await page.locator(".hero-primary").textContent()).toContain("Thankyou for the order.");
        const orderId=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
        console.log(orderId);
        await page.locator("button[routerlink*='myorders']").click();
        const orderTable=await page.locator("tbody");
        await orderTable.waitFor();
        const orderCount=await orderTable.locator("tr").count();
        for(let i=0;i<orderCount;i++){
            const id=await orderTable.locator("tr").nth(i).locator("th").textContent();
            console.log(id);
            if(orderId.includes(id)){
                console.log("order found");
                await orderTable.locator("tr").nth(i).locator("button").first().click();
                break;
            }   
        }
        const orderDetails=await page.locator(".col-text").textContent();
        expect(orderId.includes(orderDetails)).toBeTruthy();
        

    
})
