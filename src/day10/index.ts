import run from "aocrunner"

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((l) =>
    l
      .match(/position=< ?(-?\d+),  ?(-?\d+)> velocity=< ?(-?\d+),  ?(-?\d+)>/)
      .slice(1)
      .map(Number),
  )

class LightPoint {
  x: number
  y: number
  xVel: number
  yVel: number
  constructor(x: number, y: number, xVel: number, yVel: number) {
    this.x = x
    this.y = y
    this.xVel = xVel
    this.yVel = yVel
  }
  tick() {
    this.x += this.xVel
    this.y += this.yVel
  }
}

class Sky {
  lights: LightPoint[]
  constructor(lights: LightPoint[]) {
    this.lights = lights
  }
  tick() {
    this.lights.forEach((l) => l.tick())
    const { width, height } = this.getMesures()
    return width * height
  }
  tickBack() {
    this.lights.forEach((l) => {
      l.x -= l.xVel
      l.y -= l.yVel
    })
  }
  getMesures() {
    const minX = Math.min(...this.lights.map((l) => l.x))
    const maxX = Math.max(...this.lights.map((l) => l.x))
    const minY = Math.min(...this.lights.map((l) => l.y))
    const maxY = Math.max(...this.lights.map((l) => l.y))
    const width = maxX - minX + 1
    const height = maxY - minY + 1
    return { width, height, minX, minY, maxX, maxY }
  }
  render() {
    const { width, height, minX, minY } = this.getMesures()
    const grid = Array(height)
      .fill(0)
      .map(() => Array(width).fill(" "))
    this.lights.forEach((l) => {
      grid[l.y - minY][l.x - minX] = "#"
    })
    return grid.map((row) => row.join("")).join("\n")
  }
}
const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let area: number
  const sky = new Sky(
    input.map(([x, y, xVel, yVel]) => new LightPoint(x, y, xVel, yVel)),
  )
  let count = 0
  while (true) {
    count++
    const newArea = sky.tick()
    if (!area || newArea < area) {
      area = newArea
    } else {
      sky.tickBack()
      count--
      break
    }
  }

  console.log(sky.render())
  console.log(count)

  // get the result dysplayed in the console
  return ""
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  part1(rawInput)
  return
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
