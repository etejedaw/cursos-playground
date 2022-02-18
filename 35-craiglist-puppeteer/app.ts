import puppeteer from "puppeteer";

const main = async () => {
    try {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto("https://accounts.craigslist.org/login/");
        await page.type("input#inputEmailHandle", "email@test.com");
        await page.type("input#inputPassword", "password");
        await page.click("button#login");
        const content = await page.content();
        console.log(content);
    } 
    catch (error) {
        console.log(error);
    }
}

main();