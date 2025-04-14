/**
 * !Patrón Memento
 * Permite capturar y externalizar un estado interno de un objeto,
 * de manera que el objeto pueda ser restaurado a ese estado más tarde.
 *
 * * Es útil cuando se necesita guardar el estado de un objeto para poder
 * * volver a él en un futuro.
 *
 * https://refactoring.guru/es/design-patterns/memento
 */

class GameMemento {
	constructor(
		private _level: number,
		private _health: number,
		private _position: string
	) {}

	get level() {
		return this._level;
	}

	get health() {
		return this._health;
	}

	get position() {
		return this._position;
	}
}

class Game {
	private _level: number = 1;
	private _health: number = 100;
	private _position: string = "Inicio";
	constructor() {
		console.log(`Jugando en el nivel: ${this._level}`);
		console.log(`Salud: ${this._health}`);
		console.log(`Posición: ${this._position}`);
	}

	save(): GameMemento {
		return new GameMemento(this._level, this._health, this._position);
	}

	play(level: number, health: number, position: string) {
		this._level = level;
		this._health = health;
		this._position = position;
		console.log(`Jugando en el nivel: ${this._level}`);
		console.log(`Salud: ${this._health}`);
		console.log(`Posición: ${this._position}`);
	}

	restore(memento: GameMemento) {
		this._level = memento.level;
		this._health - memento.health;
		this._position = memento.position;
		console.log("Progreso Restaurado");
		console.log(`Jugando en el nivel: ${this._level}`);
		console.log(`Salud: ${this._health}`);
		console.log(`Posición: ${this._position}`);
	}
}

class GameHistory {
	private mementos: GameMemento[] = [];

	push(memento: GameMemento) {
		this.mementos.push(memento);
	}

	pop(): GameMemento | undefined {
		return this.mementos.pop();
	}
}

function main() {
	const game = new Game();
	const history = new GameHistory();

	history.push(game.save());

	// Jugador avanza en el juego

	game.play(2, 90, "El Bosque");
	history.push(game.save());

	game.play(3, 70, "Barrios Bajos");
	history.push(game.save());

	game.play(4, 50, "Miraflores");
	console.log(`\nEstado actual`);

	game.restore(history.pop()!);
	console.log(`\nDespués de restaurar el último estado guardado`);
}

main();
