import Chair from "../Interfaces/Chair";
import CoffeTable from "../Interfaces/CoffeTable";
import Sofa from "../Interfaces/Sofa";
import FurnitureFactory from "./FurnitureFactory";
import VictorianChair from '../VictorianChair';
import VictorianCoffeTable from "../VictorianCoffeTable";
import VictorianSofa from "../VictorianSofa";

class VictorianFurnitureFactory implements FurnitureFactory{
    createChair(): Chair{
        return new VictorianChair()
    }
    createCoffeTable(): CoffeTable{
        return new VictorianCoffeTable();
    }
    createSofa(): Sofa{
        return new VictorianSofa();
    }
}

export default VictorianFurnitureFactory;