interface Builder{
    buildSeats(seats: number): void;
    buildEngine(engine: number): void;
    buildTripComputer(allow: boolean): void;
    buildGPS(allow: boolean): void; 
    reset(): void;
}

export default Builder;