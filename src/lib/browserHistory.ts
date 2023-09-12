import { DoubleLinkedListNode } from './dll';
import { serializeDoubleLinkedList } from './dllSerialization';

/**
 * A BrowserHistory class that implements a doubly linked list.
 *
 * ### Example (es imports)
 * ```js
 * import { BrowserHistory } from 'spectrum-kit';
 *
 * const history = new BrowserHistory('homepage');
 *
 * const page1 = history.visit('page1');
 * const page2 = history.visit('page2');
 * const page3 = history.visit('page3');
 *
 * history.back(1); // => page2
 * history.back(1); // => page1
 * history.back(1); // => homepage
 * history.forward(1); // => page1
 * history.forward(1); // => page2
 * history.forward(1); // => page3
 * ```
 *
 * ### Example (commonjs)
 * ```js
 * const { BrowserHistory } = require('spectrum-kit');
 *
 * const history = new BrowserHistory('homepage');
 *
 * const page1 = history.visit('page1');
 * const page2 = history.visit('page2');
 * const page3 = history.visit('page3');
 *
 * history.back(1); // => page2
 * history.back(1); // => page1
 * history.back(1); // => homepage
 * history.forward(1); // => page1
 * history.forward(1); // => page2
 * history.forward(1); // => page3
 * ```
 *
 * @template T The type of the value stored in each node
 */
class BrowserHistory<T> {
  private _root: DoubleLinkedListNode<T>;
  private _current: DoubleLinkedListNode<T>;

  /**
   * @param homepage The homepage to initialize the browser history with
   */
  constructor(homepage: T = null) {
    this._root = new DoubleLinkedListNode<T>(homepage);
    this._current = this._root;
  }

  /**
   * @returns the root node's value.
   */
  get root(): T {
    return this._root.value;
  }

  /**
   * @returns the current node's value.
   */
  get current(): T {
    return this._current.value;
  }

  /**
   * @returns The root double linked list node
   */
  getRootNode(): DoubleLinkedListNode<T> {
    return this._root;
  }

  /**
   * @returns The current double linked list node
   */
  getCurrentNode(): DoubleLinkedListNode<T> {
    return this._current;
  }

  /**
   * @param page The page to visit
   */
  visit(page: T) {
    const node = new DoubleLinkedListNode<T>(page);

    this._current.next = node;
    node.prev = this._current;
    this._current = node;
  }

  /**
   * @param steps The number of steps to go back
   * @returns The value of the node that is `steps` steps back from the current node
   * @returns The root node's value if there is no node `steps` steps back from the current node
   */
  back(steps: number): T {
    let stepsLeft = steps;

    while (this._current.prev && stepsLeft > 0) {
      this._current = this._current.prev;
      stepsLeft--;
    }

    return this._current.value;
  }

  /**
   * @param steps The number of steps to go forward
   * @returns The value of the node that is `steps` steps forward from the current node
   * @returns The root node's value if there is no node `steps` steps forward from the current node
   */
  forward(steps: number): T {
    let stepsLeft = steps;

    while (this._current.next && stepsLeft > 0) {
      this._current = this._current.next;
      stepsLeft--;
    }

    return this._current.value;
  }

  /**
   * setNode sets the current node as the @param node and sets the head of @param node as the root node.
   *
   * @param node a doubly linked list node
   */
  setNode(node: DoubleLinkedListNode<T>): void {
    this._current = node;

    while (node.prev) {
      node = node.prev;
    }

    this._root = node;
  }

  /**
   * serializes the root node of the browser history, so that it can be stored in a database or send over the network.
   *
   * @returns an array of objects representing the doubly linked list, where the first index 0 is the root node
   */
  getSerializedRoot(): { value: T; next: T | null; prev: T | null }[] {
    return serializeDoubleLinkedList(this._root);
  }

  /**
   * serializes the current node of the browser history, so that it can be stored in a database or send over the network.
   *
   * @returns an array of objects representing the doubly linked list, where the first index 0 is the current node
   */
  getSerializedCurrent(): { value: T; next: T | null; prev: T | null }[] {
    return serializeDoubleLinkedList(this._current);
  }
}

export { BrowserHistory, BrowserHistory as default };
