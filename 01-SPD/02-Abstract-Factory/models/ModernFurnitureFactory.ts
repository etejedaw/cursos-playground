import Chair from "./Chair";
import CoffeTable from "./CoffeTable";
import Sofa from "./Sofa";
import FurnitureFactory from "./FurnitureFacture";
import ModernChair from "./ModernChair";
import ModernCoffeTable from "./ModernCoffeTable";
import ModernSofa from "./ModernSofa";

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