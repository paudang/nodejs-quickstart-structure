# Triển khai (Docker & PM2)

`nodejs-quickstart-structure` đảm bảo ứng dụng của bạn luôn sẵn sàng triển khai trên bất kỳ hạ tầng hiện đại nào.

## Triển khai bằng Docker (Cloud-Native)

Sử dụng tệp **Multi-Stage Dockerfile** để tối thiểu hóa kích thước image và tối đa hóa tính bảo mật.

### Tạo Docker Image (Build)
```bash
docker build -t my-microservice .
```

### Khởi động cùng với Cơ sở hạ tầng
Chạy toàn bộ cụm dịch vụ (DB, Cache, v.v.) và container ứng dụng của bạn cùng nhau:
```bash
docker-compose up --build
```

### Tối ưu hóa cho môi trường Production
- **Người dùng Non-root**: Ứng dụng chạy dưới quyền người dùng `node` để tăng tính bảo mật.
- **Dọn dẹp logs**: Ẩn các thông báo nâng cấp npm không thiết thực để giữ cho log build được gọn gàng.

## Triển khai bằng PM2 (VPS/EC2)

Nếu bạn muốn triển khai trực tiếp lên máy chủ ảo riêng (VPS), chúng tôi hỗ trợ cấu hình sẵn **PM2**.

- **Ecosystem.config.js**: Tự động tạo tệp cấu hình PM2 phù hợp.
- **Cluster Mode**: Được định cấu hình sẵn chạy ở chế độ Cluster giúp tối đa hóa khả năng phục vụ liên tục (High Availability).
- **Lệnh chạy**:
    - `npm run deploy` (hoặc `pnpm`, `yarn`): Khởi động ứng dụng bằng PM2.
    - `npx pm2 status`: Kiểm tra trạng thái ứng dụng.
    - `npx pm2 logs`: Xem log thời gian thực.

## Tích hợp CI/CD

Chúng tôi cung cấp sẵn các tệp cấu hình cho:
- **GitHub Actions**: `.github/workflows/ci.yml`
- **GitLab CI**: `.gitlab-ci.yml`
- **Jenkins**: `Jenkinsfile`

Các luồng CI/CD này sẽ tự động chạy kiểm tra lint, kiểm thử đơn vị và kiểm thử E2E trước mỗi phiên triển khai.
