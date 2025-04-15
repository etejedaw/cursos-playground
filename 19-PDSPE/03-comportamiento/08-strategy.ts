/**
 * ! Patrón Strategy
 *
 * El patrón Strategy es un patrón de diseño de software que define una
 * familia de algoritmos, los encapsula y los hace intercambiables.
 *
 *
 * * Es útil cuando se tiene una clase que tiene un comportamiento que puede
 * * cambiar en tiempo de ejecución y se quiere delegar la responsabilidad de
 * * la implementación a otra clase.
 *
 * https://refactoring.guru/es/design-patterns/strategy
 */

/**
 * !Objetivo: Explicar el patrón Strategy usando un ejemplo donde varios
 * ! patitos compiten en una carrera y cada uno tiene su propia
 * ! estrategia de movimiento (por ejemplo, nadar, volar o caminar).
 */

interface MovementStrategy {
	move(): void;
}

class SwimFast implements MovementStrategy {
	move(): void {
		console.log("El Pato nada rápidamente sobre el agua");
	}
}

class FlyOverWater implements MovementStrategy {
	move(): void {
		console.log("El pato vuela elegantemente sobre el agua");
	}
}

class WalkClumsily implements MovementStrategy {
	move(): void {
		console.log("El pato camina torpemente por la orilla");
	}
}

class Duck {
	constructor(
		private name: string,
		private movementStrategy: MovementStrategy
	) {
		console.log(`${this.name} listo para competir`);
	}

	performMove() {
		console.log(`${this.name} se prepara para moverse`);
		this.movementStrategy.move();
	}

	setMovementStrategy(strategy: MovementStrategy) {
		this.movementStrategy = strategy;
		console.log(`${this.name} cambió de estrategia`);
	}
}

function main() {
	const duck1 = new Duck("Patito rápido", new SwimFast());
	const duck2 = new Duck("Patito volador", new FlyOverWater());
	const duck3 = new Duck("Patito torpe", new WalkClumsily());

	console.log("Comienza la patocarrera");

	duck1.performMove();
	duck2.performMove();
	duck3.performMove();

	duck3.setMovementStrategy(new FlyOverWater());
	duck3.performMove();
}

main();
