import axios from "axios";
import { PokeapiResponse, Move } from "./interfaces/pokeapi-response.interface";

export class Pokemon {
    constructor (
        public readonly id: number, 
        public name: string
    ) {}

    get imgUrl(): string {
        return `http://www.pokemon.com/${this.id}`;
    }

    scream(): string {
        return this.name.toUpperCase();
    }

    speak(): string {
        return this.name.repeat(2);
    }

    async getMoves(): Promise<Move[]> {
        const {data} = await axios.get<PokeapiResponse>("https://pokeapi.co/api/v2/pokemon/4");
        return data.moves;
    }
}

export const charmander = new Pokemon(4, "Charmander");