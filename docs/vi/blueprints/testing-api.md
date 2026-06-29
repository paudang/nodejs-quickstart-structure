# Hướng dẫn Kiểm thử & API

Kế hoạch chi tiết này bao gồm các phương pháp tiêu chuẩn hóa để kiểm thử ứng dụng của bạn và tương tác với các lớp giao tiếp của ứng dụng (REST, GraphQL và Kafka).

## Chất lượng & Tiêu chuẩn

Dự án được tạo của bạn bao gồm các công cụ được cấu hình sẵn để kiểm thử tự động và đảm bảo chất lượng mã nguồn.

### 1. Linting & Định dạng
Đảm bảo mã nguồn của bạn tuân thủ các tiêu chuẩn của dự án:
::: code-group
```bash [npm]
# Kiểm tra lint
npm run lint

# Tự động định dạng
npm run format
```

```bash [pnpm]
# Kiểm tra lint
pnpm lint

# Tự động định dạng
pnpm format
```

```bash [yarn]
# Kiểm tra lint
yarn lint

# Tự động định dạng
yarn format
```
:::

### 2. Kiểm thử Đơn vị & Tích hợp
Duy trì độ tin cậy cao với các bộ kiểm thử tự động:
::: code-group
```bash [npm]
# Chạy tất cả kiểm thử
npm test

# Chạy kiểm thử với báo cáo độ bao phủ (coverage)
npm run test:coverage
```

```bash [pnpm]
# Chạy tất cả kiểm thử
pnpm test

# Chạy kiểm thử với báo cáo độ bao phủ (coverage)
pnpm test:coverage
```

```bash [yarn]
# Chạy tất cả kiểm thử
yarn test

# Chạy kiểm thử với báo cáo độ bao phủ (coverage)
yarn test:coverage
```
:::

---

## Tương tác API

Tùy thuộc vào cấu hình của bạn, vi dịch vụ (microservice) của bạn cung cấp tài liệu tương tác để khám phá và kiểm thử các điểm cuối. Hãy chọn thiết lập của bạn bên dưới:

::: code-group
```bash [REST API (Swagger)]
# URL: http://localhost:3000/api-docs

# Các điểm cuối tiêu chuẩn:
- GET /api/users: Liệt kê tất cả người dùng.
- POST /api/users: Tạo người dùng mới.
- PATCH /api/users/:id: Cập nhật một phần thông tin người dùng.
- DELETE /api/users/:id: Xóa người dùng (Xóa mềm - Soft Delete).
```

```graphql [GraphQL API (Apollo)]
# URL: http://localhost:3000/graphql

# Truy vấn ví dụ (Lấy danh sách người dùng):
query GetAllUsers {
  getAllUsers {
    id
    name
    email
  }
}

# Mutation ví dụ (Tạo người dùng mới):
mutation CreateUser {
  createUser(name: "John Doe", email: "john@example.com") {
    id
    name
    email
  }
}
```

```bash [Kafka Flow]
# 1. Đảm bảo cơ sở hạ tầng đang chạy
docker-compose up -d kafka

# 2. Khởi động ứng dụng
npm run dev (hoặc dùng pnpm / yarn)

# 3. Kích hoạt sự kiện (thông qua Postman hoặc curl)
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Kafka Tester", "email": "kafka@example.com"}'

# 4. Quan sát nhật ký (logs) của ứng dụng:
[Kafka] Producer: Sent USER_CREATED event for 'kafka@example.com'
[Kafka] Consumer: Received USER_CREATED. 
[Kafka] Consumer:  Sending welcome email to 'kafka@example.com'... Done!
```

```bash [Background Jobs Dashboard]
# URL: http://localhost:3000/admin/queues

# Được cung cấp bởi Bull-Board, giao diện tương tác này cho phép bạn:
- Theo dõi các công việc đang hoạt động, bị trì hoãn và đã hoàn thành.
- Thử lại các công việc nền bị thất bại một cách thủ công.
- Tạm dừng và tiếp tục các hàng đợi.
```
:::

## Luồng bất đồng bộ Kafka

Khi sử dụng **Kafka**, dự án tuân theo mô hình hướng sự kiện, không chặn (non-blocking):

1.  **Kích hoạt**: Người dùng gửi yêu cầu (ví dụ: `POST /api/users`).
2.  **Sản xuất (Produce)**: API gửi sự kiện `USER_CREATED` đến **Kafka Broker**.
3.  **Tiêu thụ (Consume)**: **Welcome Worker** (Consumer) nhận sự kiện từ topic.
4.  **Thực thi**: Worker mô phỏng việc gửi email chào mừng trong nền.

---

## Công việc nền (BullMQ)

Khi sử dụng **Công việc nền (Background Jobs)**, dự án triển khai một hệ thống hàng đợi mạnh mẽ dựa trên Redis:

1.  **Hàng đợi**: Các công việc được thêm vào hàng đợi (ví dụ: `emailQueue`) thông qua điểm cuối API hoặc dịch vụ nội bộ.
2.  **Worker**: Các worker nền xử lý các công việc này một cách bất đồng bộ để đảm bảo vòng lặp sự kiện (event loop) chính không bị chặn.
3.  **Giám sát**: Truy cập `http://localhost:3000/admin/queues` để mở **Bảng điều khiển Bull-Board**. Tại đây bạn có thể kiểm tra trạng thái công việc, thử lại công việc lỗi và theo dõi tình trạng của hàng đợi trong thời gian thực.

---

---

### Các bước xác minh:
1.  **Tạo sự kiện**: Gửi POST tới `http://localhost:3000/api/users`.
2.  **Xác minh logs**: Tìm dòng chữ `[Kafka] Producer: Sent USER_CREATED event`.
3.  **Xác nhận thực thi**: Tìm dòng chữ `[Kafka] Consumer: Received USER_CREATED` và tiến trình mô phỏng email.

## Các bước tiếp theo

Nếu bạn đã bật xác thực, hãy xem [Xác thực](/blueprints/authentication) để tìm hiểu cách bảo mật điểm cuối và xác thực các yêu cầu của bạn.