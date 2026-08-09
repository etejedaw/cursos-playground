import Car from "../Car";
import Builder from "../interfaces/Builder";

class CarBuilder implements Builder{
    private car: Car

    constructor(){
        this.car = new Car();
    }

    buildSeats(seats: number){
        this.car.setSeats(seats);
        return this;
    }

    buildEngine(engine: number){
        this.car.setEngine(engine);
        return this;
    }

    buildTripComputer(tripComputer: boolean){
        this.car.setTripComputer(tripComputer);
        return this;
    }

    buildGPS(gps: boolean){
        this.car.setGps(gps);
        return this;
    }

    getCar(): Car{
        const car = this.car;
        this.reset();
        return car;
    }

    reset(): void{
        this.car = new Car();
    }

}

export default CarBuilder;