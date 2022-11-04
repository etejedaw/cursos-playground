// --- Directions
// Given a string, return true if the string is a palindrome
// or false if it is not.  Palindromes are strings that
// form the same word if it is reversed. *Do* include spaces
// and punctuation in determining if the string is a palindrome.

export function palindrome(word: string): boolean {
	const reversed = Array.from(word).reverse().join("");
	return word === reversed;
}

// --- Other Solutions

// export function palindrome(word: string): boolean {
// 	for (let i = 0; i < word.length; i++) {
// 		const position = word.length - 1 - i;
// 		if (word[i] !== word[position]) return false;
// 	}
// 	return true;
// }
