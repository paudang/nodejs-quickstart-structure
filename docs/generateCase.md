# NodeJS Quickstart Generator - Test Cases

This document lists the **160 possible project combinations** supported by the `nodejs-quickstart` CLI. These combinations cover all supported languages, architectures, databases, communication patterns, and caching options.

## Summary
- **CI Providers**: `None`, `GitHub Actions`, `Jenkins`, `GitLab CI`
- **MVC Architecture**: 120 Combinations
  - **With Database (108)**: 2 Lang × 3 View × 3 DB × 2 Comm = 36 * 3 (Caching: None/Redis/Memory Cache) = 108
  - **No Database (12)**: 2 Lang × 3 View × 1 DB × 2 Comm = 12 * 1 (Caching: None) = 12
- **Clean Architecture**: 40 Combinations
  - **With Database (36)**: 2 Lang × 1 View (None) × 3 DB × 2 Comm = 12 * 3 (Caching: None/Redis/Memory Cache) = 36
  - **No Database (4)**: 2 Lang × 1 View (None) × 1 DB × 2 Comm = 4 * 1 (Caching: None) = 4

**Total Core Combinations: 160**

> **Note on CI/CD**: Each combination can be generated with or without CI/CD (`--ci-provider`), effectively doubling the state space.

---

## 1. MVC Architecture (120 Cases)

