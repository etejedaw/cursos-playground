import { addTax, sum } from "../src/app";

describe("sum two numbers", () => {
	it("should return 9 (4+5)", () => {
		const inputA = 4;
		const inputB = 5;
		const expected = 9;

		const actual = sum(inputA, inputB);

		expect(actual).toBe(expected);
	});
	it("should return 10 (5+5)", () => {
		const input = 5;
		const expected = 10;

		const actual = sum(input, input);

		expect(actual).toBe(expected);
	});
});

describe("add tax", () => {
	it("should return 190 (1000*19%)", () => {
		const input = 1000;
		const expected = 191;

		const actual = addTax(input);

		expect(actual).toBe(expected);
	});
});
