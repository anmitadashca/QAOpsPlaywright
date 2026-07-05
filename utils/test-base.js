const base = require('playwright/test');

exports.customtest=base.test.extend(
    {
        testDataForOrder: {
            username: "abc109@gmail.com",
            password: "Abcde123@",
            productName: "ZARA COAT 3"
        }
    }
);