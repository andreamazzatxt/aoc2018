import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split(" ").map(Number)
class TreeNode {
  header: {
    metaNumber: number
    childrenNumber: number
  }
  parent?: TreeNode
  metaData: number[]
  children: TreeNode[]
  constructor(value: number[]) {
    const [childrenNumber, metaNumber] = value
    this.header = {
      metaNumber: metaNumber,
      childrenNumber: childrenNumber,
    }
    this.children = []
    this.metaData = []
  }

  addChild(child: TreeNode) {
    this.children.push(child)
  }
  addMetaData(metaData: number[]) {
    this.metaData = metaData || []
  }
  getMetaDataSum() {
    return this.metaData.reduce((acc, cur) => acc + cur, 0)
  }
  isDone = () => {
    return this.children.length === this.header.childrenNumber
  }
}

const generateNodes = (input: number[]) => {
  const nodes: TreeNode[] = []
  const rootNode: TreeNode = new TreeNode(input.splice(0, 2))
  nodes.push(rootNode)
  let currentNode = rootNode
  while (input.length > 0) {
    if (currentNode.isDone()) {
      currentNode.addMetaData(input.splice(0, currentNode.header.metaNumber))
      currentNode = currentNode.parent!
    } else {
      const node = new TreeNode(input.splice(0, 2))
      nodes.push(node)
      node.parent = currentNode
      currentNode.addChild(node)
      currentNode = node
    }
  }
  return {
    nodes,
    rootNode,
  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const { nodes, rootNode } = generateNodes(input)
  return nodes
    .map((node) => node.getMetaDataSum())
    .reduce((acc, cur) => acc + cur, 0)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const { rootNode } = generateNodes(input)

  const getNodeValue = (node: TreeNode) => {
    if (node.children.length === 0) {
      return node.getMetaDataSum()
    } else {
      return node.metaData
        .map((metaData) => {
          if (metaData > node.children.length) {
            return 0
          } else {
            return getNodeValue(node.children[metaData - 1])
          }
        })
        .reduce((acc, cur) => acc + cur, 0)
    }
  }
  return getNodeValue(rootNode)
}

run({
  part1: {
    tests: [{ input: `2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2`, expected: 138 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: `2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2`, expected: 66 }],
    solution: part2,
  },
  trimTestInputs: true,
})
