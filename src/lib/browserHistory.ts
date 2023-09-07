import { DoubleLinkedListNode } from './dll';

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
  root: DoubleLinkedListNode<T>;
  current: DoubleLinkedListNode<T>;

  constructor(homepage: T) {
    this.root = new DoubleLinkedListNode<T>(homepage);
    this.current = this.root;
  }

  visit(page: T): DoubleLinkedListNode<T> {
    const node = new DoubleLinkedListNode<T>(page);

    this.current.next = node;
    node.prev = this.current;
    this.current = node;

    return node;
  }

  back(steps: number): DoubleLinkedListNode<T> | null {
    let stepsLeft = steps;

    while (this.current.prev && stepsLeft > 0) {
      this.current = this.current.prev;
      stepsLeft--;
    }

    return this.current;
  }

  forward(steps: number): DoubleLinkedListNode<T> | null {
    let stepsLeft = steps;

    while (this.current.next && stepsLeft > 0) {
      this.current = this.current.next;
      stepsLeft--;
    }

    return this.current;
  }
}

export { BrowserHistory, BrowserHistory as default };
