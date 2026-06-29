# Cơ sở Dữ liệu & Di di trú (Migrations)

Quản lý dữ liệu mạnh mẽ là tính năng cốt lõi của trình tạo này. Chúng tôi hỗ trợ cả cơ sở dữ liệu SQL và NoSQL với các đường ống di di trú (migration pipelines) tự động.

## Các Cơ sở Dữ liệu được Hỗ trợ

-   **PostgreSQL**: Sử dụng driver `pg` và **Flyway** cho các di di trú SQL.
-   **MySQL**: Sử dụng driver `mysql2` và **Flyway** cho các di di trú SQL.
-   **MongoDB**: Sử dụng **Mongoose** để định nghĩa schema và `migrate-mongo` cho các di di trú schema.

## Di di trú SQL (PostgreSQL/MySQL)

Được quản lý thông qua **Flyway** bên trong vòng đời của `docker-compose.yml`.

-   **Vị trí**: Các tệp SQL được lưu trữ trong thư mục `flyway/sql/`.
-   **Tự động chạy**: Các di di trú sẽ tự động thực thi khi bạn chạy lệnh `docker-compose up`.
-   **Đặt tên**: `V1__initial_schema.sql`, `V2__add_users_table.sql`.

## Di di trú MongoDB

Được quản lý thông qua thư viện `migrate-mongo`.

-   **Cấu hình**: Tệp `migrate-mongo-config.js` ở thư mục gốc của dự án.
-   **Lệnh chạy**:
    -   `npm run migrate:up` (hoặc `pnpm`, `yarn`): Áp dụng các di di trú mới.
    -   `npm run migrate:status` (hoặc `pnpm`, `yarn`): Kiểm tra trạng thái di di trú.

## Chế độ không dùng Cơ sở Dữ liệu ("None")

Nếu bạn chọn **None**, trình tạo sẽ tạo ra một **Mô hình Mock trong Bộ nhớ (Mock In-Memory Model)**.

-   **Lợi ích**: Tuyệt vời để xây dựng các worker thuần túy (Kafka) hoặc kiểm thử logic mà không cần chạy cơ sở dữ liệu thực tế.
-   **Cấu trúc**: Tuân theo cùng một mẫu repository/service giống như cơ sở dữ liệu thật để dễ dàng chuyển đổi trong tương lai.
