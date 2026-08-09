import RoadType from "../../enums/road-type";
import Car from "../Car";
import Logistics from "../Interfaces/Logistics";
import Transport from "../Interfaces/Transport";
import Truck from "../Truck";

class RoadLogistics implements Logistics{
    createTransport(type: RoadType, model: string): Transport{
        switch (type) {
            case RoadType.Car:
                return new Car(model);
                break;
            case RoadType.Truck:
                return new Truck(model);
                break;
            default:
                throw new Error("Modelo no encontrado");
                break;
        }
    }
}

export default RoadLogistics;