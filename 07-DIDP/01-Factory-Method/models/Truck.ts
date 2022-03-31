import Transport from "./Interfaces/Transport";

class Truck implements Transport{
    private model: string;

    constructor(model: string){
        this.model = model;
    }

    getModel(){
        return this.model;
    }

    deliver(){
        return "Transporte enviado por camión";
    }
}

export default Truck;