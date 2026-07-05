const {expect}=require('@playwright/test');
class orderSummaryPage{
    constructor(page){
        this.page=page;
        this.orderDetails=page.locator(".col-text");
    }
    async validateOrderSummary(orderId){
        const orderDetailsText = await this.orderDetails.textContent();
        expect(orderId.includes(orderDetailsText)).toBeTruthy();
    }
}
module.exports={orderSummaryPage};