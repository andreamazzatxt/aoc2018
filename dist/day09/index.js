import run from "aocrunner";
const parseInput = (rawInput) => rawInput.split(" ").filter(Number).map(Number);
class Marble {
  constructor(value) {
    this.value = value;
    this.prev = this;
    this.next = this;
  }
  concat(marble) {
    this.next.prev = marble;
    marble.next = this.next;
    marble.prev = this;
    this.next = marble;
  }
  destroy() {
    this.prev.next = this.next;
    this.next.prev = this.prev;
  }
}
class Circle {
  constructor() {
    this.currentMarble = new Marble(0);
    this.head = this.currentMarble;
  }
  add(marble) {
    if (marble % 23 === 0) {
      const marbleToRemove = this.currentMarble.prev.prev.prev.prev.prev.prev.prev;
      this.currentMarble = marbleToRemove.next;
      const removed = marbleToRemove.value;
      marbleToRemove.destroy();
      return marble + removed;
    }
    const marbleToInsert = new Marble(marble);
    const next = this.currentMarble.next;
    next.concat(marbleToInsert);
    this.currentMarble = marbleToInsert;
    return 0;
  }
}
const part1 = (rawInput) => {
  const [playersCount, marblesCount] = parseInput(rawInput);
  const players = new Array(playersCount).fill(0);
  const circle = new Circle();
  for (let marble = 1; marble <= marblesCount; marble++) {
    const player = marble % playersCount;
    players[player] += circle.add(marble);
  }
  return Math.max(...players);
};
const part2 = (rawInput) => {
  const [playersCount, marblesCount] = parseInput(rawInput);
  const players = new Array(playersCount).fill(0);
  const circle = new Circle();
  for (let marble = 1; marble <= marblesCount * 100; marble++) {
    const player = marble % playersCount;
    players[player] += circle.add(marble);
  }
  return Math.max(...players);
};
run({
  part1: {
    tests: [
      { input: `9 players; last marble is worth 25 points`, expected: 32 },
      { input: `10 players; last marble is worth 1618 points`, expected: 8317 },
      {
        input: `13 players; last marble is worth 7999 points`,
        expected: 146373
      },
      { input: `17 players; last marble is worth 1104 points`, expected: 2764 },
      {
        input: `21 players; last marble is worth 6111 points`,
        expected: 54718
      },
      {
        input: `30 players; last marble is worth 5807 points`,
        expected: 37305
      }
    ],
    solution: part1
  },
  part2: {
    tests: [],
    solution: part2
  },
  trimTestInputs: true
});
//# sourceMappingURL=index.js.map
