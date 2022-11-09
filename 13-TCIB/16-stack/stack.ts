export default class Stack {
	private data: Array<number>;
	constructor() {
		this.data = [];
	}

	push(data: number) {
		this.data.push(data);
	}

	pop() {
		return this.data.pop();
	}

	peek() {
		return this.data.at(-1);
	}
}
