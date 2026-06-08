# NodeJS Quickstart Generator - Test Cases

This document lists the **936 possible project combinations** supported by the `nodejs-quickstart` CLI. These combinations cover all supported languages, architectures, databases, communication patterns, caching, and authentication options.

## Summary
- **CI Providers**: `None`, `GitHub Actions`, `Jenkins`, `GitLab CI`, `CircleCI`, `Bitbucket Pipelines`
- **MVC Architecture**: 702 Combinations
- **Clean Architecture**: 234 Combinations

**Total Core Combinations: 936**

> **Note on CI/CD**: Each core combination can be generated with `None` (1 state) or any of the **5 CI Providers** in two states (with or without Enterprise Security Hardening).
> 
> **Total Validated Permutations**: 936 × (1 + 5 × 2) = **10296 Cases**

---

## 1. MVC Architecture (702 Cases)

### JavaScript

#### Database: MySQL

| # | View Engine | Communication | Caching | Auth | Social Auth | Background Jobs |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | None | REST APIs | None | None | None | Disabled |
| 2 | None | REST APIs | Redis | None | None | Disabled |
| 3 | None | REST APIs | Redis | None | None | Enabled |
| 4 | None | REST APIs | Memory Cache | None | None | Disabled |
| 5 | None | REST APIs | None | JWT | None | Disabled |
| 6 | None | REST APIs | Redis | JWT | None | Disabled |
| 7 | None | REST APIs | Redis | JWT | None | Enabled |
| 8 | None | REST APIs | Memory Cache | JWT | None | Disabled |
| 9 | None | REST APIs | None | JWT | Google,GitHub | Disabled |
| 10 | None | REST APIs | Redis | JWT | Google,GitHub | Disabled |
| 11 | None | REST APIs | Redis | JWT | Google,GitHub | Enabled |
| 12 | None | REST APIs | Memory Cache | JWT | Google,GitHub | Disabled |
| 13 | None | GraphQL | None | None | None | Disabled |
| 14 | None | GraphQL | Redis | None | None | Disabled |
| 15 | None | GraphQL | Redis | None | None | Enabled |
| 16 | None | GraphQL | Memory Cache | None | None | Disabled |
| 17 | None | GraphQL | None | JWT | None | Disabled |
| 18 | None | GraphQL | Redis | JWT | None | Disabled |
| 19 | None | GraphQL | Redis | JWT | None | Enabled |
| 20 | None | GraphQL | Memory Cache | JWT | None | Disabled |
| 21 | None | GraphQL | None | JWT | Google,GitHub | Disabled |
| 22 | None | GraphQL | Redis | JWT | Google,GitHub | Disabled |
| 23 | None | GraphQL | Redis | JWT | Google,GitHub | Enabled |
| 24 | None | GraphQL | Memory Cache | JWT | Google,GitHub | Disabled |
| 25 | None | Kafka | None | None | None | Disabled |
| 26 | None | Kafka | Redis | None | None | Disabled |
| 27 | None | Kafka | Redis | None | None | Enabled |
| 28 | None | Kafka | Memory Cache | None | None | Disabled |
| 29 | None | Kafka | None | JWT | None | Disabled |
| 30 | None | Kafka | Redis | JWT | None | Disabled |
| 31 | None | Kafka | Redis | JWT | None | Enabled |
| 32 | None | Kafka | Memory Cache | JWT | None | Disabled |
| 33 | None | Kafka | None | JWT | Google,GitHub | Disabled |
| 34 | None | Kafka | Redis | JWT | Google,GitHub | Disabled |
| 35 | None | Kafka | Redis | JWT | Google,GitHub | Enabled |
| 36 | None | Kafka | Memory Cache | JWT | Google,GitHub | Disabled |
| 118 | EJS | REST APIs | None | None | None | Disabled |
| 119 | EJS | REST APIs | Redis | None | None | Disabled |
| 120 | EJS | REST APIs | Redis | None | None | Enabled |
| 121 | EJS | REST APIs | Memory Cache | None | None | Disabled |
| 122 | EJS | REST APIs | None | JWT | None | Disabled |
| 123 | EJS | REST APIs | Redis | JWT | None | Disabled |
| 124 | EJS | REST APIs | Redis | JWT | None | Enabled |
| 125 | EJS | REST APIs | Memory Cache | JWT | None | Disabled |
| 126 | EJS | REST APIs | None | JWT | Google,GitHub | Disabled |
| 127 | EJS | REST APIs | Redis | JWT | Google,GitHub | Disabled |
| 128 | EJS | REST APIs | Redis | JWT | Google,GitHub | Enabled |
| 129 | EJS | REST APIs | Memory Cache | JWT | Google,GitHub | Disabled |
| 130 | EJS | GraphQL | None | None | None | Disabled |
| 131 | EJS | GraphQL | Redis | None | None | Disabled |
| 132 | EJS | GraphQL | Redis | None | None | Enabled |
| 133 | EJS | GraphQL | Memory Cache | None | None | Disabled |
| 134 | EJS | GraphQL | None | JWT | None | Disabled |
| 135 | EJS | GraphQL | Redis | JWT | None | Disabled |
| 136 | EJS | GraphQL | Redis | JWT | None | Enabled |
| 137 | EJS | GraphQL | Memory Cache | JWT | None | Disabled |
| 138 | EJS | GraphQL | None | JWT | Google,GitHub | Disabled |
| 139 | EJS | GraphQL | Redis | JWT | Google,GitHub | Disabled |
| 140 | EJS | GraphQL | Redis | JWT | Google,GitHub | Enabled |
| 141 | EJS | GraphQL | Memory Cache | JWT | Google,GitHub | Disabled |
| 142 | EJS | Kafka | None | None | None | Disabled |
| 143 | EJS | Kafka | Redis | None | None | Disabled |
| 144 | EJS | Kafka | Redis | None | None | Enabled |
| 145 | EJS | Kafka | Memory Cache | None | None | Disabled |
| 146 | EJS | Kafka | None | JWT | None | Disabled |
| 147 | EJS | Kafka | Redis | JWT | None | Disabled |
| 148 | EJS | Kafka | Redis | JWT | None | Enabled |
| 149 | EJS | Kafka | Memory Cache | JWT | None | Disabled |
| 150 | EJS | Kafka | None | JWT | Google,GitHub | Disabled |
| 151 | EJS | Kafka | Redis | JWT | Google,GitHub | Disabled |
| 152 | EJS | Kafka | Redis | JWT | Google,GitHub | Enabled |
| 153 | EJS | Kafka | Memory Cache | JWT | Google,GitHub | Disabled |
| 235 | Pug | REST APIs | None | None | None | Disabled |
| 236 | Pug | REST APIs | Redis | None | None | Disabled |
| 237 | Pug | REST APIs | Redis | None | None | Enabled |
| 238 | Pug | REST APIs | Memory Cache | None | None | Disabled |
| 239 | Pug | REST APIs | None | JWT | None | Disabled |
| 240 | Pug | REST APIs | Redis | JWT | None | Disabled |
| 241 | Pug | REST APIs | Redis | JWT | None | Enabled |
| 242 | Pug | REST APIs | Memory Cache | JWT | None | Disabled |
| 243 | Pug | REST APIs | None | JWT | Google,GitHub | Disabled |
| 244 | Pug | REST APIs | Redis | JWT | Google,GitHub | Disabled |
| 245 | Pug | REST APIs | Redis | JWT | Google,GitHub | Enabled |
| 246 | Pug | REST APIs | Memory Cache | JWT | Google,GitHub | Disabled |
| 247 | Pug | GraphQL | None | None | None | Disabled |
| 248 | Pug | GraphQL | Redis | None | None | Disabled |
| 249 | Pug | GraphQL | Redis | None | None | Enabled |
| 250 | Pug | GraphQL | Memory Cache | None | None | Disabled |
| 251 | Pug | GraphQL | None | JWT | None | Disabled |
| 252 | Pug | GraphQL | Redis | JWT | None | Disabled |
| 253 | Pug | GraphQL | Redis | JWT | None | Enabled |
| 254 | Pug | GraphQL | Memory Cache | JWT | None | Disabled |
| 255 | Pug | GraphQL | None | JWT | Google,GitHub | Disabled |
| 256 | Pug | GraphQL | Redis | JWT | Google,GitHub | Disabled |
| 257 | Pug | GraphQL | Redis | JWT | Google,GitHub | Enabled |
| 258 | Pug | GraphQL | Memory Cache | JWT | Google,GitHub | Disabled |
| 259 | Pug | Kafka | None | None | None | Disabled |
| 260 | Pug | Kafka | Redis | None | None | Disabled |
| 261 | Pug | Kafka | Redis | None | None | Enabled |
| 262 | Pug | Kafka | Memory Cache | None | None | Disabled |
| 263 | Pug | Kafka | None | JWT | None | Disabled |
| 264 | Pug | Kafka | Redis | JWT | None | Disabled |
| 265 | Pug | Kafka | Redis | JWT | None | Enabled |
| 266 | Pug | Kafka | Memory Cache | JWT | None | Disabled |
| 267 | Pug | Kafka | None | JWT | Google,GitHub | Disabled |
| 268 | Pug | Kafka | Redis | JWT | Google,GitHub | Disabled |
| 269 | Pug | Kafka | Redis | JWT | Google,GitHub | Enabled |
| 270 | Pug | Kafka | Memory Cache | JWT | Google,GitHub | Disabled |

