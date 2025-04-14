import { sleep } from "../helpers/sleep.ts";

/**
 * ! Patrón State
 * Este patrón permite a un objeto cambiar su comportamiento
 * cuando su estado interno cambia.
 *
 * * Es útil cuando un objeto tiene un comportamiento que depende de su estado
 * * y debe cambiar su comportamiento en tiempo de ejecución dependiendo de ese estado.
 *
 * https://refactoring.guru/es/design-patterns/state
 */

/**
 * * Objetivo: Implementar el patrón State para simular el funcionamiento
 * * de una máquina expendedora.
 * * La máquina tiene diferentes estados,
 *  * Como Esperando Dinero,
 *  * Seleccionando Producto,
 *  * Entregando Producto,
 * * y su comportamiento varía dependiendo del estado actual.
 */

interface State {
	name: string;
	insertMoney(): void;
	selectProduct(): void;
	dispenseProduct(): void;
}

class VendingMachine {
	private state: State;

	constructor() {
		this.state = new WaitingForMoney(this);
	}

	insertMoney() {
		this.state.insertMoney();
	}

	selectProduct() {
		this.state.selectProduct();
	}

	dispenseProduct() {
		this.state.dispenseProduct();
	}

	setState(state: State) {
		this.state = state;
		console.log(`El estado cambió a: ${state.name}`);
	}

	getStateName() {
		return this.state.name;
	}
}

class WaitingForMoney implements State {
	name = "Esperando Dinero";

	constructor(private vendingMachine: VendingMachine) {}

	insertMoney(): void {
		console.log("Dinero Insertado: Ahora puedes seleccionar un producto");
		this.vendingMachine.setState(new ProductSelected(this.vendingMachine));
	}

	selectProduct(): void {
		console.log("Primero debes insertar dinero");
	}

	dispenseProduct(): void {
		console.log("Primero debes insertar dinero");
	}
}

class ProductSelected implements State {
	name = "Seleccionando Producto";

	constructor(private vendingMachine: VendingMachine) {}

	insertMoney(): void {
		console.log("Selecciona un producto [Dinero ya procesado]");
	}

	selectProduct(): void {
		console.log("Dinero Insertado: Ahora puedes seleccionar un producto");
		this.vendingMachine.setState(
			new DispensingProduct(this.vendingMachine)
		);
	}

	dispenseProduct(): void {
		console.log("Selecciona un producto [Dinero ya procesado]");
	}
}

class DispensingProduct implements State {
	name = "Despachando producto";

	constructor(private vendingMachine: VendingMachine) {}

	insertMoney(): void {
		console.log("Espera a que se entregue el producto");
	}

	selectProduct(): void {
		console.log("Espera a que se entregue el producto");
	}

	dispenseProduct(): void {
		console.log("Producto despachado. Cambiando a estado EsperandoDinero");
		this.vendingMachine.setState(new WaitingForMoney(this.vendingMachine));
	}
}

async function main() {
	const vendingMachine = new VendingMachine();
	let selectedOption: string | null = "4";

	do {
		console.clear();

		selectedOption = prompt(
			`
            1. Insertar dinero
            2. Seleccionar producto
            3. Dispensar producto
            4. Salir
            `
		);

		switch (selectedOption) {
			case "1":
				vendingMachine.insertMoney();
				break;
			case "2":
				vendingMachine.selectProduct();
				break;
			case "3":
				vendingMachine.dispenseProduct();
				break;
			case "4":
				console.log("Saliendo de sistema");
				break;
			default:
				console.log("Opción no válida");
		}
		await sleep(2000);
	} while (selectedOption !== "4");
}

void main();
