class TreeNode {
  constructor(val) {
    this.val = val;
    this.childrens = [];
    this.parent = null;
  }
  addChild(child) {
    child.parent = this;
    this.childrens.push(child);
    return this;
  }
  removeChild(child) {
    const index = this.childrens.indexOf(child);
    if (index > -1) {
      this.childrens.splice(index, 1);
    }
    child.parent = null;
    return this;
  }
}
class Tree {
  constructor(val) {
    this.root = new TreeNode(val);
  }
  getRoot() {
    return this.root;
  }
  getNode(val, node = this.root) {
    if (node.val === val) {
      return node;
    }
    for (let i = 0; i < node.childrens.length; i++) {
      const child = node.childrens[i];
      const result = this.getNode(val, child);
      if (result) {
        return result;
      }
    }
    return null;
  }
  addNode(val, parent) {
    const parentNode = this.getNode(parent);
    if (parentNode) {
      const node = new TreeNode(val);
      parentNode.addChild(node);
    }
  }
}
//# sourceMappingURL=trees.js.map
