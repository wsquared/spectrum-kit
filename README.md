[![CircleCI](https://dl.circleci.com/status-badge/img/gh/wsquared/spectrum-kit/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/wsquared/spectrum-kit/tree/main)
[![codecov](https://codecov.io/github/wsquared/spectrum-kit/graph/badge.svg?token=EDA96MHFXB)](https://codecov.io/github/wsquared/spectrum-kit)
![NPM Downloads](https://img.shields.io/npm/dw/spectrum-kit)
![NPM License](https://img.shields.io/npm/l/spectrum-kit)
[![Twitter](https://img.shields.io/twitter/follow/:twitterHandle.svg?style=social&label=@willwin_w)](https://twitter.com/willwin_w)

# Spectrum Kit

Spectrum Kit is a collection of TypeScript tools designed for various scenarios.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Spectrum Kit provides TypeScript classes to simplify common tasks in web development or your nodejs development, including managing browser history with the `BrowserHistory` class and working with double-linked lists using the `DoubleLinkedListNode` class and a `Deque` for managing complex data relationships.

### BrowserHistory

The `BrowserHistory` class allows you to manage your application's navigation history effortlessly. Here's a quick example of how to use it:

```js
import { BrowserHistory } from 'spectrum-kit';

const history = new BrowserHistory('homepage');

const page1 = history.visit('page1');
const page2 = history.visit('page2', 'foo');
const page3 = history.visit('page3');

 history.back(1); // => { pathname: page2, state: 'foo' }
 history.back(1); // => { pathname: page1, state: undefined }
 history.back(1); // => { pathname: homepage, state: undefined }
 history.forward(1); // => { pathname: page1, state: undefined }
 history.forward(1); // => { pathname: page2, state: 'foo' }
 history.forward(1); // => { pathname: page3, state: undefined }
```

### Serialization

To store your BrowserHistory data in a database, IndexedDB, or localStorage, you can use the serializeDoubleLinkedList function to convert the history into a serializable format. This function returns an array of objects where each object represents a node in the doubly linked list.

```js
// Import the serializeDoubleLinkedList function
import { serializeDoubleLinkedList } from 'spectrum-kit';

// Assuming you have a BrowserHistory instance called 'history'
const serializedData = history.serializeHistory();

// Now, you can store the 'serializedData' array in your preferred storage solution
// (e.g., IndexedDB, localStorage, or a database).
```

### Deserialization

To retrieve and reconstruct your BrowserHistory data from storage, you can use the deserializeDoubleLinkedList function. This function takes the serialized data as input and reconstructs the doubly linked list, allowing you to continue using it.

```js
import { BrowserHistory } from 'spectrum-kit';


// Retrieve the serialized data from your storage solution (e.g., IndexedDB or localStorage), must be serialized using
// serializeDoubleLinkedList in this repo
const storedData = /* Retrieve your data here */;

// Deserialize the data 
const history = new BrowserHistory('');

history.deserializeHistory(storedData);
```

### DoubleLinkedListNode

The DoubleLinkedListNode class provides a versatile double-linked list node implementation. You can use it in various scenarios, such as implementing data structures or managing complex data relationships.

```js
import { DoubleLinkedListNode } from 'spectrum-kit';

const node = new DoubleLinkedListNode('key', 'value');

console.log(node.key); // => 'key'
console.log(node.value); // => 'value'
```

### Deque

The Deque class provides a double ended queue, similar to python's deque. You can use it in various scenarios, and achieve a time complexity of O(1) for popLeft() and appendLeft() as opposed to O(n) for array's shift() and unshift().

```js
import { Deque } from 'spectrum-kit';

const deque = new Deque([1, 2, 3]);

deque.appendLeft(0);

deque.popLeft();
// 0
```

### Installation

To install Spectrum Kit, you can use npm or yarn:

```bash
npm install spectrum-kit
# or
yarn add spectrum-kit
```

### Usage

You can import and use the classes provided by Spectrum Kit as demonstrated in the introduction section above. Make sure to check the documentation for more details and usage examples.

## Contributing

We welcome contributions from the open-source community. Before contributing, please read [our contribution guidelines](./.github/CONTRIBUTING.md) to understand the process.

If you encounter any issues or have ideas for improvements, please use our issue template to report bugs or suggest enhancements. If you'd like to submit a code change, follow our pull request template.

## License

Spectrum Kit is licensed under the MIT License. See the LICENSE file for details.

Thank you for using Spectrum Kit! We hope it simplifies your TypeScript development tasks.
