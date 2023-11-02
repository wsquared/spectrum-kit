/**
 * A double linked list node.
 *
 * ### Example (es imports)
 * ```js
 * import { DoubleLinkedListNode } from 'spectrum-kit';
 *
 * const node = new DoubleLinkedListNode('a');
 *
 * console.log(node.value);
 * // => 'a'
 * ```
 *
 * ### Example (commonjs)
 * ```js
 * var DoubleLinkedListNode = require('spectrum-kit').DoubleLinkedListNode;
 *
 * var node = new DoubleLinkedListNode('a');
 *
 * console.log(node.value);
 * // => 'a'
 * ```
 *
 * @template T The type of the value stored in the node
 */
class DoubleLinkedListNode<T> {
  key: string;
  value: T;
  next: DoubleLinkedListNode<T> | null;
  prev: DoubleLinkedListNode<T> | null;

  constructor(key: string, value: T) {
    this.key = key;
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

export { DoubleLinkedListNode };
