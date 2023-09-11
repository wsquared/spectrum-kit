import test from 'ava';

import { BrowserHistory } from './browserHistory'; // Update the import path as needed

test('BrowserHistory should work correctly', (t) => {
  // Initialize a BrowserHistory instance
  const homepage = 'homepage';
  const history = new BrowserHistory<string>(homepage);

  // Test the initial state
  t.is(history.back(1), history.root);
  t.is(history.forward(1), history.root);

  // Visit some pages
  const page1 = 'page1';
  const page2 = 'page2';
  const page3 = 'page3';
  history.visit(page1);
  history.visit(page2);
  history.visit(page3);

  // Test the back and forward methods
  t.is(history.back(1), page2);
  t.is(history.back(1), page1);
  t.is(history.back(1), homepage);
  t.is(history.forward(1), page1);
  t.is(history.forward(1), page2);
  t.is(history.forward(1), page3);

  // Test visiting a new page after going back
  const page4 = 'page4';
  history.visit(page4);
  t.is(history.forward(1), page4);

  // Test going back and forward multiple steps
  t.is(history.back(2), page2);
  t.is(history.forward(2), page4);

  // Test current and root properties
  t.is(history.current, page4);
  t.is(history.root, homepage);

  // Test getRootNode and getCurrentNode methods
  t.is(history.getRootNode().value, homepage);
  t.is(history.getCurrentNode().value, page4);
});
