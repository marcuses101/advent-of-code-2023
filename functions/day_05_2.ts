import { extractNumbers } from "../utils/extractNumbers";
import {
  SourceDestinationInfo,
  findLocation,
  processSection,
} from "./day_05_1";

export default function findLowestLocation(input: string): number {
  const [seedLine, ...rawSections] = input.split("\n\n");
  const seeds = extractNumbers(seedLine);
  let min = Number.POSITIVE_INFINITY;
  const sections = rawSections.map(processSection);
  const sectionMap = new Map<string, SourceDestinationInfo>();
  sections.forEach((section) => {
    sectionMap.set(section.source, section);
  });
  for (let i = 0; i < seeds.length; i += 2) {
    console.log(`Processing ${i} of ${seeds.length}`);
    const seedNumberStart = seeds[i];
    const count = seeds[i + 1];
    const input = { category: "seed", id: 0 };
    for (let offset = 0; offset < count; offset++) {
      input.category = "seed";
      input.id = seedNumberStart + offset;
      const location = findLocation(input, sectionMap);
      min = Math.min(min, location.id);
    }
  }
  return min;
}
