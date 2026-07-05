class OrderHistoryPage{
    constructor(page){
        this.page=page;
        this.orderTable=page.locator("tbody");
    }   
    async validateOrderHistory(orderId){
    const orderTable = await this.orderTable;
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
    }
}
module.exports={OrderHistoryPage};