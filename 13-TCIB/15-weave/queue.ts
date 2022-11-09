// --- Directions
// Implement a 'peek' method in this Queue class.
// Peek should return the last element (the next
// one to be returned) from the queue *without*
// removing it.

export default class Queue {
	private data: Array<unknown>;

	constructor() {
		this.data = [];
	}

	add(data: unknown): boolean {
		this.data.unshift(data);
		return true;
	}

	remove(): unknown {
		return this.data.pop();
	}

	peek() {
		return this.data.at(-1);
	}
}
