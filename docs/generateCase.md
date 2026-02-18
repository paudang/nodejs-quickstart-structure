# NodeJS Quickstart Generator - Test Cases

This document lists the **112 possible project combinations** supported by the `nodejs-quickstart` CLI. These combinations cover all supported languages, architectures, databases, communication patterns, and caching options.

## Summary
- **CI Providers**: `None`, `GitHub Actions`, `Jenkins`, `GitLab CI`
- **MVC Architecture**: 84 Combinations
  - **With Database (36)**: 2 Lang × 3 View × 3 DB × 2 Comm = 36 * 2 (Caching: None/Redis) = 72
  - **No Database (12)**: 2 Lang × 3 View × 1 DB × 2 Comm = 12 * 1 (Caching: None) = 12
- **Clean Architecture**: 28 Combinations
  - **With Database (12)**: 2 Lang × 1 View (None) × 3 DB × 2 Comm = 12 * 2 (Caching: None/Redis) = 24
  - **No Database (4)**: 2 Lang × 1 View (None) × 1 DB × 2 Comm = 4 * 1 (Caching: None) = 4

**Total Core Combinations: 112**

> **Note on CI/CD**: Each combination can be generated with or without CI/CD (`--ci-provider`), effectively doubling the state space.

---

## 1. MVC Architecture (84 Cases)

| # | Language | Architecture | View Engine | Database | Communication | Caching |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | JavaScript | MVC | None | MySQL | REST APIs | None |
| 2 | JavaScript | MVC | None | MySQL | REST APIs | Redis |
| 3 | JavaScript | MVC | None | MySQL | Kafka | None |
| 4 | JavaScript | MVC | None | MySQL | Kafka | Redis |
| 5 | JavaScript | MVC | None | PostgreSQL | REST APIs | None |
| 6 | JavaScript | MVC | None | PostgreSQL | REST APIs | Redis |
| 7 | JavaScript | MVC | None | PostgreSQL | Kafka | None |
| 8 | JavaScript | MVC | None | PostgreSQL | Kafka | Redis |
| 9 | JavaScript | MVC | None | MongoDB | REST APIs | None |
| 10 | JavaScript | MVC | None | MongoDB | REST APIs | Redis |
| 11 | JavaScript | MVC | None | MongoDB | Kafka | None |
| 12 | JavaScript | MVC | None | MongoDB | Kafka | Redis |
| 13 | JavaScript | MVC | EJS | MySQL | REST APIs | None |
| 14 | JavaScript | MVC | EJS | MySQL | REST APIs | Redis |
| 15 | JavaScript | MVC | EJS | MySQL | Kafka | None |
| 16 | JavaScript | MVC | EJS | MySQL | Kafka | Redis |
| 17 | JavaScript | MVC | EJS | PostgreSQL | REST APIs | None |
| 18 | JavaScript | MVC | EJS | PostgreSQL | REST APIs | Redis |
| 19 | JavaScript | MVC | EJS | PostgreSQL | Kafka | None |
| 20 | JavaScript | MVC | EJS | PostgreSQL | Kafka | Redis |
| 21 | JavaScript | MVC | EJS | MongoDB | REST APIs | None |
| 22 | JavaScript | MVC | EJS | MongoDB | REST APIs | Redis |
| 23 | JavaScript | MVC | EJS | MongoDB | Kafka | None |
| 24 | JavaScript | MVC | EJS | MongoDB | Kafka | Redis |
| 25 | JavaScript | MVC | Pug | MySQL | REST APIs | None |
| 26 | JavaScript | MVC | Pug | MySQL | REST APIs | Redis |
| 27 | JavaScript | MVC | Pug | MySQL | Kafka | None |
| 28 | JavaScript | MVC | Pug | MySQL | Kafka | Redis |
| 29 | JavaScript | MVC | Pug | PostgreSQL | REST APIs | None |
| 30 | JavaScript | MVC | Pug | PostgreSQL | REST APIs | Redis |
| 31 | JavaScript | MVC | Pug | PostgreSQL | Kafka | None |
| 32 | JavaScript | MVC | Pug | PostgreSQL | Kafka | Redis |
| 33 | JavaScript | MVC | Pug | MongoDB | REST APIs | None |
| 34 | JavaScript | MVC | Pug | MongoDB | REST APIs | Redis |
| 35 | JavaScript | MVC | Pug | MongoDB | Kafka | None |
| 36 | JavaScript | MVC | Pug | MongoDB | Kafka | Redis |
| 37 | TypeScript | MVC | None | MySQL | REST APIs | None |
| 38 | TypeScript | MVC | None | MySQL | REST APIs | Redis |
| 39 | TypeScript | MVC | None | MySQL | Kafka | None |
| 40 | TypeScript | MVC | None | MySQL | Kafka | Redis |
| 41 | TypeScript | MVC | None | PostgreSQL | REST APIs | None |
| 42 | TypeScript | MVC | None | PostgreSQL | REST APIs | Redis |
| 43 | TypeScript | MVC | None | PostgreSQL | Kafka | None |
| 44 | TypeScript | MVC | None | PostgreSQL | Kafka | Redis |
| 45 | TypeScript | MVC | None | MongoDB | REST APIs | None |
| 46 | TypeScript | MVC | None | MongoDB | REST APIs | Redis |
| 47 | TypeScript | MVC | None | MongoDB | Kafka | None |
| 48 | TypeScript | MVC | None | MongoDB | Kafka | Redis |
| 49 | TypeScript | MVC | EJS | MySQL | REST APIs | None |
| 50 | TypeScript | MVC | EJS | MySQL | REST APIs | Redis |
| 51 | TypeScript | MVC | EJS | MySQL | Kafka | None |
| 52 | TypeScript | MVC | EJS | MySQL | Kafka | Redis |
| 53 | TypeScript | MVC | EJS | PostgreSQL | REST APIs | None |
| 54 | TypeScript | MVC | EJS | PostgreSQL | REST APIs | Redis |
| 55 | TypeScript | MVC | EJS | PostgreSQL | Kafka | None |
| 56 | TypeScript | MVC | EJS | PostgreSQL | Kafka | Redis |
| 57 | TypeScript | MVC | EJS | MongoDB | REST APIs | None |
| 58 | TypeScript | MVC | EJS | MongoDB | REST APIs | Redis |
| 59 | TypeScript | MVC | EJS | MongoDB | Kafka | None |
| 60 | TypeScript | MVC | EJS | MongoDB | Kafka | Redis |
| 61 | TypeScript | MVC | Pug | MySQL | REST APIs | None |
| 62 | TypeScript | MVC | Pug | MySQL | REST APIs | Redis |
| 63 | TypeScript | MVC | Pug | MySQL | Kafka | None |
| 64 | TypeScript | MVC | Pug | MySQL | Kafka | Redis |
| 65 | TypeScript | MVC | Pug | PostgreSQL | REST APIs | None |
| 66 | TypeScript | MVC | Pug | PostgreSQL | REST APIs | Redis |
| 67 | TypeScript | MVC | Pug | PostgreSQL | Kafka | None |
| 68 | TypeScript | MVC | Pug | PostgreSQL | Kafka | Redis |
| 69 | TypeScript | MVC | Pug | MongoDB | REST APIs | None |
| 70 | TypeScript | MVC | Pug | MongoDB | REST APIs | Redis |
| 71 | TypeScript | MVC | Pug | MongoDB | Kafka | None |
| 72 | TypeScript | MVC | Pug | MongoDB | Kafka | Redis |
| 73 | JavaScript | MVC | None | None | REST APIs | None |
| 74 | JavaScript | MVC | None | None | Kafka | None |
| 75 | JavaScript | MVC | EJS | None | REST APIs | None |
| 76 | JavaScript | MVC | EJS | None | Kafka | None |
| 77 | JavaScript | MVC | Pug | None | REST APIs | None |
| 78 | JavaScript | MVC | Pug | None | Kafka | None |
| 79 | TypeScript | MVC | None | None | REST APIs | None |
| 80 | TypeScript | MVC | None | None | Kafka | None |
| 81 | TypeScript | MVC | EJS | None | REST APIs | None |
| 82 | TypeScript | MVC | EJS | None | Kafka | None |
| 83 | TypeScript | MVC | Pug | None | REST APIs | None |
| 84 | TypeScript | MVC | Pug | None | Kafka | None |

