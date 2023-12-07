import { extractNumbers } from "../utils/extractNumbers";

export type SourceDestinationInfo = {
  source: string;
  destination: string;
  ranges: {
    sourceStart: number;
    destinationStart: number;
    rangeLength: number;
  }[];
};

export type CategoryInstance = {
  category: string;
  id: number;
};

export function processSection(input: string): SourceDestinationInfo {
  const [descriptionLine, ...rangeStrings] = input.trim().split("\n");
  const [source, destination] = descriptionLine.split(" ")[0].split("-to-");
  const ranges = rangeStrings.map((line) => {
    const [destinationStart, sourceStart, rangeLength] = extractNumbers(line);
    return { destinationStart, sourceStart, rangeLength };
  });
  return { source, destination, ranges };
}

export function findLocation(
  seed: CategoryInstance,
  sectionsMap: Map<string, SourceDestinationInfo>,
  targetCategory = "location",
): CategoryInstance {
  while (seed.category !== targetCategory) {
    const sourceDestinationInfo = sectionsMap.get(seed.category);
    if (!sourceDestinationInfo)
      throw new Error(`No map associated to ${seed.category}`);
    const sourceId = seed.id;
    const sourceDestinationRange = sourceDestinationInfo.ranges.find(
      ({ sourceStart, rangeLength }) => {
        return sourceId >= sourceStart && sourceId < sourceStart + rangeLength;
      },
    );
    if (!sourceDestinationRange) {
      seed.id = sourceId;
      seed.category = sourceDestinationInfo.destination;
      continue;
    }
    const idOffset = sourceId - sourceDestinationRange.sourceStart;
    seed.category = sourceDestinationInfo.destination;
    seed.id = sourceDestinationRange.destinationStart + idOffset;
  }

  return seed;
}

export default function findLowestLocation(input: string): number {
  const [seedLine, ...rawSections] = input.split("\n\n");
  const seeds = extractNumbers(seedLine).map((id) => ({
    category: "seed",
    id,
  }));
  const sections = rawSections.map(processSection);
  const sectionMap = new Map<string, SourceDestinationInfo>();
  sections.forEach((section) => {
    sectionMap.set(section.source, section);
  });

  const locations = seeds.map((seed) => findLocation(seed, sectionMap));
  return locations.reduce((acc, current) => {
    return Math.min(acc, current.id);
  }, Number.POSITIVE_INFINITY);
}
