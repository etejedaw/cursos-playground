/**
 * ! Patrón mediator
 * Es un patrón de diseño de comportamiento que ayuda a reducir
 * las dependencias desordenadas entre objetos.
 * Este patrón limita la comunicación directa entre ellos,
 * haciendo que solo interactúen a través de un objeto mediador.
 *
 * * Es útil reducir la complejidad de las relaciones entre objetos
 *
 * https://refactoring.guru/es/design-patterns/mediator
 */

class User {
	constructor(private username: string, private chatroom: ChatRoom) {
		chatroom.addUser(this);
	}

	sendMessage(message: string) {
		console.log(`${this.username} envía: ${message}`);
		this.chatroom.sendMessage(this, message);
	}

	receiveMessage(sender: User, message: string) {
		console.log(
			`${this.username} recibe de ${sender.username}: ${message}`
		);
	}
}

class ChatRoom {
	#users: User[] = [];

	constructor(public title: string) {}

	addUser(user: User) {
		this.#users.push(user);
	}

	sendMessage(sender: User, message: string) {
		const usersToSend = this.#users.filter(user => user !== sender);

		for (const user of usersToSend) user.receiveMessage(sender, message);
	}
}

function main() {
	const chatRoom = new ChatRoom("Work");

	const user1 = new User("user1", chatRoom);
	const user2 = new User("user2", chatRoom);
	const user3 = new User("user3", chatRoom);

	user1.sendMessage("Hola a todos!");
	user2.sendMessage("Hola, cómo estás?");
	user3.sendMessage("Qué tal?");
}

main();
