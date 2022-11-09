import { fib } from "./fib";

test("Should return 0", () => {
	expect(fib(0)).toBe(0);
});

test("Should return 1", () => {
	expect(fib(1)).toBe(1);
});

test("Should return 1", () => {
	expect(fib(2)).toBe(1);
});

test("Should return 3", () => {
	expect(fib(4)).toBe(3);
});

test("calculates correct fib value for 1", () => {
	expect(fib(1)).toEqual(1);
});

test("calculates correct fib value for 2", () => {
	expect(fib(2)).toEqual(1);
});

test("calculates correct fib value for 3", () => {
	expect(fib(3)).toEqual(2);
});

test("calculates correct fib value for 4", () => {
	expect(fib(4)).toEqual(3);
});

test("calculates correct fib value for 15", () => {
	expect(fib(39)).toEqual(63245986);
});
