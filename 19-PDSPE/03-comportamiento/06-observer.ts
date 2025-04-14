/**
 * ! Patrón Observer
 * El patrón Observer es un patrón de diseño de comportamiento que establece
 * una relación de uno a muchos entre un objeto, llamado sujeto,
 * y otros objetos, llamados observadores, que son notificados
 * y actualizados automáticamente por el sujeto
 * cuando se producen cambios en su estado.
 *
 * * Es útil cuando necesitamos que varios objetos estén
 * * pendientes de los cambios
 *
 * !No confundirlo con RXJS Observables
 *
 * https://refactoring.guru/es/design-patterns/observer
 */

interface Observer {
	notify(videoTitle: string): void;
}

class YoutubeChannel {
	private subscribers: Observer[] = [];

	constructor(private name: string) {}

	subscribe(observer: Observer) {
		this.subscribers.push(observer);
		console.log(`Nuevo suscriptor añadido al canal ${name}`);
	}

	unsubscribe(observer: Observer) {
		this.subscribers = this.subscribers.filter(sub => sub !== observer);
		console.log(`Un suscriptor se ha dado de baja en el canal ${name}`);
	}

	uploadVideo(videoTitle: string) {
		console.log(`Canal ${name} ha subido el nuevo video ${videoTitle}`);
		this.subscribers.forEach(sub => sub.notify(videoTitle));
	}
}

class Subscriber implements Observer {
	constructor(private name: string) {}

	notify(videoTitle: string) {
		console.log(
			`${this.name}: ha sido notificado: Nuevo video ${videoTitle}`
		);
	}
}

function main() {
	const channel = new YoutubeChannel("Udemy");

	const user1 = new Subscriber("user1");
	const user2 = new Subscriber("user2");
	const user3 = new Subscriber("user3");

	channel.subscribe(user1);
	channel.subscribe(user2);
	channel.uploadVideo("Patrones de diseño");

	channel.unsubscribe(user1);
	channel.unsubscribe(user2);
	channel.subscribe(user3);
	channel.uploadVideo("Typescript");
}

main();
