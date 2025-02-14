/**
 * ! Patrón Bridge
 * Este patrón nos permite desacoplar una abstracción de su implementación,
 * de tal forma que ambas puedan variar independientemente.
 *
 * * Es útil cuando se tienen múltiples implementaciones de una abstracción
 * * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
 * * Se puede utilizar para separar la lógica de la interfaz de usuario también.
 *
 * https://refactoring.guru/es/design-patterns/bridge
 */

interface Ability {
	use(): void;
}

class SwordAttack implements Ability {
	use(): void {
		console.log("*Ataca con una espada*");
	}
}

class MagicSpell implements Ability {
	use(): void {
		console.log("*Lanza un hechizo mágico*");
	}
}

class AxeAttack implements Ability {
	use(): void {
		console.log("*Ataca con un hacha*");
	}
}
class FireballSpell implements Ability {
	use(): void {
		console.log("*Lanza una bola de fuego*");
	}
}

abstract class Character {
	protected ability: Ability;

	constructor(ability: Ability) {
		this.ability = ability;
	}

	setAbility(ability: Ability) {
		this.ability = ability;
	}

	abstract performHability(): void;
}

class Warrior extends Character {
	override performHability(): void {
		console.log("El guerrero está listo para luchar");
		this.ability.use();
	}
}

class Mage extends Character {
	override performHability(): void {
		console.log("El mago prepara su magia");
		this.ability.use();
	}
}

function main() {
	const warrior = new Warrior(new SwordAttack());
	warrior.performHability();

	warrior.setAbility(new AxeAttack());
	warrior.performHability();

	const mage = new Mage(new FireballSpell());
	mage.performHability();
}

main();
