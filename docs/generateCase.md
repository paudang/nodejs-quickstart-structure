# NodeJS Quickstart Generator - Test Cases

This document lists the **2184 possible project combinations** supported by the `nodejs-quickstart` CLI. These combinations cover all supported languages, architectures, databases, communication patterns, caching, and authentication options.

## Summary
- **CI Providers**: `None`, `GitHub Actions`, `Jenkins`, `GitLab CI`, `CircleCI`, `Bitbucket Pipelines`
- **MVC Architecture**: 1638 Combinations
- **Clean Architecture**: 546 Combinations

**Total Core Combinations: 2184**

> **Note on CI/CD**: Each core combination can be generated with `None` (1 state) or any of the **5 CI Providers** in two states (with or without Enterprise Security Hardening).
> 
> **Total Validated Permutations**: 2184 × (1 + 5 × 2) = **24024 Cases**

---

## 1. MVC Architecture (1638 Cases)

### JavaScript

#### Database: MySQL

| # | View Engine | Communication | API Gateway | Caching | Auth | Social Auth | Background Jobs |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | None | REST APIs | None | None | None | None | Disabled |
| 2 | None | REST APIs | Nginx | None | None | None | Disabled |
| 3 | None | REST APIs | Kong (DB-less) | None | None | None | Disabled |
| 4 | None | REST APIs | None | Redis | None | None | Disabled |
| 5 | None | REST APIs | Nginx | Redis | None | None | Disabled |
| 6 | None | REST APIs | Kong (DB-less) | Redis | None | None | Disabled |
| 7 | None | REST APIs | None | Redis | None | None | Enabled |
| 8 | None | REST APIs | Nginx | Redis | None | None | Enabled |
| 9 | None | REST APIs | Kong (DB-less) | Redis | None | None | Enabled |
| 10 | None | REST APIs | None | Memory Cache | None | None | Disabled |
| 11 | None | REST APIs | Nginx | Memory Cache | None | None | Disabled |
| 12 | None | REST APIs | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 13 | None | REST APIs | None | None | JWT | None | Disabled |
| 14 | None | REST APIs | Nginx | None | JWT | None | Disabled |
| 15 | None | REST APIs | Kong (DB-less) | None | JWT | None | Disabled |
| 16 | None | REST APIs | None | Redis | JWT | None | Disabled |
| 17 | None | REST APIs | Nginx | Redis | JWT | None | Disabled |
| 18 | None | REST APIs | Kong (DB-less) | Redis | JWT | None | Disabled |
| 19 | None | REST APIs | None | Redis | JWT | None | Enabled |
| 20 | None | REST APIs | Nginx | Redis | JWT | None | Enabled |
| 21 | None | REST APIs | Kong (DB-less) | Redis | JWT | None | Enabled |
| 22 | None | REST APIs | None | Memory Cache | JWT | None | Disabled |
| 23 | None | REST APIs | Nginx | Memory Cache | JWT | None | Disabled |
| 24 | None | REST APIs | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 25 | None | REST APIs | None | None | JWT | Google,GitHub | Disabled |
| 26 | None | REST APIs | Nginx | None | JWT | Google,GitHub | Disabled |
| 27 | None | REST APIs | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 28 | None | REST APIs | None | Redis | JWT | Google,GitHub | Disabled |
| 29 | None | REST APIs | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 30 | None | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 31 | None | REST APIs | None | Redis | JWT | Google,GitHub | Enabled |
| 32 | None | REST APIs | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 33 | None | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 34 | None | REST APIs | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 35 | None | REST APIs | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 36 | None | REST APIs | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 37 | None | GraphQL | None | None | None | None | Disabled |
| 38 | None | GraphQL | Nginx | None | None | None | Disabled |
| 39 | None | GraphQL | Kong (DB-less) | None | None | None | Disabled |
| 40 | None | GraphQL | None | Redis | None | None | Disabled |
| 41 | None | GraphQL | Nginx | Redis | None | None | Disabled |
| 42 | None | GraphQL | Kong (DB-less) | Redis | None | None | Disabled |
| 43 | None | GraphQL | None | Redis | None | None | Enabled |
| 44 | None | GraphQL | Nginx | Redis | None | None | Enabled |
| 45 | None | GraphQL | Kong (DB-less) | Redis | None | None | Enabled |
| 46 | None | GraphQL | None | Memory Cache | None | None | Disabled |
| 47 | None | GraphQL | Nginx | Memory Cache | None | None | Disabled |
| 48 | None | GraphQL | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 49 | None | GraphQL | None | None | JWT | None | Disabled |
| 50 | None | GraphQL | Nginx | None | JWT | None | Disabled |
| 51 | None | GraphQL | Kong (DB-less) | None | JWT | None | Disabled |
| 52 | None | GraphQL | None | Redis | JWT | None | Disabled |
| 53 | None | GraphQL | Nginx | Redis | JWT | None | Disabled |
| 54 | None | GraphQL | Kong (DB-less) | Redis | JWT | None | Disabled |
| 55 | None | GraphQL | None | Redis | JWT | None | Enabled |
| 56 | None | GraphQL | Nginx | Redis | JWT | None | Enabled |
| 57 | None | GraphQL | Kong (DB-less) | Redis | JWT | None | Enabled |
| 58 | None | GraphQL | None | Memory Cache | JWT | None | Disabled |
| 59 | None | GraphQL | Nginx | Memory Cache | JWT | None | Disabled |
| 60 | None | GraphQL | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 61 | None | GraphQL | None | None | JWT | Google,GitHub | Disabled |
| 62 | None | GraphQL | Nginx | None | JWT | Google,GitHub | Disabled |
| 63 | None | GraphQL | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 64 | None | GraphQL | None | Redis | JWT | Google,GitHub | Disabled |
| 65 | None | GraphQL | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 66 | None | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 67 | None | GraphQL | None | Redis | JWT | Google,GitHub | Enabled |
| 68 | None | GraphQL | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 69 | None | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 70 | None | GraphQL | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 71 | None | GraphQL | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 72 | None | GraphQL | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 73 | None | Kafka | None | None | None | None | Disabled |
| 74 | None | Kafka | None | Redis | None | None | Disabled |
| 75 | None | Kafka | None | Redis | None | None | Enabled |
| 76 | None | Kafka | None | Memory Cache | None | None | Disabled |
| 77 | None | Kafka | None | None | JWT | None | Disabled |
| 78 | None | Kafka | None | Redis | JWT | None | Disabled |
| 79 | None | Kafka | None | Redis | JWT | None | Enabled |
| 80 | None | Kafka | None | Memory Cache | JWT | None | Disabled |
| 81 | None | Kafka | None | None | JWT | Google,GitHub | Disabled |
| 82 | None | Kafka | None | Redis | JWT | Google,GitHub | Disabled |
| 83 | None | Kafka | None | Redis | JWT | Google,GitHub | Enabled |
| 84 | None | Kafka | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 274 | EJS | REST APIs | None | None | None | None | Disabled |
| 275 | EJS | REST APIs | Nginx | None | None | None | Disabled |
| 276 | EJS | REST APIs | Kong (DB-less) | None | None | None | Disabled |
| 277 | EJS | REST APIs | None | Redis | None | None | Disabled |
| 278 | EJS | REST APIs | Nginx | Redis | None | None | Disabled |
| 279 | EJS | REST APIs | Kong (DB-less) | Redis | None | None | Disabled |
| 280 | EJS | REST APIs | None | Redis | None | None | Enabled |
| 281 | EJS | REST APIs | Nginx | Redis | None | None | Enabled |
| 282 | EJS | REST APIs | Kong (DB-less) | Redis | None | None | Enabled |
| 283 | EJS | REST APIs | None | Memory Cache | None | None | Disabled |
| 284 | EJS | REST APIs | Nginx | Memory Cache | None | None | Disabled |
| 285 | EJS | REST APIs | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 286 | EJS | REST APIs | None | None | JWT | None | Disabled |
| 287 | EJS | REST APIs | Nginx | None | JWT | None | Disabled |
| 288 | EJS | REST APIs | Kong (DB-less) | None | JWT | None | Disabled |
| 289 | EJS | REST APIs | None | Redis | JWT | None | Disabled |
| 290 | EJS | REST APIs | Nginx | Redis | JWT | None | Disabled |
| 291 | EJS | REST APIs | Kong (DB-less) | Redis | JWT | None | Disabled |
| 292 | EJS | REST APIs | None | Redis | JWT | None | Enabled |
| 293 | EJS | REST APIs | Nginx | Redis | JWT | None | Enabled |
| 294 | EJS | REST APIs | Kong (DB-less) | Redis | JWT | None | Enabled |
| 295 | EJS | REST APIs | None | Memory Cache | JWT | None | Disabled |
| 296 | EJS | REST APIs | Nginx | Memory Cache | JWT | None | Disabled |
| 297 | EJS | REST APIs | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 298 | EJS | REST APIs | None | None | JWT | Google,GitHub | Disabled |
| 299 | EJS | REST APIs | Nginx | None | JWT | Google,GitHub | Disabled |
| 300 | EJS | REST APIs | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 301 | EJS | REST APIs | None | Redis | JWT | Google,GitHub | Disabled |
| 302 | EJS | REST APIs | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 303 | EJS | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 304 | EJS | REST APIs | None | Redis | JWT | Google,GitHub | Enabled |
| 305 | EJS | REST APIs | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 306 | EJS | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 307 | EJS | REST APIs | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 308 | EJS | REST APIs | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 309 | EJS | REST APIs | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 310 | EJS | GraphQL | None | None | None | None | Disabled |
| 311 | EJS | GraphQL | Nginx | None | None | None | Disabled |
| 312 | EJS | GraphQL | Kong (DB-less) | None | None | None | Disabled |
| 313 | EJS | GraphQL | None | Redis | None | None | Disabled |
| 314 | EJS | GraphQL | Nginx | Redis | None | None | Disabled |
| 315 | EJS | GraphQL | Kong (DB-less) | Redis | None | None | Disabled |
| 316 | EJS | GraphQL | None | Redis | None | None | Enabled |
| 317 | EJS | GraphQL | Nginx | Redis | None | None | Enabled |
| 318 | EJS | GraphQL | Kong (DB-less) | Redis | None | None | Enabled |
| 319 | EJS | GraphQL | None | Memory Cache | None | None | Disabled |
| 320 | EJS | GraphQL | Nginx | Memory Cache | None | None | Disabled |
| 321 | EJS | GraphQL | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 322 | EJS | GraphQL | None | None | JWT | None | Disabled |
| 323 | EJS | GraphQL | Nginx | None | JWT | None | Disabled |
| 324 | EJS | GraphQL | Kong (DB-less) | None | JWT | None | Disabled |
| 325 | EJS | GraphQL | None | Redis | JWT | None | Disabled |
| 326 | EJS | GraphQL | Nginx | Redis | JWT | None | Disabled |
| 327 | EJS | GraphQL | Kong (DB-less) | Redis | JWT | None | Disabled |
| 328 | EJS | GraphQL | None | Redis | JWT | None | Enabled |
| 329 | EJS | GraphQL | Nginx | Redis | JWT | None | Enabled |
| 330 | EJS | GraphQL | Kong (DB-less) | Redis | JWT | None | Enabled |
| 331 | EJS | GraphQL | None | Memory Cache | JWT | None | Disabled |
| 332 | EJS | GraphQL | Nginx | Memory Cache | JWT | None | Disabled |
| 333 | EJS | GraphQL | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 334 | EJS | GraphQL | None | None | JWT | Google,GitHub | Disabled |
| 335 | EJS | GraphQL | Nginx | None | JWT | Google,GitHub | Disabled |
| 336 | EJS | GraphQL | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 337 | EJS | GraphQL | None | Redis | JWT | Google,GitHub | Disabled |
| 338 | EJS | GraphQL | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 339 | EJS | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 340 | EJS | GraphQL | None | Redis | JWT | Google,GitHub | Enabled |
| 341 | EJS | GraphQL | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 342 | EJS | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 343 | EJS | GraphQL | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 344 | EJS | GraphQL | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 345 | EJS | GraphQL | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 346 | EJS | Kafka | None | None | None | None | Disabled |
| 347 | EJS | Kafka | None | Redis | None | None | Disabled |
| 348 | EJS | Kafka | None | Redis | None | None | Enabled |
| 349 | EJS | Kafka | None | Memory Cache | None | None | Disabled |
| 350 | EJS | Kafka | None | None | JWT | None | Disabled |
| 351 | EJS | Kafka | None | Redis | JWT | None | Disabled |
| 352 | EJS | Kafka | None | Redis | JWT | None | Enabled |
| 353 | EJS | Kafka | None | Memory Cache | JWT | None | Disabled |
| 354 | EJS | Kafka | None | None | JWT | Google,GitHub | Disabled |
| 355 | EJS | Kafka | None | Redis | JWT | Google,GitHub | Disabled |
| 356 | EJS | Kafka | None | Redis | JWT | Google,GitHub | Enabled |
| 357 | EJS | Kafka | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 547 | Pug | REST APIs | None | None | None | None | Disabled |
| 548 | Pug | REST APIs | Nginx | None | None | None | Disabled |
| 549 | Pug | REST APIs | Kong (DB-less) | None | None | None | Disabled |
| 550 | Pug | REST APIs | None | Redis | None | None | Disabled |
| 551 | Pug | REST APIs | Nginx | Redis | None | None | Disabled |
| 552 | Pug | REST APIs | Kong (DB-less) | Redis | None | None | Disabled |
| 553 | Pug | REST APIs | None | Redis | None | None | Enabled |
| 554 | Pug | REST APIs | Nginx | Redis | None | None | Enabled |
| 555 | Pug | REST APIs | Kong (DB-less) | Redis | None | None | Enabled |
| 556 | Pug | REST APIs | None | Memory Cache | None | None | Disabled |
| 557 | Pug | REST APIs | Nginx | Memory Cache | None | None | Disabled |
| 558 | Pug | REST APIs | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 559 | Pug | REST APIs | None | None | JWT | None | Disabled |
| 560 | Pug | REST APIs | Nginx | None | JWT | None | Disabled |
| 561 | Pug | REST APIs | Kong (DB-less) | None | JWT | None | Disabled |
| 562 | Pug | REST APIs | None | Redis | JWT | None | Disabled |
| 563 | Pug | REST APIs | Nginx | Redis | JWT | None | Disabled |
| 564 | Pug | REST APIs | Kong (DB-less) | Redis | JWT | None | Disabled |
| 565 | Pug | REST APIs | None | Redis | JWT | None | Enabled |
| 566 | Pug | REST APIs | Nginx | Redis | JWT | None | Enabled |
| 567 | Pug | REST APIs | Kong (DB-less) | Redis | JWT | None | Enabled |
| 568 | Pug | REST APIs | None | Memory Cache | JWT | None | Disabled |
| 569 | Pug | REST APIs | Nginx | Memory Cache | JWT | None | Disabled |
| 570 | Pug | REST APIs | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 571 | Pug | REST APIs | None | None | JWT | Google,GitHub | Disabled |
| 572 | Pug | REST APIs | Nginx | None | JWT | Google,GitHub | Disabled |
| 573 | Pug | REST APIs | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 574 | Pug | REST APIs | None | Redis | JWT | Google,GitHub | Disabled |
| 575 | Pug | REST APIs | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 576 | Pug | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 577 | Pug | REST APIs | None | Redis | JWT | Google,GitHub | Enabled |
| 578 | Pug | REST APIs | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 579 | Pug | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 580 | Pug | REST APIs | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 581 | Pug | REST APIs | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 582 | Pug | REST APIs | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 583 | Pug | GraphQL | None | None | None | None | Disabled |
| 584 | Pug | GraphQL | Nginx | None | None | None | Disabled |
| 585 | Pug | GraphQL | Kong (DB-less) | None | None | None | Disabled |
| 586 | Pug | GraphQL | None | Redis | None | None | Disabled |
| 587 | Pug | GraphQL | Nginx | Redis | None | None | Disabled |
| 588 | Pug | GraphQL | Kong (DB-less) | Redis | None | None | Disabled |
| 589 | Pug | GraphQL | None | Redis | None | None | Enabled |
| 590 | Pug | GraphQL | Nginx | Redis | None | None | Enabled |
| 591 | Pug | GraphQL | Kong (DB-less) | Redis | None | None | Enabled |
| 592 | Pug | GraphQL | None | Memory Cache | None | None | Disabled |
| 593 | Pug | GraphQL | Nginx | Memory Cache | None | None | Disabled |
| 594 | Pug | GraphQL | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 595 | Pug | GraphQL | None | None | JWT | None | Disabled |
| 596 | Pug | GraphQL | Nginx | None | JWT | None | Disabled |
| 597 | Pug | GraphQL | Kong (DB-less) | None | JWT | None | Disabled |
| 598 | Pug | GraphQL | None | Redis | JWT | None | Disabled |
| 599 | Pug | GraphQL | Nginx | Redis | JWT | None | Disabled |
| 600 | Pug | GraphQL | Kong (DB-less) | Redis | JWT | None | Disabled |
| 601 | Pug | GraphQL | None | Redis | JWT | None | Enabled |
| 602 | Pug | GraphQL | Nginx | Redis | JWT | None | Enabled |
| 603 | Pug | GraphQL | Kong (DB-less) | Redis | JWT | None | Enabled |
| 604 | Pug | GraphQL | None | Memory Cache | JWT | None | Disabled |
| 605 | Pug | GraphQL | Nginx | Memory Cache | JWT | None | Disabled |
| 606 | Pug | GraphQL | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 607 | Pug | GraphQL | None | None | JWT | Google,GitHub | Disabled |
| 608 | Pug | GraphQL | Nginx | None | JWT | Google,GitHub | Disabled |
| 609 | Pug | GraphQL | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 610 | Pug | GraphQL | None | Redis | JWT | Google,GitHub | Disabled |
| 611 | Pug | GraphQL | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 612 | Pug | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 613 | Pug | GraphQL | None | Redis | JWT | Google,GitHub | Enabled |
| 614 | Pug | GraphQL | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 615 | Pug | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 616 | Pug | GraphQL | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 617 | Pug | GraphQL | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 618 | Pug | GraphQL | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 619 | Pug | Kafka | None | None | None | None | Disabled |
| 620 | Pug | Kafka | None | Redis | None | None | Disabled |
| 621 | Pug | Kafka | None | Redis | None | None | Enabled |
| 622 | Pug | Kafka | None | Memory Cache | None | None | Disabled |
| 623 | Pug | Kafka | None | None | JWT | None | Disabled |
| 624 | Pug | Kafka | None | Redis | JWT | None | Disabled |
| 625 | Pug | Kafka | None | Redis | JWT | None | Enabled |
| 626 | Pug | Kafka | None | Memory Cache | JWT | None | Disabled |
| 627 | Pug | Kafka | None | None | JWT | Google,GitHub | Disabled |
| 628 | Pug | Kafka | None | Redis | JWT | Google,GitHub | Disabled |
| 629 | Pug | Kafka | None | Redis | JWT | Google,GitHub | Enabled |
| 630 | Pug | Kafka | None | Memory Cache | JWT | Google,GitHub | Disabled |

#### Database: PostgreSQL

