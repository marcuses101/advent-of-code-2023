const stringValues: Record<string, string> = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const valuesRegex = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g;

export default function (input: string) {
  const lines = input.split("\n");
  const sum = lines.reduce((acc, line) => {
    let first = null;
    let last = null;
    for (const [_, match] of line.matchAll(valuesRegex)) {
      const matchValue = /\d/.test(match) ? match : stringValues[match];
      if (first === null) {
        first = matchValue;
      }
      last = matchValue;
    }
    const lineValue = parseInt(`${first ?? 0}${last ?? 0}`);
    console.log({ first, last, lineValue, line });
    return acc + lineValue;
  }, 0);
  return sum;
}
