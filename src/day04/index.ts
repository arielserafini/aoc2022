import run from "aocrunner";

const sampleInput = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) =>
    line.split(",").map((sectorStr) => {
      const [start, end] = sectorStr.split("-").map((num) => Number(num));
      return { start, end };
    }),
  );

interface Section {
  start: number;
  end: number;
}

function areSectionsFullyOverlapping(a: Section, b: Section) {
  return (
    (a.start >= b.start && a.end <= b.end) ||
    (b.start >= a.start && b.end <= a.end)
  );
}

function areSectionsOverlapping(a: Section, b: Section) {
  return (
    (a.start >= b.start && a.start <= b.end) ||
    (b.start >= a.start && b.start <= a.end)
  );
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input
    .map(([a, b]) => areSectionsFullyOverlapping(a, b))
    .filter((value) => value).length;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input
    .map(([a, b]) => areSectionsOverlapping(a, b))
    .filter((value) => value).length;
};

run({
  part1: {
    tests: [
      {
        input: sampleInput,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: sampleInput,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
