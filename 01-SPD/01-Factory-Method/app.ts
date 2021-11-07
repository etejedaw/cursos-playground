import RoadLogistics from './models/Factory/RoadLogistics';
import SeaLogistics from './models/Factory/SeaLogistics';

const roadLogistics = new RoadLogistics();
const seaLogistics = new SeaLogistics();

let c = roadLogistics.createTransport(0, "patente-01");
let b = seaLogistics.createTransport(0, "patente-02");

console.log(c.deliver());
console.log(b.getModel());