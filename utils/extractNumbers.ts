export function extractNumbers(input: string): number[] {
  const matches = [];
  for (let [matchString] of input.matchAll(/\d+/g)) {
    const match = parseInt(matchString);

    if (Number.isNaN(match)) {
      continue;
    }
    matches.push(match);
  }
  return matches;
}
