import { vowels } from "./vowels";

test("Should return 3 vowels", () => {
	expect(vowels("Hi there!")).toBe(3);
});

test("Should return 4 vowels", () => {
	expect(vowels("Why do you ask?")).toBe(4);
});

test("Should return 0 vowels", () => {
	expect(vowels("Why?")).toBe(0);
});

test("returns the number of vowels used", () => {
	expect(vowels("aeiou")).toEqual(5);
});

test("returns the number of vowels used when they are capitalized", () => {
	expect(vowels("AEIOU")).toEqual(5);
});

test("returns the number of vowels used", () => {
	expect(vowels("abcdefghijklmnopqrstuvwxyz")).toEqual(5);
});

test("returns the number of vowels used", () => {
	expect(vowels("bcdfghjkl")).toEqual(0);
});
