export function pyramid(n: number) {
	const array = [] as Array<Array<string>>;
	for (let i = 0; i < n; i++) {
		array[i] = [];
		for (let j = 0; j < 2 * n - 1; j++) {
			array[i][j] = "_";
			if (i + j >= n - 1 && j - i <= n - 1) array[i][j] = "*";
		}
	}
	print(array);
}

function print(array: Array<Array<string>>) {
	let matrix = "";
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array[i].length; j++) matrix = matrix + array[i][j];
		matrix = matrix + "\n";
	}
	console.log(matrix);
}

pyramid(10);
