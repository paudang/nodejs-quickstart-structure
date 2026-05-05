# NodeJS Quickstart Generator - Test Cases

This document lists the **720 possible project combinations** supported by the `nodejs-quickstart` CLI. These combinations cover all supported languages, architectures, databases, communication patterns, caching, and authentication options.

## Summary
- **CI Providers**: `None`, `GitHub Actions`, `Jenkins`, `GitLab CI`, `CircleCI`, `Bitbucket Pipelines`
- **MVC Architecture**: 540 Combinations
  - **With Database (486)**: 2 Lang × 3 View × 3 DB × 3 Comm × 3 (Auth: None/JWT/Social) = 162 * 3 (Caching: None/Redis/Memory Cache) = 486
  - **No Database (54)**: 2 Lang × 3 View × 1 DB × 3 Comm × 3 (Auth: None/JWT/Social) = 54 * 1 (Caching: None) = 54
- **Clean Architecture**: 180 Combinations
  - **With Database (162)**: 2 Lang × 1 View (None) × 3 DB × 3 Comm × 3 (Auth: None/JWT/Social) = 54 * 3 (Caching: None/Redis/Memory Cache) = 162
  - **No Database (18)**: 2 Lang × 1 View (None) × 1 DB × 3 Comm × 3 (Auth: None/JWT/Social) = 18 * 1 (Caching: None) = 18

**Total Core Combinations: 720**

> **Note on CI/CD**: Each core combination can be generated with `None` (1 state) or any of the **5 CI Providers** in two states (with or without Enterprise Security Hardening).
> 
> **Total Validated Permutations**: 720 × (1 + 5 × 2) = **7920 Cases**


---

## 1. MVC Architecture (540 Cases)

| # | Language | Architecture | View Engine | Database | Communication | Caching | Auth | Social Auth |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |

