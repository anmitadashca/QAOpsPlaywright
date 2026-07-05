const { test, expect } = require('@playwright/test');

test.describe.configure({mode:'parallel'});
test('popup validation',{tag:'@Web'}, async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    page.on('dialog', dialog => dialog.accept());
    await page.locator("#alertbtn").click();
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    await page.locator(".mouse-hover-content").locator("a").nth(1).click();
    const frame =   page.frameLocator("#courses-iframe");
    await frame.getByRole('link', { name: 'Mentorship' }).click();   
    await expect(frame.locator(".page-title div h1")).toHaveText("Mentorship");

   
})
test('screenshot and visual comparison', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({ path: 'element.png' });
    await page.locator("#hide-textbox").click();
    await page.screenshot({ path: 'screenshot.png', fullPage: true });
    await expect(page.locator("#displayed-text")).toBeHidden();
})