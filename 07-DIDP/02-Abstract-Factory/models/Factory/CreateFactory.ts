import Chair from "../Interfaces/Chair";
import CoffeTable from "../Interfaces/CoffeTable";
import FurnitureFactory from "./FurnitureFactory";
import Sofa from "../Interfaces/Sofa";

class CreateFactory{
    private factory: FurnitureFactory;

    constructor(factory: FurnitureFactory){
        this.factory = factory;
    }

    createChair(): Chair{
        return this.factory.createChair();
    }

    createCoffeTable(): CoffeTable{
        return this.factory.createCoffeTable();
    }

    createSofa(): Sofa{
        return this.factory.createSofa();
    }

}

export default CreateFactory;