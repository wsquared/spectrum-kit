import anyTest, { TestInterface } from 'ava';

import { BrowserHistory } from './browserHistory'; // Update the import path as needed

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
  t.is(t.context.history.back(1).pathname, homepage);
  t.is(t.context.history.forward(1).pathname, homepage);
});

test('Back and forward methods should work correctly', (t) => {
  // Visit some pages
  t.context.history.visit(page1);
  t.context.history.visit(page2);
  t.context.history.visit(page3);

  // Test the back and forward methods
  t.is(t.context.history.back(1).pathname, page2);
  t.is(t.context.history.back(1).pathname, page1);
  t.is(t.context.history.back(1).pathname, homepage);
  t.is(t.context.history.forward(1).pathname, page1);
  t.is(t.context.history.forward(1).pathname, page2);
  t.is(t.context.history.forward(1).pathname, page3);
});

test('current and root properties after visiting and going back', (t) => {
  // Test visiting a new page after going back
  t.context.history.visit(page4);
  t.is(t.context.history.forward(1).pathname, page4);

  // Test going back and forward multiple steps
  t.is(t.context.history.back(2).pathname, page2);
  t.is(t.context.history.forward(2).pathname, page4);

  // Test current and root properties
  t.is(t.context.history.getCurrentPage().pathname, page4);
  t.is(t.context.history.getHomePage().pathname, homepage);
});

test('Back and forward methods should work correctly after visiting a new page', (t) => {
  // Test visiting a new page
  t.context.history.visit(page1);
  t.is(t.context.history.back(1).pathname, page4);
  t.is(t.context.history.forward(1).pathname, page1);
});

const historyTestDouble = {
  homePage: [
    {
      key: 'homepage',
      value: undefined,
      prev: null,
      next: { key: 'page1', value: undefined },
    },
    {
      key: 'page1',
      value: undefined,
      prev: { key: 'homepage', value: undefined },
      next: { key: 'page2', value: undefined },
    },
    {
      key: 'page2',
      value: undefined,
      prev: { key: 'page1', value: undefined },
      next: { key: 'page3', value: undefined },
    },
    {
      key: 'page3',
      value: undefined,
      prev: { key: 'page2', value: undefined },
      next: { key: 'page4', value: undefined },
    },
    {
      key: 'page4',
      value: undefined,
      prev: { key: 'page3', value: undefined },
      next: { key: 'page1', value: undefined },
    },
    {
      key: 'page1',
      value: undefined,
      prev: { key: 'page4', value: undefined },
      next: null,
    },
  ],
  currentPage: [
    {
      key: 'page1',
      value: undefined,
      prev: { key: 'page4', value: undefined },
      next: null,
    },
    {
      key: 'page4',
      value: undefined,
      prev: { key: 'page3', value: undefined },
      next: { key: 'page1', value: undefined },
    },
    {
      key: 'page3',
      value: undefined,
      prev: { key: 'page2', value: undefined },
      next: { key: 'page4', value: undefined },
    },
    {
      key: 'page2',
      value: undefined,
      prev: { key: 'page1', value: undefined },
      next: { key: 'page3', value: undefined },
    },
    {
      key: 'page1',
      value: undefined,
      prev: { key: 'homepage', value: undefined },
      next: { key: 'page2', value: undefined },
    },
    {
      key: 'homepage',
      value: undefined,
      prev: null,
      next: { key: 'page1', value: undefined },
    },
  ],
};

test('serialize method should work correctly', (t) => {
  // Test the serialize method
  t.deepEqual(t.context.history.serializeHistory(), historyTestDouble);
});

test('deserialize method should work correctly', (t) => {
  t.context.history.deserializeHistory(historyTestDouble);
  t.is(t.context.history.back(1).pathname, page4);
  t.is(t.context.history.forward(1).pathname, page1);
  t.is(t.context.history.getHomePage().pathname, homepage);
  t.is(t.context.history.getCurrentPage().pathname, page1);
});
