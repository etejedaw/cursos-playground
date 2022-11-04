// -- Directions

// Given a integer, return an integer that is the reverse
// ordering of numbers.

export function reverseInt(n: number): number {
	const str = n.toString();
	const isMinus = str[0] === "-";
	const reversed = Array.from(str).reverse().join("");
	if (isMinus) return parseInt(reversed) * -1;
	return parseInt(reversed);
}

// -- Other Solutions

// export function reverseInt(n: number): number {
// 	const sign = Math.sign(n);
// 	const str = n.toString();
// 	const reversed = Array.from(str).reverse(+).join("");
// 	return parseInt(reversed) * sign;
// }
