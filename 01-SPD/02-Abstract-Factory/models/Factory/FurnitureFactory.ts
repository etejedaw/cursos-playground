import Chair from "../Interfaces/Chair";
import CoffeTable from "../Interfaces/CoffeTable";
import Sofa from "../Interfaces/Sofa";

interface FurnitureFactory{
    createChair(): Chair;
    createCoffeTable(): CoffeTable;
    createSofa(): Sofa;
}

export default FurnitureFactory;