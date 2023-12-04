type PartNumberLocation = {
  partNumber: number;
  lineIndex: number;
  partNumberStartIndex: number;
  partNumberEndIndex: number;
};

type CharacterLocation = {
  char: string;
  rowIndex: number;
  columnIndex: number;
};

type PotentialPart = {
  partNumber: number;
  adjacentCharacters: CharacterLocation[];
};

function getAdjacentCharacters(
  { lineIndex, partNumberStartIndex, partNumberEndIndex }: PartNumberLocation,
  lines: string[],
): { char: string; rowIndex: number; columnIndex: number }[] {
  const adjacentSymbols: CharacterLocation[] = [];
  const leftIndex = partNumberStartIndex - 1;
  const leftChar = lines[lineIndex][leftIndex];
  if (leftChar !== undefined) {
    adjacentSymbols.push({
      char: leftChar,
      rowIndex: lineIndex,
      columnIndex: leftIndex,
    });
  }
  const rightIndex = partNumberEndIndex;
  const rightChar = lines[lineIndex][rightIndex];
  if (rightChar !== undefined) {
    adjacentSymbols.push({
      char: rightChar,
      rowIndex: lineIndex,
      columnIndex: rightIndex,
    });
  }
  const lineAboveIndex = lineIndex - 1;
  const lineBelowIndex = lineIndex + 1;
  const lineAbove = lines[lineAboveIndex];
  const lineBelow = lines[lineBelowIndex];

  for (let i = leftIndex; i <= rightIndex; i++) {
    const charAbove = lineAbove?.[i];
    if (charAbove !== undefined) {
      adjacentSymbols.push({
        char: charAbove,
        rowIndex: lineAboveIndex,
        columnIndex: i,
      });
    }
    const charBelow = lineBelow?.[i];
    if (charBelow !== undefined) {
      adjacentSymbols.push({
        char: charBelow,
        rowIndex: lineBelowIndex,
        columnIndex: i,
      });
    }
  }
  return adjacentSymbols;
}

export function inputToPossibleParts(input: string): PotentialPart[] {
  const partLocations: PartNumberLocation[] = [];
  const lines = input.split("\n");
  lines.forEach((line, lineIndex) => {
    for (let match of line.matchAll(/\d+/g)) {
      const location: PartNumberLocation = {
        partNumber: parseInt(match[0]),
        lineIndex,
        partNumberStartIndex: match.index!,
        partNumberEndIndex: match.index! + match[0].length,
      };
      partLocations.push(location);
    }
  });
  const potentialParts = partLocations.map((location) => {
    const possiblePart: PotentialPart = {
      partNumber: location.partNumber,
      adjacentCharacters: getAdjacentCharacters(location, lines),
    };
    return possiblePart;
  });
  return potentialParts;
}

export default function findMissingParts(input: string) {
  const potentialParts = inputToPossibleParts(input);
  return potentialParts.reduce(
    (acc, { partNumber, adjacentCharacters: adjacentSymbols }) => {
      if (adjacentSymbols.some(({ char }) => /[^a-zA-Z\d.]/.test(char))) {
        return acc + partNumber;
      }
      return acc;
    },
    0,
  );
}
