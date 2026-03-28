# Contributing to nodejs-quickstart-structure

First off, thank you for considering contributing to `nodejs-quickstart-structure`! It's people like you that make this tool such a great boilerplate generator.

This project embraces **AI-assisted development**. We use Gemini AI for architectural reviews and security hardening. Contributions from both humans and AI agents are welcome, provided they meet our quality standards.

## Code of Conduct

By participating in this project, you are expected to be welcoming, inclusive, and respectful to all contributors and users.

## How Can I Contribute?

### Reporting Bugs

- Ensure the bug was not already reported by searching on GitHub under [Issues](https://github.com/paudang/nodejs-quickstart-structure/issues).
- If you're unable to find an open issue addressing the problem, open a new one. Be sure to include a title and clear description, as much relevant information as possible, and steps to reproduce the issue.

### Suggesting Enhancements

- Open a new issue with a clear title and description.
- Check the [Public Roadmap on Trello](https://trello.com/b/TPTo8ylF/nodejs-quickstart-structure-product) to see if the feature is already planned.

### Pull Requests

1. Fork the repo and create your branch from `main`.
2. Implement your feature or bug fix.
3. If you've added code that should be tested, please add tests.
4. Ensure the test suite passes (`npm run test:e2e`).
5. Make sure your code follows the project's formatting and linting guidelines.
6. Create a Pull Request with a clear description of the changes.

## Development Setup

To set up the project locally for development:

1. Clone your fork:
   ```bash
   git clone https://github.com/paudang/nodejs-quickstart-structure.git
   cd nodejs-quickstart-structure
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Link the package globally to test the CLI locally:
   ```bash
   npm link
   ```
   Now you can use `nodejs-quickstart` anywhere on your machine to test your local changes.

4. **Testing Generators**: To verify your changes across the 240+ combinations:
   ```bash
   npm run test:e2e  # Runs the full validation matrix
   ```

## Technical Documentation

For a deep dive into the generator's internal flow and architecture, please refer to our **[Developer Guides](https://paudang.github.io/nodejs-quickstart-structure/guide/introduction)**.

Thank you for contributing!
