export default function process(input: string): void {
  let sum = 0;
  let first: string | null = null;
  let last: string | null = null;
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char === "\n") {
      const number = parseInt(`${first ?? 0}${last ?? 0}`, 10);
      first = null;
      last = null;
      sum += number;
    }
    if (!/\d/.test(char)) {
      continue;
    }
    if (first === null) {
      first = char;
    }
    last = char;
  }
  console.log(sum);
}
