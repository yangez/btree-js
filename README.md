# btree-js
Here is [Allen Chang](https://allendevelops.wordpress.com) and Eric Yang's javascript [b-tree](https://en.wikipedia.org/wiki/B-tree) implementation.

Currently we can `search` and `insert`. We're planning on adding `delete` soon. We derived our own insert algorithm as follows:

1. Traverse the b-tree for the correct leaf to insert the value.
2. Insert value into leaf.
  a. If the node has space, simply insert the value and we're done.
  b. If node overflows and it's root, split the node and create a new parent with the median.
  c. If node overflows and has a parent, split the node and insert the median into the parent. Repeat step 2 until we get *a* or *b*.
3. Go back down and connect all the split nodes to the appropriate parents.

It turns out that there's a more efficient algorithm where you don't have to go up and back down, but ours still works fine. Demo here: [JS BTree](http://yangez.github.io/btree-js/)
