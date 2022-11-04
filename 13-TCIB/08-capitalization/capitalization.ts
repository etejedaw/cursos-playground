// --- Directions
// Write a function that accepts a string. The function should
// capitalize the first letter of each word in the string then
// return the capitalized string.

export function capitalize(str: string): string {
	const array = str.split(" ");
	const capitalWord = array.map(word => {
		const first = word[0];
		return word.replace(first, first.toLocaleUpperCase());
	});
	return capitalWord.join(" ");
}

// Other Solutions

// export function capitalize(str: string): string {
// 	const words = [];
// 	for (let word of str.split(" "))
// 		words.push(word[0].toUpperCase() + word.slice(1));
// 	return words.join(" ");
// }

// export function capitalize(str: string): string {
// 	let result = "";
// 	let prev = true;
// 	for (let letter of str) {
// 		if (prev) {
// 			result = result.concat(letter.toUpperCase());
// 			prev = false;
// 		} else if (letter === " ") {
// 			prev = true;
// 			result = result.concat(" ");
// 		} else result = result.concat(letter);
// 	}
// 	return result;
// }
