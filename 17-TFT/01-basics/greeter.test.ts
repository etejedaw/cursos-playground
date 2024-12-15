import { greeter } from "./greeter";

describe("HelloWorld", () => {
	test("Given default return Hello World!", () => {
		// Arrange: Put everything to setup before run test
		const sut = greeter();
		const expected = "Hello World!";

		// Act: Execute code to testing
		const actual = sut.helloWorld();

		// Assert: Check the code
		expect(actual).toBe(expected);
	});
});

describe("HelloPerson", () => {
	it("Give empty name should return Hello !", () => {
		const sut = greeter();
		const expected = "Hello !";
		const input = "";

		const actual = sut.helloPerson(input);

		expect(actual).toBe(expected);
	});

	it("Give Peter name should return Hello Peter!", () => {
		const sut = greeter();
		const expected = "Hello Peter!";
		const input = "Peter";

		const actual = sut.helloPerson(input);

		expect(actual).toBe(expected);
	});
});
