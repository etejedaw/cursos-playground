import puppeteer, {Page} from "puppeteer";
import cheerio from "cheerio"
import fs from "fs";

interface ScrapingResult{
    title: string;
    datePosted: Date;
    neighborhood: string;
    url: string;
    jobDescription?: string;
    compensation?: string;
}

const scrapeListing = async(page: Page): Promise<ScrapingResult[]> => {
    await page.goto("https://sfbay.craigslist.org/d/software-qa-dba-etc/search/sof");
    const html = await page.content();
    const $ = cheerio.load(html);
    const listings: ScrapingResult[] = $(".result-info").map((index, element) => {
        const titleElement = $(element).find(".result-title");
        const timeElement = $(element).find(".result-date");
        const hoodElement = $(element).find(".result-hood");
        const title = $(titleElement).text();
        const url = $(titleElement).attr("href");
        const date = $(timeElement).attr("datetime");
        const datePosted = new Date(date!);
        const hood = hoodElement.text().replace("(", "").replace(")","");
        const neighborhood = hood.trim();
        return {title, url, datePosted, neighborhood}
    }).get();
    return listings;
}

const scrapeFullDescriptions = async (listing: ScrapingResult[], page: Page) => {
    for(let i = 0; i < listing.length; i++){
        await page.goto(listing[i].url);
        const html = await page.content();
        const $ = cheerio.load(html);
        const jobDescription = $("#postingbody").text().trim();
        const compensation = $("p.attrgroup > span:nth-child(1) > b").text().trim();
        listing[i].jobDescription = jobDescription;
        listing[i].compensation = compensation;
        console.log(listing[i]);
        await sleep(1000);
    }
    return listing;
}

const sleep = async (miliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, miliseconds));
}

const main = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    const listing = await scrapeListing(page)
    const fullListing = await scrapeFullDescriptions(listing, page);
}

main();

