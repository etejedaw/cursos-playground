// --- Directions
// 1) Complete the task in weave/queue.js
// 2) Implement the 'weave' function.  Weave
// receives two queues as arguments and combines the
// contents of each into a new, third queue.
// The third queue should contain the *alterating* content
// of the two queues.  The function should handle
// queues of different lengths without inserting
// 'undefined' into the new one.
// *Do not* access the array inside of any queue, only
// use the 'add', 'remove', and 'peek' functions.

import Queue from "./queue";

export function weave(queueA: Queue, queueB: Queue): Queue {
	const queue = new Queue();
	while (queueA.peek() || queueB.peek()) {
		if (queueA.peek()) queue.add(queueA.remove());
		if (queueB.peek()) queue.add(queueB.remove());
	}
	queue.add(queueA.remove());
	queue.add(queueB.remove());
	return queue;
}
