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
const page2 = history.visit('page2');
const page3 = history.visit('page3');

history.back(1); // => page2
history.back(1); // => page1
history.back(1); // => homepage
history.forward(1); // => page1
history.forward(1); // => page2
history.forward(1); // => page3
```

### DoubleLinkedListNode

The DoubleLinkedListNode class provides a versatile double-linked list node implementation. You can use it in various scenarios, such as implementing data structures or managing complex data relationships.

```js
import { DoubleLinkedListNode } from 'spectrum-kit';

const node = new DoubleLinkedListNode('a');

console.log(node.value); // => 'a'
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
