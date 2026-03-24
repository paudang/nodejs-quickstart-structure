# AI-Native Development

This generator is built for the age of AI. We provide specialized context to help AI agents like **Cursor**, **ChatGPT**, and **Claude** understand your project deeply.

## .cursorrules (for Cursor Users)

When you open your generated project in **Cursor**, it automatically reads the `.cursorrules` file at the root.

-   **Automatic Enforcement**: Guides the AI to follow the selected architecture (MVC or Clean).
-   **Quality Gates**: Instructs the AI to maintain at least 70% test coverage for new code.
-   **Contextual Awareness**: Pre-configured with your specific stack choices (e.g., "This is a TypeScript MVC project using PostgreSQL").

## Agent Skill Templates (prompts/)

Check the `prompts/` directory in your project root for highly-optimized prompt templates.

-   **project-context.md**: A master prompt for any LLM to understand the entire repository structure.
-   **add-feature.md**: A guide for the AI to add new features following the existing patterns.
-   **troubleshoot.md**: Helps the AI diagnose common issues in this specific stack.

## Pro-tip: Customizing AI Rules

You can (and should!) update the **Project Goal** placeholder in `.cursorrules` to describe your specific business domain. This helps the AI provide much more relevant code suggestions for your unique use case.