| 1 | JavaScript | MVC | None | MySQL | REST APIs | None | None | None |
| 2 | JavaScript | MVC | None | MySQL | REST APIs | Redis | None | None |
| 3 | JavaScript | MVC | None | MySQL | REST APIs | Memory Cache | None | None |
| 4 | JavaScript | MVC | None | MySQL | REST APIs | None | JWT | None |
| 5 | JavaScript | MVC | None | MySQL | REST APIs | Redis | JWT | None |
| 6 | JavaScript | MVC | None | MySQL | REST APIs | Memory Cache | JWT | None |
| 7 | JavaScript | MVC | None | MySQL | REST APIs | None | JWT | Google,GitHub |
| 8 | JavaScript | MVC | None | MySQL | REST APIs | Redis | JWT | Google,GitHub |
| 9 | JavaScript | MVC | None | MySQL | REST APIs | Memory Cache | JWT | Google,GitHub |
| 10 | JavaScript | MVC | None | MySQL | GraphQL | None | None | None |
| 11 | JavaScript | MVC | None | MySQL | GraphQL | Redis | None | None |
| 12 | JavaScript | MVC | None | MySQL | GraphQL | Memory Cache | None | None |
| 13 | JavaScript | MVC | None | MySQL | GraphQL | None | JWT | None |
| 14 | JavaScript | MVC | None | MySQL | GraphQL | Redis | JWT | None |
| 15 | JavaScript | MVC | None | MySQL | GraphQL | Memory Cache | JWT | None |
| 16 | JavaScript | MVC | None | MySQL | GraphQL | None | JWT | Google,GitHub |
| 17 | JavaScript | MVC | None | MySQL | GraphQL | Redis | JWT | Google,GitHub |
| 18 | JavaScript | MVC | None | MySQL | GraphQL | Memory Cache | JWT | Google,GitHub |
| 19 | JavaScript | MVC | None | MySQL | Kafka | None | None | None |
| 20 | JavaScript | MVC | None | MySQL | Kafka | Redis | None | None |
| 21 | JavaScript | MVC | None | MySQL | Kafka | Memory Cache | None | None |
| 22 | JavaScript | MVC | None | MySQL | Kafka | None | JWT | None |
| 23 | JavaScript | MVC | None | MySQL | Kafka | Redis | JWT | None |
| 24 | JavaScript | MVC | None | MySQL | Kafka | Memory Cache | JWT | None |
| 25 | JavaScript | MVC | None | MySQL | Kafka | None | JWT | Google,GitHub |
| 26 | JavaScript | MVC | None | MySQL | Kafka | Redis | JWT | Google,GitHub |
| 27 | JavaScript | MVC | None | MySQL | Kafka | Memory Cache | JWT | Google,GitHub |
| 28 | JavaScript | MVC | None | PostgreSQL | REST APIs | None | None | None |
| 29 | JavaScript | MVC | None | PostgreSQL | REST APIs | Redis | None | None |
| 30 | JavaScript | MVC | None | PostgreSQL | REST APIs | Memory Cache | None | None |
| 31 | JavaScript | MVC | None | PostgreSQL | REST APIs | None | JWT | None |
| 32 | JavaScript | MVC | None | PostgreSQL | REST APIs | Redis | JWT | None |
| 33 | JavaScript | MVC | None | PostgreSQL | REST APIs | Memory Cache | JWT | None |
| 34 | JavaScript | MVC | None | PostgreSQL | REST APIs | None | JWT | Google,GitHub |
| 35 | JavaScript | MVC | None | PostgreSQL | REST APIs | Redis | JWT | Google,GitHub |
| 36 | JavaScript | MVC | None | PostgreSQL | REST APIs | Memory Cache | JWT | Google,GitHub |
| 37 | JavaScript | MVC | None | PostgreSQL | GraphQL | None | None | None |
| 38 | JavaScript | MVC | None | PostgreSQL | GraphQL | Redis | None | None |
| 39 | JavaScript | MVC | None | PostgreSQL | GraphQL | Memory Cache | None | None |
| 40 | JavaScript | MVC | None | PostgreSQL | GraphQL | None | JWT | None |
| 41 | JavaScript | MVC | None | PostgreSQL | GraphQL | Redis | JWT | None |
| 42 | JavaScript | MVC | None | PostgreSQL | GraphQL | Memory Cache | JWT | None |
| 43 | JavaScript | MVC | None | PostgreSQL | GraphQL | None | JWT | Google,GitHub |
| 44 | JavaScript | MVC | None | PostgreSQL | GraphQL | Redis | JWT | Google,GitHub |
| 45 | JavaScript | MVC | None | PostgreSQL | GraphQL | Memory Cache | JWT | Google,GitHub |
| 46 | JavaScript | MVC | None | PostgreSQL | Kafka | None | None | None |
| 47 | JavaScript | MVC | None | PostgreSQL | Kafka | Redis | None | None |
| 48 | JavaScript | MVC | None | PostgreSQL | Kafka | Memory Cache | None | None |
| 49 | JavaScript | MVC | None | PostgreSQL | Kafka | None | JWT | None |
| 50 | JavaScript | MVC | None | PostgreSQL | Kafka | Redis | JWT | None |
| 51 | JavaScript | MVC | None | PostgreSQL | Kafka | Memory Cache | JWT | None |
| 52 | JavaScript | MVC | None | PostgreSQL | Kafka | None | JWT | Google,GitHub |
| 53 | JavaScript | MVC | None | PostgreSQL | Kafka | Redis | JWT | Google,GitHub |
| 54 | JavaScript | MVC | None | PostgreSQL | Kafka | Memory Cache | JWT | Google,GitHub |
| 55 | JavaScript | MVC | None | MongoDB | REST APIs | None | None | None |
| 56 | JavaScript | MVC | None | MongoDB | REST APIs | Redis | None | None |
| 57 | JavaScript | MVC | None | MongoDB | REST APIs | Memory Cache | None | None |
| 58 | JavaScript | MVC | None | MongoDB | REST APIs | None | JWT | None |
| 59 | JavaScript | MVC | None | MongoDB | REST APIs | Redis | JWT | None |
| 60 | JavaScript | MVC | None | MongoDB | REST APIs | Memory Cache | JWT | None |
| 61 | JavaScript | MVC | None | MongoDB | REST APIs | None | JWT | Google,GitHub |
| 62 | JavaScript | MVC | None | MongoDB | REST APIs | Redis | JWT | Google,GitHub |
| 63 | JavaScript | MVC | None | MongoDB | REST APIs | Memory Cache | JWT | Google,GitHub |
| 64 | JavaScript | MVC | None | MongoDB | GraphQL | None | None | None |
| 65 | JavaScript | MVC | None | MongoDB | GraphQL | Redis | None | None |
| 66 | JavaScript | MVC | None | MongoDB | GraphQL | Memory Cache | None | None |
| 67 | JavaScript | MVC | None | MongoDB | GraphQL | None | JWT | None |
| 68 | JavaScript | MVC | None | MongoDB | GraphQL | Redis | JWT | None |
| 69 | JavaScript | MVC | None | MongoDB | GraphQL | Memory Cache | JWT | None |
| 70 | JavaScript | MVC | None | MongoDB | GraphQL | None | JWT | Google,GitHub |
| 71 | JavaScript | MVC | None | MongoDB | GraphQL | Redis | JWT | Google,GitHub |
| 72 | JavaScript | MVC | None | MongoDB | GraphQL | Memory Cache | JWT | Google,GitHub |
| 73 | JavaScript | MVC | None | MongoDB | Kafka | None | None | None |
| 74 | JavaScript | MVC | None | MongoDB | Kafka | Redis | None | None |
| 75 | JavaScript | MVC | None | MongoDB | Kafka | Memory Cache | None | None |
| 76 | JavaScript | MVC | None | MongoDB | Kafka | None | JWT | None |
| 77 | JavaScript | MVC | None | MongoDB | Kafka | Redis | JWT | None |
| 78 | JavaScript | MVC | None | MongoDB | Kafka | Memory Cache | JWT | None |
| 79 | JavaScript | MVC | None | MongoDB | Kafka | None | JWT | Google,GitHub |
| 80 | JavaScript | MVC | None | MongoDB | Kafka | Redis | JWT | Google,GitHub |
| 81 | JavaScript | MVC | None | MongoDB | Kafka | Memory Cache | JWT | Google,GitHub |
| 82 | JavaScript | MVC | None | None | REST APIs | None | None | None |
| 83 | JavaScript | MVC | None | None | REST APIs | None | JWT | None |
| 84 | JavaScript | MVC | None | None | REST APIs | None | JWT | Google,GitHub |
| 85 | JavaScript | MVC | None | None | GraphQL | None | None | None |
| 86 | JavaScript | MVC | None | None | GraphQL | None | JWT | None |
| 87 | JavaScript | MVC | None | None | GraphQL | None | JWT | Google,GitHub |
| 88 | JavaScript | MVC | None | None | Kafka | None | None | None |
| 89 | JavaScript | MVC | None | None | Kafka | None | JWT | None |
| 90 | JavaScript | MVC | None | None | Kafka | None | JWT | Google,GitHub |
| 91 | JavaScript | MVC | EJS | MySQL | REST APIs | None | None | None |
| 92 | JavaScript | MVC | EJS | MySQL | REST APIs | Redis | None | None |
| 93 | JavaScript | MVC | EJS | MySQL | REST APIs | Memory Cache | None | None |
| 94 | JavaScript | MVC | EJS | MySQL | REST APIs | None | JWT | None |
| 95 | JavaScript | MVC | EJS | MySQL | REST APIs | Redis | JWT | None |
| 96 | JavaScript | MVC | EJS | MySQL | REST APIs | Memory Cache | JWT | None |
| 97 | JavaScript | MVC | EJS | MySQL | REST APIs | None | JWT | Google,GitHub |
| 98 | JavaScript | MVC | EJS | MySQL | REST APIs | Redis | JWT | Google,GitHub |
| 99 | JavaScript | MVC | EJS | MySQL | REST APIs | Memory Cache | JWT | Google,GitHub |
| 100 | JavaScript | MVC | EJS | MySQL | GraphQL | None | None | None |
| 101 | JavaScript | MVC | EJS | MySQL | GraphQL | Redis | None | None |
| 102 | JavaScript | MVC | EJS | MySQL | GraphQL | Memory Cache | None | None |
| 103 | JavaScript | MVC | EJS | MySQL | GraphQL | None | JWT | None |
| 104 | JavaScript | MVC | EJS | MySQL | GraphQL | Redis | JWT | None |
| 105 | JavaScript | MVC | EJS | MySQL | GraphQL | Memory Cache | JWT | None |
| 106 | JavaScript | MVC | EJS | MySQL | GraphQL | None | JWT | Google,GitHub |
| 107 | JavaScript | MVC | EJS | MySQL | GraphQL | Redis | JWT | Google,GitHub |
| 108 | JavaScript | MVC | EJS | MySQL | GraphQL | Memory Cache | JWT | Google,GitHub |
| 109 | JavaScript | MVC | EJS | MySQL | Kafka | None | None | None |
| 110 | JavaScript | MVC | EJS | MySQL | Kafka | Redis | None | None |
| 111 | JavaScript | MVC | EJS | MySQL | Kafka | Memory Cache | None | None |
| 112 | JavaScript | MVC | EJS | MySQL | Kafka | None | JWT | None |
| 113 | JavaScript | MVC | EJS | MySQL | Kafka | Redis | JWT | None |
| 114 | JavaScript | MVC | EJS | MySQL | Kafka | Memory Cache | JWT | None |
| 115 | JavaScript | MVC | EJS | MySQL | Kafka | None | JWT | Google,GitHub |
| 116 | JavaScript | MVC | EJS | MySQL | Kafka | Redis | JWT | Google,GitHub |
| 117 | JavaScript | MVC | EJS | MySQL | Kafka | Memory Cache | JWT | Google,GitHub |
| 118 | JavaScript | MVC | EJS | PostgreSQL | REST APIs | None | None | None |
| 119 | JavaScript | MVC | EJS | PostgreSQL | REST APIs | Redis | None | None |
| 120 | JavaScript | MVC | EJS | PostgreSQL | REST APIs | Memory Cache | None | None |
| 121 | JavaScript | MVC | EJS | PostgreSQL | REST APIs | None | JWT | None |
| 122 | JavaScript | MVC | EJS | PostgreSQL | REST APIs | Redis | JWT | None |
| 123 | JavaScript | MVC | EJS | PostgreSQL | REST APIs | Memory Cache | JWT | None |
| 124 | JavaScript | MVC | EJS | PostgreSQL | REST APIs | None | JWT | Google,GitHub |
| 125 | JavaScript | MVC | EJS | PostgreSQL | REST APIs | Redis | JWT | Google,GitHub |
| 126 | JavaScript | MVC | EJS | PostgreSQL | REST APIs | Memory Cache | JWT | Google,GitHub |
| 127 | JavaScript | MVC | EJS | PostgreSQL | GraphQL | None | None | None |
| 128 | JavaScript | MVC | EJS | PostgreSQL | GraphQL | Redis | None | None |
| 129 | JavaScript | MVC | EJS | PostgreSQL | GraphQL | Memory Cache | None | None |
| 130 | JavaScript | MVC | EJS | PostgreSQL | GraphQL | None | JWT | None |
| 131 | JavaScript | MVC | EJS | PostgreSQL | GraphQL | Redis | JWT | None |
| 132 | JavaScript | MVC | EJS | PostgreSQL | GraphQL | Memory Cache | JWT | None |
| 133 | JavaScript | MVC | EJS | PostgreSQL | GraphQL | None | JWT | Google,GitHub |
| 134 | JavaScript | MVC | EJS | PostgreSQL | GraphQL | Redis | JWT | Google,GitHub |
| 135 | JavaScript | MVC | EJS | PostgreSQL | GraphQL | Memory Cache | JWT | Google,GitHub |
| 136 | JavaScript | MVC | EJS | PostgreSQL | Kafka | None | None | None |
| 137 | JavaScript | MVC | EJS | PostgreSQL | Kafka | Redis | None | None |
| 138 | JavaScript | MVC | EJS | PostgreSQL | Kafka | Memory Cache | None | None |
| 139 | JavaScript | MVC | EJS | PostgreSQL | Kafka | None | JWT | None |
| 140 | JavaScript | MVC | EJS | PostgreSQL | Kafka | Redis | JWT | None |
| 141 | JavaScript | MVC | EJS | PostgreSQL | Kafka | Memory Cache | JWT | None |
| 142 | JavaScript | MVC | EJS | PostgreSQL | Kafka | None | JWT | Google,GitHub |
| 143 | JavaScript | MVC | EJS | PostgreSQL | Kafka | Redis | JWT | Google,GitHub |
| 144 | JavaScript | MVC | EJS | PostgreSQL | Kafka | Memory Cache | JWT | Google,GitHub |
| 145 | JavaScript | MVC | EJS | MongoDB | REST APIs | None | None | None |
| 146 | JavaScript | MVC | EJS | MongoDB | REST APIs | Redis | None | None |
| 147 | JavaScript | MVC | EJS | MongoDB | REST APIs | Memory Cache | None | None |
| 148 | JavaScript | MVC | EJS | MongoDB | REST APIs | None | JWT | None |
| 149 | JavaScript | MVC | EJS | MongoDB | REST APIs | Redis | JWT | None |
| 150 | JavaScript | MVC | EJS | MongoDB | REST APIs | Memory Cache | JWT | None |
| 151 | JavaScript | MVC | EJS | MongoDB | REST APIs | None | JWT | Google,GitHub |
| 152 | JavaScript | MVC | EJS | MongoDB | REST APIs | Redis | JWT | Google,GitHub |
| 153 | JavaScript | MVC | EJS | MongoDB | REST APIs | Memory Cache | JWT | Google,GitHub |
| 154 | JavaScript | MVC | EJS | MongoDB | GraphQL | None | None | None |
| 155 | JavaScript | MVC | EJS | MongoDB | GraphQL | Redis | None | None |
| 156 | JavaScript | MVC | EJS | MongoDB | GraphQL | Memory Cache | None | None |
| 157 | JavaScript | MVC | EJS | MongoDB | GraphQL | None | JWT | None |
| 158 | JavaScript | MVC | EJS | MongoDB | GraphQL | Redis | JWT | None |
| 159 | JavaScript | MVC | EJS | MongoDB | GraphQL | Memory Cache | JWT | None |
| 160 | JavaScript | MVC | EJS | MongoDB | GraphQL | None | JWT | Google,GitHub |
| 161 | JavaScript | MVC | EJS | MongoDB | GraphQL | Redis | JWT | Google,GitHub |
| 162 | JavaScript | MVC | EJS | MongoDB | GraphQL | Memory Cache | JWT | Google,GitHub |
| 163 | JavaScript | MVC | EJS | MongoDB | Kafka | None | None | None |
| 164 | JavaScript | MVC | EJS | MongoDB | Kafka | Redis | None | None |
| 165 | JavaScript | MVC | EJS | MongoDB | Kafka | Memory Cache | None | None |
| 166 | JavaScript | MVC | EJS | MongoDB | Kafka | None | JWT | None |
| 167 | JavaScript | MVC | EJS | MongoDB | Kafka | Redis | JWT | None |
| 168 | JavaScript | MVC | EJS | MongoDB | Kafka | Memory Cache | JWT | None |
| 169 | JavaScript | MVC | EJS | MongoDB | Kafka | None | JWT | Google,GitHub |
| 170 | JavaScript | MVC | EJS | MongoDB | Kafka | Redis | JWT | Google,GitHub |
| 171 | JavaScript | MVC | EJS | MongoDB | Kafka | Memory Cache | JWT | Google,GitHub |
| 172 | JavaScript | MVC | EJS | None | REST APIs | None | None | None |
| 173 | JavaScript | MVC | EJS | None | REST APIs | None | JWT | None |
| 174 | JavaScript | MVC | EJS | None | REST APIs | None | JWT | Google,GitHub |
| 175 | JavaScript | MVC | EJS | None | GraphQL | None | None | None |
| 176 | JavaScript | MVC | EJS | None | GraphQL | None | JWT | None |
| 177 | JavaScript | MVC | EJS | None | GraphQL | None | JWT | Google,GitHub |
| 178 | JavaScript | MVC | EJS | None | Kafka | None | None | None |
| 179 | JavaScript | MVC | EJS | None | Kafka | None | JWT | None |
| 180 | JavaScript | MVC | EJS | None | Kafka | None | JWT | Google,GitHub |
| 181 | JavaScript | MVC | Pug | MySQL | REST APIs | None | None | None |
| 182 | JavaScript | MVC | Pug | MySQL | REST APIs | Redis | None | None |
| 183 | JavaScript | MVC | Pug | MySQL | REST APIs | Memory Cache | None | None |
| 184 | JavaScript | MVC | Pug | MySQL | REST APIs | None | JWT | None |
| 185 | JavaScript | MVC | Pug | MySQL | REST APIs | Redis | JWT | None |
| 186 | JavaScript | MVC | Pug | MySQL | REST APIs | Memory Cache | JWT | None |
| 187 | JavaScript | MVC | Pug | MySQL | REST APIs | None | JWT | Google,GitHub |
| 188 | JavaScript | MVC | Pug | MySQL | REST APIs | Redis | JWT | Google,GitHub |
| 189 | JavaScript | MVC | Pug | MySQL | REST APIs | Memory Cache | JWT | Google,GitHub |
| 190 | JavaScript | MVC | Pug | MySQL | GraphQL | None | None | None |
| 191 | JavaScript | MVC | Pug | MySQL | GraphQL | Redis | None | None |
| 192 | JavaScript | MVC | Pug | MySQL | GraphQL | Memory Cache | None | None |
| 193 | JavaScript | MVC | Pug | MySQL | GraphQL | None | JWT | None |
| 194 | JavaScript | MVC | Pug | MySQL | GraphQL | Redis | JWT | None |
| 195 | JavaScript | MVC | Pug | MySQL | GraphQL | Memory Cache | JWT | None |
| 196 | JavaScript | MVC | Pug | MySQL | GraphQL | None | JWT | Google,GitHub |
| 197 | JavaScript | MVC | Pug | MySQL | GraphQL | Redis | JWT | Google,GitHub |
| 198 | JavaScript | MVC | Pug | MySQL | GraphQL | Memory Cache | JWT | Google,GitHub |
| 199 | JavaScript | MVC | Pug | MySQL | Kafka | None | None | None |
| 200 | JavaScript | MVC | Pug | MySQL | Kafka | Redis | None | None |
| 201 | JavaScript | MVC | Pug | MySQL | Kafka | Memory Cache | None | None |
| 202 | JavaScript | MVC | Pug | MySQL | Kafka | None | JWT | None |
| 203 | JavaScript | MVC | Pug | MySQL | Kafka | Redis | JWT | None |
| 204 | JavaScript | MVC | Pug | MySQL | Kafka | Memory Cache | JWT | None |
| 205 | JavaScript | MVC | Pug | MySQL | Kafka | None | JWT | Google,GitHub |
| 206 | JavaScript | MVC | Pug | MySQL | Kafka | Redis | JWT | Google,GitHub |
| 207 | JavaScript | MVC | Pug | MySQL | Kafka | Memory Cache | JWT | Google,GitHub |
| 208 | JavaScript | MVC | Pug | PostgreSQL | REST APIs | None | None | None |
| 209 | JavaScript | MVC | Pug | PostgreSQL | REST APIs | Redis | None | None |
| 210 | JavaScript | MVC | Pug | PostgreSQL | REST APIs | Memory Cache | None | None |
| 211 | JavaScript | MVC | Pug | PostgreSQL | REST APIs | None | JWT | None |
| 212 | JavaScript | MVC | Pug | PostgreSQL | REST APIs | Redis | JWT | None |
| 213 | JavaScript | MVC | Pug | PostgreSQL | REST APIs | Memory Cache | JWT | None |
| 214 | JavaScript | MVC | Pug | PostgreSQL | REST APIs | None | JWT | Google,GitHub |
| 215 | JavaScript | MVC | Pug | PostgreSQL | REST APIs | Redis | JWT | Google,GitHub |
| 216 | JavaScript | MVC | Pug | PostgreSQL | REST APIs | Memory Cache | JWT | Google,GitHub |
| 217 | JavaScript | MVC | Pug | PostgreSQL | GraphQL | None | None | None |
| 218 | JavaScript | MVC | Pug | PostgreSQL | GraphQL | Redis | None | None |
| 219 | JavaScript | MVC | Pug | PostgreSQL | GraphQL | Memory Cache | None | None |
| 220 | JavaScript | MVC | Pug | PostgreSQL | GraphQL | None | JWT | None |
| 221 | JavaScript | MVC | Pug | PostgreSQL | GraphQL | Redis | JWT | None |
| 222 | JavaScript | MVC | Pug | PostgreSQL | GraphQL | Memory Cache | JWT | None |
| 223 | JavaScript | MVC | Pug | PostgreSQL | GraphQL | None | JWT | Google,GitHub |
| 224 | JavaScript | MVC | Pug | PostgreSQL | GraphQL | Redis | JWT | Google,GitHub |
| 225 | JavaScript | MVC | Pug | PostgreSQL | GraphQL | Memory Cache | JWT | Google,GitHub |
| 226 | JavaScript | MVC | Pug | PostgreSQL | Kafka | None | None | None |
| 227 | JavaScript | MVC | Pug | PostgreSQL | Kafka | Redis | None | None |
| 228 | JavaScript | MVC | Pug | PostgreSQL | Kafka | Memory Cache | None | None |
| 229 | JavaScript | MVC | Pug | PostgreSQL | Kafka | None | JWT | None |
| 230 | JavaScript | MVC | Pug | PostgreSQL | Kafka | Redis | JWT | None |
| 231 | JavaScript | MVC | Pug | PostgreSQL | Kafka | Memory Cache | JWT | None |
| 232 | JavaScript | MVC | Pug | PostgreSQL | Kafka | None | JWT | Google,GitHub |
| 233 | JavaScript | MVC | Pug | PostgreSQL | Kafka | Redis | JWT | Google,GitHub |
| 234 | JavaScript | MVC | Pug | PostgreSQL | Kafka | Memory Cache | JWT | Google,GitHub |
| 235 | JavaScript | MVC | Pug | MongoDB | REST APIs | None | None | None |
| 236 | JavaScript | MVC | Pug | MongoDB | REST APIs | Redis | None | None |
| 237 | JavaScript | MVC | Pug | MongoDB | REST APIs | Memory Cache | None | None |
| 238 | JavaScript | MVC | Pug | MongoDB | REST APIs | None | JWT | None |
| 239 | JavaScript | MVC | Pug | MongoDB | REST APIs | Redis | JWT | None |
| 240 | JavaScript | MVC | Pug | MongoDB | REST APIs | Memory Cache | JWT | None |
| 241 | JavaScript | MVC | Pug | MongoDB | REST APIs | None | JWT | Google,GitHub |
| 242 | JavaScript | MVC | Pug | MongoDB | REST APIs | Redis | JWT | Google,GitHub |
| 243 | JavaScript | MVC | Pug | MongoDB | REST APIs | Memory Cache | JWT | Google,GitHub |
| 244 | JavaScript | MVC | Pug | MongoDB | GraphQL | None | None | None |
| 245 | JavaScript | MVC | Pug | MongoDB | GraphQL | Redis | None | None |
| 246 | JavaScript | MVC | Pug | MongoDB | GraphQL | Memory Cache | None | None |
| 247 | JavaScript | MVC | Pug | MongoDB | GraphQL | None | JWT | None |
| 248 | JavaScript | MVC | Pug | MongoDB | GraphQL | Redis | JWT | None |
| 249 | JavaScript | MVC | Pug | MongoDB | GraphQL | Memory Cache | JWT | None |
| 250 | JavaScript | MVC | Pug | MongoDB | GraphQL | None | JWT | Google,GitHub |
| 251 | JavaScript | MVC | Pug | MongoDB | GraphQL | Redis | JWT | Google,GitHub |
| 252 | JavaScript | MVC | Pug | MongoDB | GraphQL | Memory Cache | JWT | Google,GitHub |
| 253 | JavaScript | MVC | Pug | MongoDB | Kafka | None | None | None |
| 254 | JavaScript | MVC | Pug | MongoDB | Kafka | Redis | None | None |
| 255 | JavaScript | MVC | Pug | MongoDB | Kafka | Memory Cache | None | None |
| 256 | JavaScript | MVC | Pug | MongoDB | Kafka | None | JWT | None |
| 257 | JavaScript | MVC | Pug | MongoDB | Kafka | Redis | JWT | None |
| 258 | JavaScript | MVC | Pug | MongoDB | Kafka | Memory Cache | JWT | None |
| 259 | JavaScript | MVC | Pug | MongoDB | Kafka | None | JWT | Google,GitHub |
| 260 | JavaScript | MVC | Pug | MongoDB | Kafka | Redis | JWT | Google,GitHub |
| 261 | JavaScript | MVC | Pug | MongoDB | Kafka | Memory Cache | JWT | Google,GitHub |
| 262 | JavaScript | MVC | Pug | None | REST APIs | None | None | None |
| 263 | JavaScript | MVC | Pug | None | REST APIs | None | JWT | None |
| 264 | JavaScript | MVC | Pug | None | REST APIs | None | JWT | Google,GitHub |
| 265 | JavaScript | MVC | Pug | None | GraphQL | None | None | None |
| 266 | JavaScript | MVC | Pug | None | GraphQL | None | JWT | None |
| 267 | JavaScript | MVC | Pug | None | GraphQL | None | JWT | Google,GitHub |
| 268 | JavaScript | MVC | Pug | None | Kafka | None | None | None |
| 269 | JavaScript | MVC | Pug | None | Kafka | None | JWT | None |
| 270 | JavaScript | MVC | Pug | None | Kafka | None | JWT | Google,GitHub |
| 271 | TypeScript | MVC | None | MySQL | REST APIs | None | None | None |
| 272 | TypeScript | MVC | None | MySQL | REST APIs | Redis | None | None |
| 273 | TypeScript | MVC | None | MySQL | REST APIs | Memory Cache | None | None |
| 274 | TypeScript | MVC | None | MySQL | REST APIs | None | JWT | None |
| 275 | TypeScript | MVC | None | MySQL | REST APIs | Redis | JWT | None |
| 276 | TypeScript | MVC | None | MySQL | REST APIs | Memory Cache | JWT | None |
| 277 | TypeScript | MVC | None | MySQL | REST APIs | None | JWT | Google,GitHub |
| 278 | TypeScript | MVC | None | MySQL | REST APIs | Redis | JWT | Google,GitHub |
| 279 | TypeScript | MVC | None | MySQL | REST APIs | Memory Cache | JWT | Google,GitHub |
| 280 | TypeScript | MVC | None | MySQL | GraphQL | None | None | None |
| 281 | TypeScript | MVC | None | MySQL | GraphQL | Redis | None | None |
| 282 | TypeScript | MVC | None | MySQL | GraphQL | Memory Cache | None | None |
| 283 | TypeScript | MVC | None | MySQL | GraphQL | None | JWT | None |
| 284 | TypeScript | MVC | None | MySQL | GraphQL | Redis | JWT | None |
| 285 | TypeScript | MVC | None | MySQL | GraphQL | Memory Cache | JWT | None |
| 286 | TypeScript | MVC | None | MySQL | GraphQL | None | JWT | Google,GitHub |
| 287 | TypeScript | MVC | None | MySQL | GraphQL | Redis | JWT | Google,GitHub |
| 288 | TypeScript | MVC | None | MySQL | GraphQL | Memory Cache | JWT | Google,GitHub |
| 289 | TypeScript | MVC | None | MySQL | Kafka | None | None | None |
| 290 | TypeScript | MVC | None | MySQL | Kafka | Redis | None | None |
| 291 | TypeScript | MVC | None | MySQL | Kafka | Memory Cache | None | None |
| 292 | TypeScript | MVC | None | MySQL | Kafka | None | JWT | None |
| 293 | TypeScript | MVC | None | MySQL | Kafka | Redis | JWT | None |
| 294 | TypeScript | MVC | None | MySQL | Kafka | Memory Cache | JWT | None |
| 295 | TypeScript | MVC | None | MySQL | Kafka | None | JWT | Google,GitHub |
| 296 | TypeScript | MVC | None | MySQL | Kafka | Redis | JWT | Google,GitHub |
| 297 | TypeScript | MVC | None | MySQL | Kafka | Memory Cache | JWT | Google,GitHub |
| 298 | TypeScript | MVC | None | PostgreSQL | REST APIs | None | None | None |
| 299 | TypeScript | MVC | None | PostgreSQL | REST APIs | Redis | None | None |
| 300 | TypeScript | MVC | None | PostgreSQL | REST APIs | Memory Cache | None | None |
| 301 | TypeScript | MVC | None | PostgreSQL | REST APIs | None | JWT | None |
| 302 | TypeScript | MVC | None | PostgreSQL | REST APIs | Redis | JWT | None |
| 303 | TypeScript | MVC | None | PostgreSQL | REST APIs | Memory Cache | JWT | None |
| 304 | TypeScript | MVC | None | PostgreSQL | REST APIs | None | JWT | Google,GitHub |
| 305 | TypeScript | MVC | None | PostgreSQL | REST APIs | Redis | JWT | Google,GitHub |
| 306 | TypeScript | MVC | None | PostgreSQL | REST APIs | Memory Cache | JWT | Google,GitHub |
| 307 | TypeScript | MVC | None | PostgreSQL | GraphQL | None | None | None |
| 308 | TypeScript | MVC | None | PostgreSQL | GraphQL | Redis | None | None |
| 309 | TypeScript | MVC | None | PostgreSQL | GraphQL | Memory Cache | None | None |
| 310 | TypeScript | MVC | None | PostgreSQL | GraphQL | None | JWT | None |
| 311 | TypeScript | MVC | None | PostgreSQL | GraphQL | Redis | JWT | None |
| 312 | TypeScript | MVC | None | PostgreSQL | GraphQL | Memory Cache | JWT | None |
| 313 | TypeScript | MVC | None | PostgreSQL | GraphQL | None | JWT | Google,GitHub |
| 314 | TypeScript | MVC | None | PostgreSQL | GraphQL | Redis | JWT | Google,GitHub |
| 315 | TypeScript | MVC | None | PostgreSQL | GraphQL | Memory Cache | JWT | Google,GitHub |
| 316 | TypeScript | MVC | None | PostgreSQL | Kafka | None | None | None |
| 317 | TypeScript | MVC | None | PostgreSQL | Kafka | Redis | None | None |
| 318 | TypeScript | MVC | None | PostgreSQL | Kafka | Memory Cache | None | None |
| 319 | TypeScript | MVC | None | PostgreSQL | Kafka | None | JWT | None |
| 320 | TypeScript | MVC | None | PostgreSQL | Kafka | Redis | JWT | None |
| 321 | TypeScript | MVC | None | PostgreSQL | Kafka | Memory Cache | JWT | None |
| 322 | TypeScript | MVC | None | PostgreSQL | Kafka | None | JWT | Google,GitHub |
| 323 | TypeScript | MVC | None | PostgreSQL | Kafka | Redis | JWT | Google,GitHub |
| 324 | TypeScript | MVC | None | PostgreSQL | Kafka | Memory Cache | JWT | Google,GitHub |
| 325 | TypeScript | MVC | None | MongoDB | REST APIs | None | None | None |
| 326 | TypeScript | MVC | None | MongoDB | REST APIs | Redis | None | None |
| 327 | TypeScript | MVC | None | MongoDB | REST APIs | Memory Cache | None | None |
| 328 | TypeScript | MVC | None | MongoDB | REST APIs | None | JWT | None |
| 329 | TypeScript | MVC | None | MongoDB | REST APIs | Redis | JWT | None |
| 330 | TypeScript | MVC | None | MongoDB | REST APIs | Memory Cache | JWT | None |
| 331 | TypeScript | MVC | None | MongoDB | REST APIs | None | JWT | Google,GitHub |
| 332 | TypeScript | MVC | None | MongoDB | REST APIs | Redis | JWT | Google,GitHub |
| 333 | TypeScript | MVC | None | MongoDB | REST APIs | Memory Cache | JWT | Google,GitHub |
| 334 | TypeScript | MVC | None | MongoDB | GraphQL | None | None | None |
| 335 | TypeScript | MVC | None | MongoDB | GraphQL | Redis | None | None |
| 336 | TypeScript | MVC | None | MongoDB | GraphQL | Memory Cache | None | None |
| 337 | TypeScript | MVC | None | MongoDB | GraphQL | None | JWT | None |
| 338 | TypeScript | MVC | None | MongoDB | GraphQL | Redis | JWT | None |
| 339 | TypeScript | MVC | None | MongoDB | GraphQL | Memory Cache | JWT | None |
| 340 | TypeScript | MVC | None | MongoDB | GraphQL | None | JWT | Google,GitHub |
| 341 | TypeScript | MVC | None | MongoDB | GraphQL | Redis | JWT | Google,GitHub |
| 342 | TypeScript | MVC | None | MongoDB | GraphQL | Memory Cache | JWT | Google,GitHub |
| 343 | TypeScript | MVC | None | MongoDB | Kafka | None | None | None |
| 344 | TypeScript | MVC | None | MongoDB | Kafka | Redis | None | None |
| 345 | TypeScript | MVC | None | MongoDB | Kafka | Memory Cache | None | None |
| 346 | TypeScript | MVC | None | MongoDB | Kafka | None | JWT | None |
| 347 | TypeScript | MVC | None | MongoDB | Kafka | Redis | JWT | None |
| 348 | TypeScript | MVC | None | MongoDB | Kafka | Memory Cache | JWT | None |
| 349 | TypeScript | MVC | None | MongoDB | Kafka | None | JWT | Google,GitHub |
| 350 | TypeScript | MVC | None | MongoDB | Kafka | Redis | JWT | Google,GitHub |
| 351 | TypeScript | MVC | None | MongoDB | Kafka | Memory Cache | JWT | Google,GitHub |
| 352 | TypeScript | MVC | None | None | REST APIs | None | None | None |
| 353 | TypeScript | MVC | None | None | REST APIs | None | JWT | None |
| 354 | TypeScript | MVC | None | None | REST APIs | None | JWT | Google,GitHub |
| 355 | TypeScript | MVC | None | None | GraphQL | None | None | None |
| 356 | TypeScript | MVC | None | None | GraphQL | None | JWT | None |
| 357 | TypeScript | MVC | None | None | GraphQL | None | JWT | Google,GitHub |
| 358 | TypeScript | MVC | None | None | Kafka | None | None | None |
| 359 | TypeScript | MVC | None | None | Kafka | None | JWT | None |
| 360 | TypeScript | MVC | None | None | Kafka | None | JWT | Google,GitHub |
| 361 | TypeScript | MVC | EJS | MySQL | REST APIs | None | None | None |
| 362 | TypeScript | MVC | EJS | MySQL | REST APIs | Redis | None | None |
| 363 | TypeScript | MVC | EJS | MySQL | REST APIs | Memory Cache | None | None |
| 364 | TypeScript | MVC | EJS | MySQL | REST APIs | None | JWT | None |
| 365 | TypeScript | MVC | EJS | MySQL | REST APIs | Redis | JWT | None |
| 366 | TypeScript | MVC | EJS | MySQL | REST APIs | Memory Cache | JWT | None |
| 367 | TypeScript | MVC | EJS | MySQL | REST APIs | None | JWT | Google,GitHub |
| 368 | TypeScript | MVC | EJS | MySQL | REST APIs | Redis | JWT | Google,GitHub |
| 369 | TypeScript | MVC | EJS | MySQL | REST APIs | Memory Cache | JWT | Google,GitHub |
| 370 | TypeScript | MVC | EJS | MySQL | GraphQL | None | None | None |
| 371 | TypeScript | MVC | EJS | MySQL | GraphQL | Redis | None | None |
| 372 | TypeScript | MVC | EJS | MySQL | GraphQL | Memory Cache | None | None |
| 373 | TypeScript | MVC | EJS | MySQL | GraphQL | None | JWT | None |
| 374 | TypeScript | MVC | EJS | MySQL | GraphQL | Redis | JWT | None |
| 375 | TypeScript | MVC | EJS | MySQL | GraphQL | Memory Cache | JWT | None |
| 376 | TypeScript | MVC | EJS | MySQL | GraphQL | None | JWT | Google,GitHub |
| 377 | TypeScript | MVC | EJS | MySQL | GraphQL | Redis | JWT | Google,GitHub |
| 378 | TypeScript | MVC | EJS | MySQL | GraphQL | Memory Cache | JWT | Google,GitHub |
| 379 | TypeScript | MVC | EJS | MySQL | Kafka | None | None | None |
| 380 | TypeScript | MVC | EJS | MySQL | Kafka | Redis | None | None |
| 381 | TypeScript | MVC | EJS | MySQL | Kafka | Memory Cache | None | None |
| 382 | TypeScript | MVC | EJS | MySQL | Kafka | None | JWT | None |
| 383 | TypeScript | MVC | EJS | MySQL | Kafka | Redis | JWT | None |
| 384 | TypeScript | MVC | EJS | MySQL | Kafka | Memory Cache | JWT | None |
| 385 | TypeScript | MVC | EJS | MySQL | Kafka | None | JWT | Google,GitHub |
| 386 | TypeScript | MVC | EJS | MySQL | Kafka | Redis | JWT | Google,GitHub |
| 387 | TypeScript | MVC | EJS | MySQL | Kafka | Memory Cache | JWT | Google,GitHub |
| 388 | TypeScript | MVC | EJS | PostgreSQL | REST APIs | None | None | None |
| 389 | TypeScript | MVC | EJS | PostgreSQL | REST APIs | Redis | None | None |
| 390 | TypeScript | MVC | EJS | PostgreSQL | REST APIs | Memory Cache | None | None |
| 391 | TypeScript | MVC | EJS | PostgreSQL | REST APIs | None | JWT | None |
| 392 | TypeScript | MVC | EJS | PostgreSQL | REST APIs | Redis | JWT | None |
| 393 | TypeScript | MVC | EJS | PostgreSQL | REST APIs | Memory Cache | JWT | None |
| 394 | TypeScript | MVC | EJS | PostgreSQL | REST APIs | None | JWT | Google,GitHub |
| 395 | TypeScript | MVC | EJS | PostgreSQL | REST APIs | Redis | JWT | Google,GitHub |
| 396 | TypeScript | MVC | EJS | PostgreSQL | REST APIs | Memory Cache | JWT | Google,GitHub |
| 397 | TypeScript | MVC | EJS | PostgreSQL | GraphQL | None | None | None |
| 398 | TypeScript | MVC | EJS | PostgreSQL | GraphQL | Redis | None | None |
| 399 | TypeScript | MVC | EJS | PostgreSQL | GraphQL | Memory Cache | None | None |
| 400 | TypeScript | MVC | EJS | PostgreSQL | GraphQL | None | JWT | None |
| 401 | TypeScript | MVC | EJS | PostgreSQL | GraphQL | Redis | JWT | None |
| 402 | TypeScript | MVC | EJS | PostgreSQL | GraphQL | Memory Cache | JWT | None |
| 403 | TypeScript | MVC | EJS | PostgreSQL | GraphQL | None | JWT | Google,GitHub |
| 404 | TypeScript | MVC | EJS | PostgreSQL | GraphQL | Redis | JWT | Google,GitHub |
| 405 | TypeScript | MVC | EJS | PostgreSQL | GraphQL | Memory Cache | JWT | Google,GitHub |
| 406 | TypeScript | MVC | EJS | PostgreSQL | Kafka | None | None | None |
| 407 | TypeScript | MVC | EJS | PostgreSQL | Kafka | Redis | None | None |
| 408 | TypeScript | MVC | EJS | PostgreSQL | Kafka | Memory Cache | None | None |
| 409 | TypeScript | MVC | EJS | PostgreSQL | Kafka | None | JWT | None |
| 410 | TypeScript | MVC | EJS | PostgreSQL | Kafka | Redis | JWT | None |
| 411 | TypeScript | MVC | EJS | PostgreSQL | Kafka | Memory Cache | JWT | None |
| 412 | TypeScript | MVC | EJS | PostgreSQL | Kafka | None | JWT | Google,GitHub |
| 413 | TypeScript | MVC | EJS | PostgreSQL | Kafka | Redis | JWT | Google,GitHub |
| 414 | TypeScript | MVC | EJS | PostgreSQL | Kafka | Memory Cache | JWT | Google,GitHub |
| 415 | TypeScript | MVC | EJS | MongoDB | REST APIs | None | None | None |
| 416 | TypeScript | MVC | EJS | MongoDB | REST APIs | Redis | None | None |
| 417 | TypeScript | MVC | EJS | MongoDB | REST APIs | Memory Cache | None | None |
| 418 | TypeScript | MVC | EJS | MongoDB | REST APIs | None | JWT | None |
| 419 | TypeScript | MVC | EJS | MongoDB | REST APIs | Redis | JWT | None |
| 420 | TypeScript | MVC | EJS | MongoDB | REST APIs | Memory Cache | JWT | None |
| 421 | TypeScript | MVC | EJS | MongoDB | REST APIs | None | JWT | Google,GitHub |
| 422 | TypeScript | MVC | EJS | MongoDB | REST APIs | Redis | JWT | Google,GitHub |
| 423 | TypeScript | MVC | EJS | MongoDB | REST APIs | Memory Cache | JWT | Google,GitHub |
| 424 | TypeScript | MVC | EJS | MongoDB | GraphQL | None | None | None |
| 425 | TypeScript | MVC | EJS | MongoDB | GraphQL | Redis | None | None |
| 426 | TypeScript | MVC | EJS | MongoDB | GraphQL | Memory Cache | None | None |
| 427 | TypeScript | MVC | EJS | MongoDB | GraphQL | None | JWT | None |
| 428 | TypeScript | MVC | EJS | MongoDB | GraphQL | Redis | JWT | None |
| 429 | TypeScript | MVC | EJS | MongoDB | GraphQL | Memory Cache | JWT | None |
| 430 | TypeScript | MVC | EJS | MongoDB | GraphQL | None | JWT | Google,GitHub |
| 431 | TypeScript | MVC | EJS | MongoDB | GraphQL | Redis | JWT | Google,GitHub |
| 432 | TypeScript | MVC | EJS | MongoDB | GraphQL | Memory Cache | JWT | Google,GitHub |
| 433 | TypeScript | MVC | EJS | MongoDB | Kafka | None | None | None |
| 434 | TypeScript | MVC | EJS | MongoDB | Kafka | Redis | None | None |
| 435 | TypeScript | MVC | EJS | MongoDB | Kafka | Memory Cache | None | None |
| 436 | TypeScript | MVC | EJS | MongoDB | Kafka | None | JWT | None |
| 437 | TypeScript | MVC | EJS | MongoDB | Kafka | Redis | JWT | None |
| 438 | TypeScript | MVC | EJS | MongoDB | Kafka | Memory Cache | JWT | None |
| 439 | TypeScript | MVC | EJS | MongoDB | Kafka | None | JWT | Google,GitHub |
| 440 | TypeScript | MVC | EJS | MongoDB | Kafka | Redis | JWT | Google,GitHub |
| 441 | TypeScript | MVC | EJS | MongoDB | Kafka | Memory Cache | JWT | Google,GitHub |
| 442 | TypeScript | MVC | EJS | None | REST APIs | None | None | None |
| 443 | TypeScript | MVC | EJS | None | REST APIs | None | JWT | None |
| 444 | TypeScript | MVC | EJS | None | REST APIs | None | JWT | Google,GitHub |
| 445 | TypeScript | MVC | EJS | None | GraphQL | None | None | None |
| 446 | TypeScript | MVC | EJS | None | GraphQL | None | JWT | None |
| 447 | TypeScript | MVC | EJS | None | GraphQL | None | JWT | Google,GitHub |
| 448 | TypeScript | MVC | EJS | None | Kafka | None | None | None |
| 449 | TypeScript | MVC | EJS | None | Kafka | None | JWT | None |
| 450 | TypeScript | MVC | EJS | None | Kafka | None | JWT | Google,GitHub |
| 451 | TypeScript | MVC | Pug | MySQL | REST APIs | None | None | None |
| 452 | TypeScript | MVC | Pug | MySQL | REST APIs | Redis | None | None |
| 453 | TypeScript | MVC | Pug | MySQL | REST APIs | Memory Cache | None | None |
| 454 | TypeScript | MVC | Pug | MySQL | REST APIs | None | JWT | None |
| 455 | TypeScript | MVC | Pug | MySQL | REST APIs | Redis | JWT | None |
| 456 | TypeScript | MVC | Pug | MySQL | REST APIs | Memory Cache | JWT | None |
| 457 | TypeScript | MVC | Pug | MySQL | REST APIs | None | JWT | Google,GitHub |
| 458 | TypeScript | MVC | Pug | MySQL | REST APIs | Redis | JWT | Google,GitHub |
| 459 | TypeScript | MVC | Pug | MySQL | REST APIs | Memory Cache | JWT | Google,GitHub |
| 460 | TypeScript | MVC | Pug | MySQL | GraphQL | None | None | None |
| 461 | TypeScript | MVC | Pug | MySQL | GraphQL | Redis | None | None |
| 462 | TypeScript | MVC | Pug | MySQL | GraphQL | Memory Cache | None | None |
| 463 | TypeScript | MVC | Pug | MySQL | GraphQL | None | JWT | None |
| 464 | TypeScript | MVC | Pug | MySQL | GraphQL | Redis | JWT | None |
| 465 | TypeScript | MVC | Pug | MySQL | GraphQL | Memory Cache | JWT | None |
| 466 | TypeScript | MVC | Pug | MySQL | GraphQL | None | JWT | Google,GitHub |
| 467 | TypeScript | MVC | Pug | MySQL | GraphQL | Redis | JWT | Google,GitHub |
| 468 | TypeScript | MVC | Pug | MySQL | GraphQL | Memory Cache | JWT | Google,GitHub |
| 469 | TypeScript | MVC | Pug | MySQL | Kafka | None | None | None |
| 470 | TypeScript | MVC | Pug | MySQL | Kafka | Redis | None | None |
| 471 | TypeScript | MVC | Pug | MySQL | Kafka | Memory Cache | None | None |
| 472 | TypeScript | MVC | Pug | MySQL | Kafka | None | JWT | None |
| 473 | TypeScript | MVC | Pug | MySQL | Kafka | Redis | JWT | None |
| 474 | TypeScript | MVC | Pug | MySQL | Kafka | Memory Cache | JWT | None |
| 475 | TypeScript | MVC | Pug | MySQL | Kafka | None | JWT | Google,GitHub |
| 476 | TypeScript | MVC | Pug | MySQL | Kafka | Redis | JWT | Google,GitHub |
| 477 | TypeScript | MVC | Pug | MySQL | Kafka | Memory Cache | JWT | Google,GitHub |
| 478 | TypeScript | MVC | Pug | PostgreSQL | REST APIs | None | None | None |
| 479 | TypeScript | MVC | Pug | PostgreSQL | REST APIs | Redis | None | None |
| 480 | TypeScript | MVC | Pug | PostgreSQL | REST APIs | Memory Cache | None | None |
| 481 | TypeScript | MVC | Pug | PostgreSQL | REST APIs | None | JWT | None |
| 482 | TypeScript | MVC | Pug | PostgreSQL | REST APIs | Redis | JWT | None |
| 483 | TypeScript | MVC | Pug | PostgreSQL | REST APIs | Memory Cache | JWT | None |
| 484 | TypeScript | MVC | Pug | PostgreSQL | REST APIs | None | JWT | Google,GitHub |
| 485 | TypeScript | MVC | Pug | PostgreSQL | REST APIs | Redis | JWT | Google,GitHub |
| 486 | TypeScript | MVC | Pug | PostgreSQL | REST APIs | Memory Cache | JWT | Google,GitHub |
| 487 | TypeScript | MVC | Pug | PostgreSQL | GraphQL | None | None | None |
| 488 | TypeScript | MVC | Pug | PostgreSQL | GraphQL | Redis | None | None |
| 489 | TypeScript | MVC | Pug | PostgreSQL | GraphQL | Memory Cache | None | None |
| 490 | TypeScript | MVC | Pug | PostgreSQL | GraphQL | None | JWT | None |
| 491 | TypeScript | MVC | Pug | PostgreSQL | GraphQL | Redis | JWT | None |
| 492 | TypeScript | MVC | Pug | PostgreSQL | GraphQL | Memory Cache | JWT | None |
| 493 | TypeScript | MVC | Pug | PostgreSQL | GraphQL | None | JWT | Google,GitHub |
| 494 | TypeScript | MVC | Pug | PostgreSQL | GraphQL | Redis | JWT | Google,GitHub |
| 495 | TypeScript | MVC | Pug | PostgreSQL | GraphQL | Memory Cache | JWT | Google,GitHub |
| 496 | TypeScript | MVC | Pug | PostgreSQL | Kafka | None | None | None |
| 497 | TypeScript | MVC | Pug | PostgreSQL | Kafka | Redis | None | None |
| 498 | TypeScript | MVC | Pug | PostgreSQL | Kafka | Memory Cache | None | None |
| 499 | TypeScript | MVC | Pug | PostgreSQL | Kafka | None | JWT | None |
| 500 | TypeScript | MVC | Pug | PostgreSQL | Kafka | Redis | JWT | None |
| 501 | TypeScript | MVC | Pug | PostgreSQL | Kafka | Memory Cache | JWT | None |
| 502 | TypeScript | MVC | Pug | PostgreSQL | Kafka | None | JWT | Google,GitHub |
| 503 | TypeScript | MVC | Pug | PostgreSQL | Kafka | Redis | JWT | Google,GitHub |
| 504 | TypeScript | MVC | Pug | PostgreSQL | Kafka | Memory Cache | JWT | Google,GitHub |
| 505 | TypeScript | MVC | Pug | MongoDB | REST APIs | None | None | None |
| 506 | TypeScript | MVC | Pug | MongoDB | REST APIs | Redis | None | None |
| 507 | TypeScript | MVC | Pug | MongoDB | REST APIs | Memory Cache | None | None |
| 508 | TypeScript | MVC | Pug | MongoDB | REST APIs | None | JWT | None |
| 509 | TypeScript | MVC | Pug | MongoDB | REST APIs | Redis | JWT | None |
| 510 | TypeScript | MVC | Pug | MongoDB | REST APIs | Memory Cache | JWT | None |
| 511 | TypeScript | MVC | Pug | MongoDB | REST APIs | None | JWT | Google,GitHub |
| 512 | TypeScript | MVC | Pug | MongoDB | REST APIs | Redis | JWT | Google,GitHub |
| 513 | TypeScript | MVC | Pug | MongoDB | REST APIs | Memory Cache | JWT | Google,GitHub |
| 514 | TypeScript | MVC | Pug | MongoDB | GraphQL | None | None | None |
| 515 | TypeScript | MVC | Pug | MongoDB | GraphQL | Redis | None | None |
| 516 | TypeScript | MVC | Pug | MongoDB | GraphQL | Memory Cache | None | None |
| 517 | TypeScript | MVC | Pug | MongoDB | GraphQL | None | JWT | None |
| 518 | TypeScript | MVC | Pug | MongoDB | GraphQL | Redis | JWT | None |
| 519 | TypeScript | MVC | Pug | MongoDB | GraphQL | Memory Cache | JWT | None |
| 520 | TypeScript | MVC | Pug | MongoDB | GraphQL | None | JWT | Google,GitHub |
| 521 | TypeScript | MVC | Pug | MongoDB | GraphQL | Redis | JWT | Google,GitHub |
| 522 | TypeScript | MVC | Pug | MongoDB | GraphQL | Memory Cache | JWT | Google,GitHub |
| 523 | TypeScript | MVC | Pug | MongoDB | Kafka | None | None | None |
| 524 | TypeScript | MVC | Pug | MongoDB | Kafka | Redis | None | None |
| 525 | TypeScript | MVC | Pug | MongoDB | Kafka | Memory Cache | None | None |
| 526 | TypeScript | MVC | Pug | MongoDB | Kafka | None | JWT | None |
| 527 | TypeScript | MVC | Pug | MongoDB | Kafka | Redis | JWT | None |
| 528 | TypeScript | MVC | Pug | MongoDB | Kafka | Memory Cache | JWT | None |
| 529 | TypeScript | MVC | Pug | MongoDB | Kafka | None | JWT | Google,GitHub |
| 530 | TypeScript | MVC | Pug | MongoDB | Kafka | Redis | JWT | Google,GitHub |
| 531 | TypeScript | MVC | Pug | MongoDB | Kafka | Memory Cache | JWT | Google,GitHub |
| 532 | TypeScript | MVC | Pug | None | REST APIs | None | None | None |
| 533 | TypeScript | MVC | Pug | None | REST APIs | None | JWT | None |
| 534 | TypeScript | MVC | Pug | None | REST APIs | None | JWT | Google,GitHub |
| 535 | TypeScript | MVC | Pug | None | GraphQL | None | None | None |
| 536 | TypeScript | MVC | Pug | None | GraphQL | None | JWT | None |
| 537 | TypeScript | MVC | Pug | None | GraphQL | None | JWT | Google,GitHub |
| 538 | TypeScript | MVC | Pug | None | Kafka | None | None | None |
| 539 | TypeScript | MVC | Pug | None | Kafka | None | JWT | None |
| 540 | TypeScript | MVC | Pug | None | Kafka | None | JWT | Google,GitHub |