#### Database: PostgreSQL

| # | View Engine | Communication | Caching | Auth | Social Auth | Background Jobs |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 37 | None | REST APIs | None | None | None | Disabled |
| 38 | None | REST APIs | Redis | None | None | Disabled |
| 39 | None | REST APIs | Redis | None | None | Enabled |
| 40 | None | REST APIs | Memory Cache | None | None | Disabled |
| 41 | None | REST APIs | None | JWT | None | Disabled |
| 42 | None | REST APIs | Redis | JWT | None | Disabled |
| 43 | None | REST APIs | Redis | JWT | None | Enabled |
| 44 | None | REST APIs | Memory Cache | JWT | None | Disabled |
| 45 | None | REST APIs | None | JWT | Google,GitHub | Disabled |
| 46 | None | REST APIs | Redis | JWT | Google,GitHub | Disabled |
| 47 | None | REST APIs | Redis | JWT | Google,GitHub | Enabled |
| 48 | None | REST APIs | Memory Cache | JWT | Google,GitHub | Disabled |
| 49 | None | GraphQL | None | None | None | Disabled |
| 50 | None | GraphQL | Redis | None | None | Disabled |
| 51 | None | GraphQL | Redis | None | None | Enabled |
| 52 | None | GraphQL | Memory Cache | None | None | Disabled |
| 53 | None | GraphQL | None | JWT | None | Disabled |
| 54 | None | GraphQL | Redis | JWT | None | Disabled |
| 55 | None | GraphQL | Redis | JWT | None | Enabled |
| 56 | None | GraphQL | Memory Cache | JWT | None | Disabled |
| 57 | None | GraphQL | None | JWT | Google,GitHub | Disabled |
| 58 | None | GraphQL | Redis | JWT | Google,GitHub | Disabled |
| 59 | None | GraphQL | Redis | JWT | Google,GitHub | Enabled |
| 60 | None | GraphQL | Memory Cache | JWT | Google,GitHub | Disabled |
| 61 | None | Kafka | None | None | None | Disabled |
| 62 | None | Kafka | Redis | None | None | Disabled |
| 63 | None | Kafka | Redis | None | None | Enabled |
| 64 | None | Kafka | Memory Cache | None | None | Disabled |
| 65 | None | Kafka | None | JWT | None | Disabled |
| 66 | None | Kafka | Redis | JWT | None | Disabled |
| 67 | None | Kafka | Redis | JWT | None | Enabled |
| 68 | None | Kafka | Memory Cache | JWT | None | Disabled |
| 69 | None | Kafka | None | JWT | Google,GitHub | Disabled |
| 70 | None | Kafka | Redis | JWT | Google,GitHub | Disabled |
| 71 | None | Kafka | Redis | JWT | Google,GitHub | Enabled |
| 72 | None | Kafka | Memory Cache | JWT | Google,GitHub | Disabled |
| 154 | EJS | REST APIs | None | None | None | Disabled |
| 155 | EJS | REST APIs | Redis | None | None | Disabled |
| 156 | EJS | REST APIs | Redis | None | None | Enabled |
| 157 | EJS | REST APIs | Memory Cache | None | None | Disabled |
| 158 | EJS | REST APIs | None | JWT | None | Disabled |
| 159 | EJS | REST APIs | Redis | JWT | None | Disabled |
| 160 | EJS | REST APIs | Redis | JWT | None | Enabled |
| 161 | EJS | REST APIs | Memory Cache | JWT | None | Disabled |
| 162 | EJS | REST APIs | None | JWT | Google,GitHub | Disabled |
| 163 | EJS | REST APIs | Redis | JWT | Google,GitHub | Disabled |
| 164 | EJS | REST APIs | Redis | JWT | Google,GitHub | Enabled |
| 165 | EJS | REST APIs | Memory Cache | JWT | Google,GitHub | Disabled |
| 166 | EJS | GraphQL | None | None | None | Disabled |
| 167 | EJS | GraphQL | Redis | None | None | Disabled |
| 168 | EJS | GraphQL | Redis | None | None | Enabled |
| 169 | EJS | GraphQL | Memory Cache | None | None | Disabled |
| 170 | EJS | GraphQL | None | JWT | None | Disabled |
| 171 | EJS | GraphQL | Redis | JWT | None | Disabled |
| 172 | EJS | GraphQL | Redis | JWT | None | Enabled |
| 173 | EJS | GraphQL | Memory Cache | JWT | None | Disabled |
| 174 | EJS | GraphQL | None | JWT | Google,GitHub | Disabled |
| 175 | EJS | GraphQL | Redis | JWT | Google,GitHub | Disabled |
| 176 | EJS | GraphQL | Redis | JWT | Google,GitHub | Enabled |
| 177 | EJS | GraphQL | Memory Cache | JWT | Google,GitHub | Disabled |
| 178 | EJS | Kafka | None | None | None | Disabled |
| 179 | EJS | Kafka | Redis | None | None | Disabled |
| 180 | EJS | Kafka | Redis | None | None | Enabled |
| 181 | EJS | Kafka | Memory Cache | None | None | Disabled |
| 182 | EJS | Kafka | None | JWT | None | Disabled |
| 183 | EJS | Kafka | Redis | JWT | None | Disabled |
| 184 | EJS | Kafka | Redis | JWT | None | Enabled |
| 185 | EJS | Kafka | Memory Cache | JWT | None | Disabled |
| 186 | EJS | Kafka | None | JWT | Google,GitHub | Disabled |
| 187 | EJS | Kafka | Redis | JWT | Google,GitHub | Disabled |
| 188 | EJS | Kafka | Redis | JWT | Google,GitHub | Enabled |
| 189 | EJS | Kafka | Memory Cache | JWT | Google,GitHub | Disabled |
| 271 | Pug | REST APIs | None | None | None | Disabled |
| 272 | Pug | REST APIs | Redis | None | None | Disabled |
| 273 | Pug | REST APIs | Redis | None | None | Enabled |
| 274 | Pug | REST APIs | Memory Cache | None | None | Disabled |
| 275 | Pug | REST APIs | None | JWT | None | Disabled |
| 276 | Pug | REST APIs | Redis | JWT | None | Disabled |
| 277 | Pug | REST APIs | Redis | JWT | None | Enabled |
| 278 | Pug | REST APIs | Memory Cache | JWT | None | Disabled |
| 279 | Pug | REST APIs | None | JWT | Google,GitHub | Disabled |
| 280 | Pug | REST APIs | Redis | JWT | Google,GitHub | Disabled |
| 281 | Pug | REST APIs | Redis | JWT | Google,GitHub | Enabled |
| 282 | Pug | REST APIs | Memory Cache | JWT | Google,GitHub | Disabled |
| 283 | Pug | GraphQL | None | None | None | Disabled |
| 284 | Pug | GraphQL | Redis | None | None | Disabled |
| 285 | Pug | GraphQL | Redis | None | None | Enabled |
| 286 | Pug | GraphQL | Memory Cache | None | None | Disabled |
| 287 | Pug | GraphQL | None | JWT | None | Disabled |
| 288 | Pug | GraphQL | Redis | JWT | None | Disabled |
| 289 | Pug | GraphQL | Redis | JWT | None | Enabled |
| 290 | Pug | GraphQL | Memory Cache | JWT | None | Disabled |
| 291 | Pug | GraphQL | None | JWT | Google,GitHub | Disabled |
| 292 | Pug | GraphQL | Redis | JWT | Google,GitHub | Disabled |
| 293 | Pug | GraphQL | Redis | JWT | Google,GitHub | Enabled |
| 294 | Pug | GraphQL | Memory Cache | JWT | Google,GitHub | Disabled |
| 295 | Pug | Kafka | None | None | None | Disabled |
| 296 | Pug | Kafka | Redis | None | None | Disabled |
| 297 | Pug | Kafka | Redis | None | None | Enabled |
| 298 | Pug | Kafka | Memory Cache | None | None | Disabled |
| 299 | Pug | Kafka | None | JWT | None | Disabled |
| 300 | Pug | Kafka | Redis | JWT | None | Disabled |
| 301 | Pug | Kafka | Redis | JWT | None | Enabled |
| 302 | Pug | Kafka | Memory Cache | JWT | None | Disabled |
| 303 | Pug | Kafka | None | JWT | Google,GitHub | Disabled |
| 304 | Pug | Kafka | Redis | JWT | Google,GitHub | Disabled |
| 305 | Pug | Kafka | Redis | JWT | Google,GitHub | Enabled |
| 306 | Pug | Kafka | Memory Cache | JWT | Google,GitHub | Disabled |

#### Database: MongoDB

