import { fizzBuzz } from "../src/fizzBuzz";

describe("fizz-buzz", () => {
	test("given 1 should return 1", () => {
		const input = 1;
		const expected = 1;

		const actual = fizzBuzz(input);

		expect(actual).toBe(expected);
	});

	test("given 2 should return 2", () => {
		const input = 2;
		const expected = 2;

		const actual = fizzBuzz(input);

		expect(actual).toBe(expected);
	});

	test("given 3 should return 'fizz'", () => {
		const input = 3;
		const expected = "fizz";

		const actual = fizzBuzz(input);

		expect(actual).toBe(expected);
	});

	test("given 6 should return 'fizz'", () => {
		const input = 6;
		const expected = "fizz";

		const actual = fizzBuzz(input);

		expect(actual).toBe(expected);
	});

	test("given 5 should return 'buzz'", () => {
		const input = 5;
		const expected = "buzz";

		const actual = fizzBuzz(input);

		expect(actual).toBe(expected);
	});

	test("given 10 should return 'buzz'", () => {
		const input = 10;
		const expected = "buzz";

		const actual = fizzBuzz(input);

		expect(actual).toBe(expected);
	});

	test("given 15 should return 'fizzbuzz'", () => {
		const input = 15;
		const expected = "fizzbuzz";

		const actual = fizzBuzz(input);

		expect(actual).toBe(expected);
	});

	test("given 20 should return 'buzz'", () => {
		const input = 20;
		const expected = "buzz";

		const actual = fizzBuzz(input);

		expect(actual).toBe(expected);
	});

	test("given 22 should return 22", () => {
		const input = 22;
		const expected = 22;

		const actual = fizzBuzz(input);

		expect(actual).toBe(expected);
	});
});
