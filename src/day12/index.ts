import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split("\n\n")

const pad = (string: string) => {
  return "..." + string + "..."
}

const part1 = (rawInput: string) => {
  const [rawInitial, rawRules] = parseInput(rawInput)
  let state = "..." + rawInitial.split(" ")[2] + "..."
  const rules = {}
  rawRules.split("\n").forEach((rule) => {
    const [pattern, result] = rule.split(" => ")
    rules[pattern] = result
  })
  let initialIndex = 3
  for (let i = 0; i < 20; i++) {
    state = pad(state)
    initialIndex += 3
    let newState = state.replace(/#/g, ".")
    for (let j = 0; j < state.length; j++) {
      for (const [pattern, result] of Object.entries(rules)) {
        if (pattern === state.substr(j, pattern.length)) {
          newState =
            newState.substr(0, j + 2) +
            result +
            newState.substr(j + pattern.length)
        }
      }
    }
    state = newState
  }
  let sum = 0
  for (let i = 0; i < state.length; i++) {
    if (state[i] === "#") {
      sum += i - initialIndex
    }
  }
  return sum
}

const part2 = (rawInput: string) => {
  const [rawInitial, rawRules] = parseInput(rawInput)
  let state = "..." + rawInitial.split(" ")[2] + "..."
  const rules = {}
  rawRules.split("\n").forEach((rule) => {
    const [pattern, result] = rule.split(" => ")
    rules[pattern] = result
  })
  let initialIndex = 3

  for (let i = 0; i < 200; i++) {
    state = pad(state)
    initialIndex += 3
    let newState = state.replace(/#/g, ".")
    for (let j = 0; j < state.length; j++) {
      for (const [pattern, result] of Object.entries(rules)) {
        if (pattern === state.substr(j, pattern.length)) {
          newState =
            newState.substr(0, j + 2) +
            result +
            newState.substr(j + pattern.length)
        }
      }
    }
    state = newState
  }
  let sum = 0
  for (let i = 0; i < state.length; i++) {
    if (state[i] === "#") {
      sum += i - initialIndex
    }
  }
  const numOfPots = state.split("").filter((pot) => pot === "#").length
  return sum + (50000000000 - 200) * numOfPots
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
