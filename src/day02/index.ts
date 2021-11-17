import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split("\n")

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let twoCount = 0
  let threeCount = 0
  input.forEach((id) => {
    const counts = {}
    id.split("").forEach((char) => {
      counts[char] = (counts[char] || 0) + 1
    })
    if (Object.values(counts).includes(2)) {
      twoCount++
    }
    if (Object.values(counts).includes(3)) {
      threeCount++
    }
  })
  return twoCount * threeCount
}

const isMatching = (a: string, b: string): boolean => {
  let diffCount = 0
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      diffCount++
    }
  }
  return diffCount === 1
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let result = ""
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      if (isMatching(input[i], input[j])) {
        result = input[i]
          .split("")
          .filter((char, index) => char === input[j][index])
          .join("")
      }
    }
  }
  return result
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