| # | View Engine | Communication | API Gateway | Caching | Auth | Social Auth | Background Jobs |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 85 | None | REST APIs | None | None | None | None | Disabled |
| 86 | None | REST APIs | Nginx | None | None | None | Disabled |
| 87 | None | REST APIs | Kong (DB-less) | None | None | None | Disabled |
| 88 | None | REST APIs | None | Redis | None | None | Disabled |
| 89 | None | REST APIs | Nginx | Redis | None | None | Disabled |
| 90 | None | REST APIs | Kong (DB-less) | Redis | None | None | Disabled |
| 91 | None | REST APIs | None | Redis | None | None | Enabled |
| 92 | None | REST APIs | Nginx | Redis | None | None | Enabled |
| 93 | None | REST APIs | Kong (DB-less) | Redis | None | None | Enabled |
| 94 | None | REST APIs | None | Memory Cache | None | None | Disabled |
| 95 | None | REST APIs | Nginx | Memory Cache | None | None | Disabled |
| 96 | None | REST APIs | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 97 | None | REST APIs | None | None | JWT | None | Disabled |
| 98 | None | REST APIs | Nginx | None | JWT | None | Disabled |
| 99 | None | REST APIs | Kong (DB-less) | None | JWT | None | Disabled |
| 100 | None | REST APIs | None | Redis | JWT | None | Disabled |
| 101 | None | REST APIs | Nginx | Redis | JWT | None | Disabled |
| 102 | None | REST APIs | Kong (DB-less) | Redis | JWT | None | Disabled |
| 103 | None | REST APIs | None | Redis | JWT | None | Enabled |
| 104 | None | REST APIs | Nginx | Redis | JWT | None | Enabled |
| 105 | None | REST APIs | Kong (DB-less) | Redis | JWT | None | Enabled |
| 106 | None | REST APIs | None | Memory Cache | JWT | None | Disabled |
| 107 | None | REST APIs | Nginx | Memory Cache | JWT | None | Disabled |
| 108 | None | REST APIs | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 109 | None | REST APIs | None | None | JWT | Google,GitHub | Disabled |
| 110 | None | REST APIs | Nginx | None | JWT | Google,GitHub | Disabled |
| 111 | None | REST APIs | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 112 | None | REST APIs | None | Redis | JWT | Google,GitHub | Disabled |
| 113 | None | REST APIs | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 114 | None | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 115 | None | REST APIs | None | Redis | JWT | Google,GitHub | Enabled |
| 116 | None | REST APIs | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 117 | None | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 118 | None | REST APIs | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 119 | None | REST APIs | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 120 | None | REST APIs | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 121 | None | GraphQL | None | None | None | None | Disabled |
| 122 | None | GraphQL | Nginx | None | None | None | Disabled |
| 123 | None | GraphQL | Kong (DB-less) | None | None | None | Disabled |
| 124 | None | GraphQL | None | Redis | None | None | Disabled |
| 125 | None | GraphQL | Nginx | Redis | None | None | Disabled |
| 126 | None | GraphQL | Kong (DB-less) | Redis | None | None | Disabled |
| 127 | None | GraphQL | None | Redis | None | None | Enabled |
| 128 | None | GraphQL | Nginx | Redis | None | None | Enabled |
| 129 | None | GraphQL | Kong (DB-less) | Redis | None | None | Enabled |
| 130 | None | GraphQL | None | Memory Cache | None | None | Disabled |
| 131 | None | GraphQL | Nginx | Memory Cache | None | None | Disabled |
| 132 | None | GraphQL | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 133 | None | GraphQL | None | None | JWT | None | Disabled |
| 134 | None | GraphQL | Nginx | None | JWT | None | Disabled |
| 135 | None | GraphQL | Kong (DB-less) | None | JWT | None | Disabled |
| 136 | None | GraphQL | None | Redis | JWT | None | Disabled |
| 137 | None | GraphQL | Nginx | Redis | JWT | None | Disabled |
| 138 | None | GraphQL | Kong (DB-less) | Redis | JWT | None | Disabled |
| 139 | None | GraphQL | None | Redis | JWT | None | Enabled |
| 140 | None | GraphQL | Nginx | Redis | JWT | None | Enabled |
| 141 | None | GraphQL | Kong (DB-less) | Redis | JWT | None | Enabled |
| 142 | None | GraphQL | None | Memory Cache | JWT | None | Disabled |
| 143 | None | GraphQL | Nginx | Memory Cache | JWT | None | Disabled |
| 144 | None | GraphQL | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 145 | None | GraphQL | None | None | JWT | Google,GitHub | Disabled |
| 146 | None | GraphQL | Nginx | None | JWT | Google,GitHub | Disabled |
| 147 | None | GraphQL | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 148 | None | GraphQL | None | Redis | JWT | Google,GitHub | Disabled |
| 149 | None | GraphQL | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 150 | None | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 151 | None | GraphQL | None | Redis | JWT | Google,GitHub | Enabled |
| 152 | None | GraphQL | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 153 | None | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 154 | None | GraphQL | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 155 | None | GraphQL | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 156 | None | GraphQL | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 157 | None | Kafka | None | None | None | None | Disabled |
| 158 | None | Kafka | None | Redis | None | None | Disabled |
| 159 | None | Kafka | None | Redis | None | None | Enabled |
| 160 | None | Kafka | None | Memory Cache | None | None | Disabled |
| 161 | None | Kafka | None | None | JWT | None | Disabled |
| 162 | None | Kafka | None | Redis | JWT | None | Disabled |
| 163 | None | Kafka | None | Redis | JWT | None | Enabled |
| 164 | None | Kafka | None | Memory Cache | JWT | None | Disabled |
| 165 | None | Kafka | None | None | JWT | Google,GitHub | Disabled |
| 166 | None | Kafka | None | Redis | JWT | Google,GitHub | Disabled |
| 167 | None | Kafka | None | Redis | JWT | Google,GitHub | Enabled |
| 168 | None | Kafka | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 358 | EJS | REST APIs | None | None | None | None | Disabled |
| 359 | EJS | REST APIs | Nginx | None | None | None | Disabled |
| 360 | EJS | REST APIs | Kong (DB-less) | None | None | None | Disabled |
| 361 | EJS | REST APIs | None | Redis | None | None | Disabled |
| 362 | EJS | REST APIs | Nginx | Redis | None | None | Disabled |
| 363 | EJS | REST APIs | Kong (DB-less) | Redis | None | None | Disabled |
| 364 | EJS | REST APIs | None | Redis | None | None | Enabled |
| 365 | EJS | REST APIs | Nginx | Redis | None | None | Enabled |
| 366 | EJS | REST APIs | Kong (DB-less) | Redis | None | None | Enabled |
| 367 | EJS | REST APIs | None | Memory Cache | None | None | Disabled |
| 368 | EJS | REST APIs | Nginx | Memory Cache | None | None | Disabled |
| 369 | EJS | REST APIs | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 370 | EJS | REST APIs | None | None | JWT | None | Disabled |
| 371 | EJS | REST APIs | Nginx | None | JWT | None | Disabled |
| 372 | EJS | REST APIs | Kong (DB-less) | None | JWT | None | Disabled |
| 373 | EJS | REST APIs | None | Redis | JWT | None | Disabled |
| 374 | EJS | REST APIs | Nginx | Redis | JWT | None | Disabled |
| 375 | EJS | REST APIs | Kong (DB-less) | Redis | JWT | None | Disabled |
| 376 | EJS | REST APIs | None | Redis | JWT | None | Enabled |
| 377 | EJS | REST APIs | Nginx | Redis | JWT | None | Enabled |
| 378 | EJS | REST APIs | Kong (DB-less) | Redis | JWT | None | Enabled |
| 379 | EJS | REST APIs | None | Memory Cache | JWT | None | Disabled |
| 380 | EJS | REST APIs | Nginx | Memory Cache | JWT | None | Disabled |
| 381 | EJS | REST APIs | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 382 | EJS | REST APIs | None | None | JWT | Google,GitHub | Disabled |
| 383 | EJS | REST APIs | Nginx | None | JWT | Google,GitHub | Disabled |
| 384 | EJS | REST APIs | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 385 | EJS | REST APIs | None | Redis | JWT | Google,GitHub | Disabled |
| 386 | EJS | REST APIs | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 387 | EJS | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 388 | EJS | REST APIs | None | Redis | JWT | Google,GitHub | Enabled |
| 389 | EJS | REST APIs | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 390 | EJS | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 391 | EJS | REST APIs | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 392 | EJS | REST APIs | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 393 | EJS | REST APIs | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 394 | EJS | GraphQL | None | None | None | None | Disabled |
| 395 | EJS | GraphQL | Nginx | None | None | None | Disabled |
| 396 | EJS | GraphQL | Kong (DB-less) | None | None | None | Disabled |
| 397 | EJS | GraphQL | None | Redis | None | None | Disabled |
| 398 | EJS | GraphQL | Nginx | Redis | None | None | Disabled |
| 399 | EJS | GraphQL | Kong (DB-less) | Redis | None | None | Disabled |
| 400 | EJS | GraphQL | None | Redis | None | None | Enabled |
| 401 | EJS | GraphQL | Nginx | Redis | None | None | Enabled |
| 402 | EJS | GraphQL | Kong (DB-less) | Redis | None | None | Enabled |
| 403 | EJS | GraphQL | None | Memory Cache | None | None | Disabled |
| 404 | EJS | GraphQL | Nginx | Memory Cache | None | None | Disabled |
| 405 | EJS | GraphQL | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 406 | EJS | GraphQL | None | None | JWT | None | Disabled |
| 407 | EJS | GraphQL | Nginx | None | JWT | None | Disabled |
| 408 | EJS | GraphQL | Kong (DB-less) | None | JWT | None | Disabled |
| 409 | EJS | GraphQL | None | Redis | JWT | None | Disabled |
| 410 | EJS | GraphQL | Nginx | Redis | JWT | None | Disabled |
| 411 | EJS | GraphQL | Kong (DB-less) | Redis | JWT | None | Disabled |
| 412 | EJS | GraphQL | None | Redis | JWT | None | Enabled |
| 413 | EJS | GraphQL | Nginx | Redis | JWT | None | Enabled |
| 414 | EJS | GraphQL | Kong (DB-less) | Redis | JWT | None | Enabled |
| 415 | EJS | GraphQL | None | Memory Cache | JWT | None | Disabled |
| 416 | EJS | GraphQL | Nginx | Memory Cache | JWT | None | Disabled |
| 417 | EJS | GraphQL | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 418 | EJS | GraphQL | None | None | JWT | Google,GitHub | Disabled |
| 419 | EJS | GraphQL | Nginx | None | JWT | Google,GitHub | Disabled |
| 420 | EJS | GraphQL | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 421 | EJS | GraphQL | None | Redis | JWT | Google,GitHub | Disabled |
| 422 | EJS | GraphQL | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 423 | EJS | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 424 | EJS | GraphQL | None | Redis | JWT | Google,GitHub | Enabled |
| 425 | EJS | GraphQL | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 426 | EJS | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 427 | EJS | GraphQL | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 428 | EJS | GraphQL | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 429 | EJS | GraphQL | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 430 | EJS | Kafka | None | None | None | None | Disabled |
| 431 | EJS | Kafka | None | Redis | None | None | Disabled |
| 432 | EJS | Kafka | None | Redis | None | None | Enabled |
| 433 | EJS | Kafka | None | Memory Cache | None | None | Disabled |
| 434 | EJS | Kafka | None | None | JWT | None | Disabled |
| 435 | EJS | Kafka | None | Redis | JWT | None | Disabled |
| 436 | EJS | Kafka | None | Redis | JWT | None | Enabled |
| 437 | EJS | Kafka | None | Memory Cache | JWT | None | Disabled |
| 438 | EJS | Kafka | None | None | JWT | Google,GitHub | Disabled |
| 439 | EJS | Kafka | None | Redis | JWT | Google,GitHub | Disabled |
| 440 | EJS | Kafka | None | Redis | JWT | Google,GitHub | Enabled |
| 441 | EJS | Kafka | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 631 | Pug | REST APIs | None | None | None | None | Disabled |
| 632 | Pug | REST APIs | Nginx | None | None | None | Disabled |
| 633 | Pug | REST APIs | Kong (DB-less) | None | None | None | Disabled |
| 634 | Pug | REST APIs | None | Redis | None | None | Disabled |
| 635 | Pug | REST APIs | Nginx | Redis | None | None | Disabled |
| 636 | Pug | REST APIs | Kong (DB-less) | Redis | None | None | Disabled |
| 637 | Pug | REST APIs | None | Redis | None | None | Enabled |
| 638 | Pug | REST APIs | Nginx | Redis | None | None | Enabled |
| 639 | Pug | REST APIs | Kong (DB-less) | Redis | None | None | Enabled |
| 640 | Pug | REST APIs | None | Memory Cache | None | None | Disabled |
| 641 | Pug | REST APIs | Nginx | Memory Cache | None | None | Disabled |
| 642 | Pug | REST APIs | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 643 | Pug | REST APIs | None | None | JWT | None | Disabled |
| 644 | Pug | REST APIs | Nginx | None | JWT | None | Disabled |
| 645 | Pug | REST APIs | Kong (DB-less) | None | JWT | None | Disabled |
| 646 | Pug | REST APIs | None | Redis | JWT | None | Disabled |
| 647 | Pug | REST APIs | Nginx | Redis | JWT | None | Disabled |
| 648 | Pug | REST APIs | Kong (DB-less) | Redis | JWT | None | Disabled |
| 649 | Pug | REST APIs | None | Redis | JWT | None | Enabled |
| 650 | Pug | REST APIs | Nginx | Redis | JWT | None | Enabled |
| 651 | Pug | REST APIs | Kong (DB-less) | Redis | JWT | None | Enabled |
| 652 | Pug | REST APIs | None | Memory Cache | JWT | None | Disabled |
| 653 | Pug | REST APIs | Nginx | Memory Cache | JWT | None | Disabled |
| 654 | Pug | REST APIs | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 655 | Pug | REST APIs | None | None | JWT | Google,GitHub | Disabled |
| 656 | Pug | REST APIs | Nginx | None | JWT | Google,GitHub | Disabled |
| 657 | Pug | REST APIs | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 658 | Pug | REST APIs | None | Redis | JWT | Google,GitHub | Disabled |
| 659 | Pug | REST APIs | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 660 | Pug | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 661 | Pug | REST APIs | None | Redis | JWT | Google,GitHub | Enabled |
| 662 | Pug | REST APIs | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 663 | Pug | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 664 | Pug | REST APIs | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 665 | Pug | REST APIs | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 666 | Pug | REST APIs | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 667 | Pug | GraphQL | None | None | None | None | Disabled |
| 668 | Pug | GraphQL | Nginx | None | None | None | Disabled |
| 669 | Pug | GraphQL | Kong (DB-less) | None | None | None | Disabled |
| 670 | Pug | GraphQL | None | Redis | None | None | Disabled |
| 671 | Pug | GraphQL | Nginx | Redis | None | None | Disabled |
| 672 | Pug | GraphQL | Kong (DB-less) | Redis | None | None | Disabled |
| 673 | Pug | GraphQL | None | Redis | None | None | Enabled |
| 674 | Pug | GraphQL | Nginx | Redis | None | None | Enabled |
| 675 | Pug | GraphQL | Kong (DB-less) | Redis | None | None | Enabled |
| 676 | Pug | GraphQL | None | Memory Cache | None | None | Disabled |
| 677 | Pug | GraphQL | Nginx | Memory Cache | None | None | Disabled |
| 678 | Pug | GraphQL | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 679 | Pug | GraphQL | None | None | JWT | None | Disabled |
| 680 | Pug | GraphQL | Nginx | None | JWT | None | Disabled |
| 681 | Pug | GraphQL | Kong (DB-less) | None | JWT | None | Disabled |
| 682 | Pug | GraphQL | None | Redis | JWT | None | Disabled |
| 683 | Pug | GraphQL | Nginx | Redis | JWT | None | Disabled |
| 684 | Pug | GraphQL | Kong (DB-less) | Redis | JWT | None | Disabled |
| 685 | Pug | GraphQL | None | Redis | JWT | None | Enabled |
| 686 | Pug | GraphQL | Nginx | Redis | JWT | None | Enabled |
| 687 | Pug | GraphQL | Kong (DB-less) | Redis | JWT | None | Enabled |
| 688 | Pug | GraphQL | None | Memory Cache | JWT | None | Disabled |
| 689 | Pug | GraphQL | Nginx | Memory Cache | JWT | None | Disabled |
| 690 | Pug | GraphQL | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 691 | Pug | GraphQL | None | None | JWT | Google,GitHub | Disabled |
| 692 | Pug | GraphQL | Nginx | None | JWT | Google,GitHub | Disabled |
| 693 | Pug | GraphQL | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 694 | Pug | GraphQL | None | Redis | JWT | Google,GitHub | Disabled |
| 695 | Pug | GraphQL | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 696 | Pug | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 697 | Pug | GraphQL | None | Redis | JWT | Google,GitHub | Enabled |
| 698 | Pug | GraphQL | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 699 | Pug | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 700 | Pug | GraphQL | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 701 | Pug | GraphQL | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 702 | Pug | GraphQL | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 703 | Pug | Kafka | None | None | None | None | Disabled |
| 704 | Pug | Kafka | None | Redis | None | None | Disabled |
| 705 | Pug | Kafka | None | Redis | None | None | Enabled |
| 706 | Pug | Kafka | None | Memory Cache | None | None | Disabled |
| 707 | Pug | Kafka | None | None | JWT | None | Disabled |
| 708 | Pug | Kafka | None | Redis | JWT | None | Disabled |
| 709 | Pug | Kafka | None | Redis | JWT | None | Enabled |
| 710 | Pug | Kafka | None | Memory Cache | JWT | None | Disabled |
| 711 | Pug | Kafka | None | None | JWT | Google,GitHub | Disabled |
| 712 | Pug | Kafka | None | Redis | JWT | Google,GitHub | Disabled |
| 713 | Pug | Kafka | None | Redis | JWT | Google,GitHub | Enabled |
| 714 | Pug | Kafka | None | Memory Cache | JWT | Google,GitHub | Disabled |

#### Database: MongoDB

