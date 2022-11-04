export function pyramid(n: number) {
	const array = [] as Array<Array<string>>;
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n + 2; j++) {
			array[i][j] = "#";
		}
	}
	console.log(array);
}

pyramid(2);
