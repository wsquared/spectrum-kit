import test from 'ava';

import { DoubleLinkedListNode } from './dll';

test('should create a node with the given value', (t) => {
  const node = new DoubleLinkedListNode('1', 42);
  t.is(node.key, '1');
  t.is(node.value, 42);
  t.is(node.next, null);
  t.is(node.prev, null);
});

test('should link nodes correctly', (t) => {
  const node1 = new DoubleLinkedListNode('1', 1);
  const node2 = new DoubleLinkedListNode('two', 2);

  node1.next = node2;
  node2.prev = node1;

  t.deepEqual(node1.next, node2);
  t.deepEqual(node2.prev, node1);
});
