# Hướng dẫn thiết lập CI/CD

Tài liệu này cung cấp hướng dẫn từng bước để thiết lập Tích hợp liên tục và Triển khai liên tục (CI/CD) cho dịch vụ microservice Node.js được tạo ra của bạn. Chúng tôi hỗ trợ 5 nền tảng lớn ngoài hộp.

::: tip LỰA CHỌN TRÌNH CẤU HÌNH
Khi khởi tạo dự án, hãy chọn nhà cung cấp dịch vụ bạn thích trong phần nhắc **"Select CI/CD Provider"**. Trình tạo sẽ tự động chèn các tệp cấu hình tương ứng vào dự án của bạn.
:::

---

## Yêu cầu tiên quyết chung

Trước khi định cấu hình cho bất kỳ nền tảng nào, hãy đảm bảo rằng bạn đã:
1. **Khởi tạo Git**: Chạy lệnh `git init` trong thư mục gốc của dự án.
2. **Snyk Token**: (Tùy chọn) Lấy token API từ [Snyk.io](https://snyk.io/) để quét bảo mật thư viện phụ thuộc.
3. **SonarQube/SonarCloud Token**: (Tùy chọn) Lấy token từ [SonarCloud.io](https://sonarcloud.io/) để phân tích mã nguồn tĩnh.

---

## 1. GitHub Actions

GitHub Actions được tích hợp trực tiếp vào kho lưu trữ mã nguồn của bạn.

### Các bước định cấu hình:
1. **Đẩy mã nguồn**: Đẩy dự án của bạn lên kho lưu trữ GitHub.
2. **Xác minh cấu hình**: Đảm bảo tệp `.github/workflows/ci.yml` tồn tại ở thư mục gốc.
3. **Định cấu hình Secrets**:
    - Đi tới **Settings** của kho lưu trữ.
    - Chọn **Secrets and variables > Actions** từ thanh bên.
    - Nhấp vào **New repository secret**.
    - Thêm `SNYK_TOKEN` (nếu sử dụng tính năng Bảo mật nâng cao).
    - Thêm `SONAR_TOKEN` (nếu sử dụng tính năng Bảo mật nâng cao).
4. **Kích hoạt**: Mỗi khi có hành động push hoặc Pull Request gửi tới nhánh `main`, luồng công việc sẽ tự động được kích hoạt.

---

## 2. GitLab CI

GitLab CI sử dụng một tệp `.gitlab-ci.yml` duy nhất để quản lý toàn bộ vòng đời của pipeline.

### Các bước định cấu hình:
1. **Đẩy mã nguồn**: Đẩy dự án của bạn lên kho lưu trữ GitLab.
2. **Định cấu hình Biến CI/CD**:
    - Đi tới mục **Settings > CI/CD**.
    - Mở rộng phần **Variables**.
    - Thêm biến `SNYK_TOKEN` và `SONAR_TOKEN`.
3. **Định cấu hình Runner**:
    - Cấu hình được tạo sử dụng `services: [docker:dind]` cho các kiểm thử E2E.
    - Đảm bảo Runner GitLab của bạn đã được kích hoạt **chế độ đặc quyền (privileged mode)** nếu tự lưu trữ (on-premise).
4. **Tự động nhận diện**: GitLab sẽ tự động nhận diện tệp `.gitlab-ci.yml` và khởi chạy pipeline.

---

## 3. Jenkins

Jenkins là một máy chủ tự động hóa tự lưu trữ. Đối với các dự án Node.js, chúng tôi khuyên bạn nên chạy Jenkins trong một container Docker để đảm bảo môi trường xây dựng đồng nhất.

### Các bước định cấu hình:

#### 1. Thiết lập Jenkins với Docker (Khuyến nghị)
Để xây dựng các image Docker bên trong Jenkins, hãy sử dụng một image tùy chỉnh đã được cài đặt sẵn Docker CLI:

```bash
# Dockerfile.jenkins
FROM jenkins/jenkins:lts
USER root

# Cài đặt Docker CLI và curl
RUN apt-get update && apt-get install -y docker.io curl

# Tải trực tiếp phiên bản Docker Compose mới nhất
RUN curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && \
    chmod +x /usr/local/bin/docker-compose

# Đảm bảo người dùng jenkins có quyền truy cập vào socket docker
RUN usermod -aG docker jenkins

USER jenkins
```

Chạy container và gắn kết socket Docker của máy chủ (Lưu ý cờ `--user root` để tránh các vấn đề về quyền truy cập socket):
```bash
docker run -d -p 8080:8080 -p 50000:50000 \
  --name jenkins \
  --user root \
  -v jenkins_home:/var/jenkins_home \
  -v //var/run/docker.sock:/var/run/docker.sock \
  my-jenkins-with-docker
```

#### 2. Cài đặt các Plugin cần thiết
Đi tới **Manage Jenkins > Plugins** và cài đặt:
- **NodeJS**: Để hỗ trợ chạy lệnh `npm`.
- **GitHub Integration**: Để kết nối với GitHub App.
- **Pipeline**: Để đọc tệp cấu hình `Jenkinsfile`.

::: tip BẠN CẦN GIÚP ĐỠ?
Nếu bạn gặp phải lỗi dạng `Invalid tool type "nodejs"` hoặc `npm not found`, hãy tham chiếu mục **[Jenkins Troubleshooting FAQ](../guide/troubleshooting#jenkins-invalid-tool-type-nodejs)** của chúng tôi để biết cách xử lý.
:::

#### 3. Cấu hình thông tin xác thực (GitHub App)
Để có kết nối an toàn nhất, hãy tạo một **GitHub App** trong phần cài đặt của GitHub:
1. **Quyền hạn**: Repository > Contents (R/W), Metadata (R), Commit statuses (R/W).
2. **App ID & Key**: Sao chép App ID và tải xuống Khóa riêng tư dạng `.pem`.
3. **Jenkins Credential**: Thêm một thông tin xác thực mới thuộc loại **"GitHub App"**. Dán ID và Khóa riêng tư vào.

#### 4. Tạo Pipeline
1. **New Item**: Chọn **Pipeline**, đặt tên theo dự án của bạn.
2. **Phần Pipeline**: Chọn **Pipeline script from SCM**.
3. **SCM**: Chọn **Git**, nhập URL repo của bạn và chọn thông tin xác thực vừa tạo ở trên.
4. **Nhánh**: Thường là `*/main`.
5. **Lightweight Checkout**: **Bỏ chọn** ô "Lightweight checkout" để tránh lỗi "not in a git directory".

#### 5. Giám sát
Xem trực tiếp **Console Output** cho mỗi giai đoạn build được định nghĩa trong tệp `Jenkinsfile` của dự án.

---

## 4. CircleCI

CircleCI sử dụng một quy trình làm việc được tối ưu hóa với Orbs và máy thực thi chuyên dụng.

### Các bước định cấu hình:
1. **Ủy quyền**: Đăng nhập vào [CircleCI](https://circleci.com/) bằng tài khoản GitHub/GitLab của bạn.
2. **Kết nối dự án**: Nhấp vào mục **Projects** trên thanh bên và tìm kiếm repo của bạn.
3. **Thiết lập dự án**: Nhấp vào **Set Up Project** bên cạnh tên repo.
4. **Cấu hình có sẵn**: Chọn **"Fastest: Use the .circleci/config.yml in my repo"** và nhấp vào **Let's Go**.
5. **Biến môi trường**:
    - Đi tới **Project Settings > Environment Variables**.
    - Thêm `SNYK_TOKEN` và `SONAR_TOKEN` nếu bật bảo mật nâng cao.

---

## 5. Bitbucket Pipelines

Bitbucket Pipelines được tích hợp trực tiếp vào trải nghiệm đám mây của Bitbucket.

### Các bước định cấu hình:
1. **Kích hoạt Pipelines**: Trong thanh bên của kho lưu trữ Bitbucket, đi tới **Pipelines**.
2. **Kích hoạt lần đầu**: Nhấp vào nút **"Enable Pipelines"**. Nếu bạn đã đẩy mã nguồn lên, Bitbucket sẽ phát hiện tệp `bitbucket-pipelines.yml` và hiển thị nút **"Run initial pipeline"**. Nhấp vào đó để kích hoạt dự án.
3. **Biến kho lưu trữ**:
    - Đi tới **Repository settings > Pipelines > Repository variables**.
    - Thêm biến `SNYK_TOKEN` và `SONAR_TOKEN`.
4. **Tự động kích hoạt**: Sau lần chạy đầu tiên, Bitbucket sẽ tự động chạy build mỗi khi bạn thực hiện `git push` lên kho lưu trữ.
5. **Giám sát**: Xem tiến trình thời gian thực dưới tab **Pipelines** trên thanh bên.

---

## Bảng so sánh giữa các nhà cung cấp

| Đặc tính | GitHub Actions | GitLab CI | Jenkins | CircleCI | Bitbucket |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Tệp cấu hình** | `ci.yml` | `.gitlab-ci.yml` | `Jenkinsfile` | `config.yml` | `bitbucket-pipelines.yml` |
| **Cách tích hợp** | Market Actions | DinD / Templates | Plugins | Orbs | Pipes |
| **Giao diện cấu hình Secret** | Settings > Secrets | Settings > CI/CD | Manage Credentials | Project Settings | Repo Settings |
| **Mức miễn phí** | 2,000 phút/tháng | 400 phút/tháng | Không giới hạn (Tự lưu trữ) | 2,500 phút/tháng | **50 phút/tháng** |
| **Bộ thực thi** | GitHub Runners | Shared/Specific | Master/Agents | Docker/Machine | Pipelines Runner |

---

## Bạn vẫn gặp sự cố?

Môi trường CI/CD phức tạp và thường thay đổi theo từng dự án. Chúng tôi đã biên soạn một tài liệu tổng hợp **[Hướng dẫn Khắc phục Sự cố & FAQ](../guide/troubleshooting)** để giúp bạn giải quyết các lỗi phổ biến, bao gồm:

- Lỗi kết nối timeout với **Kafka & Database** trên GitLab/Bitbucket.
- Lỗi plugin và cấu hình công cụ trong **Jenkins**.
- Lỗi xác thực quyền quét bảo mật (`SNYK_TOKEN`).
- Giới hạn **Bộ nhớ & Tài nguyên** (OOM/SIGKILL) trên các runner chia sẻ.

> [!TIP]
> Luôn luôn kiểm tra **Pipeline Logs** trước! Nếu bạn gặp lỗi kết nối timeout, các script được tạo ra thường sẽ tự động xuất ra `docker-compose logs` để giúp bạn chẩn đoán nguyên nhân gốc rễ.
