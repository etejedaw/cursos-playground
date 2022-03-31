import request from "request-promise";
import fs from "fs";

request.defaults({jar: true});

const main = async () => {
    try{
        const html = await request.post("https://accounts.craigslist.org/login/", {
            form: {
                inputEmailHandle: "test@test.com",
                inputPassword: "test_password"
            },
            headers: {
                Referer: "https://accounts.craiglist.org/login?rt=L&rp=%2Flogin%2Fhome"
            },
            simple: false,
            followAllRedirects: true,
        });
        fs.writeFileSync("./login.html", html);
        const billingHtml = await request.get("https://accounts.craiglist.org/login/home?show_tab=billing");
        fs.writeFileSync("./billing.html", billingHtml);
    }
    catch(error){
        console.log(error)
    }
}

main();