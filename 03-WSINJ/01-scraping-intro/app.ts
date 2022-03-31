import fs from "fs";
import request from "request-promise";
import cheerio from "cheerio";

const main = async () => {
    const html = await request.get("https://reactnativetutorial.net/css-selectors/");
    fs.writeFileSync("./test.html", html);
    const $ = await cheerio.load(html);
    const theText = $("h1").text();
    console.log(theText);
}

const main2 = async () => {
    const html = await request.get("https://reactnativetutorial.net/css-selectors/lesson2.html");
    fs.writeFileSync("./test.html", html);
    const $ = await cheerio.load(html);
    $("h2").each((index, element) => console.log($(element).text()));
}

const main3 = async () => {
    const html = await request.get("https://reactnativetutorial.net/css-selectors/lesson3.html");
    fs.writeFileSync("./test.html", html);
    const $ = await cheerio.load(html);
    const theText = $("#red").text();
    console.log(theText);
}

const main4 = async () => {
    const html = await request.get("https://reactnativetutorial.net/css-selectors/lesson5.html");
    fs.writeFileSync("./test.html", html);
    const $ = await cheerio.load(html);
    const theText = $(".red").text();
    console.log(theText);
}

const main5 = async () => {
    const html = await request.get("https://reactnativetutorial.net/css-selectors/lesson6.html");
    fs.writeFileSync("./test.html", html);
    const $ = await cheerio.load(html);
    const theText = $("[data-customer='22293']").text();
    console.log(theText);
}

main5()