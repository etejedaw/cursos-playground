import Sofa from "./Interfaces/Sofa";

class DecoSofa implements Sofa{
    private legs: number;

    constructor(){
        this.legs = 4;
    }

    getLegs(): number{
        return this.legs;
    }

    sitOn(): void{
        console.log("Sentado en sofá art decó");
    }
}

export default DecoSofa;