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
  const page1 = history.visit('page1');
  const page2 = history.visit('page2');
  const page3 = history.visit('page3');

  // Test the back and forward methods
  t.is(history.back(1).value, page2.value);
  t.is(history.back(1).value, page1.value);
  t.is(history.back(1).value, homepage);
  t.is(history.forward(1).value, page1.value);
  t.is(history.forward(1).value, page2.value);
  t.is(history.forward(1).value, page3.value);

  // Test visiting a new page after going back
  const page4 = history.visit('page4');
  t.is(history.forward(1).value, page4.value);

  // Test going back and forward multiple steps
  t.is(history.back(2).value, page2.value);
  t.is(history.forward(2).value, page4.value);
});
