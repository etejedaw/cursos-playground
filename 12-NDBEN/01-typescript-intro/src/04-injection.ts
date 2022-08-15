import { HttpAdapter, PokeApiAdapter } from "./api/pokeApi.adapter";
import { PokeapiResponse, Move } from "./interfaces/pokeapi-response.interface";

export class Pokemon {
    constructor (
        public readonly id: number, 
        public name: string,
        private readonly http: HttpAdapter
    ) {}

    get imgUrl(): string {
        return `http://www.pokemon.com/${this.id}.jpg`;
    }

    scream(): string {
        return this.name.toUpperCase();
    }

    speak(): string {
        return this.name.repeat(2);
    }

    async getMoves(): Promise<Move[]> {
        const data = await this.http.get<PokeapiResponse>("https://pokeapi.co/api/v2/pokemon/4");
        return data.moves;
    }
}

const pokeApi = new PokeApiAdapter();

export const charmander = new Pokemon(4, "Charmander", pokeApi);