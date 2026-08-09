class Manual{
    seats: string | null;
    engine: string | null;
    tripComputer: string | null;
    gps: string | null;

    constructor(){
        this.seats = null;
        this.engine = null;
        this.tripComputer = null;
        this.gps = null;
    }

    setSeats(seats: string){
        this.seats = seats;
    }

    setEngine(engine: string){
        this.engine = engine;
    }

    setTripComputer(tripComputer: string){
        this.tripComputer = tripComputer;
    }

    setGps(gps: string){
        this.gps = gps;
    }

}

export default Manual;