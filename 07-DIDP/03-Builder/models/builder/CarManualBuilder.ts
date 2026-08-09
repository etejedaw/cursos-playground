import Builder from "../interfaces/Builder";
import Manual from "../Manual";

class CarManualBuilder implements Builder{
    private manual: Manual;

    constructor(){
        this.manual = new Manual();
    }

    buildSeats(seats: number){
        this.manual.setSeats(`The car has ${seats} seats`);
        return this;
    }

    buildEngine(engine: number){
        this.manual.setEngine(`The car has a ${engine} motor`);
        return this;
    }

    buildGPS(gps: boolean){
        const has = gps ? "has" : "has not"
        this.manual.setGps(`The car ${has} GPS`);
        return this;
    }

    buildTripComputer(tripComputer: boolean){
        const has = tripComputer ? "has" : "has not"
        this.manual.setTripComputer(`The car ${has} a trip computer`);
        return this;
    }

    getManual(): Manual{
        const manual = this.manual;
        this.reset();
        return manual;
    }

    reset(){
        this.manual = new Manual();
    }
}

export default CarManualBuilder;