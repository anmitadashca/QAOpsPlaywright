const {expect}=require('@playwright/test');
class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.cvv=page.locator('input.input.txt').nth(1);
        this.nameOnCard=page.locator('input.input.txt').nth(2);
        this.country=page.locator("[placeholder*='Select Country']");
        this.actualEmail=page.locator(".user__name label");
        this.submitBtn=page.locator(".action__submit");

    }
    async fillDetailsInCheckout() {
        await this.cvv.fill("123");
        await this.nameOnCard.fill("Neha");
    }
    async searchCountryAndSelect(searchText,countryName,emailValue){
        await this.country.pressSequentially(searchText, { delay: 100 });
        const countryResults = this.page.locator(".ta-results");
        await countryResults.waitFor();
        const optionCount = await countryResults.locator("button").count();
        for (let i = 0; i < optionCount; i++) {
            const text = await countryResults.locator("button").nth(i).textContent();
            if (text === countryName) {
                console.log(text);
                await countryResults.locator("button").nth(i).click();
                break;
            }
        }
        await expect(this.actualEmail).toHaveText(emailValue);
        await this.submitBtn.click();
    }
}
module.exports = { CheckoutPage };
