# NodeJS Quickstart Generator - Test Cases

This document lists the **160 possible project combinations** supported by the `nodejs-quickstart` CLI. These combinations cover all supported languages, architectures, databases, communication patterns, and caching options.

## Summary
- **CI Providers**: `None`, `GitHub Actions`, `Jenkins`, `GitLab CI`
- **MVC Architecture**: 120 Combinations
- **Clean Architecture**: 40 Combinations

**Total Core Combinations: 160**

> **Note on CI/CD**: Each combination can be generated with or without CI/CD (`--ci-provider`), effectively doubling the state space.

---

## 1. MVC Architecture (120 Cases)

| # | Language | Architecture | View Engine | Database | Communication | Caching |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | TypeScript | MVC | EJS | None | REST APIs | None |
| 2 | TypeScript | MVC | EJS | None | Kafka | None |
| 3 | TypeScript | MVC | EJS | MySQL | REST APIs | None |
| 4 | TypeScript | MVC | EJS | MySQL | REST APIs | Redis |
| 5 | TypeScript | MVC | EJS | MySQL | REST APIs | Memory Cache |
| 6 | TypeScript | MVC | EJS | MySQL | Kafka | None |
| 7 | TypeScript | MVC | EJS | MySQL | Kafka | Redis |
| 8 | TypeScript | MVC | EJS | MySQL | Kafka | Memory Cache |
| 9 | TypeScript | MVC | EJS | PostgreSQL | REST APIs | None |
| 10 | TypeScript | MVC | EJS | PostgreSQL | REST APIs | Redis |
| 11 | TypeScript | MVC | EJS | PostgreSQL | REST APIs | Memory Cache |
| 12 | TypeScript | MVC | EJS | PostgreSQL | Kafka | None |
| 13 | TypeScript | MVC | EJS | PostgreSQL | Kafka | Redis |
| 14 | TypeScript | MVC | EJS | PostgreSQL | Kafka | Memory Cache |
| 15 | TypeScript | MVC | EJS | MongoDB | REST APIs | None |
| 16 | TypeScript | MVC | EJS | MongoDB | REST APIs | Redis |
| 17 | TypeScript | MVC | EJS | MongoDB | REST APIs | Memory Cache |
| 18 | TypeScript | MVC | EJS | MongoDB | Kafka | None |
| 19 | TypeScript | MVC | EJS | MongoDB | Kafka | Redis |
| 20 | TypeScript | MVC | EJS | MongoDB | Kafka | Memory Cache |
| 21 | TypeScript | MVC | Pug | None | REST APIs | None |
| 22 | TypeScript | MVC | Pug | None | Kafka | None |
| 23 | TypeScript | MVC | Pug | MySQL | REST APIs | None |
| 24 | TypeScript | MVC | Pug | MySQL | REST APIs | Redis |
| 25 | TypeScript | MVC | Pug | MySQL | REST APIs | Memory Cache |
| 26 | TypeScript | MVC | Pug | MySQL | Kafka | None |
| 27 | TypeScript | MVC | Pug | MySQL | Kafka | Redis |
| 28 | TypeScript | MVC | Pug | MySQL | Kafka | Memory Cache |
| 29 | TypeScript | MVC | Pug | PostgreSQL | REST APIs | None |
| 30 | TypeScript | MVC | Pug | PostgreSQL | REST APIs | Redis |
| 31 | TypeScript | MVC | Pug | PostgreSQL | REST APIs | Memory Cache |
| 32 | TypeScript | MVC | Pug | PostgreSQL | Kafka | None |
| 33 | TypeScript | MVC | Pug | PostgreSQL | Kafka | Redis |
| 34 | TypeScript | MVC | Pug | PostgreSQL | Kafka | Memory Cache |
| 35 | TypeScript | MVC | Pug | MongoDB | REST APIs | None |
| 36 | TypeScript | MVC | Pug | MongoDB | REST APIs | Redis |
| 37 | TypeScript | MVC | Pug | MongoDB | REST APIs | Memory Cache |
| 38 | TypeScript | MVC | Pug | MongoDB | Kafka | None |
| 39 | TypeScript | MVC | Pug | MongoDB | Kafka | Redis |
| 40 | TypeScript | MVC | Pug | MongoDB | Kafka | Memory Cache |
| 41 | TypeScript | MVC | None | None | REST APIs | None |
| 42 | TypeScript | MVC | None | None | Kafka | None |
| 43 | TypeScript | MVC | None | MySQL | REST APIs | None |
| 44 | TypeScript | MVC | None | MySQL | REST APIs | Redis |
| 45 | TypeScript | MVC | None | MySQL | REST APIs | Memory Cache |
| 46 | TypeScript | MVC | None | MySQL | Kafka | None |
| 47 | TypeScript | MVC | None | MySQL | Kafka | Redis |
| 48 | TypeScript | MVC | None | MySQL | Kafka | Memory Cache |
| 49 | TypeScript | MVC | None | PostgreSQL | REST APIs | None |
| 50 | TypeScript | MVC | None | PostgreSQL | REST APIs | Redis |
| 51 | TypeScript | MVC | None | PostgreSQL | REST APIs | Memory Cache |
| 52 | TypeScript | MVC | None | PostgreSQL | Kafka | None |
| 53 | TypeScript | MVC | None | PostgreSQL | Kafka | Redis |
| 54 | TypeScript | MVC | None | PostgreSQL | Kafka | Memory Cache |
| 55 | TypeScript | MVC | None | MongoDB | REST APIs | None |
| 56 | TypeScript | MVC | None | MongoDB | REST APIs | Redis |
| 57 | TypeScript | MVC | None | MongoDB | REST APIs | Memory Cache |
| 58 | TypeScript | MVC | None | MongoDB | Kafka | None |
| 59 | TypeScript | MVC | None | MongoDB | Kafka | Redis |
| 60 | TypeScript | MVC | None | MongoDB | Kafka | Memory Cache |
| 61 | JavaScript | MVC | EJS | None | REST APIs | None |
| 62 | JavaScript | MVC | EJS | None | Kafka | None |
| 63 | JavaScript | MVC | EJS | MySQL | REST APIs | None |
| 64 | JavaScript | MVC | EJS | MySQL | REST APIs | Redis |
| 65 | JavaScript | MVC | EJS | MySQL | REST APIs | Memory Cache |
| 66 | JavaScript | MVC | EJS | MySQL | Kafka | None |
| 67 | JavaScript | MVC | EJS | MySQL | Kafka | Redis |
| 68 | JavaScript | MVC | EJS | MySQL | Kafka | Memory Cache |
| 69 | JavaScript | MVC | EJS | PostgreSQL | REST APIs | None |
| 70 | JavaScript | MVC | EJS | PostgreSQL | REST APIs | Redis |
| 71 | JavaScript | MVC | EJS | PostgreSQL | REST APIs | Memory Cache |
| 72 | JavaScript | MVC | EJS | PostgreSQL | Kafka | None |
| 73 | JavaScript | MVC | EJS | PostgreSQL | Kafka | Redis |
| 74 | JavaScript | MVC | EJS | PostgreSQL | Kafka | Memory Cache |
| 75 | JavaScript | MVC | EJS | MongoDB | REST APIs | None |
| 76 | JavaScript | MVC | EJS | MongoDB | REST APIs | Redis |
| 77 | JavaScript | MVC | EJS | MongoDB | REST APIs | Memory Cache |
| 78 | JavaScript | MVC | EJS | MongoDB | Kafka | None |
| 79 | JavaScript | MVC | EJS | MongoDB | Kafka | Redis |
| 80 | JavaScript | MVC | EJS | MongoDB | Kafka | Memory Cache |
| 81 | JavaScript | MVC | Pug | None | REST APIs | None |
| 82 | JavaScript | MVC | Pug | None | Kafka | None |
| 83 | JavaScript | MVC | Pug | MySQL | REST APIs | None |
| 84 | JavaScript | MVC | Pug | MySQL | REST APIs | Redis |
| 85 | JavaScript | MVC | Pug | MySQL | REST APIs | Memory Cache |
| 86 | JavaScript | MVC | Pug | MySQL | Kafka | None |
| 87 | JavaScript | MVC | Pug | MySQL | Kafka | Redis |
| 88 | JavaScript | MVC | Pug | MySQL | Kafka | Memory Cache |
| 89 | JavaScript | MVC | Pug | PostgreSQL | REST APIs | None |
| 90 | JavaScript | MVC | Pug | PostgreSQL | REST APIs | Redis |
| 91 | JavaScript | MVC | Pug | PostgreSQL | REST APIs | Memory Cache |
| 92 | JavaScript | MVC | Pug | PostgreSQL | Kafka | None |
| 93 | JavaScript | MVC | Pug | PostgreSQL | Kafka | Redis |
| 94 | JavaScript | MVC | Pug | PostgreSQL | Kafka | Memory Cache |
| 95 | JavaScript | MVC | Pug | MongoDB | REST APIs | None |
| 96 | JavaScript | MVC | Pug | MongoDB | REST APIs | Redis |
| 97 | JavaScript | MVC | Pug | MongoDB | REST APIs | Memory Cache |
| 98 | JavaScript | MVC | Pug | MongoDB | Kafka | None |
| 99 | JavaScript | MVC | Pug | MongoDB | Kafka | Redis |
| 100 | JavaScript | MVC | Pug | MongoDB | Kafka | Memory Cache |
| 101 | JavaScript | MVC | None | None | REST APIs | None |
| 102 | JavaScript | MVC | None | None | Kafka | None |
| 103 | JavaScript | MVC | None | MySQL | REST APIs | None |
| 104 | JavaScript | MVC | None | MySQL | REST APIs | Redis |
| 105 | JavaScript | MVC | None | MySQL | REST APIs | Memory Cache |
| 106 | JavaScript | MVC | None | MySQL | Kafka | None |
| 107 | JavaScript | MVC | None | MySQL | Kafka | Redis |
| 108 | JavaScript | MVC | None | MySQL | Kafka | Memory Cache |
| 109 | JavaScript | MVC | None | PostgreSQL | REST APIs | None |
| 110 | JavaScript | MVC | None | PostgreSQL | REST APIs | Redis |
| 111 | JavaScript | MVC | None | PostgreSQL | REST APIs | Memory Cache |
| 112 | JavaScript | MVC | None | PostgreSQL | Kafka | None |
| 113 | JavaScript | MVC | None | PostgreSQL | Kafka | Redis |
| 114 | JavaScript | MVC | None | PostgreSQL | Kafka | Memory Cache |
| 115 | JavaScript | MVC | None | MongoDB | REST APIs | None |
| 116 | JavaScript | MVC | None | MongoDB | REST APIs | Redis |
| 117 | JavaScript | MVC | None | MongoDB | REST APIs | Memory Cache |
| 118 | JavaScript | MVC | None | MongoDB | Kafka | None |
| 119 | JavaScript | MVC | None | MongoDB | Kafka | Redis |
| 120 | JavaScript | MVC | None | MongoDB | Kafka | Memory Cache |

