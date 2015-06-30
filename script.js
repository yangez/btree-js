printKeys = function() {
  // debugger;
  console.log(bTree.root.keys.toString());

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

bTree = BTree();

bTree.insert(5);

/*
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
*/
