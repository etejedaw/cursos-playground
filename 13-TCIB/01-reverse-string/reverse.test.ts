import { reverse } from "./reverse";

test("Reverse a string", () => {
	expect(reverse("apple")).toEqual("elppa");
});

test("Reverse a string", () => {
	expect(reverse("hello")).toEqual("olleh");
});

test("Reverse a string", () => {
	expect(reverse("Greetings!")).toEqual("!sgniteerG");
});

test("Reverse a string", () => {
	expect(reverse("abcd")).toEqual("dcba");
});

test("Reverse a string", () => {
	expect(reverse("  abcd")).toEqual("dcba  ");
});
