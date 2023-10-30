import test from 'ava';

import { DoubleLinkedListNode } from './dll'; // Replace with the actual file path
import {
  deserializeDoubleLinkedList,
  serializeDoubleLinkedList,
} from './dllSerialization';

test('Deserialize an empty list', (t) => {
  t.is(deserializeDoubleLinkedList([]), null);
});

test('Serialize and deserialize a doubly linked list', (t) => {
  // Create a sample doubly linked list
  const node1 = new DoubleLinkedListNode('1', 1);
  const node2 = new DoubleLinkedListNode('2', 2);
  const node3 = new DoubleLinkedListNode('3', 3);

  node1.next = node2;
  node2.prev = node1;
  node2.next = node3;
  node3.prev = node2;

  // Serialize the list
  const serializedData = serializeDoubleLinkedList(node1);

  // Deserialize the data
  const deserializedList = deserializeDoubleLinkedList(serializedData);

  // Check that the deserialized list is correct
  t.is(deserializedList.value, 1);
  t.is(deserializedList.key, '1');
  t.is(deserializedList.next.value, 2);
  t.is(deserializedList.next.key, '2');
  t.is(deserializedList.next.prev.value, 1);
  t.is(deserializedList.next.prev.key, '1');
  t.is(deserializedList.next.next.value, 3);
  t.is(deserializedList.next.next.key, '3');
  t.is(deserializedList.next.next.prev.value, 2);
  t.is(deserializedList.next.next.prev.key, '2');
  t.is(deserializedList.next.next.next, null);
});

test('Serialize and deserialize a doubly linked list with a prev node', (t) => {
  const node11 = new DoubleLinkedListNode('11', 11);
  const node10 = new DoubleLinkedListNode('10', 10);
  const node0 = new DoubleLinkedListNode('0', 0);
  const node1 = new DoubleLinkedListNode('1', 1);
  const node2 = new DoubleLinkedListNode('2', 2);
  const node3 = new DoubleLinkedListNode('3', 3);

  node11.next = node10;
  node10.prev = node11;
  node10.next = node0;
  node0.prev = node10;
  node0.next = node1;
  node1.prev = node0;
  node1.next = node2;
  node2.prev = node1;
  node2.next = node3;
  node3.prev = node2;

  // Serialize the list
  const serializedData = serializeDoubleLinkedList(node1);

  // Deserialize the data
  const deserializedList = deserializeDoubleLinkedList(serializedData);

  // Check that the deserialized list is correct
  t.is(deserializedList.prev.prev.prev.prev, null);
  t.is(deserializedList.prev.prev.prev.next.value, 10);
  t.is(deserializedList.prev.prev.prev.value, 11);
  t.is(deserializedList.prev.prev.value, 10);
  t.is(deserializedList.prev.prev.next.value, 0);
  t.is(deserializedList.prev.value, 0);
  t.is(deserializedList.prev.next.value, 1);
  t.is(deserializedList.value, 1);
  t.is(deserializedList.next.value, 2);
  t.is(deserializedList.next.prev.value, 1);
  t.is(deserializedList.next.next.value, 3);
  t.is(deserializedList.next.next.prev.value, 2);
  t.is(deserializedList.next.next.next, null);
});

test('Serialize and deserialize an empty doubly linked list', (t) => {
  // Serialize an empty list
  const serializedData = serializeDoubleLinkedList(null);

  // Deserialize the data
  const deserializedList = deserializeDoubleLinkedList(serializedData);

  // Check that the deserialized list is null (empty)
  t.is(deserializedList, null);
});

test('Deserialize a doubly linked list with no prev pointers', (t) => {
  // Create a serialized representation of a doubly linked list with no prev pointers
  const serializedData = [
    { key: '1', value: 1, next: { key: '2', value: 2 }, prev: null },
    {
      key: '2',
      value: 2,
      prev: { key: '1', value: 1 },
      next: { key: '3', value: 3 },
    },
    { key: '3', value: 3, prev: { key: '2', value: 2 }, next: null },
  ];

  // Deserialize the data
  const deserializedList = deserializeDoubleLinkedList(serializedData);

  // Check that the deserialized list is correct
  t.is(deserializedList.value, 1);
  t.is(deserializedList.prev, null); // Ensure prev is null
  t.is(deserializedList.next.value, 2);
  t.is(deserializedList.next.prev.value, 1);
  t.is(deserializedList.next.prev.prev, null); // Ensure prev is null
  t.is(deserializedList.next.next.value, 3);
  t.is(deserializedList.next.next.prev.value, 2);
  t.is(deserializedList.next.next.next, null); // Ensure next is null
});

