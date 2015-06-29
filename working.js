    //             [10      20]
    //      [5, 7]   [15, 18]   [25, 30]
    //     [] [] []  [] [] []   [] [] []


var order = 3;

window.root = null;

var BTreeNode = function(keys, children, parent){
  var newNode = Object.create(BTreeNode.prototype);
  newNode.keys = keys || [];
  newNode.children = children || new Array(order);
  newNode.parent = parent || null;
  newNode.id = null;

  // if(newNode.parent)
  //   newNode.parent.children.push(newNode);


  /*
  1. Find leaf where value should go
  2. Insert the value into leaf, then sort
  3. If overflow
    * push value to parent
    * split node into left and right

  */


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

  var median_index = 1;
  var median = overflowNode.keys[median_index];

  var leftKeys = overflowNode.keys.slice(0,median_index);
  // var leftChildren = overflowNode.children
  var left = BTreeNode(leftKeys, overflowNode.children, overflowNode.parent);

  var rightKeys = overflowNode.keys.slice(median_index+1, overflowNode.keys.length);
  var right = BTreeNode(rightKeys, overflowNode.children, overflowNode.parent);

  if(overflowNode.parent === null){
    window.root = BTreeNode([median], [left, right])
    left.parent = window.root;
    right.parent = window.root;
  } else {
    var overFlowIndex = overflowNode.parent.children.indexOf(overflowNode)

    overflowNode.parent.insert(median, overFlowIndex);

    overflowNode.parent.children[overFlowIndex] = left;
    overflowNode.parent.children[overFlowIndex+1] = right;
  }

}


printKeys = function() {
  // debugger;
  console.log(window.root.keys.toString());

  var childString = "";
  var grandchildString = "";
  root.children.forEach(function(child, index){
    if(child === undefined) return;
    if (child.keys)
      childString += child.keys.toString() + " ";

    if(child.children)
      child.children.forEach(function(child){
        if(child === undefined) return;
        if (child.keys)
          grandchildString += child.keys.toString() + ' ';
      })
  });
  console.log(childString);
  console.log(grandchildString);
}

root = BTreeNode();
root.insert(5);
root.insert(30);
root.insert(10);
root.insert(50);
root.insert(22);
root.insert(78);
root.insert(29);
root.insert(7);
// debugger;
// root.insert(100);

printKeys();
