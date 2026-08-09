interface Transport{
    getModel(): string;
    deliver(): void;
}

export default Transport;