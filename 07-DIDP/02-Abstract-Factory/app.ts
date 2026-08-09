import ModernFurnitureFactory from "./models/Factory/ModernFurnitureFactory";
import CreateFactory from "./models/Factory/CreateFactory";

const factory = new ModernFurnitureFactory();
const furniture = new CreateFactory(factory);

let chair = furniture.createChair();
let sofa = furniture.createSofa();

console.log(chair.getLegs());
sofa.sitOn();