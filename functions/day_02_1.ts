const actual: CubeSet = {
  red: 12,
  green: 13,
  blue: 14,
};

type CubeSet = { red: number; green: number; blue: number };
type Game = {
  id: number;
  bagPulls: CubeSet[];
};

// Example
// Game 1: 7 red, 14 blue; 2 blue, 3 red, 3 green; 4 green, 12 blue, 15 red; 3 green, 12 blue, 3 red; 11 red, 2 green
//
function extractNumber(input: string): number {
  return parseInt(input.match(/\d+/)?.[0]!);
}

function parseLine(line: string): Game {
  const [gameIdString, bagPullsPart] = line.split(":");
  const id = extractNumber(gameIdString);
  const bagPulls: CubeSet[] = bagPullsPart.split(";").map((pullString) => {
    return pullString.split(",").reduce(
      (acc, part) => {
        const count = extractNumber(part);
        if (/red/.test(part)) {
          acc.red = count;
        }
        if (/green/.test(part)) {
          acc.green = count;
        }
        if (/blue/.test(part)) {
          acc.blue = count;
        }
        return acc;
      },
      { red: 0, green: 0, blue: 0 },
    );
  });
  return { id, bagPulls };
}

function validateGame(game: Game, real: CubeSet): boolean {
  const maxColors = game.bagPulls.reduce(
    (acc, currentPull) => {
      acc.red = Math.max(currentPull.red, acc.red);
      acc.green = Math.max(currentPull.green, acc.green);
      acc.blue = Math.max(currentPull.blue, acc.blue);
      return acc;
    },
    {
      red: 0,
      green: 0,
      blue: 0,
    },
  );

  for (const [color, value] of Object.entries(maxColors)) {
    const actualColorValue = real[color as keyof CubeSet];
    if (value > actualColorValue) {
      return false;
    }
  }
  return true;
}

export default function sumValidGameIds(input: string): number {
  const lines = input.split("\n");
  return lines.reduce((acc, currentLine) => {
    if (currentLine.length === 0) return acc;
    const game = parseLine(currentLine);
    if (validateGame(game, actual)) {
      return acc + game.id;
    }
    return acc;
  }, 0);
}
