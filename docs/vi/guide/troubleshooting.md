# Hướng dẫn Khắc phục Sự cố & Câu hỏi Thường gặp (FAQ)

Chào mừng bạn đến với trung tâm khắc phục sự cố! Nếu bạn gặp lỗi, hãy kiểm tra các danh mục bên dưới. Mỗi mục đều tuân theo định dạng **Lỗi → Nguyên nhân → Giải pháp** để giải quyết nhanh chóng.

---

## Môi trường & Thiết lập

### `nodejs-quickstart: command not found`
- **Nguyên nhân**: CLI không được cài đặt toàn cục hoặc thiếu đường dẫn PATH.
- **Giải pháp**: Sử dụng lệnh `npx nodejs-quickstart-structure@latest init` (hoặc `pnpm dlx` / `yarn dlx`), hoặc cài đặt toàn cục qua trình quản lý gói ưa thích của bạn (ví dụ: `npm install -g nodejs-quickstart-structure`).

### `Invalid Node.js version`
- **Nguyên nhân**: Bạn có thể đang chạy phiên bản Node.js dưới 18.x.
- **Giải pháp**: Nâng cấp môi trường Node.js cục bộ của bạn. Khuyến nghị sử dụng **Node.js LTS (v22.x)**.

### `EBUSY: resource busy or locked` (Windows)
- **Nguyên nhân**: Tệp bị khóa bởi một tiến trình khác (IDE, terminal hoặc phần mềm diệt virus).
- **Giải pháp**: Đóng IDE của bạn, khởi động lại terminal dưới quyền Quản trị viên (Administrator) và thử lại lệnh.

---

## Bảo mật & Chất lượng (Snyk/Sonar)

### `403 Forbidden` hoặc `Unauthorized` (Snyk)
-   **Nguyên nhân**: Thiếu hoặc sai `SNYK_TOKEN` trong môi trường của bạn.
-   **Giải pháp**: 
    -   **Phát triển cục bộ**: Nếu việc quét cục bộ thất bại, bạn cần xác thực máy của mình:
        ```bash
        npx snyk auth
        # Lệnh này sẽ mở một cửa sổ trình duyệt để bạn đăng nhập.
        ```
    -   **CI/CD**: Đảm bảo Secret trong GitHub/GitLab được đặt tên chính xác là **`SNYK_TOKEN`**. Kiểm tra phần "Repository Secrets" của nhà cung cấp dịch vụ.

### `sonar.organization` is missing
- **Nguyên nhân**: SonarCloud yêu cầu khóa tổ chức (organization key) trong tệp `sonar-project.properties`.
- **Giải pháp**: Tìm Org Key của bạn trên giao diện SonarCloud UI và cập nhật tệp thuộc tính.

### `Could not find a default branch` (SonarCloud)
-   **Lỗi**: `ERROR Could not find a default branch for project...`
-   **Nguyên nhân**: Dự án chưa được nhập/tạo trên giao diện SonarCloud UI.
-   **Giải pháp**: 
    1.  Đăng nhập vào SonarCloud.
    2.  Nhấp vào **"+" -> Analyze new project** và nhập kho lưu trữ của bạn.
    3.  **Bước quan trọng**: Đi tới **Administration -> Analysis Method** và đảm bảo "Automatic Analysis" đã được **TẮT** và chọn "GitHub Actions" (hoặc nhà cung cấp của bạn).
    4.  Đảm bảo **Project Key** (ví dụ: `org_repo-name`) trên giao diện SonarCloud khớp với khóa trong tệp `sonar-project.properties` của bạn.

---

## Husky & Git Hooks

### Các Hook không chạy sau khi tạo dự án
- **Nguyên nhân**: Lệnh `npm install` (hoặc `pnpm` / `yarn`) được chạy trước `git init`.
- **Giải pháp**: Chạy lệnh `git init`, sau đó chạy `npx husky install`.

---

## Docker & Cơ sở hạ tầng

### `port is already allocated` (ví dụ: 9093)
- **Nguyên nhân**: Một container hoặc dịch vụ cục bộ khác đang sử dụng cổng này.
- **Giải pháp**: Dừng tất cả các container bằng lệnh `docker compose down` hoặc tìm tiến trình đang sử dụng cổng bằng `lsof -i :9093` (Mac/Linux) hoặc `netstat -ano | findstr :9093` (Windows).

