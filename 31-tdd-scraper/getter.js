const request = require("request-promise");
const fs = require("fs");

const getHtml = async (url) => {
    const html = await request.get(url);
    return html;
}

const saveHtmlToFile = (html) => {
    fs.writeFileSync("./test.html", html);
}

const main = async () => {
    const html = await getHtml("https://sfbay.craigslist.org/search/muc");
    saveHtmlToFile(html);
}

main();