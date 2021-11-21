import run from "aocrunner";
const parseInput = (rawInput) => parseInt(rawInput);
class Grid {
  constructor(input) {
    this.input = input;
    this.generateGrid();
  }
  get(x, y) {
    if (x < 0 || x > 299 || y < 0 || y > 299) {
      return 0;
    }
    return this.grid.get(`${x},${y}`) || 0;
  }
  getMax(size) {
    let max = 0;
    let maxX = 0;
    let maxY = 0;
    for (let i = 0; i < 300 - size; i++) {
      for (let j = 0; j < 300 - size; j++) {
        let sum = 0;
        if (i + size <= 300 && j + size <= 300) {
          for (let x = i; x < i + size; x++) {
            for (let y = j; y < j + size; y++) {
              sum += this.get(x, y);
            }
          }
        }
        if (sum > max) {
          max = sum;
          maxX = i;
          maxY = j;
        }
      }
    }
    return { max, maxX, maxY, size };
  }
  generateGrid() {
    this.grid = new Map();
    for (let i = 0; i < 300; i++) {
      for (let j = 0; j < 300; j++) {
        const rackId = i + 10 + 1;
        let powerLevel = rackId * (j + 1) + this.input;
        powerLevel *= rackId;
        powerLevel = Math.floor(powerLevel / 100);
        powerLevel = Math.floor(powerLevel % 10);
        powerLevel -= 5;
        this.grid.set(`${i},${j}`, powerLevel);
      }
    }
  }
}
const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const grid = new Grid(input);
  const { maxX, maxY } = grid.getMax(3);
  return `${maxX + 1},${maxY + 1}`;
};
const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const grid = new Grid(input);
  let currentMax = { max: 0, maxX: 0, maxY: 0, size: 0 };
  for (let size = 1; size <= 18; size++) {
    const { max, maxX, maxY } = grid.getMax(size);
    if (max > currentMax.max) {
      currentMax = { max, maxX, maxY, size };
    }
  }
  return `${currentMax.maxX + 1},${currentMax.maxY + 1},${currentMax.size}`;
};
run({
  part1: {
    tests: [{ input: `42`, expected: "21,61" }],
    solution: part1
  },
  part2: {
    solution: part2
  },
  trimTestInputs: true
});
//# sourceMappingURL=index.js.map
