class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }
  insert(key, value) {
    // If the tree is empty then this key being inserted is the root node of the tree
    if (this.key == null) {
      this.key = key;
      this.value = value;
    }

    /* If the tree already exists, then start at the root, 
       and compare it to the key you want to insert.
       If the new key is less than the node's key 
       then the new node needs to live in the left-hand branch */
    else if (key < this.key) {
      /* If the existing node does not have a left child, 
         meaning that if the `left` pointer is empty, 
         then we can just instantiate and insert the new node 
         as the left child of that node, passing `this` as the parent */
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      }
      /* If the node has an existing left child, 
         then we recursively call the `insert` method 
         so the node is added further down the tree */
      else {
        this.left.insert(key, value);
      }
    }
    /* Similarly, if the new key is greater than the node's key 
       then you do the same thing, but on the right-hand side */
    else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      }
      else {
        this.right.insert(key, value);
      }
    }
  }
  find(key) {
    // If the item is found at the root then return that value
    if (this.key == key) {
      return this.value;
    }
    /* If the item you are looking for is less than the root 
       then follow the left child.
       If there is an existing left child, 
       then recursively check its left and/or right child
       until you find the item */
    else if (key < this.key && this.left) {
      return this.left.find(key);
    }
    /* If the item you are looking for is greater than the root 
       then follow the right child.
       If there is an existing right child, 
       then recursively check its left and/or right child
       until you find the item */
    else if (key > this.key && this.right) {
      return this.right.find(key);
    }
    // You have searched the tree and the item is not in the tree
    else {
      throw new Error('Key Error');
    }
  }
  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      /* If the node only has a left child, 
         then you replace the node with its left child */
      else if (this.left) {
        this._replaceWith(this.left);
      }
      /* And similarly if the node only has a right child 
         then you replace it with its right child */
      else if (this.right) {
        this._replaceWith(this.right);
      }
      /* If the node has no children then
         simply remove it and any references to it 
         by calling "this._replaceWith(null)" */
      else {
        this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key);
    }
    else if (key > this.key && this.right) {
      this.right.remove(key);
    }
    else {
      throw new Error('Key Error');
    }
  }
  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      }
      else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }
}

// 1. Draw a BST

/*         3                            E
         /   \                        /   \
       1       4                     A      S
        \        \                         /  \
          2       6                       Q     Y
                 / \                     /      /
                5   9                   E      U
                   /                     \    /
                  7                      I   S
                                          \   \
                                          O     T
                                           \
                                            N
*/

// 2. Remove the root

/*         4                            E
         /   \                        /   \
       1       6                     A      S
        \     /  \                         /  \
          2   5   9                       Q     Y
                 /                       /      /
                7                       I      U
                                        \    /
                                         O   S
                                              \
                                               T
*/                                           
 
// 3. Create a BST class

function mainNum() {
  const BST = new BinarySearchTree
  BST.insert(3);
  BST.insert(1);
  BST.insert(4);
  BST.insert(6);
  BST.insert(9);
  BST.insert(2);
  BST.insert(5);
  BST.insert(7);
  //console.log(BST)
  return BST;
}

//mainNum()

function mainChar() {
  const BST = new BinarySearchTree
  BST.insert('E');
  BST.insert('A');
  BST.insert('S');
  BST.insert('Y');
  BST.insert('Q');
  BST.insert('U');
  BST.insert('E');
  BST.insert('S');
  BST.insert('T');
  BST.insert('I');
  BST.insert('O');
  BST.insert('N');
  //console.log(BST.right)
  return BST;
}

//mainChar()

// 4. What does this program do?

function tree(t){
  if(!t){
      return 0;
  }
  return tree(t.left) + t.value + tree(t.right)
}

// This function will return the sum of all the values of the tree.
// It will have runtime of O(n) since it goes through each value.

// 5. Height of a BST

function heightBST(tree) {
  let leftHeight = 0;
  let rightHeight = 0;
  if(!tree) {
    return 0;
  }
  else {
    leftHeight = heightBST(tree.left)
    rightHeight = heightBST(tree.right)
  }
  if (leftHeight > rightHeight) {
    return leftHeight + 1;
  }
  else {
    return rightHeight + 1;
  }
}

// console.log(heightBST(mainNum()));
// console.log(heightBST(mainChar()));
// The time complexity is O(n) since it goes through every branch

// 6. Is it a BST?
// Not complete solution

function isBST(tree, min, max) {
  if (min && tree.key < min) {
    return false;
  }
  if (max && tree.key > max) {
    return false;
  }
  if (tree.left && !isBST(tree.left, min, tree.key)) {
    return false;
  }
  if (tree.right && !isBST(tree.right, tree.key, max)) {
    return false;
  }
  return true;
}

// console.log(isBST(mainNum()))

// 7. 3rd largest node

const sort = []
function thirdLargest(tree) {
  if (!tree) {
    return
  }
  sort.push(tree.key)
  if (!thirdLargest(tree.left) && !thirdLargest(tree.right)) {
    return
  }
}

thirdLargest(mainNum())
sort.sort((b,a) => a - b)
// console.log(sort[2])

// 8. Balanced BST

function checkBalanced(tree) {
  if (!tree) {
    return 0
  }
  const left = heightBST(tree.left)
  const right = heightBST(tree.right)
  if (Math.abs(left - right) <= 1) {
    return true;
  }
  return false;
}

// console.log(checkBalanced(mainNum()))

// 9. Are they the same BSTs?

const array1 = [3, 5, 4, 6, 1, 0, 2]
const array2 = [3, 1, 5, 2, 4, 6, 0]

function sameBST (array1, array2) {

}