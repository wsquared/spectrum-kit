import test from 'ava';

import { Deque } from './deque';

test('should initialize with a size of 0', (t) => {
  const deque = new Deque<number>();

  t.is(deque.size, 0);
});

test('should initialize an array of ordered items', (t) => {
  const deque = new Deque<number>([1, 2, 3]);

  t.is(deque.size, 3);
  t.is(deque.pop(), 3);
  t.is(deque.pop(), 2);
  t.is(deque.pop(), 1);
});

test('should create a node with the given value', (t) => {
  const deque = new Deque<number>();

  const result = 1;

  deque.append(result);

  t.is(deque.pop(), result);
});

test('should append nodes to the end of the deque', (t) => {
  const deque = new Deque<number>();

  const item1 = 1;
  const item2 = 2;

  deque.append(item1);
  deque.append(item2);

  t.is(deque.pop(), item2);
  t.is(deque.pop(), item1);
});

test('should pop last node appended', (t) => {
  const deque = new Deque<number>();

  const item1 = 1;
  const item2 = 2;

  deque.append(item1);
  deque.append(item2);

  t.is(deque.pop(), item2);
  t.is(deque.pop(), item1);
});

test('should popLeft first node appended', (t) => {
  const deque = new Deque<number>();

  const item1 = 1;
  const item2 = 2;

  deque.append(item1);
  deque.append(item2);

  t.is(deque.popLeft(), item1);
  t.is(deque.popLeft(), item2);
});

test('should return null if nothing to pop', (t) => {
  const deque = new Deque<number>();

  t.is(deque.popLeft(), null);
  t.is(deque.pop(), null);
});

test('should add nodes to the front of the deque', (t) => {
  const deque = new Deque<number>();

  const item1 = 1;
  const item2 = 2;

  deque.extendLeft([item1, item2]);

  t.is(deque.pop(), item1);
  t.is(deque.pop(), item2);
});

test('should add nodes to the back of the deque', (t) => {
  const deque = new Deque<number>();

  const item1 = 1;
  const item2 = 2;

  deque.extend([item1, item2]);

  t.is(deque.pop(), item2);
  t.is(deque.pop(), item1);
});

test('should clear the deque', (t) => {
  const deque = new Deque<number>([1, 2, 3]);

  deque.clear();

  t.is(deque.size, 0);
});
