export type CardInfo = {
  id: number;
  winningNumbers: number[];
  cardNumbers: number[];
};

function extractNumbers(input: string): number[] {
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

export function processLine(line: string): CardInfo | null {
  if (line.length === 0) return null;
  const [gameString, winningString, cardString] = line.split(/:|\|/);
  if (!gameString || !winningString || !cardString) return null;
  const id = extractNumbers(gameString)[0];
  const winningNumbers = extractNumbers(winningString);
  const cardNumbers = extractNumbers(cardString);
  return { id, winningNumbers, cardNumbers };
}

export function countWinningNumbers(card: CardInfo) {
  return card.cardNumbers.reduce((acc, num) => {
    return card.winningNumbers.includes(num) ? 1 + acc : acc;
  }, 0);
}
function calculateCardPoints(card: CardInfo) {
  const numberOfMatchs = countWinningNumbers(card);
  if (numberOfMatchs === 0) return 0;
  return Math.pow(2, numberOfMatchs - 1);
}

export default function calculateCardPointTotal(input: string) {
  const lines = input.split("\n");
  const cards = lines.map(processLine);
  return cards.reduce((acc, card) => {
    if (card === null) return acc;
    return acc + calculateCardPoints(card);
  }, 0);
}
