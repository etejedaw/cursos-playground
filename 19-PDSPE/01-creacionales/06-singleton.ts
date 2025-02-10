/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */

class DragonBalls {
	static #instance: DragonBalls;
	#ballsCollected: number;

	private constructor() {
		this.#ballsCollected = 0;
	}

	static getInstance(): DragonBalls {
		if (!this.#instance) this.#instance = new DragonBalls();
		return this.#instance;
	}

	collectBall() {
		if (this.#ballsCollected === 7) {
			return console.log(
				"Ya se han recolectado las 7 esferas del dragón"
			);
		}

		this.#ballsCollected++;
		return console.log(
			`Esfera recolectada. Total de esferas: ${this.#ballsCollected}`
		);
	}

	summonShenlong() {
		if (this.#ballsCollected < 7)
			return console.log(
				"Aún no se han recolectado todas las esferas del dragon"
			);
		console.log("Shenlog ha sido invocado, pide tu deseo");
		this.#ballsCollected = 0;
		return;
	}
}

function main() {
	const gokuDragonBalls = DragonBalls.getInstance();

	gokuDragonBalls.collectBall();
	gokuDragonBalls.collectBall();
	gokuDragonBalls.collectBall();

	gokuDragonBalls.summonShenlong();

	console.log();

	const vegetaDragonBalls = DragonBalls.getInstance();

	vegetaDragonBalls.collectBall();
	vegetaDragonBalls.collectBall();
	vegetaDragonBalls.collectBall();
	vegetaDragonBalls.collectBall();

	gokuDragonBalls.summonShenlong();

	console.log();

	const krilinDragonBalls = DragonBalls.getInstance();
	krilinDragonBalls.summonShenlong();
}

main();
