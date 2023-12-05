import { CardInfo, countWinningNumbers, processLine } from "./day_04_1";

type CardCount = {
  numberOfCards: number;
  matches: number;
};

export default function findTotalScratchCards(input: string) {
  const lines = input.split("\n").filter(Boolean);
  const games = lines
    .map(processLine)
    .filter((card): card is CardInfo => Boolean(card));
  const cardCounts: CardCount[] = games.map((game) => ({
    numberOfCards: 1,
    matches: countWinningNumbers(game),
  }));
  cardCounts.forEach(({ matches, numberOfCards }, index, array) => {
    for (let i = 0; i < matches; i++) {
      const card = array[index + i + 1];
      card.numberOfCards += numberOfCards;
    }
  });

  return cardCounts.reduce((acc, { numberOfCards }) => acc + numberOfCards, 0);
}
