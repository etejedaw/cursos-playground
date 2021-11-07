interface Transport{
    model: string;
    getModel(): string;
    deliver(): void;
}

export default Transport;