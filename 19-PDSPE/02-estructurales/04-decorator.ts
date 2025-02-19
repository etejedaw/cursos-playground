/**
 * ! Patrón decorador
 * Es un patrón de diseño estructural que permite añadir
 * funcionalidades a objetos, colocando estos objetos dentro de
 * objetos encapsuladores especiales que contienen estas funcionalidades.
 *
 * No confundirlo con los decoradores de TypeScript que son anotaciones.
 *
 * * Es útil cuando necesitas añadir funcionalidades a objetos
 *  * de manera dinámica y flexible.
 *
 * https://refactoring.guru/es/design-patterns/decorator
 */

import { COLORS } from "../helpers/colors.ts";

interface Notification {
	send(message: string): void;
}

class BasicNotification implements Notification {
	send(message: string): void {
		console.log(`Enviando notificación básica: %c${message}`, COLORS.blue);
	}
}

abstract class NotificationDecorator implements Notification {
	constructor(protected notificacion: Notification) {}

	send(message: string): void {
		this.notificacion.send(message);
	}
}

class EmailDecorator extends NotificationDecorator {
	private sendEmail(message: string) {
		console.log(
			`Enviando notificación por email: %c${message}`,
			COLORS.brown
		);
	}

	override send(message: string): void {
		super.send(message);
		this.sendEmail(message);
	}
}

class SmsDecorator extends NotificationDecorator {
	private sendSms(message: string) {
		console.log(
			`Enviando notificación por sms: %c${message}`,
			COLORS.yellow
		);
	}

	override send(message: string): void {
		super.send(message);
		this.sendSms(message);
	}
}

function main() {
	let notificacion: Notification = new BasicNotification();

	notificacion = new EmailDecorator(notificacion);
	notificacion = new SmsDecorator(notificacion);

	notificacion.send("Hello World!");
}

main();
