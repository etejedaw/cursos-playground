import { checkPrimeSync } from "node:crypto";

type FizzWhiz =
	| "fizz"
	| "buzz"
	| "fizzbuzz"
	| "whiz"
	| "fizzwhiz"
	| "buzzwhiz"
	| number;

export function fizzWhiz(num: number): FizzWhiz {
	if (num % 15 === 0) return "fizzbuzz";
	if (num % 3 === 0 && isPrime(num)) return "fizzwhiz";
	if (num % 3 === 0) return "fizz";
	if (num % 5 === 0 && isPrime(num)) return "buzzwhiz";
	if (num % 5 === 0) return "buzz";
	if (isPrime(num)) return "whiz";
	return num;
}

export function isPrime(num: number): boolean {
	return checkPrimeSync(BigInt(num));
}