| # | View Engine | Communication | Caching | Auth | Social Auth | Background Jobs |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 73 | None | REST APIs | None | None | None | Disabled |
| 74 | None | REST APIs | Redis | None | None | Disabled |
| 75 | None | REST APIs | Redis | None | None | Enabled |
| 76 | None | REST APIs | Memory Cache | None | None | Disabled |
| 77 | None | REST APIs | None | JWT | None | Disabled |
| 78 | None | REST APIs | Redis | JWT | None | Disabled |
| 79 | None | REST APIs | Redis | JWT | None | Enabled |
| 80 | None | REST APIs | Memory Cache | JWT | None | Disabled |
| 81 | None | REST APIs | None | JWT | Google,GitHub | Disabled |
| 82 | None | REST APIs | Redis | JWT | Google,GitHub | Disabled |
| 83 | None | REST APIs | Redis | JWT | Google,GitHub | Enabled |
| 84 | None | REST APIs | Memory Cache | JWT | Google,GitHub | Disabled |
| 85 | None | GraphQL | None | None | None | Disabled |
| 86 | None | GraphQL | Redis | None | None | Disabled |
| 87 | None | GraphQL | Redis | None | None | Enabled |
| 88 | None | GraphQL | Memory Cache | None | None | Disabled |
| 89 | None | GraphQL | None | JWT | None | Disabled |
| 90 | None | GraphQL | Redis | JWT | None | Disabled |
| 91 | None | GraphQL | Redis | JWT | None | Enabled |
| 92 | None | GraphQL | Memory Cache | JWT | None | Disabled |
| 93 | None | GraphQL | None | JWT | Google,GitHub | Disabled |
| 94 | None | GraphQL | Redis | JWT | Google,GitHub | Disabled |
| 95 | None | GraphQL | Redis | JWT | Google,GitHub | Enabled |
| 96 | None | GraphQL | Memory Cache | JWT | Google,GitHub | Disabled |
| 97 | None | Kafka | None | None | None | Disabled |
| 98 | None | Kafka | Redis | None | None | Disabled |
| 99 | None | Kafka | Redis | None | None | Enabled |
| 100 | None | Kafka | Memory Cache | None | None | Disabled |
| 101 | None | Kafka | None | JWT | None | Disabled |
| 102 | None | Kafka | Redis | JWT | None | Disabled |
| 103 | None | Kafka | Redis | JWT | None | Enabled |
| 104 | None | Kafka | Memory Cache | JWT | None | Disabled |
| 105 | None | Kafka | None | JWT | Google,GitHub | Disabled |
| 106 | None | Kafka | Redis | JWT | Google,GitHub | Disabled |
| 107 | None | Kafka | Redis | JWT | Google,GitHub | Enabled |
| 108 | None | Kafka | Memory Cache | JWT | Google,GitHub | Disabled |
| 190 | EJS | REST APIs | None | None | None | Disabled |
| 191 | EJS | REST APIs | Redis | None | None | Disabled |
| 192 | EJS | REST APIs | Redis | None | None | Enabled |
| 193 | EJS | REST APIs | Memory Cache | None | None | Disabled |
| 194 | EJS | REST APIs | None | JWT | None | Disabled |
| 195 | EJS | REST APIs | Redis | JWT | None | Disabled |
| 196 | EJS | REST APIs | Redis | JWT | None | Enabled |
| 197 | EJS | REST APIs | Memory Cache | JWT | None | Disabled |
| 198 | EJS | REST APIs | None | JWT | Google,GitHub | Disabled |
| 199 | EJS | REST APIs | Redis | JWT | Google,GitHub | Disabled |
| 200 | EJS | REST APIs | Redis | JWT | Google,GitHub | Enabled |
| 201 | EJS | REST APIs | Memory Cache | JWT | Google,GitHub | Disabled |
| 202 | EJS | GraphQL | None | None | None | Disabled |
| 203 | EJS | GraphQL | Redis | None | None | Disabled |
| 204 | EJS | GraphQL | Redis | None | None | Enabled |
| 205 | EJS | GraphQL | Memory Cache | None | None | Disabled |
| 206 | EJS | GraphQL | None | JWT | None | Disabled |
| 207 | EJS | GraphQL | Redis | JWT | None | Disabled |
| 208 | EJS | GraphQL | Redis | JWT | None | Enabled |
| 209 | EJS | GraphQL | Memory Cache | JWT | None | Disabled |
| 210 | EJS | GraphQL | None | JWT | Google,GitHub | Disabled |
| 211 | EJS | GraphQL | Redis | JWT | Google,GitHub | Disabled |
| 212 | EJS | GraphQL | Redis | JWT | Google,GitHub | Enabled |
| 213 | EJS | GraphQL | Memory Cache | JWT | Google,GitHub | Disabled |
| 214 | EJS | Kafka | None | None | None | Disabled |
| 215 | EJS | Kafka | Redis | None | None | Disabled |
| 216 | EJS | Kafka | Redis | None | None | Enabled |
| 217 | EJS | Kafka | Memory Cache | None | None | Disabled |
| 218 | EJS | Kafka | None | JWT | None | Disabled |
| 219 | EJS | Kafka | Redis | JWT | None | Disabled |
| 220 | EJS | Kafka | Redis | JWT | None | Enabled |
| 221 | EJS | Kafka | Memory Cache | JWT | None | Disabled |
| 222 | EJS | Kafka | None | JWT | Google,GitHub | Disabled |
| 223 | EJS | Kafka | Redis | JWT | Google,GitHub | Disabled |
| 224 | EJS | Kafka | Redis | JWT | Google,GitHub | Enabled |
| 225 | EJS | Kafka | Memory Cache | JWT | Google,GitHub | Disabled |
| 307 | Pug | REST APIs | None | None | None | Disabled |
| 308 | Pug | REST APIs | Redis | None | None | Disabled |
| 309 | Pug | REST APIs | Redis | None | None | Enabled |
| 310 | Pug | REST APIs | Memory Cache | None | None | Disabled |
| 311 | Pug | REST APIs | None | JWT | None | Disabled |
| 312 | Pug | REST APIs | Redis | JWT | None | Disabled |
| 313 | Pug | REST APIs | Redis | JWT | None | Enabled |
| 314 | Pug | REST APIs | Memory Cache | JWT | None | Disabled |
| 315 | Pug | REST APIs | None | JWT | Google,GitHub | Disabled |
| 316 | Pug | REST APIs | Redis | JWT | Google,GitHub | Disabled |
| 317 | Pug | REST APIs | Redis | JWT | Google,GitHub | Enabled |
| 318 | Pug | REST APIs | Memory Cache | JWT | Google,GitHub | Disabled |
| 319 | Pug | GraphQL | None | None | None | Disabled |
| 320 | Pug | GraphQL | Redis | None | None | Disabled |
| 321 | Pug | GraphQL | Redis | None | None | Enabled |
| 322 | Pug | GraphQL | Memory Cache | None | None | Disabled |
| 323 | Pug | GraphQL | None | JWT | None | Disabled |
| 324 | Pug | GraphQL | Redis | JWT | None | Disabled |
| 325 | Pug | GraphQL | Redis | JWT | None | Enabled |
| 326 | Pug | GraphQL | Memory Cache | JWT | None | Disabled |
| 327 | Pug | GraphQL | None | JWT | Google,GitHub | Disabled |
| 328 | Pug | GraphQL | Redis | JWT | Google,GitHub | Disabled |
| 329 | Pug | GraphQL | Redis | JWT | Google,GitHub | Enabled |
| 330 | Pug | GraphQL | Memory Cache | JWT | Google,GitHub | Disabled |
| 331 | Pug | Kafka | None | None | None | Disabled |
| 332 | Pug | Kafka | Redis | None | None | Disabled |
| 333 | Pug | Kafka | Redis | None | None | Enabled |
| 334 | Pug | Kafka | Memory Cache | None | None | Disabled |
| 335 | Pug | Kafka | None | JWT | None | Disabled |
| 336 | Pug | Kafka | Redis | JWT | None | Disabled |
| 337 | Pug | Kafka | Redis | JWT | None | Enabled |
| 338 | Pug | Kafka | Memory Cache | JWT | None | Disabled |
| 339 | Pug | Kafka | None | JWT | Google,GitHub | Disabled |
| 340 | Pug | Kafka | Redis | JWT | Google,GitHub | Disabled |
| 341 | Pug | Kafka | Redis | JWT | Google,GitHub | Enabled |
| 342 | Pug | Kafka | Memory Cache | JWT | Google,GitHub | Disabled |

#### Database: None

| # | View Engine | Communication | Caching | Auth | Social Auth | Background Jobs |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 109 | None | REST APIs | None | None | None | Disabled |
| 110 | None | REST APIs | None | JWT | None | Disabled |
| 111 | None | REST APIs | None | JWT | Google,GitHub | Disabled |
| 112 | None | GraphQL | None | None | None | Disabled |
| 113 | None | GraphQL | None | JWT | None | Disabled |
| 114 | None | GraphQL | None | JWT | Google,GitHub | Disabled |
| 115 | None | Kafka | None | None | None | Disabled |
| 116 | None | Kafka | None | JWT | None | Disabled |
| 117 | None | Kafka | None | JWT | Google,GitHub | Disabled |
| 226 | EJS | REST APIs | None | None | None | Disabled |
| 227 | EJS | REST APIs | None | JWT | None | Disabled |
| 228 | EJS | REST APIs | None | JWT | Google,GitHub | Disabled |
| 229 | EJS | GraphQL | None | None | None | Disabled |
| 230 | EJS | GraphQL | None | JWT | None | Disabled |
| 231 | EJS | GraphQL | None | JWT | Google,GitHub | Disabled |
| 232 | EJS | Kafka | None | None | None | Disabled |
| 233 | EJS | Kafka | None | JWT | None | Disabled |
| 234 | EJS | Kafka | None | JWT | Google,GitHub | Disabled |
| 343 | Pug | REST APIs | None | None | None | Disabled |
| 344 | Pug | REST APIs | None | JWT | None | Disabled |
| 345 | Pug | REST APIs | None | JWT | Google,GitHub | Disabled |
| 346 | Pug | GraphQL | None | None | None | Disabled |
| 347 | Pug | GraphQL | None | JWT | None | Disabled |
| 348 | Pug | GraphQL | None | JWT | Google,GitHub | Disabled |
| 349 | Pug | Kafka | None | None | None | Disabled |
| 350 | Pug | Kafka | None | JWT | None | Disabled |
| 351 | Pug | Kafka | None | JWT | Google,GitHub | Disabled |

