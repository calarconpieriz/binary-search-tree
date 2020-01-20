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
    this.count = 0
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


}