import { ageCalculator } from "../src/age-calculator";

describe("age-calculator", () => {
	it("the target date given is previous the birthday", () => {
		const inputBirthday = new Date("1995/12/11");
		const inputTargetDate = new Date("2000/03/21");
		const expected = 4;

		const actual = ageCalculator(inputBirthday, inputTargetDate);

		expect(actual).toBe(expected);
	});

	it("the target date given is after the birthday", () => {
		const inputBirthday = new Date("1995/12/11");
		const inputTargetDate = new Date("2001/12/21");
		const expected = 6;

		const actual = ageCalculator(inputBirthday, inputTargetDate);

		expect(actual).toBe(expected);
	});
});
