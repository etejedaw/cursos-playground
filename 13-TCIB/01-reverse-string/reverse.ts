// --- Directions
// Given a string, return a new string with the reversed
// order of characters

export function reverse(word: string): string {
	return Array.from(word).reverse().join("");
}

// --- Other Solutions

// export function reverse(word: string): string {
// 	let reversed = "";
// 	for (let i = 0; i < word.length; i++) {
// 		const position = word.length - 1 - i;
// 		const letter = word[position];
// 		reversed = reversed.concat(letter);
// 	}
// 	return reversed;
// }

// export function reverse(word: string): string {
// 	return Array.from(word).reduce((reversed, letter) => letter + reversed, "");
// }