## 2. Clean Architecture (40 Cases)
*Note: Clean Architecture does not use server-side view engines (EJS/Pug).*

| # | Language | Architecture | View Engine | Database | Communication | Caching |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 121 | TypeScript | Clean Architecture | N/A | None | REST APIs | None |
| 122 | TypeScript | Clean Architecture | N/A | None | Kafka | None |
| 123 | TypeScript | Clean Architecture | N/A | MySQL | REST APIs | None |
| 124 | TypeScript | Clean Architecture | N/A | MySQL | REST APIs | Redis |
| 125 | TypeScript | Clean Architecture | N/A | MySQL | REST APIs | Memory Cache |
| 126 | TypeScript | Clean Architecture | N/A | MySQL | Kafka | None |
| 127 | TypeScript | Clean Architecture | N/A | MySQL | Kafka | Redis |
| 128 | TypeScript | Clean Architecture | N/A | MySQL | Kafka | Memory Cache |
| 129 | TypeScript | Clean Architecture | N/A | PostgreSQL | REST APIs | None |
| 130 | TypeScript | Clean Architecture | N/A | PostgreSQL | REST APIs | Redis |
| 131 | TypeScript | Clean Architecture | N/A | PostgreSQL | REST APIs | Memory Cache |
| 132 | TypeScript | Clean Architecture | N/A | PostgreSQL | Kafka | None |
| 133 | TypeScript | Clean Architecture | N/A | PostgreSQL | Kafka | Redis |
| 134 | TypeScript | Clean Architecture | N/A | PostgreSQL | Kafka | Memory Cache |
| 135 | TypeScript | Clean Architecture | N/A | MongoDB | REST APIs | None |
| 136 | TypeScript | Clean Architecture | N/A | MongoDB | REST APIs | Redis |
| 137 | TypeScript | Clean Architecture | N/A | MongoDB | REST APIs | Memory Cache |
| 138 | TypeScript | Clean Architecture | N/A | MongoDB | Kafka | None |
| 139 | TypeScript | Clean Architecture | N/A | MongoDB | Kafka | Redis |
| 140 | TypeScript | Clean Architecture | N/A | MongoDB | Kafka | Memory Cache |
| 141 | JavaScript | Clean Architecture | N/A | None | REST APIs | None |
| 142 | JavaScript | Clean Architecture | N/A | None | Kafka | None |
| 143 | JavaScript | Clean Architecture | N/A | MySQL | REST APIs | None |
| 144 | JavaScript | Clean Architecture | N/A | MySQL | REST APIs | Redis |
| 145 | JavaScript | Clean Architecture | N/A | MySQL | REST APIs | Memory Cache |
| 146 | JavaScript | Clean Architecture | N/A | MySQL | Kafka | None |
| 147 | JavaScript | Clean Architecture | N/A | MySQL | Kafka | Redis |
| 148 | JavaScript | Clean Architecture | N/A | MySQL | Kafka | Memory Cache |
| 149 | JavaScript | Clean Architecture | N/A | PostgreSQL | REST APIs | None |
| 150 | JavaScript | Clean Architecture | N/A | PostgreSQL | REST APIs | Redis |
| 151 | JavaScript | Clean Architecture | N/A | PostgreSQL | REST APIs | Memory Cache |
| 152 | JavaScript | Clean Architecture | N/A | PostgreSQL | Kafka | None |
| 153 | JavaScript | Clean Architecture | N/A | PostgreSQL | Kafka | Redis |
| 154 | JavaScript | Clean Architecture | N/A | PostgreSQL | Kafka | Memory Cache |
| 155 | JavaScript | Clean Architecture | N/A | MongoDB | REST APIs | None |
| 156 | JavaScript | Clean Architecture | N/A | MongoDB | REST APIs | Redis |
| 157 | JavaScript | Clean Architecture | N/A | MongoDB | REST APIs | Memory Cache |
| 158 | JavaScript | Clean Architecture | N/A | MongoDB | Kafka | None |
| 159 | JavaScript | Clean Architecture | N/A | MongoDB | Kafka | Redis |
| 160 | JavaScript | Clean Architecture | N/A | MongoDB | Kafka | Memory Cache |
