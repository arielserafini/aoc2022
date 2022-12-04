import run from "aocrunner";

const sampleInput = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

const parseInput = (rawInput: string) =>
  rawInput
    .split("\n\n")
    .map((elf) => elf.split("\n").map((value) => parseInt(value, 10)));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input
    .map((calories) =>
      calories.reduce((previousValue, value) => {
        return previousValue + value;
      }, 0),
    )
    .sort((a, b) => b - a)[0];
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const topThree = input
    .map((calories) =>
      calories.reduce((previousValue, value) => {
        return previousValue + value;
      }, 0),
    )
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((previousValue, value) => previousValue + value, 0);

  return topThree;
};

run({
  part1: {
    tests: [
      {
        input: sampleInput,
        expected: 24000,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: sampleInput,
        expected: 45000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
