type Movements = "rock" | "paper" | "scissors";

export enum Outcome {
	PlayerWins,
	PlayerLoses,
	Tie
}

interface Scenarios {
	playerMove: Movements;
	opponentMove: Movements;
	outcome: Outcome;
}

export function createRockPaperScissors() {
	const scenarios: Scenarios[] = [
		{
			playerMove: "scissors",
			opponentMove: "paper",
			outcome: Outcome.PlayerWins
		},
		{
			playerMove: "scissors",
			opponentMove: "rock",
			outcome: Outcome.PlayerLoses
		},
		{
			playerMove: "rock",
			opponentMove: "scissors",
			outcome: Outcome.PlayerWins
		},
		{
			playerMove: "rock",
			opponentMove: "paper",
			outcome: Outcome.PlayerLoses
		},
		{
			playerMove: "paper",
			opponentMove: "rock",
			outcome: Outcome.PlayerWins
		},
		{
			playerMove: "paper",
			opponentMove: "scissors",
			outcome: Outcome.PlayerLoses
		}
	];
	return {
		play(playerMove: Movements, opponentMove: Movements): Outcome {
			const result = scenarios.find(
				scenario =>
					scenario.playerMove === playerMove &&
					scenario.opponentMove === opponentMove
			);
			return result ? result.outcome : Outcome.Tie;
		}
	};
}
