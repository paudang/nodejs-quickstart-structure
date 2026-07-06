# Bắt đầu nhanh

Làm theo các bước sau để khởi chạy dịch vụ đầu tiên của bạn.

## Yêu cầu tiên quyết

- **Node.js** (v18 trở lên)
- **Docker & Docker Compose** (cho cơ sở hạ tầng như cơ sở dữ liệu, Redis hoặc Kafka)

## Cài đặt

Bạn có thể chạy trình tạo trực tiếp bằng trình quản lý gói ưa thích của mình:

::: code-group

```bash [npm]
npx nodejs-quickstart-structure@latest init
```

```bash [pnpm]
pnpm dlx nodejs-quickstart-structure@latest init
```

```bash [yarn]
yarn dlx nodejs-quickstart-structure@latest init
```

:::

*Hoặc cài đặt toàn cục:*

::: code-group

```bash [npm]
npm install -g nodejs-quickstart-structure
nodejs-quickstart init
```

```bash [pnpm]
pnpm add -g nodejs-quickstart-structure
nodejs-quickstart init
```

```bash [yarn]
yarn global add nodejs-quickstart-structure
nodejs-quickstart init
```

:::

## Bắt đầu nhanh (Thiết lập tương tác)

Trình tạo của chúng tôi hỗ trợ vòng đời **6 giai đoạn đầy đủ của một ứng dụng Big Tech**, đảm bảo dự án của bạn sẵn sàng cho môi trường production ngay từ ngày đầu tiên:

![Main Flow Diagram](/main-flow.png)

Khi bạn chạy lệnh `init`, bạn sẽ được nhắc cấu hình chính xác vòng đời này:

1. **Project Name**: Tên thư mục chứa dịch vụ của bạn.
2. **Language**: Chọn giữa **TypeScript** (Khuyến nghị) hoặc **JavaScript**.
3. **Architecture**: Chọn **MVC** hoặc **Clean Architecture**.
4. **View Engine**: Nếu chọn MVC, hãy chọn **None**, **EJS**, hoặc **Pug**.
5. **Communication**: Chọn **REST APIs**, **GraphQL**, hoặc **Kafka**.
6. **Database**: Chọn **MySQL**, **PostgreSQL**, **MongoDB** (<VocabLink category="database" term="database" text="Cơ sở dữ liệu" />), hoặc **None**.
7. **Database Name**: Chỉ định tên cơ sở dữ liệu của bạn (nếu có chọn cơ sở dữ liệu).
8. **Caching**: Thêm **Redis** hoặc **Memory <VocabLink category="backend-apis" term="caching" text="Cache" />**.
9. **Authentication**: Hỗ trợ gắn thêm **<VocabLink category="auth-security" term="authentication" text="JWT" />** và **(OAuth2 - Google/GitHub)**.
10. **CI/CD**: Tạo cấu hình cho **GitHub Actions**, **GitLab**, hoặc **Jenkins**.
11. **Security Hardening**: Lựa chọn các công cụ bảo mật chuẩn doanh nghiệp như **Snyk** và **SonarQube** (nếu chọn CI/CD).
12. **Advanced Options**: Chọn để mở khóa các tính năng Khả năng phục hồi (Resilience), Công việc nền (Background Jobs), central logging (ELK) và Terraform.
13. **Resilience**: Chọn từ các mẫu thiết kế **Timeout**, **Retry**, và **Circuit Breaker**.
14. **Background Jobs**: Tùy chọn hàng đợi công việc **BullMQ** + **Bull-Board** (<VocabLink category="backend-apis" term="background-job" text="Hàng đợi" />) (Yêu cầu Redis).
15. **Terraform (IaC)**: Tạo khung các tệp cơ sở hạ tầng AWS/GCP/Azure (**Tiêu chuẩn** hoặc **Production**).
16. **ELK Stack**: Tích hợp tùy chọn **Elasticsearch & Kibana** để ghi nhật ký tập trung.

## Thiết lập dự án đầu tiên

Sau khi tạo xong, hãy di chuyển vào thư mục dự án của bạn và cài đặt các phụ thuộc:

::: code-group

```bash [npm]
cd my-new-service
npm install
npm run prepare
```

```bash [pnpm]
cd my-new-service
pnpm install
pnpm prepare
```

```bash [yarn]
cd my-new-service
yarn install
yarn prepare
```

:::

### Khởi động cơ sở hạ tầng
Nếu bạn đã chọn cơ sở dữ liệu, Redis hoặc Kafka, hãy khởi động chúng bằng Docker Compose:

```bash
docker-compose up -d
```

### Chạy ứng dụng
Khởi động máy chủ phát triển với chế độ tự động tải lại (hot-reload):

::: code-group

```bash [npm]
npm run dev
```

```bash [pnpm]
pnpm dev
```

```bash [yarn]
yarn dev
```

:::
