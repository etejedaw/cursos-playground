import { stringCalculator } from "../src/string-calculator";

describe("string-calculator", () => {
	describe("should return 0 in empty case", () => {
		it("should return 0", () => {
			const input = "";
			const expected = 0;

			const actual = stringCalculator(input);

			expect(actual).toBe(expected);
		});
	});

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

	describe("should return the sum of two number splitted by comma (,)", () => {
		it("should return 4 (2,2)", () => {
			const input = "2,2";
			const expected = 4;

			const actual = stringCalculator(input);

			expect(actual).toBe(expected);
		});
		it("should return 9 (5,4)", () => {
			const input = "5,4";
			const expected = 9;

			const actual = stringCalculator(input);

			expect(actual).toBe(expected);
		});
		it("should return 33 (10,23)", () => {
			const input = "5,4";
			const expected = 9;

			const actual = stringCalculator(input);

			expect(actual).toBe(expected);
		});
	});

	describe("should return the sum of many numbers", () => {
		it("should return 12 (5,3,4)", () => {
			const input = "5,3,4";
			const expected = 12;

			const actual = stringCalculator(input);

			expect(actual).toBe(expected);
		});
		it("should return 70 (45,20,4,1)", () => {
			const input = "45,20,4,1";
			const expected = 70;

			const actual = stringCalculator(input);

			expect(actual).toBe(expected);
		});
	});

	describe(`should admit '\\n' as delimeter`, () => {
		it("should return 5 (3\\n2)", () => {
			const input = "3\n2";
			const expected = 5;

			const actual = stringCalculator(input);

			expect(actual).toBe(expected);
		});
		it("should return 6 (3\\n2\\n1)", () => {
			const input = "3\n2\n1";
			const expected = 6;

			const actual = stringCalculator(input);

			expect(actual).toBe(expected);
		});
		it("should return 16 (10,3\\n2\\n1)", () => {
			const input = "10,3\n2\n1";
			const expected = 16;

			const actual = stringCalculator(input);

			expect(actual).toBe(expected);
		});
		it("should return 60 (1\\n2,3,4\\n50)", () => {
			const input = "1\n2,3,4\n50";
			const expected = 60;

			const actual = stringCalculator(input);

			expect(actual).toBe(expected);
		});
	});

	describe("should allow custom delimeters", () => {
		it("should return 3 with ';' delimeter (//;\\n1;2)", () => {
			const input = "//;\n1;2";
			const expected = 3;

			const actual = stringCalculator(input);

			expect(actual).toBe(expected);
		});
		it("should return 75 with '@' delimeter (//@\\n2@20@50@3)", () => {
			const input = "//@\n2@20@50@3";
			const expected = 75;

			const actual = stringCalculator(input);

			expect(actual).toBe(expected);
		});
	});

	describe("should throw an expection if a number is negative", () => {
		it("should throw an error only with one negative number", () => {
			const input = "-10";

			expect(() => stringCalculator(input)).toThrow(
				"negative numbers are not allowed -10"
			);
		});
		it("should throw an error with two negative number", () => {
			const input = "-10,-5";

			expect(() => stringCalculator(input)).toThrow(
				"negative numbers are not allowed -10,-5"
			);
		});
		it("should throw an error and show only the two negative number", () => {
			const input = "-10,3,-8";

			expect(() => stringCalculator(input)).toThrow(
				"negative numbers are not allowed -10,-8"
			);
		});
		it("should throw an error and show only the two negative number with custom delimeter", () => {
			const input = "//@\n2@20@-50@-3@4@33";

			expect(() => stringCalculator(input)).toThrow(
				"negative numbers are not allowed -50,-3"
			);
		});
	});

	describe("should omit numbers bigger than 1000", () => {
		it("should omit 1001", () => {
			const input = "2,1001";
			const expected = 2;

			const actual = stringCalculator(input);

			expect(actual).toBe(expected);
		});
		it("should omit 2001 and 40123", () => {
			const input = "2,1001,9,40123";
			const expected = 11;

			const actual = stringCalculator(input);

			expect(actual).toBe(expected);
		});
		it("should omit 5000 and 3433 with custom delimeter", () => {
			const input = "//@\n2@20@5000@3433@1";
			const expected = 23;

			const actual = stringCalculator(input);

			expect(actual).toBe(expected);
		});
	});
});
