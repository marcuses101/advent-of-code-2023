const stringValues = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};
const charsSet = new Set();

Object.keys(stringValues).forEach((key) => {
  for (const char of key) {
    charsSet.add(char);
  }
});

export default function (input: string) {
  const lines = input.split("\n");
  for (const line of lines) {
    console.log(line);
  }
}
