# Spectrum Kit

Spectrum Kit is a collection of TypeScript tools designed for various scenarios. It includes a powerful `BrowserHistory` class that implements a doubly linked list and a `DoubleLinkedListNode` class for managing navigation history in your browser-based applications.

## Table of Contents

- [Spectrum Kit](#spectrum-kit)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
    - [BrowserHistory](#browserhistory)
    - [DoubleLinkedListNode](#doublelinkedlistnode)
    - [Installation](#installation)
    - [Usage](#usage)
    - [Contributing](#contributing)
    - [License](#license)

## Introduction

Spectrum Kit provides TypeScript classes to simplify common tasks in web development, including managing browser history with the `BrowserHistory` class and working with double-linked lists using the `DoubleLinkedListNode` class.

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

### Installation

To install Spectrum Kit, you can use npm or yarn:

```bash
npm install spectrum-kit
# or
yarn add spectrum-kit
```

### Usage

You can import and use the classes provided by Spectrum Kit as demonstrated in the introduction section above. Make sure to check the documentation for more details and usage examples.

### Contributing

We welcome contributions from the open-source community. Before contributing, please read [our contribution guidelines](./.github/CONTRIBUTING.md) to understand the process.

If you encounter any issues or have ideas for improvements, please use our issue template to report bugs or suggest enhancements. If you'd like to submit a code change, follow our pull request template.

### License

Spectrum Kit is licensed under the MIT License. See the LICENSE file for details.

Thank you for using Spectrum Kit! We hope it simplifies your TypeScript development tasks.
