const {test}=require('@playwright/test');
const {expect}=require('@playwright/test');


test('Browser context Playwright Test',{tag:'@Web'},async ({browser})=>{

    const context=await browser.newContext();
    const page=await context.newPage();

    page.route('**/*.{jpg,png,jpeg}', route => route.abort());
    const userName=page.locator("#username");
    const signInBtn=page.locator("#signInBtn");
    const cardTitles=page.locator(".card-body a");
    page.on('request', request => console.log(request.url()));
    page.on('response', response => console.log(response.url(), response.status()));
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    //css
    await userName.fill("rahulshetty");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await signInBtn.click();
    //webdriver wait
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signInBtn.click();
    console.log(await cardTitles.first().textContent());
    // console.log(await cardTitles.nth(1).textContent());
    await page.waitForLoadState('networkidle');
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
})

test('Page Playwright Test',{tag:'@Web'},async ({page})=>{
    await page.goto("https://google.com");
    //get title of the page and assert it
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
})
test('@Web UI Controls Test',{tag:'@Web'},async ({page})=>{
    const userName=page.locator("#username");
    const signInBtn=page.locator("#signInBtn");
    const dropdown=page.locator("select.form-control");
    const documentsLink=page.locator("[href*='documents-request']");
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   await userName.fill("rahulshettyacademy");
   await page.locator("[type='password']").fill("Learning@830$3mK2");
   await dropdown.selectOption("Consultant");
   await page.locator(".radiotextsty").last().click();
   await page.locator("#okayBtn").click();
   //assert that the radio button is checked
   await expect(page.locator(".radiotextsty").last()).toBeChecked();
   await page.locator("#terms").click();
   await expect(page.locator("#terms")).toBeChecked();
   await page.locator("#terms").uncheck();
   await expect(page.locator("#terms")).not.toBeChecked();
   expect(await page.locator("#terms").isChecked()).toBeFalsy();
   await expect(documentsLink).toHaveAttribute("class","blinkingText");
})

test('child window Playwright Test',async ({browser})=>{
    const context=await browser.newContext();
    const page=await context.newPage();
    const userName=page.locator("#username");
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");  
const documentsLink=page.locator("[href*='documents-request']");

const [newPage] = await Promise.all([
  page.waitForEvent('popup'),
  documentsLink.click(),
])
const text=await newPage.locator(".red").textContent();
const arraytext=text.split("@");
const domain=arraytext[1].split(" ")[0];
console.log(domain);
await page.locator("#username").fill(domain);
console.log(await page.locator("#username").inputValue());
newPage.close();

})
