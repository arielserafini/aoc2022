import run from "aocrunner";

const sampleInput = `A Y
B X
C Z`;

const SHAPE_VALUES = {
  rock: 1,
  paper: 2,
  scissors: 3,
} as const;

const OUTCOME_VALUES = {
  win: 6,
  draw: 3,
  lose: 0,
} as const;

const LETTER_VALUES = {
  A: SHAPE_VALUES.rock,
  X: SHAPE_VALUES.rock,

  B: SHAPE_VALUES.paper,
  Y: SHAPE_VALUES.paper,

  C: SHAPE_VALUES.scissors,
  Z: SHAPE_VALUES.scissors,
} as const;

const OUTCOME_LETTERS = {
  X: OUTCOME_VALUES.lose,
  Y: OUTCOME_VALUES.draw,
  Z: OUTCOME_VALUES.win,
} as const;

const parseInput = (rawInput: string) => rawInput.split("\n") as RoundData[];
type TheirValues = "A" | "B" | "C";
type MyValues = "X" | "Y" | "Z";
type OutcomeValues = "X" | "Y" | "Z";

type RoundData = `${TheirValues} ${MyValues}`;

function getWinningShape(shapeA: number, shapeB: number) {
  if (shapeA === shapeB) {
    return shapeA;
  }

  if (
    [shapeA, shapeB].includes(SHAPE_VALUES.rock) &&
    [shapeA, shapeB].includes(SHAPE_VALUES.scissors)
  ) {
    return SHAPE_VALUES.rock;
  }

  if (
    [shapeA, shapeB].includes(SHAPE_VALUES.paper) &&
    [shapeA, shapeB].includes(SHAPE_VALUES.rock)
  ) {
    return SHAPE_VALUES.paper;
  }

  if (
    [shapeA, shapeB].includes(SHAPE_VALUES.scissors) &&
    [shapeA, shapeB].includes(SHAPE_VALUES.paper)
  ) {
    return SHAPE_VALUES.scissors;
  }

  return 0;
}

function getRoundPoints(shapeA: TheirValues, shapeB: MyValues) {
  const myShape = LETTER_VALUES[shapeB];
  const theirShape = LETTER_VALUES[shapeA];

  if (myShape === theirShape) {
    return myShape + OUTCOME_VALUES.draw;
  }

  const winner = getWinningShape(theirShape, myShape);

  if (myShape === winner) {
    return myShape + OUTCOME_VALUES.win;
  }

  if (theirShape === winner) {
    return myShape;
  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input
    .map((round) => {
      const [them, me] = round.split(" ") as [TheirValues, MyValues];
      return getRoundPoints(them, me);
    })
    .reduce<number>((total, value = 0) => total + value, 0);
};

function getRoundPointsFromOutcome(
  shapeA: TheirValues,
  desiredOutcome: OutcomeValues,
) {
  const theirShape = LETTER_VALUES[shapeA];
  const outcomeValue = OUTCOME_LETTERS[desiredOutcome];

  if (outcomeValue === OUTCOME_VALUES.draw) {
    return theirShape + OUTCOME_VALUES.draw;
  }

  if (outcomeValue === OUTCOME_VALUES.win) {
    if (theirShape === SHAPE_VALUES.rock) {
      return SHAPE_VALUES.paper + outcomeValue;
    }
    if (theirShape === SHAPE_VALUES.paper) {
      return SHAPE_VALUES.scissors + outcomeValue;
    }
    if (theirShape === SHAPE_VALUES.scissors) {
      return SHAPE_VALUES.rock + outcomeValue;
    }
  }

  if (outcomeValue === OUTCOME_VALUES.lose) {
    if (theirShape === SHAPE_VALUES.rock) {
      return SHAPE_VALUES.scissors + outcomeValue;
    }
    if (theirShape === SHAPE_VALUES.paper) {
      return SHAPE_VALUES.rock + outcomeValue;
    }
    if (theirShape === SHAPE_VALUES.scissors) {
      return SHAPE_VALUES.paper + outcomeValue;
    }
  }
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input
    .map((round) => {
      const [them, desiredOutcome] = round.split(" ") as [
        TheirValues,
        OutcomeValues,
      ];
      return getRoundPointsFromOutcome(them, desiredOutcome);
    })
    .reduce<number>((total, value = 0) => total + value, 0);
};

run({
  part1: {
    tests: [
      {
        input: sampleInput,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: "A Y",
        expected: 4,
      },
      {
        input: "B X",
        expected: 1,
      },
      {
        input: sampleInput,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
