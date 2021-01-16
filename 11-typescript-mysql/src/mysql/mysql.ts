import mysql = require('mysql');

export default class MySQL{
    private static _instance: MySQL;
    cnn: mysql.Connection;
    connected: boolean = false;

    constructor(){
        console.log("Initialized class");
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'admin',
            password: 'admin',
            database: 'neuss'
        });
        this.cnn.connect();
        this.connectDB();
    }

    public static get instance(){
        return this._instance || (this._instance = new this());
    }

    private connectDB(){
        this.cnn.connect((err: mysql.MysqlError) => {
            if(err) {
                console.log(err.message);
                return;
            };
            this.connected = true,
            console.log("DB Online");
        });
    }
}