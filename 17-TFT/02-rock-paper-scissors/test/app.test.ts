import { createRockPaperScissors, Outcome } from "../src/app";

describe("rock-paper-scissors", () => {
	test("given player move paper and opponent move rock should return player wins", () => {
		const sut = createRockPaperScissors();
		const playerMove = "paper";
		const opponentMove = "rock";
		const expected = Outcome.PlayerWins;

		const actual = sut.play(playerMove, opponentMove);

		expect(actual).toBe(expected);
	});

	test("given player move rock and opponent move paper should return player loses", () => {
		const sut = createRockPaperScissors();
		const playerMove = "rock";
		const opponentMove = "paper";
		const expected = Outcome.PlayerLoses;

		const actual = sut.play(playerMove, opponentMove);

		expect(actual).toBe(expected);
	});

	test("given player move paper and opponent move scissors should return player loses", () => {
		const sut = createRockPaperScissors();
		const playerMove = "paper";
		const opponentMove = "scissors";
		const expected = Outcome.PlayerLoses;

		const actual = sut.play(playerMove, opponentMove);

		expect(actual).toBe(expected);
	});

	test("given player move scissors and opponent move paper should return player win", () => {
		const sut = createRockPaperScissors();
		const playerMove = "scissors";
		const opponentMove = "paper";
		const expected = Outcome.PlayerWins;

		const actual = sut.play(playerMove, opponentMove);

		expect(actual).toBe(expected);
	});

	test("given player move rock and opponent move scissors should return player win", () => {
		const sut = createRockPaperScissors();
		const playerMove = "rock";
		const opponentMove = "scissors";
		const expected = Outcome.PlayerWins;

		const actual = sut.play(playerMove, opponentMove);

		expect(actual).toBe(expected);
	});

	test("given player move scissor and opponent move rock should return player loses", () => {
		const sut = createRockPaperScissors();
		const playerMove = "scissors";
		const opponentMove = "rock";
		const expected = Outcome.PlayerLoses;

		const actual = sut.play(playerMove, opponentMove);

		expect(actual).toBe(expected);
	});

	test("given player move scissor and opponent move scissors should return player tie", () => {
		const sut = createRockPaperScissors();
		const playerMove = "scissors";
		const opponentMove = "scissors";
		const expected = Outcome.Tie;

		const actual = sut.play(playerMove, opponentMove);

		expect(actual).toBe(expected);
	});

	test("given player move rock and opponent move rock should return player tie", () => {
		const sut = createRockPaperScissors();
		const playerMove = "rock";
		const opponentMove = "rock";
		const expected = Outcome.Tie;

		const actual = sut.play(playerMove, opponentMove);

		expect(actual).toBe(expected);
	});

	test("given player move paper and opponent move paper should return player tie", () => {
		const sut = createRockPaperScissors();
		const playerMove = "paper";
		const opponentMove = "paper";
		const expected = Outcome.Tie;

		const actual = sut.play(playerMove, opponentMove);

		expect(actual).toBe(expected);
	});
});
