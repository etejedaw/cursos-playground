import mongoose from "mongoose";
import cheerio from "cheerio";
import request from "request-promise";
import RedditArticle from "./RedditArticle";

const URL = "https://www.reddit.com/";

const connectToMongo = async () => {
    await mongoose.connect("mongodb://localhost/redditscraper");
    console.log("Server connected!");
}

const scrapeReddit = async () => {
    const html = await request.get(URL);
    const $ = cheerio.load(html);
    const titles = $("h3");
    titles.each(async (_idx, elem) => {
        const title = $(elem).text();
        const redditArticle = new RedditArticle({title});
        await redditArticle.save();
    });
}

const main = async () => {
    await connectToMongo();
    await scrapeReddit();
}


main();