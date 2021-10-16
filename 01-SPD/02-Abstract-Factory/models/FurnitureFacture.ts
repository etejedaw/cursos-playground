import Chair from "./Chair";
import CoffeTable from "./CoffeTable";
import Sofa from "./Sofa";

interface FurnitureFactory{
    createChair(): Chair;
    createCoffeTable(): CoffeTable;
    createSofa(): Sofa;
}

export default FurnitureFactory;