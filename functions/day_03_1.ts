type PartNumberLocation = {
  partNumber: number;
  lineIndex: number;
  partNumberStartIndex: number;
  partNumberEndIndex: number;
};

type PotentialPart = {
  partNumber: number;
  adjacentCharacters: string[];
};

function getAdjacentCharacters(
  { lineIndex, partNumberStartIndex, partNumberEndIndex }: PartNumberLocation,
  lines: string[],
): string[] {
  const adjacentSymbols: string[] = [];
  const leftIndex = partNumberStartIndex - 1;
  const leftChar = lines[lineIndex][leftIndex];
  if (leftChar !== undefined) {
    adjacentSymbols.push(leftChar);
  }
  const rightIndex = partNumberEndIndex;
  const rightChar = lines[lineIndex][rightIndex];
  if (rightChar !== undefined) {
    adjacentSymbols.push(rightChar);
  }
  const lineAbove = lines[lineIndex - 1];
  const lineBelow = lines[lineIndex + 1];

  for (let i = leftIndex; i <= rightIndex; i++) {
    const charAbove = lineAbove?.[i];
    if (charAbove !== undefined) {
      adjacentSymbols.push(charAbove);
    }
    const charBelow = lineBelow?.[i];
    if (charBelow !== undefined) {
      adjacentSymbols.push(charBelow);
    }
  }
  return adjacentSymbols;
}

function inputToPossibleParts(input: string): PotentialPart[] {
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
      if (adjacentSymbols.some((char) => /[^a-zA-Z\d.]/.test(char))) {
        return acc + partNumber;
      }
      return acc;
    },
    0,
  );
}
