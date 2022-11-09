// --- Directions
// Write a function that accepts an integer N
// and returns a NxN spiral matrix.

export function matrix(n: number): Array<Array<string | number>> {
	const arr = [] as Array<Array<string | number>>;
	for (let i = 0; i < n; i++) {
		arr[i] = [];
		for (let j = 0; j < n; j++) arr[i][j] = calcNum(i, j, n);
	}
	return arr;
}

function calcNum(i: number, j: number, n: number): number | string {
	if (i === 0) return n - (n - j) + 1;
	if (j === n - 1) return n + i - 1 + 1;
	if (i === n - 1) return n + (2 * n - 2 - j);
	if (i > 0 && j === 0) return n + (3 * (n - 1) - 1) - (i - 1);
	return "#";
}

console.table(matrix(6));
