import run from "aocrunner";
const parseInput = (rawInput) => {
  return rawInput.split("\n").map(Number);
};
const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  return input.reduce((acc, curr) => acc + curr, 0);
};
const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const memory = {};
  let current = 0;
  let duplicate = 0;
  while (duplicate === 0) {
    for (let i = 0; i < input.length; i++) {
      if (memory[current]) {
        duplicate = current;
        break;
      }
      memory[current] = true;
      current += input[i];
    }
  }
  return duplicate;
};
run({
  part1: {
    tests: [],
    solution: part1
  },
  part2: {
    tests: [],
    solution: part2
  },
  trimTestInputs: true
});
//# sourceMappingURL=index.js.map