| # | Language | Architecture | View Engine | Database | Communication | Caching |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | JavaScript | MVC | None | MySQL | REST APIs | None |
| 2 | JavaScript | MVC | None | MySQL | REST APIs | Redis |
| 3 | JavaScript | MVC | None | MySQL | REST APIs | Memory Cache |
| 4 | JavaScript | MVC | None | MySQL | Kafka | None |
| 5 | JavaScript | MVC | None | MySQL | Kafka | Redis |
| 6 | JavaScript | MVC | None | MySQL | Kafka | Memory Cache |
| 7 | JavaScript | MVC | None | PostgreSQL | REST APIs | None |
| 8 | JavaScript | MVC | None | PostgreSQL | REST APIs | Redis |
| 9 | JavaScript | MVC | None | PostgreSQL | REST APIs | Memory Cache |
| 10 | JavaScript | MVC | None | PostgreSQL | Kafka | None |
| 11 | JavaScript | MVC | None | PostgreSQL | Kafka | Redis |
| 12 | JavaScript | MVC | None | PostgreSQL | Kafka | Memory Cache |
| 13 | JavaScript | MVC | None | MongoDB | REST APIs | None |
| 14 | JavaScript | MVC | None | MongoDB | REST APIs | Redis |
| 15 | JavaScript | MVC | None | MongoDB | REST APIs | Memory Cache |
| 16 | JavaScript | MVC | None | MongoDB | Kafka | None |
| 17 | JavaScript | MVC | None | MongoDB | Kafka | Redis |
| 18 | JavaScript | MVC | None | MongoDB | Kafka | Memory Cache |
| 19 | JavaScript | MVC | None | None | REST APIs | None |
| 20 | JavaScript | MVC | None | None | Kafka | None |
| 21 | JavaScript | MVC | EJS | MySQL | REST APIs | None |
| 22 | JavaScript | MVC | EJS | MySQL | REST APIs | Redis |
| 23 | JavaScript | MVC | EJS | MySQL | REST APIs | Memory Cache |
| 24 | JavaScript | MVC | EJS | MySQL | Kafka | None |
| 25 | JavaScript | MVC | EJS | MySQL | Kafka | Redis |
| 26 | JavaScript | MVC | EJS | MySQL | Kafka | Memory Cache |
| 27 | JavaScript | MVC | EJS | PostgreSQL | REST APIs | None |
| 28 | JavaScript | MVC | EJS | PostgreSQL | REST APIs | Redis |
| 29 | JavaScript | MVC | EJS | PostgreSQL | REST APIs | Memory Cache |
| 30 | JavaScript | MVC | EJS | PostgreSQL | Kafka | None |
| 31 | JavaScript | MVC | EJS | PostgreSQL | Kafka | Redis |
| 32 | JavaScript | MVC | EJS | PostgreSQL | Kafka | Memory Cache |
| 33 | JavaScript | MVC | EJS | MongoDB | REST APIs | None |
| 34 | JavaScript | MVC | EJS | MongoDB | REST APIs | Redis |
| 35 | JavaScript | MVC | EJS | MongoDB | REST APIs | Memory Cache |
| 36 | JavaScript | MVC | EJS | MongoDB | Kafka | None |
| 37 | JavaScript | MVC | EJS | MongoDB | Kafka | Redis |
| 38 | JavaScript | MVC | EJS | MongoDB | Kafka | Memory Cache |
| 39 | JavaScript | MVC | EJS | None | REST APIs | None |
| 40 | JavaScript | MVC | EJS | None | Kafka | None |
| 41 | JavaScript | MVC | Pug | MySQL | REST APIs | None |
| 42 | JavaScript | MVC | Pug | MySQL | REST APIs | Redis |
| 43 | JavaScript | MVC | Pug | MySQL | REST APIs | Memory Cache |
| 44 | JavaScript | MVC | Pug | MySQL | Kafka | None |
| 45 | JavaScript | MVC | Pug | MySQL | Kafka | Redis |
| 46 | JavaScript | MVC | Pug | MySQL | Kafka | Memory Cache |
| 47 | JavaScript | MVC | Pug | PostgreSQL | REST APIs | None |
| 48 | JavaScript | MVC | Pug | PostgreSQL | REST APIs | Redis |
| 49 | JavaScript | MVC | Pug | PostgreSQL | REST APIs | Memory Cache |
| 50 | JavaScript | MVC | Pug | PostgreSQL | Kafka | None |
| 51 | JavaScript | MVC | Pug | PostgreSQL | Kafka | Redis |
| 52 | JavaScript | MVC | Pug | PostgreSQL | Kafka | Memory Cache |
| 53 | JavaScript | MVC | Pug | MongoDB | REST APIs | None |
| 54 | JavaScript | MVC | Pug | MongoDB | REST APIs | Redis |
| 55 | JavaScript | MVC | Pug | MongoDB | REST APIs | Memory Cache |
| 56 | JavaScript | MVC | Pug | MongoDB | Kafka | None |
| 57 | JavaScript | MVC | Pug | MongoDB | Kafka | Redis |
| 58 | JavaScript | MVC | Pug | MongoDB | Kafka | Memory Cache |
| 59 | JavaScript | MVC | Pug | None | REST APIs | None |
| 60 | JavaScript | MVC | Pug | None | Kafka | None |
| 61 | TypeScript | MVC | None | MySQL | REST APIs | None |
| 62 | TypeScript | MVC | None | MySQL | REST APIs | Redis |
| 63 | TypeScript | MVC | None | MySQL | REST APIs | Memory Cache |
| 64 | TypeScript | MVC | None | MySQL | Kafka | None |
| 65 | TypeScript | MVC | None | MySQL | Kafka | Redis |
| 66 | TypeScript | MVC | None | MySQL | Kafka | Memory Cache |
| 67 | TypeScript | MVC | None | PostgreSQL | REST APIs | None |
| 68 | TypeScript | MVC | None | PostgreSQL | REST APIs | Redis |
| 69 | TypeScript | MVC | None | PostgreSQL | REST APIs | Memory Cache |
| 70 | TypeScript | MVC | None | PostgreSQL | Kafka | None |
| 71 | TypeScript | MVC | None | PostgreSQL | Kafka | Redis |
| 72 | TypeScript | MVC | None | PostgreSQL | Kafka | Memory Cache |
| 73 | TypeScript | MVC | None | MongoDB | REST APIs | None |
| 74 | TypeScript | MVC | None | MongoDB | REST APIs | Redis |
| 75 | TypeScript | MVC | None | MongoDB | REST APIs | Memory Cache |
| 76 | TypeScript | MVC | None | MongoDB | Kafka | None |
| 77 | TypeScript | MVC | None | MongoDB | Kafka | Redis |
| 78 | TypeScript | MVC | None | MongoDB | Kafka | Memory Cache |
| 79 | TypeScript | MVC | None | None | REST APIs | None |
| 80 | TypeScript | MVC | None | None | Kafka | None |
| 81 | TypeScript | MVC | EJS | MySQL | REST APIs | None |
| 82 | TypeScript | MVC | EJS | MySQL | REST APIs | Redis |
| 83 | TypeScript | MVC | EJS | MySQL | REST APIs | Memory Cache |
| 84 | TypeScript | MVC | EJS | MySQL | Kafka | None |
| 85 | TypeScript | MVC | EJS | MySQL | Kafka | Redis |
| 86 | TypeScript | MVC | EJS | MySQL | Kafka | Memory Cache |
| 87 | TypeScript | MVC | EJS | PostgreSQL | REST APIs | None |
| 88 | TypeScript | MVC | EJS | PostgreSQL | REST APIs | Redis |
| 89 | TypeScript | MVC | EJS | PostgreSQL | REST APIs | Memory Cache |
| 90 | TypeScript | MVC | EJS | PostgreSQL | Kafka | None |
| 91 | TypeScript | MVC | EJS | PostgreSQL | Kafka | Redis |
| 92 | TypeScript | MVC | EJS | PostgreSQL | Kafka | Memory Cache |
| 93 | TypeScript | MVC | EJS | MongoDB | REST APIs | None |
| 94 | TypeScript | MVC | EJS | MongoDB | REST APIs | Redis |
| 95 | TypeScript | MVC | EJS | MongoDB | REST APIs | Memory Cache |
| 96 | TypeScript | MVC | EJS | MongoDB | Kafka | None |
| 97 | TypeScript | MVC | EJS | MongoDB | Kafka | Redis |
| 98 | TypeScript | MVC | EJS | MongoDB | Kafka | Memory Cache |
| 99 | TypeScript | MVC | EJS | None | REST APIs | None |
| 100 | TypeScript | MVC | EJS | None | Kafka | None |
| 101 | TypeScript | MVC | Pug | MySQL | REST APIs | None |
| 102 | TypeScript | MVC | Pug | MySQL | REST APIs | Redis |
| 103 | TypeScript | MVC | Pug | MySQL | REST APIs | Memory Cache |
| 104 | TypeScript | MVC | Pug | MySQL | Kafka | None |
| 105 | TypeScript | MVC | Pug | MySQL | Kafka | Redis |
| 106 | TypeScript | MVC | Pug | MySQL | Kafka | Memory Cache |
| 107 | TypeScript | MVC | Pug | PostgreSQL | REST APIs | None |
| 108 | TypeScript | MVC | Pug | PostgreSQL | REST APIs | Redis |
| 109 | TypeScript | MVC | Pug | PostgreSQL | REST APIs | Memory Cache |
| 110 | TypeScript | MVC | Pug | PostgreSQL | Kafka | None |
| 111 | TypeScript | MVC | Pug | PostgreSQL | Kafka | Redis |
| 112 | TypeScript | MVC | Pug | PostgreSQL | Kafka | Memory Cache |
| 113 | TypeScript | MVC | Pug | MongoDB | REST APIs | None |
| 114 | TypeScript | MVC | Pug | MongoDB | REST APIs | Redis |
| 115 | TypeScript | MVC | Pug | MongoDB | REST APIs | Memory Cache |
| 116 | TypeScript | MVC | Pug | MongoDB | Kafka | None |
| 117 | TypeScript | MVC | Pug | MongoDB | Kafka | Redis |
| 118 | TypeScript | MVC | Pug | MongoDB | Kafka | Memory Cache |
| 119 | TypeScript | MVC | Pug | None | REST APIs | None |
| 120 | TypeScript | MVC | Pug | None | Kafka | None |

