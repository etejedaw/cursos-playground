import Chair from "./Chair";
import CoffeTable from "./CoffeTable";
import FurnitureFactory from "./FurnitureFacture";
import Sofa from "./Sofa";

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