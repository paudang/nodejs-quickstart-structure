# 数据库与迁移 (Database & Migrations)

稳健的数据管理是本生成器的核心能力。我们支持 SQL 和 NoSQL 两种数据库类型，并集成了自动化的数据结构变更迁移管道。

## 支持的数据库

-   **PostgreSQL**：使用官方 `pg` 驱动，并配置了 **Flyway** 自动管理 SQL 结构迁移。
-   **MySQL**：使用 `mysql2` 驱动，配置 **Flyway** 自动管理 SQL 结构迁移。
-   **MongoDB**：使用 **Mongoose** 库定义数据 Schema，配置 `migrate-mongo` 自动管理 NoSQL 数据模型迁移。

## SQL 数据迁移 (PostgreSQL/MySQL)

利用 **Flyway** 在 `docker-compose.yml` 容器生命周期内进行自动化管理。

-   **文件位置**：SQL 脚本文件保存在 `flyway/sql/` 目录下。
-   **自动运行**：当您运行 `docker-compose up` 时，迁移脚本会自动执行，无需手动刷库。
-   **命名规范**：`V1__initial_schema.sql`、`V2__add_users_table.sql`。

## MongoDB 数据迁移

通过 `migrate-mongo` 库进行版本管控。

-   **配置文件**：位于项目根目录下的 `migrate-mongo-config.js`。
-   **常用命令**：
    -   `npm run migrate:up` (或 `pnpm`, `yarn`): 运行未执行的模型迁移。
    -   `npm run migrate:status` (或 `pnpm`, `yarn`): 检查当前的数据库迁移状态列表。

## 无数据库运行模式 ("None")

如果在初始化时选择了 **None**，生成器会创建一个 **模拟内存模型 (Mock In-Memory Model)**：

-   **核心优势**：特别适合编写纯消息处理服务 (如仅消费 Kafka 消息) 或在不安装任何数据库的情况下调试业务逻辑。
-   **架构模式**：依然保留了与真实数据库相同的 Repository / Service 模式设计，以保证未来可以无痛无缝切换到真实数据库中。
