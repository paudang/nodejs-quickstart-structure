# NodeJS Quickstart Generator - Test Cases

This document lists the **240 possible project combinations** supported by the `nodejs-quickstart` CLI. These combinations cover all supported languages, architectures, databases, communication patterns, and caching options.

## Summary
- **CI Providers**: `None`, `GitHub Actions`, `Jenkins`, `GitLab CI`
- **MVC Architecture**: 180 Combinations
  - **With Database (108)**: 2 Lang × 3 View × 3 DB × 2 Comm = 36 * 3 (Caching: None/Redis/Memory Cache) = 108
  - **No Database (12)**: 2 Lang × 3 View × 1 DB × 2 Comm = 12 * 1 (Caching: None) = 12
- **Clean Architecture**: 60 Combinations
  - **With Database (36)**: 2 Lang × 1 View (None) × 3 DB × 2 Comm = 12 * 3 (Caching: None/Redis/Memory Cache) = 36
  - **No Database (4)**: 2 Lang × 1 View (None) × 1 DB × 2 Comm = 4 * 1 (Caching: None) = 4

**Total Core Combinations: 240**

> **Note on CI/CD**: Each combination can be generated with or without CI/CD (`--ci-provider`), effectively doubling the state space.

---

## 1. MVC Architecture (180 Cases)

