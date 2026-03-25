# NodeJS Quickstart Generator - Test Cases

This document lists the **1,680+ possible project combinations** supported by the `nodejs-quickstart` CLI. These combinations cover all supported languages, architectures, databases, communication patterns, caching options, and enterprise security layers.

## Summary
- **CI Providers**: `None`, `GitHub Actions`, `Jenkins`, `GitLab CI`
- **Security Hardening**: `Yes`, `No` (Conditional on CI selection)
- **MVC Architecture**: 1,260 Combinations
- **Clean Architecture**: 420 Combinations

**Total Core Combinations: 1,680+**

> **Note on CI/CD & Security**: Every combination can be generated with various CI/CD providers. If a CI provider is selected, an additional "Enterprise Security Hardening" layer (Snyk, SonarQube, etc.) can be toggled, significantly expanding the project state space.

---

## 1. MVC Architecture (180 Cases)

| # | Language | Architecture | View Engine | Database | Communication | Caching |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | TypeScript | MVC | EJS | None | REST APIs | None |
| 2 | TypeScript | MVC | EJS | None | GraphQL | None |
| 3 | TypeScript | MVC | EJS | None | Kafka | None |
| 4 | TypeScript | MVC | EJS | MySQL | REST APIs | None |
| 5 | TypeScript | MVC | EJS | MySQL | REST APIs | Redis |
| 6 | TypeScript | MVC | EJS | MySQL | REST APIs | Memory Cache |
| 7 | TypeScript | MVC | EJS | MySQL | GraphQL | None |
| 8 | TypeScript | MVC | EJS | MySQL | GraphQL | Redis |
| 9 | TypeScript | MVC | EJS | MySQL | GraphQL | Memory Cache |
| 10 | TypeScript | MVC | EJS | MySQL | Kafka | None |
| 11 | TypeScript | MVC | EJS | MySQL | Kafka | Redis |
| 12 | TypeScript | MVC | EJS | MySQL | Kafka | Memory Cache |
| 13 | TypeScript | MVC | EJS | PostgreSQL | REST APIs | None |
| 14 | TypeScript | MVC | EJS | PostgreSQL | REST APIs | Redis |
| 15 | TypeScript | MVC | EJS | PostgreSQL | REST APIs | Memory Cache |
| 16 | TypeScript | MVC | EJS | PostgreSQL | GraphQL | None |
| 17 | TypeScript | MVC | EJS | PostgreSQL | GraphQL | Redis |
| 18 | TypeScript | MVC | EJS | PostgreSQL | GraphQL | Memory Cache |
| 19 | TypeScript | MVC | EJS | PostgreSQL | Kafka | None |
| 20 | TypeScript | MVC | EJS | PostgreSQL | Kafka | Redis |
| 21 | TypeScript | MVC | EJS | PostgreSQL | Kafka | Memory Cache |
| 22 | TypeScript | MVC | EJS | MongoDB | REST APIs | None |
| 23 | TypeScript | MVC | EJS | MongoDB | REST APIs | Redis |
| 24 | TypeScript | MVC | EJS | MongoDB | REST APIs | Memory Cache |
| 25 | TypeScript | MVC | EJS | MongoDB | GraphQL | None |
| 26 | TypeScript | MVC | EJS | MongoDB | GraphQL | Redis |
| 27 | TypeScript | MVC | EJS | MongoDB | GraphQL | Memory Cache |
| 28 | TypeScript | MVC | EJS | MongoDB | Kafka | None |
| 29 | TypeScript | MVC | EJS | MongoDB | Kafka | Redis |
| 30 | TypeScript | MVC | EJS | MongoDB | Kafka | Memory Cache |
| 31 | TypeScript | MVC | Pug | None | REST APIs | None |
| 32 | TypeScript | MVC | Pug | None | GraphQL | None |
| 33 | TypeScript | MVC | Pug | None | Kafka | None |
| 34 | TypeScript | MVC | Pug | MySQL | REST APIs | None |
| 35 | TypeScript | MVC | Pug | MySQL | REST APIs | Redis |
| 36 | TypeScript | MVC | Pug | MySQL | REST APIs | Memory Cache |
| 37 | TypeScript | MVC | Pug | MySQL | GraphQL | None |
| 38 | TypeScript | MVC | Pug | MySQL | GraphQL | Redis |
| 39 | TypeScript | MVC | Pug | MySQL | GraphQL | Memory Cache |
| 40 | TypeScript | MVC | Pug | MySQL | Kafka | None |
| 41 | TypeScript | MVC | Pug | MySQL | Kafka | Redis |
| 42 | TypeScript | MVC | Pug | MySQL | Kafka | Memory Cache |
| 43 | TypeScript | MVC | Pug | PostgreSQL | REST APIs | None |
| 44 | TypeScript | MVC | Pug | PostgreSQL | REST APIs | Redis |
| 45 | TypeScript | MVC | Pug | PostgreSQL | REST APIs | Memory Cache |
| 46 | TypeScript | MVC | Pug | PostgreSQL | GraphQL | None |
| 47 | TypeScript | MVC | Pug | PostgreSQL | GraphQL | Redis |
| 48 | TypeScript | MVC | Pug | PostgreSQL | GraphQL | Memory Cache |
| 49 | TypeScript | MVC | Pug | PostgreSQL | Kafka | None |
| 50 | TypeScript | MVC | Pug | PostgreSQL | Kafka | Redis |
| 51 | TypeScript | MVC | Pug | PostgreSQL | Kafka | Memory Cache |
| 52 | TypeScript | MVC | Pug | MongoDB | REST APIs | None |
| 53 | TypeScript | MVC | Pug | MongoDB | REST APIs | Redis |
| 54 | TypeScript | MVC | Pug | MongoDB | REST APIs | Memory Cache |
| 55 | TypeScript | MVC | Pug | MongoDB | GraphQL | None |
| 56 | TypeScript | MVC | Pug | MongoDB | GraphQL | Redis |
| 57 | TypeScript | MVC | Pug | MongoDB | GraphQL | Memory Cache |
| 58 | TypeScript | MVC | Pug | MongoDB | Kafka | None |
| 59 | TypeScript | MVC | Pug | MongoDB | Kafka | Redis |
| 60 | TypeScript | MVC | Pug | MongoDB | Kafka | Memory Cache |
| 61 | TypeScript | MVC | None | None | REST APIs | None |
| 62 | TypeScript | MVC | None | None | GraphQL | None |
| 63 | TypeScript | MVC | None | None | Kafka | None |
| 64 | TypeScript | MVC | None | MySQL | REST APIs | None |
| 65 | TypeScript | MVC | None | MySQL | REST APIs | Redis |
| 66 | TypeScript | MVC | None | MySQL | REST APIs | Memory Cache |
| 67 | TypeScript | MVC | None | MySQL | GraphQL | None |
| 68 | TypeScript | MVC | None | MySQL | GraphQL | Redis |
| 69 | TypeScript | MVC | None | MySQL | GraphQL | Memory Cache |
| 70 | TypeScript | MVC | None | MySQL | Kafka | None |
| 71 | TypeScript | MVC | None | MySQL | Kafka | Redis |
| 72 | TypeScript | MVC | None | MySQL | Kafka | Memory Cache |
| 73 | TypeScript | MVC | None | PostgreSQL | REST APIs | None |
| 74 | TypeScript | MVC | None | PostgreSQL | REST APIs | Redis |
| 75 | TypeScript | MVC | None | PostgreSQL | REST APIs | Memory Cache |
| 76 | TypeScript | MVC | None | PostgreSQL | GraphQL | None |
| 77 | TypeScript | MVC | None | PostgreSQL | GraphQL | Redis |
| 78 | TypeScript | MVC | None | PostgreSQL | GraphQL | Memory Cache |
| 79 | TypeScript | MVC | None | PostgreSQL | Kafka | None |
| 80 | TypeScript | MVC | None | PostgreSQL | Kafka | Redis |
| 81 | TypeScript | MVC | None | PostgreSQL | Kafka | Memory Cache |
| 82 | TypeScript | MVC | None | MongoDB | REST APIs | None |
| 83 | TypeScript | MVC | None | MongoDB | REST APIs | Redis |
| 84 | TypeScript | MVC | None | MongoDB | REST APIs | Memory Cache |
| 85 | TypeScript | MVC | None | MongoDB | GraphQL | None |
| 86 | TypeScript | MVC | None | MongoDB | GraphQL | Redis |
| 87 | TypeScript | MVC | None | MongoDB | GraphQL | Memory Cache |
| 88 | TypeScript | MVC | None | MongoDB | Kafka | None |
| 89 | TypeScript | MVC | None | MongoDB | Kafka | Redis |
| 90 | TypeScript | MVC | None | MongoDB | Kafka | Memory Cache |
| 91 | JavaScript | MVC | EJS | None | REST APIs | None |
| 92 | JavaScript | MVC | EJS | None | GraphQL | None |
| 93 | JavaScript | MVC | EJS | None | Kafka | None |
| 94 | JavaScript | MVC | EJS | MySQL | REST APIs | None |
| 95 | JavaScript | MVC | EJS | MySQL | REST APIs | Redis |
| 96 | JavaScript | MVC | EJS | MySQL | REST APIs | Memory Cache |
| 97 | JavaScript | MVC | EJS | MySQL | GraphQL | None |
| 98 | JavaScript | MVC | EJS | MySQL | GraphQL | Redis |
| 99 | JavaScript | MVC | EJS | MySQL | GraphQL | Memory Cache |
| 100 | JavaScript | MVC | EJS | MySQL | Kafka | None |
| 101 | JavaScript | MVC | EJS | MySQL | Kafka | Redis |
| 102 | JavaScript | MVC | EJS | MySQL | Kafka | Memory Cache |
| 103 | JavaScript | MVC | EJS | PostgreSQL | REST APIs | None |
| 104 | JavaScript | MVC | EJS | PostgreSQL | REST APIs | Redis |
| 105 | JavaScript | MVC | EJS | PostgreSQL | REST APIs | Memory Cache |
| 106 | JavaScript | MVC | EJS | PostgreSQL | GraphQL | None |
| 107 | JavaScript | MVC | EJS | PostgreSQL | GraphQL | Redis |
| 108 | JavaScript | MVC | EJS | PostgreSQL | GraphQL | Memory Cache |
| 109 | JavaScript | MVC | EJS | PostgreSQL | Kafka | None |
| 110 | JavaScript | MVC | EJS | PostgreSQL | Kafka | Redis |
| 111 | JavaScript | MVC | EJS | PostgreSQL | Kafka | Memory Cache |
| 112 | JavaScript | MVC | EJS | MongoDB | REST APIs | None |
| 113 | JavaScript | MVC | EJS | MongoDB | REST APIs | Redis |
| 114 | JavaScript | MVC | EJS | MongoDB | REST APIs | Memory Cache |
| 115 | JavaScript | MVC | EJS | MongoDB | GraphQL | None |
| 116 | JavaScript | MVC | EJS | MongoDB | GraphQL | Redis |
| 117 | JavaScript | MVC | EJS | MongoDB | GraphQL | Memory Cache |
| 118 | JavaScript | MVC | EJS | MongoDB | Kafka | None |
| 119 | JavaScript | MVC | EJS | MongoDB | Kafka | Redis |
| 120 | JavaScript | MVC | EJS | MongoDB | Kafka | Memory Cache |
| 121 | JavaScript | MVC | Pug | None | REST APIs | None |
| 122 | JavaScript | MVC | Pug | None | GraphQL | None |
| 123 | JavaScript | MVC | Pug | None | Kafka | None |
| 124 | JavaScript | MVC | Pug | MySQL | REST APIs | None |
| 125 | JavaScript | MVC | Pug | MySQL | REST APIs | Redis |
| 126 | JavaScript | MVC | Pug | MySQL | REST APIs | Memory Cache |
| 127 | JavaScript | MVC | Pug | MySQL | GraphQL | None |
| 128 | JavaScript | MVC | Pug | MySQL | GraphQL | Redis |
| 129 | JavaScript | MVC | Pug | MySQL | GraphQL | Memory Cache |
| 130 | JavaScript | MVC | Pug | MySQL | Kafka | None |
| 131 | JavaScript | MVC | Pug | MySQL | Kafka | Redis |
| 132 | JavaScript | MVC | Pug | MySQL | Kafka | Memory Cache |
| 133 | JavaScript | MVC | Pug | PostgreSQL | REST APIs | None |
| 134 | JavaScript | MVC | Pug | PostgreSQL | REST APIs | Redis |
| 135 | JavaScript | MVC | Pug | PostgreSQL | REST APIs | Memory Cache |
| 136 | JavaScript | MVC | Pug | PostgreSQL | GraphQL | None |
| 137 | JavaScript | MVC | Pug | PostgreSQL | GraphQL | Redis |
| 138 | JavaScript | MVC | Pug | PostgreSQL | GraphQL | Memory Cache |
| 139 | JavaScript | MVC | Pug | PostgreSQL | Kafka | None |
| 140 | JavaScript | MVC | Pug | PostgreSQL | Kafka | Redis |
| 141 | JavaScript | MVC | Pug | PostgreSQL | Kafka | Memory Cache |
| 142 | JavaScript | MVC | Pug | MongoDB | REST APIs | None |
| 143 | JavaScript | MVC | Pug | MongoDB | REST APIs | Redis |
| 144 | JavaScript | MVC | Pug | MongoDB | REST APIs | Memory Cache |
| 145 | JavaScript | MVC | Pug | MongoDB | GraphQL | None |
| 146 | JavaScript | MVC | Pug | MongoDB | GraphQL | Redis |
| 147 | JavaScript | MVC | Pug | MongoDB | GraphQL | Memory Cache |
| 148 | JavaScript | MVC | Pug | MongoDB | Kafka | None |
| 149 | JavaScript | MVC | Pug | MongoDB | Kafka | Redis |
| 150 | JavaScript | MVC | Pug | MongoDB | Kafka | Memory Cache |
| 151 | JavaScript | MVC | None | None | REST APIs | None |
| 152 | JavaScript | MVC | None | None | GraphQL | None |
| 153 | JavaScript | MVC | None | None | Kafka | None |
| 154 | JavaScript | MVC | None | MySQL | REST APIs | None |
| 155 | JavaScript | MVC | None | MySQL | REST APIs | Redis |
| 156 | JavaScript | MVC | None | MySQL | REST APIs | Memory Cache |
| 157 | JavaScript | MVC | None | MySQL | GraphQL | None |
| 158 | JavaScript | MVC | None | MySQL | GraphQL | Redis |
| 159 | JavaScript | MVC | None | MySQL | GraphQL | Memory Cache |
| 160 | JavaScript | MVC | None | MySQL | Kafka | None |
| 161 | JavaScript | MVC | None | MySQL | Kafka | Redis |
| 162 | JavaScript | MVC | None | MySQL | Kafka | Memory Cache |
| 163 | JavaScript | MVC | None | PostgreSQL | REST APIs | None |
| 164 | JavaScript | MVC | None | PostgreSQL | REST APIs | Redis |
| 165 | JavaScript | MVC | None | PostgreSQL | REST APIs | Memory Cache |
| 166 | JavaScript | MVC | None | PostgreSQL | GraphQL | None |
| 167 | JavaScript | MVC | None | PostgreSQL | GraphQL | Redis |
| 168 | JavaScript | MVC | None | PostgreSQL | GraphQL | Memory Cache |
| 169 | JavaScript | MVC | None | PostgreSQL | Kafka | None |
| 170 | JavaScript | MVC | None | PostgreSQL | Kafka | Redis |
| 171 | JavaScript | MVC | None | PostgreSQL | Kafka | Memory Cache |
| 172 | JavaScript | MVC | None | MongoDB | REST APIs | None |
| 173 | JavaScript | MVC | None | MongoDB | REST APIs | Redis |
| 174 | JavaScript | MVC | None | MongoDB | REST APIs | Memory Cache |
| 175 | JavaScript | MVC | None | MongoDB | GraphQL | None |
| 176 | JavaScript | MVC | None | MongoDB | GraphQL | Redis |
| 177 | JavaScript | MVC | None | MongoDB | GraphQL | Memory Cache |
| 178 | JavaScript | MVC | None | MongoDB | Kafka | None |
| 179 | JavaScript | MVC | None | MongoDB | Kafka | Redis |
| 180 | JavaScript | MVC | None | MongoDB | Kafka | Memory Cache |

