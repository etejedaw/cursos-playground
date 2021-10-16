import ModernFurnitureFactory from "./models/ModernFurnitureFactory";
import CreateFactory from "./models/CreateFactory";

const factory = new ModernFurnitureFactory();
const furniture = new CreateFactory(factory);

let chair = furniture.createChair();
let sofa = furniture.createSofa();

console.log(chair.getLegs());
sofa.sitOn();