| # | Language | Architecture | View Engine | Database | Communication | Caching |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | JavaScript | MVC | None | MySQL | REST APIs | None |
| 2 | JavaScript | MVC | None | MySQL | REST APIs | Redis |
| 3 | JavaScript | MVC | None | MySQL | REST APIs | Memory Cache |
| 4 | JavaScript | MVC | None | MySQL | GraphQL | None |
| 5 | JavaScript | MVC | None | MySQL | GraphQL | Redis |
| 6 | JavaScript | MVC | None | MySQL | GraphQL | Memory Cache |
| 7 | JavaScript | MVC | None | MySQL | Kafka | None |
| 8 | JavaScript | MVC | None | MySQL | Kafka | Redis |
| 9 | JavaScript | MVC | None | MySQL | Kafka | Memory Cache |
| 10 | JavaScript | MVC | None | PostgreSQL | REST APIs | None |
| 11 | JavaScript | MVC | None | PostgreSQL | REST APIs | Redis |
| 12 | JavaScript | MVC | None | PostgreSQL | REST APIs | Memory Cache |
| 13 | JavaScript | MVC | None | PostgreSQL | GraphQL | None |
| 14 | JavaScript | MVC | None | PostgreSQL | GraphQL | Redis |
| 15 | JavaScript | MVC | None | PostgreSQL | GraphQL | Memory Cache |
| 16 | JavaScript | MVC | None | PostgreSQL | Kafka | None |
| 17 | JavaScript | MVC | None | PostgreSQL | Kafka | Redis |
| 18 | JavaScript | MVC | None | PostgreSQL | Kafka | Memory Cache |
| 19 | JavaScript | MVC | None | MongoDB | REST APIs | None |
| 20 | JavaScript | MVC | None | MongoDB | REST APIs | Redis |
| 21 | JavaScript | MVC | None | MongoDB | REST APIs | Memory Cache |
| 22 | JavaScript | MVC | None | MongoDB | GraphQL | None |
| 23 | JavaScript | MVC | None | MongoDB | GraphQL | Redis |
| 24 | JavaScript | MVC | None | MongoDB | GraphQL | Memory Cache |
| 25 | JavaScript | MVC | None | MongoDB | Kafka | None |
| 26 | JavaScript | MVC | None | MongoDB | Kafka | Redis |
| 27 | JavaScript | MVC | None | MongoDB | Kafka | Memory Cache |
| 28 | JavaScript | MVC | None | None | REST APIs | None |
| 29 | JavaScript | MVC | None | None | GraphQL | None |
| 30 | JavaScript | MVC | None | None | Kafka | None |
| 31 | JavaScript | MVC | EJS | MySQL | REST APIs | None |
| 32 | JavaScript | MVC | EJS | MySQL | REST APIs | Redis |
| 33 | JavaScript | MVC | EJS | MySQL | REST APIs | Memory Cache |
| 34 | JavaScript | MVC | EJS | MySQL | GraphQL | None |
| 35 | JavaScript | MVC | EJS | MySQL | GraphQL | Redis |
| 36 | JavaScript | MVC | EJS | MySQL | GraphQL | Memory Cache |
| 37 | JavaScript | MVC | EJS | MySQL | Kafka | None |
| 38 | JavaScript | MVC | EJS | MySQL | Kafka | Redis |
| 39 | JavaScript | MVC | EJS | MySQL | Kafka | Memory Cache |
| 40 | JavaScript | MVC | EJS | PostgreSQL | REST APIs | None |
| 41 | JavaScript | MVC | EJS | PostgreSQL | REST APIs | Redis |
| 42 | JavaScript | MVC | EJS | PostgreSQL | REST APIs | Memory Cache |
| 43 | JavaScript | MVC | EJS | PostgreSQL | GraphQL | None |
| 44 | JavaScript | MVC | EJS | PostgreSQL | GraphQL | Redis |
| 45 | JavaScript | MVC | EJS | PostgreSQL | GraphQL | Memory Cache |
| 46 | JavaScript | MVC | EJS | PostgreSQL | Kafka | None |
| 47 | JavaScript | MVC | EJS | PostgreSQL | Kafka | Redis |
| 48 | JavaScript | MVC | EJS | PostgreSQL | Kafka | Memory Cache |
| 49 | JavaScript | MVC | EJS | MongoDB | REST APIs | None |
| 50 | JavaScript | MVC | EJS | MongoDB | REST APIs | Redis |
| 51 | JavaScript | MVC | EJS | MongoDB | REST APIs | Memory Cache |
| 52 | JavaScript | MVC | EJS | MongoDB | GraphQL | None |
| 53 | JavaScript | MVC | EJS | MongoDB | GraphQL | Redis |
| 54 | JavaScript | MVC | EJS | MongoDB | GraphQL | Memory Cache |
| 55 | JavaScript | MVC | EJS | MongoDB | Kafka | None |
| 56 | JavaScript | MVC | EJS | MongoDB | Kafka | Redis |
| 57 | JavaScript | MVC | EJS | MongoDB | Kafka | Memory Cache |
| 58 | JavaScript | MVC | EJS | None | REST APIs | None |
| 59 | JavaScript | MVC | EJS | None | GraphQL | None |
| 60 | JavaScript | MVC | EJS | None | Kafka | None |
| 61 | JavaScript | MVC | Pug | MySQL | REST APIs | None |
| 62 | JavaScript | MVC | Pug | MySQL | REST APIs | Redis |
| 63 | JavaScript | MVC | Pug | MySQL | REST APIs | Memory Cache |
| 64 | JavaScript | MVC | Pug | MySQL | GraphQL | None |
| 65 | JavaScript | MVC | Pug | MySQL | GraphQL | Redis |
| 66 | JavaScript | MVC | Pug | MySQL | GraphQL | Memory Cache |
| 67 | JavaScript | MVC | Pug | MySQL | Kafka | None |
| 68 | JavaScript | MVC | Pug | MySQL | Kafka | Redis |
| 69 | JavaScript | MVC | Pug | MySQL | Kafka | Memory Cache |
| 70 | JavaScript | MVC | Pug | PostgreSQL | REST APIs | None |
| 71 | JavaScript | MVC | Pug | PostgreSQL | REST APIs | Redis |
| 72 | JavaScript | MVC | Pug | PostgreSQL | REST APIs | Memory Cache |
| 73 | JavaScript | MVC | Pug | PostgreSQL | GraphQL | None |
| 74 | JavaScript | MVC | Pug | PostgreSQL | GraphQL | Redis |
| 75 | JavaScript | MVC | Pug | PostgreSQL | GraphQL | Memory Cache |
| 76 | JavaScript | MVC | Pug | PostgreSQL | Kafka | None |
| 77 | JavaScript | MVC | Pug | PostgreSQL | Kafka | Redis |
| 78 | JavaScript | MVC | Pug | PostgreSQL | Kafka | Memory Cache |
| 79 | JavaScript | MVC | Pug | MongoDB | REST APIs | None |
| 80 | JavaScript | MVC | Pug | MongoDB | REST APIs | Redis |
| 81 | JavaScript | MVC | Pug | MongoDB | REST APIs | Memory Cache |
| 82 | JavaScript | MVC | Pug | MongoDB | GraphQL | None |
| 83 | JavaScript | MVC | Pug | MongoDB | GraphQL | Redis |
| 84 | JavaScript | MVC | Pug | MongoDB | GraphQL | Memory Cache |
| 85 | JavaScript | MVC | Pug | MongoDB | Kafka | None |
| 86 | JavaScript | MVC | Pug | MongoDB | Kafka | Redis |
| 87 | JavaScript | MVC | Pug | MongoDB | Kafka | Memory Cache |
| 88 | JavaScript | MVC | Pug | None | REST APIs | None |
| 89 | JavaScript | MVC | Pug | None | GraphQL | None |
| 90 | JavaScript | MVC | Pug | None | Kafka | None |
| 91 | TypeScript | MVC | None | MySQL | REST APIs | None |
| 92 | TypeScript | MVC | None | MySQL | REST APIs | Redis |
| 93 | TypeScript | MVC | None | MySQL | REST APIs | Memory Cache |
| 94 | TypeScript | MVC | None | MySQL | GraphQL | None |
| 95 | TypeScript | MVC | None | MySQL | GraphQL | Redis |
| 96 | TypeScript | MVC | None | MySQL | GraphQL | Memory Cache |
| 97 | TypeScript | MVC | None | MySQL | Kafka | None |
| 98 | TypeScript | MVC | None | MySQL | Kafka | Redis |
| 99 | TypeScript | MVC | None | MySQL | Kafka | Memory Cache |
| 100 | TypeScript | MVC | None | PostgreSQL | REST APIs | None |
| 101 | TypeScript | MVC | None | PostgreSQL | REST APIs | Redis |
| 102 | TypeScript | MVC | None | PostgreSQL | REST APIs | Memory Cache |
| 103 | TypeScript | MVC | None | PostgreSQL | GraphQL | None |
| 104 | TypeScript | MVC | None | PostgreSQL | GraphQL | Redis |
| 105 | TypeScript | MVC | None | PostgreSQL | GraphQL | Memory Cache |
| 106 | TypeScript | MVC | None | PostgreSQL | Kafka | None |
| 107 | TypeScript | MVC | None | PostgreSQL | Kafka | Redis |
| 108 | TypeScript | MVC | None | PostgreSQL | Kafka | Memory Cache |
| 109 | TypeScript | MVC | None | MongoDB | REST APIs | None |
| 110 | TypeScript | MVC | None | MongoDB | REST APIs | Redis |
| 111 | TypeScript | MVC | None | MongoDB | REST APIs | Memory Cache |
| 112 | TypeScript | MVC | None | MongoDB | GraphQL | None |
| 113 | TypeScript | MVC | None | MongoDB | GraphQL | Redis |
| 114 | TypeScript | MVC | None | MongoDB | GraphQL | Memory Cache |
| 115 | TypeScript | MVC | None | MongoDB | Kafka | None |
| 116 | TypeScript | MVC | None | MongoDB | Kafka | Redis |
| 117 | TypeScript | MVC | None | MongoDB | Kafka | Memory Cache |
| 118 | TypeScript | MVC | None | None | REST APIs | None |
| 119 | TypeScript | MVC | None | None | GraphQL | None |
| 120 | TypeScript | MVC | None | None | Kafka | None |
| 121 | TypeScript | MVC | EJS | MySQL | REST APIs | None |
| 122 | TypeScript | MVC | EJS | MySQL | REST APIs | Redis |
| 123 | TypeScript | MVC | EJS | MySQL | REST APIs | Memory Cache |
| 124 | TypeScript | MVC | EJS | MySQL | GraphQL | None |
| 125 | TypeScript | MVC | EJS | MySQL | GraphQL | Redis |
| 126 | TypeScript | MVC | EJS | MySQL | GraphQL | Memory Cache |
| 127 | TypeScript | MVC | EJS | MySQL | Kafka | None |
| 128 | TypeScript | MVC | EJS | MySQL | Kafka | Redis |
| 129 | TypeScript | MVC | EJS | MySQL | Kafka | Memory Cache |
| 130 | TypeScript | MVC | EJS | PostgreSQL | REST APIs | None |
| 131 | TypeScript | MVC | EJS | PostgreSQL | REST APIs | Redis |
| 132 | TypeScript | MVC | EJS | PostgreSQL | REST APIs | Memory Cache |
| 133 | TypeScript | MVC | EJS | PostgreSQL | GraphQL | None |
| 134 | TypeScript | MVC | EJS | PostgreSQL | GraphQL | Redis |
| 135 | TypeScript | MVC | EJS | PostgreSQL | GraphQL | Memory Cache |
| 136 | TypeScript | MVC | EJS | PostgreSQL | Kafka | None |
| 137 | TypeScript | MVC | EJS | PostgreSQL | Kafka | Redis |
| 138 | TypeScript | MVC | EJS | PostgreSQL | Kafka | Memory Cache |
| 139 | TypeScript | MVC | EJS | MongoDB | REST APIs | None |
| 140 | TypeScript | MVC | EJS | MongoDB | REST APIs | Redis |
| 141 | TypeScript | MVC | EJS | MongoDB | REST APIs | Memory Cache |
| 142 | TypeScript | MVC | EJS | MongoDB | GraphQL | None |
| 143 | TypeScript | MVC | EJS | MongoDB | GraphQL | Redis |
| 144 | TypeScript | MVC | EJS | MongoDB | GraphQL | Memory Cache |
| 145 | TypeScript | MVC | EJS | MongoDB | Kafka | None |
| 146 | TypeScript | MVC | EJS | MongoDB | Kafka | Redis |
| 147 | TypeScript | MVC | EJS | MongoDB | Kafka | Memory Cache |
| 148 | TypeScript | MVC | EJS | None | REST APIs | None |
| 149 | TypeScript | MVC | EJS | None | GraphQL | None |
| 150 | TypeScript | MVC | EJS | None | Kafka | None |
| 151 | TypeScript | MVC | Pug | MySQL | REST APIs | None |
| 152 | TypeScript | MVC | Pug | MySQL | REST APIs | Redis |
| 153 | TypeScript | MVC | Pug | MySQL | REST APIs | Memory Cache |
| 154 | TypeScript | MVC | Pug | MySQL | GraphQL | None |
| 155 | TypeScript | MVC | Pug | MySQL | GraphQL | Redis |
| 156 | TypeScript | MVC | Pug | MySQL | GraphQL | Memory Cache |
| 157 | TypeScript | MVC | Pug | MySQL | Kafka | None |
| 158 | TypeScript | MVC | Pug | MySQL | Kafka | Redis |
| 159 | TypeScript | MVC | Pug | MySQL | Kafka | Memory Cache |
| 160 | TypeScript | MVC | Pug | PostgreSQL | REST APIs | None |
| 161 | TypeScript | MVC | Pug | PostgreSQL | REST APIs | Redis |
| 162 | TypeScript | MVC | Pug | PostgreSQL | REST APIs | Memory Cache |
| 163 | TypeScript | MVC | Pug | PostgreSQL | GraphQL | None |
| 164 | TypeScript | MVC | Pug | PostgreSQL | GraphQL | Redis |
| 165 | TypeScript | MVC | Pug | PostgreSQL | GraphQL | Memory Cache |
| 166 | TypeScript | MVC | Pug | PostgreSQL | Kafka | None |
| 167 | TypeScript | MVC | Pug | PostgreSQL | Kafka | Redis |
| 168 | TypeScript | MVC | Pug | PostgreSQL | Kafka | Memory Cache |
| 169 | TypeScript | MVC | Pug | MongoDB | REST APIs | None |
| 170 | TypeScript | MVC | Pug | MongoDB | REST APIs | Redis |
| 171 | TypeScript | MVC | Pug | MongoDB | REST APIs | Memory Cache |
| 172 | TypeScript | MVC | Pug | MongoDB | GraphQL | None |
| 173 | TypeScript | MVC | Pug | MongoDB | GraphQL | Redis |
| 174 | TypeScript | MVC | Pug | MongoDB | GraphQL | Memory Cache |
| 175 | TypeScript | MVC | Pug | MongoDB | Kafka | None |
| 176 | TypeScript | MVC | Pug | MongoDB | Kafka | Redis |
| 177 | TypeScript | MVC | Pug | MongoDB | Kafka | Memory Cache |
| 178 | TypeScript | MVC | Pug | None | REST APIs | None |
| 179 | TypeScript | MVC | Pug | None | GraphQL | None |
| 180 | TypeScript | MVC | Pug | None | Kafka | None |

