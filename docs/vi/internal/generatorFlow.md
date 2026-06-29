# Luồng hoạt động của trình tạo (Generator Flow)

Tài liệu này mô tả cách trình tạo `nodejs-quickstart-structure` xử lý các luồng thiết lập khác nhau và cấu trúc thư mục kết quả.

## Các giai đoạn hoạt động

Trình tạo hoạt động theo quy trình 3 giai đoạn:
1. **Thu thập đầu vào**: Yêu cầu người dùng cấu hình qua CLI (Kiến trúc, Ngôn ngữ, Giao tiếp, Cơ sở dữ liệu, v.v.).
2. **Biên dịch Template**: Render các template EJS tương ứng dựa trên cấu hình người dùng.
3. **Sao chép tài nguyên**: Sao chép các tệp tĩnh, thiết lập Git, Husky và cài đặt phụ thuộc nếu được yêu cầu.

---

## Bản đồ cấu trúc thư mục theo các trường hợp

### Trường hợp A: MVC (REST API)
Cấu trúc tiêu chuẩn cho các Web API truyền thống.

```text
project-name/
├── src/
│   ├── config/         # Cấu hình Cơ sở dữ liệu, Redis, Swagger, v.v.
│   ├── controllers/    # Bộ điều khiển (sử dụng next(error))
│   ├── errors/         # Các lớp lỗi tùy chỉnh: ApiError, NotFoundError...
│   ├── models/         # Schema và Model cơ sở dữ liệu
│   ├── routes/         # Khai báo tuyến Express
│   ├── utils/
│   │   ├── errorMiddleware.{ts|js}  # Xử lý lỗi toàn cục
│   │   ├── logger.{ts|js}
│   │   └── httpCodes.{ts|js}
│   └── index.js|ts     # Entry point (đăng ký errorMiddleware cuối cùng)
├── tests/              # Kiểm thử Jest
├── package.json
├── Dockerfile
└── docker-compose.yml
```

### Trường hợp A2: MVC (GraphQL)
Apollo Server v4 được gắn kết dưới dạng phần mềm trung gian (middleware) của Express.

```text
project-name/
├── src/
│   ├── config/         # Cấu hình Cơ sở dữ liệu, Redis
│   ├── controllers/    # Logic xử lý của GraphQL resolver (ném ra lỗi)
│   ├── errors/         # ApiError, NotFoundError...
│   ├── graphql/
│   │   ├── schema/     # Định nghĩa typeDefs
│   │   └── resolvers/  # Bộ giải quyết resolvers (gọi controllers, ném lỗi)
│   ├── models/
│   ├── utils/
│   │   ├── errorMiddleware.{ts|js}  # Xử lý lỗi dự phòng cấp Express
│   │   └── logger.{ts|js}
│   └── index.js|ts     # Khởi tạo Apollo Server + hook formatError
└── ...
```

### Trường hợp B: MVC (Web App với Views)
Bao gồm các chế độ xem frontend được kết xuất động trên máy chủ.

```text
project-name/
├── public/             # CSS, JS, Hình ảnh tĩnh
├── src/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── views/          # Các template EJS hoặc Pug
│   └── index.js|ts
└── ...
```

### Trường hợp C: Kiến trúc sạch (REST API)
Sự tách biệt rõ rệt giữa Domain, Use Cases, và Infrastructure.

```text
project-name/
├── src/
│   ├── domain/                 # Thực thể (Quy tắc doanh nghiệp)
│   ├── errors/                 # Lỗi tùy chỉnh ApiError, NotFoundError...
│   ├── usecases/               # Logic nghiệp vụ ứng dụng
│   ├── interfaces/             # Bộ điều hợp (Adapters)
│   │   ├── controllers/        # Sử dụng next(error) để truyền lỗi
│   │   └── routes/             # Truyền NextFunction qua các bộ xử lý
│   ├── infrastructure/         # Frameworks & Trình điều khiển
│   │   ├── config/             # Cấu hình môi trường
│   │   ├── caching/            # Kết nối Redis Client
│   │   ├── database/           # Kết nối DB & định nghĩa models
│   │   ├── repositories/       # Triển khai truy cập dữ liệu thực tế
│   │   └── webserver/
│   │       ├── middleware/
│   │       │   └── errorMiddleware.js  # Xử lý lỗi Express (chỉ trên JS)
│   │       └── server.js       # Thiết lập ứng dụng Express
│   ├── utils/
│   │   └── errorMiddleware.ts  # Xử lý lỗi toàn cục (trên TS)
│   └── index.js|ts              # Khởi chạy ứng dụng & đăng ký middleware lỗi
└── ...
```

### Trường hợp D: Kiến trúc sạch (Kafka Worker)
Được tối ưu hóa cho các microservice sự kiện. Tuyến HTTP được loại bỏ hoàn toàn.

```text
project-name/
├── src/
│   ├── domain/
│   ├── usecases/
│   ├── infrastructure/
│   │   ├── config/             # Bao gồm cấu hình Kafka
│   │   ├── database/
│   │   ├── messaging/          # Khởi tạo Kafka Client/Consumer
│   │   ├── repositories/
│   │   └── webserver/          # (Tùy chọn tối giản)
│   └── index.js|ts
└── ...
```