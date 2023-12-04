import { inputToPossibleParts } from "./day_03_1";

export default function sumGearRatios(input: string) {
  const potentialParts = inputToPossibleParts(input);
  const adjacentGearParts: Map<string, number[]> = potentialParts.reduce(
    (map, { partNumber, adjacentCharacters }) => {
      adjacentCharacters.forEach(({ char, rowIndex, columnIndex }) => {
        if (char === "*") {
          const gearLocationKey = `${rowIndex}-${columnIndex}`;
          const gearRatioParts = map.get(gearLocationKey) ?? [];
          gearRatioParts.push(partNumber);
          map.set(gearLocationKey, gearRatioParts);
        }
      });
      return map;
    },
    new Map<string, number[]>(),
  );
  let sum = 0;
  adjacentGearParts.forEach((ratios) => {
    if (ratios.length === 2) {
      sum = sum + ratios[0] * ratios[1];
    }
  });
  return sum;
}
