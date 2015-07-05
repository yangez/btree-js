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

describe("BTree Node", function() {
  describe('Insert', function() {
  });
});
