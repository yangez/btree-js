// constructor
var BTree = function(order){
  var tree = Object.create(BTree.prototype);
  tree.root = null;
  tree.order = order;
  tree.current_leaf_offset = 0;
  tree.unattached_nodes = [[]]; // array for unattached nodes based on leaf_offset

  return tree;
}

// create a node that belongs to this tree
BTree.prototype.createNode = function(keys, children, parent) {
  return BTreeNode(this, keys, children, parent);
}

// Search function that returns the leaf node to insert into
BTree.prototype.search = function(value){
  if (!this.root) return false;
  else return this.root.traverse(value);
}

// Main insertion function
BTree.prototype.insert = function(value) {

  this.current_leaf_offset = 0;
  this.unattached_nodes = [[]];

  // 1. Find which leaf the inserted value should go
  var target = this.search(value);
  if (!target) {
    // create new root node
    this.root = this.createNode();
    target = this.root;
  }

  // 2. Apply target.insert (recursive)
  target.insert(value);

}