### `dial unix /var/run/docker.sock: no such file or directory`
- **Nguyên nhân**: Docker socket không được mount hoặc đường dẫn không chính xác cho hệ điều hành của bạn.
- **Giải pháp (Windows Git Bash)**: Sử dụng dấu gạch chéo kép khi mount: `-v //var/run/docker.sock:/var/run/docker.sock`.

### `permission denied` (Docker API)
- **Nguyên nhân**: Người dùng chạy công cụ không có quyền truy cập vào socket.
- **Giải pháp**: Chạy container CI của bạn dưới quyền `root` (ví dụ: `--user root` trong docker run) hoặc thêm người dùng vào nhóm `docker`.

### Lỗi tìm kiếm Terraform `aws_ami` (LocalStack)
- **Lỗi**: `data.aws_ami.latest: Search returned no results` khi chạy `terraform plan` hoặc `terraform apply` khi triển khai cục bộ với LocalStack.
- **Nguyên nhân**: Cấu hình mặc định tìm kiếm AMI Amazon Linux 2 mới nhất bằng bộ lọc `"amzn2-ami-hvm-*"`. Tuy nhiên, LocalStack chạy trong môi trường cục bộ không bao gồm hoặc hỗ trợ các AMI Amazon Linux 2 tiêu chuẩn theo mặc định, khiến việc tìm kiếm thất bại.
- **Giải pháp**: 
  1. Mở tệp `/terraform/modules/compute/main.tf` trong dự án của bạn.
  2. Tìm khối `data "aws_ami" "latest"` (khoảng dòng 27).
  3. Thay đổi giá trị bộ lọc từ `"amzn2-ami-hvm-*"` thành `"*"` để khớp với bất kỳ mock AMI nào có sẵn trong LocalStack:
     ```hcl
     data "aws_ami" "latest" {
       most_recent = true
       owners      = ["amazon"]
       filter {
         name   = "name"
         values = ["*"] # Thay đổi từ "amzn2-ami-hvm-*" để tương thích với LocalStack
       }
     }
     ```
  4. Chạy lại lệnh `terraform apply`.

> [!WARNING] CẢNH BÁO
> **Triển khai AWS Thực tế**: Bộ lọc `"*"` sẽ khớp với *bất kỳ* hình ảnh nào thuộc sở hữu của Amazon, điều này có thể dẫn đến một hệ điều hành không phải Linux hoặc không tương thích khi triển khai lên AWS thực tế. Trước khi chạy `terraform apply` trên tài khoản AWS thực, hãy đảm bảo bạn đổi lại giá trị bộ lọc thành `"amzn2-ami-hvm-*"` để chọn đúng Amazon Linux 2 tiêu chuẩn và script user data (sử dụng `yum` và `docker`) thực thi thành công.

### Xác minh trạng thái dịch vụ LocalStack
- **Vấn đề**: Bạn muốn kiểm tra xem các dịch vụ AWS giả lập nào (EC2, RDS, IAM, v.v.) đang chạy thành công bên trong LocalStack hoặc chẩn đoán các sự cố kết nối.
- **Giải pháp**: 
  1. Mở trình duyệt của bạn hoặc chạy yêu cầu `curl` tới endpoint kiểm tra sức khỏe của LocalStack:
     ```bash
     curl http://localhost:4566/_localstack/health
     ```
  2. Lệnh này sẽ trả về một phản hồi JSON liệt kê tất cả các dịch vụ được giả lập và trạng thái hoạt động của chúng:
     ```json
     {
       "services": {
         "ec2": "running",
         "rds": "running",
         "elasticache": "running",
         "iam": "running",
         "sts": "running",
         "elbv2": "running",
         "wafv2": "running"
       },
       "features": {
         "initScripts": "initialized"
       }
     }
     ```
  3. Đảm bảo rằng tất cả các dịch vụ bạn đang cố gắng triển khai đều hiển thị trạng thái là `"running"` hoặc `"available"`.

---

## Xác thực & API

