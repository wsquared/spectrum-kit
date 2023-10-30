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

test('serialize method should work correctly', (t) => {
  // Test the serialize method
  t.deepEqual(t.context.history.serializeHistory(), {
    homePage: [
      {
        value: { pathname: 'homepage', state: undefined },
        prev: null,
        next: { pathname: 'page1', state: undefined },
      },
      {
        value: { pathname: 'page1', state: undefined },
        prev: { pathname: 'homepage', state: undefined },
        next: { pathname: 'page2', state: undefined },
      },
      {
        value: { pathname: 'page2', state: undefined },
        prev: { pathname: 'page1', state: undefined },
        next: { pathname: 'page3', state: undefined },
      },
      {
        value: { pathname: 'page3', state: undefined },
        prev: { pathname: 'page2', state: undefined },
        next: { pathname: 'page4', state: undefined },
      },
      {
        value: { pathname: 'page4', state: undefined },
        prev: { pathname: 'page3', state: undefined },
        next: { pathname: 'page1', state: undefined },
      },
      {
        value: { pathname: 'page1', state: undefined },
        prev: { pathname: 'page4', state: undefined },
        next: null,
      },
    ],
    currentPage: [
      {
        value: { pathname: 'page1', state: undefined },
        prev: { pathname: 'page4', state: undefined },
        next: null,
      },
      {
        value: { pathname: 'page4', state: undefined },
        prev: { pathname: 'page3', state: undefined },
        next: { pathname: 'page1', state: undefined },
      },
      {
        value: { pathname: 'page3', state: undefined },
        prev: { pathname: 'page2', state: undefined },
        next: { pathname: 'page4', state: undefined },
      },
      {
        value: { pathname: 'page2', state: undefined },
        prev: { pathname: 'page1', state: undefined },
        next: { pathname: 'page3', state: undefined },
      },
      {
        value: { pathname: 'page1', state: undefined },
        prev: { pathname: 'homepage', state: undefined },
        next: { pathname: 'page2', state: undefined },
      },
      {
        value: { pathname: 'homepage', state: undefined },
        prev: null,
        next: { pathname: 'page1', state: undefined },
      },
    ],
  });
});
