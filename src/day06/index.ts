import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const START_OF_PACKET_SIZE = 4;
const MESSAGE_SIZE = 14;
function getUniqueCharGroup(input: string, groupSize: number) {
  return input.split("").findIndex((_, index, chars) => {
    if (index < groupSize - 1) {
      return false;
    }

    const lastFour = new Set<string>(chars.slice(index - groupSize, index));

    return lastFour.size === groupSize;
  });
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return getUniqueCharGroup(input, START_OF_PACKET_SIZE);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return getUniqueCharGroup(input, MESSAGE_SIZE);
};

run({
  part1: {
    tests: [
      {
        input: "mjqjpqmgbljsphdztnvjfqwrcgsmlb",
        expected: 7,
      },
      {
        input: "bvwbjplbgvbhsrlpgdmjqwftvncz",
        expected: 5,
      },
      {
        input: "nppdvjthqldpwncqszvftbrmjlhg",
        expected: 6,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
        expected: 19,
      },
      {
        input: `bvwbjplbgvbhsrlpgdmjqwftvncz`,
        expected: 23,
      },
      {
        input: `nppdvjthqldpwncqszvftbrmjlhg`,
        expected: 23,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
