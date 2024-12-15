export function stringCalculator(stringNumbers: string): number {
	const delimeter = extractDelimeter(stringNumbers);
	const numbers = stringNumbers
		.replace("//", "")
		.replaceAll(delimeter, ",")
		.replaceAll("\n", ",")
		.split(",")
		.map(Number);

	const negativeNumbers = numbers.filter(num => num < 0);
	if (negativeNumbers.length)
		throw `negative numbers are not allowed ${negativeNumbers.join()}`;

	return numbers
		.filter(num => num <= 1000)
		.reduce((acc, current) => acc + current);
}

function extractDelimeter(stringNumbers: string): string {
	if (!stringNumbers.includes("//")) return ",";
	return stringNumbers[2];
}
