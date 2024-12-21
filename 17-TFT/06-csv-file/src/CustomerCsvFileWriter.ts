import { Customer } from "./Customer";
import { FileWriter } from "./FileWriter";

export class CustomerCsvFileWriter {
	readonly #fileWriter: FileWriter;

	constructor(fileWriter: FileWriter) {
		this.#fileWriter = fileWriter;
	}

	writeCustomers(fileName: string, customers: Customer[]) {
		customers.forEach(customer =>
			this.#fileWriter.writeLine(
				fileName,
				`${customer.name},${customer.contactNumber}`
			)
		);
	}
}