test('Deserialize a doubly linked list with next pointers', (t) => {
  const serializedData = [
    {
      key: 'page4',
      value: 'page4',
      next: { key: 'page5', value: 'page5' },
      prev: { key: 'page3', value: 'page3' },
    },
    {
      key: 'page3',
      value: 'page3',
      next: { key: 'page4', value: 'page4' },
      prev: { key: 'page2', value: 'page2' },
    },
    {
      key: 'page2',
      value: 'page2',
      next: { key: 'page3', value: 'page3' },
      prev: { key: 'page1', value: 'page1' },
    },
    {
      key: 'page1',
      value: 'page1',
      next: { key: 'page2', value: 'page2' },
      prev: { key: 'homepage', value: 'homepage' },
    },
    {
      key: 'homepage',
      value: 'homepage',
      next: { key: 'page1', value: 'page1' },
      prev: null,
    },
    {
      key: 'page5',
      value: 'page5',
      prev: { key: 'page4', value: 'page4' },
      next: null,
    },
  ];

  const deserializedList = deserializeDoubleLinkedList(serializedData);

  let dllNextTest = deserializedList;
  let i = 0;

  while (dllNextTest.next) {
    if (i === 0) {
      t.is(dllNextTest.key, 'page4');
      t.is(dllNextTest.value, 'page4');
      t.is(dllNextTest.next.key, 'page5');
      t.is(dllNextTest.next.value, 'page5');
      t.is(dllNextTest.prev.key, 'page3');
      t.is(dllNextTest.prev.value, 'page3');
    } else if (i === 1) {
      t.is(dllNextTest.key, 'page3');
      t.is(dllNextTest.value, 'page3');
      t.is(dllNextTest.next.key, 'page4');
      t.is(dllNextTest.next.value, 'page4');
      t.is(dllNextTest.prev.key, 'page2');
      t.is(dllNextTest.prev.value, 'page2');
    } else if (i === 2) {
      t.is(dllNextTest.key, 'page2');
      t.is(dllNextTest.value, 'page2');
      t.is(dllNextTest.next.key, 'page3');
      t.is(dllNextTest.next.value, 'page3');
      t.is(dllNextTest.prev.key, 'page1');
      t.is(dllNextTest.prev.value, 'page1');
    } else if (i === 3) {
      t.is(dllNextTest.key, 'page1');
      t.is(dllNextTest.value, 'page1');
      t.is(dllNextTest.next.key, 'page2');
      t.is(dllNextTest.next.value, 'page2');
      t.is(dllNextTest.prev.key, 'homepage');
      t.is(dllNextTest.prev.value, 'homepage');
    } else {
      t.is(dllNextTest.value, 'homepage');
      t.is(dllNextTest.key, 'homepage');
      t.is(dllNextTest.next.value, 'page1');
      t.is(dllNextTest.next.key, 'page1');
      t.is(dllNextTest.prev, null);
    }
    dllNextTest = dllNextTest.next;
    i++;
  }

  let dllPrevTest = deserializedList;

  let j = 0;

  while (dllPrevTest.prev) {
    if (j === 4) {
      t.is(dllPrevTest.key, 'homepage');
      t.is(dllPrevTest.value, 'homepage');
      t.is(dllPrevTest.prev, null);
      t.is(dllPrevTest.next.value, 'page1');
      t.is(dllPrevTest.next.key, 'page1');
    } else if (j === 3) {
      t.is(dllPrevTest.key, 'page1');
      t.is(dllPrevTest.value, 'page1');
      t.is(dllPrevTest.prev.key, 'homepage');
      t.is(dllPrevTest.prev.value, 'homepage');
      t.is(dllPrevTest.next.key, 'page2');
      t.is(dllPrevTest.next.value, 'page2');
    } else if (j === 2) {
      t.is(dllPrevTest.key, 'page2');
      t.is(dllPrevTest.value, 'page2');
      t.is(dllPrevTest.prev.key, 'page1');
      t.is(dllPrevTest.prev.value, 'page1');
      t.is(dllPrevTest.next.key, 'page3');
      t.is(dllPrevTest.next.value, 'page3');
    } else if (j === 1) {
      t.is(dllPrevTest.key, 'page3');
      t.is(dllPrevTest.value, 'page3');
      t.is(dllPrevTest.prev.key, 'page2');
      t.is(dllPrevTest.prev.value, 'page2');
      t.is(dllPrevTest.next.key, 'page4');
      t.is(dllPrevTest.next.value, 'page4');
    } else if (j === 0) {
      t.is(dllPrevTest.key, 'page4');
      t.is(dllPrevTest.value, 'page4');
      t.is(dllPrevTest.prev.key, 'page3');
      t.is(dllPrevTest.prev.value, 'page3');
      t.is(dllPrevTest.next.key, 'page5');
      t.is(dllPrevTest.next.value, 'page5');
    }
    dllPrevTest = dllPrevTest.prev;
    j++;
  }
});
