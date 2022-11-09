// --- Description
// Create a queue data structure.  The queue
// should be a class with methods 'add' and 'remove'.
// Adding to the queue should store an element until
// it is removed

class Nodo {
	private data: number;
	private next?: Nodo;

	constructor(data: number) {
		this.data = data;
	}

	getData() {
		return this.data;
	}

	getNext() {
		return this.next;
	}

	setNext(next: Nodo) {
		this.next = next;
	}
}

export default class Queue {
	private head?: Nodo;
	private size: number;

	constructor() {
		this.size = 0;
	}

	isEmpty(): boolean {
		return this.head ? true : false;
	}

	getSize(): number {
		return this.size;
	}

	add(data: number) {
		const nodo = new Nodo(data);
		if (!this.head) this.head = nodo;
		else {
			let auxNode = this.head;
			while (auxNode.getNext()) auxNode = auxNode.getNext()!;
			auxNode.setNext(nodo);
		}
		this.size++;
	}

	remove() {
		if (!this.head) return undefined;
		const data = this.head.getData();
		this.head = this.head.getNext();
		this.size--;
		return data;
	}

	print() {
		if (!this.head) return undefined;
		let aux = this.head;
		while (aux.getNext()) {
			console.log(aux.getData());
			aux = aux.getNext()!;
		}
		console.log(aux.getData());
	}
}

// Other Solutions

// class Queue {
// 	private T: Array<unknown>;

// 	constructor() {
// 		this.T = [];
// 	}

// 	add(data: unknown): boolean {
// 		this.T.unshift(data);
// 		return true;
// 	}

// 	remove(): unknown {
// 		return this.T.pop();
// 	}
// }
