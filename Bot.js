const puppeteer = require("puppeteer");

const URL = '';
const specifiedSize = '10';
const username = '';
const password = '';
const cvNum = '';

(async () => {
    // setting headless to false for now
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setViewport({width:1000, height:1250});

    await page.goto(URL);
    await page.waitForSelector(".add-to-cart-form.nike-buying-tools");

    await page.evaluate((specifiedSize) => {
        const sizeDropDown = document.querySelectorAll(".add-to-cart-form.nike-buying-tools div fieldset div div input");
        let specifiedIndex = Array.from(sizeDropDown)
                .map((item, index) => (item.getAttribute("value").split(":")[1] === specifiedSize ? i : false))
                .filter(Boolean)[0];
        
        sizeDropDown[specifiedIndex].click();
    }, specifiedSize);
    
    // await page.click('button[class="ncss-btn-primary-dark btn-lg add-to-cart-btn"]');
    
    await page.click('div[id="nav-cart"]');
    await page.click('button[class=" css-w74byb-PrimaryDarkButton-buttonPaddingBorderRadiusStyles-disabledButtonStyles-primaryDisabledStyles-primaryDarkButtonStyles e1udugn30"]')

    await page.click('button[class="nds-btn css-16hl5qm ex41m6f0 btn-primary-dark  btn-lg"]');

    await page.waitForSelector('#username');
    await page.type("#username", username);

    await page.waitForSelector('#password');
    await page.type("#password", password);

    await page.click('button[class="css-14l6ovh btn-primary-dark  btn-lg]"')

    await page.waitForSelector('#cvNumber');
    await page.type('#cvNumber', cvNum);

    await page.click('button[class="nds-btn css-cokkoa ex41m6f0 btn-primary-dark  btn-md"]');
    await browser.close();
})();