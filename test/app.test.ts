import { sum } from "../src/app";

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
