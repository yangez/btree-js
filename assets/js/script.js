$(function() {

  // set up BTree
  var order = 3;
  bTree = BTree(order);

  bTree.seed(3);

  $("#add-form").submit(function(event) {
    event.preventDefault();
    value = parseInt( $("#input-add").val() );
    bTree.insert(value);
    $("#input-add").val("");

    $('svg').remove();

    var treeData = bTree.toJSON();
    update(treeData);

    $("g text").each(function(index) {
      keys = $(this).text();
      keys_array = keys.split(',').map(function(element) {
        return parseInt(element);
      });

      debugger;
      if ( keys_array.indexOf(value) != -1 ) {
        $(this).css({ fill: "#ff0000", "font-weight": "bold"} );
      }

    });

  });


  var treeData = bTree.toJSON();
  update(treeData);

  function update(source) {

    var bodyRect = d3.select("body").node().getBoundingClientRect();

    var margin = {top: 40, right: 120, bottom: 20, left: 120},
    width = bodyRect.width - margin.right - margin.left,
    height = bodyRect.height - margin.top - margin.bottom;

    var i = 0;

    var diagonal = d3.svg.diagonal()
      .projection(function(d) { return [d.x, d.y]; });

    var tree = d3.layout.tree()
      .size([width, height]);
    var svg = d3.select("#canvas").append("svg")
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Compute the new tree layout.
    var nodes = tree.nodes(source).reverse();
    var links = tree.links(nodes);

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
        .text(function(d) { return d.name; })
        .style("fill-opacity", 1);

        // Declare the links…
        var link = svg.selectAll("path.link")
        .data(links, function(d) { return d.target.id; });

        // Enter the links.
        link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", diagonal);

      }

});
