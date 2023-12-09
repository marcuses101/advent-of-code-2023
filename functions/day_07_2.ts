import { watch } from "fs";

type Hand = {
  cards: string;
  bid: number;
};

function parseHand(line: string): Hand {
  const [cards, rawBid] = line.split(" ");
  return { cards, bid: parseInt(rawBid, 10) };
}

const handTypeValues = {
  fiveOfAKind: 7,
  fourOfAKind: 6,
  fullHouse: 5,
  threeOfAKind: 3,
  twoPair: 2,
  onePair: 1,
  highCard: 0,
};

const cards = [
  "J",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "Q",
  "K",
  "A",
] as const;

type Card = (typeof cards)[number];

function determineHandTypeValue(cards: string): number {
  const normalCardCountMap = new Map<Card, number>();
  let jokerCount = 0;
  cards.split("").forEach((char) => {
    if (char === "J") {
      jokerCount++;
      return;
    }
    normalCardCountMap.set(
      char as Card,
      (normalCardCountMap.get(char as Card) ?? 0) + 1,
    );
  });

  const maxCount = [...normalCardCountMap.values()].reduce(
    (acc, count) => Math.max(acc, count),
    0,
  );
  if (maxCount === 5 || maxCount + jokerCount === 5) {
    return handTypeValues["fiveOfAKind"];
  }
  if (maxCount === 4 || maxCount + jokerCount === 4) {
    return handTypeValues["fourOfAKind"];
  }
  if (
    (maxCount === 3 && normalCardCountMap.size === 2) ||
    (maxCount === 2 && normalCardCountMap.size === 2 && jokerCount === 1)
  ) {
    return handTypeValues["fullHouse"];
  }

  if (maxCount === 3 || maxCount + jokerCount === 3) {
    return handTypeValues["threeOfAKind"];
  }
  if (maxCount === 2 && normalCardCountMap.size === 3) {
    return handTypeValues["twoPair"];
  }
  if (maxCount === 2 || jokerCount === 1) {
    return handTypeValues["onePair"];
  }
  return handTypeValues["highCard"];
}

function compareHands(handOne: Hand, handTwo: Hand): number {
  const handOneValue = determineHandTypeValue(handOne.cards);
  const handTwoValue = determineHandTypeValue(handTwo.cards);
  if (handOneValue !== handTwoValue) {
    return handOneValue > handTwoValue ? 1 : -1;
  }

  for (let i = 0; i < handOne.cards.length; i++) {
    const charOne = handOne.cards[i];
    const charTwo = handTwo.cards[i];
    if (charOne === charTwo) continue;
    const charOneValue = cards.indexOf(charOne as Card);
    const charTwoValue = cards.indexOf(charTwo as Card);
    return charOneValue > charTwoValue ? 1 : -1;
  }
  return 0;
}

export default function camelCardsTotalWinning(input: string) {
  const lines = input.trim().split("\n");
  const hands = lines.map(parseHand);
  const handsSorted = hands.toSorted(compareHands);
  return handsSorted.reduce((acc, hand, index) => {
    return acc + hand.bid * (index + 1);
  }, 0);
}
