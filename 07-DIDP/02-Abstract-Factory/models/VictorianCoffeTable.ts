import CoffeTable from "./Interfaces/CoffeTable";

class VictorianCoffeTable implements CoffeTable{
    private legs: number;

    constructor(){
        this.legs = 4;
    }

    getLegs(): number{
        return this.legs;
    }
}

export default VictorianCoffeTable;