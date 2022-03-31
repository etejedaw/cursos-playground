import Chair from './Interfaces/Chair';

class VictorianChair implements Chair{
    private legs: number;

    constructor(){
        this.legs = 4;
    }

    getLegs(): number{
        return this.legs;
    }

    sitOn(): void{
        console.log("Sentado en silla victoriana");
    }

}

export default VictorianChair;