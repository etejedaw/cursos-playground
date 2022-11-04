export function steps(n: number): string {
	const CHAR = "#";
	return CHAR.repeat(n);
}

function init(n: number) {
	for (let i = 1; i <= n; i++) {
		const SPACE = " ";
		const DELIMITER = "'";
		console.log(
			DELIMITER.concat(steps(i))
				.concat(SPACE.repeat(n - i))
				.concat(DELIMITER)
		);
	}
}

init(20);
