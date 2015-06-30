var order = 3;

var BTree = function(order){
  var tree = Object.create(BTree.prototype);
  tree.root = null;
  tree.current_leaf_offset = 0;

  return tree;
}

// Main insertion function
BTree.prototype.insert = function(value) {
  console.log(value);
}

// Main search function
