import run from "aocrunner";
const parseInput = (rawInput) => rawInput.split("\n").map((l) => l.match(/position=< ?(-?\d+),  ?(-?\d+)> velocity=< ?(-?\d+),  ?(-?\d+)>/).slice(1).map(Number));
class LightPoint {
  constructor(x, y, xVel, yVel) {
    this.x = x;
    this.y = y;
    this.xVel = xVel;
    this.yVel = yVel;
  }
  tick() {
    this.x += this.xVel;
    this.y += this.yVel;
  }
}
class Sky {
  constructor(lights) {
    this.lights = lights;
  }
  tick() {
    this.lights.forEach((l) => l.tick());
    const { width, height } = this.getMesures();
    return width * height;
  }
  tickBack() {
    this.lights.forEach((l) => {
      l.x -= l.xVel;
      l.y -= l.yVel;
    });
  }
  getMesures() {
    const minX = Math.min(...this.lights.map((l) => l.x));
    const maxX = Math.max(...this.lights.map((l) => l.x));
    const minY = Math.min(...this.lights.map((l) => l.y));
    const maxY = Math.max(...this.lights.map((l) => l.y));
    const width = maxX - minX + 1;
    const height = maxY - minY + 1;
    return { width, height, minX, minY, maxX, maxY };
  }
  render() {
    const { width, height, minX, minY } = this.getMesures();
    const grid = Array(height).fill(0).map(() => Array(width).fill(" "));
    this.lights.forEach((l) => {
      grid[l.y - minY][l.x - minX] = "#";
    });
    return grid.map((row) => row.join("")).join("\n");
  }
}
const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let area;
  const sky = new Sky(input.map(([x, y, xVel, yVel]) => new LightPoint(x, y, xVel, yVel)));
  let count = 0;
  while (true) {
    count++;
    const newArea = sky.tick();
    if (!area || newArea < area) {
      area = newArea;
    } else {
      sky.tickBack();
      count--;
      break;
    }
  }
  console.log(sky.render());
  console.log(count);
  return "";
};
const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  part1(rawInput);
  return;
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
