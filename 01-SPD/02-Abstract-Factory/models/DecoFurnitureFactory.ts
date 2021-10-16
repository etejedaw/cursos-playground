import Chair from "./Chair";
import CoffeTable from "./CoffeTable";
import Sofa from "./Sofa";
import DecoChair from "./DecoChair";
import DecoCoffeTable from "./DecoCoffeTable";
import DecoSofa from "./DecoSofa";
import FurnitureFactory from "./FurnitureFacture";

class DecoFurnitureFactory implements FurnitureFactory{
    createChair(): Chair{
        return new DecoChair();
    }
    createCoffeTable(): CoffeTable{
        return new DecoCoffeTable();
    }
    createSofa(): Sofa{
        return new DecoSofa();
    }
}

export default DecoFurnitureFactory;