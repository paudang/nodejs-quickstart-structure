# Tích hợp API Gateway (Tùy chọn)

**Node.js Quickstart Generator** hỗ trợ tích hợp liền mạch một **API Gateway** bảo mật phía trước ứng dụng Node.js của bạn để xử lý lưu lượng đầu vào, giới hạn tốc độ (rate limiting), và các quy tắc bảo mật.

## Tổng quan
Khi bạn bật **Advanced Options** (Tùy chọn nâng cao) và loại API của bạn là REST hoặc GraphQL, bạn có thể tùy chọn triển khai microservice của mình phía sau một API Gateway chuẩn doanh nghiệp. Chúng tôi hỗ trợ sẵn hai giải pháp hàng đầu:

- **Nginx**: Một máy chủ web hiệu suất cao đóng vai trò là reverse proxy, được cấu hình sẵn với các header bảo mật nghiêm ngặt và rate limiting.
- **Kong (DB-less)**: Một API Gateway mạnh mẽ được cấu hình ở chế độ khai báo (không trạng thái), tận dụng các plugin cho rate-limiting và xác thực Key Authentication.

## Tại sao bạn cần một API Gateway?
Mặc dù Node.js xử lý logic nghiệp vụ và I/O bất đồng bộ rất xuất sắc, nhưng không nên phơi bày trực tiếp ứng dụng Node.js ra Internet trong môi trường thực tế (Production). API Gateway mang lại những lợi ích quan trọng sau:
- **Bảo mật & Chống quá tải**: Bảo vệ ứng dụng Node.js của bạn khỏi các cuộc tấn công DDoS, dò mật khẩu (brute-force) và các request lỗi thông qua cơ chế giới hạn tốc độ (rate-limiting) và bộ đệm kết nối.
- **Giảm tải (Offloading)**: Đảm nhiệm việc mã hóa SSL/TLS, nén Gzip và trả về file tĩnh, giúp giải phóng tài nguyên CPU của Node.js để tập trung xử lý logic.
- **Xác thực**: Tập trung hóa việc kiểm tra API Key (như Kong) hoặc xác thực JWT ngay từ cửa ngõ trước khi request chạm tới service của bạn.
- **Khả năng mở rộng (Scalability)**: Đóng vai trò như một bộ cân bằng tải (Load Balancer / Reverse Proxy) phân phối lưu lượng truy cập mượt mà tới nhiều instance backend.

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

## Chi tiết Cấu hình (Configuration Details)

### Cấu hình Nginx
- **Port Mapping**: Theo mặc định, Nginx map cổng `80` ra ngoài máy chủ thật (host).
- **Docker Compose**: File `docker-compose.nginx.yml` sử dụng `Dockerfile` cục bộ để build image Nginx. Nó tự động phân giải tới ứng dụng Node.js thông qua tên service nội bộ là `app`.
- **Tùy biến quy tắc (Rules Customization)**: Bạn có thể sửa trực tiếp file `nginx.conf` để điều chỉnh các rate limit zones, chứng chỉ SSL, hoặc proxy buffering.

### Cấu hình Kong
- **Port Mapping**: Kong map cổng `8000` (Proxy API) và `8001` (Admin API) ra ngoài host. Các cổng bảo mật `8443` và `8444` cũng được mở.
- **File Khai báo (Declarative File)**: File `kong.yml` được mount dưới dạng volume trực tiếp vào trong container (`KONG_DECLARATIVE_CONFIG=/kong/declarative/kong.yml`). Bất kỳ thay đổi nào trong `kong.yml` đều cần khởi động lại container để có hiệu lực.
- **Logs**: Các log của Proxy và Admin được điều hướng ra `stdout/stderr` để dễ dàng theo dõi trên terminal.

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
