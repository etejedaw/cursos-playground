export class Customer {
	#name: string;
	#contactNumber: string;

	constructor(name: string, contactNumber: string) {
		this.#name = name;
		this.#contactNumber = contactNumber;
	}

	get name(): string {
		return this.#name;
	}

	set name(name: string) {
		this.#name = name;
	}

	get contactNumber(): string {
		return this.#contactNumber;
	}

	set contactNumber(contactNumber: string) {
		this.#contactNumber = contactNumber;
	}
}
