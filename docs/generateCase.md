# NodeJS Quickstart Generator - Test Cases

This document lists the **480 possible project combinations** supported by the `nodejs-quickstart` CLI. These combinations cover all supported languages, architectures, databases, communication patterns, caching, and authentication options.

## Summary
- **CI Providers**: `None`, `GitHub Actions`, `Jenkins`, `GitLab CI`, `CircleCI`, `Bitbucket Pipelines`
- **MVC Architecture**: 360 Combinations
  - **With Database (324)**: 2 Lang × 3 View × 3 DB × 3 Comm × 2 Auth = 108 * 3 (Caching: None/Redis/Memory Cache) = 324
  - **No Database (36)**: 2 Lang × 3 View × 1 DB × 3 Comm × 2 Auth = 36 * 1 (Caching: None) = 36
- **Clean Architecture**: 120 Combinations
  - **With Database (108)**: 2 Lang × 1 View (None) × 3 DB × 3 Comm × 2 Auth = 36 * 3 (Caching: None/Redis/Memory Cache) = 108
  - **No Database (12)**: 2 Lang × 1 View (None) × 1 DB × 3 Comm × 2 Auth = 12 * 1 (Caching: None) = 12

**Total Core Combinations: 480**

> **Note on CI/CD**: Each core combination can be generated with `None` (1 state) or any of the **5 CI Providers** in two states (with or without Enterprise Security Hardening).
> 
> **Total Validated Permutations**: 480 × (1 + 5 × 2) = **5280 Cases**


---

## 1. MVC Architecture (360 Cases)

| # | Language | Architecture | View Engine | Database | Communication | Caching | Auth |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |

