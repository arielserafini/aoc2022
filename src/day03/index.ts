import run from "aocrunner";

const sampleInput = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

type Rucksack = [string, string];

const parseInput = (rawInput: string) =>
  rawInput
    .split("\n")
    .map(
      (rucksack: string) =>
        [
          rucksack.substring(0, rucksack.length / 2),
          rucksack.substring(rucksack.length / 2),
        ] as Rucksack,
    );

function getDuplicateItem(rucksack: Rucksack) {
  const [first, second] = rucksack;

  const firstChars = first.split("");
  const secondChars = second.split("");

  const [duplicate] = firstChars.filter((char) => {
    return secondChars.includes(char);
  });

  return duplicate;
}

const UPPER_CASE_OFFSET = 26;
function getItemValue(item: string) {
  const lowerCaseBaseline = "a".charCodeAt(0) - 1;
  const upperCaseBaseline = "A".charCodeAt(0) - 1;

  let offset = 0;
  let baseline = lowerCaseBaseline;

  if (item === item.toUpperCase()) {
    baseline = upperCaseBaseline;
    offset = UPPER_CASE_OFFSET;
  }

  return item.charCodeAt(0) - baseline + offset;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input
    .map((rucksack) => getDuplicateItem(rucksack))
    .map((item) => getItemValue(item))
    .reduce((total, value) => total + value, 0);
};

function getDuplicateItemInChunk(chunk: string[]) {
  const [first, second, third] = chunk;

  const firstChars = first.split("");
  const secondChars = second.split("");
  const thirdChars = third.split("");

  const [duplicate] = firstChars.filter((char) => {
    return secondChars.includes(char) && thirdChars.includes(char);
  });

  return duplicate;
}

const parsePartTwoInput = (rawInput: string) => {
  const input = rawInput
    .split("\n")
    .reduce<string[][]>((chunks, item, index) => {
      if (index % 3 === 0) {
        chunks.push([]);
      }

      chunks[chunks.length - 1].push(item);

      return chunks;
    }, []);

  return input
    .map((chunk) => getDuplicateItemInChunk(chunk))
    .map((item) => getItemValue(item))
    .reduce((total, value) => total + value, 0);
};

const part2 = (rawInput: string) => {
  const input = parsePartTwoInput(rawInput);

  return input;
};

run({
  part1: {
    tests: [
      {
        input: sampleInput,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: sampleInput,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
