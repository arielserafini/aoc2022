import run from "aocrunner";

const sampleInput = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

function parseCrates(cratesInput: string) {
  const lines = cratesInput.split("\n");
  const guide = lines.pop()!;
  const stacks = new Array(guide.trim().split("  ").length).fill(null);

  return stacks.map((_, index) =>
    lines
      .map((line) => line.charAt(guide.indexOf(`${index + 1}`)))
      .filter((item) => item !== " "),
  );
}

const INSTRUCTION_REGEX = /move (\d+) from (\d+) to (\d+)/;
function parseInstructions(instructions: string, crates: string[][]) {
  const newCrates = [...crates];

  instructions.split("\n").forEach((instruction) => {
    const [_, ...values] = instruction.match(INSTRUCTION_REGEX)!;

    const [quantity, origin, destination] = values.map((value) =>
      Number(value),
    );

    const movedCrates = newCrates[origin - 1].splice(0, quantity).reverse();
    newCrates[destination - 1] = [
      ...movedCrates,
      ...newCrates[destination - 1],
    ];
  });

  return newCrates;
}

function parseInstructionsV2(instructions: string, crates: string[][]) {
  const newCrates = [...crates];

  instructions.split("\n").forEach((instruction) => {
    const [_, ...values] = instruction.match(INSTRUCTION_REGEX)!;

    const [quantity, origin, destination] = values.map((value) =>
      Number(value),
    );

    const movedCrates = newCrates[origin - 1].splice(0, quantity);
    newCrates[destination - 1] = [
      ...movedCrates,
      ...newCrates[destination - 1],
    ];
  });

  return newCrates;
}

const parseInput = (rawInput: string) => {
  return rawInput.split(`\n\n`);
};

const part1 = (rawInput: string) => {
  const [crates, instructions] = parseInput(rawInput);
  const movedCrates = parseInstructions(instructions, parseCrates(crates));

  return movedCrates.map((crate) => crate[0]).join("");
};

const part2 = (rawInput: string) => {
  const [crates, instructions] = parseInput(rawInput);
  const movedCrates = parseInstructionsV2(instructions, parseCrates(crates));

  return movedCrates.map((crate) => crate[0]).join("");
};

run({
  part1: {
    tests: [
      {
        input: sampleInput,
        expected: "CMZ",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: sampleInput,
        expected: "MCD",
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: false,
});
