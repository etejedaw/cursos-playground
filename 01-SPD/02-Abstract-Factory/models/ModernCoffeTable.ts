import CoffeTable from "./CoffeTable";

class ModernCoffeTable implements CoffeTable{
    private legs: number;

    constructor(){
        this.legs = 4;
    }

    getLegs(): number{
        return this.legs;
    }
}

export default ModernCoffeTable;