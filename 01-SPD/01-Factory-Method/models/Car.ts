import Transport from "./Transport";

class Car implements Transport{
    model: string;

    constructor(model: string){
        this.model = model;
    }

    getModel(){
        return this.model;
    }

    deliver(){
        return "Transporte enviado por Auto";
    }
    
}

export default Car;