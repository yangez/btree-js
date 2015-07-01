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
bTree.insert(32); // doesn't work
/*
bTree.insert(50);
*/
//
/*
bTree.insert(35);
*/
// bTree.insert(38);
// bTree.insert(55);
// bTree.insert(95);

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
