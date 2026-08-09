import Chair from "../Interfaces/Chair";
import CoffeTable from "../Interfaces/CoffeTable";
import Sofa from "../Interfaces/Sofa";
import FurnitureFactory from "./FurnitureFactory";
import ModernChair from "../ModernChair";
import ModernCoffeTable from "../ModernCoffeTable";
import ModernSofa from "../ModernSofa";

class ModernFurnitureFactory implements FurnitureFactory{
    createChair():Chair{
        return new ModernChair();
    }
    createCoffeTable(): CoffeTable{
        return new ModernCoffeTable();
    }
    createSofa(): Sofa{
        return new ModernSofa();
    }
}

export default ModernFurnitureFactory;