### TypeScript

#### Database: MySQL

| # | View Engine | Communication | Caching | Auth | Social Auth | Background Jobs |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 352 | None | REST APIs | None | None | None | Disabled |
| 353 | None | REST APIs | Redis | None | None | Disabled |
| 354 | None | REST APIs | Redis | None | None | Enabled |
| 355 | None | REST APIs | Memory Cache | None | None | Disabled |
| 356 | None | REST APIs | None | JWT | None | Disabled |
| 357 | None | REST APIs | Redis | JWT | None | Disabled |
| 358 | None | REST APIs | Redis | JWT | None | Enabled |
| 359 | None | REST APIs | Memory Cache | JWT | None | Disabled |
| 360 | None | REST APIs | None | JWT | Google,GitHub | Disabled |
| 361 | None | REST APIs | Redis | JWT | Google,GitHub | Disabled |
| 362 | None | REST APIs | Redis | JWT | Google,GitHub | Enabled |
| 363 | None | REST APIs | Memory Cache | JWT | Google,GitHub | Disabled |
| 364 | None | GraphQL | None | None | None | Disabled |
| 365 | None | GraphQL | Redis | None | None | Disabled |
| 366 | None | GraphQL | Redis | None | None | Enabled |
| 367 | None | GraphQL | Memory Cache | None | None | Disabled |
| 368 | None | GraphQL | None | JWT | None | Disabled |
| 369 | None | GraphQL | Redis | JWT | None | Disabled |
| 370 | None | GraphQL | Redis | JWT | None | Enabled |
| 371 | None | GraphQL | Memory Cache | JWT | None | Disabled |
| 372 | None | GraphQL | None | JWT | Google,GitHub | Disabled |
| 373 | None | GraphQL | Redis | JWT | Google,GitHub | Disabled |
| 374 | None | GraphQL | Redis | JWT | Google,GitHub | Enabled |
| 375 | None | GraphQL | Memory Cache | JWT | Google,GitHub | Disabled |
| 376 | None | Kafka | None | None | None | Disabled |
| 377 | None | Kafka | Redis | None | None | Disabled |
| 378 | None | Kafka | Redis | None | None | Enabled |
| 379 | None | Kafka | Memory Cache | None | None | Disabled |
| 380 | None | Kafka | None | JWT | None | Disabled |
| 381 | None | Kafka | Redis | JWT | None | Disabled |
| 382 | None | Kafka | Redis | JWT | None | Enabled |
| 383 | None | Kafka | Memory Cache | JWT | None | Disabled |
| 384 | None | Kafka | None | JWT | Google,GitHub | Disabled |
| 385 | None | Kafka | Redis | JWT | Google,GitHub | Disabled |
| 386 | None | Kafka | Redis | JWT | Google,GitHub | Enabled |
| 387 | None | Kafka | Memory Cache | JWT | Google,GitHub | Disabled |
| 469 | EJS | REST APIs | None | None | None | Disabled |
| 470 | EJS | REST APIs | Redis | None | None | Disabled |
| 471 | EJS | REST APIs | Redis | None | None | Enabled |
| 472 | EJS | REST APIs | Memory Cache | None | None | Disabled |
| 473 | EJS | REST APIs | None | JWT | None | Disabled |
| 474 | EJS | REST APIs | Redis | JWT | None | Disabled |
| 475 | EJS | REST APIs | Redis | JWT | None | Enabled |
| 476 | EJS | REST APIs | Memory Cache | JWT | None | Disabled |
| 477 | EJS | REST APIs | None | JWT | Google,GitHub | Disabled |
| 478 | EJS | REST APIs | Redis | JWT | Google,GitHub | Disabled |
| 479 | EJS | REST APIs | Redis | JWT | Google,GitHub | Enabled |
| 480 | EJS | REST APIs | Memory Cache | JWT | Google,GitHub | Disabled |
| 481 | EJS | GraphQL | None | None | None | Disabled |
| 482 | EJS | GraphQL | Redis | None | None | Disabled |
| 483 | EJS | GraphQL | Redis | None | None | Enabled |
| 484 | EJS | GraphQL | Memory Cache | None | None | Disabled |
| 485 | EJS | GraphQL | None | JWT | None | Disabled |
| 486 | EJS | GraphQL | Redis | JWT | None | Disabled |
| 487 | EJS | GraphQL | Redis | JWT | None | Enabled |
| 488 | EJS | GraphQL | Memory Cache | JWT | None | Disabled |
| 489 | EJS | GraphQL | None | JWT | Google,GitHub | Disabled |
| 490 | EJS | GraphQL | Redis | JWT | Google,GitHub | Disabled |
| 491 | EJS | GraphQL | Redis | JWT | Google,GitHub | Enabled |
| 492 | EJS | GraphQL | Memory Cache | JWT | Google,GitHub | Disabled |
| 493 | EJS | Kafka | None | None | None | Disabled |
| 494 | EJS | Kafka | Redis | None | None | Disabled |
| 495 | EJS | Kafka | Redis | None | None | Enabled |
| 496 | EJS | Kafka | Memory Cache | None | None | Disabled |
| 497 | EJS | Kafka | None | JWT | None | Disabled |
| 498 | EJS | Kafka | Redis | JWT | None | Disabled |
| 499 | EJS | Kafka | Redis | JWT | None | Enabled |
| 500 | EJS | Kafka | Memory Cache | JWT | None | Disabled |
| 501 | EJS | Kafka | None | JWT | Google,GitHub | Disabled |
| 502 | EJS | Kafka | Redis | JWT | Google,GitHub | Disabled |
| 503 | EJS | Kafka | Redis | JWT | Google,GitHub | Enabled |
| 504 | EJS | Kafka | Memory Cache | JWT | Google,GitHub | Disabled |
| 586 | Pug | REST APIs | None | None | None | Disabled |
| 587 | Pug | REST APIs | Redis | None | None | Disabled |
| 588 | Pug | REST APIs | Redis | None | None | Enabled |
| 589 | Pug | REST APIs | Memory Cache | None | None | Disabled |
| 590 | Pug | REST APIs | None | JWT | None | Disabled |
| 591 | Pug | REST APIs | Redis | JWT | None | Disabled |
| 592 | Pug | REST APIs | Redis | JWT | None | Enabled |
| 593 | Pug | REST APIs | Memory Cache | JWT | None | Disabled |
| 594 | Pug | REST APIs | None | JWT | Google,GitHub | Disabled |
| 595 | Pug | REST APIs | Redis | JWT | Google,GitHub | Disabled |
| 596 | Pug | REST APIs | Redis | JWT | Google,GitHub | Enabled |
| 597 | Pug | REST APIs | Memory Cache | JWT | Google,GitHub | Disabled |
| 598 | Pug | GraphQL | None | None | None | Disabled |
| 599 | Pug | GraphQL | Redis | None | None | Disabled |
| 600 | Pug | GraphQL | Redis | None | None | Enabled |
| 601 | Pug | GraphQL | Memory Cache | None | None | Disabled |
| 602 | Pug | GraphQL | None | JWT | None | Disabled |
| 603 | Pug | GraphQL | Redis | JWT | None | Disabled |
| 604 | Pug | GraphQL | Redis | JWT | None | Enabled |
| 605 | Pug | GraphQL | Memory Cache | JWT | None | Disabled |
| 606 | Pug | GraphQL | None | JWT | Google,GitHub | Disabled |
| 607 | Pug | GraphQL | Redis | JWT | Google,GitHub | Disabled |
| 608 | Pug | GraphQL | Redis | JWT | Google,GitHub | Enabled |
| 609 | Pug | GraphQL | Memory Cache | JWT | Google,GitHub | Disabled |
| 610 | Pug | Kafka | None | None | None | Disabled |
| 611 | Pug | Kafka | Redis | None | None | Disabled |
| 612 | Pug | Kafka | Redis | None | None | Enabled |
| 613 | Pug | Kafka | Memory Cache | None | None | Disabled |
| 614 | Pug | Kafka | None | JWT | None | Disabled |
| 615 | Pug | Kafka | Redis | JWT | None | Disabled |
| 616 | Pug | Kafka | Redis | JWT | None | Enabled |
| 617 | Pug | Kafka | Memory Cache | JWT | None | Disabled |
| 618 | Pug | Kafka | None | JWT | Google,GitHub | Disabled |
| 619 | Pug | Kafka | Redis | JWT | Google,GitHub | Disabled |
| 620 | Pug | Kafka | Redis | JWT | Google,GitHub | Enabled |
| 621 | Pug | Kafka | Memory Cache | JWT | Google,GitHub | Disabled |

