class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

const hash = (key, size) => {
  let hashedKey = 0
  for (let i = 0; i < key.length; i++) {
    hashedKey += key.charCodeAt(i)
  }
  return hashedKey % size
}

class HashTable {
  constructor(value) {
    this.size = value
    this.buckets = Array(this.size)
    for (let i = 0; i < this.buckets.length; i++) {
      this.buckets[i] = new Map()
    }
  }

  insert(key, value) {
    let idx = hash(key, this.size)
    this.buckets[idx].set(key, value)
  }

  remove(key) {
    let idx = hash(key, this.size)
    let deleted = this.buckets[idx].get(key)
    this.buckets[idx].delete(key)
    return deleted
  }

  search(key) {
    let idx = hash(key, this.size)
    return this.buckets[idx].get(key)
  }
}

class BST {
  constructor(value) {
    this.root = new Node(value)
    this.count = 1
  }

  size() {
    return this.count
  }

  insert(value) {
    this.count++
    let newNode = new Node(value)
    const searchTree = node => {
      if (value < node.value) {
        if (!node.left) {
          node.left = newNode
        } else {
          searchTree(node.left)
        }
      }
      else if (value > node.value) {
        if (!node.right) {
          node.right = newNode
        } else {
          searchTree(node.right)
        }
      }
    }
    searchTree(this.root)
  }

  min() {
    let currentNode = this.root
    while (currentNode.left) {
      currentNode = currentNode.left
    }
    return currentNode.value
  }

  max() {
    let currentNode = this.root
    while (currentNode.right) {
      currentNode = currentNode.right
    }
    return currentNode.value
  }

  contains(value) {
    let currentNode = this.root
    while (currentNode) {
      if (currentNode.value === value) {
        return true
      }
      if (value < currentNode.value) {
        currentNode = currentNode.left
      } else {
        currentNode = currentNode.right
      }
    }
    return false
  }

  /**
   * @name dfsInOrder
   * @description DFS in-order - left, root, right
   */
  dfsInOrder() {
    let result = []
    const traverse = node => {
      if (node.left) traverse(node.left)
      result.push(node.value)
      if (node.right) traverse(node.right)
    }

    traverse(this.root)
    return result
  }

  /**
   * @name dfsPreOrder
   * @description DFS pre-order - root, left, right
   */
  dfsPreOrder() {
    let result = []
    const traverse = node => {
      result.push(node.value)
      if (node.left) traverse(node.left)
      if (node.right) traverse(node.right)
    }

    traverse(this.root)
    return result
  }

  /**
   * @name dfsPostOrder
   * @description DFS post-order - left, right, root
   */
  dfsPostOrder() {
    let result = []
    const traverse = node => {
      if (node.left) traverse(node.left)
      if (node.right) traverse(node.right)
      result.push(node.value)
    }

    traverse(this.root)
    return result
  }

  // Breadth-first search
  bfs() {
    let result = []
    let queue = []
    queue.push(this.root)

    while (queue.length) {
      let currentNode = queue.shift()

      result.push(currentNode.value)
      if (currentNode.left) {
        queue.push(currentNode.left)
      }
      if (currentNode.right) {
        queue.push(currentNode.right)
      }
    }

    return result
  }

  // Breadth-first search
  bfsReverse() {
    let result = []
    let queue = []
    queue.push(this.root)

    while (queue.length) {
      let currentNode = queue.shift()

      result.push(currentNode.value)
      if (currentNode.right) {
        queue.push(currentNode.right)
      }
      if (currentNode.left) {
        queue.push(currentNode.left)
      }
    }

    return result
  }

  getMinLeft() {
    let currentNode = this.root;
    let maxLeft = 0
    while (currentNode.left) {
      maxLeft--
      currentNode = currentNode.left

    }
    return maxLeft
  }

  getMaxRight() {
    let currentNode = this.root;
    let maxRight = 0
    while (currentNode.right) {
      maxRight++
      currentNode = currentNode.right

    }
    return maxRight
  }

  getTreeWidth() {
    let treeWidth = 1
    for (let i = this.getMinLeft(); i < this.getMaxRight(); i++) {
      treeWidth++
    }
    return treeWidth
  }

  findVerticalSum(node, column, hashMap) {
    if (node === null) {
      return
    }
    const acc = hashMap.search(`${column}`) ? hashMap.search(`${column}`) : 0
    hashMap.insert(`${column}`, acc + node.value)
    // recursively process left sub-tree
    this.findVerticalSum(node.left, column - 1, hashMap)
    // recursively process right sub-tree
    this.findVerticalSum(node.right, column + 1, hashMap)
  }

  getVerticalSum() {
    const hashMap = new HashTable(this.getTreeWidth())
    this.findVerticalSum(this.root, 0, hashMap)
    const table = []
    for (let i = this.getMinLeft(); i <= this.getMaxRight(); i++) {
      table.push({ [i]: hashMap.search(`${i}`) })
    }
    return table
  }
}
const rootValue = 5;
const tree = new BST(rootValue)

const list = [9, 10, 4, 7, 22, 1, 35]
console.log('Root value:', rootValue)
console.log('List', list)

list.forEach(item => tree.insert(item))

const value = 22;

console.log('Size:', tree.size())
console.log('Min:', tree.min())
console.log('Max:', tree.max())
console.log(`Contains ${value}?:`, tree.contains(value))

// [ 1, 4, 5, 7, 9, 10, 22, 35 ] - left, root, right
console.log('In-order', tree.dfsInOrder())
// [ 5, 4, 1, 9, 7, 10, 22, 35 ] - root, left, right
console.log('Pre-order', tree.dfsPreOrder())
// [ 1, 4, 7, 35, 22, 10, 9, 5 ] left, right, root
console.log('Post-order', tree.dfsPostOrder())
// Breadth-first search
console.log('Breadth-first search', tree.bfs())
// Breadth-first search reverse
console.log('Breadth-first search reverse', tree.bfsReverse())

console.log('Min left', tree.getMinLeft());
console.log('Max right', tree.getMaxRight());
console.log('Tree Width', tree.getTreeWidth())

console.log('Vertical sum', tree.getVerticalSum());



