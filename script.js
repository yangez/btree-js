//             [10      20]
//      [5, 7]   [15, 18]   [25, 30]
//     [] [] []  [] [] []   [] [] []

var order = 3;

bTree = BTree(order);

bTree.insert(11);
bTree.insert(40);
bTree.insert(7);
bTree.insert(9);
bTree.insert(30);
bTree.insert(32);
bTree.insert(50);
//
bTree.insert(35);
bTree.insert(38);
bTree.insert(32);
bTree.insert(13);
// bTree.insert(95);
// bTree.insert(105);
// bTree.insert(83);

printKeys();

// displays keys
function printKeys() {
  root = bTree.root

  console.log(root.keys.toString());

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

// display unattached nodes for debugging purposes
function printUnattached() {
  root = bTree.root

  unattached = bTree.unattached_nodes.map(function(level, leaf_offset){
    return level.map(function(node) {
      return "["+node.keys.toString()+"]";
    });
  });
  unattached[2] = unattached[2] || [];
  unattached[1] = unattached[1] || [];
  unattached[0] = unattached[0] || [];

  console.log(unattached[2].join(" "));
  console.log(unattached[1].join(" "));
  console.log(unattached[0].join(" "));
}
