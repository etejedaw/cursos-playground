/**
 * ! Patrón Proxy
 * Este patrón se utiliza para controlar el acceso a un objeto, es decir,
 * se crea un objeto que actúa como intermediario entre el cliente y el objeto real.
 *
 * * Es útil cuando necesitamos controlar el acceso a un objeto,
 * * por ejemplo, para verificar si el cliente tiene permiso
 * * para acceder a ciertos métodos o propiedades.
 *
 * https://refactoring.guru/es/design-patterns/proxy
 *
 */

class Player {
	constructor(public name: string, public level: number) {}
}

interface Room {
	enter(player: Player): void;
}

class SecretRoom implements Room {
	enter(player: Player): void {
		console.log(`Bienvenido a la sala secreta ${player.name}`);
		console.log(`Un gran enemigo te espera`);
	}
}

class MagicPortal implements Room {
	constructor(private room: Room) {}

	enter(player: Player): void {
		if (player.level >= 10) this.room.enter(player);
		else
			console.log(
				`Acceso denegado. ${player.name} posee un nivel muy bajo (${player.level})`
			);
	}
}

function main() {
	const portal = new MagicPortal(new SecretRoom());
	const player1 = new Player("Player1", 5);
	const player2 = new Player("Player2", 25);

	portal.enter(player1);
	portal.enter(player2);
}

main();
