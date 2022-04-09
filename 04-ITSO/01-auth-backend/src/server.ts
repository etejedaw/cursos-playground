import "./config";
import Database from "./database";
import environment from "./config/environment";
import dbConfig from "./config/database";
import App from "./app";

async function main(){
    try {
        const db = new Database(environment.NODE_ENV, dbConfig);
        await db.connect();
        const app = new App();
        app.listen();
    }
    catch (error) {
        console.error(error);
    }
}

main();