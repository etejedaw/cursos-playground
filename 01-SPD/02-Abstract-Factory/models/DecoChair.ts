import Chair from "./Chair";

class DecoChair implements Chair{
    private legs: number;

    constructor(){
        this.legs = 4;
    }

    getLegs(): number{
        return this.legs;
    }

    sitOn(): void{
        console.log("Sentado en silla art decó");
    }
    
}

export default DecoChair;