### Swagger: Lỗi `Failed to fetch` trên `/auth/google` hoặc `/auth/github`
- **Vấn đề**: Nhấp vào "Execute" trả về lỗi "Failed to fetch" và lỗi CORS.
- **Nguyên nhân**: Bảo mật trình duyệt (CORS) ngăn cản Swagger UI theo dõi lệnh chuyển hướng (`302`) đến một miền bên ngoài (như Google/GitHub) bên trong một yêu cầu AJAX.
- **Giải pháp**: 
  - **Kiểm thử thủ công**: Sao chép URL `http://localhost:3000/auth/google` dán trực tiếp vào thanh địa chỉ của trình duyệt. Nó sẽ hoạt động hoàn hảo.
  - **Kiểm thử API**: Sử dụng điểm cuối `POST /auth/social/exchange` trong Swagger. Đây là một JSON API và không gặp sự cố chuyển hướng.

### Swagger: Lỗi `500 Internal Server Error` trên `/auth/social/exchange`
- **Vấn đề**: Nhận lỗi 500 với thông báo "Failed to authenticate" khi gửi mã code lên Swagger.
- **Nguyên nhân**: Mã OAuth2 chỉ sử dụng được một lần và đã bị trình duyệt mã hóa URL.
- **Giải pháp**: 
  1. **Lấy mã code MỚI**: Truy cập lại URL đăng nhập trong trình duyệt của bạn để lấy mã code mới (chúng sẽ hết hạn sau một lần sử dụng!).
  2. **Giải mã URL (URL Decode)**: Nếu mã code trên thanh địa chỉ chứa `%2F`, bạn phải thay thế nó bằng ký tự `/` trước khi dán vào Swagger (ví dụ: `4%2F0Af...` trở thành `4/0Af...`).
  3. **Khớp Redirect URI**: Đảm bảo `redirectUri` trong JSON body khớp hoàn toàn với URI được đăng ký trong bảng điều khiển Google/GitHub của bạn.

---

## Công việc nền & Hàng đợi Task (BullMQ)

### Lỗi Redis `Max retries per request`
- **Lỗi**: `MaxRetriesPerRequestError: Reached the max retries per request limit (which is 20)`
- **Nguyên nhân**: BullMQ yêu cầu cấu hình `maxRetriesPerRequest` phải được đặt thành `null` trong cấu hình máy khách Redis. Nếu bạn ghi đè `redisClient` hoặc sử dụng một phiên bản Redis tùy chỉnh, BullMQ sẽ bị lỗi khi nó bị chặn chờ đợi công việc.
- **Giải pháp**: Đảm bảo `redisClient` của bạn truyền tham số `maxRetriesPerRequest: null` khi khởi tạo. Trình tạo Quickstart thực hiện điều này theo mặc định, nhưng hãy kiểm tra lại tệp `src/config/redisClient.ts` (hoặc `.js`) nếu bạn có chỉnh sửa nó.

### Redis OOM (Out of Memory)
- **Vấn đề**: Máy chủ Redis bị lỗi hoặc đẩy các khóa ra ngoài không mong muốn sau khi xử lý nhiều công việc nền.
- **Nguyên nhân**: Theo mặc định, BullMQ lưu trữ tất cả các công việc đã hoàn thành và thất bại trong Redis vô thời hạn. Nếu bạn xử lý hàng triệu công việc, bộ nhớ Redis sẽ bị đầy.
- **Giải pháp**: Thiết lập các tùy chọn `removeOnComplete` và `removeOnFail` khi thêm công việc.
  ```typescript
  await emailQueue.add('send-email', data, {
    removeOnComplete: true, // hoặc một số như 100 để giữ lại 100 công việc gần nhất
    removeOnFail: 1000      // Giữ lại 1000 công việc thất bại gần nhất để debug
  });
  ```

---

## Lỗi Trình tạo (Generator Issues)

### Các template không render chính xác
- **Nguyên nhân**: Chỉnh sửa trực tiếp các tệp `.yml` thay vì các tệp template `.yml.ejs`.
- **Giải pháp**: Luôn sửa đổi các tệp bên trong thư mục `templates/` có đuôi kết thúc bằng `.ejs`.

> [!TIP] MẸO
> Phát hiện sự cố mới? Đừng ngần ngại [Mở một Issue](https://github.com/paudang/nodejs-quickstart-structure/issues) trên GitHub!
