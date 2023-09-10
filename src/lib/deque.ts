import { DoubleLinkedListNode } from './dll';

/**
 * A double ended queue using a double linked list, where
 * .popLeft() and .appendLeft() will be a time complexity
 * of O(1), as opposed to O(n) for .shift() and .unshift().
 *
 * ### Example (es imports)
 * ```js
 * import { Deque } from 'spectrum-kit';
 *
 * const deque = new Deque<number>([1, 2, 3]);
 *
 * ```
 *
 * ### Example (commonjs)
 * ```js
 * var Deque = require('spectrum-kit').Deque;
 *
 * var deque = new Deque<number>([1, 2, 3]);
 * ```
 * @template T The type of the value stored in the deque
 */
class Deque<T> {
  private _head: DoubleLinkedListNode<T> | null;
  private _tail: DoubleLinkedListNode<T> | null;
  private _size: number;

  constructor(items: T[] = []) {
    this._head = null;
    this._tail = null;
    this._size = 0;

    items.forEach((item) => {
      this.append(item);
    });
  }

  get size() {
    return this._size;
  }

  /**
   * Append a value to the deque
   * @example <caption>es imports</caption>
   *
   * ```js
   * import { Deque } from 'spectrum-kit';
   *
   * const deque = new Deque<number>();
   *
   * deque.append(1);
   * ```
   *
   * @param value The value to append to the deque
   */
  append(value: T) {
    const node = new DoubleLinkedListNode<T>(value);

    if (!this._tail) {
      this._head = node;
      this._tail = this._head;
    } else {
      node.prev = this._tail;
      this._tail.next = node;
      this._tail = node;
    }

    this._size++;
  }

  /**
   * Append a value to the start of the deque
   * @example <caption>es imports</caption>
   *
   * ```js
   * import { Deque } from 'spectrum-kit';
   *
   * const deque = new Deque<number>();
   *
   * deque.appendLeft(2);
   * // 2
   * deque.appendLeft(1);
   * // 1<->2
   * ```
   *
   * @param value The value to append to the deque
   */
  appendLeft(value: T) {
    const node = new DoubleLinkedListNode<T>(value);

    if (this._head) {
      node.next = this._head;
      this._head.prev = node;
      this._head = node;
    } else {
      this._head = node;
      this._tail = this._head;
    }

    this._size++;
  }

  /**
   * Pop the last value from the deque
   * @example <caption>es imports</caption>
   *
   * ```js
   * import { Deque } from 'spectrum-kit';
   *
   * const deque = new Deque<number>([1, 2, 3]);
   *
   * deque.pop();
   * // 3
   * ```
   *
   * @returns The last value in the deque
   * @returns null if the deque is empty
   */
  pop(): T | null {
    if (!this._tail) {
      return null;
    }

    const value = this._tail.value;

    if (this._tail.prev) {
      this._tail = this._tail.prev;
      this._tail.next = null;
      this._size--;
    } else {
      this._head = null;
      this._tail = null;
      this._size = 0;
    }

    return value;
  }

  /**
   * Pop the first value from the deque
   * @example <caption>es imports</caption>
   *
   * ```js
   * import { Deque } from 'spectrum-kit';
   *
   * const deque = new Deque<number>([1, 2, 3]);
   *
   * deque.popLeft();
   * // 1
   * ```
   *
   * @returns The first value in the deque
   * @returns null if the deque is empty
   */
  popLeft(): T | null {
    if (!this._head) {
      return null;
    }

    const value = this._head.value;

    if (this._head.next) {
      this._head = this._head.next;
      this._head.prev = null;
      this._size--;
    } else {
      this._head = null;
      this._tail = null;
      this._size = 0;
    }

    return value;
  }

  /**
   * @param items items to extend the deque with
   */
  extend(items: T[]) {
    items.forEach((item) => {
      this.append(item);
    });
  }

  /**
   * @param items items to add to the front of the deque
   */
  extendLeft(items: T[]) {
    items.forEach((item) => {
      this.appendLeft(item);
    });
  }

  /**
   * Clear the deque
   * @example <caption>es imports</caption>
   *
   * ```js
   * import { Deque } from 'spectrum-kit';
   *
   * const deque = new Deque<number>([1, 2, 3]);
   *
   * deque.clear();
   *
   * console.log(deque.size);
   * // 0
   * ```
   */
  clear() {
    this._head = null;
    this._tail = null;
    this._size = 0;
  }
}

export { Deque, Deque as default };
