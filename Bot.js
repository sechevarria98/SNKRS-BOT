const puppeteer = require("puppeteer");
const URL = "https://www.nike.com/t/air-force-1-07-mens-shoes-5QFp5Z/CW2288-111";
const specifiedSize = "10";


(async () => {
    // setting headless to false for now
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto(URL);
    await page.waitForSelector(".add-to-cart-form.nike-buying-tools");

    await page.evaluate((specifiedSize) => {
        const sizeDropDown = document.querySelectorAll(".add-to-cart-form.nike-buying-tools div fieldset div div input");
        let specifiedIndex = Array.from(sizeDropDown)
                .map((item, index) => (item.getAttribute("value").split(":")[1] === specifiedSize ? i : false))
                .filter(Boolean)[0];
        
        sizeDropDown[specifiedIndex].click();
    }, specifiedSize);
    
    await page.click('button[class="ncss-btn-primary-dark btn-lg add-to-cart-btn"]');
    await browser.close();
})();