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

// Traverse tree until we find correct leaf for this value
// strict = must search for exact value
BTreeNode.prototype.traverse = function(value, strict) {
  if (this.keys.indexOf(value) > -1) return this;
  else if (this.isLeaf()) {
    if (strict) return false;
    else return this;
  }
  else { // find the correct downward path for this value
    for(var i = 0; i < this.keys.length; i++){
      if(value < this.keys[i]){
        return this.children[i].traverse(value, strict);
      }
    }
    return this.children[this.keys.length].traverse(value, strict);
  }
}

BTreeNode.prototype.insert = function(value){
  // insert element
  this.keys.push(value);
  this.keys.sort(function(a,b){ // sort numbers ascending
    if(a > b) return 1;
    else if(a < b) return -1;
    else return 0;
  })

  // if overflow, handle overflow (go up)
  if(this.keys.length === this.tree.order) {
    this.handleOverflow();
  } else { // if not filled, start attaching children
    this.attachChildren();
  }
}

BTreeNode.prototype.handleOverflow = function() {
  var overflowNode = this; tree = this.tree

  // find this node's median and split into 2 new nodes
  var median_index = 1;
  var median = overflowNode.keys[median_index];


  var leftKeys = overflowNode.keys.slice(0,median_index);
  var leftNode = tree.createNode(leftKeys); // no children or parent
  tree.addUnattached(leftNode, tree.current_leaf_offset);

  var rightKeys = overflowNode.keys.slice(median_index+1, overflowNode.keys.length);
  var rightNode = tree.createNode(rightKeys);
  tree.addUnattached(rightNode, tree.current_leaf_offset);

  // if no parent, create an empty one (will be root)
  if(overflowNode.isRoot()) {
    tree.root = tree.createNode();
    overflowNode.setParent(tree.root);
  }

  // if node is internal, unattach children and add to unattached_nodes
  if (overflowNode.isInternal()) {
    overflowNode.unattachAllChildren();
  }

  // set target, remove self from parent
  target = overflowNode.parent;
  overflowNode.unsetParent();

  // Push median up to target, increment offset
  tree.current_leaf_offset += 1;
  target.insert(median);


}


// function to go down and reattach nodes
BTreeNode.prototype.attachChildren = function() {
  var target = this;
  var offset = target.tree.current_leaf_offset-1;

  // get all nodes below the current node
  var target_nodes = target.tree.unattached_nodes[offset];

  if (target_nodes && target_nodes.length > 0) {
    // for each of the keys in this node, attach two children(left and right)
    // afterwards, remove them from unattached_nodes

    // first, put all existing nodes into target_nodes so they're ordered correctly
    target.unattachAllChildren();

    // then, attach based on keys
    target.keys.forEach(function(key, index) {
      for(var i=0; i<2; i++) {
        target.setChild(target_nodes[0]);
        target.tree.removeUnattached(target_nodes[0], offset);
      }
    });

    // lower offset, and repeat for each one of the children
    tree.current_leaf_offset -= 1;
    target.children.forEach(function(child) {
      child.attachChildren();
    });

    // come back up so upper levels can process appropriately
    tree.current_leaf_offset +=1;
  }
}

BTreeNode.prototype.setChild = function(node) {
  if (node) {
    this.children.push(node) ;
    node.parent = this;
  }
}
BTreeNode.prototype.unattachAllChildren = function() {
  var length = this.children.length;
  for(var i=0; i<length; i++) {
    child = this.children[0];
    child.unsetParent();
    tree.addUnattached(child, tree.current_leaf_offset-1);
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