| # | View Engine | Communication | API Gateway | Caching | Auth | Social Auth | Background Jobs |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 169 | None | REST APIs | None | None | None | None | Disabled |
| 170 | None | REST APIs | Nginx | None | None | None | Disabled |
| 171 | None | REST APIs | Kong (DB-less) | None | None | None | Disabled |
| 172 | None | REST APIs | None | Redis | None | None | Disabled |
| 173 | None | REST APIs | Nginx | Redis | None | None | Disabled |
| 174 | None | REST APIs | Kong (DB-less) | Redis | None | None | Disabled |
| 175 | None | REST APIs | None | Redis | None | None | Enabled |
| 176 | None | REST APIs | Nginx | Redis | None | None | Enabled |
| 177 | None | REST APIs | Kong (DB-less) | Redis | None | None | Enabled |
| 178 | None | REST APIs | None | Memory Cache | None | None | Disabled |
| 179 | None | REST APIs | Nginx | Memory Cache | None | None | Disabled |
| 180 | None | REST APIs | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 181 | None | REST APIs | None | None | JWT | None | Disabled |
| 182 | None | REST APIs | Nginx | None | JWT | None | Disabled |
| 183 | None | REST APIs | Kong (DB-less) | None | JWT | None | Disabled |
| 184 | None | REST APIs | None | Redis | JWT | None | Disabled |
| 185 | None | REST APIs | Nginx | Redis | JWT | None | Disabled |
| 186 | None | REST APIs | Kong (DB-less) | Redis | JWT | None | Disabled |
| 187 | None | REST APIs | None | Redis | JWT | None | Enabled |
| 188 | None | REST APIs | Nginx | Redis | JWT | None | Enabled |
| 189 | None | REST APIs | Kong (DB-less) | Redis | JWT | None | Enabled |
| 190 | None | REST APIs | None | Memory Cache | JWT | None | Disabled |
| 191 | None | REST APIs | Nginx | Memory Cache | JWT | None | Disabled |
| 192 | None | REST APIs | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 193 | None | REST APIs | None | None | JWT | Google,GitHub | Disabled |
| 194 | None | REST APIs | Nginx | None | JWT | Google,GitHub | Disabled |
| 195 | None | REST APIs | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 196 | None | REST APIs | None | Redis | JWT | Google,GitHub | Disabled |
| 197 | None | REST APIs | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 198 | None | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 199 | None | REST APIs | None | Redis | JWT | Google,GitHub | Enabled |
| 200 | None | REST APIs | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 201 | None | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 202 | None | REST APIs | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 203 | None | REST APIs | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 204 | None | REST APIs | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 205 | None | GraphQL | None | None | None | None | Disabled |
| 206 | None | GraphQL | Nginx | None | None | None | Disabled |
| 207 | None | GraphQL | Kong (DB-less) | None | None | None | Disabled |
| 208 | None | GraphQL | None | Redis | None | None | Disabled |
| 209 | None | GraphQL | Nginx | Redis | None | None | Disabled |
| 210 | None | GraphQL | Kong (DB-less) | Redis | None | None | Disabled |
| 211 | None | GraphQL | None | Redis | None | None | Enabled |
| 212 | None | GraphQL | Nginx | Redis | None | None | Enabled |
| 213 | None | GraphQL | Kong (DB-less) | Redis | None | None | Enabled |
| 214 | None | GraphQL | None | Memory Cache | None | None | Disabled |
| 215 | None | GraphQL | Nginx | Memory Cache | None | None | Disabled |
| 216 | None | GraphQL | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 217 | None | GraphQL | None | None | JWT | None | Disabled |
| 218 | None | GraphQL | Nginx | None | JWT | None | Disabled |
| 219 | None | GraphQL | Kong (DB-less) | None | JWT | None | Disabled |
| 220 | None | GraphQL | None | Redis | JWT | None | Disabled |
| 221 | None | GraphQL | Nginx | Redis | JWT | None | Disabled |
| 222 | None | GraphQL | Kong (DB-less) | Redis | JWT | None | Disabled |
| 223 | None | GraphQL | None | Redis | JWT | None | Enabled |
| 224 | None | GraphQL | Nginx | Redis | JWT | None | Enabled |
| 225 | None | GraphQL | Kong (DB-less) | Redis | JWT | None | Enabled |
| 226 | None | GraphQL | None | Memory Cache | JWT | None | Disabled |
| 227 | None | GraphQL | Nginx | Memory Cache | JWT | None | Disabled |
| 228 | None | GraphQL | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 229 | None | GraphQL | None | None | JWT | Google,GitHub | Disabled |
| 230 | None | GraphQL | Nginx | None | JWT | Google,GitHub | Disabled |
| 231 | None | GraphQL | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 232 | None | GraphQL | None | Redis | JWT | Google,GitHub | Disabled |
| 233 | None | GraphQL | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 234 | None | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 235 | None | GraphQL | None | Redis | JWT | Google,GitHub | Enabled |
| 236 | None | GraphQL | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 237 | None | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 238 | None | GraphQL | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 239 | None | GraphQL | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 240 | None | GraphQL | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 241 | None | Kafka | None | None | None | None | Disabled |
| 242 | None | Kafka | None | Redis | None | None | Disabled |
| 243 | None | Kafka | None | Redis | None | None | Enabled |
| 244 | None | Kafka | None | Memory Cache | None | None | Disabled |
| 245 | None | Kafka | None | None | JWT | None | Disabled |
| 246 | None | Kafka | None | Redis | JWT | None | Disabled |
| 247 | None | Kafka | None | Redis | JWT | None | Enabled |
| 248 | None | Kafka | None | Memory Cache | JWT | None | Disabled |
| 249 | None | Kafka | None | None | JWT | Google,GitHub | Disabled |
| 250 | None | Kafka | None | Redis | JWT | Google,GitHub | Disabled |
| 251 | None | Kafka | None | Redis | JWT | Google,GitHub | Enabled |
| 252 | None | Kafka | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 442 | EJS | REST APIs | None | None | None | None | Disabled |
| 443 | EJS | REST APIs | Nginx | None | None | None | Disabled |
| 444 | EJS | REST APIs | Kong (DB-less) | None | None | None | Disabled |
| 445 | EJS | REST APIs | None | Redis | None | None | Disabled |
| 446 | EJS | REST APIs | Nginx | Redis | None | None | Disabled |
| 447 | EJS | REST APIs | Kong (DB-less) | Redis | None | None | Disabled |
| 448 | EJS | REST APIs | None | Redis | None | None | Enabled |
| 449 | EJS | REST APIs | Nginx | Redis | None | None | Enabled |
| 450 | EJS | REST APIs | Kong (DB-less) | Redis | None | None | Enabled |
| 451 | EJS | REST APIs | None | Memory Cache | None | None | Disabled |
| 452 | EJS | REST APIs | Nginx | Memory Cache | None | None | Disabled |
| 453 | EJS | REST APIs | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 454 | EJS | REST APIs | None | None | JWT | None | Disabled |
| 455 | EJS | REST APIs | Nginx | None | JWT | None | Disabled |
| 456 | EJS | REST APIs | Kong (DB-less) | None | JWT | None | Disabled |
| 457 | EJS | REST APIs | None | Redis | JWT | None | Disabled |
| 458 | EJS | REST APIs | Nginx | Redis | JWT | None | Disabled |
| 459 | EJS | REST APIs | Kong (DB-less) | Redis | JWT | None | Disabled |
| 460 | EJS | REST APIs | None | Redis | JWT | None | Enabled |
| 461 | EJS | REST APIs | Nginx | Redis | JWT | None | Enabled |
| 462 | EJS | REST APIs | Kong (DB-less) | Redis | JWT | None | Enabled |
| 463 | EJS | REST APIs | None | Memory Cache | JWT | None | Disabled |
| 464 | EJS | REST APIs | Nginx | Memory Cache | JWT | None | Disabled |
| 465 | EJS | REST APIs | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 466 | EJS | REST APIs | None | None | JWT | Google,GitHub | Disabled |
| 467 | EJS | REST APIs | Nginx | None | JWT | Google,GitHub | Disabled |
| 468 | EJS | REST APIs | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 469 | EJS | REST APIs | None | Redis | JWT | Google,GitHub | Disabled |
| 470 | EJS | REST APIs | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 471 | EJS | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 472 | EJS | REST APIs | None | Redis | JWT | Google,GitHub | Enabled |
| 473 | EJS | REST APIs | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 474 | EJS | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 475 | EJS | REST APIs | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 476 | EJS | REST APIs | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 477 | EJS | REST APIs | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 478 | EJS | GraphQL | None | None | None | None | Disabled |
| 479 | EJS | GraphQL | Nginx | None | None | None | Disabled |
| 480 | EJS | GraphQL | Kong (DB-less) | None | None | None | Disabled |
| 481 | EJS | GraphQL | None | Redis | None | None | Disabled |
| 482 | EJS | GraphQL | Nginx | Redis | None | None | Disabled |
| 483 | EJS | GraphQL | Kong (DB-less) | Redis | None | None | Disabled |
| 484 | EJS | GraphQL | None | Redis | None | None | Enabled |
| 485 | EJS | GraphQL | Nginx | Redis | None | None | Enabled |
| 486 | EJS | GraphQL | Kong (DB-less) | Redis | None | None | Enabled |
| 487 | EJS | GraphQL | None | Memory Cache | None | None | Disabled |
| 488 | EJS | GraphQL | Nginx | Memory Cache | None | None | Disabled |
| 489 | EJS | GraphQL | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 490 | EJS | GraphQL | None | None | JWT | None | Disabled |
| 491 | EJS | GraphQL | Nginx | None | JWT | None | Disabled |
| 492 | EJS | GraphQL | Kong (DB-less) | None | JWT | None | Disabled |
| 493 | EJS | GraphQL | None | Redis | JWT | None | Disabled |
| 494 | EJS | GraphQL | Nginx | Redis | JWT | None | Disabled |
| 495 | EJS | GraphQL | Kong (DB-less) | Redis | JWT | None | Disabled |
| 496 | EJS | GraphQL | None | Redis | JWT | None | Enabled |
| 497 | EJS | GraphQL | Nginx | Redis | JWT | None | Enabled |
| 498 | EJS | GraphQL | Kong (DB-less) | Redis | JWT | None | Enabled |
| 499 | EJS | GraphQL | None | Memory Cache | JWT | None | Disabled |
| 500 | EJS | GraphQL | Nginx | Memory Cache | JWT | None | Disabled |
| 501 | EJS | GraphQL | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 502 | EJS | GraphQL | None | None | JWT | Google,GitHub | Disabled |
| 503 | EJS | GraphQL | Nginx | None | JWT | Google,GitHub | Disabled |
| 504 | EJS | GraphQL | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 505 | EJS | GraphQL | None | Redis | JWT | Google,GitHub | Disabled |
| 506 | EJS | GraphQL | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 507 | EJS | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 508 | EJS | GraphQL | None | Redis | JWT | Google,GitHub | Enabled |
| 509 | EJS | GraphQL | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 510 | EJS | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 511 | EJS | GraphQL | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 512 | EJS | GraphQL | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 513 | EJS | GraphQL | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 514 | EJS | Kafka | None | None | None | None | Disabled |
| 515 | EJS | Kafka | None | Redis | None | None | Disabled |
| 516 | EJS | Kafka | None | Redis | None | None | Enabled |
| 517 | EJS | Kafka | None | Memory Cache | None | None | Disabled |
| 518 | EJS | Kafka | None | None | JWT | None | Disabled |
| 519 | EJS | Kafka | None | Redis | JWT | None | Disabled |
| 520 | EJS | Kafka | None | Redis | JWT | None | Enabled |
| 521 | EJS | Kafka | None | Memory Cache | JWT | None | Disabled |
| 522 | EJS | Kafka | None | None | JWT | Google,GitHub | Disabled |
| 523 | EJS | Kafka | None | Redis | JWT | Google,GitHub | Disabled |
| 524 | EJS | Kafka | None | Redis | JWT | Google,GitHub | Enabled |
| 525 | EJS | Kafka | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 715 | Pug | REST APIs | None | None | None | None | Disabled |
| 716 | Pug | REST APIs | Nginx | None | None | None | Disabled |
| 717 | Pug | REST APIs | Kong (DB-less) | None | None | None | Disabled |
| 718 | Pug | REST APIs | None | Redis | None | None | Disabled |
| 719 | Pug | REST APIs | Nginx | Redis | None | None | Disabled |
| 720 | Pug | REST APIs | Kong (DB-less) | Redis | None | None | Disabled |
| 721 | Pug | REST APIs | None | Redis | None | None | Enabled |
| 722 | Pug | REST APIs | Nginx | Redis | None | None | Enabled |
| 723 | Pug | REST APIs | Kong (DB-less) | Redis | None | None | Enabled |
| 724 | Pug | REST APIs | None | Memory Cache | None | None | Disabled |
| 725 | Pug | REST APIs | Nginx | Memory Cache | None | None | Disabled |
| 726 | Pug | REST APIs | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 727 | Pug | REST APIs | None | None | JWT | None | Disabled |
| 728 | Pug | REST APIs | Nginx | None | JWT | None | Disabled |
| 729 | Pug | REST APIs | Kong (DB-less) | None | JWT | None | Disabled |
| 730 | Pug | REST APIs | None | Redis | JWT | None | Disabled |
| 731 | Pug | REST APIs | Nginx | Redis | JWT | None | Disabled |
| 732 | Pug | REST APIs | Kong (DB-less) | Redis | JWT | None | Disabled |
| 733 | Pug | REST APIs | None | Redis | JWT | None | Enabled |
| 734 | Pug | REST APIs | Nginx | Redis | JWT | None | Enabled |
| 735 | Pug | REST APIs | Kong (DB-less) | Redis | JWT | None | Enabled |
| 736 | Pug | REST APIs | None | Memory Cache | JWT | None | Disabled |
| 737 | Pug | REST APIs | Nginx | Memory Cache | JWT | None | Disabled |
| 738 | Pug | REST APIs | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 739 | Pug | REST APIs | None | None | JWT | Google,GitHub | Disabled |
| 740 | Pug | REST APIs | Nginx | None | JWT | Google,GitHub | Disabled |
| 741 | Pug | REST APIs | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 742 | Pug | REST APIs | None | Redis | JWT | Google,GitHub | Disabled |
| 743 | Pug | REST APIs | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 744 | Pug | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 745 | Pug | REST APIs | None | Redis | JWT | Google,GitHub | Enabled |
| 746 | Pug | REST APIs | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 747 | Pug | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 748 | Pug | REST APIs | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 749 | Pug | REST APIs | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 750 | Pug | REST APIs | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 751 | Pug | GraphQL | None | None | None | None | Disabled |
| 752 | Pug | GraphQL | Nginx | None | None | None | Disabled |
| 753 | Pug | GraphQL | Kong (DB-less) | None | None | None | Disabled |
| 754 | Pug | GraphQL | None | Redis | None | None | Disabled |
| 755 | Pug | GraphQL | Nginx | Redis | None | None | Disabled |
| 756 | Pug | GraphQL | Kong (DB-less) | Redis | None | None | Disabled |
| 757 | Pug | GraphQL | None | Redis | None | None | Enabled |
| 758 | Pug | GraphQL | Nginx | Redis | None | None | Enabled |
| 759 | Pug | GraphQL | Kong (DB-less) | Redis | None | None | Enabled |
| 760 | Pug | GraphQL | None | Memory Cache | None | None | Disabled |
| 761 | Pug | GraphQL | Nginx | Memory Cache | None | None | Disabled |
| 762 | Pug | GraphQL | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 763 | Pug | GraphQL | None | None | JWT | None | Disabled |
| 764 | Pug | GraphQL | Nginx | None | JWT | None | Disabled |
| 765 | Pug | GraphQL | Kong (DB-less) | None | JWT | None | Disabled |
| 766 | Pug | GraphQL | None | Redis | JWT | None | Disabled |
| 767 | Pug | GraphQL | Nginx | Redis | JWT | None | Disabled |
| 768 | Pug | GraphQL | Kong (DB-less) | Redis | JWT | None | Disabled |
| 769 | Pug | GraphQL | None | Redis | JWT | None | Enabled |
| 770 | Pug | GraphQL | Nginx | Redis | JWT | None | Enabled |
| 771 | Pug | GraphQL | Kong (DB-less) | Redis | JWT | None | Enabled |
| 772 | Pug | GraphQL | None | Memory Cache | JWT | None | Disabled |
| 773 | Pug | GraphQL | Nginx | Memory Cache | JWT | None | Disabled |
| 774 | Pug | GraphQL | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 775 | Pug | GraphQL | None | None | JWT | Google,GitHub | Disabled |
| 776 | Pug | GraphQL | Nginx | None | JWT | Google,GitHub | Disabled |
| 777 | Pug | GraphQL | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 778 | Pug | GraphQL | None | Redis | JWT | Google,GitHub | Disabled |
| 779 | Pug | GraphQL | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 780 | Pug | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 781 | Pug | GraphQL | None | Redis | JWT | Google,GitHub | Enabled |
| 782 | Pug | GraphQL | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 783 | Pug | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 784 | Pug | GraphQL | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 785 | Pug | GraphQL | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 786 | Pug | GraphQL | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 787 | Pug | Kafka | None | None | None | None | Disabled |
| 788 | Pug | Kafka | None | Redis | None | None | Disabled |
| 789 | Pug | Kafka | None | Redis | None | None | Enabled |
| 790 | Pug | Kafka | None | Memory Cache | None | None | Disabled |
| 791 | Pug | Kafka | None | None | JWT | None | Disabled |
| 792 | Pug | Kafka | None | Redis | JWT | None | Disabled |
| 793 | Pug | Kafka | None | Redis | JWT | None | Enabled |
| 794 | Pug | Kafka | None | Memory Cache | JWT | None | Disabled |
| 795 | Pug | Kafka | None | None | JWT | Google,GitHub | Disabled |
| 796 | Pug | Kafka | None | Redis | JWT | Google,GitHub | Disabled |
| 797 | Pug | Kafka | None | Redis | JWT | Google,GitHub | Enabled |
| 798 | Pug | Kafka | None | Memory Cache | JWT | Google,GitHub | Disabled |

#### Database: None

| # | View Engine | Communication | API Gateway | Caching | Auth | Social Auth | Background Jobs |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 253 | None | REST APIs | None | None | None | None | Disabled |
| 254 | None | REST APIs | Nginx | None | None | None | Disabled |
| 255 | None | REST APIs | Kong (DB-less) | None | None | None | Disabled |
| 256 | None | REST APIs | None | None | JWT | None | Disabled |
| 257 | None | REST APIs | Nginx | None | JWT | None | Disabled |
| 258 | None | REST APIs | Kong (DB-less) | None | JWT | None | Disabled |
| 259 | None | REST APIs | None | None | JWT | Google,GitHub | Disabled |
| 260 | None | REST APIs | Nginx | None | JWT | Google,GitHub | Disabled |
| 261 | None | REST APIs | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 262 | None | GraphQL | None | None | None | None | Disabled |
| 263 | None | GraphQL | Nginx | None | None | None | Disabled |
| 264 | None | GraphQL | Kong (DB-less) | None | None | None | Disabled |
| 265 | None | GraphQL | None | None | JWT | None | Disabled |
| 266 | None | GraphQL | Nginx | None | JWT | None | Disabled |
| 267 | None | GraphQL | Kong (DB-less) | None | JWT | None | Disabled |
| 268 | None | GraphQL | None | None | JWT | Google,GitHub | Disabled |
| 269 | None | GraphQL | Nginx | None | JWT | Google,GitHub | Disabled |
| 270 | None | GraphQL | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 271 | None | Kafka | None | None | None | None | Disabled |
| 272 | None | Kafka | None | None | JWT | None | Disabled |
| 273 | None | Kafka | None | None | JWT | Google,GitHub | Disabled |
| 526 | EJS | REST APIs | None | None | None | None | Disabled |
| 527 | EJS | REST APIs | Nginx | None | None | None | Disabled |
| 528 | EJS | REST APIs | Kong (DB-less) | None | None | None | Disabled |
| 529 | EJS | REST APIs | None | None | JWT | None | Disabled |
| 530 | EJS | REST APIs | Nginx | None | JWT | None | Disabled |
| 531 | EJS | REST APIs | Kong (DB-less) | None | JWT | None | Disabled |
| 532 | EJS | REST APIs | None | None | JWT | Google,GitHub | Disabled |
| 533 | EJS | REST APIs | Nginx | None | JWT | Google,GitHub | Disabled |
| 534 | EJS | REST APIs | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 535 | EJS | GraphQL | None | None | None | None | Disabled |
| 536 | EJS | GraphQL | Nginx | None | None | None | Disabled |
| 537 | EJS | GraphQL | Kong (DB-less) | None | None | None | Disabled |
| 538 | EJS | GraphQL | None | None | JWT | None | Disabled |
| 539 | EJS | GraphQL | Nginx | None | JWT | None | Disabled |
| 540 | EJS | GraphQL | Kong (DB-less) | None | JWT | None | Disabled |
| 541 | EJS | GraphQL | None | None | JWT | Google,GitHub | Disabled |
| 542 | EJS | GraphQL | Nginx | None | JWT | Google,GitHub | Disabled |
| 543 | EJS | GraphQL | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 544 | EJS | Kafka | None | None | None | None | Disabled |
| 545 | EJS | Kafka | None | None | JWT | None | Disabled |
| 546 | EJS | Kafka | None | None | JWT | Google,GitHub | Disabled |
| 799 | Pug | REST APIs | None | None | None | None | Disabled |
| 800 | Pug | REST APIs | Nginx | None | None | None | Disabled |
| 801 | Pug | REST APIs | Kong (DB-less) | None | None | None | Disabled |
| 802 | Pug | REST APIs | None | None | JWT | None | Disabled |
| 803 | Pug | REST APIs | Nginx | None | JWT | None | Disabled |
| 804 | Pug | REST APIs | Kong (DB-less) | None | JWT | None | Disabled |
| 805 | Pug | REST APIs | None | None | JWT | Google,GitHub | Disabled |
| 806 | Pug | REST APIs | Nginx | None | JWT | Google,GitHub | Disabled |
| 807 | Pug | REST APIs | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 808 | Pug | GraphQL | None | None | None | None | Disabled |
| 809 | Pug | GraphQL | Nginx | None | None | None | Disabled |
| 810 | Pug | GraphQL | Kong (DB-less) | None | None | None | Disabled |
| 811 | Pug | GraphQL | None | None | JWT | None | Disabled |
| 812 | Pug | GraphQL | Nginx | None | JWT | None | Disabled |
| 813 | Pug | GraphQL | Kong (DB-less) | None | JWT | None | Disabled |
| 814 | Pug | GraphQL | None | None | JWT | Google,GitHub | Disabled |
| 815 | Pug | GraphQL | Nginx | None | JWT | Google,GitHub | Disabled |
| 816 | Pug | GraphQL | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 817 | Pug | Kafka | None | None | None | None | Disabled |
| 818 | Pug | Kafka | None | None | JWT | None | Disabled |
| 819 | Pug | Kafka | None | None | JWT | Google,GitHub | Disabled |

