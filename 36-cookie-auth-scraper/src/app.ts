import request from "request-promise";

const cookieJar = request.jar();
request.defaults({jar: cookieJar});

const main = async() => {
    const result = await request.get("https://internshala.com/");
    const cookieString = cookieJar.getCookieString("https://internshala.com/");
    const splittedByCsrfCookieName = cookieString.split("csrf_cookie_name=");
    const csrf_test_name = splittedByCsrfCookieName[1].split(";")[0];
    await request.post("https://internshala.com/login/verify_ajax/user", {
        form: {
            csrf_test_name,
            email: "test@test.com",
            password: "test123+"
        }
    });
    const matches = await request.get("https://internshala.com/internships/matching-preferences");
    console.log(matches);
}

main();