$(function() {
  // get tree size
  var bodyRect = d3.select("body").node().getBoundingClientRect();
  var margin = {top: 40, right: 120, bottom: 20, left: 120},
  width = bodyRect.width - margin.right - margin.left,
  height = bodyRect.height - margin.top - margin.bottom;

  // create the tree
  var tree = d3.layout.tree().size([width, height]);

  var svg = d3.select("#canvas").append("svg")
    .attr({
      width: width + margin.right + margin.left,
      height: height + margin.top + margin.bottom })
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var bTree, treeData;

  // automatically create btree with default settings
  bTree = BTree(3);
  $("#order-display").html(3);
  bTree.seed(5);
  var treeData = bTree.toJSON();
  update(treeData);

  // create form event handler
  $("#create-form").submit(function(event) {
    event.preventDefault();
    var order = parseInt( $("#new-order").val() );
    var seed = parseInt( $("#new-seed").val() );

    // set up btree
    bTree = BTree(order);
    bTree.seed(seed);

    $("#create-form").fadeOut(200, function() {
      $("#order-display").html(order);
      $("h1 .label").fadeIn(200);
      $("#add-form").fadeIn(200, function() {
        if (!bTree.isEmpty()) {
          $("#canvas").fadeIn(200);
          var treeData = bTree.toJSON();
          update(treeData);
        }
      });
    });

    ga('send', 'event', 'tree', 'generated');

  });

  // reset tree event handler
  $(".reset-btree").click(function(e) {
    e.preventDefault();
    $("#input-add").val("");
    $('svg g').children().remove();
    $("#canvas").fadeOut(200);
    $("h1 .label").fadeOut(200);
    $("#add-form").fadeOut(200, function(){
      $("#create-form").fadeIn(200);
    });

    ga('send', 'event', 'tree', 'reset');

  });

  // add integer event handler
  $("#add-form").submit(function(event) {
    event.preventDefault();
    var value = parseInt( $("#input-add").val() );
    bTree.insert(value, true); // silently insert

    $("#input-add").val("");

    treeData = bTree.toJSON();
    update(treeData);

    // Make the current add node highlighted in red
    $("g text").each(function(index) {
      var bTreeNode = bTree.search(value);
      var d3NodeTouched = d3.selectAll('g.node').filter(function(d){
        return d.name === bTreeNode.keys.toString();
      });

      // reset all links and nodes
      d3.selectAll('g.node').select('circle').style({stroke : '#ccc', fill: '#ffffff'});
      d3.selectAll('.link').style('stroke','#ccc');

      // color links and all intermediate nodes
      colorPath(bTreeNode);

      // color bottom node
      d3NodeTouched.select('circle').style({stroke : '#ff0000', fill: '#ffcccc'});
    });

    ga('send', 'event', 'tree', 'inserted value');

  });

  // Note event handler
  $("#close-this").click(function(e) {
    e.preventDefault();
    $("#popup").css("bottom", -350);
    $("#close-this").hide();
    $("#what-is-this").show();
  });
  $("#what-is-this").click(function(e) {
    e.preventDefault();
    $("#popup").css("bottom", 0);
    $("#close-this").show();
    $("#what-is-this").hide();
    ga('send', 'event', 'info', 'viewed');
  });

  // open up info section upon page load
  $("#what-is-this").click();

  // color paths down to newly added node
  function colorPath(node) {
    // color the node itself
    d3.selectAll('g.node').filter(function(d){
      return d.name === node.keys.toString();
    }).select('circle').style('stroke','steelblue');

    if (node.isRoot()) return;
    else {
      // filter for links that connect with this node
      d3.selectAll('.link').filter(function(d){
        return d.target.name === node.keys.toString();
      }).style('stroke','steelblue');
      return colorPath(node.parent);
    }
  }

  // update d3 visualization
  function update(source) {
    // Make source data into d3-usable format
    var nodes = tree.nodes(source);
    var links = tree.links(nodes);

    // Normalize for fixed-depth.
    nodes.forEach(function(d) { d.y = d.depth * 100; });

    // NODE SELECTION
    var i = 0;
    var node = svg.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = ++i); });

    // NODE D3 APPENDING
    var nodeEnter = node.enter().append("g")
    .attr({
      "class": "node",
      "id" : function(d) { return 'i'+d.id }
    })
    .attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")"; });

    nodeEnter.append("circle")
      .attr("r", 10)
      .style("fill", "#fff").style('opacity',0).transition().style('opacity',1).duration(250);

    nodeEnter.append("text")
      .attr("y", function(d) {
        return d.children || d._children ? -18 : 18; })
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .text(function(d) { return d.name; })
      .style('opacity',0).transition().style('opacity',1).duration(250);

    // UPDATE NODE DATA + POSITION
    node.each(function(d,i){
      var thisNode = d3.select('#'+this.id+' text');
      thisNode.text(d.name);
      d3.select('#'+this.id).transition().attr('transform', 'translate(' + d.x + ',' + d.y + ')')

      thisNode.attr("y", d.children || d._children ? -18 : 18);
    });
    // D3 LINKS
    var link = svg.selectAll("path.link")
      .data(links, function(d) { return d.target.id; });

    var diagonal = d3.svg.diagonal()
      .projection(function(d) { return [d.x, d.y]; });
    link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("d", diagonal);

    link.each(function(d,i) {
      var thisLink = d3.select(svg.selectAll("path.link")[0][i]);
      diagonal = d3.svg.diagonal()
        .projection(function(d) { return [d.x, d.y]; });
      thisLink.transition().attr("d", diagonal);
    });
  }
});