#### Database: PostgreSQL

| # | View Engine | Communication | Caching | Auth | Social Auth | Background Jobs |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 388 | None | REST APIs | None | None | None | Disabled |
| 389 | None | REST APIs | Redis | None | None | Disabled |
| 390 | None | REST APIs | Redis | None | None | Enabled |
| 391 | None | REST APIs | Memory Cache | None | None | Disabled |
| 392 | None | REST APIs | None | JWT | None | Disabled |
| 393 | None | REST APIs | Redis | JWT | None | Disabled |
| 394 | None | REST APIs | Redis | JWT | None | Enabled |
| 395 | None | REST APIs | Memory Cache | JWT | None | Disabled |
| 396 | None | REST APIs | None | JWT | Google,GitHub | Disabled |
| 397 | None | REST APIs | Redis | JWT | Google,GitHub | Disabled |
| 398 | None | REST APIs | Redis | JWT | Google,GitHub | Enabled |
| 399 | None | REST APIs | Memory Cache | JWT | Google,GitHub | Disabled |
| 400 | None | GraphQL | None | None | None | Disabled |
| 401 | None | GraphQL | Redis | None | None | Disabled |
| 402 | None | GraphQL | Redis | None | None | Enabled |
| 403 | None | GraphQL | Memory Cache | None | None | Disabled |
| 404 | None | GraphQL | None | JWT | None | Disabled |
| 405 | None | GraphQL | Redis | JWT | None | Disabled |
| 406 | None | GraphQL | Redis | JWT | None | Enabled |
| 407 | None | GraphQL | Memory Cache | JWT | None | Disabled |
| 408 | None | GraphQL | None | JWT | Google,GitHub | Disabled |
| 409 | None | GraphQL | Redis | JWT | Google,GitHub | Disabled |
| 410 | None | GraphQL | Redis | JWT | Google,GitHub | Enabled |
| 411 | None | GraphQL | Memory Cache | JWT | Google,GitHub | Disabled |
| 412 | None | Kafka | None | None | None | Disabled |
| 413 | None | Kafka | Redis | None | None | Disabled |
| 414 | None | Kafka | Redis | None | None | Enabled |
| 415 | None | Kafka | Memory Cache | None | None | Disabled |
| 416 | None | Kafka | None | JWT | None | Disabled |
| 417 | None | Kafka | Redis | JWT | None | Disabled |
| 418 | None | Kafka | Redis | JWT | None | Enabled |
| 419 | None | Kafka | Memory Cache | JWT | None | Disabled |
| 420 | None | Kafka | None | JWT | Google,GitHub | Disabled |
| 421 | None | Kafka | Redis | JWT | Google,GitHub | Disabled |
| 422 | None | Kafka | Redis | JWT | Google,GitHub | Enabled |
| 423 | None | Kafka | Memory Cache | JWT | Google,GitHub | Disabled |
| 505 | EJS | REST APIs | None | None | None | Disabled |
| 506 | EJS | REST APIs | Redis | None | None | Disabled |
| 507 | EJS | REST APIs | Redis | None | None | Enabled |
| 508 | EJS | REST APIs | Memory Cache | None | None | Disabled |
| 509 | EJS | REST APIs | None | JWT | None | Disabled |
| 510 | EJS | REST APIs | Redis | JWT | None | Disabled |
| 511 | EJS | REST APIs | Redis | JWT | None | Enabled |
| 512 | EJS | REST APIs | Memory Cache | JWT | None | Disabled |
| 513 | EJS | REST APIs | None | JWT | Google,GitHub | Disabled |
| 514 | EJS | REST APIs | Redis | JWT | Google,GitHub | Disabled |
| 515 | EJS | REST APIs | Redis | JWT | Google,GitHub | Enabled |
| 516 | EJS | REST APIs | Memory Cache | JWT | Google,GitHub | Disabled |
| 517 | EJS | GraphQL | None | None | None | Disabled |
| 518 | EJS | GraphQL | Redis | None | None | Disabled |
| 519 | EJS | GraphQL | Redis | None | None | Enabled |
| 520 | EJS | GraphQL | Memory Cache | None | None | Disabled |
| 521 | EJS | GraphQL | None | JWT | None | Disabled |
| 522 | EJS | GraphQL | Redis | JWT | None | Disabled |
| 523 | EJS | GraphQL | Redis | JWT | None | Enabled |
| 524 | EJS | GraphQL | Memory Cache | JWT | None | Disabled |
| 525 | EJS | GraphQL | None | JWT | Google,GitHub | Disabled |
| 526 | EJS | GraphQL | Redis | JWT | Google,GitHub | Disabled |
| 527 | EJS | GraphQL | Redis | JWT | Google,GitHub | Enabled |
| 528 | EJS | GraphQL | Memory Cache | JWT | Google,GitHub | Disabled |
| 529 | EJS | Kafka | None | None | None | Disabled |
| 530 | EJS | Kafka | Redis | None | None | Disabled |
| 531 | EJS | Kafka | Redis | None | None | Enabled |
| 532 | EJS | Kafka | Memory Cache | None | None | Disabled |
| 533 | EJS | Kafka | None | JWT | None | Disabled |
| 534 | EJS | Kafka | Redis | JWT | None | Disabled |
| 535 | EJS | Kafka | Redis | JWT | None | Enabled |
| 536 | EJS | Kafka | Memory Cache | JWT | None | Disabled |
| 537 | EJS | Kafka | None | JWT | Google,GitHub | Disabled |
| 538 | EJS | Kafka | Redis | JWT | Google,GitHub | Disabled |
| 539 | EJS | Kafka | Redis | JWT | Google,GitHub | Enabled |
| 540 | EJS | Kafka | Memory Cache | JWT | Google,GitHub | Disabled |
| 622 | Pug | REST APIs | None | None | None | Disabled |
| 623 | Pug | REST APIs | Redis | None | None | Disabled |
| 624 | Pug | REST APIs | Redis | None | None | Enabled |
| 625 | Pug | REST APIs | Memory Cache | None | None | Disabled |
| 626 | Pug | REST APIs | None | JWT | None | Disabled |
| 627 | Pug | REST APIs | Redis | JWT | None | Disabled |
| 628 | Pug | REST APIs | Redis | JWT | None | Enabled |
| 629 | Pug | REST APIs | Memory Cache | JWT | None | Disabled |
| 630 | Pug | REST APIs | None | JWT | Google,GitHub | Disabled |
| 631 | Pug | REST APIs | Redis | JWT | Google,GitHub | Disabled |
| 632 | Pug | REST APIs | Redis | JWT | Google,GitHub | Enabled |
| 633 | Pug | REST APIs | Memory Cache | JWT | Google,GitHub | Disabled |
| 634 | Pug | GraphQL | None | None | None | Disabled |
| 635 | Pug | GraphQL | Redis | None | None | Disabled |
| 636 | Pug | GraphQL | Redis | None | None | Enabled |
| 637 | Pug | GraphQL | Memory Cache | None | None | Disabled |
| 638 | Pug | GraphQL | None | JWT | None | Disabled |
| 639 | Pug | GraphQL | Redis | JWT | None | Disabled |
| 640 | Pug | GraphQL | Redis | JWT | None | Enabled |
| 641 | Pug | GraphQL | Memory Cache | JWT | None | Disabled |
| 642 | Pug | GraphQL | None | JWT | Google,GitHub | Disabled |
| 643 | Pug | GraphQL | Redis | JWT | Google,GitHub | Disabled |
| 644 | Pug | GraphQL | Redis | JWT | Google,GitHub | Enabled |
| 645 | Pug | GraphQL | Memory Cache | JWT | Google,GitHub | Disabled |
| 646 | Pug | Kafka | None | None | None | Disabled |
| 647 | Pug | Kafka | Redis | None | None | Disabled |
| 648 | Pug | Kafka | Redis | None | None | Enabled |
| 649 | Pug | Kafka | Memory Cache | None | None | Disabled |
| 650 | Pug | Kafka | None | JWT | None | Disabled |
| 651 | Pug | Kafka | Redis | JWT | None | Disabled |
| 652 | Pug | Kafka | Redis | JWT | None | Enabled |
| 653 | Pug | Kafka | Memory Cache | JWT | None | Disabled |
| 654 | Pug | Kafka | None | JWT | Google,GitHub | Disabled |
| 655 | Pug | Kafka | Redis | JWT | Google,GitHub | Disabled |
| 656 | Pug | Kafka | Redis | JWT | Google,GitHub | Enabled |
| 657 | Pug | Kafka | Memory Cache | JWT | Google,GitHub | Disabled |

#### Database: MongoDB

