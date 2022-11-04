// --- Directions
// Write a program that console logs the numbers
// from 1 to n. But for multiples of three print
// “fizz” instead of the number and for the multiples
// of five print “buzz”. For numbers which are multiples
// of both three and five print “fizzbuzz”.

type FizzBuzz = number | "fizz" | "buzz" | "fizzbuzz";

export function fizzBuzz(n: number): FizzBuzz {
	if (n % 15 === 0) return "fizzbuzz";
	if (n % 3 === 0) return "fizz";
	if (n % 5 === 0) return "buzz";
	return n;
}
