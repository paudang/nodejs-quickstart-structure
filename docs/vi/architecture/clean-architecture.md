# Kiến trúc sạch

**Kiến trúc sạch** (hoặc Kiến trúc lục giác) được thiết kế để tách biệt các quy tắc kinh doanh khỏi cơ sở hạ tầng và giao diện người dùng. Điều này đảm bảo rằng logic miền lõi độc lập với các khung bên ngoài như Express, Mongoose hoặc Kafka.

## Cấu trúc thư mục

```text
src/
├── domain/                 # Core business entities
├── usecases/               # Application-specific business rules
├── interfaces/             # Controllers, Routes, GraphQL resolvers (Adapters)
├── infrastructure/         # External tools (DB, Cache, Kafka, Webserver)
└── index.ts                # Application entry point
```

## Lớp phụ thuộc

1. **Miền**: Chứa các thực thể và logic nghiệp vụ được sử dụng trên ứng dụng. Nó không phụ thuộc vào các lớp khác.
2. **Trường hợp sử dụng**: Xác định các hành động dành riêng cho ứng dụng (ví dụ:`CreateUser`,`ProcessPayment`). Nó tương tác với **Miền** và xác định **Giao diện kho lưu trữ**.
3. **Giao diện**: Kết nối thế giới bên ngoài (HTTP, Kafka) với **Trường hợp sử dụng**. Ví dụ: bộ điều khiển REST chuyển đổi yêu cầu thành lệnh gọi **Trường hợp sử dụng**.
4. **Cơ sở hạ tầng**: Triển khai các giao diện kho lưu trữ cơ sở dữ liệu, xử lý cấu hình môi trường và quản lý máy chủ web.

##Tại sao chọn Clean Architecture?

- **Khung độc lập**: Bạn có thể thay đổi cơ sở dữ liệu hoặc khung web của mình mà không tốn nhiều công sức.
- **Có thể kiểm tra**: Logic nghiệp vụ có thể được kiểm tra riêng biệt mà không cần mô phỏng cho cơ sở dữ liệu hoặc máy chủ web.
- **Có thể bảo trì**: Sự tách biệt rõ ràng giúp các nhóm lớn làm việc trên các phần khác nhau của hệ thống dễ dàng hơn.