import { stringCalculator } from "../src/string-calculator";

describe("string-calculator", () => {
	describe("should return the same number", () => {
		it("should return 2", () => {
			const input = "2";
			const expected = 2;

			const actual = stringCalculator(input);

			expect(actual).toBe(expected);
		});

		it("should return 4", () => {
			const input = "4";
			const expected = 4;

			const actual = stringCalculator(input);

			expect(actual).toBe(expected);
		});

		it("should return 5", () => {
			const input = "5";
			const expected = 5;

			const actual = stringCalculator(input);

			expect(actual).toBe(expected);
		});

		it("should return 10", () => {
			const input = "10";
			const expected = 10;

			const actual = stringCalculator(input);

			expect(actual).toBe(expected);
		});
	});
});