## 2. Clean Architecture (16 Cases)
*Note: Clean Architecture does not use server-side view engines (EJS/Pug).*

| # | Language | Architecture | View Engine | Database | Communication | Caching |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 85 | JavaScript | Clean Architecture | N/A | MySQL | REST APIs | None |
| 86 | JavaScript | Clean Architecture | N/A | MySQL | REST APIs | Redis |
| 87 | JavaScript | Clean Architecture | N/A | MySQL | Kafka | None |
| 88 | JavaScript | Clean Architecture | N/A | MySQL | Kafka | Redis |
| 89 | JavaScript | Clean Architecture | N/A | PostgreSQL | REST APIs | None |
| 90 | JavaScript | Clean Architecture | N/A | PostgreSQL | REST APIs | Redis |
| 91 | JavaScript | Clean Architecture | N/A | PostgreSQL | Kafka | None |
| 92 | JavaScript | Clean Architecture | N/A | PostgreSQL | Kafka | Redis |
| 93 | JavaScript | Clean Architecture | N/A | MongoDB | REST APIs | None |
| 94 | JavaScript | Clean Architecture | N/A | MongoDB | REST APIs | Redis |
| 95 | JavaScript | Clean Architecture | N/A | MongoDB | Kafka | None |
| 96 | JavaScript | Clean Architecture | N/A | MongoDB | Kafka | Redis |
| 97 | TypeScript | Clean Architecture | N/A | MySQL | REST APIs | None |
| 98 | TypeScript | Clean Architecture | N/A | MySQL | REST APIs | Redis |
| 99 | TypeScript | Clean Architecture | N/A | MySQL | Kafka | None |
| 100 | TypeScript | Clean Architecture | N/A | MySQL | Kafka | Redis |
| 101 | TypeScript | Clean Architecture | N/A | PostgreSQL | REST APIs | None |
| 102 | TypeScript | Clean Architecture | N/A | PostgreSQL | REST APIs | Redis |
| 103 | TypeScript | Clean Architecture | N/A | PostgreSQL | Kafka | None |
| 104 | TypeScript | Clean Architecture | N/A | PostgreSQL | Kafka | Redis |
| 105 | TypeScript | Clean Architecture | N/A | MongoDB | REST APIs | None |
| 106 | TypeScript | Clean Architecture | N/A | MongoDB | REST APIs | Redis |
| 107 | TypeScript | Clean Architecture | N/A | MongoDB | Kafka | None |
| 108 | TypeScript | Clean Architecture | N/A | MongoDB | Kafka | Redis |
| 109 | JavaScript | Clean Architecture | N/A | None | REST APIs | None |
| 110 | JavaScript | Clean Architecture | N/A | None | Kafka | None |
| 111 | TypeScript | Clean Architecture | N/A | None | REST APIs | None |
| 112 | TypeScript | Clean Architecture | N/A | None | Kafka | None |
