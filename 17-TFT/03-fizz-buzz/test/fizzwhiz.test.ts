import { fizzWhiz, isPrime } from "../src/fizzWhiz";

describe("fizz-whiz", () => {
	it("give 1 should return 1", () => {
		const input = 1;
		const expected = 1;

		const actual = fizzWhiz(input);

		expect(actual).toBe(expected);
	});

	it("give 2 should return 'whiz'", () => {
		const input = 2;
		const expected = "whiz";

		const actual = fizzWhiz(input);

		expect(actual).toBe(expected);
	});

	it("give 3 should return 'fizzwhiz'", () => {
		const input = 3;
		const expected = "fizzwhiz";

		const actual = fizzWhiz(input);

		expect(actual).toBe(expected);
	});

	it("give 4 should return 'fizzwhiz'", () => {
		const input = 4;
		const expected = 4;

		const actual = fizzWhiz(input);

		expect(actual).toBe(expected);
	});

	it("give 5 should return 'buzzwhiz'", () => {
		const input = 5;
		const expected = "buzzwhiz";

		const actual = fizzWhiz(input);

		expect(actual).toBe(expected);
	});

	it("give 6 should return 'fizz'", () => {
		const input = 6;
		const expected = "fizz";

		const actual = fizzWhiz(input);

		expect(actual).toBe(expected);
	});

	it("give 7 should return 'whiz'", () => {
		const input = 7;
		const expected = "whiz";

		const actual = fizzWhiz(input);

		expect(actual).toBe(expected);
	});

	it("give 8 should return 8", () => {
		const input = 8;
		const expected = 8;

		const actual = fizzWhiz(input);

		expect(actual).toBe(expected);
	});

	it("give 9 should return 'Fizz", () => {
		const input = 9;
		const expected = "fizz";

		const actual = fizzWhiz(input);

		expect(actual).toBe(expected);
	});

	it("give 10 should return 'buzz'", () => {
		const input = 10;
		const expected = "buzz";

		const actual = fizzWhiz(input);

		expect(actual).toBe(expected);
	});

	it("give 11 should return 'whiz'", () => {
		const input = 11;
		const expected = "whiz";

		const actual = fizzWhiz(input);

		expect(actual).toBe(expected);
	});

	it("give 12 should return 'Fizz", () => {
		const input = 12;
		const expected = "fizz";

		const actual = fizzWhiz(input);

		expect(actual).toBe(expected);
	});

	it("give 13 should return 'whiz'", () => {
		const input = 13;
		const expected = "whiz";

		const actual = fizzWhiz(input);

		expect(actual).toBe(expected);
	});

	it("give 14 should return 14", () => {
		const input = 14;
		const expected = 14;

		const actual = fizzWhiz(input);

		expect(actual).toBe(expected);
	});

	it("give 15 should return 'fizzbuzz'", () => {
		const input = 15;
		const expected = "fizzbuzz";

		const actual = fizzWhiz(input);

		expect(actual).toBe(expected);
	});
});

describe("is-prime", () => {
	it("give 1 should return false", () => {
		const input = 1;
		const expected = false;

		const actual = isPrime(input);

		expect(actual).toBe(expected);
	});

	it("give 2 should return false", () => {
		const input = 2;
		const expected = true;

		const actual = isPrime(input);

		expect(actual).toBe(expected);
	});

	it("give 3 should return true", () => {
		const input = 3;
		const expected = true;

		const actual = isPrime(input);

		expect(actual).toBe(expected);
	});

	it("give 4 should return false", () => {
		const input = 4;
		const expected = false;

		const actual = isPrime(input);

		expect(actual).toBe(expected);
	});

	it("give 5 should return true", () => {
		const input = 5;
		const expected = true;

		const actual = isPrime(input);

		expect(actual).toBe(expected);
	});
});