## 2. Clean Architecture (40 Cases)
*Note: Clean Architecture does not use server-side view engines (EJS/Pug).*

| # | Language | Architecture | View Engine | Database | Communication | Caching |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 121 | JavaScript | Clean Architecture | N/A | MySQL | REST APIs | None |
| 122 | JavaScript | Clean Architecture | N/A | MySQL | REST APIs | Redis |
| 123 | JavaScript | Clean Architecture | N/A | MySQL | REST APIs | Memory Cache |
| 124 | JavaScript | Clean Architecture | N/A | MySQL | Kafka | None |
| 125 | JavaScript | Clean Architecture | N/A | MySQL | Kafka | Redis |
| 126 | JavaScript | Clean Architecture | N/A | MySQL | Kafka | Memory Cache |
| 127 | JavaScript | Clean Architecture | N/A | PostgreSQL | REST APIs | None |
| 128 | JavaScript | Clean Architecture | N/A | PostgreSQL | REST APIs | Redis |
| 129 | JavaScript | Clean Architecture | N/A | PostgreSQL | REST APIs | Memory Cache |
| 130 | JavaScript | Clean Architecture | N/A | PostgreSQL | Kafka | None |
| 131 | JavaScript | Clean Architecture | N/A | PostgreSQL | Kafka | Redis |
| 132 | JavaScript | Clean Architecture | N/A | PostgreSQL | Kafka | Memory Cache |
| 133 | JavaScript | Clean Architecture | N/A | MongoDB | REST APIs | None |
| 134 | JavaScript | Clean Architecture | N/A | MongoDB | REST APIs | Redis |
| 135 | JavaScript | Clean Architecture | N/A | MongoDB | REST APIs | Memory Cache |
| 136 | JavaScript | Clean Architecture | N/A | MongoDB | Kafka | None |
| 137 | JavaScript | Clean Architecture | N/A | MongoDB | Kafka | Redis |
| 138 | JavaScript | Clean Architecture | N/A | MongoDB | Kafka | Memory Cache |
| 139 | JavaScript | Clean Architecture | N/A | None | REST APIs | None |
| 140 | JavaScript | Clean Architecture | N/A | None | Kafka | None |
| 141 | TypeScript | Clean Architecture | N/A | MySQL | REST APIs | None |
| 142 | TypeScript | Clean Architecture | N/A | MySQL | REST APIs | Redis |
| 143 | TypeScript | Clean Architecture | N/A | MySQL | REST APIs | Memory Cache |
| 144 | TypeScript | Clean Architecture | N/A | MySQL | Kafka | None |
| 145 | TypeScript | Clean Architecture | N/A | MySQL | Kafka | Redis |
| 146 | TypeScript | Clean Architecture | N/A | MySQL | Kafka | Memory Cache |
| 147 | TypeScript | Clean Architecture | N/A | PostgreSQL | REST APIs | None |
| 148 | TypeScript | Clean Architecture | N/A | PostgreSQL | REST APIs | Redis |
| 149 | TypeScript | Clean Architecture | N/A | PostgreSQL | REST APIs | Memory Cache |
| 150 | TypeScript | Clean Architecture | N/A | PostgreSQL | Kafka | None |
| 151 | TypeScript | Clean Architecture | N/A | PostgreSQL | Kafka | Redis |
| 152 | TypeScript | Clean Architecture | N/A | PostgreSQL | Kafka | Memory Cache |
| 153 | TypeScript | Clean Architecture | N/A | MongoDB | REST APIs | None |
| 154 | TypeScript | Clean Architecture | N/A | MongoDB | REST APIs | Redis |
| 155 | TypeScript | Clean Architecture | N/A | MongoDB | REST APIs | Memory Cache |
| 156 | TypeScript | Clean Architecture | N/A | MongoDB | Kafka | None |
| 157 | TypeScript | Clean Architecture | N/A | MongoDB | Kafka | Redis |
| 158 | TypeScript | Clean Architecture | N/A | MongoDB | Kafka | Memory Cache |
| 159 | TypeScript | Clean Architecture | N/A | None | REST APIs | None |
| 160 | TypeScript | Clean Architecture | N/A | None | Kafka | None |
