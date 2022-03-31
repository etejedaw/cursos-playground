import {Sequelize} from "sequelize";

class Database {

    environment: string;
    dbConfig: any;
    isTestEnvironment: boolean;
    connection?: Sequelize;

    constructor(environment: string, dbConfig: any){
        this.environment = environment;
        this.dbConfig = dbConfig;
        this.isTestEnvironment = this.environment === "test";
    }

    getConnectionString(){
        const {DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE} = this.dbConfig[this.environment];
        return `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
    }

    async connect(){
        const uri = this.getConnectionString();
        const logging = this.isTestEnvironment ? false : console.log;
        this.connection = new Sequelize(uri, {logging});
        await this.connection.authenticate({logging: false});
        if(!this.isTestEnvironment) console.log("Connection has been stablished successfully!");
        await this.sync();
    }

    async sync(){
        await this.connection?.sync({
            force: this.isTestEnvironment,
            logging: false
        });
        if(!this.isTestEnvironment) console.log("Models synchronized successfully");
    }

    async disconnect() {
        await this.connection?.close();
    }
}

export default Database;