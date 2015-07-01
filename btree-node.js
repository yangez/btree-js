// constructor
// don't call this directly, call BTree::createNode instead
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
  if (this.isLeaf()) return this;
  else { // find the correct downward path for this value
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
}

BTreeNode.prototype.handleOverflow = function() {
  var overflowNode = this; tree = this.tree

  // find this node's median and split into 2 new nodes
  var median_index = 1;
  var median = overflowNode.keys[median_index];

  tree.unattached_nodes[tree.current_leaf_offset] = tree.unattached_nodes[tree.current_leaf_offset] || [];

  var leftKeys = overflowNode.keys.slice(0,median_index);
  var leftNode = tree.createNode(leftKeys); // no children or parent
  tree.unattached_nodes[tree.current_leaf_offset].push(leftNode);

  var rightKeys = overflowNode.keys.slice(median_index+1, overflowNode.keys.length);
  var rightNode = tree.createNode(rightKeys);
  tree.unattached_nodes[tree.current_leaf_offset].push(rightNode);

  // if internal node, unattach children and add to unattached_nodes
  if (overflowNode.isInternal()) {
    overflowNode.children.forEach( function(child) {
      child.parent = null;
      tree.unattached_nodes[tree.current_leaf_offset-1].push(child);
    });
  }

  // Push median up, increment offset

  tree.current_leaf_offset += 1;

  if(!overflowNode.isRoot()){ // if not at the top yet

    overflowNode.parent.insert(median);
    var attachTarget = overflowNode.parent;

    // following shit only works for order 3
    /*
    //var overFlowIndex = overflowNode.parent.children.indexOf(overflowNode)
    //overflowNode.parent.children[overFlowIndex] = leftNode;
    // overflowNode.parent.children[overFlowIndex+1] = rightNode;
    */
    /* in else:
    // leftNode.parent = tree.root;
    // rightNode.parent = tree.root;
    */

  } else { // if it's at the top, time to go back down

    tree.root = tree.createNode([median]); // create new root node
    var attachTarget = tree.root;

    // This doesn't seem to cascade all the way down?

  }

  // apply function to attach unattached nodes
  attachTarget.attachChildren();

  // remove self
  overflowNode.unsetParent();


}


// function to go down and reattach nodes
BTreeNode.prototype.attachChildren = function() {
  var target = this;

  // get all nodes below the current node
  var target_nodes = target.tree.unattached_nodes[target.tree.current_leaf_offset-1];

  if (target_nodes && target_nodes.length > 0) {
    // for each of the keys in this node, attach a child to the left
    target.keys.forEach(function(key, index) {
      target.setChild(target_nodes[index]);
    });
    target.setChild(target_nodes[target.keys.length]);

    // do this again for each one of the children
    target.children.forEach(function(child) {

      tree.current_leaf_offset -= 1;
      child.attachChildren();
    });
  }
}

BTreeNode.prototype.setChild = function(node) {
  if (node) {
    this.children.push(node) ;
    node.parent = this;
  }
}

BTreeNode.prototype.setParent = function(node) {
  node.setChild(this);
}

BTreeNode.prototype.unsetParent = function() {
  var node = this;
  if (node.parent) {
    node.parent.children.forEach(function(child, index){
      if (child === node) node.parent.children.splice(index, 1);
    });
    node.parent = null;
  }
}

BTreeNode.prototype.isRoot = function() {
  return this.parent === null;
}
BTreeNode.prototype.isLeaf = function() {
  return this.children.length === 0;
}
BTreeNode.prototype.isInternal = function() {
  return !this.isLeaf() && !this.isRoot();
}
