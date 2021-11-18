import run from "aocrunner"

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((coord) => coord.split(", ").map(Number))

const findOutset = (input: number[][]) => {
  const maxX = Math.max(...input.map(([x]) => x))
  const maxY = Math.max(...input.map(([, y]) => y))
  return [maxX, maxY]
}
const distance = ([x1, y1], [x2, y2]) => Math.abs(x2 - x1) + Math.abs(y2 - y1)
const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const [maxX, maxY] = findOutset(input)
  const grid = Array(maxX + 1)
    .fill(0)
    .map(() => Array(maxY + 1).fill(0))
  grid.forEach((row, x) => {
    row.forEach((_, y) => {
      const distances = input.map(
        ([x1, y1]) => Math.abs(x1 - x) + Math.abs(y1 - y),
      )
      const minDistance = Math.min(...distances)
      const minIndex = distances.findIndex((d) => d === minDistance)
      const isEquallyClose =
        distances.filter((d) => d === minDistance).length === 1
      grid[x][y] = isEquallyClose ? minIndex : "."
    })
  })
  const infiniteAreasId = grid.reduce((acc, row, x) => {
    if (x === 0 || x === maxX) {
      row.forEach((_, y) => {
        acc.add(grid[x][y])
      })
    } else {
      row.forEach((_, y) => {
        if (y === 0 || y === maxY) {
          acc.add(grid[x][y])
        }
      })
    }
    return acc
  }, new Set())
  const counts = { "": 0 }
  grid.forEach((row) => {
    row.forEach((cell) => {
      if (!infiniteAreasId.has(cell) || cell === ".")
        counts[cell] = (counts[cell] || 0) + 1
    })
  })
  return Object.values(counts).reduce((acc, c) => Math.max(acc, c), 0)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const [maxX, maxY] = findOutset(input)
  let safeCount = 0
  const grid = Array(maxX + 1)
    .fill(0)
    .map(() => Array(maxY + 1).fill(0))
  grid.forEach((row, x) => {
    row.forEach((_, y) => {
      const distances = input.map(
        ([x1, y1]) => Math.abs(x1 - x) + Math.abs(y1 - y),
      )
      const sum = distances.reduce((acc, d) => acc + d, 0)
      if (sum < 10000) {
        safeCount++
      }
    })
  })
  return safeCount
}

run({
  part1: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
