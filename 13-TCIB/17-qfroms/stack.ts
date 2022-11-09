export default class Stack {
	private data: Array<unknown>;

	constructor() {
		this.data = [];
	}

	push(record: unknown) {
		this.data.push(record);
	}

	pop(): unknown {
		return this.data.pop();
	}

	peek(): unknown {
		return this.data.at(-1);
	}
}