| # | View Engine | Communication | Caching | Auth | Social Auth | Background Jobs |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 424 | None | REST APIs | None | None | None | Disabled |
| 425 | None | REST APIs | Redis | None | None | Disabled |
| 426 | None | REST APIs | Redis | None | None | Enabled |
| 427 | None | REST APIs | Memory Cache | None | None | Disabled |
| 428 | None | REST APIs | None | JWT | None | Disabled |
| 429 | None | REST APIs | Redis | JWT | None | Disabled |
| 430 | None | REST APIs | Redis | JWT | None | Enabled |
| 431 | None | REST APIs | Memory Cache | JWT | None | Disabled |
| 432 | None | REST APIs | None | JWT | Google,GitHub | Disabled |
| 433 | None | REST APIs | Redis | JWT | Google,GitHub | Disabled |
| 434 | None | REST APIs | Redis | JWT | Google,GitHub | Enabled |
| 435 | None | REST APIs | Memory Cache | JWT | Google,GitHub | Disabled |
| 436 | None | GraphQL | None | None | None | Disabled |
| 437 | None | GraphQL | Redis | None | None | Disabled |
| 438 | None | GraphQL | Redis | None | None | Enabled |
| 439 | None | GraphQL | Memory Cache | None | None | Disabled |
| 440 | None | GraphQL | None | JWT | None | Disabled |
| 441 | None | GraphQL | Redis | JWT | None | Disabled |
| 442 | None | GraphQL | Redis | JWT | None | Enabled |
| 443 | None | GraphQL | Memory Cache | JWT | None | Disabled |
| 444 | None | GraphQL | None | JWT | Google,GitHub | Disabled |
| 445 | None | GraphQL | Redis | JWT | Google,GitHub | Disabled |
| 446 | None | GraphQL | Redis | JWT | Google,GitHub | Enabled |
| 447 | None | GraphQL | Memory Cache | JWT | Google,GitHub | Disabled |
| 448 | None | Kafka | None | None | None | Disabled |
| 449 | None | Kafka | Redis | None | None | Disabled |
| 450 | None | Kafka | Redis | None | None | Enabled |
| 451 | None | Kafka | Memory Cache | None | None | Disabled |
| 452 | None | Kafka | None | JWT | None | Disabled |
| 453 | None | Kafka | Redis | JWT | None | Disabled |
| 454 | None | Kafka | Redis | JWT | None | Enabled |
| 455 | None | Kafka | Memory Cache | JWT | None | Disabled |
| 456 | None | Kafka | None | JWT | Google,GitHub | Disabled |
| 457 | None | Kafka | Redis | JWT | Google,GitHub | Disabled |
| 458 | None | Kafka | Redis | JWT | Google,GitHub | Enabled |
| 459 | None | Kafka | Memory Cache | JWT | Google,GitHub | Disabled |
| 541 | EJS | REST APIs | None | None | None | Disabled |
| 542 | EJS | REST APIs | Redis | None | None | Disabled |
| 543 | EJS | REST APIs | Redis | None | None | Enabled |
| 544 | EJS | REST APIs | Memory Cache | None | None | Disabled |
| 545 | EJS | REST APIs | None | JWT | None | Disabled |
| 546 | EJS | REST APIs | Redis | JWT | None | Disabled |
| 547 | EJS | REST APIs | Redis | JWT | None | Enabled |
| 548 | EJS | REST APIs | Memory Cache | JWT | None | Disabled |
| 549 | EJS | REST APIs | None | JWT | Google,GitHub | Disabled |
| 550 | EJS | REST APIs | Redis | JWT | Google,GitHub | Disabled |
| 551 | EJS | REST APIs | Redis | JWT | Google,GitHub | Enabled |
| 552 | EJS | REST APIs | Memory Cache | JWT | Google,GitHub | Disabled |
| 553 | EJS | GraphQL | None | None | None | Disabled |
| 554 | EJS | GraphQL | Redis | None | None | Disabled |
| 555 | EJS | GraphQL | Redis | None | None | Enabled |
| 556 | EJS | GraphQL | Memory Cache | None | None | Disabled |
| 557 | EJS | GraphQL | None | JWT | None | Disabled |
| 558 | EJS | GraphQL | Redis | JWT | None | Disabled |
| 559 | EJS | GraphQL | Redis | JWT | None | Enabled |
| 560 | EJS | GraphQL | Memory Cache | JWT | None | Disabled |
| 561 | EJS | GraphQL | None | JWT | Google,GitHub | Disabled |
| 562 | EJS | GraphQL | Redis | JWT | Google,GitHub | Disabled |
| 563 | EJS | GraphQL | Redis | JWT | Google,GitHub | Enabled |
| 564 | EJS | GraphQL | Memory Cache | JWT | Google,GitHub | Disabled |
| 565 | EJS | Kafka | None | None | None | Disabled |
| 566 | EJS | Kafka | Redis | None | None | Disabled |
| 567 | EJS | Kafka | Redis | None | None | Enabled |
| 568 | EJS | Kafka | Memory Cache | None | None | Disabled |
| 569 | EJS | Kafka | None | JWT | None | Disabled |
| 570 | EJS | Kafka | Redis | JWT | None | Disabled |
| 571 | EJS | Kafka | Redis | JWT | None | Enabled |
| 572 | EJS | Kafka | Memory Cache | JWT | None | Disabled |
| 573 | EJS | Kafka | None | JWT | Google,GitHub | Disabled |
| 574 | EJS | Kafka | Redis | JWT | Google,GitHub | Disabled |
| 575 | EJS | Kafka | Redis | JWT | Google,GitHub | Enabled |
| 576 | EJS | Kafka | Memory Cache | JWT | Google,GitHub | Disabled |
| 658 | Pug | REST APIs | None | None | None | Disabled |
| 659 | Pug | REST APIs | Redis | None | None | Disabled |
| 660 | Pug | REST APIs | Redis | None | None | Enabled |
| 661 | Pug | REST APIs | Memory Cache | None | None | Disabled |
| 662 | Pug | REST APIs | None | JWT | None | Disabled |
| 663 | Pug | REST APIs | Redis | JWT | None | Disabled |
| 664 | Pug | REST APIs | Redis | JWT | None | Enabled |
| 665 | Pug | REST APIs | Memory Cache | JWT | None | Disabled |
| 666 | Pug | REST APIs | None | JWT | Google,GitHub | Disabled |
| 667 | Pug | REST APIs | Redis | JWT | Google,GitHub | Disabled |
| 668 | Pug | REST APIs | Redis | JWT | Google,GitHub | Enabled |
| 669 | Pug | REST APIs | Memory Cache | JWT | Google,GitHub | Disabled |
| 670 | Pug | GraphQL | None | None | None | Disabled |
| 671 | Pug | GraphQL | Redis | None | None | Disabled |
| 672 | Pug | GraphQL | Redis | None | None | Enabled |
| 673 | Pug | GraphQL | Memory Cache | None | None | Disabled |
| 674 | Pug | GraphQL | None | JWT | None | Disabled |
| 675 | Pug | GraphQL | Redis | JWT | None | Disabled |
| 676 | Pug | GraphQL | Redis | JWT | None | Enabled |
| 677 | Pug | GraphQL | Memory Cache | JWT | None | Disabled |
| 678 | Pug | GraphQL | None | JWT | Google,GitHub | Disabled |
| 679 | Pug | GraphQL | Redis | JWT | Google,GitHub | Disabled |
| 680 | Pug | GraphQL | Redis | JWT | Google,GitHub | Enabled |
| 681 | Pug | GraphQL | Memory Cache | JWT | Google,GitHub | Disabled |
| 682 | Pug | Kafka | None | None | None | Disabled |
| 683 | Pug | Kafka | Redis | None | None | Disabled |
| 684 | Pug | Kafka | Redis | None | None | Enabled |
| 685 | Pug | Kafka | Memory Cache | None | None | Disabled |
| 686 | Pug | Kafka | None | JWT | None | Disabled |
| 687 | Pug | Kafka | Redis | JWT | None | Disabled |
| 688 | Pug | Kafka | Redis | JWT | None | Enabled |
| 689 | Pug | Kafka | Memory Cache | JWT | None | Disabled |
| 690 | Pug | Kafka | None | JWT | Google,GitHub | Disabled |
| 691 | Pug | Kafka | Redis | JWT | Google,GitHub | Disabled |
| 692 | Pug | Kafka | Redis | JWT | Google,GitHub | Enabled |
| 693 | Pug | Kafka | Memory Cache | JWT | Google,GitHub | Disabled |

#### Database: None

