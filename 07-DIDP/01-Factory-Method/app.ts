import RoadLogistics from './models/Factory/RoadLogistics';
import SeaLogistics from './models/Factory/SeaLogistics';
import RoadType from "./enums/road-type"
import SeaType from "./enums/sea-type"

const roadLogistics = new RoadLogistics();
const seaLogistics = new SeaLogistics();

let c = roadLogistics.createTransport(RoadType.Truck, "patente-01");
let b = seaLogistics.createTransport(SeaType.Ship, "patente-02");

console.log(c.deliver());
console.log(b.getModel());