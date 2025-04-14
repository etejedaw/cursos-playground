/**
 * ! Patrón Command
 * Este patrón encapsula una solicitud como un objeto,
 * lo que le permite parametrizar otros objetos con diferentes solicitudes,
 * encolar solicitudes, o registrar solicitudes, y soporta operaciones que pueden deshacerse.
 *
 * Me gustó mucho la explicación de Refactoring Guru
 * https://refactoring.guru/es/design-patterns/command
 *
 * * Es útil cuando se necesita desacoplar el objeto que invoca
 * * la operación del objeto que sabe cómo realizarla.
 */

interface Command {
	execute(): void;
}

class Light {
	turnOn() {
		console.log("La luz está encendida");
	}

	turnOff() {
		console.log("La luz está apagada");
	}
}

class Fan {
	on() {
		console.log("El ventilador está encendido");
	}

	off() {
		console.log("El ventilador está apagado");
	}
}

class LightOnCommand implements Command {
	constructor(private light: Light) {}

	execute() {
		this.light.turnOn();
	}
}

class LightOffCommand implements Command {
	constructor(private light: Light) {}

	execute() {
		this.light.turnOff();
	}
}

class FanOnCommand implements Command {
	constructor(private fan: Fan) {}

	execute() {
		this.fan.on();
	}
}

class FanOffCommand implements Command {
	constructor(private fan: Fan) {}

	execute() {
		this.fan.off();
	}
}

class RemoteControl {
	private commands: Record<string, Command> = {};

	setCommand(button: string, command: Command) {
		this.commands[button] = command;
	}

	pressButton(button: string) {
		if (!this.commands[button]) {
			return console.log("No se ha asignado un comando a ese botón");
		}
		this.commands[button].execute();
	}
}

function main() {
	const remoteControl = new RemoteControl();

	const light = new Light();
	const fan = new Fan();

	const lightOnCommand = new LightOnCommand(light);
	const lightOffCommand = new LightOffCommand(light);

	const fanOnCommand = new FanOnCommand(fan);
	const fanOffCommand = new FanOffCommand(fan);

	remoteControl.setCommand("1", lightOnCommand);
	remoteControl.setCommand("2", lightOffCommand);
	remoteControl.setCommand("3", fanOnCommand);
	remoteControl.setCommand("4", fanOffCommand);

	remoteControl.pressButton("1");
}

main();
