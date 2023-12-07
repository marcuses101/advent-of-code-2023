import { extractNumbers } from "../utils/extractNumbers";
import { Race, countWinningStrategies } from "./day_06_1";

export default function productOfRacePosibilities(input: string) {
  const [rawTimes, rawDistances] = input.trim().split("\n");
  const duration = parseInt(extractNumbers(rawTimes).join(""));
  const distanceToBeat = parseInt(extractNumbers(rawDistances).join(""));
  const race: Race = { duration, distanceToBeat };
  return countWinningStrategies(race);
}
