import { capitalize } from "./capitalization";

test("Should capitalize the word", () => {
	expect(capitalize("a short sentence")).toBe("A Short Sentence");
});

test("Should capitalize the word", () => {
	expect(capitalize("a lazy fox")).toBe("A Lazy Fox");
});

test("Should capitalize the word", () => {
	expect(capitalize("look, it is working!")).toBe("Look, It Is Working!");
});

test("capitalizes the first letter of every word in a sentence", () => {
	expect(capitalize("hi there, how is it going?")).toEqual(
		"Hi There, How Is It Going?"
	);
});

test("capitalizes the first letter", () => {
	expect(capitalize("i love breakfast at bill miller bbq")).toEqual(
		"I Love Breakfast At Bill Miller Bbq"
	);
});
