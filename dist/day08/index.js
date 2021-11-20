import run from "aocrunner";
const parseInput = (rawInput) => rawInput.split(" ").map(Number);
class TreeNode {
  constructor(value) {
    this.isDone = () => {
      return this.children.length === this.header.childrenNumber;
    };
    const [childrenNumber, metaNumber] = value;
    this.header = {
      metaNumber,
      childrenNumber
    };
    this.children = [];
    this.metaData = [];
  }
  addChild(child) {
    this.children.push(child);
  }
  addMetaData(metaData) {
    this.metaData = metaData || [];
  }
  getMetaDataSum() {
    return this.metaData.reduce((acc, cur) => acc + cur, 0);
  }
}
const generateNodes = (input) => {
  const nodes = [];
  const rootNode = new TreeNode(input.splice(0, 2));
  nodes.push(rootNode);
  let currentNode = rootNode;
  while (input.length > 0) {
    if (currentNode.isDone()) {
      currentNode.addMetaData(input.splice(0, currentNode.header.metaNumber));
      currentNode = currentNode.parent;
    } else {
      const node = new TreeNode(input.splice(0, 2));
      nodes.push(node);
      node.parent = currentNode;
      currentNode.addChild(node);
      currentNode = node;
    }
  }
  return {
    nodes,
    rootNode
  };
};
const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const { nodes, rootNode } = generateNodes(input);
  return nodes.map((node) => node.getMetaDataSum()).reduce((acc, cur) => acc + cur, 0);
};
const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const { rootNode } = generateNodes(input);
  const getNodeValue = (node) => {
    if (node.children.length === 0) {
      return node.getMetaDataSum();
    } else {
      return node.metaData.map((metaData) => {
        if (metaData > node.children.length) {
          return 0;
        } else {
          return getNodeValue(node.children[metaData - 1]);
        }
      }).reduce((acc, cur) => acc + cur, 0);
    }
  };
  return getNodeValue(rootNode);
};
run({
  part1: {
    tests: [{ input: `2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2`, expected: 138 }],
    solution: part1
  },
  part2: {
    tests: [{ input: `2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2`, expected: 66 }],
    solution: part2
  },
  trimTestInputs: true
});
//# sourceMappingURL=index.js.map
