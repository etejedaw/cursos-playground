import Builder from "./interfaces/Builder";

class Director{
    private builder: Builder

    constructor(builder: Builder){
        this.builder = builder;
    }

    constructSportCar(){
        this.builder.buildEngine(2.4);
        this.builder.buildGPS(true);
        this.builder.buildSeats(2);
        this.builder.buildTripComputer(true);
    }

    constructFamilyCar(){
        this.builder.buildEngine(1.8);
        this.builder.buildGPS(false);
        this.builder.buildSeats(4);
        this.builder.buildTripComputer(true);
    }

    setBuilder(builder: Builder){
        this.builder = builder;
    }
}

export default Director;