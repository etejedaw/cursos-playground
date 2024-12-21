import { Customer } from "../src/Customer";
import { CustomerCsvFileWriter } from "../src/CustomerCsvFileWriter";
import { FileWriter } from "../src/FileWriter";

describe("CustomerCsvFileWriter", () => {
	test("given one customer should write that customer to given file", () => {
		const customer = new Customer("Peter Wiles", "123-456-789");
		const fileWriter: FileWriter = { writeLine: jest.fn() };
		const sut = new CustomerCsvFileWriter(fileWriter);

		sut.writeCustomers("customer.csv", [customer]);

		expect(fileWriter.writeLine).toHaveBeenCalledTimes(1);
		expect(fileWriter.writeLine).toHaveBeenCalledWith(
			"customer.csv",
			"Peter Wiles,123-456-789"
		);
	});
	test("given two customers should write that customer to given file", () => {
		const customer1 = new Customer("Peter Wiles", "123-456-789");
		const customer2 = new Customer("Brendon Page", "111-222-333");
		const fileWriter: FileWriter = { writeLine: jest.fn() };
		const sut = new CustomerCsvFileWriter(fileWriter);

		sut.writeCustomers("customers.csv", [customer1, customer2]);

		expect(fileWriter.writeLine).toHaveBeenCalledTimes(2);
		expect(fileWriter.writeLine).toHaveBeenCalledWith(
			"customers.csv",
			"Peter Wiles,123-456-789"
		);
		expect(fileWriter.writeLine).toHaveBeenCalledWith(
			"customers.csv",
			"Brendon Page,111-222-333"
		);
	});
	test("given multiples customers should write that customer to given file", () => {
		const customers = [
			new Customer("Peter Wiles", "123-456-789"),
			new Customer("Brendon Page", "111-222-333"),
			new Customer("Bob Dylan", "444-555-666"),
			new Customer("Eric Clapton", "777-888-999"),
		];
		const fileWriter: FileWriter = { writeLine: jest.fn() };
		const sut = new CustomerCsvFileWriter(fileWriter);

		sut.writeCustomers("customers.csv", customers);

		expect(fileWriter.writeLine).toHaveBeenCalledTimes(customers.length);
		expect(fileWriter.writeLine).toHaveBeenCalledWith(
			"customers.csv",
			"Peter Wiles,123-456-789"
		);
		expect(fileWriter.writeLine).toHaveBeenCalledWith(
			"customers.csv",
			"Brendon Page,111-222-333"
		);
		expect(fileWriter.writeLine).toHaveBeenCalledWith(
			"customers.csv",
			"Bob Dylan,444-555-666"
		);
		expect(fileWriter.writeLine).toHaveBeenCalledWith(
			"customers.csv",
			"Eric Clapton,777-888-999"
		);
	});
});
