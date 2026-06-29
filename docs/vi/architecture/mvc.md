# Kiến trúc MVC

Kiến trúc **Model-View-Controller (MVC)** là lựa chọn mặc định cho phần lớn các ứng dụng web và API. Nó cung cấp sự tách biệt rõ ràng giữa dữ liệu, logic nghiệp vụ và bản trình bày.

## Cấu trúc thư mục

```text
src/
├── config/         # Configuration for DB, Redis, etc.
├── controllers/    # Request handlers (logic goes here)
├── models/         # Data schemas and models
├── routes/         # API endpoint definitions
├── utils/          # Middleware and utilities
└── index.ts        # App entry point
```

## Cách thức hoạt động

1. **Tuyến**: Nắm bắt các yêu cầu đến và ủy quyền chúng cho **Bộ điều khiển** thích hợp.
2. **Bộ điều khiển**: Chứa logic nghiệp vụ chính. Chúng tương tác với **Mô hình** để tìm nạp hoặc lưu dữ liệu và gửi phản hồi.
3. **Mô hình**: Biểu thị cấu trúc dữ liệu (Mongoose, Sequelize hoặc TypeORM).
4. **Xử lý lỗi**: Bộ điều khiển chuyển lỗi tới hàm`next(error)`, được xử lý tập trung bởi phần mềm trung gian lỗi toàn cầu.

## Trường hợp sử dụng

- API REST tiêu chuẩn.
- Microservice vừa và nhỏ.
- Ứng dụng web kết xuất phía máy chủ (SSR) (sử dụng EJS hoặc Pug).