### TypeScript

#### Database: MySQL

| # | View Engine | Communication | API Gateway | Caching | Auth | Social Auth | Background Jobs |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 820 | None | REST APIs | None | None | None | None | Disabled |
| 821 | None | REST APIs | Nginx | None | None | None | Disabled |
| 822 | None | REST APIs | Kong (DB-less) | None | None | None | Disabled |
| 823 | None | REST APIs | None | Redis | None | None | Disabled |
| 824 | None | REST APIs | Nginx | Redis | None | None | Disabled |
| 825 | None | REST APIs | Kong (DB-less) | Redis | None | None | Disabled |
| 826 | None | REST APIs | None | Redis | None | None | Enabled |
| 827 | None | REST APIs | Nginx | Redis | None | None | Enabled |
| 828 | None | REST APIs | Kong (DB-less) | Redis | None | None | Enabled |
| 829 | None | REST APIs | None | Memory Cache | None | None | Disabled |
| 830 | None | REST APIs | Nginx | Memory Cache | None | None | Disabled |
| 831 | None | REST APIs | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 832 | None | REST APIs | None | None | JWT | None | Disabled |
| 833 | None | REST APIs | Nginx | None | JWT | None | Disabled |
| 834 | None | REST APIs | Kong (DB-less) | None | JWT | None | Disabled |
| 835 | None | REST APIs | None | Redis | JWT | None | Disabled |
| 836 | None | REST APIs | Nginx | Redis | JWT | None | Disabled |
| 837 | None | REST APIs | Kong (DB-less) | Redis | JWT | None | Disabled |
| 838 | None | REST APIs | None | Redis | JWT | None | Enabled |
| 839 | None | REST APIs | Nginx | Redis | JWT | None | Enabled |
| 840 | None | REST APIs | Kong (DB-less) | Redis | JWT | None | Enabled |
| 841 | None | REST APIs | None | Memory Cache | JWT | None | Disabled |
| 842 | None | REST APIs | Nginx | Memory Cache | JWT | None | Disabled |
| 843 | None | REST APIs | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 844 | None | REST APIs | None | None | JWT | Google,GitHub | Disabled |
| 845 | None | REST APIs | Nginx | None | JWT | Google,GitHub | Disabled |
| 846 | None | REST APIs | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 847 | None | REST APIs | None | Redis | JWT | Google,GitHub | Disabled |
| 848 | None | REST APIs | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 849 | None | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 850 | None | REST APIs | None | Redis | JWT | Google,GitHub | Enabled |
| 851 | None | REST APIs | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 852 | None | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 853 | None | REST APIs | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 854 | None | REST APIs | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 855 | None | REST APIs | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 856 | None | GraphQL | None | None | None | None | Disabled |
| 857 | None | GraphQL | Nginx | None | None | None | Disabled |
| 858 | None | GraphQL | Kong (DB-less) | None | None | None | Disabled |
| 859 | None | GraphQL | None | Redis | None | None | Disabled |
| 860 | None | GraphQL | Nginx | Redis | None | None | Disabled |
| 861 | None | GraphQL | Kong (DB-less) | Redis | None | None | Disabled |
| 862 | None | GraphQL | None | Redis | None | None | Enabled |
| 863 | None | GraphQL | Nginx | Redis | None | None | Enabled |
| 864 | None | GraphQL | Kong (DB-less) | Redis | None | None | Enabled |
| 865 | None | GraphQL | None | Memory Cache | None | None | Disabled |
| 866 | None | GraphQL | Nginx | Memory Cache | None | None | Disabled |
| 867 | None | GraphQL | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 868 | None | GraphQL | None | None | JWT | None | Disabled |
| 869 | None | GraphQL | Nginx | None | JWT | None | Disabled |
| 870 | None | GraphQL | Kong (DB-less) | None | JWT | None | Disabled |
| 871 | None | GraphQL | None | Redis | JWT | None | Disabled |
| 872 | None | GraphQL | Nginx | Redis | JWT | None | Disabled |
| 873 | None | GraphQL | Kong (DB-less) | Redis | JWT | None | Disabled |
| 874 | None | GraphQL | None | Redis | JWT | None | Enabled |
| 875 | None | GraphQL | Nginx | Redis | JWT | None | Enabled |
| 876 | None | GraphQL | Kong (DB-less) | Redis | JWT | None | Enabled |
| 877 | None | GraphQL | None | Memory Cache | JWT | None | Disabled |
| 878 | None | GraphQL | Nginx | Memory Cache | JWT | None | Disabled |
| 879 | None | GraphQL | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 880 | None | GraphQL | None | None | JWT | Google,GitHub | Disabled |
| 881 | None | GraphQL | Nginx | None | JWT | Google,GitHub | Disabled |
| 882 | None | GraphQL | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 883 | None | GraphQL | None | Redis | JWT | Google,GitHub | Disabled |
| 884 | None | GraphQL | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 885 | None | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 886 | None | GraphQL | None | Redis | JWT | Google,GitHub | Enabled |
| 887 | None | GraphQL | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 888 | None | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 889 | None | GraphQL | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 890 | None | GraphQL | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 891 | None | GraphQL | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 892 | None | Kafka | None | None | None | None | Disabled |
| 893 | None | Kafka | None | Redis | None | None | Disabled |
| 894 | None | Kafka | None | Redis | None | None | Enabled |
| 895 | None | Kafka | None | Memory Cache | None | None | Disabled |
| 896 | None | Kafka | None | None | JWT | None | Disabled |
| 897 | None | Kafka | None | Redis | JWT | None | Disabled |
| 898 | None | Kafka | None | Redis | JWT | None | Enabled |
| 899 | None | Kafka | None | Memory Cache | JWT | None | Disabled |
| 900 | None | Kafka | None | None | JWT | Google,GitHub | Disabled |
| 901 | None | Kafka | None | Redis | JWT | Google,GitHub | Disabled |
| 902 | None | Kafka | None | Redis | JWT | Google,GitHub | Enabled |
| 903 | None | Kafka | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 1093 | EJS | REST APIs | None | None | None | None | Disabled |
| 1094 | EJS | REST APIs | Nginx | None | None | None | Disabled |
| 1095 | EJS | REST APIs | Kong (DB-less) | None | None | None | Disabled |
| 1096 | EJS | REST APIs | None | Redis | None | None | Disabled |
| 1097 | EJS | REST APIs | Nginx | Redis | None | None | Disabled |
| 1098 | EJS | REST APIs | Kong (DB-less) | Redis | None | None | Disabled |
| 1099 | EJS | REST APIs | None | Redis | None | None | Enabled |
| 1100 | EJS | REST APIs | Nginx | Redis | None | None | Enabled |
| 1101 | EJS | REST APIs | Kong (DB-less) | Redis | None | None | Enabled |
| 1102 | EJS | REST APIs | None | Memory Cache | None | None | Disabled |
| 1103 | EJS | REST APIs | Nginx | Memory Cache | None | None | Disabled |
| 1104 | EJS | REST APIs | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 1105 | EJS | REST APIs | None | None | JWT | None | Disabled |
| 1106 | EJS | REST APIs | Nginx | None | JWT | None | Disabled |
| 1107 | EJS | REST APIs | Kong (DB-less) | None | JWT | None | Disabled |
| 1108 | EJS | REST APIs | None | Redis | JWT | None | Disabled |
| 1109 | EJS | REST APIs | Nginx | Redis | JWT | None | Disabled |
| 1110 | EJS | REST APIs | Kong (DB-less) | Redis | JWT | None | Disabled |
| 1111 | EJS | REST APIs | None | Redis | JWT | None | Enabled |
| 1112 | EJS | REST APIs | Nginx | Redis | JWT | None | Enabled |
| 1113 | EJS | REST APIs | Kong (DB-less) | Redis | JWT | None | Enabled |
| 1114 | EJS | REST APIs | None | Memory Cache | JWT | None | Disabled |
| 1115 | EJS | REST APIs | Nginx | Memory Cache | JWT | None | Disabled |
| 1116 | EJS | REST APIs | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 1117 | EJS | REST APIs | None | None | JWT | Google,GitHub | Disabled |
| 1118 | EJS | REST APIs | Nginx | None | JWT | Google,GitHub | Disabled |
| 1119 | EJS | REST APIs | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 1120 | EJS | REST APIs | None | Redis | JWT | Google,GitHub | Disabled |
| 1121 | EJS | REST APIs | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 1122 | EJS | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 1123 | EJS | REST APIs | None | Redis | JWT | Google,GitHub | Enabled |
| 1124 | EJS | REST APIs | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 1125 | EJS | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 1126 | EJS | REST APIs | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 1127 | EJS | REST APIs | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 1128 | EJS | REST APIs | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 1129 | EJS | GraphQL | None | None | None | None | Disabled |
| 1130 | EJS | GraphQL | Nginx | None | None | None | Disabled |
| 1131 | EJS | GraphQL | Kong (DB-less) | None | None | None | Disabled |
| 1132 | EJS | GraphQL | None | Redis | None | None | Disabled |
| 1133 | EJS | GraphQL | Nginx | Redis | None | None | Disabled |
| 1134 | EJS | GraphQL | Kong (DB-less) | Redis | None | None | Disabled |
| 1135 | EJS | GraphQL | None | Redis | None | None | Enabled |
| 1136 | EJS | GraphQL | Nginx | Redis | None | None | Enabled |
| 1137 | EJS | GraphQL | Kong (DB-less) | Redis | None | None | Enabled |
| 1138 | EJS | GraphQL | None | Memory Cache | None | None | Disabled |
| 1139 | EJS | GraphQL | Nginx | Memory Cache | None | None | Disabled |
| 1140 | EJS | GraphQL | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 1141 | EJS | GraphQL | None | None | JWT | None | Disabled |
| 1142 | EJS | GraphQL | Nginx | None | JWT | None | Disabled |
| 1143 | EJS | GraphQL | Kong (DB-less) | None | JWT | None | Disabled |
| 1144 | EJS | GraphQL | None | Redis | JWT | None | Disabled |
| 1145 | EJS | GraphQL | Nginx | Redis | JWT | None | Disabled |
| 1146 | EJS | GraphQL | Kong (DB-less) | Redis | JWT | None | Disabled |
| 1147 | EJS | GraphQL | None | Redis | JWT | None | Enabled |
| 1148 | EJS | GraphQL | Nginx | Redis | JWT | None | Enabled |
| 1149 | EJS | GraphQL | Kong (DB-less) | Redis | JWT | None | Enabled |
| 1150 | EJS | GraphQL | None | Memory Cache | JWT | None | Disabled |
| 1151 | EJS | GraphQL | Nginx | Memory Cache | JWT | None | Disabled |
| 1152 | EJS | GraphQL | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 1153 | EJS | GraphQL | None | None | JWT | Google,GitHub | Disabled |
| 1154 | EJS | GraphQL | Nginx | None | JWT | Google,GitHub | Disabled |
| 1155 | EJS | GraphQL | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 1156 | EJS | GraphQL | None | Redis | JWT | Google,GitHub | Disabled |
| 1157 | EJS | GraphQL | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 1158 | EJS | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 1159 | EJS | GraphQL | None | Redis | JWT | Google,GitHub | Enabled |
| 1160 | EJS | GraphQL | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 1161 | EJS | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 1162 | EJS | GraphQL | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 1163 | EJS | GraphQL | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 1164 | EJS | GraphQL | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 1165 | EJS | Kafka | None | None | None | None | Disabled |
| 1166 | EJS | Kafka | None | Redis | None | None | Disabled |
| 1167 | EJS | Kafka | None | Redis | None | None | Enabled |
| 1168 | EJS | Kafka | None | Memory Cache | None | None | Disabled |
| 1169 | EJS | Kafka | None | None | JWT | None | Disabled |
| 1170 | EJS | Kafka | None | Redis | JWT | None | Disabled |
| 1171 | EJS | Kafka | None | Redis | JWT | None | Enabled |
| 1172 | EJS | Kafka | None | Memory Cache | JWT | None | Disabled |
| 1173 | EJS | Kafka | None | None | JWT | Google,GitHub | Disabled |
| 1174 | EJS | Kafka | None | Redis | JWT | Google,GitHub | Disabled |
| 1175 | EJS | Kafka | None | Redis | JWT | Google,GitHub | Enabled |
| 1176 | EJS | Kafka | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 1366 | Pug | REST APIs | None | None | None | None | Disabled |
| 1367 | Pug | REST APIs | Nginx | None | None | None | Disabled |
| 1368 | Pug | REST APIs | Kong (DB-less) | None | None | None | Disabled |
| 1369 | Pug | REST APIs | None | Redis | None | None | Disabled |
| 1370 | Pug | REST APIs | Nginx | Redis | None | None | Disabled |
| 1371 | Pug | REST APIs | Kong (DB-less) | Redis | None | None | Disabled |
| 1372 | Pug | REST APIs | None | Redis | None | None | Enabled |
| 1373 | Pug | REST APIs | Nginx | Redis | None | None | Enabled |
| 1374 | Pug | REST APIs | Kong (DB-less) | Redis | None | None | Enabled |
| 1375 | Pug | REST APIs | None | Memory Cache | None | None | Disabled |
| 1376 | Pug | REST APIs | Nginx | Memory Cache | None | None | Disabled |
| 1377 | Pug | REST APIs | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 1378 | Pug | REST APIs | None | None | JWT | None | Disabled |
| 1379 | Pug | REST APIs | Nginx | None | JWT | None | Disabled |
| 1380 | Pug | REST APIs | Kong (DB-less) | None | JWT | None | Disabled |
| 1381 | Pug | REST APIs | None | Redis | JWT | None | Disabled |
| 1382 | Pug | REST APIs | Nginx | Redis | JWT | None | Disabled |
| 1383 | Pug | REST APIs | Kong (DB-less) | Redis | JWT | None | Disabled |
| 1384 | Pug | REST APIs | None | Redis | JWT | None | Enabled |
| 1385 | Pug | REST APIs | Nginx | Redis | JWT | None | Enabled |
| 1386 | Pug | REST APIs | Kong (DB-less) | Redis | JWT | None | Enabled |
| 1387 | Pug | REST APIs | None | Memory Cache | JWT | None | Disabled |
| 1388 | Pug | REST APIs | Nginx | Memory Cache | JWT | None | Disabled |
| 1389 | Pug | REST APIs | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 1390 | Pug | REST APIs | None | None | JWT | Google,GitHub | Disabled |
| 1391 | Pug | REST APIs | Nginx | None | JWT | Google,GitHub | Disabled |
| 1392 | Pug | REST APIs | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 1393 | Pug | REST APIs | None | Redis | JWT | Google,GitHub | Disabled |
| 1394 | Pug | REST APIs | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 1395 | Pug | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 1396 | Pug | REST APIs | None | Redis | JWT | Google,GitHub | Enabled |
| 1397 | Pug | REST APIs | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 1398 | Pug | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 1399 | Pug | REST APIs | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 1400 | Pug | REST APIs | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 1401 | Pug | REST APIs | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 1402 | Pug | GraphQL | None | None | None | None | Disabled |
| 1403 | Pug | GraphQL | Nginx | None | None | None | Disabled |
| 1404 | Pug | GraphQL | Kong (DB-less) | None | None | None | Disabled |
| 1405 | Pug | GraphQL | None | Redis | None | None | Disabled |
| 1406 | Pug | GraphQL | Nginx | Redis | None | None | Disabled |
| 1407 | Pug | GraphQL | Kong (DB-less) | Redis | None | None | Disabled |
| 1408 | Pug | GraphQL | None | Redis | None | None | Enabled |
| 1409 | Pug | GraphQL | Nginx | Redis | None | None | Enabled |
| 1410 | Pug | GraphQL | Kong (DB-less) | Redis | None | None | Enabled |
| 1411 | Pug | GraphQL | None | Memory Cache | None | None | Disabled |
| 1412 | Pug | GraphQL | Nginx | Memory Cache | None | None | Disabled |
| 1413 | Pug | GraphQL | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 1414 | Pug | GraphQL | None | None | JWT | None | Disabled |
| 1415 | Pug | GraphQL | Nginx | None | JWT | None | Disabled |
| 1416 | Pug | GraphQL | Kong (DB-less) | None | JWT | None | Disabled |
| 1417 | Pug | GraphQL | None | Redis | JWT | None | Disabled |
| 1418 | Pug | GraphQL | Nginx | Redis | JWT | None | Disabled |
| 1419 | Pug | GraphQL | Kong (DB-less) | Redis | JWT | None | Disabled |
| 1420 | Pug | GraphQL | None | Redis | JWT | None | Enabled |
| 1421 | Pug | GraphQL | Nginx | Redis | JWT | None | Enabled |
| 1422 | Pug | GraphQL | Kong (DB-less) | Redis | JWT | None | Enabled |
| 1423 | Pug | GraphQL | None | Memory Cache | JWT | None | Disabled |
| 1424 | Pug | GraphQL | Nginx | Memory Cache | JWT | None | Disabled |
| 1425 | Pug | GraphQL | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 1426 | Pug | GraphQL | None | None | JWT | Google,GitHub | Disabled |
| 1427 | Pug | GraphQL | Nginx | None | JWT | Google,GitHub | Disabled |
| 1428 | Pug | GraphQL | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 1429 | Pug | GraphQL | None | Redis | JWT | Google,GitHub | Disabled |
| 1430 | Pug | GraphQL | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 1431 | Pug | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 1432 | Pug | GraphQL | None | Redis | JWT | Google,GitHub | Enabled |
| 1433 | Pug | GraphQL | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 1434 | Pug | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 1435 | Pug | GraphQL | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 1436 | Pug | GraphQL | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 1437 | Pug | GraphQL | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 1438 | Pug | Kafka | None | None | None | None | Disabled |
| 1439 | Pug | Kafka | None | Redis | None | None | Disabled |
| 1440 | Pug | Kafka | None | Redis | None | None | Enabled |
| 1441 | Pug | Kafka | None | Memory Cache | None | None | Disabled |
| 1442 | Pug | Kafka | None | None | JWT | None | Disabled |
| 1443 | Pug | Kafka | None | Redis | JWT | None | Disabled |
| 1444 | Pug | Kafka | None | Redis | JWT | None | Enabled |
| 1445 | Pug | Kafka | None | Memory Cache | JWT | None | Disabled |
| 1446 | Pug | Kafka | None | None | JWT | Google,GitHub | Disabled |
| 1447 | Pug | Kafka | None | Redis | JWT | Google,GitHub | Disabled |
| 1448 | Pug | Kafka | None | Redis | JWT | Google,GitHub | Enabled |
| 1449 | Pug | Kafka | None | Memory Cache | JWT | Google,GitHub | Disabled |

#### Database: PostgreSQL

