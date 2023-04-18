class Database{

    private static _instance: Database;

    private constructor(){
    }

    private static initialize(): void{
        console.log("Instancia inicializada");
    }

    static getInstance(): Database{
        if(!this._instance){
            this.initialize();
            this._instance = new Database();
        }
        return this._instance;
    }

    query(sql: string){
        console.log(sql);
    }

}

export default Database;