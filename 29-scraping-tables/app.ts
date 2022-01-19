import request from "request-promise";
import cheerio from "cheerio";

interface ScrapedRow{
    company: string;
    contact: string;
    country: string;
}

const main = async () => {
    const result = await request.get("https://www.codingwithstefan.com/table-example/");
    const $ = cheerio.load(result);
    const scrapedRows: ScrapedRow[] = [];
    $("body > table > tbody > tr").each((index, element) => {
        if(index === 0) return;
        const tds = $(element).find("td");
        const company = $(tds[0]).text();
        const contact = $(tds[1]).text();
        const country = $(tds[2]).text();
        const scrapedRow: ScrapedRow = {company, contact, country}
        scrapedRows.push(scrapedRow);
    });
    console.log(scrapedRows);
}

main();