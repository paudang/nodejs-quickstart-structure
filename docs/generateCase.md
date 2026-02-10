# NodeJS Quickstart Generator - Test Cases

This document lists the **48 possible project combinations** supported by the `nodejs-quickstart` CLI. These combinations cover all supported languages, architectures, databases (including MongoDB), and communication patterns.

## Summary
- **MVC Architecture**: 36 Combinations
  - (2 Languages × 3 View Engines × 3 Databases × 2 Patterns)
- **Clean Architecture**: 12 Combinations
  - (2 Languages × 1 View Engine (None) × 3 Databases × 2 Patterns)

**Total Core Combinations: 48**

> **Note on CI/CD**: Each of these 48 combinations can be generated with or without the **GitHub Actions CI Workflow** (`--include-ci`). This effectively creates **96 possible project states**. The validation script currently defaults to *including* CI to verify the full "Professional Standards" feature set.

---

## 1. MVC Architecture (36 Cases)

| # | Language | Architecture | View Engine | Database | Communication |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | JavaScript | MVC | None | MySQL | REST APIs |
| 2 | JavaScript | MVC | None | MySQL | Kafka |
| 3 | JavaScript | MVC | None | PostgreSQL | REST APIs |
| 4 | JavaScript | MVC | None | PostgreSQL | Kafka |
| 5 | JavaScript | MVC | None | MongoDB | REST APIs |
| 6 | JavaScript | MVC | None | MongoDB | Kafka |
| 7 | JavaScript | MVC | EJS | MySQL | REST APIs |
| 8 | JavaScript | MVC | EJS | MySQL | Kafka |
| 9 | JavaScript | MVC | EJS | PostgreSQL | REST APIs |
| 10 | JavaScript | MVC | EJS | PostgreSQL | Kafka |
| 11 | JavaScript | MVC | EJS | MongoDB | REST APIs |
| 12 | JavaScript | MVC | EJS | MongoDB | Kafka |
| 13 | JavaScript | MVC | Pug | MySQL | REST APIs |
| 14 | JavaScript | MVC | Pug | MySQL | Kafka |
| 15 | JavaScript | MVC | Pug | PostgreSQL | REST APIs |
| 16 | JavaScript | MVC | Pug | PostgreSQL | Kafka |
| 17 | JavaScript | MVC | Pug | MongoDB | REST APIs |
| 18 | JavaScript | MVC | Pug | MongoDB | Kafka |
| 19 | TypeScript | MVC | None | MySQL | REST APIs |
| 20 | TypeScript | MVC | None | MySQL | Kafka |
| 21 | TypeScript | MVC | None | PostgreSQL | REST APIs |
| 22 | TypeScript | MVC | None | PostgreSQL | Kafka |
| 23 | TypeScript | MVC | None | MongoDB | REST APIs |
| 24 | TypeScript | MVC | None | MongoDB | Kafka |
| 25 | TypeScript | MVC | EJS | MySQL | REST APIs |
| 26 | TypeScript | MVC | EJS | MySQL | Kafka |
| 27 | TypeScript | MVC | EJS | PostgreSQL | REST APIs |
| 28 | TypeScript | MVC | EJS | PostgreSQL | Kafka |
| 29 | TypeScript | MVC | EJS | MongoDB | REST APIs |
| 30 | TypeScript | MVC | EJS | MongoDB | Kafka |
| 31 | TypeScript | MVC | Pug | MySQL | REST APIs |
| 32 | TypeScript | MVC | Pug | MySQL | Kafka |
| 33 | TypeScript | MVC | Pug | PostgreSQL | REST APIs |
| 34 | TypeScript | MVC | Pug | PostgreSQL | Kafka |
| 35 | TypeScript | MVC | Pug | MongoDB | REST APIs |
| 36 | TypeScript | MVC | Pug | MongoDB | Kafka |

## 2. Clean Architecture (12 Cases)
*Note: Clean Architecture does not use server-side view engines (EJS/Pug).*

| # | Language | Architecture | View Engine | Database | Communication |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 37 | JavaScript | Clean Architecture | N/A | MySQL | REST APIs |
| 38 | JavaScript | Clean Architecture | N/A | MySQL | Kafka |
| 39 | JavaScript | Clean Architecture | N/A | PostgreSQL | REST APIs |
| 40 | JavaScript | Clean Architecture | N/A | PostgreSQL | Kafka |
| 41 | JavaScript | Clean Architecture | N/A | MongoDB | REST APIs |
| 42 | JavaScript | Clean Architecture | N/A | MongoDB | Kafka |
| 43 | TypeScript | Clean Architecture | N/A | MySQL | REST APIs |
| 44 | TypeScript | Clean Architecture | N/A | MySQL | Kafka |
| 45 | TypeScript | Clean Architecture | N/A | PostgreSQL | REST APIs |
| 46 | TypeScript | Clean Architecture | N/A | PostgreSQL | Kafka |
| 47 | TypeScript | Clean Architecture | N/A | MongoDB | REST APIs |
| 48 | TypeScript | Clean Architecture | N/A | MongoDB | Kafka |
