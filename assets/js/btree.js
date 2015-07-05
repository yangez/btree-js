// constructor
var BTree = function(order){
  var tree = Object.create(BTree.prototype);
  tree.root = null;
  tree.order = order;
  tree.current_leaf_offset = 0;
  tree.unattached_nodes = [[]]; // array for unattached nodes based on leaf_offset

  if (tree.order < 3) {
    alert("Order must be 3 or above.");
    return false;
  }

  return tree;
}

// create a node that belongs to this tree
BTree.prototype.createNode = function(keys, children, parent) {
  return BTreeNode(this, keys, children, parent);
}

// Search function that returns the leaf node to insert into
BTree.prototype.search = function(value, strict){
  if (!this.root) return false;
  else return this.root.traverse(value, strict);
}

// Main insertion function
BTree.prototype.insert = function(value, silent) {

  if (this.search(value, true)) {
    if (!silent) alert("The value "+value+" already exists!");
    return false;
  }

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

BTree.prototype.addUnattached = function(node, level) {
  this.unattached_nodes[level] = this.unattached_nodes[level] || [];

  // add node to unattached at specific level
  this.unattached_nodes[level].push(node);

  // sort all unattached nodes at this level, ascending
  this.unattached_nodes[level].sort(function(a, b) {
    first = parseInt(a.keys[0]);
    second = parseInt(b.keys[0]);
    if(first > second) return 1;
    else if(first < second) return -1;
    else return 0;
  })
}
BTree.prototype.removeUnattached = function(node, level) {
  index = this.unattached_nodes[level].indexOf(node);
  if (index > -1) {
    this.unattached_nodes[level].splice(index, 1);
  }
}

// Generate tree json for d3.js to consume
BTree.prototype.toJSON = function() {
  root = this.root;
  return root.toJSON();
}

// seed bTree with "count" unique numbers
BTree.prototype.seed = function(count) {
  var list = [];

  upper = 100;
  if (count > 50) upper = count*2;

  for(var i=1; i<upper; i++) list.push(i);

  for(var i=0; i<count; i++) {
    list.sort(function(a,b){ return Math.floor(Math.random() * 3) - 1; })
    current = list.shift();
    this.insert(current, true);
  }

}

BTree.prototype.isEmpty = function() {
  return !this.root;
}
