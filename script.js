//             [10      20]
//      [5, 7]   [15, 18]   [25, 30]
//     [] [] []  [] [] []   [] [] []

var order = 3;

bTree = BTree(order);

bTree.insert(5);
bTree.insert(30);
bTree.insert(10);
bTree.insert(50);
bTree.insert(22);
bTree.insert(78);
bTree.insert(29);
bTree.insert(9);

printKeys();

function printKeys() {
  // debugger;
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
