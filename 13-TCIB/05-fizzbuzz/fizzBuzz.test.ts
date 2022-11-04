import { fizzBuzz } from "./fizzBuzz";

test("should return 'fizz'", () => {
	expect(fizzBuzz(3)).toBe("fizz");
});

test("should return 'fizz'", () => {
	expect(fizzBuzz(6)).toBe("fizz");
});

test("should return 'buzz'", () => {
	expect(fizzBuzz(5)).toBe("buzz");
});

test("should return 'buzz'", () => {
	expect(fizzBuzz(10)).toBe("buzz");
});

test("should return the number", () => {
	expect(fizzBuzz(1)).toBe(1);
});

test("should return the number", () => {
	expect(fizzBuzz(4)).toBe(4);
});

test("should return fizzbuzz", () => {
	expect(fizzBuzz(15)).toBe("fizzbuzz");
});

test("should return fizzbuzz", () => {
	expect(fizzBuzz(30)).toBe("fizzbuzz");
});