| # | View Engine | Communication | API Gateway | Caching | Auth | Social Auth | Background Jobs |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 904 | None | REST APIs | None | None | None | None | Disabled |
| 905 | None | REST APIs | Nginx | None | None | None | Disabled |
| 906 | None | REST APIs | Kong (DB-less) | None | None | None | Disabled |
| 907 | None | REST APIs | None | Redis | None | None | Disabled |
| 908 | None | REST APIs | Nginx | Redis | None | None | Disabled |
| 909 | None | REST APIs | Kong (DB-less) | Redis | None | None | Disabled |
| 910 | None | REST APIs | None | Redis | None | None | Enabled |
| 911 | None | REST APIs | Nginx | Redis | None | None | Enabled |
| 912 | None | REST APIs | Kong (DB-less) | Redis | None | None | Enabled |
| 913 | None | REST APIs | None | Memory Cache | None | None | Disabled |
| 914 | None | REST APIs | Nginx | Memory Cache | None | None | Disabled |
| 915 | None | REST APIs | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 916 | None | REST APIs | None | None | JWT | None | Disabled |
| 917 | None | REST APIs | Nginx | None | JWT | None | Disabled |
| 918 | None | REST APIs | Kong (DB-less) | None | JWT | None | Disabled |
| 919 | None | REST APIs | None | Redis | JWT | None | Disabled |
| 920 | None | REST APIs | Nginx | Redis | JWT | None | Disabled |
| 921 | None | REST APIs | Kong (DB-less) | Redis | JWT | None | Disabled |
| 922 | None | REST APIs | None | Redis | JWT | None | Enabled |
| 923 | None | REST APIs | Nginx | Redis | JWT | None | Enabled |
| 924 | None | REST APIs | Kong (DB-less) | Redis | JWT | None | Enabled |
| 925 | None | REST APIs | None | Memory Cache | JWT | None | Disabled |
| 926 | None | REST APIs | Nginx | Memory Cache | JWT | None | Disabled |
| 927 | None | REST APIs | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 928 | None | REST APIs | None | None | JWT | Google,GitHub | Disabled |
| 929 | None | REST APIs | Nginx | None | JWT | Google,GitHub | Disabled |
| 930 | None | REST APIs | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 931 | None | REST APIs | None | Redis | JWT | Google,GitHub | Disabled |
| 932 | None | REST APIs | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 933 | None | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 934 | None | REST APIs | None | Redis | JWT | Google,GitHub | Enabled |
| 935 | None | REST APIs | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 936 | None | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 937 | None | REST APIs | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 938 | None | REST APIs | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 939 | None | REST APIs | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 940 | None | GraphQL | None | None | None | None | Disabled |
| 941 | None | GraphQL | Nginx | None | None | None | Disabled |
| 942 | None | GraphQL | Kong (DB-less) | None | None | None | Disabled |
| 943 | None | GraphQL | None | Redis | None | None | Disabled |
| 944 | None | GraphQL | Nginx | Redis | None | None | Disabled |
| 945 | None | GraphQL | Kong (DB-less) | Redis | None | None | Disabled |
| 946 | None | GraphQL | None | Redis | None | None | Enabled |
| 947 | None | GraphQL | Nginx | Redis | None | None | Enabled |
| 948 | None | GraphQL | Kong (DB-less) | Redis | None | None | Enabled |
| 949 | None | GraphQL | None | Memory Cache | None | None | Disabled |
| 950 | None | GraphQL | Nginx | Memory Cache | None | None | Disabled |
| 951 | None | GraphQL | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 952 | None | GraphQL | None | None | JWT | None | Disabled |
| 953 | None | GraphQL | Nginx | None | JWT | None | Disabled |
| 954 | None | GraphQL | Kong (DB-less) | None | JWT | None | Disabled |
| 955 | None | GraphQL | None | Redis | JWT | None | Disabled |
| 956 | None | GraphQL | Nginx | Redis | JWT | None | Disabled |
| 957 | None | GraphQL | Kong (DB-less) | Redis | JWT | None | Disabled |
| 958 | None | GraphQL | None | Redis | JWT | None | Enabled |
| 959 | None | GraphQL | Nginx | Redis | JWT | None | Enabled |
| 960 | None | GraphQL | Kong (DB-less) | Redis | JWT | None | Enabled |
| 961 | None | GraphQL | None | Memory Cache | JWT | None | Disabled |
| 962 | None | GraphQL | Nginx | Memory Cache | JWT | None | Disabled |
| 963 | None | GraphQL | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 964 | None | GraphQL | None | None | JWT | Google,GitHub | Disabled |
| 965 | None | GraphQL | Nginx | None | JWT | Google,GitHub | Disabled |
| 966 | None | GraphQL | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 967 | None | GraphQL | None | Redis | JWT | Google,GitHub | Disabled |
| 968 | None | GraphQL | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 969 | None | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 970 | None | GraphQL | None | Redis | JWT | Google,GitHub | Enabled |
| 971 | None | GraphQL | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 972 | None | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 973 | None | GraphQL | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 974 | None | GraphQL | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 975 | None | GraphQL | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 976 | None | Kafka | None | None | None | None | Disabled |
| 977 | None | Kafka | None | Redis | None | None | Disabled |
| 978 | None | Kafka | None | Redis | None | None | Enabled |
| 979 | None | Kafka | None | Memory Cache | None | None | Disabled |
| 980 | None | Kafka | None | None | JWT | None | Disabled |
| 981 | None | Kafka | None | Redis | JWT | None | Disabled |
| 982 | None | Kafka | None | Redis | JWT | None | Enabled |
| 983 | None | Kafka | None | Memory Cache | JWT | None | Disabled |
| 984 | None | Kafka | None | None | JWT | Google,GitHub | Disabled |
| 985 | None | Kafka | None | Redis | JWT | Google,GitHub | Disabled |
| 986 | None | Kafka | None | Redis | JWT | Google,GitHub | Enabled |
| 987 | None | Kafka | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 1177 | EJS | REST APIs | None | None | None | None | Disabled |
| 1178 | EJS | REST APIs | Nginx | None | None | None | Disabled |
| 1179 | EJS | REST APIs | Kong (DB-less) | None | None | None | Disabled |
| 1180 | EJS | REST APIs | None | Redis | None | None | Disabled |
| 1181 | EJS | REST APIs | Nginx | Redis | None | None | Disabled |
| 1182 | EJS | REST APIs | Kong (DB-less) | Redis | None | None | Disabled |
| 1183 | EJS | REST APIs | None | Redis | None | None | Enabled |
| 1184 | EJS | REST APIs | Nginx | Redis | None | None | Enabled |
| 1185 | EJS | REST APIs | Kong (DB-less) | Redis | None | None | Enabled |
| 1186 | EJS | REST APIs | None | Memory Cache | None | None | Disabled |
| 1187 | EJS | REST APIs | Nginx | Memory Cache | None | None | Disabled |
| 1188 | EJS | REST APIs | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 1189 | EJS | REST APIs | None | None | JWT | None | Disabled |
| 1190 | EJS | REST APIs | Nginx | None | JWT | None | Disabled |
| 1191 | EJS | REST APIs | Kong (DB-less) | None | JWT | None | Disabled |
| 1192 | EJS | REST APIs | None | Redis | JWT | None | Disabled |
| 1193 | EJS | REST APIs | Nginx | Redis | JWT | None | Disabled |
| 1194 | EJS | REST APIs | Kong (DB-less) | Redis | JWT | None | Disabled |
| 1195 | EJS | REST APIs | None | Redis | JWT | None | Enabled |
| 1196 | EJS | REST APIs | Nginx | Redis | JWT | None | Enabled |
| 1197 | EJS | REST APIs | Kong (DB-less) | Redis | JWT | None | Enabled |
| 1198 | EJS | REST APIs | None | Memory Cache | JWT | None | Disabled |
| 1199 | EJS | REST APIs | Nginx | Memory Cache | JWT | None | Disabled |
| 1200 | EJS | REST APIs | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 1201 | EJS | REST APIs | None | None | JWT | Google,GitHub | Disabled |
| 1202 | EJS | REST APIs | Nginx | None | JWT | Google,GitHub | Disabled |
| 1203 | EJS | REST APIs | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 1204 | EJS | REST APIs | None | Redis | JWT | Google,GitHub | Disabled |
| 1205 | EJS | REST APIs | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 1206 | EJS | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 1207 | EJS | REST APIs | None | Redis | JWT | Google,GitHub | Enabled |
| 1208 | EJS | REST APIs | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 1209 | EJS | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 1210 | EJS | REST APIs | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 1211 | EJS | REST APIs | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 1212 | EJS | REST APIs | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 1213 | EJS | GraphQL | None | None | None | None | Disabled |
| 1214 | EJS | GraphQL | Nginx | None | None | None | Disabled |
| 1215 | EJS | GraphQL | Kong (DB-less) | None | None | None | Disabled |
| 1216 | EJS | GraphQL | None | Redis | None | None | Disabled |
| 1217 | EJS | GraphQL | Nginx | Redis | None | None | Disabled |
| 1218 | EJS | GraphQL | Kong (DB-less) | Redis | None | None | Disabled |
| 1219 | EJS | GraphQL | None | Redis | None | None | Enabled |
| 1220 | EJS | GraphQL | Nginx | Redis | None | None | Enabled |
| 1221 | EJS | GraphQL | Kong (DB-less) | Redis | None | None | Enabled |
| 1222 | EJS | GraphQL | None | Memory Cache | None | None | Disabled |
| 1223 | EJS | GraphQL | Nginx | Memory Cache | None | None | Disabled |
| 1224 | EJS | GraphQL | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 1225 | EJS | GraphQL | None | None | JWT | None | Disabled |
| 1226 | EJS | GraphQL | Nginx | None | JWT | None | Disabled |
| 1227 | EJS | GraphQL | Kong (DB-less) | None | JWT | None | Disabled |
| 1228 | EJS | GraphQL | None | Redis | JWT | None | Disabled |
| 1229 | EJS | GraphQL | Nginx | Redis | JWT | None | Disabled |
| 1230 | EJS | GraphQL | Kong (DB-less) | Redis | JWT | None | Disabled |
| 1231 | EJS | GraphQL | None | Redis | JWT | None | Enabled |
| 1232 | EJS | GraphQL | Nginx | Redis | JWT | None | Enabled |
| 1233 | EJS | GraphQL | Kong (DB-less) | Redis | JWT | None | Enabled |
| 1234 | EJS | GraphQL | None | Memory Cache | JWT | None | Disabled |
| 1235 | EJS | GraphQL | Nginx | Memory Cache | JWT | None | Disabled |
| 1236 | EJS | GraphQL | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 1237 | EJS | GraphQL | None | None | JWT | Google,GitHub | Disabled |
| 1238 | EJS | GraphQL | Nginx | None | JWT | Google,GitHub | Disabled |
| 1239 | EJS | GraphQL | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 1240 | EJS | GraphQL | None | Redis | JWT | Google,GitHub | Disabled |
| 1241 | EJS | GraphQL | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 1242 | EJS | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 1243 | EJS | GraphQL | None | Redis | JWT | Google,GitHub | Enabled |
| 1244 | EJS | GraphQL | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 1245 | EJS | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 1246 | EJS | GraphQL | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 1247 | EJS | GraphQL | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 1248 | EJS | GraphQL | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 1249 | EJS | Kafka | None | None | None | None | Disabled |
| 1250 | EJS | Kafka | None | Redis | None | None | Disabled |
| 1251 | EJS | Kafka | None | Redis | None | None | Enabled |
| 1252 | EJS | Kafka | None | Memory Cache | None | None | Disabled |
| 1253 | EJS | Kafka | None | None | JWT | None | Disabled |
| 1254 | EJS | Kafka | None | Redis | JWT | None | Disabled |
| 1255 | EJS | Kafka | None | Redis | JWT | None | Enabled |
| 1256 | EJS | Kafka | None | Memory Cache | JWT | None | Disabled |
| 1257 | EJS | Kafka | None | None | JWT | Google,GitHub | Disabled |
| 1258 | EJS | Kafka | None | Redis | JWT | Google,GitHub | Disabled |
| 1259 | EJS | Kafka | None | Redis | JWT | Google,GitHub | Enabled |
| 1260 | EJS | Kafka | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 1450 | Pug | REST APIs | None | None | None | None | Disabled |
| 1451 | Pug | REST APIs | Nginx | None | None | None | Disabled |
| 1452 | Pug | REST APIs | Kong (DB-less) | None | None | None | Disabled |
| 1453 | Pug | REST APIs | None | Redis | None | None | Disabled |
| 1454 | Pug | REST APIs | Nginx | Redis | None | None | Disabled |
| 1455 | Pug | REST APIs | Kong (DB-less) | Redis | None | None | Disabled |
| 1456 | Pug | REST APIs | None | Redis | None | None | Enabled |
| 1457 | Pug | REST APIs | Nginx | Redis | None | None | Enabled |
| 1458 | Pug | REST APIs | Kong (DB-less) | Redis | None | None | Enabled |
| 1459 | Pug | REST APIs | None | Memory Cache | None | None | Disabled |
| 1460 | Pug | REST APIs | Nginx | Memory Cache | None | None | Disabled |
| 1461 | Pug | REST APIs | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 1462 | Pug | REST APIs | None | None | JWT | None | Disabled |
| 1463 | Pug | REST APIs | Nginx | None | JWT | None | Disabled |
| 1464 | Pug | REST APIs | Kong (DB-less) | None | JWT | None | Disabled |
| 1465 | Pug | REST APIs | None | Redis | JWT | None | Disabled |
| 1466 | Pug | REST APIs | Nginx | Redis | JWT | None | Disabled |
| 1467 | Pug | REST APIs | Kong (DB-less) | Redis | JWT | None | Disabled |
| 1468 | Pug | REST APIs | None | Redis | JWT | None | Enabled |
| 1469 | Pug | REST APIs | Nginx | Redis | JWT | None | Enabled |
| 1470 | Pug | REST APIs | Kong (DB-less) | Redis | JWT | None | Enabled |
| 1471 | Pug | REST APIs | None | Memory Cache | JWT | None | Disabled |
| 1472 | Pug | REST APIs | Nginx | Memory Cache | JWT | None | Disabled |
| 1473 | Pug | REST APIs | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 1474 | Pug | REST APIs | None | None | JWT | Google,GitHub | Disabled |
| 1475 | Pug | REST APIs | Nginx | None | JWT | Google,GitHub | Disabled |
| 1476 | Pug | REST APIs | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 1477 | Pug | REST APIs | None | Redis | JWT | Google,GitHub | Disabled |
| 1478 | Pug | REST APIs | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 1479 | Pug | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 1480 | Pug | REST APIs | None | Redis | JWT | Google,GitHub | Enabled |
| 1481 | Pug | REST APIs | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 1482 | Pug | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 1483 | Pug | REST APIs | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 1484 | Pug | REST APIs | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 1485 | Pug | REST APIs | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 1486 | Pug | GraphQL | None | None | None | None | Disabled |
| 1487 | Pug | GraphQL | Nginx | None | None | None | Disabled |
| 1488 | Pug | GraphQL | Kong (DB-less) | None | None | None | Disabled |
| 1489 | Pug | GraphQL | None | Redis | None | None | Disabled |
| 1490 | Pug | GraphQL | Nginx | Redis | None | None | Disabled |
| 1491 | Pug | GraphQL | Kong (DB-less) | Redis | None | None | Disabled |
| 1492 | Pug | GraphQL | None | Redis | None | None | Enabled |
| 1493 | Pug | GraphQL | Nginx | Redis | None | None | Enabled |
| 1494 | Pug | GraphQL | Kong (DB-less) | Redis | None | None | Enabled |
| 1495 | Pug | GraphQL | None | Memory Cache | None | None | Disabled |
| 1496 | Pug | GraphQL | Nginx | Memory Cache | None | None | Disabled |
| 1497 | Pug | GraphQL | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 1498 | Pug | GraphQL | None | None | JWT | None | Disabled |
| 1499 | Pug | GraphQL | Nginx | None | JWT | None | Disabled |
| 1500 | Pug | GraphQL | Kong (DB-less) | None | JWT | None | Disabled |
| 1501 | Pug | GraphQL | None | Redis | JWT | None | Disabled |
| 1502 | Pug | GraphQL | Nginx | Redis | JWT | None | Disabled |
| 1503 | Pug | GraphQL | Kong (DB-less) | Redis | JWT | None | Disabled |
| 1504 | Pug | GraphQL | None | Redis | JWT | None | Enabled |
| 1505 | Pug | GraphQL | Nginx | Redis | JWT | None | Enabled |
| 1506 | Pug | GraphQL | Kong (DB-less) | Redis | JWT | None | Enabled |
| 1507 | Pug | GraphQL | None | Memory Cache | JWT | None | Disabled |
| 1508 | Pug | GraphQL | Nginx | Memory Cache | JWT | None | Disabled |
| 1509 | Pug | GraphQL | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 1510 | Pug | GraphQL | None | None | JWT | Google,GitHub | Disabled |
| 1511 | Pug | GraphQL | Nginx | None | JWT | Google,GitHub | Disabled |
| 1512 | Pug | GraphQL | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 1513 | Pug | GraphQL | None | Redis | JWT | Google,GitHub | Disabled |
| 1514 | Pug | GraphQL | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 1515 | Pug | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 1516 | Pug | GraphQL | None | Redis | JWT | Google,GitHub | Enabled |
| 1517 | Pug | GraphQL | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 1518 | Pug | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 1519 | Pug | GraphQL | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 1520 | Pug | GraphQL | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 1521 | Pug | GraphQL | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 1522 | Pug | Kafka | None | None | None | None | Disabled |
| 1523 | Pug | Kafka | None | Redis | None | None | Disabled |
| 1524 | Pug | Kafka | None | Redis | None | None | Enabled |
| 1525 | Pug | Kafka | None | Memory Cache | None | None | Disabled |
| 1526 | Pug | Kafka | None | None | JWT | None | Disabled |
| 1527 | Pug | Kafka | None | Redis | JWT | None | Disabled |
| 1528 | Pug | Kafka | None | Redis | JWT | None | Enabled |
| 1529 | Pug | Kafka | None | Memory Cache | JWT | None | Disabled |
| 1530 | Pug | Kafka | None | None | JWT | Google,GitHub | Disabled |
| 1531 | Pug | Kafka | None | Redis | JWT | Google,GitHub | Disabled |
| 1532 | Pug | Kafka | None | Redis | JWT | Google,GitHub | Enabled |
| 1533 | Pug | Kafka | None | Memory Cache | JWT | Google,GitHub | Disabled |

#### Database: MongoDB

