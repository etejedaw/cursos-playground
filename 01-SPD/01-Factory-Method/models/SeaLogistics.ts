import SeaType from "../enums/sea-type";
import Logistics from "./Logistics";
import Ship from "./Ship";

class SeaLogistics implements Logistics{
    createTransport(type: SeaType, model: string){
        switch (type) {
            case SeaType.Ship:
                return new Ship(model);
                break;
            default:
                throw new Error("Modelo no encontrado");
                break;
        }
    }
}

export default SeaLogistics;