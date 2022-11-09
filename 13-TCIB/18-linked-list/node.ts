export default class Node {
	#data: unknown;
	#next?: Node;

	constructor(data: unknown) {
		this.#data = data;
	}

	get data(): unknown {
		return this.#data;
	}

	set data(data: unknown) {
		this.#data = data;
	}

	set next(node: Node | undefined) {
		this.#next = node;
	}

	get next() {
		return this.#next;
	}
}
