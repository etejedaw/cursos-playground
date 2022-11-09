// --- Directions
// Write a function that returns the number of vowels
// used in a string.  Vowels are the characters 'a', 'e'
// 'i', 'o', and 'u'.

const allow = ["a", "e", "i", "o", "u"];

export function vowels(str: string): number {
	let count = 0;
	for (let char of str) {
		const letter = char.toLocaleLowerCase();
		if (allow.includes(letter)) count++;
	}
	return count;
}

// --- Other Solutions

// export function vowels(str: string): number {
// 	const match = str.match(/[aeiou]/gi);
// 	if (!match) return 0;
// 	return match.length;
// }
