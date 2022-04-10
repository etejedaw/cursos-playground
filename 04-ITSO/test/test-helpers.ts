import "../src/config";
import Database from "../src/database";
import dbConfig from "../src/config/database";
import environment from "../src/config/environment";

let db: Database;

class TestHelpers {
    static async startDb(){
        db = new Database(environment.NODE_ENV, dbConfig);
        await db.connect();
        return db;
    }

    static async stopDb(){
        await db.disconnect();
    }

    static async syncDb(){
        await db.sync();
    }

}

export default TestHelpers;