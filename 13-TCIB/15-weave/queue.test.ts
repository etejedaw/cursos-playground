import Queue from "./queue";

test("peek returns, but does not remove, the first value", () => {
	const q = new Queue();
	q.add(1);
	q.add(2);
	expect(q.peek()).toEqual(1);
	expect(q.peek()).toEqual(1);
	expect(q.remove()).toEqual(1);
	expect(q.remove()).toEqual(2);
	expect(q.peek()).toEqual(undefined);
});