| 1 | JavaScript | MVC | None | MySQL | REST APIs | None | None |
| 2 | JavaScript | MVC | None | MySQL | REST APIs | Redis | None |
| 3 | JavaScript | MVC | None | MySQL | REST APIs | Memory Cache | None |
| 4 | JavaScript | MVC | None | MySQL | REST APIs | None | JWT |
| 5 | JavaScript | MVC | None | MySQL | REST APIs | Redis | JWT |
| 6 | JavaScript | MVC | None | MySQL | REST APIs | Memory Cache | JWT |
| 7 | JavaScript | MVC | None | MySQL | GraphQL | None | None |
| 8 | JavaScript | MVC | None | MySQL | GraphQL | Redis | None |
| 9 | JavaScript | MVC | None | MySQL | GraphQL | Memory Cache | None |
| 10 | JavaScript | MVC | None | MySQL | GraphQL | None | JWT |
| 11 | JavaScript | MVC | None | MySQL | GraphQL | Redis | JWT |
| 12 | JavaScript | MVC | None | MySQL | GraphQL | Memory Cache | JWT |
| 13 | JavaScript | MVC | None | MySQL | Kafka | None | None |
| 14 | JavaScript | MVC | None | MySQL | Kafka | Redis | None |
| 15 | JavaScript | MVC | None | MySQL | Kafka | Memory Cache | None |
| 16 | JavaScript | MVC | None | MySQL | Kafka | None | JWT |
| 17 | JavaScript | MVC | None | MySQL | Kafka | Redis | JWT |
| 18 | JavaScript | MVC | None | MySQL | Kafka | Memory Cache | JWT |
| 19 | JavaScript | MVC | None | PostgreSQL | REST APIs | None | None |
| 20 | JavaScript | MVC | None | PostgreSQL | REST APIs | Redis | None |
| 21 | JavaScript | MVC | None | PostgreSQL | REST APIs | Memory Cache | None |
| 22 | JavaScript | MVC | None | PostgreSQL | REST APIs | None | JWT |
| 23 | JavaScript | MVC | None | PostgreSQL | REST APIs | Redis | JWT |
| 24 | JavaScript | MVC | None | PostgreSQL | REST APIs | Memory Cache | JWT |
| 25 | JavaScript | MVC | None | PostgreSQL | GraphQL | None | None |
| 26 | JavaScript | MVC | None | PostgreSQL | GraphQL | Redis | None |
| 27 | JavaScript | MVC | None | PostgreSQL | GraphQL | Memory Cache | None |
| 28 | JavaScript | MVC | None | PostgreSQL | GraphQL | None | JWT |
| 29 | JavaScript | MVC | None | PostgreSQL | GraphQL | Redis | JWT |
| 30 | JavaScript | MVC | None | PostgreSQL | GraphQL | Memory Cache | JWT |
| 31 | JavaScript | MVC | None | PostgreSQL | Kafka | None | None |
| 32 | JavaScript | MVC | None | PostgreSQL | Kafka | Redis | None |
| 33 | JavaScript | MVC | None | PostgreSQL | Kafka | Memory Cache | None |
| 34 | JavaScript | MVC | None | PostgreSQL | Kafka | None | JWT |
| 35 | JavaScript | MVC | None | PostgreSQL | Kafka | Redis | JWT |
| 36 | JavaScript | MVC | None | PostgreSQL | Kafka | Memory Cache | JWT |
| 37 | JavaScript | MVC | None | MongoDB | REST APIs | None | None |
| 38 | JavaScript | MVC | None | MongoDB | REST APIs | Redis | None |
| 39 | JavaScript | MVC | None | MongoDB | REST APIs | Memory Cache | None |
| 40 | JavaScript | MVC | None | MongoDB | REST APIs | None | JWT |
| 41 | JavaScript | MVC | None | MongoDB | REST APIs | Redis | JWT |
| 42 | JavaScript | MVC | None | MongoDB | REST APIs | Memory Cache | JWT |
| 43 | JavaScript | MVC | None | MongoDB | GraphQL | None | None |
| 44 | JavaScript | MVC | None | MongoDB | GraphQL | Redis | None |
| 45 | JavaScript | MVC | None | MongoDB | GraphQL | Memory Cache | None |
| 46 | JavaScript | MVC | None | MongoDB | GraphQL | None | JWT |
| 47 | JavaScript | MVC | None | MongoDB | GraphQL | Redis | JWT |
| 48 | JavaScript | MVC | None | MongoDB | GraphQL | Memory Cache | JWT |
| 49 | JavaScript | MVC | None | MongoDB | Kafka | None | None |
| 50 | JavaScript | MVC | None | MongoDB | Kafka | Redis | None |
| 51 | JavaScript | MVC | None | MongoDB | Kafka | Memory Cache | None |
| 52 | JavaScript | MVC | None | MongoDB | Kafka | None | JWT |
| 53 | JavaScript | MVC | None | MongoDB | Kafka | Redis | JWT |
| 54 | JavaScript | MVC | None | MongoDB | Kafka | Memory Cache | JWT |
| 55 | JavaScript | MVC | None | None | REST APIs | None | None |
| 56 | JavaScript | MVC | None | None | REST APIs | None | JWT |
| 57 | JavaScript | MVC | None | None | GraphQL | None | None |
| 58 | JavaScript | MVC | None | None | GraphQL | None | JWT |
| 59 | JavaScript | MVC | None | None | Kafka | None | None |
| 60 | JavaScript | MVC | None | None | Kafka | None | JWT |
| 61 | JavaScript | MVC | EJS | MySQL | REST APIs | None | None |
| 62 | JavaScript | MVC | EJS | MySQL | REST APIs | Redis | None |
| 63 | JavaScript | MVC | EJS | MySQL | REST APIs | Memory Cache | None |
| 64 | JavaScript | MVC | EJS | MySQL | REST APIs | None | JWT |
| 65 | JavaScript | MVC | EJS | MySQL | REST APIs | Redis | JWT |
| 66 | JavaScript | MVC | EJS | MySQL | REST APIs | Memory Cache | JWT |
| 67 | JavaScript | MVC | EJS | MySQL | GraphQL | None | None |
| 68 | JavaScript | MVC | EJS | MySQL | GraphQL | Redis | None |
| 69 | JavaScript | MVC | EJS | MySQL | GraphQL | Memory Cache | None |
| 70 | JavaScript | MVC | EJS | MySQL | GraphQL | None | JWT |
| 71 | JavaScript | MVC | EJS | MySQL | GraphQL | Redis | JWT |
| 72 | JavaScript | MVC | EJS | MySQL | GraphQL | Memory Cache | JWT |
| 73 | JavaScript | MVC | EJS | MySQL | Kafka | None | None |
| 74 | JavaScript | MVC | EJS | MySQL | Kafka | Redis | None |
| 75 | JavaScript | MVC | EJS | MySQL | Kafka | Memory Cache | None |
| 76 | JavaScript | MVC | EJS | MySQL | Kafka | None | JWT |
| 77 | JavaScript | MVC | EJS | MySQL | Kafka | Redis | JWT |
| 78 | JavaScript | MVC | EJS | MySQL | Kafka | Memory Cache | JWT |
| 79 | JavaScript | MVC | EJS | PostgreSQL | REST APIs | None | None |
| 80 | JavaScript | MVC | EJS | PostgreSQL | REST APIs | Redis | None |
| 81 | JavaScript | MVC | EJS | PostgreSQL | REST APIs | Memory Cache | None |
| 82 | JavaScript | MVC | EJS | PostgreSQL | REST APIs | None | JWT |
| 83 | JavaScript | MVC | EJS | PostgreSQL | REST APIs | Redis | JWT |
| 84 | JavaScript | MVC | EJS | PostgreSQL | REST APIs | Memory Cache | JWT |
| 85 | JavaScript | MVC | EJS | PostgreSQL | GraphQL | None | None |
| 86 | JavaScript | MVC | EJS | PostgreSQL | GraphQL | Redis | None |
| 87 | JavaScript | MVC | EJS | PostgreSQL | GraphQL | Memory Cache | None |
| 88 | JavaScript | MVC | EJS | PostgreSQL | GraphQL | None | JWT |
| 89 | JavaScript | MVC | EJS | PostgreSQL | GraphQL | Redis | JWT |
| 90 | JavaScript | MVC | EJS | PostgreSQL | GraphQL | Memory Cache | JWT |
| 91 | JavaScript | MVC | EJS | PostgreSQL | Kafka | None | None |
| 92 | JavaScript | MVC | EJS | PostgreSQL | Kafka | Redis | None |
| 93 | JavaScript | MVC | EJS | PostgreSQL | Kafka | Memory Cache | None |
| 94 | JavaScript | MVC | EJS | PostgreSQL | Kafka | None | JWT |
| 95 | JavaScript | MVC | EJS | PostgreSQL | Kafka | Redis | JWT |
| 96 | JavaScript | MVC | EJS | PostgreSQL | Kafka | Memory Cache | JWT |
| 97 | JavaScript | MVC | EJS | MongoDB | REST APIs | None | None |
| 98 | JavaScript | MVC | EJS | MongoDB | REST APIs | Redis | None |
| 99 | JavaScript | MVC | EJS | MongoDB | REST APIs | Memory Cache | None |
| 100 | JavaScript | MVC | EJS | MongoDB | REST APIs | None | JWT |
| 101 | JavaScript | MVC | EJS | MongoDB | REST APIs | Redis | JWT |
| 102 | JavaScript | MVC | EJS | MongoDB | REST APIs | Memory Cache | JWT |
| 103 | JavaScript | MVC | EJS | MongoDB | GraphQL | None | None |
| 104 | JavaScript | MVC | EJS | MongoDB | GraphQL | Redis | None |
| 105 | JavaScript | MVC | EJS | MongoDB | GraphQL | Memory Cache | None |
| 106 | JavaScript | MVC | EJS | MongoDB | GraphQL | None | JWT |
| 107 | JavaScript | MVC | EJS | MongoDB | GraphQL | Redis | JWT |
| 108 | JavaScript | MVC | EJS | MongoDB | GraphQL | Memory Cache | JWT |
| 109 | JavaScript | MVC | EJS | MongoDB | Kafka | None | None |
| 110 | JavaScript | MVC | EJS | MongoDB | Kafka | Redis | None |
| 111 | JavaScript | MVC | EJS | MongoDB | Kafka | Memory Cache | None |
| 112 | JavaScript | MVC | EJS | MongoDB | Kafka | None | JWT |
| 113 | JavaScript | MVC | EJS | MongoDB | Kafka | Redis | JWT |
| 114 | JavaScript | MVC | EJS | MongoDB | Kafka | Memory Cache | JWT |
| 115 | JavaScript | MVC | EJS | None | REST APIs | None | None |
| 116 | JavaScript | MVC | EJS | None | REST APIs | None | JWT |
| 117 | JavaScript | MVC | EJS | None | GraphQL | None | None |
| 118 | JavaScript | MVC | EJS | None | GraphQL | None | JWT |
| 119 | JavaScript | MVC | EJS | None | Kafka | None | None |
| 120 | JavaScript | MVC | EJS | None | Kafka | None | JWT |
| 121 | JavaScript | MVC | Pug | MySQL | REST APIs | None | None |
| 122 | JavaScript | MVC | Pug | MySQL | REST APIs | Redis | None |
| 123 | JavaScript | MVC | Pug | MySQL | REST APIs | Memory Cache | None |
| 124 | JavaScript | MVC | Pug | MySQL | REST APIs | None | JWT |
| 125 | JavaScript | MVC | Pug | MySQL | REST APIs | Redis | JWT |
| 126 | JavaScript | MVC | Pug | MySQL | REST APIs | Memory Cache | JWT |
| 127 | JavaScript | MVC | Pug | MySQL | GraphQL | None | None |
| 128 | JavaScript | MVC | Pug | MySQL | GraphQL | Redis | None |
| 129 | JavaScript | MVC | Pug | MySQL | GraphQL | Memory Cache | None |
| 130 | JavaScript | MVC | Pug | MySQL | GraphQL | None | JWT |
| 131 | JavaScript | MVC | Pug | MySQL | GraphQL | Redis | JWT |
| 132 | JavaScript | MVC | Pug | MySQL | GraphQL | Memory Cache | JWT |
| 133 | JavaScript | MVC | Pug | MySQL | Kafka | None | None |
| 134 | JavaScript | MVC | Pug | MySQL | Kafka | Redis | None |
| 135 | JavaScript | MVC | Pug | MySQL | Kafka | Memory Cache | None |
| 136 | JavaScript | MVC | Pug | MySQL | Kafka | None | JWT |
| 137 | JavaScript | MVC | Pug | MySQL | Kafka | Redis | JWT |
| 138 | JavaScript | MVC | Pug | MySQL | Kafka | Memory Cache | JWT |
| 139 | JavaScript | MVC | Pug | PostgreSQL | REST APIs | None | None |
| 140 | JavaScript | MVC | Pug | PostgreSQL | REST APIs | Redis | None |
| 141 | JavaScript | MVC | Pug | PostgreSQL | REST APIs | Memory Cache | None |
| 142 | JavaScript | MVC | Pug | PostgreSQL | REST APIs | None | JWT |
| 143 | JavaScript | MVC | Pug | PostgreSQL | REST APIs | Redis | JWT |
| 144 | JavaScript | MVC | Pug | PostgreSQL | REST APIs | Memory Cache | JWT |
| 145 | JavaScript | MVC | Pug | PostgreSQL | GraphQL | None | None |
| 146 | JavaScript | MVC | Pug | PostgreSQL | GraphQL | Redis | None |
| 147 | JavaScript | MVC | Pug | PostgreSQL | GraphQL | Memory Cache | None |
| 148 | JavaScript | MVC | Pug | PostgreSQL | GraphQL | None | JWT |
| 149 | JavaScript | MVC | Pug | PostgreSQL | GraphQL | Redis | JWT |
| 150 | JavaScript | MVC | Pug | PostgreSQL | GraphQL | Memory Cache | JWT |
| 151 | JavaScript | MVC | Pug | PostgreSQL | Kafka | None | None |
| 152 | JavaScript | MVC | Pug | PostgreSQL | Kafka | Redis | None |
| 153 | JavaScript | MVC | Pug | PostgreSQL | Kafka | Memory Cache | None |
| 154 | JavaScript | MVC | Pug | PostgreSQL | Kafka | None | JWT |
| 155 | JavaScript | MVC | Pug | PostgreSQL | Kafka | Redis | JWT |
| 156 | JavaScript | MVC | Pug | PostgreSQL | Kafka | Memory Cache | JWT |
| 157 | JavaScript | MVC | Pug | MongoDB | REST APIs | None | None |
| 158 | JavaScript | MVC | Pug | MongoDB | REST APIs | Redis | None |
| 159 | JavaScript | MVC | Pug | MongoDB | REST APIs | Memory Cache | None |
| 160 | JavaScript | MVC | Pug | MongoDB | REST APIs | None | JWT |
| 161 | JavaScript | MVC | Pug | MongoDB | REST APIs | Redis | JWT |
| 162 | JavaScript | MVC | Pug | MongoDB | REST APIs | Memory Cache | JWT |
| 163 | JavaScript | MVC | Pug | MongoDB | GraphQL | None | None |
| 164 | JavaScript | MVC | Pug | MongoDB | GraphQL | Redis | None |
| 165 | JavaScript | MVC | Pug | MongoDB | GraphQL | Memory Cache | None |
| 166 | JavaScript | MVC | Pug | MongoDB | GraphQL | None | JWT |
| 167 | JavaScript | MVC | Pug | MongoDB | GraphQL | Redis | JWT |
| 168 | JavaScript | MVC | Pug | MongoDB | GraphQL | Memory Cache | JWT |
| 169 | JavaScript | MVC | Pug | MongoDB | Kafka | None | None |
| 170 | JavaScript | MVC | Pug | MongoDB | Kafka | Redis | None |
| 171 | JavaScript | MVC | Pug | MongoDB | Kafka | Memory Cache | None |
| 172 | JavaScript | MVC | Pug | MongoDB | Kafka | None | JWT |
| 173 | JavaScript | MVC | Pug | MongoDB | Kafka | Redis | JWT |
| 174 | JavaScript | MVC | Pug | MongoDB | Kafka | Memory Cache | JWT |
| 175 | JavaScript | MVC | Pug | None | REST APIs | None | None |
| 176 | JavaScript | MVC | Pug | None | REST APIs | None | JWT |
| 177 | JavaScript | MVC | Pug | None | GraphQL | None | None |
| 178 | JavaScript | MVC | Pug | None | GraphQL | None | JWT |
| 179 | JavaScript | MVC | Pug | None | Kafka | None | None |
| 180 | JavaScript | MVC | Pug | None | Kafka | None | JWT |
| 181 | TypeScript | MVC | None | MySQL | REST APIs | None | None |
| 182 | TypeScript | MVC | None | MySQL | REST APIs | Redis | None |
| 183 | TypeScript | MVC | None | MySQL | REST APIs | Memory Cache | None |
| 184 | TypeScript | MVC | None | MySQL | REST APIs | None | JWT |
| 185 | TypeScript | MVC | None | MySQL | REST APIs | Redis | JWT |
| 186 | TypeScript | MVC | None | MySQL | REST APIs | Memory Cache | JWT |
| 187 | TypeScript | MVC | None | MySQL | GraphQL | None | None |
| 188 | TypeScript | MVC | None | MySQL | GraphQL | Redis | None |
| 189 | TypeScript | MVC | None | MySQL | GraphQL | Memory Cache | None |
| 190 | TypeScript | MVC | None | MySQL | GraphQL | None | JWT |
| 191 | TypeScript | MVC | None | MySQL | GraphQL | Redis | JWT |
| 192 | TypeScript | MVC | None | MySQL | GraphQL | Memory Cache | JWT |
| 193 | TypeScript | MVC | None | MySQL | Kafka | None | None |
| 194 | TypeScript | MVC | None | MySQL | Kafka | Redis | None |
| 195 | TypeScript | MVC | None | MySQL | Kafka | Memory Cache | None |
| 196 | TypeScript | MVC | None | MySQL | Kafka | None | JWT |
| 197 | TypeScript | MVC | None | MySQL | Kafka | Redis | JWT |
| 198 | TypeScript | MVC | None | MySQL | Kafka | Memory Cache | JWT |
| 199 | TypeScript | MVC | None | PostgreSQL | REST APIs | None | None |
| 200 | TypeScript | MVC | None | PostgreSQL | REST APIs | Redis | None |
| 201 | TypeScript | MVC | None | PostgreSQL | REST APIs | Memory Cache | None |
| 202 | TypeScript | MVC | None | PostgreSQL | REST APIs | None | JWT |
| 203 | TypeScript | MVC | None | PostgreSQL | REST APIs | Redis | JWT |
| 204 | TypeScript | MVC | None | PostgreSQL | REST APIs | Memory Cache | JWT |
| 205 | TypeScript | MVC | None | PostgreSQL | GraphQL | None | None |
| 206 | TypeScript | MVC | None | PostgreSQL | GraphQL | Redis | None |
| 207 | TypeScript | MVC | None | PostgreSQL | GraphQL | Memory Cache | None |
| 208 | TypeScript | MVC | None | PostgreSQL | GraphQL | None | JWT |
| 209 | TypeScript | MVC | None | PostgreSQL | GraphQL | Redis | JWT |
| 210 | TypeScript | MVC | None | PostgreSQL | GraphQL | Memory Cache | JWT |
| 211 | TypeScript | MVC | None | PostgreSQL | Kafka | None | None |
| 212 | TypeScript | MVC | None | PostgreSQL | Kafka | Redis | None |
| 213 | TypeScript | MVC | None | PostgreSQL | Kafka | Memory Cache | None |
| 214 | TypeScript | MVC | None | PostgreSQL | Kafka | None | JWT |
| 215 | TypeScript | MVC | None | PostgreSQL | Kafka | Redis | JWT |
| 216 | TypeScript | MVC | None | PostgreSQL | Kafka | Memory Cache | JWT |
| 217 | TypeScript | MVC | None | MongoDB | REST APIs | None | None |
| 218 | TypeScript | MVC | None | MongoDB | REST APIs | Redis | None |
| 219 | TypeScript | MVC | None | MongoDB | REST APIs | Memory Cache | None |
| 220 | TypeScript | MVC | None | MongoDB | REST APIs | None | JWT |
| 221 | TypeScript | MVC | None | MongoDB | REST APIs | Redis | JWT |
| 222 | TypeScript | MVC | None | MongoDB | REST APIs | Memory Cache | JWT |
| 223 | TypeScript | MVC | None | MongoDB | GraphQL | None | None |
| 224 | TypeScript | MVC | None | MongoDB | GraphQL | Redis | None |
| 225 | TypeScript | MVC | None | MongoDB | GraphQL | Memory Cache | None |
| 226 | TypeScript | MVC | None | MongoDB | GraphQL | None | JWT |
| 227 | TypeScript | MVC | None | MongoDB | GraphQL | Redis | JWT |
| 228 | TypeScript | MVC | None | MongoDB | GraphQL | Memory Cache | JWT |
| 229 | TypeScript | MVC | None | MongoDB | Kafka | None | None |
| 230 | TypeScript | MVC | None | MongoDB | Kafka | Redis | None |
| 231 | TypeScript | MVC | None | MongoDB | Kafka | Memory Cache | None |
| 232 | TypeScript | MVC | None | MongoDB | Kafka | None | JWT |
| 233 | TypeScript | MVC | None | MongoDB | Kafka | Redis | JWT |
| 234 | TypeScript | MVC | None | MongoDB | Kafka | Memory Cache | JWT |
| 235 | TypeScript | MVC | None | None | REST APIs | None | None |
| 236 | TypeScript | MVC | None | None | REST APIs | None | JWT |
| 237 | TypeScript | MVC | None | None | GraphQL | None | None |
| 238 | TypeScript | MVC | None | None | GraphQL | None | JWT |
| 239 | TypeScript | MVC | None | None | Kafka | None | None |
| 240 | TypeScript | MVC | None | None | Kafka | None | JWT |
| 241 | TypeScript | MVC | EJS | MySQL | REST APIs | None | None |
| 242 | TypeScript | MVC | EJS | MySQL | REST APIs | Redis | None |
| 243 | TypeScript | MVC | EJS | MySQL | REST APIs | Memory Cache | None |
| 244 | TypeScript | MVC | EJS | MySQL | REST APIs | None | JWT |
| 245 | TypeScript | MVC | EJS | MySQL | REST APIs | Redis | JWT |
| 246 | TypeScript | MVC | EJS | MySQL | REST APIs | Memory Cache | JWT |
| 247 | TypeScript | MVC | EJS | MySQL | GraphQL | None | None |
| 248 | TypeScript | MVC | EJS | MySQL | GraphQL | Redis | None |
| 249 | TypeScript | MVC | EJS | MySQL | GraphQL | Memory Cache | None |
| 250 | TypeScript | MVC | EJS | MySQL | GraphQL | None | JWT |
| 251 | TypeScript | MVC | EJS | MySQL | GraphQL | Redis | JWT |
| 252 | TypeScript | MVC | EJS | MySQL | GraphQL | Memory Cache | JWT |
| 253 | TypeScript | MVC | EJS | MySQL | Kafka | None | None |
| 254 | TypeScript | MVC | EJS | MySQL | Kafka | Redis | None |
| 255 | TypeScript | MVC | EJS | MySQL | Kafka | Memory Cache | None |
| 256 | TypeScript | MVC | EJS | MySQL | Kafka | None | JWT |
| 257 | TypeScript | MVC | EJS | MySQL | Kafka | Redis | JWT |
| 258 | TypeScript | MVC | EJS | MySQL | Kafka | Memory Cache | JWT |
| 259 | TypeScript | MVC | EJS | PostgreSQL | REST APIs | None | None |
| 260 | TypeScript | MVC | EJS | PostgreSQL | REST APIs | Redis | None |
| 261 | TypeScript | MVC | EJS | PostgreSQL | REST APIs | Memory Cache | None |
| 262 | TypeScript | MVC | EJS | PostgreSQL | REST APIs | None | JWT |
| 263 | TypeScript | MVC | EJS | PostgreSQL | REST APIs | Redis | JWT |
| 264 | TypeScript | MVC | EJS | PostgreSQL | REST APIs | Memory Cache | JWT |
| 265 | TypeScript | MVC | EJS | PostgreSQL | GraphQL | None | None |
| 266 | TypeScript | MVC | EJS | PostgreSQL | GraphQL | Redis | None |
| 267 | TypeScript | MVC | EJS | PostgreSQL | GraphQL | Memory Cache | None |
| 268 | TypeScript | MVC | EJS | PostgreSQL | GraphQL | None | JWT |
| 269 | TypeScript | MVC | EJS | PostgreSQL | GraphQL | Redis | JWT |
| 270 | TypeScript | MVC | EJS | PostgreSQL | GraphQL | Memory Cache | JWT |
| 271 | TypeScript | MVC | EJS | PostgreSQL | Kafka | None | None |
| 272 | TypeScript | MVC | EJS | PostgreSQL | Kafka | Redis | None |
| 273 | TypeScript | MVC | EJS | PostgreSQL | Kafka | Memory Cache | None |
| 274 | TypeScript | MVC | EJS | PostgreSQL | Kafka | None | JWT |
| 275 | TypeScript | MVC | EJS | PostgreSQL | Kafka | Redis | JWT |
| 276 | TypeScript | MVC | EJS | PostgreSQL | Kafka | Memory Cache | JWT |
| 277 | TypeScript | MVC | EJS | MongoDB | REST APIs | None | None |
| 278 | TypeScript | MVC | EJS | MongoDB | REST APIs | Redis | None |
| 279 | TypeScript | MVC | EJS | MongoDB | REST APIs | Memory Cache | None |
| 280 | TypeScript | MVC | EJS | MongoDB | REST APIs | None | JWT |
| 281 | TypeScript | MVC | EJS | MongoDB | REST APIs | Redis | JWT |
| 282 | TypeScript | MVC | EJS | MongoDB | REST APIs | Memory Cache | JWT |
| 283 | TypeScript | MVC | EJS | MongoDB | GraphQL | None | None |
| 284 | TypeScript | MVC | EJS | MongoDB | GraphQL | Redis | None |
| 285 | TypeScript | MVC | EJS | MongoDB | GraphQL | Memory Cache | None |
| 286 | TypeScript | MVC | EJS | MongoDB | GraphQL | None | JWT |
| 287 | TypeScript | MVC | EJS | MongoDB | GraphQL | Redis | JWT |
| 288 | TypeScript | MVC | EJS | MongoDB | GraphQL | Memory Cache | JWT |
| 289 | TypeScript | MVC | EJS | MongoDB | Kafka | None | None |
| 290 | TypeScript | MVC | EJS | MongoDB | Kafka | Redis | None |
| 291 | TypeScript | MVC | EJS | MongoDB | Kafka | Memory Cache | None |
| 292 | TypeScript | MVC | EJS | MongoDB | Kafka | None | JWT |
| 293 | TypeScript | MVC | EJS | MongoDB | Kafka | Redis | JWT |
| 294 | TypeScript | MVC | EJS | MongoDB | Kafka | Memory Cache | JWT |
| 295 | TypeScript | MVC | EJS | None | REST APIs | None | None |
| 296 | TypeScript | MVC | EJS | None | REST APIs | None | JWT |
| 297 | TypeScript | MVC | EJS | None | GraphQL | None | None |
| 298 | TypeScript | MVC | EJS | None | GraphQL | None | JWT |
| 299 | TypeScript | MVC | EJS | None | Kafka | None | None |
| 300 | TypeScript | MVC | EJS | None | Kafka | None | JWT |
| 301 | TypeScript | MVC | Pug | MySQL | REST APIs | None | None |
| 302 | TypeScript | MVC | Pug | MySQL | REST APIs | Redis | None |
| 303 | TypeScript | MVC | Pug | MySQL | REST APIs | Memory Cache | None |
| 304 | TypeScript | MVC | Pug | MySQL | REST APIs | None | JWT |
| 305 | TypeScript | MVC | Pug | MySQL | REST APIs | Redis | JWT |
| 306 | TypeScript | MVC | Pug | MySQL | REST APIs | Memory Cache | JWT |
| 307 | TypeScript | MVC | Pug | MySQL | GraphQL | None | None |
| 308 | TypeScript | MVC | Pug | MySQL | GraphQL | Redis | None |
| 309 | TypeScript | MVC | Pug | MySQL | GraphQL | Memory Cache | None |
| 310 | TypeScript | MVC | Pug | MySQL | GraphQL | None | JWT |
| 311 | TypeScript | MVC | Pug | MySQL | GraphQL | Redis | JWT |
| 312 | TypeScript | MVC | Pug | MySQL | GraphQL | Memory Cache | JWT |
| 313 | TypeScript | MVC | Pug | MySQL | Kafka | None | None |
| 314 | TypeScript | MVC | Pug | MySQL | Kafka | Redis | None |
| 315 | TypeScript | MVC | Pug | MySQL | Kafka | Memory Cache | None |
| 316 | TypeScript | MVC | Pug | MySQL | Kafka | None | JWT |
| 317 | TypeScript | MVC | Pug | MySQL | Kafka | Redis | JWT |
| 318 | TypeScript | MVC | Pug | MySQL | Kafka | Memory Cache | JWT |
| 319 | TypeScript | MVC | Pug | PostgreSQL | REST APIs | None | None |
| 320 | TypeScript | MVC | Pug | PostgreSQL | REST APIs | Redis | None |
| 321 | TypeScript | MVC | Pug | PostgreSQL | REST APIs | Memory Cache | None |
| 322 | TypeScript | MVC | Pug | PostgreSQL | REST APIs | None | JWT |
| 323 | TypeScript | MVC | Pug | PostgreSQL | REST APIs | Redis | JWT |
| 324 | TypeScript | MVC | Pug | PostgreSQL | REST APIs | Memory Cache | JWT |
| 325 | TypeScript | MVC | Pug | PostgreSQL | GraphQL | None | None |
| 326 | TypeScript | MVC | Pug | PostgreSQL | GraphQL | Redis | None |
| 327 | TypeScript | MVC | Pug | PostgreSQL | GraphQL | Memory Cache | None |
| 328 | TypeScript | MVC | Pug | PostgreSQL | GraphQL | None | JWT |
| 329 | TypeScript | MVC | Pug | PostgreSQL | GraphQL | Redis | JWT |
| 330 | TypeScript | MVC | Pug | PostgreSQL | GraphQL | Memory Cache | JWT |
| 331 | TypeScript | MVC | Pug | PostgreSQL | Kafka | None | None |
| 332 | TypeScript | MVC | Pug | PostgreSQL | Kafka | Redis | None |
| 333 | TypeScript | MVC | Pug | PostgreSQL | Kafka | Memory Cache | None |
| 334 | TypeScript | MVC | Pug | PostgreSQL | Kafka | None | JWT |
| 335 | TypeScript | MVC | Pug | PostgreSQL | Kafka | Redis | JWT |
| 336 | TypeScript | MVC | Pug | PostgreSQL | Kafka | Memory Cache | JWT |
| 337 | TypeScript | MVC | Pug | MongoDB | REST APIs | None | None |
| 338 | TypeScript | MVC | Pug | MongoDB | REST APIs | Redis | None |
| 339 | TypeScript | MVC | Pug | MongoDB | REST APIs | Memory Cache | None |
| 340 | TypeScript | MVC | Pug | MongoDB | REST APIs | None | JWT |
| 341 | TypeScript | MVC | Pug | MongoDB | REST APIs | Redis | JWT |
| 342 | TypeScript | MVC | Pug | MongoDB | REST APIs | Memory Cache | JWT |
| 343 | TypeScript | MVC | Pug | MongoDB | GraphQL | None | None |
| 344 | TypeScript | MVC | Pug | MongoDB | GraphQL | Redis | None |
| 345 | TypeScript | MVC | Pug | MongoDB | GraphQL | Memory Cache | None |
| 346 | TypeScript | MVC | Pug | MongoDB | GraphQL | None | JWT |
| 347 | TypeScript | MVC | Pug | MongoDB | GraphQL | Redis | JWT |
| 348 | TypeScript | MVC | Pug | MongoDB | GraphQL | Memory Cache | JWT |
| 349 | TypeScript | MVC | Pug | MongoDB | Kafka | None | None |
| 350 | TypeScript | MVC | Pug | MongoDB | Kafka | Redis | None |
| 351 | TypeScript | MVC | Pug | MongoDB | Kafka | Memory Cache | None |
| 352 | TypeScript | MVC | Pug | MongoDB | Kafka | None | JWT |
| 353 | TypeScript | MVC | Pug | MongoDB | Kafka | Redis | JWT |
| 354 | TypeScript | MVC | Pug | MongoDB | Kafka | Memory Cache | JWT |
| 355 | TypeScript | MVC | Pug | None | REST APIs | None | None |
| 356 | TypeScript | MVC | Pug | None | REST APIs | None | JWT |
| 357 | TypeScript | MVC | Pug | None | GraphQL | None | None |
| 358 | TypeScript | MVC | Pug | None | GraphQL | None | JWT |
| 359 | TypeScript | MVC | Pug | None | Kafka | None | None |
| 360 | TypeScript | MVC | Pug | None | Kafka | None | JWT |

