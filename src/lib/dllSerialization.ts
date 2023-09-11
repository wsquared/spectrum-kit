import { DoubleLinkedListNode } from './dll';

/**
 * For a given doubly linked list node, serialize the list into an array of objects
 * so that it can be stored in a local storage or sent over the network.
 *
 * @param node a doubly linked list node
 * @returns an array of objects representing the doubly linked list
 */
const serializeDoubleLinkedList = <T>(
  node: DoubleLinkedListNode<T> | null
): { value: T; prev?: T | null; next?: T | null }[] => {
  const serializedList: { value: T; prev?: T | null; next?: T | null }[] = [];

  let current = node;

  while (current) {
    const serializedNode: { value: T; prev?: T | null; next?: T | null } = {
      value: current.value,
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

  return serializedList;
};

/**
 * For a given array of objects representing a doubly linked list, deserialize the data
 * into a doubly linked list node.
 *
 * @param data an array of objects representing a doubly linked list
 * @returns a doubly linked list node
 */
const deserializeDoubleLinkedList = <T>(
  data: { value: T; prev?: T | null; next?: T | null }[]
): DoubleLinkedListNode<T> | null => {
  if (!data || data.length === 0) {
    return null;
  }

  const nodeMap: Map<T, DoubleLinkedListNode<T>> = new Map();
  let head: DoubleLinkedListNode<T> | null = null;

  for (const item of data) {
    const newNode = new DoubleLinkedListNode(item.value);
    nodeMap.set(item.value, newNode);

    if (item.prev && nodeMap.has(item.prev)) {
      const prevNode = nodeMap.get(item.prev);
      newNode.prev = prevNode;
      prevNode.next = newNode;
    }

    if (!head) {
      head = newNode;
    }
  }

  return head;
};

export { serializeDoubleLinkedList, deserializeDoubleLinkedList };
