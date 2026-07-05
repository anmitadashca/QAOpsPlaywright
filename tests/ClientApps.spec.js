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
    await email.fill(emailValue);
    await password.fill("Abcde123@");
    await signInBtn.click();
    await page.waitForLoadState('networkidle');
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



test('test assignment client page registration',async ({page})=>{
    const regLink=page.locator("a.text-reset");
    const firstName=page.locator("#firstName");
    const lastname=page.locator("#lastName");
    const email=page.locator("#userEmail");
    const mobileNumber=page.locator("#userMobile");
    const password=page.locator("#userPassword");
    const confirmPassword=page.locator("#confirmPassword");
    const occupation=page.locator("select.custom-select");
    await page.goto("https://rahulshettyacademy.com/client");
    await regLink.click();
    await firstName.fill("Anmita");
    await lastname.fill("Dash");
    await email.fill("xyz123@gmail.com");
    await mobileNumber.fill("9876543210");
    await password.fill("Abcde123@");
    await confirmPassword.fill("Abcde123@");
    await occupation.selectOption("Engineer");
    await page.locator("input[type='radio']").last().click();
    await page.locator("input[type='checkbox']").first().check();
    await page.locator("#login").click();
    
})
test('Playwright special locators ',async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("Abcde123@");
    await page.getByRole("button",{"name": "Submit"}).click();
    expect(await page.getByText("Success! The Form has been submitted successfully!.").isVisible()).toBeTruthy();
    await page.getByRole("Link",{"name": "Shop"}).click();
    await page.locator("app-card").filter({hasText:"Blackberry"}).getByRole("button").click();


})