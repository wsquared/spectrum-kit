import {
  IDllSerializedList,
  IDllSerializedNode,
} from '../types/dllSerialization';

import { DoubleLinkedListNode } from './dll';

/**
 * For a given doubly linked list node, serialize the list into an array of objects
 * so that it can be stored in a local storage or sent over the network.
 *
 * @param node a doubly linked list node
 * @returns an array of objects representing the doubly linked list, where the first index 0 is the current node
 */
const serializeDoubleLinkedList = <T>(
  node: DoubleLinkedListNode<T> | null
): IDllSerializedList<T> => {
  const serializedList: IDllSerializedList<T> = [];

  let current = node;

  while (current) {
    const serializedNode: IDllSerializedNode<T> = {
      value: current.value,
      prev: null,
      next: null,
    };

    if (current.prev) {
      serializedNode.prev = current.prev.value;
    }

    if (current.next) {
      serializedNode.next = current.next.value;
    }

    serializedList.push(serializedNode);
    current = current.next;
  }

  let currentPrev = node?.prev;

  while (currentPrev) {
    const serializedNode: IDllSerializedNode<T> = {
      value: currentPrev.value,
      prev: null,
      next: null,
    };

    if (currentPrev.prev) {
      serializedNode.prev = currentPrev.prev.value;
    }

    if (currentPrev.next) {
      serializedNode.next = currentPrev.next.value;
    }

    serializedList.push(serializedNode);
    currentPrev = currentPrev.prev;
  }

  return serializedList;
};

/**
 * For a given array of objects representing a doubly linked list, deserialize the data
 * into a doubly linked list node.
 *
 * @param data an array of objects representing a doubly linked list
 * @returns a doubly linked list node deserialize from the data, where the first index 0 is the current node
 */
const deserializeDoubleLinkedList = <T>(
  data: IDllSerializedList<T>
): DoubleLinkedListNode<T> | null => {
  if (!data || data.length === 0) {
    return null;
  }

  const nodeMap: Map<T, DoubleLinkedListNode<T>> = new Map();
  let currentNode: DoubleLinkedListNode<T> | null = null;

  for (const item of data) {
    const newNode = new DoubleLinkedListNode(item.value);
    nodeMap.set(item.value, newNode);

    if ((item.prev || item.prev === 0) && nodeMap.has(item.prev)) {
      const prevNode = nodeMap.get(item.prev);
      newNode.prev = prevNode;
      prevNode.next = newNode;
    }

    if ((item.next || item.next === 0) && nodeMap.has(item.next)) {
      const nextNode = nodeMap.get(item.next);
      newNode.next = nextNode;
      nextNode.prev = newNode;
    }

    if (!currentNode) {
      currentNode = newNode;
    }
  }

  return currentNode;
};

export { serializeDoubleLinkedList, deserializeDoubleLinkedList };