## 2. Clean Architecture (120 Cases)
*Note: Clean Architecture does not use server-side view engines (EJS/Pug).*

| # | Language | Architecture | View Engine | Database | Communication | Caching | Auth |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |

| 361 | JavaScript | Clean Architecture | N/A | MySQL | REST APIs | None | None |
| 362 | JavaScript | Clean Architecture | N/A | MySQL | REST APIs | Redis | None |
| 363 | JavaScript | Clean Architecture | N/A | MySQL | REST APIs | Memory Cache | None |
| 364 | JavaScript | Clean Architecture | N/A | MySQL | REST APIs | None | JWT |
| 365 | JavaScript | Clean Architecture | N/A | MySQL | REST APIs | Redis | JWT |
| 366 | JavaScript | Clean Architecture | N/A | MySQL | REST APIs | Memory Cache | JWT |
| 367 | JavaScript | Clean Architecture | N/A | MySQL | GraphQL | None | None |
| 368 | JavaScript | Clean Architecture | N/A | MySQL | GraphQL | Redis | None |
| 369 | JavaScript | Clean Architecture | N/A | MySQL | GraphQL | Memory Cache | None |
| 370 | JavaScript | Clean Architecture | N/A | MySQL | GraphQL | None | JWT |
| 371 | JavaScript | Clean Architecture | N/A | MySQL | GraphQL | Redis | JWT |
| 372 | JavaScript | Clean Architecture | N/A | MySQL | GraphQL | Memory Cache | JWT |
| 373 | JavaScript | Clean Architecture | N/A | MySQL | Kafka | None | None |
| 374 | JavaScript | Clean Architecture | N/A | MySQL | Kafka | Redis | None |
| 375 | JavaScript | Clean Architecture | N/A | MySQL | Kafka | Memory Cache | None |
| 376 | JavaScript | Clean Architecture | N/A | MySQL | Kafka | None | JWT |
| 377 | JavaScript | Clean Architecture | N/A | MySQL | Kafka | Redis | JWT |
| 378 | JavaScript | Clean Architecture | N/A | MySQL | Kafka | Memory Cache | JWT |
| 379 | JavaScript | Clean Architecture | N/A | PostgreSQL | REST APIs | None | None |
| 380 | JavaScript | Clean Architecture | N/A | PostgreSQL | REST APIs | Redis | None |
| 381 | JavaScript | Clean Architecture | N/A | PostgreSQL | REST APIs | Memory Cache | None |
| 382 | JavaScript | Clean Architecture | N/A | PostgreSQL | REST APIs | None | JWT |
| 383 | JavaScript | Clean Architecture | N/A | PostgreSQL | REST APIs | Redis | JWT |
| 384 | JavaScript | Clean Architecture | N/A | PostgreSQL | REST APIs | Memory Cache | JWT |
| 385 | JavaScript | Clean Architecture | N/A | PostgreSQL | GraphQL | None | None |
| 386 | JavaScript | Clean Architecture | N/A | PostgreSQL | GraphQL | Redis | None |
| 387 | JavaScript | Clean Architecture | N/A | PostgreSQL | GraphQL | Memory Cache | None |
| 388 | JavaScript | Clean Architecture | N/A | PostgreSQL | GraphQL | None | JWT |
| 389 | JavaScript | Clean Architecture | N/A | PostgreSQL | GraphQL | Redis | JWT |
| 390 | JavaScript | Clean Architecture | N/A | PostgreSQL | GraphQL | Memory Cache | JWT |
| 391 | JavaScript | Clean Architecture | N/A | PostgreSQL | Kafka | None | None |
| 392 | JavaScript | Clean Architecture | N/A | PostgreSQL | Kafka | Redis | None |
| 393 | JavaScript | Clean Architecture | N/A | PostgreSQL | Kafka | Memory Cache | None |
| 394 | JavaScript | Clean Architecture | N/A | PostgreSQL | Kafka | None | JWT |
| 395 | JavaScript | Clean Architecture | N/A | PostgreSQL | Kafka | Redis | JWT |
| 396 | JavaScript | Clean Architecture | N/A | PostgreSQL | Kafka | Memory Cache | JWT |
| 397 | JavaScript | Clean Architecture | N/A | MongoDB | REST APIs | None | None |
| 398 | JavaScript | Clean Architecture | N/A | MongoDB | REST APIs | Redis | None |
| 399 | JavaScript | Clean Architecture | N/A | MongoDB | REST APIs | Memory Cache | None |
| 400 | JavaScript | Clean Architecture | N/A | MongoDB | REST APIs | None | JWT |
| 401 | JavaScript | Clean Architecture | N/A | MongoDB | REST APIs | Redis | JWT |
| 402 | JavaScript | Clean Architecture | N/A | MongoDB | REST APIs | Memory Cache | JWT |
| 403 | JavaScript | Clean Architecture | N/A | MongoDB | GraphQL | None | None |
| 404 | JavaScript | Clean Architecture | N/A | MongoDB | GraphQL | Redis | None |
| 405 | JavaScript | Clean Architecture | N/A | MongoDB | GraphQL | Memory Cache | None |
| 406 | JavaScript | Clean Architecture | N/A | MongoDB | GraphQL | None | JWT |
| 407 | JavaScript | Clean Architecture | N/A | MongoDB | GraphQL | Redis | JWT |
| 408 | JavaScript | Clean Architecture | N/A | MongoDB | GraphQL | Memory Cache | JWT |
| 409 | JavaScript | Clean Architecture | N/A | MongoDB | Kafka | None | None |
| 410 | JavaScript | Clean Architecture | N/A | MongoDB | Kafka | Redis | None |
| 411 | JavaScript | Clean Architecture | N/A | MongoDB | Kafka | Memory Cache | None |
| 412 | JavaScript | Clean Architecture | N/A | MongoDB | Kafka | None | JWT |
| 413 | JavaScript | Clean Architecture | N/A | MongoDB | Kafka | Redis | JWT |
| 414 | JavaScript | Clean Architecture | N/A | MongoDB | Kafka | Memory Cache | JWT |
| 415 | JavaScript | Clean Architecture | N/A | None | REST APIs | None | None |
| 416 | JavaScript | Clean Architecture | N/A | None | REST APIs | None | JWT |
| 417 | JavaScript | Clean Architecture | N/A | None | GraphQL | None | None |
| 418 | JavaScript | Clean Architecture | N/A | None | GraphQL | None | JWT |
| 419 | JavaScript | Clean Architecture | N/A | None | Kafka | None | None |
| 420 | JavaScript | Clean Architecture | N/A | None | Kafka | None | JWT |
| 421 | TypeScript | Clean Architecture | N/A | MySQL | REST APIs | None | None |
| 422 | TypeScript | Clean Architecture | N/A | MySQL | REST APIs | Redis | None |
| 423 | TypeScript | Clean Architecture | N/A | MySQL | REST APIs | Memory Cache | None |
| 424 | TypeScript | Clean Architecture | N/A | MySQL | REST APIs | None | JWT |
| 425 | TypeScript | Clean Architecture | N/A | MySQL | REST APIs | Redis | JWT |
| 426 | TypeScript | Clean Architecture | N/A | MySQL | REST APIs | Memory Cache | JWT |
| 427 | TypeScript | Clean Architecture | N/A | MySQL | GraphQL | None | None |
| 428 | TypeScript | Clean Architecture | N/A | MySQL | GraphQL | Redis | None |
| 429 | TypeScript | Clean Architecture | N/A | MySQL | GraphQL | Memory Cache | None |
| 430 | TypeScript | Clean Architecture | N/A | MySQL | GraphQL | None | JWT |
| 431 | TypeScript | Clean Architecture | N/A | MySQL | GraphQL | Redis | JWT |
| 432 | TypeScript | Clean Architecture | N/A | MySQL | GraphQL | Memory Cache | JWT |
| 433 | TypeScript | Clean Architecture | N/A | MySQL | Kafka | None | None |
| 434 | TypeScript | Clean Architecture | N/A | MySQL | Kafka | Redis | None |
| 435 | TypeScript | Clean Architecture | N/A | MySQL | Kafka | Memory Cache | None |
| 436 | TypeScript | Clean Architecture | N/A | MySQL | Kafka | None | JWT |
| 437 | TypeScript | Clean Architecture | N/A | MySQL | Kafka | Redis | JWT |
| 438 | TypeScript | Clean Architecture | N/A | MySQL | Kafka | Memory Cache | JWT |
| 439 | TypeScript | Clean Architecture | N/A | PostgreSQL | REST APIs | None | None |
| 440 | TypeScript | Clean Architecture | N/A | PostgreSQL | REST APIs | Redis | None |
| 441 | TypeScript | Clean Architecture | N/A | PostgreSQL | REST APIs | Memory Cache | None |
| 442 | TypeScript | Clean Architecture | N/A | PostgreSQL | REST APIs | None | JWT |
| 443 | TypeScript | Clean Architecture | N/A | PostgreSQL | REST APIs | Redis | JWT |
| 444 | TypeScript | Clean Architecture | N/A | PostgreSQL | REST APIs | Memory Cache | JWT |
| 445 | TypeScript | Clean Architecture | N/A | PostgreSQL | GraphQL | None | None |
| 446 | TypeScript | Clean Architecture | N/A | PostgreSQL | GraphQL | Redis | None |
| 447 | TypeScript | Clean Architecture | N/A | PostgreSQL | GraphQL | Memory Cache | None |
| 448 | TypeScript | Clean Architecture | N/A | PostgreSQL | GraphQL | None | JWT |
| 449 | TypeScript | Clean Architecture | N/A | PostgreSQL | GraphQL | Redis | JWT |
| 450 | TypeScript | Clean Architecture | N/A | PostgreSQL | GraphQL | Memory Cache | JWT |
| 451 | TypeScript | Clean Architecture | N/A | PostgreSQL | Kafka | None | None |
| 452 | TypeScript | Clean Architecture | N/A | PostgreSQL | Kafka | Redis | None |
| 453 | TypeScript | Clean Architecture | N/A | PostgreSQL | Kafka | Memory Cache | None |
| 454 | TypeScript | Clean Architecture | N/A | PostgreSQL | Kafka | None | JWT |
| 455 | TypeScript | Clean Architecture | N/A | PostgreSQL | Kafka | Redis | JWT |
| 456 | TypeScript | Clean Architecture | N/A | PostgreSQL | Kafka | Memory Cache | JWT |
| 457 | TypeScript | Clean Architecture | N/A | MongoDB | REST APIs | None | None |
| 458 | TypeScript | Clean Architecture | N/A | MongoDB | REST APIs | Redis | None |
| 459 | TypeScript | Clean Architecture | N/A | MongoDB | REST APIs | Memory Cache | None |
| 460 | TypeScript | Clean Architecture | N/A | MongoDB | REST APIs | None | JWT |
| 461 | TypeScript | Clean Architecture | N/A | MongoDB | REST APIs | Redis | JWT |
| 462 | TypeScript | Clean Architecture | N/A | MongoDB | REST APIs | Memory Cache | JWT |
| 463 | TypeScript | Clean Architecture | N/A | MongoDB | GraphQL | None | None |
| 464 | TypeScript | Clean Architecture | N/A | MongoDB | GraphQL | Redis | None |
| 465 | TypeScript | Clean Architecture | N/A | MongoDB | GraphQL | Memory Cache | None |
| 466 | TypeScript | Clean Architecture | N/A | MongoDB | GraphQL | None | JWT |
| 467 | TypeScript | Clean Architecture | N/A | MongoDB | GraphQL | Redis | JWT |
| 468 | TypeScript | Clean Architecture | N/A | MongoDB | GraphQL | Memory Cache | JWT |
| 469 | TypeScript | Clean Architecture | N/A | MongoDB | Kafka | None | None |
| 470 | TypeScript | Clean Architecture | N/A | MongoDB | Kafka | Redis | None |
| 471 | TypeScript | Clean Architecture | N/A | MongoDB | Kafka | Memory Cache | None |
| 472 | TypeScript | Clean Architecture | N/A | MongoDB | Kafka | None | JWT |
| 473 | TypeScript | Clean Architecture | N/A | MongoDB | Kafka | Redis | JWT |
| 474 | TypeScript | Clean Architecture | N/A | MongoDB | Kafka | Memory Cache | JWT |
| 475 | TypeScript | Clean Architecture | N/A | None | REST APIs | None | None |
| 476 | TypeScript | Clean Architecture | N/A | None | REST APIs | None | JWT |
| 477 | TypeScript | Clean Architecture | N/A | None | GraphQL | None | None |
| 478 | TypeScript | Clean Architecture | N/A | None | GraphQL | None | JWT |
| 479 | TypeScript | Clean Architecture | N/A | None | Kafka | None | None |
| 480 | TypeScript | Clean Architecture | N/A | None | Kafka | None | JWT |
