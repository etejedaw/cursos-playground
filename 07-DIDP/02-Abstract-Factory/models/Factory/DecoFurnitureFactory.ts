import Chair from "../Interfaces/Chair";
import CoffeTable from "../Interfaces/CoffeTable";
import Sofa from "../Interfaces/Sofa";
import DecoChair from "../DecoChair";
import DecoCoffeTable from "../DecoCoffeTable";
import DecoSofa from "../DecoSofa";
import FurnitureFactory from "./FurnitureFactory";

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