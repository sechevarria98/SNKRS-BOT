const puppeteer = require("puppeteer");

const URL = 'https://www.nike.com/t/air-force-1-07-mens-shoes-5QFp5Z/CW2288-111';
const specifiedSize = '10';
const purchase = false;

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

    /********
     * The inner text for the size list item can range between two different options
     * 1. M 10 / W 11.5, 2. 10
     * The value from the <input> tag will look like the following 25634225:10 in
     * either case. The value after the : will be the desired size. 
     ********/
    await page.evaluate((specifiedSize) => {
        const sizeDropDown = document.querySelectorAll(".add-to-cart-form.nike-buying-tools div fieldset div div input");
        let specifiedIndex = Array.from(sizeDropDown)
                .map((item, index) => (item.getAttribute("value").split(":")[1] === specifiedSize ? index : false))
                .filter(Boolean)[0];

        sizeDropDown[specifiedIndex].click();
    }, specifiedSize);

    // Click the "Add to Bag" button
    await page.click('button[class="ncss-btn-primary-dark btn-lg add-to-cart-btn"]');
    
    // Navigate to the cart and proceed to checkout
    await page.click('div[id="nav-cart"]');
    await page.click('button[class=" css-w74byb-PrimaryDarkButton-buttonPaddingBorderRadiusStyles-disabledButtonStyles-primaryDisabledStyles-primaryDarkButtonStyles e1udugn30"]')

    // Will prompt for sign in
    await page.click('button[class="nds-btn css-16hl5qm ex41m6f0 btn-primary-dark  btn-lg"]');

    // Type in the specified username and password
    await page.waitForSelector('#username');
    await page.type("#username", username);

    await page.waitForSelector('#password');
    await page.type("#password", password);

    // Log into account
    await page.click('button[class="css-14l6ovh btn-primary-dark  btn-lg]"')

    // Type in the cv number
    await page.waitForSelector('#cvNumber');
    await page.type('#cvNumber', cvNum);

    // Submit the order
    if (purchase === true) {
        await page.click('button[class="nds-btn css-cokkoa ex41m6f0 btn-primary-dark  btn-md"]');
    }
    await browser.close();
})();