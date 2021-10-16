import CoffeTable from "./CoffeTable";

class DecoCoffeTable implements CoffeTable{
    private legs: number;

    constructor(){
        this.legs = 1;
    }

    getLegs(): number{
        return this.legs;
    }
}

export default DecoCoffeTable;