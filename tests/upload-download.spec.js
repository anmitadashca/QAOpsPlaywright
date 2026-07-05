const Exceljs = require('exceljs');
const { test, expect } = require('@playwright/test');
const fs = require('fs');

async function writeExcelTest(searchText, newValue, change, filePath) {

    const workbook = new Exceljs.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet('Sheet1');
    const output1 = await readExcel(worksheet, searchText);

    const cell = worksheet.getCell(output1.row+change.rowChange, output1.col+change.colChange);
    cell.value = newValue;
    await workbook.xlsx.writeFile(filePath);
};

async function readExcel(worksheet, searchText) {
    let output = { row: -1, col: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.col = colNumber;
            }

        })
    })
    return output;

};

//writeExcelTest("Apple","iPhone","/Users/anmit/Downloads/exceldownloadTest.xlsx");
test('upload and download excel validation', async ({ page }) => {
    const textSearch = 'Apple';
    const updateValue = '390';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    const download = await downloadPromise;
    const suggested = await download.suggestedFilename();
    const filePath = `./downloads/${suggested}`;
    await download.saveAs(filePath);
    const fileExists = fs.existsSync(filePath);
    await expect.soft(fileExists, `File should be saved at ${filePath}`).toBeTruthy();
    await writeExcelTest("Apple", updateValue,{rowChange:0,colChange:2}, "./downloads/download.xlsx");
    await page.locator("#fileinput").setInputFiles("./downloads/download.xlsx");
    const textLocator = await page.getByText(textSearch);
    const desiredRow = await page .getByRole('row').filter({ has: textLocator });
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue.toString());

})