# Contributing to Spectrum Kit

Welcome to the Spectrum Kit open-source project! We appreciate your interest in contributing. By following these guidelines, you can help us maintain a high-quality project and streamline the contribution process.

Please take a moment to review this document before making any contributions.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [How to Contribute](#how-to-contribute)
   - [Reporting Bugs](#reporting-bugs)
   - [Suggesting Enhancements](#suggesting-enhancements)
   - [Pull Requests](#pull-requests)
3. [Development Setup](#development-setup)
4. [Coding Guidelines](#coding-guidelines)
5. [Commit Messages](#commit-messages)
6. [License](#license)

## Code of Conduct

Before contributing, please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md). We expect all contributors to adhere to it, ensuring a positive and respectful environment for everyone involved.

## How to Contribute

### Reporting Bugs

If you discover a bug in Spectrum Kit, please create a GitHub Issue with the following details:

- A clear and descriptive title.
- A detailed description of the bug, including steps to reproduce it.
- The expected behavior.
- Information about your environment (e.g., operating system, Node.js version).

### Suggesting Enhancements

To suggest an enhancement or a new feature, follow these steps:

1. Check if there's an existing issue for the enhancement.
2. If no issue exists, create one with a clear and descriptive title.
3. Describe the enhancement or feature you'd like to see.
4. Explain why it would be valuable and how it benefits the project.

### Pull Requests

We welcome contributions in the form of Pull Requests (PRs). To submit a PR:

1. Fork the repository and create a new branch based on the `main` branch.
2. Ensure your code adheres to our [Coding Guidelines](#coding-guidelines).
3. Write clear and concise commit messages (see [Commit Messages](#commit-messages)).
4. Submit your PR, providing a detailed description of the changes.

We will review your PR and provide feedback. Please be patient, and we'll work together to merge your changes into the project.

## Development Setup

If you plan to contribute code to Spectrum Kit, you'll need to set up your development environment. Follow these steps:

1. Clone your fork of the repository.
2. Run `npm install` to install project dependencies.
3. Start the development server with `npm start`.

## Coding Guidelines

To maintain code consistency and readability, please adhere to the following guidelines:

- Follow TypeScript best practices.
- Use meaningful variable and function names.
- Write clear and concise code comments.
- Keep your code DRY (Don't Repeat Yourself).
- Write unit tests for new features and ensure existing tests pass.

## Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) format for commit messages.

Please install [Commitizen](https://github.com/commitizen/cz-cli) before adding any commits:

```bash
npx cz
```

Then use `git cz` or `cz` instead of `git commit` when committing changes.

Your commits should have a clear and structured format, like this:

```text
feat: add a new feature
fix: resolve a bug
chore: routine maintenance
docs: update documentation
test: add or update tests
```

## License

By contributing to Spectrum Kit, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).

Thank you for contributing to Spectrum Kit! Your help is greatly appreciated.

Happy coding!
