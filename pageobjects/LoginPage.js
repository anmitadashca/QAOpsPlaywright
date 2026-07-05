class LoginPage {
    constructor(page) {
        this.page = page;
        this.email = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.signInBtn = page.locator("#login");
    }
    async goto(url) {
        await this.page.goto(url);
    }
    async login(emailValue, passwordValue) {
        await this.email.fill(emailValue);
        await this.password.fill(passwordValue);
        await this.signInBtn.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = { LoginPage };