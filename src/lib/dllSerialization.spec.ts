import test from 'ava';

import { DoubleLinkedListNode } from './dll'; // Replace with the actual file path
import {
  deserializeDoubleLinkedList,
  serializeDoubleLinkedList,
} from './dllSerialization';

test('Serialize and deserialize a doubly linked list', (t) => {
  // Create a sample doubly linked list
  const node1 = new DoubleLinkedListNode(1);
  const node2 = new DoubleLinkedListNode(2);
  const node3 = new DoubleLinkedListNode(3);

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
    { value: 1, next: 2 },
    { value: 2, prev: 1, next: 3 },
    { value: 3, prev: 2 },
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
  t.is(deserializedList.next.next.next, null);
});
