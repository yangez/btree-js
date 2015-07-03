var order = 3; // doesn't work with anything besides 3

bTree = BTree(order);

var count = 35;

// numbers from 1-99
var list = [];
for(var i=1; i<100; i++)  {
  list.push(i);
}
// add random unique number
for(var i=0; i<count; i++) {
  list.sort(function(a,b){ return Math.floor(Math.random() * 3) - 1; })

  current = list.shift();
  // console.log("bTree.insert("+current+");")

  bTree.insert(current, true);
}




console.log(generateData());

printKeys();


function generateData() {

  /*
  var treeData = [
  {
    "name": "Top Level",
    "parent": "null",
    "children": [
      {
        "name": "Level 2: A",
        "parent": "Top Level",
        "children": [
          {
            "name": "Son of A",
            "parent": "Level 2: A"
          },
          {
            "name": "Daughter of A",
            "parent": "Level 2: A"
          }
        ]
      },
      {
        "name": "Level 2: B",
        "parent": "Top Level"
      }
    ]
  }
];
*/
}

function dataTraverse(node) {

}

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
