const { test, expect } = require('@playwright/test');

test('Calendar test', async ({ page }) => {
    const monthNumber= "6";
    const yearNumber= "2027";
    const dateNumber= "10";
    const expectedList=[monthNumber,dateNumber,yearNumber];
    await page.goto("https://rahulshettyacademy.com/seleniumPractise");
    const topDealPage = await page.locator("[href*='#/offers']");
    const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        topDealPage.click(),
    ])
    //await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await newPage.locator(".react-date-picker__inputGroup").click();
    await newPage.locator(".react-calendar__navigation__label").click();
    await newPage.locator(".react-calendar__navigation__label").click();
    await newPage.getByText(yearNumber).click();
    await newPage.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
    await newPage.locator("//abbr[text()='" + dateNumber + "']").click();
    const inputs= await newPage.locator(".react-date-picker__inputGroup__input");

    for(let i=0;i<expectedList.length;i++){
        await expect(inputs.nth(i)).toHaveValue(expectedList[i]);
    }


})