import Chair from "./Chair";
import CoffeTable from "./CoffeTable";
import Sofa from "./Sofa";
import FurnitureFactory from "./FurnitureFacture";
import VictorianChair from './VictorianChair';
import VictorianCoffeTable from "./VictorianCoffeTable";
import VictorianSofa from "./VictorianSofa";

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