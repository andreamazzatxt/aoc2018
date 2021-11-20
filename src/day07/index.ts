import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split("\n")

class Step {
  value: string
  dependencies: Step[]
  done: boolean
  isPorcessing: boolean

  parents: Step[]

  constructor(value: string, dependencies: Step[], parents: Step[]) {
    this.done = false
    this.value = value
    this.dependencies = dependencies
    this.parents = parents
    this.isPorcessing = false
  }
  addParent(step: Step) {
    this.parents.push(step)
  }
  addDependency(step: Step) {
    this.dependencies.push(step)
    this.dependencies.sort((a, b) => (a.value < b.value ? -1 : 1))
  }
  getDependencies() {
    return this.dependencies
  }
  makeDone() {
    this.done = true
    this.isPorcessing = false
  }
  isDoable() {
    return (
      (this.parents.length === 0 ||
        this.parents.every((parent) => parent.done)) &&
      !this.done
    )
  }
  startProcessing() {
    this.isPorcessing = true
  }
  isTempDoable() {
    return (
      (this.parents.length === 0 ||
        this.parents.every((parent) => parent.done)) &&
      !this.isPorcessing &&
      !this.done
    )
  }
}

class Worker {
  step: Step
  eta: number

  constructor(step: Step, timeLeft: number) {
    this.step = step
    this.eta = timeLeft
  }

  init(step: Step, timeLeft: number) {
    this.step = step
    this.eta = timeLeft
    this.step.startProcessing()
  }
  finish() {
    this.step.makeDone()
    this.reset()
  }
  reset() {
    this.step = null
    this.eta = 0
  }
  getStep() {
    return this.step
  }
  isFree() {
    return this.step === null && this.eta === 0
  }
  isDone(time: number) {
    return this.step !== null && this.eta === time
  }
}

const stepsMapping = (input: string[]) => {
  const stepMap = new Map<string, Step>()
  input.forEach((value) => {
    const [, step, dependency] = value.match(
      /Step (\w) must be finished before step (\w) can begin./,
    )!
    if (!stepMap.has(step)) {
      stepMap.set(step, new Step(step, [], []))
    }
    if (!stepMap.has(dependency)) {
      stepMap.set(dependency, new Step(dependency, [], []))
    }
    const stepObj = stepMap.get(step)!
    const dependencyObj = stepMap.get(dependency)!
    stepObj.addDependency(dependencyObj)
    dependencyObj.addParent(stepObj)
    return stepObj
  })
  return stepMap
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const stepMap = stepsMapping(input)
  const result = []
  while (stepMap.size - 1 !== result.length) {
    const nextStep = [...stepMap.values()]
      .filter((step) => step.isDoable())
      .sort((a, b) => {
        return a.value < b.value ? -1 : 1
      })[0]
    result.push(nextStep.value)
    nextStep.makeDone()
  }
  stepMap.forEach((step) => {
    if (step.isDoable()) {
      result.push(step.value)
    }
  })
  return result.join("")
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const stepMap = stepsMapping(input)
  const steps = [...stepMap.values()]
  let time = -1
  const workers = new Array<Worker>(5).fill(null).map(() => new Worker(null, 0))
  while (steps.some((step) => !step.done)) {
    workers.forEach((worker) => worker.isDone(time) && worker.finish())
    const freeWorkers = workers.filter((worker) => worker.isFree())
    freeWorkers.forEach((worker) => {
      const nextStep = steps
        .filter((step) => step.isTempDoable())
        .sort((a, b) => {
          return a.value > b.value ? -1 : 1
        })[0]
      if (nextStep) {
        worker.init(nextStep, time + nextStep.value.charCodeAt(0) - 4)
      }
    })
    time += 1
  }
  return time
}

run({
  part1: {
    tests: [
      {
        input: `Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`,
        expected: "CABDFE",
      },
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
