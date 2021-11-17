import run from "aocrunner"

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((entry) => {
    const date = entry.slice(1, 11)
    const minutes = entry.slice(15, 17)
    return {
      completeDate: new Date(date + "  00:" + minutes),
      date,
      minutes,
      guard: entry.includes("begins")
        ? entry.slice(26, entry.indexOf("begins") - 1)
        : "",
      fallAsleep: entry.includes("falls"),
      wakesUp: entry.includes("wakes"),
    }
  })

const sortByTime = (input: any) => {
  return input.sort((a, b) => {
    if (a.completeDate < b.completeDate) return -1
    if (a.completeDate > b.completeDate) return 1
    return 0
  })
}

const parseShifts = (sortedInput) => {
  const guards = {}
  let currentGuard = ""
  let lastFallAsleep = 0

  sortedInput.forEach((entry) => {
    if (entry.guard !== "") {
      currentGuard = entry.guard
      guards[currentGuard] = guards[currentGuard] || {
        minutesSleeping: Array(60).fill(0),
      }
      lastFallAsleep = 0
    }
    if (entry.fallAsleep) {
      lastFallAsleep = parseInt(entry.minutes)
    }

    if (entry.wakesUp && lastFallAsleep) {
      for (let i = lastFallAsleep; i < entry.minutes; i++) {
        guards[currentGuard].minutesSleeping[i]++
      }
      lastFallAsleep = 0
    }
  })
  return guards
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const sortedInput = sortByTime(input)
  const shifts = parseShifts(sortedInput)
  const array = Object.keys(shifts).map((guard: any) => {
    return {
      id: guard,
      minutesSleeping: shifts[guard].minutesSleeping.reduce((a, b) => a + b, 0),
      maxMinute: shifts[guard].minutesSleeping.indexOf(
        Math.max(...shifts[guard].minutesSleeping),
      ),
    }
  })
  console.table(array)
  const sleepiestGuard = array.reduce((a, b) => {
    return a.minutesSleeping > b.minutesSleeping ? a : b
  })
  return parseInt(sleepiestGuard.id) * sleepiestGuard.maxMinute
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const shifts = parseShifts(sortByTime(input))
  let maxMinute = 0
  let maxMinuteGuard = ""
  let maxMinuteCount = 0
  Object.keys(shifts).forEach((guard) => {
    const minutes = shifts[guard].minutesSleeping
    const max = Math.max(...minutes)
    if (max > maxMinuteCount) {
      maxMinuteCount = max
      maxMinuteGuard = guard
      maxMinute = minutes.indexOf(max)
    }
  })
  return parseInt(maxMinuteGuard) * maxMinute
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
