const {LoginPage}=require('../pageobjects/LoginPage');
const {DashboardPage}=require('../pageobjects/DashboardPage');
const { MycartPage } = require('../pageobjects/MycartPage');
const {CheckoutPage}=require('../pageobjects/CheckoutPage');
const {OrderconfirmationPage}=require('../pageobjects/OrderconfirmationPage');
const {OrderHistoryPage}=require('../pageobjects/OrderHistoryPage');
const {orderSummaryPage}=require('../pageobjects/OrdersummaryPage');

class POManager{
    constructor(page){
        this.page=page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.mycartPage = new MycartPage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.orderconfirmationPage = new OrderconfirmationPage(page);
        this.orderHistoryPage = new OrderHistoryPage(page);
        this.orderSummaryPage = new orderSummaryPage(page);
    }
    getLoginPage(){
        return this.loginPage;
    }
    getDashboardPage(){
        return this.dashboardPage;
    }
    getMycartPage(){
        return this.mycartPage;
    }
    getCheckoutPage(){
        return this.checkoutPage;
    }
    getOrderconfirmationPage(){
        return this.orderconfirmationPage;
    }
    getOrderHistoryPage(){
        return this.orderHistoryPage;
    }
    getOrderSummaryPage(){
        return this.orderSummaryPage;
    }
}
module.exports={POManager};