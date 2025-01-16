export function sum(a: number, b: number) {
	return a + b;
}

export function multiply(a: number, b: number) {
	return a * b;
}

export function addTax(amount: number) {
	const tax = Number(process.env.TAX);
	return amount * tax;
}