| # | View Engine | Communication | Caching | Auth | Social Auth | Background Jobs |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 460 | None | REST APIs | None | None | None | Disabled |
| 461 | None | REST APIs | None | JWT | None | Disabled |
| 462 | None | REST APIs | None | JWT | Google,GitHub | Disabled |
| 463 | None | GraphQL | None | None | None | Disabled |
| 464 | None | GraphQL | None | JWT | None | Disabled |
| 465 | None | GraphQL | None | JWT | Google,GitHub | Disabled |
| 466 | None | Kafka | None | None | None | Disabled |
| 467 | None | Kafka | None | JWT | None | Disabled |
| 468 | None | Kafka | None | JWT | Google,GitHub | Disabled |
| 577 | EJS | REST APIs | None | None | None | Disabled |
| 578 | EJS | REST APIs | None | JWT | None | Disabled |
| 579 | EJS | REST APIs | None | JWT | Google,GitHub | Disabled |
| 580 | EJS | GraphQL | None | None | None | Disabled |
| 581 | EJS | GraphQL | None | JWT | None | Disabled |
| 582 | EJS | GraphQL | None | JWT | Google,GitHub | Disabled |
| 583 | EJS | Kafka | None | None | None | Disabled |
| 584 | EJS | Kafka | None | JWT | None | Disabled |
| 585 | EJS | Kafka | None | JWT | Google,GitHub | Disabled |
| 694 | Pug | REST APIs | None | None | None | Disabled |
| 695 | Pug | REST APIs | None | JWT | None | Disabled |
| 696 | Pug | REST APIs | None | JWT | Google,GitHub | Disabled |
| 697 | Pug | GraphQL | None | None | None | Disabled |
| 698 | Pug | GraphQL | None | JWT | None | Disabled |
| 699 | Pug | GraphQL | None | JWT | Google,GitHub | Disabled |
| 700 | Pug | Kafka | None | None | None | Disabled |
| 701 | Pug | Kafka | None | JWT | None | Disabled |
| 702 | Pug | Kafka | None | JWT | Google,GitHub | Disabled |


## 2. Clean Architecture (234 Cases)
*Note: Clean Architecture does not use server-side view engines (EJS/Pug).*

### JavaScript

#### Database: MySQL

| # | Communication | Caching | Auth | Social Auth | Background Jobs |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 703 | REST APIs | None | None | None | Disabled |
| 704 | REST APIs | Redis | None | None | Disabled |
| 705 | REST APIs | Redis | None | None | Enabled |
| 706 | REST APIs | Memory Cache | None | None | Disabled |
| 707 | REST APIs | None | JWT | None | Disabled |
| 708 | REST APIs | Redis | JWT | None | Disabled |
| 709 | REST APIs | Redis | JWT | None | Enabled |
| 710 | REST APIs | Memory Cache | JWT | None | Disabled |
| 711 | REST APIs | None | JWT | Google,GitHub | Disabled |
| 712 | REST APIs | Redis | JWT | Google,GitHub | Disabled |
| 713 | REST APIs | Redis | JWT | Google,GitHub | Enabled |
| 714 | REST APIs | Memory Cache | JWT | Google,GitHub | Disabled |
| 715 | GraphQL | None | None | None | Disabled |
| 716 | GraphQL | Redis | None | None | Disabled |
| 717 | GraphQL | Redis | None | None | Enabled |
| 718 | GraphQL | Memory Cache | None | None | Disabled |
| 719 | GraphQL | None | JWT | None | Disabled |
| 720 | GraphQL | Redis | JWT | None | Disabled |
| 721 | GraphQL | Redis | JWT | None | Enabled |
| 722 | GraphQL | Memory Cache | JWT | None | Disabled |
| 723 | GraphQL | None | JWT | Google,GitHub | Disabled |
| 724 | GraphQL | Redis | JWT | Google,GitHub | Disabled |
| 725 | GraphQL | Redis | JWT | Google,GitHub | Enabled |
| 726 | GraphQL | Memory Cache | JWT | Google,GitHub | Disabled |
| 727 | Kafka | None | None | None | Disabled |
| 728 | Kafka | Redis | None | None | Disabled |
| 729 | Kafka | Redis | None | None | Enabled |
| 730 | Kafka | Memory Cache | None | None | Disabled |
| 731 | Kafka | None | JWT | None | Disabled |
| 732 | Kafka | Redis | JWT | None | Disabled |
| 733 | Kafka | Redis | JWT | None | Enabled |
| 734 | Kafka | Memory Cache | JWT | None | Disabled |
| 735 | Kafka | None | JWT | Google,GitHub | Disabled |
| 736 | Kafka | Redis | JWT | Google,GitHub | Disabled |
| 737 | Kafka | Redis | JWT | Google,GitHub | Enabled |
| 738 | Kafka | Memory Cache | JWT | Google,GitHub | Disabled |

#### Database: PostgreSQL

| # | Communication | Caching | Auth | Social Auth | Background Jobs |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 739 | REST APIs | None | None | None | Disabled |
| 740 | REST APIs | Redis | None | None | Disabled |
| 741 | REST APIs | Redis | None | None | Enabled |
| 742 | REST APIs | Memory Cache | None | None | Disabled |
| 743 | REST APIs | None | JWT | None | Disabled |
| 744 | REST APIs | Redis | JWT | None | Disabled |
| 745 | REST APIs | Redis | JWT | None | Enabled |
| 746 | REST APIs | Memory Cache | JWT | None | Disabled |
| 747 | REST APIs | None | JWT | Google,GitHub | Disabled |
| 748 | REST APIs | Redis | JWT | Google,GitHub | Disabled |
| 749 | REST APIs | Redis | JWT | Google,GitHub | Enabled |
| 750 | REST APIs | Memory Cache | JWT | Google,GitHub | Disabled |
| 751 | GraphQL | None | None | None | Disabled |
| 752 | GraphQL | Redis | None | None | Disabled |
| 753 | GraphQL | Redis | None | None | Enabled |
| 754 | GraphQL | Memory Cache | None | None | Disabled |
| 755 | GraphQL | None | JWT | None | Disabled |
| 756 | GraphQL | Redis | JWT | None | Disabled |
| 757 | GraphQL | Redis | JWT | None | Enabled |
| 758 | GraphQL | Memory Cache | JWT | None | Disabled |
| 759 | GraphQL | None | JWT | Google,GitHub | Disabled |
| 760 | GraphQL | Redis | JWT | Google,GitHub | Disabled |
| 761 | GraphQL | Redis | JWT | Google,GitHub | Enabled |
| 762 | GraphQL | Memory Cache | JWT | Google,GitHub | Disabled |
| 763 | Kafka | None | None | None | Disabled |
| 764 | Kafka | Redis | None | None | Disabled |
| 765 | Kafka | Redis | None | None | Enabled |
| 766 | Kafka | Memory Cache | None | None | Disabled |
| 767 | Kafka | None | JWT | None | Disabled |
| 768 | Kafka | Redis | JWT | None | Disabled |
| 769 | Kafka | Redis | JWT | None | Enabled |
| 770 | Kafka | Memory Cache | JWT | None | Disabled |
| 771 | Kafka | None | JWT | Google,GitHub | Disabled |
| 772 | Kafka | Redis | JWT | Google,GitHub | Disabled |
| 773 | Kafka | Redis | JWT | Google,GitHub | Enabled |
| 774 | Kafka | Memory Cache | JWT | Google,GitHub | Disabled |

#### Database: MongoDB

| # | Communication | Caching | Auth | Social Auth | Background Jobs |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 775 | REST APIs | None | None | None | Disabled |
| 776 | REST APIs | Redis | None | None | Disabled |
| 777 | REST APIs | Redis | None | None | Enabled |
| 778 | REST APIs | Memory Cache | None | None | Disabled |
| 779 | REST APIs | None | JWT | None | Disabled |
| 780 | REST APIs | Redis | JWT | None | Disabled |
| 781 | REST APIs | Redis | JWT | None | Enabled |
| 782 | REST APIs | Memory Cache | JWT | None | Disabled |
| 783 | REST APIs | None | JWT | Google,GitHub | Disabled |
| 784 | REST APIs | Redis | JWT | Google,GitHub | Disabled |
| 785 | REST APIs | Redis | JWT | Google,GitHub | Enabled |
| 786 | REST APIs | Memory Cache | JWT | Google,GitHub | Disabled |
| 787 | GraphQL | None | None | None | Disabled |
| 788 | GraphQL | Redis | None | None | Disabled |
| 789 | GraphQL | Redis | None | None | Enabled |
| 790 | GraphQL | Memory Cache | None | None | Disabled |
| 791 | GraphQL | None | JWT | None | Disabled |
| 792 | GraphQL | Redis | JWT | None | Disabled |
| 793 | GraphQL | Redis | JWT | None | Enabled |
| 794 | GraphQL | Memory Cache | JWT | None | Disabled |
| 795 | GraphQL | None | JWT | Google,GitHub | Disabled |
| 796 | GraphQL | Redis | JWT | Google,GitHub | Disabled |
| 797 | GraphQL | Redis | JWT | Google,GitHub | Enabled |
| 798 | GraphQL | Memory Cache | JWT | Google,GitHub | Disabled |
| 799 | Kafka | None | None | None | Disabled |
| 800 | Kafka | Redis | None | None | Disabled |
| 801 | Kafka | Redis | None | None | Enabled |
| 802 | Kafka | Memory Cache | None | None | Disabled |
| 803 | Kafka | None | JWT | None | Disabled |
| 804 | Kafka | Redis | JWT | None | Disabled |
| 805 | Kafka | Redis | JWT | None | Enabled |
| 806 | Kafka | Memory Cache | JWT | None | Disabled |
| 807 | Kafka | None | JWT | Google,GitHub | Disabled |
| 808 | Kafka | Redis | JWT | Google,GitHub | Disabled |
| 809 | Kafka | Redis | JWT | Google,GitHub | Enabled |
| 810 | Kafka | Memory Cache | JWT | Google,GitHub | Disabled |

