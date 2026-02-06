# NodeJS Quickstart Generator - Test Cases

This document lists the **32 possible project combinations** supported by the `nodejs-quickstart` CLI. These combinations cover all supported languages, architectures, databases, and communication patterns.

## Summary
- **MVC Architecture**: 24 Combinations
  - (2 Languages × 3 View Engines × 2 Databases × 2 Patterns)
- **Clean Architecture**: 8 Combinations
  - (2 Languages × 1 View Engine (None) × 2 Databases × 2 Patterns)

**Total Core Combinations: 32**

> **Note on CI/CD**: Each of these 32 combinations can be generated with or without the **GitHub Actions CI Workflow** (`--include-ci`). This effectively creates **64 possible project states**. The validation script currently defaults to *including* CI to verify the full "Professional Standards" feature set.

---

## 1. MVC Architecture (24 Cases)

| # | Language | Architecture | View Engine | Database | Communication |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | JavaScript | MVC | None | MySQL | REST APIs |
| 2 | JavaScript | MVC | None | MySQL | Kafka |
| 3 | JavaScript | MVC | None | PostgreSQL | REST APIs |
| 4 | JavaScript | MVC | None | PostgreSQL | Kafka |
| 5 | JavaScript | MVC | EJS | MySQL | REST APIs |
| 6 | JavaScript | MVC | EJS | MySQL | Kafka |
| 7 | JavaScript | MVC | EJS | PostgreSQL | REST APIs |
| 8 | JavaScript | MVC | EJS | PostgreSQL | Kafka |
| 9 | JavaScript | MVC | Pug | MySQL | REST APIs |
| 10 | JavaScript | MVC | Pug | MySQL | Kafka |
| 11 | JavaScript | MVC | Pug | PostgreSQL | REST APIs |
| 12 | JavaScript | MVC | Pug | PostgreSQL | Kafka |
| 13 | TypeScript | MVC | None | MySQL | REST APIs |
| 14 | TypeScript | MVC | None | MySQL | Kafka |
| 15 | TypeScript | MVC | None | PostgreSQL | REST APIs |
| 16 | TypeScript | MVC | None | PostgreSQL | Kafka |
| 17 | TypeScript | MVC | EJS | MySQL | REST APIs |
| 18 | TypeScript | MVC | EJS | MySQL | Kafka |
| 19 | TypeScript | MVC | EJS | PostgreSQL | REST APIs |
| 20 | TypeScript | MVC | EJS | PostgreSQL | Kafka |
| 21 | TypeScript | MVC | Pug | MySQL | REST APIs |
| 22 | TypeScript | MVC | Pug | MySQL | Kafka |
| 23 | TypeScript | MVC | Pug | PostgreSQL | REST APIs |
| 24 | TypeScript | MVC | Pug | PostgreSQL | Kafka |

## 2. Clean Architecture (8 Cases)
*Note: Clean Architecture does not use server-side view engines (EJS/Pug).*

| # | Language | Architecture | View Engine | Database | Communication |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 25 | JavaScript | Clean Architecture | N/A | MySQL | REST APIs |
| 26 | JavaScript | Clean Architecture | N/A | MySQL | Kafka |
| 27 | JavaScript | Clean Architecture | N/A | PostgreSQL | REST APIs |
| 28 | JavaScript | Clean Architecture | N/A | PostgreSQL | Kafka |
| 29 | TypeScript | Clean Architecture | N/A | MySQL | REST APIs |
| 30 | TypeScript | Clean Architecture | N/A | MySQL | Kafka |
| 31 | TypeScript | Clean Architecture | N/A | PostgreSQL | REST APIs |
| 32 | TypeScript | Clean Architecture | N/A | PostgreSQL | Kafka |
