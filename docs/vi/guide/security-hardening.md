# Cấu hình Bảo mật Doanh nghiệp

Dự án này cho phép bạn tạo khung (scaffold) cho các vi dịch vụ Node.js với cấu hình bảo mật doanh nghiệp tích hợp sẵn. Tính năng này được thiết kế để đáp ứng các tiêu chuẩn bảo mật nghiêm ngặt của các công ty công nghệ hàng đầu.

## Các tính năng đi kèm

Khi bạn chọn "Yes" cho Enterprise Security Hardening (Bảo mật doanh nghiệp) trong quá trình khởi tạo dự án, các công cụ và cấu hình sau sẽ được thêm vào:

### 1. Snyk (SCA - Software Composition Analysis)
- **Công cụ**: [Snyk](https://snyk.io/)
- **Mục đích**: Tự động quét thư mục `node_modules` của bạn để phát hiện các lỗ hổng đã biết trong các phụ thuộc của bên thứ ba.
- **Tích hợp**: 
  - Một workflow GitHub Actions chuyên dụng (`.github/workflows/security.yml`).
  - Các bước quét tự động trên GitLab CI và Jenkins.
  - Fail-safe: Pipeline CI sẽ thất bại nếu phát hiện lỗ hổng mức độ "High" (Cao) hoặc "Critical" (Nghiêm trọng).

### 2. SonarCloud / SonarQube (SAST - Static Application Security Testing)
- **Công cụ**: [SonarCloud](https://sonarcloud.io/)
- **Mục đích**: Phân tích tĩnh chuyên sâu để phát hiện các mã xấu (code smells), lỗi hệ thống và các điểm nóng bảo mật (ví dụ: lỗi SQL Injection, XSS).
- **Tích hợp**: 
  - Tệp cấu hình sẵn `sonar-project.properties`.
  - Thực thi Quality Gates (Cổng chất lượng) trong các pipeline CI/CD.

### 3. Husky (Cổng kiểm soát chất lượng Pre-commit)
- **Công cụ**: [Husky](https://typicode.github.io/husky/) & [lint-staged](https://github.com/lint-staged/lint-staged)
- **Mục đích**: Tự động chạy kiểm tra lint và định dạng trên các tệp đã thay đổi trước mỗi lần commit để đảm bảo chất lượng mã nguồn.
- **Tích hợp**: 
  - Tự động khởi tạo trong quá trình `npm install` (hoặc `pnpm` / `yarn`).
  - Ngăn chặn mã nguồn chưa đạt chuẩn được commit vào kho lưu trữ.

---

Để kích hoạt đầy đủ các tính năng này trong dự án đã tạo của bạn, hãy làm theo các bước chi tiết sau để lấy mã thông báo xác thực (authentication tokens) và cấu hình môi trường CI/CD của bạn.

### 1. Tích hợp Snyk (SCA)

Snyk giám sát các phụ thuộc của bạn để phát hiện các lỗ hổng bảo mật. Cách thiết lập:

1.  **Tạo tài khoản**: Đăng ký một tài khoản miễn phí tại [Snyk.io](https://snyk.io/).
2.  **Lấy Auth Token của bạn**:
    - Nhấp vào **ảnh đại diện profile** của bạn (góc dưới bên trái) -> **Account Settings**.
    - Tìm đến mục **Auth Token**.
    - Nhấp **Click to show** và sao chép mã thông báo của bạn.
    - *Ngoài ra, đối với mục đích sử dụng của Tổ chức, đi tới **Settings -> Service Accounts** để tạo một mã không mang tính cá nhân.*
3.  **Cấu hình GitHub Secrets**:
    - Truy cập kho lưu trữ GitHub của bạn -> **Settings** -> **Secrets and variables** -> **Actions**.
    - Nhấp vào **New repository secret**.
    - Tên: `SNYK_TOKEN`
    - Giá trị: (Dán mã thông báo của bạn vào đây).

### 2. Tích hợp SonarCloud (SAST)

SonarCloud thực hiện phân tích tĩnh chuyên sâu và theo dõi chất lượng mã nguồn.

1.  **Đăng ký**: Đăng nhập vào [SonarCloud.io](https://sonarcloud.io/) bằng tài khoản GitHub của bạn.
2.  **Tạo/Nhập dự án**:
    > [!IMPORTANT] QUAN TRỌNG
    > Bạn **phải** nhập dự án của mình thủ công trên giao diện SonarCloud UI trước khi pipeline CI/CD có thể quét nó.
    - Nhấp vào biểu tượng **"+"** ở góc trên cùng bên phải -> **Analyze new project**.
    - Chọn tổ chức GitHub của bạn và nhập kho lưu trữ cụ thể.
3.  **Cấu hình phương pháp phân tích**:
    - Sau khi nhập xong, đi tới **Administration -> Analysis Method**.
    - **Tắt** tùy chọn "SonarCloud Automatic Analysis".
    - Chọn **GitHub Actions** làm phương pháp phân tích chính của bạn. Điều này sẽ cung cấp cho bạn các giá trị cấu hình `sonar-project.properties` chính xác.
4.  **Tạo mã thông báo (Token)**:
    - Nhấp vào biểu tượng **profile của bạn** -> **My Account** -> **Security**.
    - Tạo một mã thông báo mới và sao chép nó.
5.  **Lấy thông tin Dự án & Tổ chức của bạn**:
    - Trên bảng điều khiển dự án SonarCloud của bạn, tìm **Project Key** và **Organization Key** ở góc dưới cùng bên phải của mục "Information".
    - **Lưu ý**: Project Key thường có dạng `your-org_your-repo`.
    - Cập nhật tệp local `sonar-project.properties` của bạn:
        - `sonar.projectKey=mã-project-key-chính-xác-từ-sonarcloud`
        - `sonar.organization=mã-organization-key-chính-xác-từ-sonarcloud`
6.  **Cấu hình GitHub Secrets**:
    - Thêm secret `SONAR_TOKEN`: (Dán mã thông báo bạn vừa tạo).
    - Thêm secret `SONAR_HOST_URL`: 
        - **Nếu sử dụng SonarCloud**: Đặt giá trị là `https://sonarcloud.io`.
        - **Nếu sử dụng SonarQube tự lưu trữ (Self-hosted)**: Đặt giá trị là URL phiên bản của bạn (ví dụ: `http://ip-may-chu-cua-ban:9000`).

> [!TIP] MẸO
> Hầu hết người dùng nên sử dụng dịch vụ đám mây chính thức miễn phí của `https://sonarcloud.io` cho các dự án mã nguồn mở và dự án quy mô nhỏ!

### 3. Quét Container bằng Snyk

Ngoài việc quét các phụ thuộc, trình tạo còn bao gồm các kiểm tra **Bảo mật Container** để kiểm tra `Dockerfile` và hình ảnh cơ sở (base image) của bạn.

1.  **Yêu cầu**: Đảm bảo tệp `Dockerfile` có sẵn ở thư mục gốc.
2.  **CI/CD**: Bước `security.yml` (GitHub) hoặc bước `security` (GitLab/Jenkins) sẽ tự động build image của bạn và chạy lệnh `snyk container test`.
3.  **Kiểm tra cục bộ**:
    ```bash
    docker build -t my-app .
    snyk container test my-app --file=Dockerfile --severity-threshold=high
    ```

### 4. Husky & Lint-Staged
> [!IMPORTANT] QUAN TRỌNG
> Bạn **phải** chạy lệnh `git init` **trước khi** chạy `npm install` (hoặc `pnpm` / `yarn`) để Husky có thể thiết lập các git hook một cách chính xác.

1. **Khởi tạo Git**: `git init`
2. **Cài đặt phụ thuộc**: `npm install` (hoặc `pnpm` / `yarn`) (Lệnh này sẽ tự động kích hoạt `husky install`).
3. **Sử dụng**: Hãy thử commit một thay đổi! Husky sẽ tự động kích hoạt `lint-staged`.

**Khắc phục sự cố:**
Nếu bạn gặp lỗi dạng `.husky/pre-commit: line 2: .husky/_/husky.sh: No such file`, điều đó có nghĩa là Husky không được khởi tạo chính xác (thường do bỏ qua bước `git init`). Để khắc phục:
::: code-group
```bash [npm]
npx husky install
```
```bash [pnpm]
pnpm husky install
```
```bash [yarn]
yarn husky install
```
:::

### 5. Chạy quét bảo mật cục bộ
Bạn có thể tự chạy kiểm tra bảo mật bất kỳ lúc nào bằng cách sử dụng:

::: code-group
```bash [npm]
npm run security:check
```
```bash [pnpm]
pnpm security:check
```
```bash [yarn]
yarn security:check
```
:::

Lệnh này sẽ chạy tuần tự việc kiểm tra gói dependencies (audit check) và `snyk test`.
