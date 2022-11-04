import { maxChar } from "./maxChar";

test("Max character is 'c'", () => {
	expect(maxChar("abcccccccd")).toEqual("c");
});

test("Max character is '1'", () => {
	expect(maxChar("apple 1231111")).toEqual("1");
});

test("Finds the most frequently used char", () => {
	expect(maxChar("a")).toEqual("a");
	expect(maxChar("abcdefghijklmnaaaaa")).toEqual("a");
});

test("Works with numbers in the string", () => {
	expect(maxChar("ab1c1d1e1f1g1")).toEqual("1");
});
