class Car{
    seats: number | null;
    engine: number | null;
    tripComputer: boolean | null;
    gps: boolean | null;

    constructor(){
        this.seats = null;
        this.engine = null;
        this.tripComputer = null;
        this.gps = null;
    }

    setSeats(seats: number){
        this.seats = seats;
    }

    setEngine(engine: number){
        this.engine = engine;
    }

    setTripComputer(tripComputer: boolean){
        this.tripComputer = tripComputer;
    }

    setGps(gps: boolean){
        this.gps = gps;
    }

}

export default Car;