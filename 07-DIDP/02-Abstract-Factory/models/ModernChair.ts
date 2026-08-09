import Chair from "./Interfaces/Chair";

class ModernChair implements Chair{
    private legs: number;

    constructor(){
        this.legs = 1;
    }

    getLegs(): number{
        return this.legs;
    }
    
    sitOn(): void{
        console.log("Sentado en silla moderna");
    }
}

export default ModernChair;