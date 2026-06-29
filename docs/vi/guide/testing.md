# Kiểm thử (Đơn vị & E2E)

Chất lượng không phải là điều để bổ sung sau. Mọi dự án đều đi kèm với một bộ kiểm thử được cấu hình đầy đủ.

## Kiểm thử Đơn vị (Jest)

Được hỗ trợ bởi **Jest** và **ts-jest** (đối với các dự án TypeScript).

- **Vị trí**: Tất cả các kiểm thử đơn vị được tập hợp trong thư mục `tests/unit/`, phản chiếu cấu trúc của thư mục `src/`.
- **Ngưỡng độ bao phủ**: Ngưỡng độ bao phủ được đặt ở mức **70%** cho các dòng và hàm để đảm bảo khả năng bảo trì.
- **Lệnh chạy**:
    - `npm test` (hoặc `pnpm`, `yarn`): Chạy tất cả kiểm thử.
    - `npm run test:watch` (hoặc `pnpm`, `yarn`): Chạy kiểm thử ở chế độ theo dõi (watch mode).
    - `npm run test:coverage` (hoặc `pnpm`, `yarn`): Tạo báo cáo độ bao phủ chi tiết.

## Kiểm thử End-to-End (E2E) (Supertest)

Tập trung vào toàn bộ hệ thống dưới dạng hộp đen, chạy kiểm thử trên môi trường thực tế (hoặc giả lập).

- **Luồng hoạt động**: Sử dụng **Supertest** để thực hiện các yêu cầu HTTP thực tế đến dịch vụ đang chạy.
- **Cơ sở hạ tầng**: Các kiểm thử E2E nhắm vào cụm container Docker để đảm bảo kết nối mạng và kết nối DB là chính xác.
- **Sự cô lập**: Sử dụng một script điều phối chuyên dụng (`scripts/run-e2e.js`) để quản lý vòng đời của các container kiểm thử.
- **Lệnh chạy**: `npm run test:e2e` (hoặc `pnpm`, `yarn`)

## Tiêu chuẩn Giả lập (Mocking)

- **Cơ sở dữ liệu**: Các giả lập được cấu hình sẵn cho các mô hình Mongoose/Sequelize.
- **Hệ thống tin nhắn**: Bao gồm logic để giả lập **Kafka Singleton Service**, cho phép bạn kiểm thử các bộ điều khiển (controllers) mà không cần một Kafka broker thực tế hoạt động.
