/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 *
 */

import { COLORS } from "../helpers/colors.ts";

interface Hamburguer {
	prepare(): void;
}

class ChickenHamburguer implements Hamburguer {
	prepare() {
		console.log("Preparando hamburguesa de %cpollo", COLORS.yellow);
	}
}

class BeefHamburguer implements Hamburguer {
	prepare() {
		console.log("Preparando hamburguesa de %cvacuno", COLORS.brown);
	}
}
class BeanHamburguer implements Hamburguer {
	prepare() {
		console.log("Preparando hamburguesa de %cfrijoles", COLORS.black);
	}
}

abstract class Restaurant {
	protected abstract createHamburguer(): Hamburguer;

	orderHamburguer() {
		const hamburguer = this.createHamburguer();
		hamburguer.prepare();
	}
}

class ChickenRestaurant extends Restaurant {
	createHamburguer(): Hamburguer {
		return new ChickenHamburguer();
	}
}

class BeefRestaurant extends Restaurant {
	createHamburguer(): Hamburguer {
		return new BeefHamburguer();
	}
}

class BeanRestaurant extends Restaurant {
	createHamburguer(): Hamburguer {
		return new BeanHamburguer();
	}
}

function main() {
	let restaurant: Restaurant;

	const burguerType = prompt(
		"Qué tipo de hamburguesa quieres? (chicken/beef/bean)"
	);

	switch (burguerType) {
		case "chicken":
			restaurant = new ChickenRestaurant();
			break;
		case "beef":
			restaurant = new BeefRestaurant();
			break;
		case "bean":
			restaurant = new BeanRestaurant();
			break;
		default:
			throw new Error("Opción no valida");
	}

	restaurant.orderHamburguer();
}

main();