## 2. Clean Architecture (60 Cases)
*Note: Clean Architecture does not use server-side view engines (EJS/Pug).*

| # | Language | Architecture | View Engine | Database | Communication | Caching |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 181 | JavaScript | Clean Architecture | N/A | MySQL | REST APIs | None |
| 182 | JavaScript | Clean Architecture | N/A | MySQL | REST APIs | Redis |
| 183 | JavaScript | Clean Architecture | N/A | MySQL | REST APIs | Memory Cache |
| 184 | JavaScript | Clean Architecture | N/A | MySQL | GraphQL | None |
| 185 | JavaScript | Clean Architecture | N/A | MySQL | GraphQL | Redis |
| 186 | JavaScript | Clean Architecture | N/A | MySQL | GraphQL | Memory Cache |
| 187 | JavaScript | Clean Architecture | N/A | MySQL | Kafka | None |
| 188 | JavaScript | Clean Architecture | N/A | MySQL | Kafka | Redis |
| 189 | JavaScript | Clean Architecture | N/A | MySQL | Kafka | Memory Cache |
| 190 | JavaScript | Clean Architecture | N/A | PostgreSQL | REST APIs | None |
| 191 | JavaScript | Clean Architecture | N/A | PostgreSQL | REST APIs | Redis |
| 192 | JavaScript | Clean Architecture | N/A | PostgreSQL | REST APIs | Memory Cache |
| 193 | JavaScript | Clean Architecture | N/A | PostgreSQL | GraphQL | None |
| 194 | JavaScript | Clean Architecture | N/A | PostgreSQL | GraphQL | Redis |
| 195 | JavaScript | Clean Architecture | N/A | PostgreSQL | GraphQL | Memory Cache |
| 196 | JavaScript | Clean Architecture | N/A | PostgreSQL | Kafka | None |
| 197 | JavaScript | Clean Architecture | N/A | PostgreSQL | Kafka | Redis |
| 198 | JavaScript | Clean Architecture | N/A | PostgreSQL | Kafka | Memory Cache |
| 199 | JavaScript | Clean Architecture | N/A | MongoDB | REST APIs | None |
| 200 | JavaScript | Clean Architecture | N/A | MongoDB | REST APIs | Redis |
| 201 | JavaScript | Clean Architecture | N/A | MongoDB | REST APIs | Memory Cache |
| 202 | JavaScript | Clean Architecture | N/A | MongoDB | GraphQL | None |
| 203 | JavaScript | Clean Architecture | N/A | MongoDB | GraphQL | Redis |
| 204 | JavaScript | Clean Architecture | N/A | MongoDB | GraphQL | Memory Cache |
| 205 | JavaScript | Clean Architecture | N/A | MongoDB | Kafka | None |
| 206 | JavaScript | Clean Architecture | N/A | MongoDB | Kafka | Redis |
| 207 | JavaScript | Clean Architecture | N/A | MongoDB | Kafka | Memory Cache |
| 208 | JavaScript | Clean Architecture | N/A | None | REST APIs | None |
| 209 | JavaScript | Clean Architecture | N/A | None | GraphQL | None |
| 210 | JavaScript | Clean Architecture | N/A | None | Kafka | None |
| 211 | TypeScript | Clean Architecture | N/A | MySQL | REST APIs | None |
| 212 | TypeScript | Clean Architecture | N/A | MySQL | REST APIs | Redis |
| 213 | TypeScript | Clean Architecture | N/A | MySQL | REST APIs | Memory Cache |
| 214 | TypeScript | Clean Architecture | N/A | MySQL | GraphQL | None |
| 215 | TypeScript | Clean Architecture | N/A | MySQL | GraphQL | Redis |
| 216 | TypeScript | Clean Architecture | N/A | MySQL | GraphQL | Memory Cache |
| 217 | TypeScript | Clean Architecture | N/A | MySQL | Kafka | None |
| 218 | TypeScript | Clean Architecture | N/A | MySQL | Kafka | Redis |
| 219 | TypeScript | Clean Architecture | N/A | MySQL | Kafka | Memory Cache |
| 220 | TypeScript | Clean Architecture | N/A | PostgreSQL | REST APIs | None |
| 221 | TypeScript | Clean Architecture | N/A | PostgreSQL | REST APIs | Redis |
| 222 | TypeScript | Clean Architecture | N/A | PostgreSQL | REST APIs | Memory Cache |
| 223 | TypeScript | Clean Architecture | N/A | PostgreSQL | GraphQL | None |
| 224 | TypeScript | Clean Architecture | N/A | PostgreSQL | GraphQL | Redis |
| 225 | TypeScript | Clean Architecture | N/A | PostgreSQL | GraphQL | Memory Cache |
| 226 | TypeScript | Clean Architecture | N/A | PostgreSQL | Kafka | None |
| 227 | TypeScript | Clean Architecture | N/A | PostgreSQL | Kafka | Redis |
| 228 | TypeScript | Clean Architecture | N/A | PostgreSQL | Kafka | Memory Cache |
| 229 | TypeScript | Clean Architecture | N/A | MongoDB | REST APIs | None |
| 230 | TypeScript | Clean Architecture | N/A | MongoDB | REST APIs | Redis |
| 231 | TypeScript | Clean Architecture | N/A | MongoDB | REST APIs | Memory Cache |
| 232 | TypeScript | Clean Architecture | N/A | MongoDB | GraphQL | None |
| 233 | TypeScript | Clean Architecture | N/A | MongoDB | GraphQL | Redis |
| 234 | TypeScript | Clean Architecture | N/A | MongoDB | GraphQL | Memory Cache |
| 235 | TypeScript | Clean Architecture | N/A | MongoDB | Kafka | None |
| 236 | TypeScript | Clean Architecture | N/A | MongoDB | Kafka | Redis |
| 237 | TypeScript | Clean Architecture | N/A | MongoDB | Kafka | Memory Cache |
| 238 | TypeScript | Clean Architecture | N/A | None | REST APIs | None |
| 239 | TypeScript | Clean Architecture | N/A | None | GraphQL | None |
| 240 | TypeScript | Clean Architecture | N/A | None | Kafka | None |