| # | View Engine | Communication | API Gateway | Caching | Auth | Social Auth | Background Jobs |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 988 | None | REST APIs | None | None | None | None | Disabled |
| 989 | None | REST APIs | Nginx | None | None | None | Disabled |
| 990 | None | REST APIs | Kong (DB-less) | None | None | None | Disabled |
| 991 | None | REST APIs | None | Redis | None | None | Disabled |
| 992 | None | REST APIs | Nginx | Redis | None | None | Disabled |
| 993 | None | REST APIs | Kong (DB-less) | Redis | None | None | Disabled |
| 994 | None | REST APIs | None | Redis | None | None | Enabled |
| 995 | None | REST APIs | Nginx | Redis | None | None | Enabled |
| 996 | None | REST APIs | Kong (DB-less) | Redis | None | None | Enabled |
| 997 | None | REST APIs | None | Memory Cache | None | None | Disabled |
| 998 | None | REST APIs | Nginx | Memory Cache | None | None | Disabled |
| 999 | None | REST APIs | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 1000 | None | REST APIs | None | None | JWT | None | Disabled |
| 1001 | None | REST APIs | Nginx | None | JWT | None | Disabled |
| 1002 | None | REST APIs | Kong (DB-less) | None | JWT | None | Disabled |
| 1003 | None | REST APIs | None | Redis | JWT | None | Disabled |
| 1004 | None | REST APIs | Nginx | Redis | JWT | None | Disabled |
| 1005 | None | REST APIs | Kong (DB-less) | Redis | JWT | None | Disabled |
| 1006 | None | REST APIs | None | Redis | JWT | None | Enabled |
| 1007 | None | REST APIs | Nginx | Redis | JWT | None | Enabled |
| 1008 | None | REST APIs | Kong (DB-less) | Redis | JWT | None | Enabled |
| 1009 | None | REST APIs | None | Memory Cache | JWT | None | Disabled |
| 1010 | None | REST APIs | Nginx | Memory Cache | JWT | None | Disabled |
| 1011 | None | REST APIs | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 1012 | None | REST APIs | None | None | JWT | Google,GitHub | Disabled |
| 1013 | None | REST APIs | Nginx | None | JWT | Google,GitHub | Disabled |
| 1014 | None | REST APIs | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 1015 | None | REST APIs | None | Redis | JWT | Google,GitHub | Disabled |
| 1016 | None | REST APIs | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 1017 | None | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 1018 | None | REST APIs | None | Redis | JWT | Google,GitHub | Enabled |
| 1019 | None | REST APIs | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 1020 | None | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 1021 | None | REST APIs | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 1022 | None | REST APIs | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 1023 | None | REST APIs | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 1024 | None | GraphQL | None | None | None | None | Disabled |
| 1025 | None | GraphQL | Nginx | None | None | None | Disabled |
| 1026 | None | GraphQL | Kong (DB-less) | None | None | None | Disabled |
| 1027 | None | GraphQL | None | Redis | None | None | Disabled |
| 1028 | None | GraphQL | Nginx | Redis | None | None | Disabled |
| 1029 | None | GraphQL | Kong (DB-less) | Redis | None | None | Disabled |
| 1030 | None | GraphQL | None | Redis | None | None | Enabled |
| 1031 | None | GraphQL | Nginx | Redis | None | None | Enabled |
| 1032 | None | GraphQL | Kong (DB-less) | Redis | None | None | Enabled |
| 1033 | None | GraphQL | None | Memory Cache | None | None | Disabled |
| 1034 | None | GraphQL | Nginx | Memory Cache | None | None | Disabled |
| 1035 | None | GraphQL | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 1036 | None | GraphQL | None | None | JWT | None | Disabled |
| 1037 | None | GraphQL | Nginx | None | JWT | None | Disabled |
| 1038 | None | GraphQL | Kong (DB-less) | None | JWT | None | Disabled |
| 1039 | None | GraphQL | None | Redis | JWT | None | Disabled |
| 1040 | None | GraphQL | Nginx | Redis | JWT | None | Disabled |
| 1041 | None | GraphQL | Kong (DB-less) | Redis | JWT | None | Disabled |
| 1042 | None | GraphQL | None | Redis | JWT | None | Enabled |
| 1043 | None | GraphQL | Nginx | Redis | JWT | None | Enabled |
| 1044 | None | GraphQL | Kong (DB-less) | Redis | JWT | None | Enabled |
| 1045 | None | GraphQL | None | Memory Cache | JWT | None | Disabled |
| 1046 | None | GraphQL | Nginx | Memory Cache | JWT | None | Disabled |
| 1047 | None | GraphQL | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 1048 | None | GraphQL | None | None | JWT | Google,GitHub | Disabled |
| 1049 | None | GraphQL | Nginx | None | JWT | Google,GitHub | Disabled |
| 1050 | None | GraphQL | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 1051 | None | GraphQL | None | Redis | JWT | Google,GitHub | Disabled |
| 1052 | None | GraphQL | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 1053 | None | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 1054 | None | GraphQL | None | Redis | JWT | Google,GitHub | Enabled |
| 1055 | None | GraphQL | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 1056 | None | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 1057 | None | GraphQL | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 1058 | None | GraphQL | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 1059 | None | GraphQL | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 1060 | None | Kafka | None | None | None | None | Disabled |
| 1061 | None | Kafka | None | Redis | None | None | Disabled |
| 1062 | None | Kafka | None | Redis | None | None | Enabled |
| 1063 | None | Kafka | None | Memory Cache | None | None | Disabled |
| 1064 | None | Kafka | None | None | JWT | None | Disabled |
| 1065 | None | Kafka | None | Redis | JWT | None | Disabled |
| 1066 | None | Kafka | None | Redis | JWT | None | Enabled |
| 1067 | None | Kafka | None | Memory Cache | JWT | None | Disabled |
| 1068 | None | Kafka | None | None | JWT | Google,GitHub | Disabled |
| 1069 | None | Kafka | None | Redis | JWT | Google,GitHub | Disabled |
| 1070 | None | Kafka | None | Redis | JWT | Google,GitHub | Enabled |
| 1071 | None | Kafka | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 1261 | EJS | REST APIs | None | None | None | None | Disabled |
| 1262 | EJS | REST APIs | Nginx | None | None | None | Disabled |
| 1263 | EJS | REST APIs | Kong (DB-less) | None | None | None | Disabled |
| 1264 | EJS | REST APIs | None | Redis | None | None | Disabled |
| 1265 | EJS | REST APIs | Nginx | Redis | None | None | Disabled |
| 1266 | EJS | REST APIs | Kong (DB-less) | Redis | None | None | Disabled |
| 1267 | EJS | REST APIs | None | Redis | None | None | Enabled |
| 1268 | EJS | REST APIs | Nginx | Redis | None | None | Enabled |
| 1269 | EJS | REST APIs | Kong (DB-less) | Redis | None | None | Enabled |
| 1270 | EJS | REST APIs | None | Memory Cache | None | None | Disabled |
| 1271 | EJS | REST APIs | Nginx | Memory Cache | None | None | Disabled |
| 1272 | EJS | REST APIs | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 1273 | EJS | REST APIs | None | None | JWT | None | Disabled |
| 1274 | EJS | REST APIs | Nginx | None | JWT | None | Disabled |
| 1275 | EJS | REST APIs | Kong (DB-less) | None | JWT | None | Disabled |
| 1276 | EJS | REST APIs | None | Redis | JWT | None | Disabled |
| 1277 | EJS | REST APIs | Nginx | Redis | JWT | None | Disabled |
| 1278 | EJS | REST APIs | Kong (DB-less) | Redis | JWT | None | Disabled |
| 1279 | EJS | REST APIs | None | Redis | JWT | None | Enabled |
| 1280 | EJS | REST APIs | Nginx | Redis | JWT | None | Enabled |
| 1281 | EJS | REST APIs | Kong (DB-less) | Redis | JWT | None | Enabled |
| 1282 | EJS | REST APIs | None | Memory Cache | JWT | None | Disabled |
| 1283 | EJS | REST APIs | Nginx | Memory Cache | JWT | None | Disabled |
| 1284 | EJS | REST APIs | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 1285 | EJS | REST APIs | None | None | JWT | Google,GitHub | Disabled |
| 1286 | EJS | REST APIs | Nginx | None | JWT | Google,GitHub | Disabled |
| 1287 | EJS | REST APIs | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 1288 | EJS | REST APIs | None | Redis | JWT | Google,GitHub | Disabled |
| 1289 | EJS | REST APIs | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 1290 | EJS | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 1291 | EJS | REST APIs | None | Redis | JWT | Google,GitHub | Enabled |
| 1292 | EJS | REST APIs | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 1293 | EJS | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 1294 | EJS | REST APIs | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 1295 | EJS | REST APIs | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 1296 | EJS | REST APIs | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 1297 | EJS | GraphQL | None | None | None | None | Disabled |
| 1298 | EJS | GraphQL | Nginx | None | None | None | Disabled |
| 1299 | EJS | GraphQL | Kong (DB-less) | None | None | None | Disabled |
| 1300 | EJS | GraphQL | None | Redis | None | None | Disabled |
| 1301 | EJS | GraphQL | Nginx | Redis | None | None | Disabled |
| 1302 | EJS | GraphQL | Kong (DB-less) | Redis | None | None | Disabled |
| 1303 | EJS | GraphQL | None | Redis | None | None | Enabled |
| 1304 | EJS | GraphQL | Nginx | Redis | None | None | Enabled |
| 1305 | EJS | GraphQL | Kong (DB-less) | Redis | None | None | Enabled |
| 1306 | EJS | GraphQL | None | Memory Cache | None | None | Disabled |
| 1307 | EJS | GraphQL | Nginx | Memory Cache | None | None | Disabled |
| 1308 | EJS | GraphQL | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 1309 | EJS | GraphQL | None | None | JWT | None | Disabled |
| 1310 | EJS | GraphQL | Nginx | None | JWT | None | Disabled |
| 1311 | EJS | GraphQL | Kong (DB-less) | None | JWT | None | Disabled |
| 1312 | EJS | GraphQL | None | Redis | JWT | None | Disabled |
| 1313 | EJS | GraphQL | Nginx | Redis | JWT | None | Disabled |
| 1314 | EJS | GraphQL | Kong (DB-less) | Redis | JWT | None | Disabled |
| 1315 | EJS | GraphQL | None | Redis | JWT | None | Enabled |
| 1316 | EJS | GraphQL | Nginx | Redis | JWT | None | Enabled |
| 1317 | EJS | GraphQL | Kong (DB-less) | Redis | JWT | None | Enabled |
| 1318 | EJS | GraphQL | None | Memory Cache | JWT | None | Disabled |
| 1319 | EJS | GraphQL | Nginx | Memory Cache | JWT | None | Disabled |
| 1320 | EJS | GraphQL | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 1321 | EJS | GraphQL | None | None | JWT | Google,GitHub | Disabled |
| 1322 | EJS | GraphQL | Nginx | None | JWT | Google,GitHub | Disabled |
| 1323 | EJS | GraphQL | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 1324 | EJS | GraphQL | None | Redis | JWT | Google,GitHub | Disabled |
| 1325 | EJS | GraphQL | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 1326 | EJS | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 1327 | EJS | GraphQL | None | Redis | JWT | Google,GitHub | Enabled |
| 1328 | EJS | GraphQL | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 1329 | EJS | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 1330 | EJS | GraphQL | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 1331 | EJS | GraphQL | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 1332 | EJS | GraphQL | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 1333 | EJS | Kafka | None | None | None | None | Disabled |
| 1334 | EJS | Kafka | None | Redis | None | None | Disabled |
| 1335 | EJS | Kafka | None | Redis | None | None | Enabled |
| 1336 | EJS | Kafka | None | Memory Cache | None | None | Disabled |
| 1337 | EJS | Kafka | None | None | JWT | None | Disabled |
| 1338 | EJS | Kafka | None | Redis | JWT | None | Disabled |
| 1339 | EJS | Kafka | None | Redis | JWT | None | Enabled |
| 1340 | EJS | Kafka | None | Memory Cache | JWT | None | Disabled |
| 1341 | EJS | Kafka | None | None | JWT | Google,GitHub | Disabled |
| 1342 | EJS | Kafka | None | Redis | JWT | Google,GitHub | Disabled |
| 1343 | EJS | Kafka | None | Redis | JWT | Google,GitHub | Enabled |
| 1344 | EJS | Kafka | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 1534 | Pug | REST APIs | None | None | None | None | Disabled |
| 1535 | Pug | REST APIs | Nginx | None | None | None | Disabled |
| 1536 | Pug | REST APIs | Kong (DB-less) | None | None | None | Disabled |
| 1537 | Pug | REST APIs | None | Redis | None | None | Disabled |
| 1538 | Pug | REST APIs | Nginx | Redis | None | None | Disabled |
| 1539 | Pug | REST APIs | Kong (DB-less) | Redis | None | None | Disabled |
| 1540 | Pug | REST APIs | None | Redis | None | None | Enabled |
| 1541 | Pug | REST APIs | Nginx | Redis | None | None | Enabled |
| 1542 | Pug | REST APIs | Kong (DB-less) | Redis | None | None | Enabled |
| 1543 | Pug | REST APIs | None | Memory Cache | None | None | Disabled |
| 1544 | Pug | REST APIs | Nginx | Memory Cache | None | None | Disabled |
| 1545 | Pug | REST APIs | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 1546 | Pug | REST APIs | None | None | JWT | None | Disabled |
| 1547 | Pug | REST APIs | Nginx | None | JWT | None | Disabled |
| 1548 | Pug | REST APIs | Kong (DB-less) | None | JWT | None | Disabled |
| 1549 | Pug | REST APIs | None | Redis | JWT | None | Disabled |
| 1550 | Pug | REST APIs | Nginx | Redis | JWT | None | Disabled |
| 1551 | Pug | REST APIs | Kong (DB-less) | Redis | JWT | None | Disabled |
| 1552 | Pug | REST APIs | None | Redis | JWT | None | Enabled |
| 1553 | Pug | REST APIs | Nginx | Redis | JWT | None | Enabled |
| 1554 | Pug | REST APIs | Kong (DB-less) | Redis | JWT | None | Enabled |
| 1555 | Pug | REST APIs | None | Memory Cache | JWT | None | Disabled |
| 1556 | Pug | REST APIs | Nginx | Memory Cache | JWT | None | Disabled |
| 1557 | Pug | REST APIs | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 1558 | Pug | REST APIs | None | None | JWT | Google,GitHub | Disabled |
| 1559 | Pug | REST APIs | Nginx | None | JWT | Google,GitHub | Disabled |
| 1560 | Pug | REST APIs | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 1561 | Pug | REST APIs | None | Redis | JWT | Google,GitHub | Disabled |
| 1562 | Pug | REST APIs | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 1563 | Pug | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 1564 | Pug | REST APIs | None | Redis | JWT | Google,GitHub | Enabled |
| 1565 | Pug | REST APIs | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 1566 | Pug | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 1567 | Pug | REST APIs | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 1568 | Pug | REST APIs | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 1569 | Pug | REST APIs | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 1570 | Pug | GraphQL | None | None | None | None | Disabled |
| 1571 | Pug | GraphQL | Nginx | None | None | None | Disabled |
| 1572 | Pug | GraphQL | Kong (DB-less) | None | None | None | Disabled |
| 1573 | Pug | GraphQL | None | Redis | None | None | Disabled |
| 1574 | Pug | GraphQL | Nginx | Redis | None | None | Disabled |
| 1575 | Pug | GraphQL | Kong (DB-less) | Redis | None | None | Disabled |
| 1576 | Pug | GraphQL | None | Redis | None | None | Enabled |
| 1577 | Pug | GraphQL | Nginx | Redis | None | None | Enabled |
| 1578 | Pug | GraphQL | Kong (DB-less) | Redis | None | None | Enabled |
| 1579 | Pug | GraphQL | None | Memory Cache | None | None | Disabled |
| 1580 | Pug | GraphQL | Nginx | Memory Cache | None | None | Disabled |
| 1581 | Pug | GraphQL | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 1582 | Pug | GraphQL | None | None | JWT | None | Disabled |
| 1583 | Pug | GraphQL | Nginx | None | JWT | None | Disabled |
| 1584 | Pug | GraphQL | Kong (DB-less) | None | JWT | None | Disabled |
| 1585 | Pug | GraphQL | None | Redis | JWT | None | Disabled |
| 1586 | Pug | GraphQL | Nginx | Redis | JWT | None | Disabled |
| 1587 | Pug | GraphQL | Kong (DB-less) | Redis | JWT | None | Disabled |
| 1588 | Pug | GraphQL | None | Redis | JWT | None | Enabled |
| 1589 | Pug | GraphQL | Nginx | Redis | JWT | None | Enabled |
| 1590 | Pug | GraphQL | Kong (DB-less) | Redis | JWT | None | Enabled |
| 1591 | Pug | GraphQL | None | Memory Cache | JWT | None | Disabled |
| 1592 | Pug | GraphQL | Nginx | Memory Cache | JWT | None | Disabled |
| 1593 | Pug | GraphQL | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 1594 | Pug | GraphQL | None | None | JWT | Google,GitHub | Disabled |
| 1595 | Pug | GraphQL | Nginx | None | JWT | Google,GitHub | Disabled |
| 1596 | Pug | GraphQL | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 1597 | Pug | GraphQL | None | Redis | JWT | Google,GitHub | Disabled |
| 1598 | Pug | GraphQL | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 1599 | Pug | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 1600 | Pug | GraphQL | None | Redis | JWT | Google,GitHub | Enabled |
| 1601 | Pug | GraphQL | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 1602 | Pug | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 1603 | Pug | GraphQL | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 1604 | Pug | GraphQL | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 1605 | Pug | GraphQL | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 1606 | Pug | Kafka | None | None | None | None | Disabled |
| 1607 | Pug | Kafka | None | Redis | None | None | Disabled |
| 1608 | Pug | Kafka | None | Redis | None | None | Enabled |
| 1609 | Pug | Kafka | None | Memory Cache | None | None | Disabled |
| 1610 | Pug | Kafka | None | None | JWT | None | Disabled |
| 1611 | Pug | Kafka | None | Redis | JWT | None | Disabled |
| 1612 | Pug | Kafka | None | Redis | JWT | None | Enabled |
| 1613 | Pug | Kafka | None | Memory Cache | JWT | None | Disabled |
| 1614 | Pug | Kafka | None | None | JWT | Google,GitHub | Disabled |
| 1615 | Pug | Kafka | None | Redis | JWT | Google,GitHub | Disabled |
| 1616 | Pug | Kafka | None | Redis | JWT | Google,GitHub | Enabled |
| 1617 | Pug | Kafka | None | Memory Cache | JWT | Google,GitHub | Disabled |

#### Database: None

| # | View Engine | Communication | API Gateway | Caching | Auth | Social Auth | Background Jobs |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1072 | None | REST APIs | None | None | None | None | Disabled |
| 1073 | None | REST APIs | Nginx | None | None | None | Disabled |
| 1074 | None | REST APIs | Kong (DB-less) | None | None | None | Disabled |
| 1075 | None | REST APIs | None | None | JWT | None | Disabled |
| 1076 | None | REST APIs | Nginx | None | JWT | None | Disabled |
| 1077 | None | REST APIs | Kong (DB-less) | None | JWT | None | Disabled |
| 1078 | None | REST APIs | None | None | JWT | Google,GitHub | Disabled |
| 1079 | None | REST APIs | Nginx | None | JWT | Google,GitHub | Disabled |
| 1080 | None | REST APIs | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 1081 | None | GraphQL | None | None | None | None | Disabled |
| 1082 | None | GraphQL | Nginx | None | None | None | Disabled |
| 1083 | None | GraphQL | Kong (DB-less) | None | None | None | Disabled |
| 1084 | None | GraphQL | None | None | JWT | None | Disabled |
| 1085 | None | GraphQL | Nginx | None | JWT | None | Disabled |
| 1086 | None | GraphQL | Kong (DB-less) | None | JWT | None | Disabled |
| 1087 | None | GraphQL | None | None | JWT | Google,GitHub | Disabled |
| 1088 | None | GraphQL | Nginx | None | JWT | Google,GitHub | Disabled |
| 1089 | None | GraphQL | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 1090 | None | Kafka | None | None | None | None | Disabled |
| 1091 | None | Kafka | None | None | JWT | None | Disabled |
| 1092 | None | Kafka | None | None | JWT | Google,GitHub | Disabled |
| 1345 | EJS | REST APIs | None | None | None | None | Disabled |
| 1346 | EJS | REST APIs | Nginx | None | None | None | Disabled |
| 1347 | EJS | REST APIs | Kong (DB-less) | None | None | None | Disabled |
| 1348 | EJS | REST APIs | None | None | JWT | None | Disabled |
| 1349 | EJS | REST APIs | Nginx | None | JWT | None | Disabled |
| 1350 | EJS | REST APIs | Kong (DB-less) | None | JWT | None | Disabled |
| 1351 | EJS | REST APIs | None | None | JWT | Google,GitHub | Disabled |
| 1352 | EJS | REST APIs | Nginx | None | JWT | Google,GitHub | Disabled |
| 1353 | EJS | REST APIs | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 1354 | EJS | GraphQL | None | None | None | None | Disabled |
| 1355 | EJS | GraphQL | Nginx | None | None | None | Disabled |
| 1356 | EJS | GraphQL | Kong (DB-less) | None | None | None | Disabled |
| 1357 | EJS | GraphQL | None | None | JWT | None | Disabled |
| 1358 | EJS | GraphQL | Nginx | None | JWT | None | Disabled |
| 1359 | EJS | GraphQL | Kong (DB-less) | None | JWT | None | Disabled |
| 1360 | EJS | GraphQL | None | None | JWT | Google,GitHub | Disabled |
| 1361 | EJS | GraphQL | Nginx | None | JWT | Google,GitHub | Disabled |
| 1362 | EJS | GraphQL | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 1363 | EJS | Kafka | None | None | None | None | Disabled |
| 1364 | EJS | Kafka | None | None | JWT | None | Disabled |
| 1365 | EJS | Kafka | None | None | JWT | Google,GitHub | Disabled |
| 1618 | Pug | REST APIs | None | None | None | None | Disabled |
| 1619 | Pug | REST APIs | Nginx | None | None | None | Disabled |
| 1620 | Pug | REST APIs | Kong (DB-less) | None | None | None | Disabled |
| 1621 | Pug | REST APIs | None | None | JWT | None | Disabled |
| 1622 | Pug | REST APIs | Nginx | None | JWT | None | Disabled |
| 1623 | Pug | REST APIs | Kong (DB-less) | None | JWT | None | Disabled |
| 1624 | Pug | REST APIs | None | None | JWT | Google,GitHub | Disabled |
| 1625 | Pug | REST APIs | Nginx | None | JWT | Google,GitHub | Disabled |
| 1626 | Pug | REST APIs | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 1627 | Pug | GraphQL | None | None | None | None | Disabled |
| 1628 | Pug | GraphQL | Nginx | None | None | None | Disabled |
| 1629 | Pug | GraphQL | Kong (DB-less) | None | None | None | Disabled |
| 1630 | Pug | GraphQL | None | None | JWT | None | Disabled |
| 1631 | Pug | GraphQL | Nginx | None | JWT | None | Disabled |
| 1632 | Pug | GraphQL | Kong (DB-less) | None | JWT | None | Disabled |
| 1633 | Pug | GraphQL | None | None | JWT | Google,GitHub | Disabled |
| 1634 | Pug | GraphQL | Nginx | None | JWT | Google,GitHub | Disabled |
| 1635 | Pug | GraphQL | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 1636 | Pug | Kafka | None | None | None | None | Disabled |
| 1637 | Pug | Kafka | None | None | JWT | None | Disabled |
| 1638 | Pug | Kafka | None | None | JWT | Google,GitHub | Disabled |


