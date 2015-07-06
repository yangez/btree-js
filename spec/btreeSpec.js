describe("BTree Definition", function() {
  it('every node has at most m children', function() {
    // test order 3-10

    // check the children length of each node
  });

  it('every non-leaf node (except root) has at least m/2 children', function(){
    // test order 3-10

    // check that each node has minimum children requirements met
  });

  it('the root has at least 2 children if it is not a leaf node', function(){
    // test order 3-10

    // Root must have 2 children if it's not a leaf. if the breadth is > 1 level then must have >=2 children
  });

  jt('a non-leaf node with k children contains k-1 keys', function(){
    // test order 3-10

    // key-to-children relationship must be maintained
  });

  jt('all leaves appear in the same level', function(){
    // test order 3-10

    // use isLeaf() to test that all on same breadth
  });

});

describe("BTree", function() {

  // beforeEach(function() {
  //   var btree = BTree(3);
  // });

  describe('BTree Class', function() {
    it('has a root property', function(){
      var btree = BTree(3);
      btree.insert(5);
      btree.insert(10);
      expect(btree.root.keys.toString()).to.equal('5,10');
    });

    it('should handle basic root overflow correctly', function(){
      var btree = BTree(3);
      btree.insert(5);
      btree.insert(10);
      btree.insert(15);
      expect(btree.search(10).isRoot()).to.equal(true);
      expect(btree.search(5).isLeaf()).to.equal(true);
      expect(btree.search(15).isLeaf()).to.equal(true);
    });

    it('should handle nested overflow correctly', function(){
      var btree = BTree(3);

      for(var i = 5; i <= 35; i += 5){
        btree.insert(i);
      }

      expect(btree.search(20).isRoot()).to.equal(true);
      expect(btree.search(30).isInternal()).to.equal(true);
      expect(btree.search(10).isInternal()).to.equal(true);
      expect(btree.search(15).isLeaf()).to.equal(true);
      expect(btree.search(35).isLeaf()).to.equal(true);
    });
  });
});

