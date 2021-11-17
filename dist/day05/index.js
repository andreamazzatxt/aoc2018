import run from "aocrunner";
const parseInput = (rawInput) => rawInput.split("");
const react = (input) => {
  let i = 0;
  while (i < input.length - 1) {
    if (input[i] !== input[i + 1] && input[i].toLowerCase() === input[i + 1].toLowerCase()) {
      input.splice(i, 2);
      i = 0;
    } else {
      i++;
    }
  }
  return input;
};
const fullyReact = (input) => {
  let result = react(input);
  while (true) {
    const temp = react(result);
    if (temp.length === result.length)
      break;
    result = react(input);
  }
  return result;
};
const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let result = fullyReact(input);
  return result.length;
};
const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const polymers = [...new Set(input.map((char) => char.toLowerCase()))];
  let shortest;
  polymers.forEach((polymer) => {
    console.log(polymer);
    const temp = input.filter((char) => char.toLowerCase() !== polymer);
    const result = fullyReact(temp);
    if (!shortest || result.length < shortest)
      shortest = result.length;
  });
  return shortest;
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