## 2. Clean Architecture (546 Cases)
*Note: Clean Architecture does not use server-side view engines (EJS/Pug).*

### JavaScript

#### Database: MySQL

| # | Communication | API Gateway | Caching | Auth | Social Auth | Background Jobs |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1639 | REST APIs | None | None | None | None | Disabled |
| 1640 | REST APIs | Nginx | None | None | None | Disabled |
| 1641 | REST APIs | Kong (DB-less) | None | None | None | Disabled |
| 1642 | REST APIs | None | Redis | None | None | Disabled |
| 1643 | REST APIs | Nginx | Redis | None | None | Disabled |
| 1644 | REST APIs | Kong (DB-less) | Redis | None | None | Disabled |
| 1645 | REST APIs | None | Redis | None | None | Enabled |
| 1646 | REST APIs | Nginx | Redis | None | None | Enabled |
| 1647 | REST APIs | Kong (DB-less) | Redis | None | None | Enabled |
| 1648 | REST APIs | None | Memory Cache | None | None | Disabled |
| 1649 | REST APIs | Nginx | Memory Cache | None | None | Disabled |
| 1650 | REST APIs | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 1651 | REST APIs | None | None | JWT | None | Disabled |
| 1652 | REST APIs | Nginx | None | JWT | None | Disabled |
| 1653 | REST APIs | Kong (DB-less) | None | JWT | None | Disabled |
| 1654 | REST APIs | None | Redis | JWT | None | Disabled |
| 1655 | REST APIs | Nginx | Redis | JWT | None | Disabled |
| 1656 | REST APIs | Kong (DB-less) | Redis | JWT | None | Disabled |
| 1657 | REST APIs | None | Redis | JWT | None | Enabled |
| 1658 | REST APIs | Nginx | Redis | JWT | None | Enabled |
| 1659 | REST APIs | Kong (DB-less) | Redis | JWT | None | Enabled |
| 1660 | REST APIs | None | Memory Cache | JWT | None | Disabled |
| 1661 | REST APIs | Nginx | Memory Cache | JWT | None | Disabled |
| 1662 | REST APIs | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 1663 | REST APIs | None | None | JWT | Google,GitHub | Disabled |
| 1664 | REST APIs | Nginx | None | JWT | Google,GitHub | Disabled |
| 1665 | REST APIs | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 1666 | REST APIs | None | Redis | JWT | Google,GitHub | Disabled |
| 1667 | REST APIs | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 1668 | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 1669 | REST APIs | None | Redis | JWT | Google,GitHub | Enabled |
| 1670 | REST APIs | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 1671 | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 1672 | REST APIs | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 1673 | REST APIs | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 1674 | REST APIs | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 1675 | GraphQL | None | None | None | None | Disabled |
| 1676 | GraphQL | Nginx | None | None | None | Disabled |
| 1677 | GraphQL | Kong (DB-less) | None | None | None | Disabled |
| 1678 | GraphQL | None | Redis | None | None | Disabled |
| 1679 | GraphQL | Nginx | Redis | None | None | Disabled |
| 1680 | GraphQL | Kong (DB-less) | Redis | None | None | Disabled |
| 1681 | GraphQL | None | Redis | None | None | Enabled |
| 1682 | GraphQL | Nginx | Redis | None | None | Enabled |
| 1683 | GraphQL | Kong (DB-less) | Redis | None | None | Enabled |
| 1684 | GraphQL | None | Memory Cache | None | None | Disabled |
| 1685 | GraphQL | Nginx | Memory Cache | None | None | Disabled |
| 1686 | GraphQL | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 1687 | GraphQL | None | None | JWT | None | Disabled |
| 1688 | GraphQL | Nginx | None | JWT | None | Disabled |
| 1689 | GraphQL | Kong (DB-less) | None | JWT | None | Disabled |
| 1690 | GraphQL | None | Redis | JWT | None | Disabled |
| 1691 | GraphQL | Nginx | Redis | JWT | None | Disabled |
| 1692 | GraphQL | Kong (DB-less) | Redis | JWT | None | Disabled |
| 1693 | GraphQL | None | Redis | JWT | None | Enabled |
| 1694 | GraphQL | Nginx | Redis | JWT | None | Enabled |
| 1695 | GraphQL | Kong (DB-less) | Redis | JWT | None | Enabled |
| 1696 | GraphQL | None | Memory Cache | JWT | None | Disabled |
| 1697 | GraphQL | Nginx | Memory Cache | JWT | None | Disabled |
| 1698 | GraphQL | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 1699 | GraphQL | None | None | JWT | Google,GitHub | Disabled |
| 1700 | GraphQL | Nginx | None | JWT | Google,GitHub | Disabled |
| 1701 | GraphQL | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 1702 | GraphQL | None | Redis | JWT | Google,GitHub | Disabled |
| 1703 | GraphQL | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 1704 | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 1705 | GraphQL | None | Redis | JWT | Google,GitHub | Enabled |
| 1706 | GraphQL | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 1707 | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 1708 | GraphQL | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 1709 | GraphQL | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 1710 | GraphQL | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 1711 | Kafka | None | None | None | None | Disabled |
| 1712 | Kafka | None | Redis | None | None | Disabled |
| 1713 | Kafka | None | Redis | None | None | Enabled |
| 1714 | Kafka | None | Memory Cache | None | None | Disabled |
| 1715 | Kafka | None | None | JWT | None | Disabled |
| 1716 | Kafka | None | Redis | JWT | None | Disabled |
| 1717 | Kafka | None | Redis | JWT | None | Enabled |
| 1718 | Kafka | None | Memory Cache | JWT | None | Disabled |
| 1719 | Kafka | None | None | JWT | Google,GitHub | Disabled |
| 1720 | Kafka | None | Redis | JWT | Google,GitHub | Disabled |
| 1721 | Kafka | None | Redis | JWT | Google,GitHub | Enabled |
| 1722 | Kafka | None | Memory Cache | JWT | Google,GitHub | Disabled |

#### Database: PostgreSQL

| # | Communication | API Gateway | Caching | Auth | Social Auth | Background Jobs |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1723 | REST APIs | None | None | None | None | Disabled |
| 1724 | REST APIs | Nginx | None | None | None | Disabled |
| 1725 | REST APIs | Kong (DB-less) | None | None | None | Disabled |
| 1726 | REST APIs | None | Redis | None | None | Disabled |
| 1727 | REST APIs | Nginx | Redis | None | None | Disabled |
| 1728 | REST APIs | Kong (DB-less) | Redis | None | None | Disabled |
| 1729 | REST APIs | None | Redis | None | None | Enabled |
| 1730 | REST APIs | Nginx | Redis | None | None | Enabled |
| 1731 | REST APIs | Kong (DB-less) | Redis | None | None | Enabled |
| 1732 | REST APIs | None | Memory Cache | None | None | Disabled |
| 1733 | REST APIs | Nginx | Memory Cache | None | None | Disabled |
| 1734 | REST APIs | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 1735 | REST APIs | None | None | JWT | None | Disabled |
| 1736 | REST APIs | Nginx | None | JWT | None | Disabled |
| 1737 | REST APIs | Kong (DB-less) | None | JWT | None | Disabled |
| 1738 | REST APIs | None | Redis | JWT | None | Disabled |
| 1739 | REST APIs | Nginx | Redis | JWT | None | Disabled |
| 1740 | REST APIs | Kong (DB-less) | Redis | JWT | None | Disabled |
| 1741 | REST APIs | None | Redis | JWT | None | Enabled |
| 1742 | REST APIs | Nginx | Redis | JWT | None | Enabled |
| 1743 | REST APIs | Kong (DB-less) | Redis | JWT | None | Enabled |
| 1744 | REST APIs | None | Memory Cache | JWT | None | Disabled |
| 1745 | REST APIs | Nginx | Memory Cache | JWT | None | Disabled |
| 1746 | REST APIs | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 1747 | REST APIs | None | None | JWT | Google,GitHub | Disabled |
| 1748 | REST APIs | Nginx | None | JWT | Google,GitHub | Disabled |
| 1749 | REST APIs | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 1750 | REST APIs | None | Redis | JWT | Google,GitHub | Disabled |
| 1751 | REST APIs | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 1752 | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 1753 | REST APIs | None | Redis | JWT | Google,GitHub | Enabled |
| 1754 | REST APIs | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 1755 | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 1756 | REST APIs | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 1757 | REST APIs | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 1758 | REST APIs | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 1759 | GraphQL | None | None | None | None | Disabled |
| 1760 | GraphQL | Nginx | None | None | None | Disabled |
| 1761 | GraphQL | Kong (DB-less) | None | None | None | Disabled |
| 1762 | GraphQL | None | Redis | None | None | Disabled |
| 1763 | GraphQL | Nginx | Redis | None | None | Disabled |
| 1764 | GraphQL | Kong (DB-less) | Redis | None | None | Disabled |
| 1765 | GraphQL | None | Redis | None | None | Enabled |
| 1766 | GraphQL | Nginx | Redis | None | None | Enabled |
| 1767 | GraphQL | Kong (DB-less) | Redis | None | None | Enabled |
| 1768 | GraphQL | None | Memory Cache | None | None | Disabled |
| 1769 | GraphQL | Nginx | Memory Cache | None | None | Disabled |
| 1770 | GraphQL | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 1771 | GraphQL | None | None | JWT | None | Disabled |
| 1772 | GraphQL | Nginx | None | JWT | None | Disabled |
| 1773 | GraphQL | Kong (DB-less) | None | JWT | None | Disabled |
| 1774 | GraphQL | None | Redis | JWT | None | Disabled |
| 1775 | GraphQL | Nginx | Redis | JWT | None | Disabled |
| 1776 | GraphQL | Kong (DB-less) | Redis | JWT | None | Disabled |
| 1777 | GraphQL | None | Redis | JWT | None | Enabled |
| 1778 | GraphQL | Nginx | Redis | JWT | None | Enabled |
| 1779 | GraphQL | Kong (DB-less) | Redis | JWT | None | Enabled |
| 1780 | GraphQL | None | Memory Cache | JWT | None | Disabled |
| 1781 | GraphQL | Nginx | Memory Cache | JWT | None | Disabled |
| 1782 | GraphQL | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 1783 | GraphQL | None | None | JWT | Google,GitHub | Disabled |
| 1784 | GraphQL | Nginx | None | JWT | Google,GitHub | Disabled |
| 1785 | GraphQL | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 1786 | GraphQL | None | Redis | JWT | Google,GitHub | Disabled |
| 1787 | GraphQL | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 1788 | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 1789 | GraphQL | None | Redis | JWT | Google,GitHub | Enabled |
| 1790 | GraphQL | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 1791 | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 1792 | GraphQL | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 1793 | GraphQL | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 1794 | GraphQL | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 1795 | Kafka | None | None | None | None | Disabled |
| 1796 | Kafka | None | Redis | None | None | Disabled |
| 1797 | Kafka | None | Redis | None | None | Enabled |
| 1798 | Kafka | None | Memory Cache | None | None | Disabled |
| 1799 | Kafka | None | None | JWT | None | Disabled |
| 1800 | Kafka | None | Redis | JWT | None | Disabled |
| 1801 | Kafka | None | Redis | JWT | None | Enabled |
| 1802 | Kafka | None | Memory Cache | JWT | None | Disabled |
| 1803 | Kafka | None | None | JWT | Google,GitHub | Disabled |
| 1804 | Kafka | None | Redis | JWT | Google,GitHub | Disabled |
| 1805 | Kafka | None | Redis | JWT | Google,GitHub | Enabled |
| 1806 | Kafka | None | Memory Cache | JWT | Google,GitHub | Disabled |

#### Database: MongoDB

| # | Communication | API Gateway | Caching | Auth | Social Auth | Background Jobs |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1807 | REST APIs | None | None | None | None | Disabled |
| 1808 | REST APIs | Nginx | None | None | None | Disabled |
| 1809 | REST APIs | Kong (DB-less) | None | None | None | Disabled |
| 1810 | REST APIs | None | Redis | None | None | Disabled |
| 1811 | REST APIs | Nginx | Redis | None | None | Disabled |
| 1812 | REST APIs | Kong (DB-less) | Redis | None | None | Disabled |
| 1813 | REST APIs | None | Redis | None | None | Enabled |
| 1814 | REST APIs | Nginx | Redis | None | None | Enabled |
| 1815 | REST APIs | Kong (DB-less) | Redis | None | None | Enabled |
| 1816 | REST APIs | None | Memory Cache | None | None | Disabled |
| 1817 | REST APIs | Nginx | Memory Cache | None | None | Disabled |
| 1818 | REST APIs | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 1819 | REST APIs | None | None | JWT | None | Disabled |
| 1820 | REST APIs | Nginx | None | JWT | None | Disabled |
| 1821 | REST APIs | Kong (DB-less) | None | JWT | None | Disabled |
| 1822 | REST APIs | None | Redis | JWT | None | Disabled |
| 1823 | REST APIs | Nginx | Redis | JWT | None | Disabled |
| 1824 | REST APIs | Kong (DB-less) | Redis | JWT | None | Disabled |
| 1825 | REST APIs | None | Redis | JWT | None | Enabled |
| 1826 | REST APIs | Nginx | Redis | JWT | None | Enabled |
| 1827 | REST APIs | Kong (DB-less) | Redis | JWT | None | Enabled |
| 1828 | REST APIs | None | Memory Cache | JWT | None | Disabled |
| 1829 | REST APIs | Nginx | Memory Cache | JWT | None | Disabled |
| 1830 | REST APIs | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 1831 | REST APIs | None | None | JWT | Google,GitHub | Disabled |
| 1832 | REST APIs | Nginx | None | JWT | Google,GitHub | Disabled |
| 1833 | REST APIs | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 1834 | REST APIs | None | Redis | JWT | Google,GitHub | Disabled |
| 1835 | REST APIs | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 1836 | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 1837 | REST APIs | None | Redis | JWT | Google,GitHub | Enabled |
| 1838 | REST APIs | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 1839 | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 1840 | REST APIs | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 1841 | REST APIs | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 1842 | REST APIs | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 1843 | GraphQL | None | None | None | None | Disabled |
| 1844 | GraphQL | Nginx | None | None | None | Disabled |
| 1845 | GraphQL | Kong (DB-less) | None | None | None | Disabled |
| 1846 | GraphQL | None | Redis | None | None | Disabled |
| 1847 | GraphQL | Nginx | Redis | None | None | Disabled |
| 1848 | GraphQL | Kong (DB-less) | Redis | None | None | Disabled |
| 1849 | GraphQL | None | Redis | None | None | Enabled |
| 1850 | GraphQL | Nginx | Redis | None | None | Enabled |
| 1851 | GraphQL | Kong (DB-less) | Redis | None | None | Enabled |
| 1852 | GraphQL | None | Memory Cache | None | None | Disabled |
| 1853 | GraphQL | Nginx | Memory Cache | None | None | Disabled |
| 1854 | GraphQL | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 1855 | GraphQL | None | None | JWT | None | Disabled |
| 1856 | GraphQL | Nginx | None | JWT | None | Disabled |
| 1857 | GraphQL | Kong (DB-less) | None | JWT | None | Disabled |
| 1858 | GraphQL | None | Redis | JWT | None | Disabled |
| 1859 | GraphQL | Nginx | Redis | JWT | None | Disabled |
| 1860 | GraphQL | Kong (DB-less) | Redis | JWT | None | Disabled |
| 1861 | GraphQL | None | Redis | JWT | None | Enabled |
| 1862 | GraphQL | Nginx | Redis | JWT | None | Enabled |
| 1863 | GraphQL | Kong (DB-less) | Redis | JWT | None | Enabled |
| 1864 | GraphQL | None | Memory Cache | JWT | None | Disabled |
| 1865 | GraphQL | Nginx | Memory Cache | JWT | None | Disabled |
| 1866 | GraphQL | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 1867 | GraphQL | None | None | JWT | Google,GitHub | Disabled |
| 1868 | GraphQL | Nginx | None | JWT | Google,GitHub | Disabled |
| 1869 | GraphQL | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 1870 | GraphQL | None | Redis | JWT | Google,GitHub | Disabled |
| 1871 | GraphQL | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 1872 | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 1873 | GraphQL | None | Redis | JWT | Google,GitHub | Enabled |
| 1874 | GraphQL | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 1875 | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 1876 | GraphQL | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 1877 | GraphQL | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 1878 | GraphQL | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 1879 | Kafka | None | None | None | None | Disabled |
| 1880 | Kafka | None | Redis | None | None | Disabled |
| 1881 | Kafka | None | Redis | None | None | Enabled |
| 1882 | Kafka | None | Memory Cache | None | None | Disabled |
| 1883 | Kafka | None | None | JWT | None | Disabled |
| 1884 | Kafka | None | Redis | JWT | None | Disabled |
| 1885 | Kafka | None | Redis | JWT | None | Enabled |
| 1886 | Kafka | None | Memory Cache | JWT | None | Disabled |
| 1887 | Kafka | None | None | JWT | Google,GitHub | Disabled |
| 1888 | Kafka | None | Redis | JWT | Google,GitHub | Disabled |
| 1889 | Kafka | None | Redis | JWT | Google,GitHub | Enabled |
| 1890 | Kafka | None | Memory Cache | JWT | Google,GitHub | Disabled |

#### Database: None

| # | Communication | API Gateway | Caching | Auth | Social Auth | Background Jobs |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1891 | REST APIs | None | None | None | None | Disabled |
| 1892 | REST APIs | Nginx | None | None | None | Disabled |
| 1893 | REST APIs | Kong (DB-less) | None | None | None | Disabled |
| 1894 | REST APIs | None | None | JWT | None | Disabled |
| 1895 | REST APIs | Nginx | None | JWT | None | Disabled |
| 1896 | REST APIs | Kong (DB-less) | None | JWT | None | Disabled |
| 1897 | REST APIs | None | None | JWT | Google,GitHub | Disabled |
| 1898 | REST APIs | Nginx | None | JWT | Google,GitHub | Disabled |
| 1899 | REST APIs | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 1900 | GraphQL | None | None | None | None | Disabled |
| 1901 | GraphQL | Nginx | None | None | None | Disabled |
| 1902 | GraphQL | Kong (DB-less) | None | None | None | Disabled |
| 1903 | GraphQL | None | None | JWT | None | Disabled |
| 1904 | GraphQL | Nginx | None | JWT | None | Disabled |
| 1905 | GraphQL | Kong (DB-less) | None | JWT | None | Disabled |
| 1906 | GraphQL | None | None | JWT | Google,GitHub | Disabled |
| 1907 | GraphQL | Nginx | None | JWT | Google,GitHub | Disabled |
| 1908 | GraphQL | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 1909 | Kafka | None | None | None | None | Disabled |
| 1910 | Kafka | None | None | JWT | None | Disabled |
| 1911 | Kafka | None | None | JWT | Google,GitHub | Disabled |

