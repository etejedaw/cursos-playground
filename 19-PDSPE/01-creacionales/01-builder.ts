/**
 * ! Patrón Builder:
 * Es un patrón de diseño creacional que nos permite construir objetos complejos
 * paso a paso.
 *
 * El patrón nos permite producir distintos tipos y representaciones
 * de un objeto empleando el mismo código de construcción.
 *
 * * Es útil cuando necesitamos construir un objeto complejo con muchas partes
 * * y queremos que el proceso de construcción sea independiente de las partes
 * * que lo componen.
 *
 * https://refactoring.guru/es/design-patterns/builder
 */

import { COLORS } from "../helpers/colors.ts";

class Computer {
	cpu: string;
	ram: string;
	storage: string;
	gpu?: string;

	constructor() {
		this.cpu = "CPU - not defined";
		this.ram = "RAM - not defined";
		this.storage = "Storage - not defined";
	}

	display() {
		console.log(`Configuración de la computadora:
            CPU: ${this.cpu}
            RAM: ${this.ram}
            Storage: ${this.storage}
            GPU: ${this.gpu}
        `);
	}
}

class ComputerBuilder {
	#computer: Computer;

	constructor() {
		this.#computer = new Computer();
	}

	setCPU(cpu: string): ComputerBuilder {
		this.#computer.cpu = cpu;
		return this;
	}

	setRAM(ram: string): ComputerBuilder {
		this.#computer.ram = ram;
		return this;
	}

	setStorage(storage: string): ComputerBuilder {
		this.#computer.storage = storage;
		return this;
	}

	setGPU(gpu: string): ComputerBuilder {
		this.#computer.gpu = gpu;
		return this;
	}

	build(): Computer {
		return this.#computer;
	}
}

function main() {
	const basicComputer = new ComputerBuilder()
		.setCPU("Intel Core 2 Duo")
		.setRAM("4GB")
		.setStorage("256GB")
		.build();

	const gamingComputer = new ComputerBuilder()
		.setCPU("Ryzen 5 2600")
		.setRAM("16GB")
		.setStorage("1TB")
		.setGPU("AMD RX 7800XT")
		.build();

	console.log("%cComputadora Básica", COLORS.blue);
	console.log(basicComputer);
}

main();
