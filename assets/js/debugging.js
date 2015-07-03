// displays keys in console
function printKeys() {
  root = bTree.root

  console.log(root.keys.toString());

  var childString = "";
  var grandchildString = "";
  var greatGrandchildString = "";
  root.children.forEach(function(child, index){
    if(child === undefined) return;
    if (child.keys)
      childString += child.keys.toString() + " ";

    if(child.children)
      child.children.forEach(function(child){
        if(child === undefined) return;
        if (child.keys)
          grandchildString += child.keys.toString() + ' ';

        if (child.children)
          child.children.forEach(function(child){
            if(child === undefined) return;
            if (child.keys)
              greatGrandchildString += child.keys.toString() + ' ';
          });
      });
  });
  console.log(childString);
  console.log(grandchildString);
  console.log(greatGrandchildString);
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
