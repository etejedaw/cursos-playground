/**
 * ! Patrón Iterator
 * Este patrón permite recorrer los elementos de una colección sin exponer
 * la estructura interna de la colección.
 *
 * * Es útil cuando se necesita recorrer una colección de elementos sin importar
 * * cómo se almacenan los elementos.
 *
 * https://refactoring.guru/es/design-patterns/iterator
 */

interface Iterator<T> {
	next(): T | null;
	hasNext(): boolean;
	current(): T | null;
}

class Pokemon {
	constructor(public name: string, public type: string) {}
}

class PokemonCollection {
	#pokemons: Pokemon[] = [];

	addPokemon(pokemon: Pokemon) {
		this.#pokemons.push(pokemon);
	}

	getPokemonAt(index: number): Pokemon | null {
		if (index < 0 || index >= this.#pokemons.length) return null;
		return this.#pokemons[index];
	}

	getLength(): number {
		return this.#pokemons.length;
	}

	createIterator(): PokemonInterator {
		return new PokemonInterator(this);
	}
}

class PokemonInterator implements Iterator<Pokemon> {
	constructor(private collection: PokemonCollection, private position = 0) {}

	next(): Pokemon | null {
		if (!this.hasNext()) return null;
		return this.collection.getPokemonAt(this.position++);
	}

	hasNext(): boolean {
		return this.position < this.collection.getLength();
	}

	current(): Pokemon | null {
		return this.collection.getPokemonAt(this.position);
	}
}

function main() {
	const pokedex = new PokemonCollection();

	pokedex.addPokemon(new Pokemon("Pikachu", "Eléctrico"));
	pokedex.addPokemon(new Pokemon("Charmander", "Fuego"));
	pokedex.addPokemon(new Pokemon("Squirtle", "Agua"));
	pokedex.addPokemon(new Pokemon("Bulbasaur", "Planta"));
	pokedex.addPokemon(new Pokemon("Jigglypuff", "Normal"));

	const iterator = pokedex.createIterator();
	while (iterator.hasNext) {
		const pokemon = iterator.next();
		if (pokemon) console.log(pokemon.name);
	}
}

main();
