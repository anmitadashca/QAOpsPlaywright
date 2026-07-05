const { Before, After } = require('@cucumber/cucumber');
const {AfterStep, BeforeStep, Status} = require('@cucumber/cucumber');
const playwright = require('@playwright/test');
const { POManager } = require('../../pageobjects/POManager');
Before(async function () {
    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    this.poManager = new POManager(page);
    this.page = page;
    this.browser = browser;
  })

  After(async function () {
  console.log('Closing the browser...');
  if (this.browser) {
    await this.browser.close();
  }

});
BeforeStep({tags: "@foo"}, function () {
  // This hook will be executed before all steps in a scenario with tag @foo
});

AfterStep( async function ({result}) {
  // This hook will be executed after all steps, and take a screenshot on step failure
  if (result.status === Status.FAILED) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await this.page.screenshot({ path: `screenshots/screenshot-${timestamp}.png` });
  }
});