export function sum(a: number, b: number) {
	return a + b;
}

export function multiply(a: number, b: number) {
	return a * b;
}

export function addTax(amount: number) {
	const tax = Number(process.env.TAX) || 0.19;
	return amount * tax;
}
