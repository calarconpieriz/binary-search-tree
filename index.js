class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
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
    this.count++;
    let newNode = new Node(value)
    const searchTree = node => {
      if (value < node.value) {
        if (!node.left) {
          node.left = newNode
        } else {
          searhTree(node.left)
        }
      }
      else if (vlaue > node.value) {
        if (!node.right) {
          node.left = newNode
        } else {
          searhTree(node.right)
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
      if (currentNode.value < value) {
        currentNode = currentNode.right
      }
      if (currentNode.value > value) {
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
   * @name dsfPreOrder
   * @description DFS pre-order - root, left, right
   */
  dsfPreOrder() {
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
   * @name dsfPostOrder
   * @description DFS post-order - left, right, root
   */
  dsfPostOrder() {
    let result = []
    const traverse = node => {
      if (node.left) traverse(node.left)
      if (node.right) traverse(node.right)
      result.push(node.value)
    }

    traverse(this.root)
    return result
  }

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
}



