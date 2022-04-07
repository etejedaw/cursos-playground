import "./config";
import Database from "./database";
import environment from "./config/environment";
import dbConfig from "./config/database";

async function main(){
    try {
        const db = new Database(environment.NODE_ENV, dbConfig);
        await db.connect();
    }
    catch (error) {
        console.error(error);
    }
}

main();