## 2. Clean Architecture (60 Cases)
*Note: Clean Architecture does not use server-side view engines (EJS/Pug).*

| # | Language | Architecture | View Engine | Database | Communication | Caching |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 181 | TypeScript | Clean Architecture | N/A | None | REST APIs | None |
| 182 | TypeScript | Clean Architecture | N/A | None | GraphQL | None |
| 183 | TypeScript | Clean Architecture | N/A | None | Kafka | None |
| 184 | TypeScript | Clean Architecture | N/A | MySQL | REST APIs | None |
| 185 | TypeScript | Clean Architecture | N/A | MySQL | REST APIs | Redis |
| 186 | TypeScript | Clean Architecture | N/A | MySQL | REST APIs | Memory Cache |
| 187 | TypeScript | Clean Architecture | N/A | MySQL | GraphQL | None |
| 188 | TypeScript | Clean Architecture | N/A | MySQL | GraphQL | Redis |
| 189 | TypeScript | Clean Architecture | N/A | MySQL | GraphQL | Memory Cache |
| 190 | TypeScript | Clean Architecture | N/A | MySQL | Kafka | None |
| 191 | TypeScript | Clean Architecture | N/A | MySQL | Kafka | Redis |
| 192 | TypeScript | Clean Architecture | N/A | MySQL | Kafka | Memory Cache |
| 193 | TypeScript | Clean Architecture | N/A | PostgreSQL | REST APIs | None |
| 194 | TypeScript | Clean Architecture | N/A | PostgreSQL | REST APIs | Redis |
| 195 | TypeScript | Clean Architecture | N/A | PostgreSQL | REST APIs | Memory Cache |
| 196 | TypeScript | Clean Architecture | N/A | PostgreSQL | GraphQL | None |
| 197 | TypeScript | Clean Architecture | N/A | PostgreSQL | GraphQL | Redis |
| 198 | TypeScript | Clean Architecture | N/A | PostgreSQL | GraphQL | Memory Cache |
| 199 | TypeScript | Clean Architecture | N/A | PostgreSQL | Kafka | None |
| 200 | TypeScript | Clean Architecture | N/A | PostgreSQL | Kafka | Redis |
| 201 | TypeScript | Clean Architecture | N/A | PostgreSQL | Kafka | Memory Cache |
| 202 | TypeScript | Clean Architecture | N/A | MongoDB | REST APIs | None |
| 203 | TypeScript | Clean Architecture | N/A | MongoDB | REST APIs | Redis |
| 204 | TypeScript | Clean Architecture | N/A | MongoDB | REST APIs | Memory Cache |
| 205 | TypeScript | Clean Architecture | N/A | MongoDB | GraphQL | None |
| 206 | TypeScript | Clean Architecture | N/A | MongoDB | GraphQL | Redis |
| 207 | TypeScript | Clean Architecture | N/A | MongoDB | GraphQL | Memory Cache |
| 208 | TypeScript | Clean Architecture | N/A | MongoDB | Kafka | None |
| 209 | TypeScript | Clean Architecture | N/A | MongoDB | Kafka | Redis |
| 210 | TypeScript | Clean Architecture | N/A | MongoDB | Kafka | Memory Cache |
| 211 | JavaScript | Clean Architecture | N/A | None | REST APIs | None |
| 212 | JavaScript | Clean Architecture | N/A | None | GraphQL | None |
| 213 | JavaScript | Clean Architecture | N/A | None | Kafka | None |
| 214 | JavaScript | Clean Architecture | N/A | MySQL | REST APIs | None |
| 215 | JavaScript | Clean Architecture | N/A | MySQL | REST APIs | Redis |
| 216 | JavaScript | Clean Architecture | N/A | MySQL | REST APIs | Memory Cache |
| 217 | JavaScript | Clean Architecture | N/A | MySQL | GraphQL | None |
| 218 | JavaScript | Clean Architecture | N/A | MySQL | GraphQL | Redis |
| 219 | JavaScript | Clean Architecture | N/A | MySQL | GraphQL | Memory Cache |
| 220 | JavaScript | Clean Architecture | N/A | MySQL | Kafka | None |
| 221 | JavaScript | Clean Architecture | N/A | MySQL | Kafka | Redis |
| 222 | JavaScript | Clean Architecture | N/A | MySQL | Kafka | Memory Cache |
| 223 | JavaScript | Clean Architecture | N/A | PostgreSQL | REST APIs | None |
| 224 | JavaScript | Clean Architecture | N/A | PostgreSQL | REST APIs | Redis |
| 225 | JavaScript | Clean Architecture | N/A | PostgreSQL | REST APIs | Memory Cache |
| 226 | JavaScript | Clean Architecture | N/A | PostgreSQL | GraphQL | None |
| 227 | JavaScript | Clean Architecture | N/A | PostgreSQL | GraphQL | Redis |
| 228 | JavaScript | Clean Architecture | N/A | PostgreSQL | GraphQL | Memory Cache |
| 229 | JavaScript | Clean Architecture | N/A | PostgreSQL | Kafka | None |
| 230 | JavaScript | Clean Architecture | N/A | PostgreSQL | Kafka | Redis |
| 231 | JavaScript | Clean Architecture | N/A | PostgreSQL | Kafka | Memory Cache |
| 232 | JavaScript | Clean Architecture | N/A | MongoDB | REST APIs | None |
| 233 | JavaScript | Clean Architecture | N/A | MongoDB | REST APIs | Redis |
| 234 | JavaScript | Clean Architecture | N/A | MongoDB | REST APIs | Memory Cache |
| 235 | JavaScript | Clean Architecture | N/A | MongoDB | GraphQL | None |
| 236 | JavaScript | Clean Architecture | N/A | MongoDB | GraphQL | Redis |
| 237 | JavaScript | Clean Architecture | N/A | MongoDB | GraphQL | Memory Cache |
| 238 | JavaScript | Clean Architecture | N/A | MongoDB | Kafka | None |
| 239 | JavaScript | Clean Architecture | N/A | MongoDB | Kafka | Redis |
| 240 | JavaScript | Clean Architecture | N/A | MongoDB | Kafka | Memory Cache |