## 2. Clean Architecture (180 Cases)
*Note: Clean Architecture does not use server-side view engines (EJS/Pug).*

| # | Language | Architecture | View Engine | Database | Communication | Caching | Auth | Social Auth |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |

| 541 | JavaScript | Clean Architecture | N/A | MySQL | REST APIs | None | None | None |
| 542 | JavaScript | Clean Architecture | N/A | MySQL | REST APIs | Redis | None | None |
| 543 | JavaScript | Clean Architecture | N/A | MySQL | REST APIs | Memory Cache | None | None |
| 544 | JavaScript | Clean Architecture | N/A | MySQL | REST APIs | None | JWT | None |
| 545 | JavaScript | Clean Architecture | N/A | MySQL | REST APIs | Redis | JWT | None |
| 546 | JavaScript | Clean Architecture | N/A | MySQL | REST APIs | Memory Cache | JWT | None |
| 547 | JavaScript | Clean Architecture | N/A | MySQL | REST APIs | None | JWT | Google,GitHub |
| 548 | JavaScript | Clean Architecture | N/A | MySQL | REST APIs | Redis | JWT | Google,GitHub |
| 549 | JavaScript | Clean Architecture | N/A | MySQL | REST APIs | Memory Cache | JWT | Google,GitHub |
| 550 | JavaScript | Clean Architecture | N/A | MySQL | GraphQL | None | None | None |
| 551 | JavaScript | Clean Architecture | N/A | MySQL | GraphQL | Redis | None | None |
| 552 | JavaScript | Clean Architecture | N/A | MySQL | GraphQL | Memory Cache | None | None |
| 553 | JavaScript | Clean Architecture | N/A | MySQL | GraphQL | None | JWT | None |
| 554 | JavaScript | Clean Architecture | N/A | MySQL | GraphQL | Redis | JWT | None |
| 555 | JavaScript | Clean Architecture | N/A | MySQL | GraphQL | Memory Cache | JWT | None |
| 556 | JavaScript | Clean Architecture | N/A | MySQL | GraphQL | None | JWT | Google,GitHub |
| 557 | JavaScript | Clean Architecture | N/A | MySQL | GraphQL | Redis | JWT | Google,GitHub |
| 558 | JavaScript | Clean Architecture | N/A | MySQL | GraphQL | Memory Cache | JWT | Google,GitHub |
| 559 | JavaScript | Clean Architecture | N/A | MySQL | Kafka | None | None | None |
| 560 | JavaScript | Clean Architecture | N/A | MySQL | Kafka | Redis | None | None |
| 561 | JavaScript | Clean Architecture | N/A | MySQL | Kafka | Memory Cache | None | None |
| 562 | JavaScript | Clean Architecture | N/A | MySQL | Kafka | None | JWT | None |
| 563 | JavaScript | Clean Architecture | N/A | MySQL | Kafka | Redis | JWT | None |
| 564 | JavaScript | Clean Architecture | N/A | MySQL | Kafka | Memory Cache | JWT | None |
| 565 | JavaScript | Clean Architecture | N/A | MySQL | Kafka | None | JWT | Google,GitHub |
| 566 | JavaScript | Clean Architecture | N/A | MySQL | Kafka | Redis | JWT | Google,GitHub |
| 567 | JavaScript | Clean Architecture | N/A | MySQL | Kafka | Memory Cache | JWT | Google,GitHub |
| 568 | JavaScript | Clean Architecture | N/A | PostgreSQL | REST APIs | None | None | None |
| 569 | JavaScript | Clean Architecture | N/A | PostgreSQL | REST APIs | Redis | None | None |
| 570 | JavaScript | Clean Architecture | N/A | PostgreSQL | REST APIs | Memory Cache | None | None |
| 571 | JavaScript | Clean Architecture | N/A | PostgreSQL | REST APIs | None | JWT | None |
| 572 | JavaScript | Clean Architecture | N/A | PostgreSQL | REST APIs | Redis | JWT | None |
| 573 | JavaScript | Clean Architecture | N/A | PostgreSQL | REST APIs | Memory Cache | JWT | None |
| 574 | JavaScript | Clean Architecture | N/A | PostgreSQL | REST APIs | None | JWT | Google,GitHub |
| 575 | JavaScript | Clean Architecture | N/A | PostgreSQL | REST APIs | Redis | JWT | Google,GitHub |
| 576 | JavaScript | Clean Architecture | N/A | PostgreSQL | REST APIs | Memory Cache | JWT | Google,GitHub |
| 577 | JavaScript | Clean Architecture | N/A | PostgreSQL | GraphQL | None | None | None |
| 578 | JavaScript | Clean Architecture | N/A | PostgreSQL | GraphQL | Redis | None | None |
| 579 | JavaScript | Clean Architecture | N/A | PostgreSQL | GraphQL | Memory Cache | None | None |
| 580 | JavaScript | Clean Architecture | N/A | PostgreSQL | GraphQL | None | JWT | None |
| 581 | JavaScript | Clean Architecture | N/A | PostgreSQL | GraphQL | Redis | JWT | None |
| 582 | JavaScript | Clean Architecture | N/A | PostgreSQL | GraphQL | Memory Cache | JWT | None |
| 583 | JavaScript | Clean Architecture | N/A | PostgreSQL | GraphQL | None | JWT | Google,GitHub |
| 584 | JavaScript | Clean Architecture | N/A | PostgreSQL | GraphQL | Redis | JWT | Google,GitHub |
| 585 | JavaScript | Clean Architecture | N/A | PostgreSQL | GraphQL | Memory Cache | JWT | Google,GitHub |
| 586 | JavaScript | Clean Architecture | N/A | PostgreSQL | Kafka | None | None | None |
| 587 | JavaScript | Clean Architecture | N/A | PostgreSQL | Kafka | Redis | None | None |
| 588 | JavaScript | Clean Architecture | N/A | PostgreSQL | Kafka | Memory Cache | None | None |
| 589 | JavaScript | Clean Architecture | N/A | PostgreSQL | Kafka | None | JWT | None |
| 590 | JavaScript | Clean Architecture | N/A | PostgreSQL | Kafka | Redis | JWT | None |
| 591 | JavaScript | Clean Architecture | N/A | PostgreSQL | Kafka | Memory Cache | JWT | None |
| 592 | JavaScript | Clean Architecture | N/A | PostgreSQL | Kafka | None | JWT | Google,GitHub |
| 593 | JavaScript | Clean Architecture | N/A | PostgreSQL | Kafka | Redis | JWT | Google,GitHub |
| 594 | JavaScript | Clean Architecture | N/A | PostgreSQL | Kafka | Memory Cache | JWT | Google,GitHub |
| 595 | JavaScript | Clean Architecture | N/A | MongoDB | REST APIs | None | None | None |
| 596 | JavaScript | Clean Architecture | N/A | MongoDB | REST APIs | Redis | None | None |
| 597 | JavaScript | Clean Architecture | N/A | MongoDB | REST APIs | Memory Cache | None | None |
| 598 | JavaScript | Clean Architecture | N/A | MongoDB | REST APIs | None | JWT | None |
| 599 | JavaScript | Clean Architecture | N/A | MongoDB | REST APIs | Redis | JWT | None |
| 600 | JavaScript | Clean Architecture | N/A | MongoDB | REST APIs | Memory Cache | JWT | None |
| 601 | JavaScript | Clean Architecture | N/A | MongoDB | REST APIs | None | JWT | Google,GitHub |
| 602 | JavaScript | Clean Architecture | N/A | MongoDB | REST APIs | Redis | JWT | Google,GitHub |
| 603 | JavaScript | Clean Architecture | N/A | MongoDB | REST APIs | Memory Cache | JWT | Google,GitHub |
| 604 | JavaScript | Clean Architecture | N/A | MongoDB | GraphQL | None | None | None |
| 605 | JavaScript | Clean Architecture | N/A | MongoDB | GraphQL | Redis | None | None |
| 606 | JavaScript | Clean Architecture | N/A | MongoDB | GraphQL | Memory Cache | None | None |
| 607 | JavaScript | Clean Architecture | N/A | MongoDB | GraphQL | None | JWT | None |
| 608 | JavaScript | Clean Architecture | N/A | MongoDB | GraphQL | Redis | JWT | None |
| 609 | JavaScript | Clean Architecture | N/A | MongoDB | GraphQL | Memory Cache | JWT | None |
| 610 | JavaScript | Clean Architecture | N/A | MongoDB | GraphQL | None | JWT | Google,GitHub |
| 611 | JavaScript | Clean Architecture | N/A | MongoDB | GraphQL | Redis | JWT | Google,GitHub |
| 612 | JavaScript | Clean Architecture | N/A | MongoDB | GraphQL | Memory Cache | JWT | Google,GitHub |
| 613 | JavaScript | Clean Architecture | N/A | MongoDB | Kafka | None | None | None |
| 614 | JavaScript | Clean Architecture | N/A | MongoDB | Kafka | Redis | None | None |
| 615 | JavaScript | Clean Architecture | N/A | MongoDB | Kafka | Memory Cache | None | None |
| 616 | JavaScript | Clean Architecture | N/A | MongoDB | Kafka | None | JWT | None |
| 617 | JavaScript | Clean Architecture | N/A | MongoDB | Kafka | Redis | JWT | None |
| 618 | JavaScript | Clean Architecture | N/A | MongoDB | Kafka | Memory Cache | JWT | None |
| 619 | JavaScript | Clean Architecture | N/A | MongoDB | Kafka | None | JWT | Google,GitHub |
| 620 | JavaScript | Clean Architecture | N/A | MongoDB | Kafka | Redis | JWT | Google,GitHub |
| 621 | JavaScript | Clean Architecture | N/A | MongoDB | Kafka | Memory Cache | JWT | Google,GitHub |
| 622 | JavaScript | Clean Architecture | N/A | None | REST APIs | None | None | None |
| 623 | JavaScript | Clean Architecture | N/A | None | REST APIs | None | JWT | None |
| 624 | JavaScript | Clean Architecture | N/A | None | REST APIs | None | JWT | Google,GitHub |
| 625 | JavaScript | Clean Architecture | N/A | None | GraphQL | None | None | None |
| 626 | JavaScript | Clean Architecture | N/A | None | GraphQL | None | JWT | None |
| 627 | JavaScript | Clean Architecture | N/A | None | GraphQL | None | JWT | Google,GitHub |
| 628 | JavaScript | Clean Architecture | N/A | None | Kafka | None | None | None |
| 629 | JavaScript | Clean Architecture | N/A | None | Kafka | None | JWT | None |
| 630 | JavaScript | Clean Architecture | N/A | None | Kafka | None | JWT | Google,GitHub |
| 631 | TypeScript | Clean Architecture | N/A | MySQL | REST APIs | None | None | None |
| 632 | TypeScript | Clean Architecture | N/A | MySQL | REST APIs | Redis | None | None |
| 633 | TypeScript | Clean Architecture | N/A | MySQL | REST APIs | Memory Cache | None | None |
| 634 | TypeScript | Clean Architecture | N/A | MySQL | REST APIs | None | JWT | None |
| 635 | TypeScript | Clean Architecture | N/A | MySQL | REST APIs | Redis | JWT | None |
| 636 | TypeScript | Clean Architecture | N/A | MySQL | REST APIs | Memory Cache | JWT | None |
| 637 | TypeScript | Clean Architecture | N/A | MySQL | REST APIs | None | JWT | Google,GitHub |
| 638 | TypeScript | Clean Architecture | N/A | MySQL | REST APIs | Redis | JWT | Google,GitHub |
| 639 | TypeScript | Clean Architecture | N/A | MySQL | REST APIs | Memory Cache | JWT | Google,GitHub |
| 640 | TypeScript | Clean Architecture | N/A | MySQL | GraphQL | None | None | None |
| 641 | TypeScript | Clean Architecture | N/A | MySQL | GraphQL | Redis | None | None |
| 642 | TypeScript | Clean Architecture | N/A | MySQL | GraphQL | Memory Cache | None | None |
| 643 | TypeScript | Clean Architecture | N/A | MySQL | GraphQL | None | JWT | None |
| 644 | TypeScript | Clean Architecture | N/A | MySQL | GraphQL | Redis | JWT | None |
| 645 | TypeScript | Clean Architecture | N/A | MySQL | GraphQL | Memory Cache | JWT | None |
| 646 | TypeScript | Clean Architecture | N/A | MySQL | GraphQL | None | JWT | Google,GitHub |
| 647 | TypeScript | Clean Architecture | N/A | MySQL | GraphQL | Redis | JWT | Google,GitHub |
| 648 | TypeScript | Clean Architecture | N/A | MySQL | GraphQL | Memory Cache | JWT | Google,GitHub |
| 649 | TypeScript | Clean Architecture | N/A | MySQL | Kafka | None | None | None |
| 650 | TypeScript | Clean Architecture | N/A | MySQL | Kafka | Redis | None | None |
| 651 | TypeScript | Clean Architecture | N/A | MySQL | Kafka | Memory Cache | None | None |
| 652 | TypeScript | Clean Architecture | N/A | MySQL | Kafka | None | JWT | None |
| 653 | TypeScript | Clean Architecture | N/A | MySQL | Kafka | Redis | JWT | None |
| 654 | TypeScript | Clean Architecture | N/A | MySQL | Kafka | Memory Cache | JWT | None |
| 655 | TypeScript | Clean Architecture | N/A | MySQL | Kafka | None | JWT | Google,GitHub |
| 656 | TypeScript | Clean Architecture | N/A | MySQL | Kafka | Redis | JWT | Google,GitHub |
| 657 | TypeScript | Clean Architecture | N/A | MySQL | Kafka | Memory Cache | JWT | Google,GitHub |
| 658 | TypeScript | Clean Architecture | N/A | PostgreSQL | REST APIs | None | None | None |
| 659 | TypeScript | Clean Architecture | N/A | PostgreSQL | REST APIs | Redis | None | None |
| 660 | TypeScript | Clean Architecture | N/A | PostgreSQL | REST APIs | Memory Cache | None | None |
| 661 | TypeScript | Clean Architecture | N/A | PostgreSQL | REST APIs | None | JWT | None |
| 662 | TypeScript | Clean Architecture | N/A | PostgreSQL | REST APIs | Redis | JWT | None |
| 663 | TypeScript | Clean Architecture | N/A | PostgreSQL | REST APIs | Memory Cache | JWT | None |
| 664 | TypeScript | Clean Architecture | N/A | PostgreSQL | REST APIs | None | JWT | Google,GitHub |
| 665 | TypeScript | Clean Architecture | N/A | PostgreSQL | REST APIs | Redis | JWT | Google,GitHub |
| 666 | TypeScript | Clean Architecture | N/A | PostgreSQL | REST APIs | Memory Cache | JWT | Google,GitHub |
| 667 | TypeScript | Clean Architecture | N/A | PostgreSQL | GraphQL | None | None | None |
| 668 | TypeScript | Clean Architecture | N/A | PostgreSQL | GraphQL | Redis | None | None |
| 669 | TypeScript | Clean Architecture | N/A | PostgreSQL | GraphQL | Memory Cache | None | None |
| 670 | TypeScript | Clean Architecture | N/A | PostgreSQL | GraphQL | None | JWT | None |
| 671 | TypeScript | Clean Architecture | N/A | PostgreSQL | GraphQL | Redis | JWT | None |
| 672 | TypeScript | Clean Architecture | N/A | PostgreSQL | GraphQL | Memory Cache | JWT | None |
| 673 | TypeScript | Clean Architecture | N/A | PostgreSQL | GraphQL | None | JWT | Google,GitHub |
| 674 | TypeScript | Clean Architecture | N/A | PostgreSQL | GraphQL | Redis | JWT | Google,GitHub |
| 675 | TypeScript | Clean Architecture | N/A | PostgreSQL | GraphQL | Memory Cache | JWT | Google,GitHub |
| 676 | TypeScript | Clean Architecture | N/A | PostgreSQL | Kafka | None | None | None |
| 677 | TypeScript | Clean Architecture | N/A | PostgreSQL | Kafka | Redis | None | None |
| 678 | TypeScript | Clean Architecture | N/A | PostgreSQL | Kafka | Memory Cache | None | None |
| 679 | TypeScript | Clean Architecture | N/A | PostgreSQL | Kafka | None | JWT | None |
| 680 | TypeScript | Clean Architecture | N/A | PostgreSQL | Kafka | Redis | JWT | None |
| 681 | TypeScript | Clean Architecture | N/A | PostgreSQL | Kafka | Memory Cache | JWT | None |
| 682 | TypeScript | Clean Architecture | N/A | PostgreSQL | Kafka | None | JWT | Google,GitHub |
| 683 | TypeScript | Clean Architecture | N/A | PostgreSQL | Kafka | Redis | JWT | Google,GitHub |
| 684 | TypeScript | Clean Architecture | N/A | PostgreSQL | Kafka | Memory Cache | JWT | Google,GitHub |
| 685 | TypeScript | Clean Architecture | N/A | MongoDB | REST APIs | None | None | None |
| 686 | TypeScript | Clean Architecture | N/A | MongoDB | REST APIs | Redis | None | None |
| 687 | TypeScript | Clean Architecture | N/A | MongoDB | REST APIs | Memory Cache | None | None |
| 688 | TypeScript | Clean Architecture | N/A | MongoDB | REST APIs | None | JWT | None |
| 689 | TypeScript | Clean Architecture | N/A | MongoDB | REST APIs | Redis | JWT | None |
| 690 | TypeScript | Clean Architecture | N/A | MongoDB | REST APIs | Memory Cache | JWT | None |
| 691 | TypeScript | Clean Architecture | N/A | MongoDB | REST APIs | None | JWT | Google,GitHub |
| 692 | TypeScript | Clean Architecture | N/A | MongoDB | REST APIs | Redis | JWT | Google,GitHub |
| 693 | TypeScript | Clean Architecture | N/A | MongoDB | REST APIs | Memory Cache | JWT | Google,GitHub |
| 694 | TypeScript | Clean Architecture | N/A | MongoDB | GraphQL | None | None | None |
| 695 | TypeScript | Clean Architecture | N/A | MongoDB | GraphQL | Redis | None | None |
| 696 | TypeScript | Clean Architecture | N/A | MongoDB | GraphQL | Memory Cache | None | None |
| 697 | TypeScript | Clean Architecture | N/A | MongoDB | GraphQL | None | JWT | None |
| 698 | TypeScript | Clean Architecture | N/A | MongoDB | GraphQL | Redis | JWT | None |
| 699 | TypeScript | Clean Architecture | N/A | MongoDB | GraphQL | Memory Cache | JWT | None |
| 700 | TypeScript | Clean Architecture | N/A | MongoDB | GraphQL | None | JWT | Google,GitHub |
| 701 | TypeScript | Clean Architecture | N/A | MongoDB | GraphQL | Redis | JWT | Google,GitHub |
| 702 | TypeScript | Clean Architecture | N/A | MongoDB | GraphQL | Memory Cache | JWT | Google,GitHub |
| 703 | TypeScript | Clean Architecture | N/A | MongoDB | Kafka | None | None | None |
| 704 | TypeScript | Clean Architecture | N/A | MongoDB | Kafka | Redis | None | None |
| 705 | TypeScript | Clean Architecture | N/A | MongoDB | Kafka | Memory Cache | None | None |
| 706 | TypeScript | Clean Architecture | N/A | MongoDB | Kafka | None | JWT | None |
| 707 | TypeScript | Clean Architecture | N/A | MongoDB | Kafka | Redis | JWT | None |
| 708 | TypeScript | Clean Architecture | N/A | MongoDB | Kafka | Memory Cache | JWT | None |
| 709 | TypeScript | Clean Architecture | N/A | MongoDB | Kafka | None | JWT | Google,GitHub |
| 710 | TypeScript | Clean Architecture | N/A | MongoDB | Kafka | Redis | JWT | Google,GitHub |
| 711 | TypeScript | Clean Architecture | N/A | MongoDB | Kafka | Memory Cache | JWT | Google,GitHub |
| 712 | TypeScript | Clean Architecture | N/A | None | REST APIs | None | None | None |
| 713 | TypeScript | Clean Architecture | N/A | None | REST APIs | None | JWT | None |
| 714 | TypeScript | Clean Architecture | N/A | None | REST APIs | None | JWT | Google,GitHub |
| 715 | TypeScript | Clean Architecture | N/A | None | GraphQL | None | None | None |
| 716 | TypeScript | Clean Architecture | N/A | None | GraphQL | None | JWT | None |
| 717 | TypeScript | Clean Architecture | N/A | None | GraphQL | None | JWT | Google,GitHub |
| 718 | TypeScript | Clean Architecture | N/A | None | Kafka | None | None | None |
| 719 | TypeScript | Clean Architecture | N/A | None | Kafka | None | JWT | None |
| 720 | TypeScript | Clean Architecture | N/A | None | Kafka | None | JWT | Google,GitHub |
