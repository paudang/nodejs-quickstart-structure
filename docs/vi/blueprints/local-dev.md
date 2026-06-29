# Tài liệu hướng dẫn Phát triển Cục bộ

Tài liệu này cung cấp quy trình chuẩn để thiết lập và chạy thử dự án được tạo ra của bạn ngay tại máy cục bộ. Mỗi cấu hình đều khớp với các hướng dẫn được ghi trong tệp `README.md` đi kèm dự án.

::: tip YÊU CẦU TIÊN QUYẾT
Trước khi bắt đầu, hãy đảm bảo máy tính của bạn đã cài đặt các công cụ sau:
- **Node.js (v18+)**
- **Docker & Docker Compose** (để quản lý các dịch vụ hạ tầng như Databases, Redis, và Kafka)
:::

## Quy trình Phát triển 7 Bước chuẩn

Để đảm bảo vi dịch vụ của bạn sẵn sàng hoạt động ổn định trên môi trường production, hãy tuân theo quy trình chuẩn sau:

| Bước | Mục tiêu | Lệnh thực thi | Giải thích |
| :--- | :--- | :--- | :--- |
| **Bước 1** | **Khởi tạo Git** | `git init` | Kích hoạt Husky git hooks và rào cản chất lượng/bảo mật. |
| **Bước 2** | **Cài đặt thư viện** | `npm install` (hoặc `pnpm`, `yarn`) | Tải về các phụ thuộc cốt lõi của dự án. |
| **Bước 3** | **Thiết lập Môi trường** | `cp .env.example .env` | Thiết lập các cấu hình biến môi trường cục bộ. |
| **Bước 4** | **Khởi động Hạ tầng** | `docker-compose up -d` | Khởi chạy DB, Redis, và Kafka ngầm qua Docker. |
| **Bước 5** | **Khởi chạy ứng dụng** | `npm run dev` (hoặc `pnpm`, `yarn`) | Chạy ứng dụng ở chế độ nhà phát triển có hot-reload. |
| **Bước 6** | **Kiểm tra Chất lượng** | `npm test` | Chạy bộ kiểm thử để xác minh chất lượng mã nguồn. |
| **Bước 7** | **Đóng gói & Chạy thật** | `npm run deploy` | Biên dịch và chạy ứng dụng ở chế độ PM2/Cluster. |

---

## Chi tiết Thiết lập

### 1. Cấu hình biến môi trường
Sao chép tệp cấu hình mẫu và điều chỉnh các giá trị mong muốn:
```bash
cp .env.example .env
```

### 2. Khởi chạy Hạ tầng & Ứng dụng
Lựa chọn câu lệnh phù hợp với cơ cấu cấu hình dự án mà bạn đã chọn sinh ra:

### Đầy đủ (DB + Redis + Kafka)

::: code-group
```bash [npm]
# Khởi tạo repository và cài đặt thư viện
git init && npm install

# Khởi động toàn bộ hạ tầng
docker-compose up -d db redis kafka

# Khởi chạy ứng dụng
npm run dev
```

```bash [pnpm]
git init && pnpm install
docker-compose up -d db redis kafka
pnpm dev
```

```bash [yarn]
git init && yarn install
docker-compose up -d db redis kafka
yarn dev
```
:::

### Đầy đủ + ELK Stack (Tùy chọn)

::: code-group
```bash [npm]
git init && npm install
docker-compose up -d db redis kafka
docker-compose -f docker-compose.elk.yml up -d
npm run dev
```

```bash [pnpm]
git init && pnpm install
docker-compose up -d db redis kafka
docker-compose -f docker-compose.elk.yml up -d
pnpm dev
```

```bash [yarn]
git init && yarn install
docker-compose up -d db redis kafka
docker-compose -f docker-compose.elk.yml up -d
yarn dev
```
:::

### REST + MongoDB

::: code-group
```bash [npm]
git init && npm install
docker-compose up -d db
npm run dev
```

```bash [pnpm]
git init && pnpm install
docker-compose up -d db
pnpm dev
```

```bash [yarn]
git init && yarn install
docker-compose up -d db
yarn dev
```
:::

### GraphQL + Redis

::: code-group
```bash [npm]
git init && npm install
docker-compose up -d db redis
npm run dev
```

```bash [pnpm]
git init && pnpm install
docker-compose up -d db redis
pnpm dev
```

```bash [yarn]
git init && yarn install
docker-compose up -d db redis
yarn dev
```
:::

### Tối giản (Không Cơ sở dữ liệu)

::: code-group
```bash [npm]
git init && npm install
npm run dev
```

```bash [pnpm]
git init && pnpm install
pnpm dev
```

```bash [yarn]
git init && yarn install
yarn dev
```
:::

::: info MẸO NHỎ
Chạy lệnh `docker-compose up -d` mà không chỉ định rõ dịch vụ sẽ tự động khởi chạy tất cả các hạ tầng được khai báo trong tệp `docker-compose.yml` của bạn.
:::