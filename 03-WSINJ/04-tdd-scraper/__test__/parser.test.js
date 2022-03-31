const parser = require("../parser");
const fs = require("fs");
let html;
let listings;

beforeAll(() => {
    html = fs.readFileSync("./test.html");
    listings = parser.listings(html);
});

const listingExample = {
    title: "Singer looking for a band for shows and recording",
    url: "https://sfbay.craigslist.org/eby/muc/d/berkeley-singer-looking-for-band-for/7440019226.html",
    datePosted: new Date("2022-01-31 11:34"),
    hood: "(berkeley)"
}

it("should give the correct number of listing", () => {
    expect(listings.length).toBe(120);
});

it("should get hood from listing", () => {
    expect(listings[0].hood).toBe(listingExample.hood);
});

it("should get correct date from listing", () => {
    expect(listings[0].datePosted).toStrictEqual(listingExample.datePosted);
});

it("should get correct url", () => {
    expect(listings[0].url).toBe(listingExample.url);
});

it("should get correct title", () => {
    expect(listings[0].title).toBe(listingExample.title);
});