//  --- Directions
// Given an array and chunk size, divide the array inyo many
// where each subarray is of length size

export function chunk(array: number[], size: number): Array<Array<number>> {
	const chunked = [] as Array<Array<number>>;
	let jump = 0;
	while (jump < array.length) {
		chunked.push(array.slice(jump, jump + size));
		jump = jump + size;
	}
	return chunked;
}

// --- Other Solutions

// export function chunk(array: number[], size: number): Array<Array<number>> {
// 	const chunked = [] as Array<Array<number>>;
// 	for (let element of array) {
// 		const last = chunked[chunked.length - 1];
// 		if (!last || last.length === size) chunked.push([element]);
// 		else last.push(element);
// 	}
// 	return chunked;
// }
