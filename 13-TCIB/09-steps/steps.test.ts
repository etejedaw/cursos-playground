import { steps } from "./steps";

test("Should return two '#'", () => {
	expect(steps(2)).toBe("##");
});
