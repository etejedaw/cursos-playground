import puppeteer, {Page} from "puppeteer";

const URL = "https://intoli.com/blog/scrape-infinite-scroll/demo.html";
const TARGET_ITEM_COUNT = 100;
const DELAY = 1000;

const extractItems = () => {
    const extractedItems = Array.from(document.querySelectorAll("#boxes > div.box" )) as HTMLElement[];
    const items = extractedItems.map(element => element.innerText);
    return items;
}

const scrapeInfiniteScrollItems = async (page: Page, extractedItems: any, targetItemCount: number, delay: number) => {
    let items = [];
    let previousHeight;
    while (items.length < targetItemCount){
        items = await page.evaluate(extractedItems);
        previousHeight = await page.evaluate("document.body.scrollHeight");
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
        await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
        await page.waitFor(delay);
    }
}

const main = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    page.setViewport({width: 1280, height: 926});
    await page.goto(URL);
    const items = await scrapeInfiniteScrollItems(page, extractItems, TARGET_ITEM_COUNT, DELAY);
    console.log(items);
}

main();