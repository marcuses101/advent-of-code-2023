import { extractNumbers } from "../utils/extractNumbers";

export type Race = {
  duration: number;
  distanceToBeat: number;
};

export function countWinningStrategies(race: Race): number {
  let winningStrategies = 0;
  let hasBeat = false;

  for (let i = 1; i < race.duration; i++) {
    const distance = i * (race.duration - i);
    if (hasBeat && distance < race.distanceToBeat) {
      break;
    }
    if (distance > race.distanceToBeat) {
      hasBeat = true;
      winningStrategies++;
    }
  }

  return winningStrategies;
}

export default function productOfRacePosibilities(input: string) {
  const [rawTimes, rawDistances] = input.trim().split("\n");
  const times = extractNumbers(rawTimes);
  const distances = extractNumbers(rawDistances);
  const races: Race[] = times.map((duration, i) => {
    return { duration, distanceToBeat: distances[i] };
  });
  const winningStrategies = races.map(countWinningStrategies);

  return winningStrategies.reduce((acc, winningStrats) => {
    return acc * winningStrats;
  }, 1);
}
