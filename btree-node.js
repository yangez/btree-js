    //             [10      20]
    //      [5, 7]   [15, 18]   [25, 30]
    //     [] [] []  [] [] []   [] [] []


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
  this.keys.push(value);
  this.keys.sort(function(a,b){ // sort numbers ascending
    if(a > b) return 1;
    else if(a < b) return -1;
    else return 0;
  })

  // console.log('tree order: ' + this.tree.order );
  if(this.keys.length === this.tree.order) {
    // debugger;
    this.handleOverflow();
  }

  // a. if there's room, insert it and that's it

  // b. else (overflow), find this node's median and split into 2 new nodes
    // set new nodes' leaf_offset = current_leaf_offset
    // if internal node, unattach children and set leaf_offset
}

BTreeNode.prototype.handleOverflow = function() {
  var overflowNode = this; tree = this.tree

  var median_index = 1;
  var median = overflowNode.keys[median_index];

  var leftKeys = overflowNode.keys.slice(0,median_index);
  // var leftChildren = overflowNode.children
  var left = BTreeNode(tree, leftKeys, overflowNode.children, overflowNode.parent);

  var rightKeys = overflowNode.keys.slice(median_index+1, overflowNode.keys.length);
  var right = BTreeNode(tree, rightKeys, overflowNode.children, overflowNode.parent);

  if(overflowNode.parent === null){
    tree.root = BTreeNode(tree, [median], [left, right]) // create new root node
    left.parent = tree.root;
    right.parent = tree.root;
  } else {
    var overFlowIndex = overflowNode.parent.children.indexOf(overflowNode)

    overflowNode.parent.insert(median);

    overflowNode.parent.children[overFlowIndex] = left;
    overflowNode.parent.children[overFlowIndex+1] = right;
  }

}
