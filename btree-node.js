    //             [10      20]
    //      [5, 7]   [15, 18]   [25, 30]
    //     [] [] []  [] [] []   [] [] []


var BTreeNode = function(keys, children, parent, tree){
  var newNode = Object.create(BTreeNode.prototype);
  newNode.keys = keys || [];
  newNode.children = children || new Array(order);
  newNode.parent = parent || null;
  newNode.tree = tree || null;
  newNode.id = null;

  return newNode;
}

// Search helper function that returns the leaf node to insert into
BTreeNode.prototype.search = function(value){

  var emptyChildren = this.children.reduce(function(accum, e){
    return accum && !e;
  }, true);

  if(emptyChildren) {
    return this;
  } else {
    for(var i = 0; i < this.keys.length; i++){
      if(value < this.keys[i]){
        return this.children[i].search(value);
      }
    }
    return this.children[this.keys.length];
  }
}

BTreeNode.prototype.insert = function(value, callerIndex){
  var target = callerIndex >= 0 ? this : this.search(value); // leaf

  if (callerIndex >= 0) {
    target.children[callerIndex] = undefined;
  }
  target.keys.push(value);
  target.keys.sort(function(a,b){
    if(a > b) return 1;
    else if(a < b) return -1;
    else return 0;
  })

  if(target.keys.length === order)
    target.handleOverflow();
}

BTreeNode.prototype.handleOverflow = function() {
  var overflowNode = this;
  var tree = this.tree;

  var median_index = 1;
  var median = overflowNode.keys[median_index];

  var leftKeys = overflowNode.keys.slice(0,median_index);
  // var leftChildren = overflowNode.children
  var left = BTreeNode(leftKeys, overflowNode.children, overflowNode.parent);

  var rightKeys = overflowNode.keys.slice(median_index+1, overflowNode.keys.length);
  var right = BTreeNode(rightKeys, overflowNode.children, overflowNode.parent);

  if(overflowNode.parent === null){
    tree.root = BTreeNode([median], [left, right])
    left.parent = tree.root;
    right.parent = tree.root;
  } else {
    var overFlowIndex = overflowNode.parent.children.indexOf(overflowNode)

    overflowNode.parent.insert(median, overFlowIndex);

    overflowNode.parent.children[overFlowIndex] = left;
    overflowNode.parent.children[overFlowIndex+1] = right;
  }

}
