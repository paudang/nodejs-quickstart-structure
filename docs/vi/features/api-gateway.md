# Tích hợp API Gateway (Tùy chọn)

**Node.js Quickstart Generator** hỗ trợ tích hợp liền mạch một **API Gateway** bảo mật phía trước ứng dụng Node.js của bạn để xử lý lưu lượng đầu vào, giới hạn tốc độ (rate limiting), và các quy tắc bảo mật.

## Tổng quan
Khi bạn bật **Advanced Options** (Tùy chọn nâng cao) và loại API của bạn là REST hoặc GraphQL, bạn có thể tùy chọn triển khai microservice của mình phía sau một API Gateway chuẩn doanh nghiệp. Chúng tôi hỗ trợ sẵn hai giải pháp hàng đầu:

- **Nginx**: Một máy chủ web hiệu suất cao đóng vai trò là reverse proxy, được cấu hình sẵn với các header bảo mật nghiêm ngặt và rate limiting.
- **Kong (DB-less)**: Một API Gateway mạnh mẽ được cấu hình ở chế độ khai báo (không trạng thái), tận dụng các plugin cho rate-limiting và xác thực Key Authentication.

## Kiến trúc

Khi API Gateway được chọn, trình tạo sẽ tạo ra một thư mục riêng biệt `deploy/gateway/` chứa các cấu hình mẫu (blueprint) của gateway.

```text
project-root/
├── src/
├── docker-compose.yml
└── deploy/
    └── gateway/
        ├── nginx.conf (hoặc kong.yml)
        └── docker-compose.nginx.yml (hoặc docker-compose.kong.yml)
```

## Các Gateway được hỗ trợ

### 1. Nginx
Nginx hoạt động như một reverse proxy nhanh và an toàn. Blueprint bảo mật của chúng tôi bao gồm:
- **Rate Limiting**: Hạn chế các cuộc tấn công dò mật khẩu (brute-force) ngay khi cài đặt (`10r/s`).
- **Security Headers**: Bơm các header như `X-Frame-Options`, `Content-Security-Policy`, v.v. để bảo vệ ứng dụng Node.js phía sau.
- **Proxy Pass**: Chuyển tiếp lưu lượng trong suốt tới mạng nội bộ `app:3000`.

### 2. Kong (DB-less)
Kong trong chế độ DB-less sử dụng file khai báo `kong.yml`, loại bỏ sự cần thiết của cơ sở dữ liệu PostgreSQL bên ngoài.
- **Rate-Limiting Plugin**: Thực thi các chính sách kiểm soát lưu lượng.
- **Key-Auth Plugin**: Bảo vệ các route bằng cách xác thực `apikey`, yêu cầu người dùng (consumer) phải cung cấp key hợp lệ.

## Triển khai

Để triển khai ứng dụng của bạn cùng với API Gateway:

1. Khởi động ứng dụng Node.js và hạ tầng của nó (từ thư mục gốc của dự án):
   ```bash
   docker-compose up -d
   ```
2. Di chuyển vào thư mục gateway:
   ```bash
   cd deploy/gateway
   ```
3. Chạy container gateway:
   ```bash
   docker-compose -f docker-compose.nginx.yml up -d
   # hoặc docker-compose.kong.yml
   ```
