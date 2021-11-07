import Transport from "./Interfaces/Transport";

class Ship implements Transport{
    model: string;

    constructor(model: string){
        this.model = model;
    }

    getModel(){
        return this.model;
    }

    deliver(){
        return "Transporte enviado por barco";
    }
}

export default Ship;