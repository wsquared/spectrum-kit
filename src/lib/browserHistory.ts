import { ILocationState, ISerializedHistory } from '../types/browserHistory';

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
  private _root: DoubleLinkedListNode<ILocationState<T>>;
  private _current: DoubleLinkedListNode<ILocationState<T>>;

  /**
   * @param homepage The homepage to initialize the browser history with
   */
  constructor(homepageUrl: string, state?: T) {
    this._root = new DoubleLinkedListNode<ILocationState<T>>({
      pathname: homepageUrl,
      state: state,
    });
    this._current = this._root;
  }

  /**
   *
   * @returns the homepage's pathname and state
   */
  getHomePage(): ILocationState<T> {
    return this._root.value;
  }

  /**
   *
   * @returns the current page's pathname and state
   */
  getCurrentPage(): ILocationState<T> {
    return this._current.value;
  }

  /**
   * @param page The page or pathname to visit
   */
  visit(page: string, state?: T) {
    const node = new DoubleLinkedListNode<ILocationState<T>>({
      pathname: page,
      state,
    });

    this._current.next = node;
    node.prev = this._current;
    this._current = node;
  }

  /**
   * @param steps The number of steps to go back
   * @returns The pathname and state that is the number of steps back from the current page
   * @returns The homepage pathname and state if there is no more pages `steps` steps back from the current page
   */
  back(steps: number): ILocationState<T> {
    let stepsLeft = steps;

    while (this._current.prev && stepsLeft > 0) {
      this._current = this._current.prev;
      stepsLeft--;
    }

    return this._current.value;
  }

  /**
   * @param steps The number of steps to go forward
   * @returns The pathname and state that is `steps` steps forward from the current page
   * @returns The homepage pathname and state if there is no more pages `steps` steps forward from the current page
   */
  forward(steps: number): ILocationState<T> {
    let stepsLeft = steps;

    while (this._current.next && stepsLeft > 0) {
      this._current = this._current.next;
      stepsLeft--;
    }

    return this._current.value;
  }

  /**
   *
   * @returns A serialized version of the browser history
   */
  serializeHistory(): ISerializedHistory<T> {
    return {
      homePage: serializeDoubleLinkedList(this._root),
      currentPage: serializeDoubleLinkedList(this._current),
    };
  }
}

export { BrowserHistory, BrowserHistory as default };
