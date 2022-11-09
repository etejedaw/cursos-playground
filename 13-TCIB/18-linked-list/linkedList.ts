import Node from "./node";

export default class LinkedList {
	#head?: Node;
	#size: number;

	constructor() {
		this.#size = 0;
	}

	insertFirst(data: unknown): boolean {
		const node = new Node(data);
		if (!this.#head) this.#head = node;
		else {
			node.next = this.#head;
			this.#head = node;
		}
		this.#size++;
		return true;
	}

	get size(): number {
		return this.#size;
	}

	getFirst(): Node | boolean {
		if (!this.#head) return false;
		return this.#head;
	}

	getLast(): Node | boolean {
		if (!this.#head) return false;
		let aux = this.#head;
		while (aux.next) aux = aux.next;
		return aux;
	}

	clear(): boolean {
		this.#head = undefined;
		this.#size = 0;
		return true;
	}

	removeFirst(): boolean {
		if (!this.#head) return false;
		if (!this.#head.next) this.#head = undefined;
		else {
			this.#head = this.#head.next;
			this.#size--;
		}
		return true;
	}

	removeLast(): boolean {
		if (!this.#head) return false;
		if (!this.#head.next) this.#head = undefined;
		else {
			let aux = this.#head;
			while (aux.next?.next) aux = aux.next;
			aux.next = undefined;
			this.#size--;
		}
		return true;
	}

	insertLast(data: unknown): boolean {
		const node = new Node(data);
		if (!this.#head) this.#head = node;
		else {
			let aux = this.#head;
			while (aux.next) aux = aux.next;
			aux.next = node;
		}
		this.#size++;
		return true;
	}

	getAt(index: number): Node | boolean {
		if (!this.#head) return false;
		let aux = this.#head;
		while (aux.next && index > 0) {
			aux = aux.next;
			index--;
		}
		if (!aux || index !== 0) return false;
		return aux;
	}

	removeAt(index: number): boolean {
		if (!this.#head) return false;
		let aux = this.#head;
		while (aux.next?.next && index > 1) {
			aux = aux.next;
			index--;
		}
		if (index > 1) return false;
		if (!aux.next?.next) aux.next = undefined;
		else {
			const temp = aux.next;
			aux.next = temp.next;
			temp.next = undefined;
		}
		this.#size--;
		return true;
	}

	instertAt(data: unknown, index: number): boolean {
		if (!this.#head || index === 0) {
			this.insertFirst(data);
			return true;
		}
		let aux = this.#head;
		while (aux.next?.next && index > 1) {
			aux = aux.next;
			index--;
		}
		if (index > 1) this.insertLast(data);
		else {
			const node = new Node(data);
			const temp = aux.next;
			aux.next = node;
			node.next = temp;
			this.#size++;
		}
		return true;
	}

	forEach(callback: { (node: Node, index: number): void }) {
		let aux = this.#head;
		let index = 0;
		while (aux) {
			callback(aux, index);
			aux = aux.next;
			index++;
		}
	}

	*[Symbol.iterator]() {
		let aux = this.#head;
		while (aux) {
			yield aux;
			aux = aux.next;
		}
	}

	print() {
		if (!this.#head) return undefined;
		let aux = this.#head;
		while (aux.next) {
			console.log(aux.data);
			aux = aux.next!;
		}
		console.log(aux.data);
	}
}
