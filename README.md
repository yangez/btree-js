# btree-js
Demo: **[JS BTree](http://yangez.github.io/btree-js/)**

This is [Allen Chang](https://allendevelops.wordpress.com) and [Eric Yang](http://www.eric-y.com)'s javascript implementation for [B-tree](https://en.wikipedia.org/wiki/B-tree) of order 3 and above.

Currently we can `search` and `insert`. We derived our own insert algorithm as follows:

1. Traverse the b-tree for the correct leaf to insert the value.
2. Insert value into leaf.
  * If the node has space, simply insert the value and we're done.
  * If node overflows and it's root, split the node and create a new parent with the median.
  * If node overflows and has a parent, split the node and insert the median into the parent. Go up to parent and repeat step 2 until it doesn't overflow.
3. Go back all the way down and connect all the split nodes to the appropriate parents.

It turns out that there's a more efficient algorithm where you don't have to go up and back down, but ours still works fine.
