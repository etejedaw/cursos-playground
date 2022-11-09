// --- Directions
// Print out the n-th entry in the fibonacci series.
// The fibonacci series is an ordering of numbers where
// each number is the sum of the preceeding two.

export function fib(num: number): number {
	if (num < 2) return num;
	return fib(num - 1) + fib(num - 2);
}

// Other Solutions

// export function fib(num: number): number {
// 	const result = [0, 1] as Array<number>;
// 	for (let i = 2; i <= num; i++) {
// 		const f1 = result[i - 1];
// 		const f2 = result[i - 2];
// 		result[i] = f1 + f2;
// 	}
// 	return result[num];
// }

// const dict = [0, 1];
// export function fib(num: number): number {
// 	if (num < 2) return dict[num];
// 	if (!dict[num]) {
// 		const f1 = fib(num - 1);
// 		const f2 = fib(num - 2);
// 		dict[num] = f1 + f2;
// 	}
// 	return dict[num];
// }