#### Database: None

| # | Communication | Caching | Auth | Social Auth | Background Jobs |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 811 | REST APIs | None | None | None | Disabled |
| 812 | REST APIs | None | JWT | None | Disabled |
| 813 | REST APIs | None | JWT | Google,GitHub | Disabled |
| 814 | GraphQL | None | None | None | Disabled |
| 815 | GraphQL | None | JWT | None | Disabled |
| 816 | GraphQL | None | JWT | Google,GitHub | Disabled |
| 817 | Kafka | None | None | None | Disabled |
| 818 | Kafka | None | JWT | None | Disabled |
| 819 | Kafka | None | JWT | Google,GitHub | Disabled |

### TypeScript

#### Database: MySQL

| # | Communication | Caching | Auth | Social Auth | Background Jobs |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 820 | REST APIs | None | None | None | Disabled |
| 821 | REST APIs | Redis | None | None | Disabled |
| 822 | REST APIs | Redis | None | None | Enabled |
| 823 | REST APIs | Memory Cache | None | None | Disabled |
| 824 | REST APIs | None | JWT | None | Disabled |
| 825 | REST APIs | Redis | JWT | None | Disabled |
| 826 | REST APIs | Redis | JWT | None | Enabled |
| 827 | REST APIs | Memory Cache | JWT | None | Disabled |
| 828 | REST APIs | None | JWT | Google,GitHub | Disabled |
| 829 | REST APIs | Redis | JWT | Google,GitHub | Disabled |
| 830 | REST APIs | Redis | JWT | Google,GitHub | Enabled |
| 831 | REST APIs | Memory Cache | JWT | Google,GitHub | Disabled |
| 832 | GraphQL | None | None | None | Disabled |
| 833 | GraphQL | Redis | None | None | Disabled |
| 834 | GraphQL | Redis | None | None | Enabled |
| 835 | GraphQL | Memory Cache | None | None | Disabled |
| 836 | GraphQL | None | JWT | None | Disabled |
| 837 | GraphQL | Redis | JWT | None | Disabled |
| 838 | GraphQL | Redis | JWT | None | Enabled |
| 839 | GraphQL | Memory Cache | JWT | None | Disabled |
| 840 | GraphQL | None | JWT | Google,GitHub | Disabled |
| 841 | GraphQL | Redis | JWT | Google,GitHub | Disabled |
| 842 | GraphQL | Redis | JWT | Google,GitHub | Enabled |
| 843 | GraphQL | Memory Cache | JWT | Google,GitHub | Disabled |
| 844 | Kafka | None | None | None | Disabled |
| 845 | Kafka | Redis | None | None | Disabled |
| 846 | Kafka | Redis | None | None | Enabled |
| 847 | Kafka | Memory Cache | None | None | Disabled |
| 848 | Kafka | None | JWT | None | Disabled |
| 849 | Kafka | Redis | JWT | None | Disabled |
| 850 | Kafka | Redis | JWT | None | Enabled |
| 851 | Kafka | Memory Cache | JWT | None | Disabled |
| 852 | Kafka | None | JWT | Google,GitHub | Disabled |
| 853 | Kafka | Redis | JWT | Google,GitHub | Disabled |
| 854 | Kafka | Redis | JWT | Google,GitHub | Enabled |
| 855 | Kafka | Memory Cache | JWT | Google,GitHub | Disabled |

#### Database: PostgreSQL

| # | Communication | Caching | Auth | Social Auth | Background Jobs |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 856 | REST APIs | None | None | None | Disabled |
| 857 | REST APIs | Redis | None | None | Disabled |
| 858 | REST APIs | Redis | None | None | Enabled |
| 859 | REST APIs | Memory Cache | None | None | Disabled |
| 860 | REST APIs | None | JWT | None | Disabled |
| 861 | REST APIs | Redis | JWT | None | Disabled |
| 862 | REST APIs | Redis | JWT | None | Enabled |
| 863 | REST APIs | Memory Cache | JWT | None | Disabled |
| 864 | REST APIs | None | JWT | Google,GitHub | Disabled |
| 865 | REST APIs | Redis | JWT | Google,GitHub | Disabled |
| 866 | REST APIs | Redis | JWT | Google,GitHub | Enabled |
| 867 | REST APIs | Memory Cache | JWT | Google,GitHub | Disabled |
| 868 | GraphQL | None | None | None | Disabled |
| 869 | GraphQL | Redis | None | None | Disabled |
| 870 | GraphQL | Redis | None | None | Enabled |
| 871 | GraphQL | Memory Cache | None | None | Disabled |
| 872 | GraphQL | None | JWT | None | Disabled |
| 873 | GraphQL | Redis | JWT | None | Disabled |
| 874 | GraphQL | Redis | JWT | None | Enabled |
| 875 | GraphQL | Memory Cache | JWT | None | Disabled |
| 876 | GraphQL | None | JWT | Google,GitHub | Disabled |
| 877 | GraphQL | Redis | JWT | Google,GitHub | Disabled |
| 878 | GraphQL | Redis | JWT | Google,GitHub | Enabled |
| 879 | GraphQL | Memory Cache | JWT | Google,GitHub | Disabled |
| 880 | Kafka | None | None | None | Disabled |
| 881 | Kafka | Redis | None | None | Disabled |
| 882 | Kafka | Redis | None | None | Enabled |
| 883 | Kafka | Memory Cache | None | None | Disabled |
| 884 | Kafka | None | JWT | None | Disabled |
| 885 | Kafka | Redis | JWT | None | Disabled |
| 886 | Kafka | Redis | JWT | None | Enabled |
| 887 | Kafka | Memory Cache | JWT | None | Disabled |
| 888 | Kafka | None | JWT | Google,GitHub | Disabled |
| 889 | Kafka | Redis | JWT | Google,GitHub | Disabled |
| 890 | Kafka | Redis | JWT | Google,GitHub | Enabled |
| 891 | Kafka | Memory Cache | JWT | Google,GitHub | Disabled |

#### Database: MongoDB

| # | Communication | Caching | Auth | Social Auth | Background Jobs |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 892 | REST APIs | None | None | None | Disabled |
| 893 | REST APIs | Redis | None | None | Disabled |
| 894 | REST APIs | Redis | None | None | Enabled |
| 895 | REST APIs | Memory Cache | None | None | Disabled |
| 896 | REST APIs | None | JWT | None | Disabled |
| 897 | REST APIs | Redis | JWT | None | Disabled |
| 898 | REST APIs | Redis | JWT | None | Enabled |
| 899 | REST APIs | Memory Cache | JWT | None | Disabled |
| 900 | REST APIs | None | JWT | Google,GitHub | Disabled |
| 901 | REST APIs | Redis | JWT | Google,GitHub | Disabled |
| 902 | REST APIs | Redis | JWT | Google,GitHub | Enabled |
| 903 | REST APIs | Memory Cache | JWT | Google,GitHub | Disabled |
| 904 | GraphQL | None | None | None | Disabled |
| 905 | GraphQL | Redis | None | None | Disabled |
| 906 | GraphQL | Redis | None | None | Enabled |
| 907 | GraphQL | Memory Cache | None | None | Disabled |
| 908 | GraphQL | None | JWT | None | Disabled |
| 909 | GraphQL | Redis | JWT | None | Disabled |
| 910 | GraphQL | Redis | JWT | None | Enabled |
| 911 | GraphQL | Memory Cache | JWT | None | Disabled |
| 912 | GraphQL | None | JWT | Google,GitHub | Disabled |
| 913 | GraphQL | Redis | JWT | Google,GitHub | Disabled |
| 914 | GraphQL | Redis | JWT | Google,GitHub | Enabled |
| 915 | GraphQL | Memory Cache | JWT | Google,GitHub | Disabled |
| 916 | Kafka | None | None | None | Disabled |
| 917 | Kafka | Redis | None | None | Disabled |
| 918 | Kafka | Redis | None | None | Enabled |
| 919 | Kafka | Memory Cache | None | None | Disabled |
| 920 | Kafka | None | JWT | None | Disabled |
| 921 | Kafka | Redis | JWT | None | Disabled |
| 922 | Kafka | Redis | JWT | None | Enabled |
| 923 | Kafka | Memory Cache | JWT | None | Disabled |
| 924 | Kafka | None | JWT | Google,GitHub | Disabled |
| 925 | Kafka | Redis | JWT | Google,GitHub | Disabled |
| 926 | Kafka | Redis | JWT | Google,GitHub | Enabled |
| 927 | Kafka | Memory Cache | JWT | Google,GitHub | Disabled |

#### Database: None

| # | Communication | Caching | Auth | Social Auth | Background Jobs |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 928 | REST APIs | None | None | None | Disabled |
| 929 | REST APIs | None | JWT | None | Disabled |
| 930 | REST APIs | None | JWT | Google,GitHub | Disabled |
| 931 | GraphQL | None | None | None | Disabled |
| 932 | GraphQL | None | JWT | None | Disabled |
| 933 | GraphQL | None | JWT | Google,GitHub | Disabled |
| 934 | Kafka | None | None | None | Disabled |
| 935 | Kafka | None | JWT | None | Disabled |
| 936 | Kafka | None | JWT | Google,GitHub | Disabled |

