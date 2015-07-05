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
          var treeData = bTree.toJSON();
          update(treeData);
        }
      });
    });

  });

  $(".reset-btree").click(function(e) {
    e.preventDefault();
    $("#input-add").val("");
    $('svg').remove();
    $("h1 .label").fadeOut(200);
    $("#add-form").fadeOut(200, function(){
      $("#create-form").fadeIn(200);
    });
  });



  $("#add-form").submit(function(event) {
    event.preventDefault();
    value = parseInt( $("#input-add").val() );
    bTree.insert(value);

    $("#input-add").val("");
    // $('svg').remove();

    treeData = bTree.toJSON();
    update(treeData);

    // Make the current add node highlighted in red
    $("g text").each(function(index) {
      keys = $(this).text();
      keys_array = keys.split(',').map(function(element) {
        return parseInt(element);
      });

      if ( keys_array.indexOf(value) != -1 ) {
        $(this).css({ fill: "#ff0000", "font-weight": "bold"} );
      }

    });

  });


  function update(source) {
    // Make source data into d3-usable format
    var nodes = tree.nodes(source);
    var links = tree.links(nodes);

    debugger;

    // Normalize for fixed-depth.
    nodes.forEach(function(d) { d.y = d.depth * 100; });

    // NODE SELECTION
    var i = 0;
    var node = svg.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = ++i); });

    // UPDATE NODE DATA + POSITION
    node.each(function(d,i){
      var thisNode = d3.select('#'+this.id+' text');
      thisNode.text(d.name);
      d3.select('#'+this.id).transition().attr('transform', 'translate(' + d.x + ',' + d.y + ')');
    });

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


    // D3 LINKS
    var link = svg.selectAll("path.link")
      .data(links, function(d) { return d.target.id; });

    var diagonal = d3.svg.diagonal()
      .projection(function(d) { return [d.x, d.y]; });

    link.each(function(d,i) {
      var thisLink = d3.select('#')
    });

    link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("id", function(d) { return 'l'+d.id })
      .attr("d", diagonal);


  }

});
