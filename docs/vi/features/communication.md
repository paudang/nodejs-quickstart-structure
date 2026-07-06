# Giao thức truyền thông
`nodejs-quickstart-structure`hỗ trợ ba phương thức liên lạc chính, mỗi phương thức được tối ưu hóa cho các trường hợp sử dụng khác nhau.

## API REST (Tiêu chuẩn)

Điểm cuối RESTful tiêu chuẩn được cung cấp bởi **Express.js**.

- **Tài liệu**: Tự động tạo giao diện người dùng Swagger ở`http://localhost:3000/api-docs`.
- **Xử lý lỗi**: Phần mềm trung gian tập trung với mã trạng thái HTTP tiêu chuẩn.
- **Bảo mật**: Tiêu đề giới hạn tỷ lệ và Mũ bảo hiểm được định cấu hình sẵn.

## GraphQL (Hiện đại)

Ngôn ngữ truy vấn API mạnh mẽ được cung cấp bởi **Apollo Server v4**.

- **Sân chơi**: **Apollo Sandbox** được nhúng hoàn toàn có sẵn tại`http://localhost:3000/graphql`.
- **Lược đồ**: Được gõ mạnh với`typeDefs`và`resolvers`.
- **Tích hợp**: Ánh xạ liền mạch tới các mô hình MVC hoặc Clean Architecture.

## Kafka (Theo hướng sự kiện)

Nhắn tin hiệu suất cao cho các dịch vụ vi mô không đồng bộ.

- **Chế độ Kafka KRaft**: Không phụ thuộc vào Zookeeper; thiết lập hiện đại hóa trong`docker-compose.yml`.
- **Mẫu**: Sử dụng **Dịch vụ Singleton Kafka** để có khả năng phục hồi và hiệu suất.
- **BaseConsumer**: Lớp trừu tượng được tiêu chuẩn hóa để tạo ứng dụng tiêu dùng tùy chỉnh với tính năng xử lý lỗi tích hợp.
- **Chế độ chỉ dành cho công nhân**: Nếu chỉ chọn Kafka, trình tạo sẽ loại bỏ các tuyến HTTP không cần thiết, tạo ra một dịch vụ công nhân thuần túy.

## Xác thực & Ủy quyền

Trên tất cả các giao thức truyền thông, <VocabLink category="auth-security" term="authentication" text="xác thực" /> và bảo mật được xử lý thông qua **Hệ thống JWT có thể cắm**.

- **REST**: Ủy quyền dựa trên phần mềm trung gian (`authMiddleware.ts`).
- **GraphQL**: ủy quyền dựa trên ngữ cảnh và trình phân giải được bảo vệ.
- **Mã thông báo**: Hỗ trợ **Truy cập/Xoay vòng mã thông báo làm mới** và **Danh sách đen** một cách an toàn thông qua Redis/Bộ nhớ đệm.

*For a deep dive into the security implementation, see the [Authentication Blueprint](/blueprints/authentication).*
