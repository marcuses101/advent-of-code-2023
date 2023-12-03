import { Game, findMinimumCubeSet, parseLine } from "./day_02_1";

function calculateGamePower(game: Game): number {
  const minimumCubeSet = findMinimumCubeSet(game.bagPulls);
  return Object.values(minimumCubeSet).reduce((acc, cur) => acc * cur, 1);
}

export default function sumPower(input: string): number {
  const lines = input.split("\n");
  return lines.reduce((acc, line) => {
    if (line.length === 0) return acc;
    const game = parseLine(line);
    const gamePower = calculateGamePower(game);
    return acc + gamePower;
  }, 0);
}
