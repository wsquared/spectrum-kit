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
      key: current.key,
      value: current.value,
      prev: null,
      next: null,
    };

    if (current.prev) {
      serializedNode.prev = {
        key: current.prev.key,
        value: current.prev.value,
      };
    }

    if (current.next) {
      serializedNode.next = {
        key: current.next.key,
        value: current.next.value,
      };
    }

    serializedList.push(serializedNode);
    current = current.next;
  }

  let currentPrev = node?.prev;

  while (currentPrev) {
    const serializedNode: IDllSerializedNode<T> = {
      key: currentPrev.key,
      value: currentPrev.value,
      prev: null,
      next: null,
    };

    if (currentPrev.prev) {
      serializedNode.prev = {
        key: currentPrev.prev.key,
        value: currentPrev.prev.value,
      };
    }

    if (currentPrev.next) {
      serializedNode.next = {
        key: currentPrev.next.key,
        value: currentPrev.next.value,
      };
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

  const nodeMap: Map<string, DoubleLinkedListNode<T>> = new Map();
  let currentNode: DoubleLinkedListNode<T> | null = null;

  for (const item of data) {
    const newNode = new DoubleLinkedListNode(item.key, item.value);
    nodeMap.set(item.key, newNode);

    if (item.prev && nodeMap.has(item.prev.key)) {
      const prevNode = nodeMap.get(item.prev.key);
      newNode.prev = prevNode;
      prevNode.next = newNode;
    }

    if (item.next && nodeMap.has(item.next.key)) {
      const nextNode = nodeMap.get(item.next.key);
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
