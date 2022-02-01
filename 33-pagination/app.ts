import request from "request-promise";
import cheerio from "cheerio";

const scrape = async () => {
    for(let i = 0; i <= 360; i+=120){
        const html = await request.get(`https://sfbay.craigslist.org/search/muc?s=${i}`);
        const $ = cheerio.load(html);
        $(".result-title").each((_index, element) => console.log($(element).text()));
        console.log(`At page ${i}`);
    }
}

scrape();