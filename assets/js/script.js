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


var treeData = bTree.toJSON();

var margin = {top: 40, right: 120, bottom: 20, left: 120},
	width = 960 - margin.right - margin.left,
	height = 500 - margin.top - margin.bottom;

var i = 0;

var tree = d3.layout.tree()
	.size([height, width]);

var diagonal = d3.svg.diagonal()
	.projection(function(d) { return [d.x, d.y]; });

var svg = d3.select("body").append("svg")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom)
  .append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


update(treeData);

function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
	  links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 100; });

  // Declare the nodes…
  var node = svg.selectAll("g.node")
	  .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter the nodes.
  var nodeEnter = node.enter().append("g")
	  .attr("class", "node")
	  .attr("transform", function(d) {
		  return "translate(" + d.x + "," + d.y + ")"; });

  nodeEnter.append("circle")
	  .attr("r", 10)
	  .style("fill", "#fff");

  nodeEnter.append("text")
	  .attr("y", function(d) {
		  return d.children || d._children ? -18 : 18; })
	  .attr("dy", ".35em")
	  .attr("text-anchor", "middle")
	  .text(function(d) { return d.keys.toString(); })
	  .style("fill-opacity", 1);

  // Declare the links…
  var link = svg.selectAll("path.link")
	  .data(links, function(d) { return d.target.id; });

  // Enter the links.
  link.enter().insert("path", "g")
	  .attr("class", "link")
	  .attr("d", diagonal);

}


// printKeys();


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
