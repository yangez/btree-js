

var BTreeNode = function(tree, keys, children, parent){
  var newNode = Object.create(BTreeNode.prototype);
  newNode.tree = tree;
  newNode.keys = keys || [];
  newNode.children = children || []; // apparently fixed arrays are bad in JS
  newNode.parent = parent || null;

  return newNode;
}

// Traverse tree until we find correct leaf
BTreeNode.prototype.traverse = function(value) {
  if(this.children.length === 0) return this; // if it's leaf, return self
  else { // if not leaf, find the correct downward path for this value
    for(var i = 0; i < this.keys.length; i++){
      if(value < this.keys[i]){
        return this.children[i].traverse(value);
      }
    }
    return this.children[this.keys.length];
  }
}

BTreeNode.prototype.insert = function(value){
  // a. if there's room, insert it and that's it
  this.keys.push(value);
  this.keys.sort(function(a,b){ // sort numbers ascending
    if(a > b) return 1;
    else if(a < b) return -1;
    else return 0;
  })

  // b. else handle overflow
  if(this.keys.length === this.tree.order) {
    this.handleOverflow();
  }


    // set new nodes' leaf_offset = current_leaf_offset
    // if internal node, unattach children and set leaf_offset
}

BTreeNode.prototype.handleOverflow = function() {
  var overflowNode = this; tree = this.tree

  // find this node's median and split into 2 new nodes
  var median_index = 1;
  var median = overflowNode.keys[median_index];
  var leftKeys = overflowNode.keys.slice(0,median_index);
  var rightKeys = overflowNode.keys.slice(median_index+1, overflowNode.keys.length);
  var leftNode = tree.createNode(leftKeys); // no children or parent
  var rightNode = tree.createNode(rightKeys);

  // if internal node, unattach children and set their leaf_offset

  if(overflowNode.parent === null){
    tree.root = tree.createNode([median], [leftNode, rightNode]) // create new root node
    leftNode.parent = tree.root;
    rightNode.parent = tree.root;
  } else {
    var overFlowIndex = overflowNode.parent.children.indexOf(overflowNode)

    overflowNode.parent.insert(median);

    overflowNode.parent.children[overFlowIndex] = leftNode;
    overflowNode.parent.children[overFlowIndex+1] = rightNode;
  }

}
