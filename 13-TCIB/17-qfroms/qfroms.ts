// --- Directions
// Implement a Queue datastructure using two stacks.
// *Do not* create an array inside of the 'Queue' class.
// Queue should implement the methods 'add', 'remove', and 'peek'.
// For a reminder on what each method does, look back
// at the Queue exercise.

import Stack from "./stack";

export default class Queue {
	private stack1: Stack;
	private stack2: Stack;

	constructor() {
		this.stack1 = new Stack();
		this.stack2 = new Stack();
	}

	add(register: unknown) {
		this.stack1.push(register);
	}

	remove() {
		while (this.stack1.peek()) {
			const register = this.stack1.pop();
			this.stack2.push(register);
		}
		const register = this.stack2.pop();
		while (this.stack2.peek()) {
			const register = this.stack2.pop();
			this.stack1.push(register);
		}
		return register;
	}

	peek() {
		while (this.stack1.peek()) {
			const register = this.stack1.pop();
			this.stack2.push(register);
		}
		const register = this.stack2.peek();
		while (this.stack2.peek()) {
			const register = this.stack2.pop();
			this.stack1.push(register);
		}
		return register;
	}
}