### TypeScript

#### Database: MySQL

| # | Communication | API Gateway | Caching | Auth | Social Auth | Background Jobs |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1912 | REST APIs | None | None | None | None | Disabled |
| 1913 | REST APIs | Nginx | None | None | None | Disabled |
| 1914 | REST APIs | Kong (DB-less) | None | None | None | Disabled |
| 1915 | REST APIs | None | Redis | None | None | Disabled |
| 1916 | REST APIs | Nginx | Redis | None | None | Disabled |
| 1917 | REST APIs | Kong (DB-less) | Redis | None | None | Disabled |
| 1918 | REST APIs | None | Redis | None | None | Enabled |
| 1919 | REST APIs | Nginx | Redis | None | None | Enabled |
| 1920 | REST APIs | Kong (DB-less) | Redis | None | None | Enabled |
| 1921 | REST APIs | None | Memory Cache | None | None | Disabled |
| 1922 | REST APIs | Nginx | Memory Cache | None | None | Disabled |
| 1923 | REST APIs | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 1924 | REST APIs | None | None | JWT | None | Disabled |
| 1925 | REST APIs | Nginx | None | JWT | None | Disabled |
| 1926 | REST APIs | Kong (DB-less) | None | JWT | None | Disabled |
| 1927 | REST APIs | None | Redis | JWT | None | Disabled |
| 1928 | REST APIs | Nginx | Redis | JWT | None | Disabled |
| 1929 | REST APIs | Kong (DB-less) | Redis | JWT | None | Disabled |
| 1930 | REST APIs | None | Redis | JWT | None | Enabled |
| 1931 | REST APIs | Nginx | Redis | JWT | None | Enabled |
| 1932 | REST APIs | Kong (DB-less) | Redis | JWT | None | Enabled |
| 1933 | REST APIs | None | Memory Cache | JWT | None | Disabled |
| 1934 | REST APIs | Nginx | Memory Cache | JWT | None | Disabled |
| 1935 | REST APIs | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 1936 | REST APIs | None | None | JWT | Google,GitHub | Disabled |
| 1937 | REST APIs | Nginx | None | JWT | Google,GitHub | Disabled |
| 1938 | REST APIs | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 1939 | REST APIs | None | Redis | JWT | Google,GitHub | Disabled |
| 1940 | REST APIs | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 1941 | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 1942 | REST APIs | None | Redis | JWT | Google,GitHub | Enabled |
| 1943 | REST APIs | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 1944 | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 1945 | REST APIs | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 1946 | REST APIs | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 1947 | REST APIs | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 1948 | GraphQL | None | None | None | None | Disabled |
| 1949 | GraphQL | Nginx | None | None | None | Disabled |
| 1950 | GraphQL | Kong (DB-less) | None | None | None | Disabled |
| 1951 | GraphQL | None | Redis | None | None | Disabled |
| 1952 | GraphQL | Nginx | Redis | None | None | Disabled |
| 1953 | GraphQL | Kong (DB-less) | Redis | None | None | Disabled |
| 1954 | GraphQL | None | Redis | None | None | Enabled |
| 1955 | GraphQL | Nginx | Redis | None | None | Enabled |
| 1956 | GraphQL | Kong (DB-less) | Redis | None | None | Enabled |
| 1957 | GraphQL | None | Memory Cache | None | None | Disabled |
| 1958 | GraphQL | Nginx | Memory Cache | None | None | Disabled |
| 1959 | GraphQL | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 1960 | GraphQL | None | None | JWT | None | Disabled |
| 1961 | GraphQL | Nginx | None | JWT | None | Disabled |
| 1962 | GraphQL | Kong (DB-less) | None | JWT | None | Disabled |
| 1963 | GraphQL | None | Redis | JWT | None | Disabled |
| 1964 | GraphQL | Nginx | Redis | JWT | None | Disabled |
| 1965 | GraphQL | Kong (DB-less) | Redis | JWT | None | Disabled |
| 1966 | GraphQL | None | Redis | JWT | None | Enabled |
| 1967 | GraphQL | Nginx | Redis | JWT | None | Enabled |
| 1968 | GraphQL | Kong (DB-less) | Redis | JWT | None | Enabled |
| 1969 | GraphQL | None | Memory Cache | JWT | None | Disabled |
| 1970 | GraphQL | Nginx | Memory Cache | JWT | None | Disabled |
| 1971 | GraphQL | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 1972 | GraphQL | None | None | JWT | Google,GitHub | Disabled |
| 1973 | GraphQL | Nginx | None | JWT | Google,GitHub | Disabled |
| 1974 | GraphQL | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 1975 | GraphQL | None | Redis | JWT | Google,GitHub | Disabled |
| 1976 | GraphQL | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 1977 | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 1978 | GraphQL | None | Redis | JWT | Google,GitHub | Enabled |
| 1979 | GraphQL | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 1980 | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 1981 | GraphQL | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 1982 | GraphQL | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 1983 | GraphQL | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 1984 | Kafka | None | None | None | None | Disabled |
| 1985 | Kafka | None | Redis | None | None | Disabled |
| 1986 | Kafka | None | Redis | None | None | Enabled |
| 1987 | Kafka | None | Memory Cache | None | None | Disabled |
| 1988 | Kafka | None | None | JWT | None | Disabled |
| 1989 | Kafka | None | Redis | JWT | None | Disabled |
| 1990 | Kafka | None | Redis | JWT | None | Enabled |
| 1991 | Kafka | None | Memory Cache | JWT | None | Disabled |
| 1992 | Kafka | None | None | JWT | Google,GitHub | Disabled |
| 1993 | Kafka | None | Redis | JWT | Google,GitHub | Disabled |
| 1994 | Kafka | None | Redis | JWT | Google,GitHub | Enabled |
| 1995 | Kafka | None | Memory Cache | JWT | Google,GitHub | Disabled |

#### Database: PostgreSQL

| # | Communication | API Gateway | Caching | Auth | Social Auth | Background Jobs |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1996 | REST APIs | None | None | None | None | Disabled |
| 1997 | REST APIs | Nginx | None | None | None | Disabled |
| 1998 | REST APIs | Kong (DB-less) | None | None | None | Disabled |
| 1999 | REST APIs | None | Redis | None | None | Disabled |
| 2000 | REST APIs | Nginx | Redis | None | None | Disabled |
| 2001 | REST APIs | Kong (DB-less) | Redis | None | None | Disabled |
| 2002 | REST APIs | None | Redis | None | None | Enabled |
| 2003 | REST APIs | Nginx | Redis | None | None | Enabled |
| 2004 | REST APIs | Kong (DB-less) | Redis | None | None | Enabled |
| 2005 | REST APIs | None | Memory Cache | None | None | Disabled |
| 2006 | REST APIs | Nginx | Memory Cache | None | None | Disabled |
| 2007 | REST APIs | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 2008 | REST APIs | None | None | JWT | None | Disabled |
| 2009 | REST APIs | Nginx | None | JWT | None | Disabled |
| 2010 | REST APIs | Kong (DB-less) | None | JWT | None | Disabled |
| 2011 | REST APIs | None | Redis | JWT | None | Disabled |
| 2012 | REST APIs | Nginx | Redis | JWT | None | Disabled |
| 2013 | REST APIs | Kong (DB-less) | Redis | JWT | None | Disabled |
| 2014 | REST APIs | None | Redis | JWT | None | Enabled |
| 2015 | REST APIs | Nginx | Redis | JWT | None | Enabled |
| 2016 | REST APIs | Kong (DB-less) | Redis | JWT | None | Enabled |
| 2017 | REST APIs | None | Memory Cache | JWT | None | Disabled |
| 2018 | REST APIs | Nginx | Memory Cache | JWT | None | Disabled |
| 2019 | REST APIs | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 2020 | REST APIs | None | None | JWT | Google,GitHub | Disabled |
| 2021 | REST APIs | Nginx | None | JWT | Google,GitHub | Disabled |
| 2022 | REST APIs | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 2023 | REST APIs | None | Redis | JWT | Google,GitHub | Disabled |
| 2024 | REST APIs | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 2025 | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 2026 | REST APIs | None | Redis | JWT | Google,GitHub | Enabled |
| 2027 | REST APIs | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 2028 | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 2029 | REST APIs | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 2030 | REST APIs | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 2031 | REST APIs | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 2032 | GraphQL | None | None | None | None | Disabled |
| 2033 | GraphQL | Nginx | None | None | None | Disabled |
| 2034 | GraphQL | Kong (DB-less) | None | None | None | Disabled |
| 2035 | GraphQL | None | Redis | None | None | Disabled |
| 2036 | GraphQL | Nginx | Redis | None | None | Disabled |
| 2037 | GraphQL | Kong (DB-less) | Redis | None | None | Disabled |
| 2038 | GraphQL | None | Redis | None | None | Enabled |
| 2039 | GraphQL | Nginx | Redis | None | None | Enabled |
| 2040 | GraphQL | Kong (DB-less) | Redis | None | None | Enabled |
| 2041 | GraphQL | None | Memory Cache | None | None | Disabled |
| 2042 | GraphQL | Nginx | Memory Cache | None | None | Disabled |
| 2043 | GraphQL | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 2044 | GraphQL | None | None | JWT | None | Disabled |
| 2045 | GraphQL | Nginx | None | JWT | None | Disabled |
| 2046 | GraphQL | Kong (DB-less) | None | JWT | None | Disabled |
| 2047 | GraphQL | None | Redis | JWT | None | Disabled |
| 2048 | GraphQL | Nginx | Redis | JWT | None | Disabled |
| 2049 | GraphQL | Kong (DB-less) | Redis | JWT | None | Disabled |
| 2050 | GraphQL | None | Redis | JWT | None | Enabled |
| 2051 | GraphQL | Nginx | Redis | JWT | None | Enabled |
| 2052 | GraphQL | Kong (DB-less) | Redis | JWT | None | Enabled |
| 2053 | GraphQL | None | Memory Cache | JWT | None | Disabled |
| 2054 | GraphQL | Nginx | Memory Cache | JWT | None | Disabled |
| 2055 | GraphQL | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 2056 | GraphQL | None | None | JWT | Google,GitHub | Disabled |
| 2057 | GraphQL | Nginx | None | JWT | Google,GitHub | Disabled |
| 2058 | GraphQL | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 2059 | GraphQL | None | Redis | JWT | Google,GitHub | Disabled |
| 2060 | GraphQL | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 2061 | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 2062 | GraphQL | None | Redis | JWT | Google,GitHub | Enabled |
| 2063 | GraphQL | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 2064 | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 2065 | GraphQL | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 2066 | GraphQL | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 2067 | GraphQL | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 2068 | Kafka | None | None | None | None | Disabled |
| 2069 | Kafka | None | Redis | None | None | Disabled |
| 2070 | Kafka | None | Redis | None | None | Enabled |
| 2071 | Kafka | None | Memory Cache | None | None | Disabled |
| 2072 | Kafka | None | None | JWT | None | Disabled |
| 2073 | Kafka | None | Redis | JWT | None | Disabled |
| 2074 | Kafka | None | Redis | JWT | None | Enabled |
| 2075 | Kafka | None | Memory Cache | JWT | None | Disabled |
| 2076 | Kafka | None | None | JWT | Google,GitHub | Disabled |
| 2077 | Kafka | None | Redis | JWT | Google,GitHub | Disabled |
| 2078 | Kafka | None | Redis | JWT | Google,GitHub | Enabled |
| 2079 | Kafka | None | Memory Cache | JWT | Google,GitHub | Disabled |

#### Database: MongoDB

| # | Communication | API Gateway | Caching | Auth | Social Auth | Background Jobs |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 2080 | REST APIs | None | None | None | None | Disabled |
| 2081 | REST APIs | Nginx | None | None | None | Disabled |
| 2082 | REST APIs | Kong (DB-less) | None | None | None | Disabled |
| 2083 | REST APIs | None | Redis | None | None | Disabled |
| 2084 | REST APIs | Nginx | Redis | None | None | Disabled |
| 2085 | REST APIs | Kong (DB-less) | Redis | None | None | Disabled |
| 2086 | REST APIs | None | Redis | None | None | Enabled |
| 2087 | REST APIs | Nginx | Redis | None | None | Enabled |
| 2088 | REST APIs | Kong (DB-less) | Redis | None | None | Enabled |
| 2089 | REST APIs | None | Memory Cache | None | None | Disabled |
| 2090 | REST APIs | Nginx | Memory Cache | None | None | Disabled |
| 2091 | REST APIs | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 2092 | REST APIs | None | None | JWT | None | Disabled |
| 2093 | REST APIs | Nginx | None | JWT | None | Disabled |
| 2094 | REST APIs | Kong (DB-less) | None | JWT | None | Disabled |
| 2095 | REST APIs | None | Redis | JWT | None | Disabled |
| 2096 | REST APIs | Nginx | Redis | JWT | None | Disabled |
| 2097 | REST APIs | Kong (DB-less) | Redis | JWT | None | Disabled |
| 2098 | REST APIs | None | Redis | JWT | None | Enabled |
| 2099 | REST APIs | Nginx | Redis | JWT | None | Enabled |
| 2100 | REST APIs | Kong (DB-less) | Redis | JWT | None | Enabled |
| 2101 | REST APIs | None | Memory Cache | JWT | None | Disabled |
| 2102 | REST APIs | Nginx | Memory Cache | JWT | None | Disabled |
| 2103 | REST APIs | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 2104 | REST APIs | None | None | JWT | Google,GitHub | Disabled |
| 2105 | REST APIs | Nginx | None | JWT | Google,GitHub | Disabled |
| 2106 | REST APIs | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 2107 | REST APIs | None | Redis | JWT | Google,GitHub | Disabled |
| 2108 | REST APIs | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 2109 | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 2110 | REST APIs | None | Redis | JWT | Google,GitHub | Enabled |
| 2111 | REST APIs | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 2112 | REST APIs | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 2113 | REST APIs | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 2114 | REST APIs | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 2115 | REST APIs | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 2116 | GraphQL | None | None | None | None | Disabled |
| 2117 | GraphQL | Nginx | None | None | None | Disabled |
| 2118 | GraphQL | Kong (DB-less) | None | None | None | Disabled |
| 2119 | GraphQL | None | Redis | None | None | Disabled |
| 2120 | GraphQL | Nginx | Redis | None | None | Disabled |
| 2121 | GraphQL | Kong (DB-less) | Redis | None | None | Disabled |
| 2122 | GraphQL | None | Redis | None | None | Enabled |
| 2123 | GraphQL | Nginx | Redis | None | None | Enabled |
| 2124 | GraphQL | Kong (DB-less) | Redis | None | None | Enabled |
| 2125 | GraphQL | None | Memory Cache | None | None | Disabled |
| 2126 | GraphQL | Nginx | Memory Cache | None | None | Disabled |
| 2127 | GraphQL | Kong (DB-less) | Memory Cache | None | None | Disabled |
| 2128 | GraphQL | None | None | JWT | None | Disabled |
| 2129 | GraphQL | Nginx | None | JWT | None | Disabled |
| 2130 | GraphQL | Kong (DB-less) | None | JWT | None | Disabled |
| 2131 | GraphQL | None | Redis | JWT | None | Disabled |
| 2132 | GraphQL | Nginx | Redis | JWT | None | Disabled |
| 2133 | GraphQL | Kong (DB-less) | Redis | JWT | None | Disabled |
| 2134 | GraphQL | None | Redis | JWT | None | Enabled |
| 2135 | GraphQL | Nginx | Redis | JWT | None | Enabled |
| 2136 | GraphQL | Kong (DB-less) | Redis | JWT | None | Enabled |
| 2137 | GraphQL | None | Memory Cache | JWT | None | Disabled |
| 2138 | GraphQL | Nginx | Memory Cache | JWT | None | Disabled |
| 2139 | GraphQL | Kong (DB-less) | Memory Cache | JWT | None | Disabled |
| 2140 | GraphQL | None | None | JWT | Google,GitHub | Disabled |
| 2141 | GraphQL | Nginx | None | JWT | Google,GitHub | Disabled |
| 2142 | GraphQL | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 2143 | GraphQL | None | Redis | JWT | Google,GitHub | Disabled |
| 2144 | GraphQL | Nginx | Redis | JWT | Google,GitHub | Disabled |
| 2145 | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Disabled |
| 2146 | GraphQL | None | Redis | JWT | Google,GitHub | Enabled |
| 2147 | GraphQL | Nginx | Redis | JWT | Google,GitHub | Enabled |
| 2148 | GraphQL | Kong (DB-less) | Redis | JWT | Google,GitHub | Enabled |
| 2149 | GraphQL | None | Memory Cache | JWT | Google,GitHub | Disabled |
| 2150 | GraphQL | Nginx | Memory Cache | JWT | Google,GitHub | Disabled |
| 2151 | GraphQL | Kong (DB-less) | Memory Cache | JWT | Google,GitHub | Disabled |
| 2152 | Kafka | None | None | None | None | Disabled |
| 2153 | Kafka | None | Redis | None | None | Disabled |
| 2154 | Kafka | None | Redis | None | None | Enabled |
| 2155 | Kafka | None | Memory Cache | None | None | Disabled |
| 2156 | Kafka | None | None | JWT | None | Disabled |
| 2157 | Kafka | None | Redis | JWT | None | Disabled |
| 2158 | Kafka | None | Redis | JWT | None | Enabled |
| 2159 | Kafka | None | Memory Cache | JWT | None | Disabled |
| 2160 | Kafka | None | None | JWT | Google,GitHub | Disabled |
| 2161 | Kafka | None | Redis | JWT | Google,GitHub | Disabled |
| 2162 | Kafka | None | Redis | JWT | Google,GitHub | Enabled |
| 2163 | Kafka | None | Memory Cache | JWT | Google,GitHub | Disabled |

#### Database: None

| # | Communication | API Gateway | Caching | Auth | Social Auth | Background Jobs |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 2164 | REST APIs | None | None | None | None | Disabled |
| 2165 | REST APIs | Nginx | None | None | None | Disabled |
| 2166 | REST APIs | Kong (DB-less) | None | None | None | Disabled |
| 2167 | REST APIs | None | None | JWT | None | Disabled |
| 2168 | REST APIs | Nginx | None | JWT | None | Disabled |
| 2169 | REST APIs | Kong (DB-less) | None | JWT | None | Disabled |
| 2170 | REST APIs | None | None | JWT | Google,GitHub | Disabled |
| 2171 | REST APIs | Nginx | None | JWT | Google,GitHub | Disabled |
| 2172 | REST APIs | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 2173 | GraphQL | None | None | None | None | Disabled |
| 2174 | GraphQL | Nginx | None | None | None | Disabled |
| 2175 | GraphQL | Kong (DB-less) | None | None | None | Disabled |
| 2176 | GraphQL | None | None | JWT | None | Disabled |
| 2177 | GraphQL | Nginx | None | JWT | None | Disabled |
| 2178 | GraphQL | Kong (DB-less) | None | JWT | None | Disabled |
| 2179 | GraphQL | None | None | JWT | Google,GitHub | Disabled |
| 2180 | GraphQL | Nginx | None | JWT | Google,GitHub | Disabled |
| 2181 | GraphQL | Kong (DB-less) | None | JWT | Google,GitHub | Disabled |
| 2182 | Kafka | None | None | None | None | Disabled |
| 2183 | Kafka | None | None | JWT | None | Disabled |
| 2184 | Kafka | None | None | JWT | Google,GitHub | Disabled |

