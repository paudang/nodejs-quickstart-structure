# Tài liệu hướng dẫn Triển khai Docker & PM2

Tài liệu này trình bày các quy trình triển khai chuyên nghiệp cho dự án được tạo ra của bạn, bao gồm cả môi trường container hóa với Docker và quản lý tiến trình trực tiếp qua PM2.

### Chọn Chế độ Triển khai của Bạn

| Chế độ | Chiến lược | Phù hợp nhất cho | Tại sao? |
| :--- | :--- | :--- | :--- |
| Docker | Container hóa | CI/CD, Cloud, Multi-Cloud | Đồng nhất môi trường chạy ứng dụng. |
| PM2 | Quản lý Tiến trình | VPS, Máy chủ chuyên dụng | Chi phí tài nguyên thấp nhất, tốc độ tối đa. |

## Triển khai bằng Docker

Dự án bao gồm một tệp **Multi-Stage Dockerfile** được tối ưu hóa cho các image chạy môi trường production.

### 1. Chạy cục bộ (Môi trường Development)
Để chạy ứng dụng Node.js cục bộ trong khi sử dụng Docker để chạy cơ sở hạ tầng (Database, Redis, Kafka, v.v.):

::: code-group
```bash [npm]
# Khởi động hạ tầng
docker-compose up -d db redis kafka

# Khởi động ứng dụng
npm run dev
```

```bash [pnpm]
# Khởi động hạ tầng
docker-compose up -d db redis kafka

# Khởi động ứng dụng
pnpm dev
```

```bash [yarn]
# Khởi động hạ tầng
docker-compose up -d db redis kafka

# Khởi động ứng dụng
yarn dev
```
:::

### 2. Chạy ứng dụng dưới dạng Container cùng Hạ tầng Compose
Nếu bạn muốn chạy chính bản thân ứng dụng bên trong một container Docker:

::: code-group
```bash [REST + MongoDB + Redis]
# Đảm bảo hạ tầng đang chạy
docker-compose up -d

# Build Image cho môi trường Production
docker build -t your-app-name .

# Chạy Container (kết nối vào network của compose)
docker run -p 3000:3000 --network your-app-name_default \
  -e DB_HOST=db \
  -e REDIS_HOST=redis \
  your-app-name
```

```bash [GraphQL + Redis + Kafka]
# Đảm bảo hạ tầng đang chạy
docker-compose up -d

# Build Image cho môi trường Production
docker build -t your-app-name .

# Chạy Container (kết nối vào network của compose)
docker run -p 3000:3000 --network your-app-name_default \
  -e REDIS_HOST=redis \
  -e KAFKA_BROKER=kafka:29092 \
  your-app-name
```

```bash [Tối giản (Không DB)]
# Build Image cho môi trường Production
docker build -t your-app-name .

# Chạy Container
docker run -p 3000:3000 your-app-name
```

```bash [Full Stack + ELK (Tùy chọn)]
# Đảm bảo hạ tầng và ELK đang chạy
docker-compose up -d db redis kafka
docker-compose -f docker-compose.elk.yml up -d

# Build Image cho môi trường Production
docker build -t your-app-name .

# Chạy Container (kết nối vào network của compose)
docker run -p 3000:3000 --network your-app-name_default \
  -e DB_HOST=db \
  -e REDIS_HOST=redis \
  -e ELASTICSEARCH_URL=http://elasticsearch:9200 \
  your-app-name
```
:::

---

## Triển khai bằng PM2 (VPS/EC2)

Dự án được cấu hình sẵn để triển khai trực tiếp lên máy chủ VPS/EC2 bằng công cụ **PM2** (thông qua tệp `ecosystem.config.js`).

### 1. Các bước triển khai

1.  **Cài đặt phụ thuộc**:
    ::: code-group
    ```bash [npm]
    npm install
    ```
    ```bash [pnpm]
    pnpm install
    ```
    ```bash [yarn]
    yarn install
    ```
    :::

2.  **Khởi động Hạ tầng (các dịch vụ nền)**:
    ```bash
    docker-compose up -d db redis kafka
    # Tùy chọn: Khởi động ELK stack cho ghi log tập trung
    docker-compose -f docker-compose.elk.yml up -d
    ```

3.  **Đợi từ 5-10 giây** để cơ sở dữ liệu khởi tạo hoàn tất.

4.  **Triển khai Ứng dụng bằng PM2 ở Chế độ Cluster**:
    **Đối với dự án TypeScript:**
    ::: code-group
    ```bash [npm]
    # Build dự án và triển khai
    npm run build
    npm run deploy
    ```
    ```bash [pnpm]
    pnpm build
    pnpm deploy
    ```
    ```bash [yarn]
    yarn build
    yarn deploy
    ```
    :::
    
    **Đối với dự án JavaScript:**
    ::: code-group
    ```bash [npm]
    # Triển khai trực tiếp
    npm run deploy
    ```
    ```bash [pnpm]
    pnpm deploy
    ```
    ```bash [yarn]
    yarn deploy
    ```
    :::

### 2. Quản lý Tiến trình

| Lệnh | Hành động |
| :--- | :--- |
| `npx pm2 logs` | Xem log của ứng dụng theo thời gian thực |
| `npx pm2 status` | Kiểm tra trạng thái ứng dụng |
| `npx pm2 stop all` | Dừng tất cả các tiến trình |
| `npx pm2 delete your-app-name` | Gỡ ứng dụng khỏi sự quản lý của PM2 |

::: warning THU DỌN HẠ TẦNG
Khi muốn dừng hệ thống, đừng quên dừng các container hạ tầng bên dưới:
```bash
docker-compose down
# Tùy chọn: Dừng cụm ELK stack
docker-compose -f docker-compose.elk.yml down
```
:::