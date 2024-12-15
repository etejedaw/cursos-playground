type FizzBuzz = "fizz" | "buzz" | "fizzbuzz" | number;

export function fizzBuzz(num: number): FizzBuzz {
	if (num % 15 === 0) return "fizzbuzz";
	if (num % 3 === 0) return "fizz";
	if (num % 5 === 0) return "buzz";
	return num;
}
