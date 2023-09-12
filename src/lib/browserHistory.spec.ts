import anyTest, { TestInterface } from 'ava';

import { BrowserHistory } from './browserHistory'; // Update the import path as needed
import { DoubleLinkedListNode } from './dll';

const test = anyTest as TestInterface<{
  history: BrowserHistory<string>;
  homePage: string;
}>;

const homepage = 'homepage';
const page1 = 'page1';
const page2 = 'page2';
const page3 = 'page3';
const page4 = 'page4';

test.before((t) => {
  // Initialize a BrowserHistory instance
  t.context.history = new BrowserHistory<string>(homepage);
});

test('BrowserHistory initial state', (t) => {
  // Test the initial state
  t.is(t.context.history.back(1), t.context.history.root);
  t.is(t.context.history.forward(1), t.context.history.root);
});

test('Back and forward methods should work correctly', (t) => {
  // Visit some pages
  t.context.history.visit(page1);
  t.context.history.visit(page2);
  t.context.history.visit(page3);

  // Test the back and forward methods
  t.is(t.context.history.back(1), page2);
  t.is(t.context.history.back(1), page1);
  t.is(t.context.history.back(1), homepage);
  t.is(t.context.history.forward(1), page1);
  t.is(t.context.history.forward(1), page2);
  t.is(t.context.history.forward(1), page3);
});

test('current and root properties after visiting and going back', (t) => {
  // Test visiting a new page after going back
  t.context.history.visit(page4);
  t.is(t.context.history.forward(1), page4);

  // Test going back and forward multiple steps
  t.is(t.context.history.back(2), page2);
  t.is(t.context.history.forward(2), page4);

  // Test current and root properties
  t.is(t.context.history.current, page4);
  t.is(t.context.history.root, homepage);
});

test('getRootNode and getCurrentNode methods', (t) => {
  t.is(t.context.history.getRootNode().value, homepage);
  t.is(t.context.history.getCurrentNode().value, page4);
});

test('getSerializedRoot and getSerializedCurrent methods', (t) => {
  // Test getSerializedRoot and getSerializedCurrent methods
  t.deepEqual(t.context.history.getSerializedRoot(), [
    {
      value: homepage,
      next: page1,
      prev: null,
    },
    {
      value: page1,
      prev: homepage,
      next: page2,
    },
    {
      value: page2,
      prev: page1,
      next: page3,
    },
    {
      value: page3,
      prev: page2,
      next: page4,
    },
    {
      value: page4,
      prev: page3,
      next: null,
    },
  ]);

  const page5 = 'page5';
  t.context.history.visit(page5);
  t.context.history.back(1);

  // First node should be page4
  t.deepEqual(t.context.history.getSerializedCurrent(), [
    {
      value: page4,
      next: page5,
      prev: page3,
    },
    {
      value: page5,
      next: null,
      prev: page4,
    },
    {
      value: page3,
      next: page4,
      prev: page2,
    },
    {
      value: page2,
      next: page3,
      prev: page1,
    },
    {
      value: page1,
      next: page2,
      prev: homepage,
    },
    {
      value: homepage,
      next: page1,
      prev: null,
    },
  ]);
});

test('setRootNode and setCurrentNode methods', (t) => {
  // Test setRootNode and setCurrentNode methods
  const page5 = new DoubleLinkedListNode('page5');
  const page6 = new DoubleLinkedListNode('page6');

  page5.next = page6;
  page6.prev = page5;

  t.context.history.setNode(page6);

  t.is(t.context.history.getRootNode(), page5);
  t.is(t.context.history.getCurrentNode(), page6);
});

test('no homepage', (t) => {
  // Test no homepage
  const history = new BrowserHistory<string>();

  history.visit(page1);
  history.visit(page2);
  history.visit(page3);

  t.is(history.back(1), page2);
  t.is(history.back(1), page1);
  t.is(history.back(1), null);
  t.is(history.forward(1), page1);
  t.is(history.forward(1), page2);
  t.is(history.forward(1), page3);
});
