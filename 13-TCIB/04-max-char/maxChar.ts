//  --- Directions
// Given a string, return the character that is most
// commonly used in the string

export function maxChar(str: string): string {
	const dict: { [key: string]: number } = {};
	for (let char of str) {
		if (!dict.hasOwnProperty(char)) dict[char] = 1;
		else dict[char] = dict[char] + 1;
	}
	return Object.keys(dict).reduce((a, b) => (dict[a] > dict[b] ? a : b));
}
