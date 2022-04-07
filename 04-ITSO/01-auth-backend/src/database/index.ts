import {Sequelize} from "sequelize";
import { registerModels } from "../models";

class Database {
    environment: string;
    dbConfig: any; // config/database.ts
    isTestEnvironment: boolean;
    connection?: Sequelize;

    constructor(environment: string, dbConfig: any){
        this.environment = environment;
        this.dbConfig = dbConfig;
        this.isTestEnvironment = this.environment === "test";
    }

    getConnectionString(){
        const {DB_USERNAME, DB_PASSWORD, HOST, PORT, DATABASE} = this.dbConfig[this.environment];
        return `postgres://${DB_USERNAME}:${DB_PASSWORD}@${HOST}:${PORT}/${DATABASE}`;
    }

    async connect(){
        const uri = this.getConnectionString();
        const logging = this.isTestEnvironment ? false : console.log;
        this.connection = new Sequelize(uri, {logging});
        await this.connection.authenticate({logging});
        if(!this.isTestEnvironment) console.log("Connection has been stablished successfully!");
        registerModels(this.connection);
        await this.sync();
    }

    async sync(){
        const logging = this.isTestEnvironment ? false : console.log;
        await this.connection?.sync({
            force: this.isTestEnvironment,
            logging
        });
        if(!this.isTestEnvironment) console.log("Models synchronized successfully");
    }

    async disconnect() {
        await this.connection?.close();
    }
}

export default Database;