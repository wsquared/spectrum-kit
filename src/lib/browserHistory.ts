import { ILocationState, ISerializedHistory } from '../types/browserHistory';

import { DoubleLinkedListNode } from './dll';
import {
  deserializeDoubleLinkedList,
  serializeDoubleLinkedList,
} from './dllSerialization';

/**
 * A BrowserHistory class that implements a doubly linked list.
 *
 * ### Example (es imports)
 * ```js
 * import { BrowserHistory } from 'spectrum-kit';
 *
 * const history = new BrowserHistory('homepage');
 *
 * history.visit('page1');
 * history.visit('page2', 'foo');
 * history.visit('page3', 'bar');
 *
 * history.back(1); // => { pathname: 'page2', state: 'foo' }
 * history.back(1); // => { pathname: 'page1', state: undefined }
 * history.back(1); // => { pathname: 'homepage', state: undefined }
 * history.forward(1); // => { pathname: 'page1', state: undefined }
 * history.forward(1); // => { pathname: 'page2', state: 'foo' }
 * history.forward(1); // => { pathname: 'page3', state: 'bar' }
 * ```
 * @template T The type of the value stored in each node
 */
class BrowserHistory<T> {
  private _root: DoubleLinkedListNode<T>;
  private _current: DoubleLinkedListNode<T>;

  /**
   * @param homepage The homepage to initialize the browser history with
   */
  constructor(homepageUrl: string, state?: T) {
    this._root = new DoubleLinkedListNode<T>(homepageUrl, state);
    this._current = this._root;
  }

  /**
   *
   * @returns the homepage's pathname and state
   */
  getHomePage(): ILocationState<T> {
    return { pathname: this._root.key, state: this._root.value };
  }

  /**
   *
   * @returns the current page's pathname and state
   */
  getCurrentPage(): ILocationState<T> {
    return { pathname: this._current.key, state: this._current.value };
  }

  /**
   * @param page The page or pathname to visit
   */
  visit(page: string, state?: T): void {
    const node = new DoubleLinkedListNode<T>(page, state);

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

    return { pathname: this._current.key, state: this._current.value };
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

    return { pathname: this._current.key, state: this._current.value };
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

  /**
   *
   * @param serializedHistory A serialized version of the browser history
   */
  deserializeHistory(serializedHistory: ISerializedHistory<T>): void {
    this._root = deserializeDoubleLinkedList(serializedHistory.homePage);
    this._current = deserializeDoubleLinkedList(serializedHistory.currentPage);
  }
}

export { BrowserHistory, BrowserHistory as default };
